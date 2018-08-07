import { isArray, isString, isFunction, forEach, omit } from 'lodash'
import { actionTypes } from '../constants'
import { populate } from '../helpers'
import {
  getLoginMethodAndParams,
  updateProfileOnRTDB,
  updateProfileOnFirestore,
  setupPresence
} from '../utils/auth'
import { promisesForPopulate, getPopulateObjs } from '../utils/populate'

/**
 * @description Dispatch login error action
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} authError - Error object
 * @private
 */
const dispatchLoginError = (dispatch, authError) =>
  dispatch({
    type: actionTypes.LOGIN_ERROR,
    authError
  })

/**
 * @description Remove listener from user profile
 * @param {Object} firebase - Internal firebase object
 * @private
 */
export const unWatchUserProfile = firebase => {
  const {
    authUid,
    config: { userProfile, useFirestoreForProfile }
  } = firebase._
  if (firebase._.profileWatch) {
    if (useFirestoreForProfile && firebase.firestore) {
      // Call profile onSnapshot unsubscribe stored on profileWatch
      firebase._.profileWatch()
    } else {
      firebase
        .database()
        .ref()
        .child(`${userProfile}/${authUid}`)
        .off('value', firebase._.profileWatch)
    }
    firebase._.profileWatch = null
  }
}

const getProfileFromSnap = snap => {
  // Real Time Database
  if (snap && snap.val) {
    return snap.val()
  }
  // Firestore
  if (snap && snap.data && snap.exists) {
    return snap.data()
  }
  return null
}

/**
 * Handle response from profile listener. Works with both Real Time Database and
 * Cloud Firestore.
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {firebase.database.Snapshot|firebase.firestore.DocumentSnapshot} userProfileSnap
 * Snapshot from profile watcher
 * @private
 */
export const handleProfileWatchResponse = (
  dispatch,
  firebase,
  userProfileSnap
) => {
  const {
    profileParamsToPopulate,
    autoPopulateProfile,
    useFirestoreForProfile
  } = firebase._.config
  const profile = getProfileFromSnap(userProfileSnap)
  if (
    !profileParamsToPopulate ||
    useFirestoreForProfile || // populating profile through firestore not yet supported
    (!isArray(profileParamsToPopulate) && !isString(profileParamsToPopulate))
  ) {
    if (useFirestoreForProfile && profileParamsToPopulate) {
      console.warn('Profile population is not yet supported for Firestore') // eslint-disable-line no-console
    }
    dispatch({ type: actionTypes.SET_PROFILE, profile })
  } else {
    // Convert array of populate config into an array of once query promises
    promisesForPopulate(
      firebase,
      userProfileSnap.key,
      profile,
      profileParamsToPopulate
    )
      .then(data => {
        // Fire actions for placement of data gathered in populate into redux
        forEach(data, (result, path) => {
          dispatch({
            type: actionTypes.SET,
            path,
            data: result,
            timestamp: Date.now(),
            requesting: false,
            requested: true
          })
        })
        if (!autoPopulateProfile) {
          // Dispatch action with profile combined with populated parameters
          dispatch({ type: actionTypes.SET_PROFILE, profile })
        } else {
          // Auto Populate profile
          const populates = getPopulateObjs(profileParamsToPopulate)
          const profile = userProfileSnap.val()
          dispatch({
            type: actionTypes.SET_PROFILE,
            profile: populate({ profile, data }, 'profile', populates)
          })
        }
      })
      .catch(err => {
        // Error retrieving data for population onto profile.
        dispatch({
          type: actionTypes.UNAUTHORIZED_ERROR,
          authError: `Error during profile population: ${err.message}`
        })
        // Update profile with un-populated version
        dispatch({ type: actionTypes.SET_PROFILE, profile })
      })
  }
}

/**
 * Creates a function for handling errors from profile watcher. Used for
 * both RTDB and Firestore.
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @return {Function} Profile watch error handler function
 * @private
 */
function createProfileWatchErrorHandler(dispatch, firebase) {
  const { config: { onProfileListenerError, logErrors } } = firebase._
  return function handleProfileError(err) {
    if (logErrors) {
      // eslint-disable-next-line no-console
      console.error(`Error with profile listener: ${err.message || ''}`, err)
    }
    if (isFunction(onProfileListenerError)) {
      const factoryResult = onProfileListenerError(err, firebase)
      // Return factoryResult if it is a promise
      if (isFunction(factoryResult.then)) {
        return factoryResult
      }
    }
    return Promise.reject(err)
  }
}

/**
 * @description Watch user profile. Internally dispatches sets firebase._.profileWatch
 * and calls SET_PROFILE actions. Supports both Realtime Database and Firestore
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @private
 */
export const watchUserProfile = (dispatch, firebase) => {
  const {
    authUid,
    config: { userProfile, useFirestoreForProfile }
  } = firebase._
  unWatchUserProfile(firebase)

  if (userProfile) {
    if (useFirestoreForProfile && firebase.firestore) {
      firebase._.profileWatch = firebase // eslint-disable-line no-param-reassign
        .firestore()
        .collection(userProfile)
        .doc(authUid)
        .onSnapshot(
          userProfileSnap =>
            handleProfileWatchResponse(dispatch, firebase, userProfileSnap),
          createProfileWatchErrorHandler(dispatch, firebase)
        )
    } else if (firebase.database) {
      firebase._.profileWatch = firebase // eslint-disable-line no-param-reassign
        .database()
        .ref()
        .child(`${userProfile}/${authUid}`)
        .on(
          'value',
          userProfileSnap =>
            handleProfileWatchResponse(dispatch, firebase, userProfileSnap),
          createProfileWatchErrorHandler(dispatch, firebase)
        )
    } else {
      throw new Error(
        'Real Time Database or Firestore must be included to enable user profile'
      )
    }
  }
}

/**
 * @description Create user profile if it does not already exist.
 * `updateProfileOnLogin: false` can be passed to config to disable updating.
 * Profile factory is applied if it exists and is a function.
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} userData - User data object (response from authenticating)
 * @param {Object} profile - Profile data to place in new profile
 * @return {Promise}
 * @private
 */
export const createUserProfile = (dispatch, firebase, userData, profile) => {
  const { _: { config } } = firebase
  if (!config.userProfile || (!firebase.database && !firebase.firestore)) {
    return Promise.resolve(userData)
  }
  // use profileFactory if it exists in config
  if (isFunction(config.profileFactory)) {
    // catch errors in user provided profileFactory function
    try {
      profile = config.profileFactory(userData, profile) // eslint-disable-line no-param-reassign
    } catch (err) {
      /* eslint-disable no-console */
      console.error(
        'Error occured within profileFactory function:',
        err.message || err
      )
      /* eslint-enable no-console */
      return Promise.reject(err)
    }
  }

  // Check/Write profile using Firestore
  if (config.useFirestoreForProfile) {
    // Check for user's profile at userProfile path if provided
    return firebase
      .firestore()
      .collection(config.userProfile)
      .doc(userData.uid || userData.user.uid)
      .get()
      .then(profileSnap => {
        // Return if config for updating profile is not enabled and profile exists
        if (!config.updateProfileOnLogin && profileSnap.exists) {
          return profileSnap.data()
        }
        let newProfile = profile
        // If the user did supply a profileFactory, we should use the result of it for the new Profile
        if (!newProfile) {
          // Convert to JSON format (to prevent issue of writing invalid type to Firestore)
          const userDataObject = userData.uid
            ? userData.toJSON ? userData.toJSON() : userData
            : userData.user.toJSON ? userData.user.toJSON() : userData.user
          // Remove unnecessary auth params (configurable) and preserve types of timestamps
          newProfile = {
            ...omit(userDataObject, config.keysToRemoveFromAuth),
            avatarUrl: userDataObject.photoURL // match profile pattern used for RTDB
          }
        }

        // Create/Update the profile
        return profileSnap.ref
          .set(newProfile, { merge: true })
          .then(() => newProfile)
      })
      .catch(err => {
        // Error reading user profile
        dispatch({ type: actionTypes.UNAUTHORIZED_ERROR, authError: err })
        return Promise.reject(err)
      })
  }

  // Check/Write profile using Firebase RTDB
  return firebase
    .database()
    .ref()
    .child(
      `${config.userProfile}/${
        userData.user ? userData.user.uid : userData.uid
      }`
    )
    .once('value')
    .then(
      profileSnap =>
        // update profile only if doesn't exist or if set by config
        !config.updateProfileOnLogin && profileSnap.val() !== null
          ? profileSnap.val()
          : profileSnap.ref.update(profile).then(() => profile) // Update the profile
    )
    .catch(err => {
      // Error reading user profile
      dispatch({ type: actionTypes.UNAUTHORIZED_ERROR, authError: err })
      if (isFunction(config.onProfileWriteError)) {
        config.onProfileWriteError(err, firebase)
      }
      return Promise.reject(err)
    })
}

/**
 * Auth state change handler. Handles response from firebase's onAuthStateChanged
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param  {Object} authData - Auth data from firebase's onAuthStateChanged
 * @private
 */
const handleAuthStateChange = (dispatch, firebase, authData) => {
  const { config } = firebase._
  if (!authData) {
    // Run onAuthStateChanged if it exists in config and enableEmptyAuthChanges is set to true
    if (isFunction(config.onAuthStateChanged)) {
      firebase._.config.onAuthStateChanged(authData, firebase, dispatch)
    }
    dispatch({
      type: actionTypes.AUTH_EMPTY_CHANGE,
      preserve: config.preserveOnEmptyAuthChange
    })
  } else {
    firebase._.authUid = authData.uid // eslint-disable-line no-param-reassign

    // setup presence if settings and database exist
    if (config.presence) {
      setupPresence(dispatch, firebase)
    }

    dispatch({
      type: actionTypes.LOGIN,
      auth: authData,
      preserve: config.preserveOnLogin
    })

    watchUserProfile(dispatch, firebase)

    // Run onAuthStateChanged if it exists in config
    if (isFunction(config.onAuthStateChanged)) {
      config.onAuthStateChanged(authData, firebase, dispatch)
    }
  }
}

/**
 * Redirect result handler
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param  {Object} authData - Auth data from Firebase's getRedirectResult
 * @private
 */
export const handleRedirectResult = (dispatch, firebase, authData) => {
  // Run onRedirectResult if it exists in config
  if (typeof firebase._.config.onRedirectResult === 'function') {
    firebase._.config.onRedirectResult(authData, firebase, dispatch)
  }
  if (authData && authData.user) {
    const { user } = authData

    firebase._.authUid = user.uid // eslint-disable-line no-param-reassign
    watchUserProfile(dispatch, firebase)

    dispatch({
      type: actionTypes.LOGIN,
      auth: user,
      preserve: firebase._.config.preserveOnLogin
    })

    createUserProfile(dispatch, firebase, user, {
      email: user.email,
      displayName: user.providerData[0].displayName || user.email,
      avatarUrl: user.providerData[0].photoURL,
      providerData: user.providerData
    })
  }
}

/**
 * @description Initialize authentication state change listener that
 * watches user profile and dispatches login action
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @private
 */
export const init = (dispatch, firebase) => {
  // exit if auth does not exist
  if (!firebase.auth) {
    return
  }
  dispatch({ type: actionTypes.AUTHENTICATION_INIT_STARTED })
  // Set Auth State listener
  firebase
    .auth()
    .onAuthStateChanged(authData =>
      handleAuthStateChange(dispatch, firebase, authData)
    )

  // set redirect result callback if enableRedirectHandling set to true
  if (
    firebase._.config.enableRedirectHandling &&
    isFunction(firebase.auth().getRedirectResult) &&
    (typeof window !== 'undefined' &&
      window.location &&
      window.location.protocol &&
      window.location.protocol.indexOf('http') !== -1)
  ) {
    firebase
      .auth()
      .getRedirectResult()
      .then(authData => handleRedirectResult(dispatch, firebase, authData))
      .catch(error => {
        dispatchLoginError(dispatch, error)
        return Promise.reject(error)
      })
  }

  firebase.auth().currentUser // eslint-disable-line no-unused-expressions

  dispatch({ type: actionTypes.AUTHENTICATION_INIT_FINISHED })
}

/**
 * @description Login with errors dispatched
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} credentials - Login credentials
 * @param {Object} credentials.email - Email to login with (only needed for email login)
 * @param {Object} credentials.password - Password to login with (only needed for email login)
 * @param {Object} credentials.provider - Provider name such as google, twitter (only needed for 3rd party provider login)
 * @param {Object} credentials.type - Popup or redirect (only needed for 3rd party provider login)
 * @param {Object} credentials.token - Custom or provider token
 * @param {firebase.auth.AuthCredential} credentials.credential - Custom or provider token
 * @param {Array|String} credentials.scopes - Scopes to add to provider (i.e. email)
 * @return {Promise}
 * @private
 */
export const login = (dispatch, firebase, credentials) => {
  if (firebase._.config.resetBeforeLogin) {
    dispatchLoginError(dispatch, null)
  }

  const { method, params } = getLoginMethodAndParams(firebase, credentials)

  return firebase
    .auth()
    [method](...params)
    .then(userData => {
      // Handle null response from getRedirectResult before redirect has happened
      if (!userData) return Promise.resolve(null)

      // For email auth return uid (createUser is used for creating a profile)
      // For token auth, the user key doesn't exist. Instead, return the JWT.
      if (
        method === 'signInWithEmailAndPassword' ||
        method === 'signInWithCustomToken'
      ) {
        if (!firebase._.config.updateProfileOnLogin) {
          return { user: userData }
        }
        return createUserProfile(
          dispatch,
          firebase,
          userData,
          credentials.profile
        )
      }

      if (method === 'signInWithPhoneNumber') {
        // Modify confirm method to include profile creation
        return {
          ...userData,
          confirm: code =>
            // Call original confirm
            userData.confirm(code).then(({ user, additionalUserInfo }) =>
              createUserProfile(dispatch, firebase, user, {
                phoneNumber: user.providerData[0].phoneNumber,
                providerData: user.providerData
              }).then(profile => ({ profile, user, additionalUserInfo }))
            )
        }
      }

      // Create profile when logging in with external provider
      const user = userData.user || userData

      return createUserProfile(
        dispatch,
        firebase,
        user,
        credentials.profile || {
          email: user.email,
          displayName: user.providerData[0].displayName || user.email,
          avatarUrl: user.providerData[0].photoURL,
          providerData: user.providerData
        }
      ).then(profile => ({ profile, ...userData }))
    })
    .catch(err => {
      dispatchLoginError(dispatch, err)
      return Promise.reject(err)
    })
}

/**
 * @description Logout of firebase and dispatch logout event
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @private
 */
export const logout = (dispatch, firebase) => {
  // detach profile listener before logging out to prevent permission_denied
  // errors (for more info see #494)
  unWatchUserProfile(firebase)
  return firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({
        type: actionTypes.LOGOUT,
        preserve: firebase._.config.preserveOnLogout
      })
      firebase._.authUid = null
      return firebase
    })
}

/**
 * @description Create a new user in auth and add an account to userProfile root
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} credentials - Login credentials
 * @return {Promise}
 * @private
 */
export const createUser = (
  dispatch,
  firebase,
  { email, password, signIn },
  profile
) => {
  dispatchLoginError(dispatch, null)

  if (!email || !password) {
    const error = new Error('Email and Password are required to create user')
    dispatchLoginError(dispatch, error)
    return Promise.reject(error)
  }

  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(
      userData =>
        // Login to newly created account if signIn flag is not set to false
        firebase.auth().currentUser || (!!signIn && signIn === false)
          ? createUserProfile(
              dispatch,
              firebase,
              userData,
              profile || { email }
            )
          : login(dispatch, firebase, { email, password })
              .then(() =>
                createUserProfile(
                  dispatch,
                  firebase,
                  userData,
                  profile || { email }
                )
              )
              .catch(err => {
                if (err) {
                  switch (err.code) {
                    case 'auth/user-not-found':
                      dispatchLoginError(
                        dispatch,
                        new Error('The specified user account does not exist.')
                      )
                      break
                    default:
                      dispatchLoginError(dispatch, err)
                  }
                }
                return Promise.reject(err)
              })
    )
    .catch(err => {
      dispatchLoginError(dispatch, err)
      return Promise.reject(err)
    })
}

/**
 * @description Send password reset email to provided email
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {String} email - Email to send recovery email to
 * @return {Promise}
 * @private
 */
export const resetPassword = (dispatch, firebase, email) => {
  dispatchLoginError(dispatch, null)
  return firebase
    .auth()
    .sendPasswordResetEmail(email)
    .catch(err => {
      if (err) {
        switch (err.code) {
          case 'auth/user-not-found':
            dispatchLoginError(
              dispatch,
              new Error('The specified user account does not exist.')
            )
            break
          default:
            dispatchLoginError(dispatch, err)
        }
        return Promise.reject(err)
      }
    })
}

/**
 * @description Confirm the password reset with code and password
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {String} code - Email confirmation reset code
 * @param {String} password - Password to set it to
 * @return {Promise}
 * @private
 */
export const confirmPasswordReset = (dispatch, firebase, code, password) => {
  dispatchLoginError(dispatch, null)
  return firebase
    .auth()
    .confirmPasswordReset(code, password)
    .catch(err => {
      if (err) {
        switch (err.code) {
          case 'auth/expired-action-code':
            dispatchLoginError(
              dispatch,
              new Error('The action code has expired.')
            )
            break
          case 'auth/invalid-action-code':
            dispatchLoginError(
              dispatch,
              new Error('The action code is invalid.')
            )
            break
          case 'auth/user-disabled':
            dispatchLoginError(dispatch, new Error('The user is disabled.'))
            break
          case 'auth/user-not-found':
            dispatchLoginError(dispatch, new Error('The user is not found.'))
            break
          case 'auth/weak-password':
            dispatchLoginError(
              dispatch,
              new Error('The password is not strong enough.')
            )
            break
          default:
            dispatchLoginError(dispatch, err)
        }
        return Promise.reject(err)
      }
    })
}

/**
 * @description Verify that password reset code is valid
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {String} code - Password reset code
 * @return {Promise} email - Email associated with reset code
 * @private
 */
export const verifyPasswordResetCode = (dispatch, firebase, code) => {
  dispatchLoginError(dispatch, null)
  return firebase
    .auth()
    .verifyPasswordResetCode(code)
    .catch(err => {
      if (err) {
        dispatchLoginError(dispatch, err)
      }
      return Promise.reject(err)
    })
}

/**
 * @description Update user profile
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} userData - User data object (response from authenticating)
 * @param {Object} profile - Profile data to place in new profile
 * @return {Promise}
 * @private
 */
export const updateProfile = (dispatch, firebase, profileUpdate) => {
  const { _: { config } } = firebase
  dispatch({
    type: actionTypes.PROFILE_UPDATE_START,
    payload: profileUpdate
  })
  // Select update promise type (firebase/firestore) based on config
  const updatePromise = config.useFirestoreForProfile
    ? updateProfileOnFirestore
    : updateProfileOnRTDB
  return updatePromise(firebase, profileUpdate)
    .then(snap => {
      dispatch({
        type: actionTypes.PROFILE_UPDATE_SUCCESS,
        payload: config.useFirestoreForProfile ? snap.data() : snap.val()
      })
      return snap
    })
    .catch(error => {
      dispatch({ type: actionTypes.PROFILE_UPDATE_ERROR, error })
      return Promise.reject(error)
    })
}

/**
 * @description Update Auth Object. Internally calls
 * `firebase.auth().currentUser.updateProfile` as seen [in the firebase docs](https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile).
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} profileUpdate - Update to be auth object
 * @return {Promise}
 * @private
 */
export const updateAuth = (dispatch, firebase, authUpdate, updateInProfile) => {
  dispatch({ type: actionTypes.AUTH_UPDATE_START, payload: authUpdate })

  if (!firebase.auth().currentUser) {
    const error = new Error('User must be logged in to update auth.')
    dispatch({ type: actionTypes.AUTH_UPDATE_ERROR, payload: error })
    return Promise.reject(error)
  }

  return firebase
    .auth()
    .currentUser.updateProfile(authUpdate)
    .then(payload => {
      dispatch({
        type: actionTypes.AUTH_UPDATE_SUCCESS,
        payload: firebase.auth().currentUser
      })
      if (updateInProfile) {
        return updateProfile(dispatch, firebase, authUpdate)
      }
      return payload
    })
    .catch(error => {
      dispatch({ type: actionTypes.AUTH_UPDATE_ERROR, error })
      return Promise.reject(error)
    })
}

/**
 * @description Update user's email within Firebase auth and optionally within
 * users's profile. Internally calls `firebase.auth().currentUser.updateEmail`.
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {String} newEmail - Update to be auth object
 * @param {Boolean} updateInProfile - Whether or not to update email within
 * user's profile object (stored under path provided to userProfile config)
 * @return {Promise}
 * @private
 */
export const updateEmail = (dispatch, firebase, newEmail, updateInProfile) => {
  dispatch({ type: actionTypes.EMAIL_UPDATE_START, payload: newEmail })

  if (!firebase.auth().currentUser) {
    const error = new Error('User must be logged in to update email.')
    dispatch({ type: actionTypes.EMAIL_UPDATE_ERROR, error })
    return Promise.reject(error)
  }

  return firebase
    .auth()
    .currentUser.updateEmail(newEmail)
    .then(payload => {
      dispatch({ type: actionTypes.EMAIL_UPDATE_SUCCESS, payload: newEmail })
      if (updateInProfile) {
        return updateProfile(dispatch, firebase, { email: newEmail })
      }
      return payload
    })
    .catch(error => {
      dispatch({ type: actionTypes.EMAIL_UPDATE_ERROR, error })
      return Promise.reject(error)
    })
}

/**
 * @description Reload Auth state. Internally calls
 * `firebase.auth().currentUser.reload`.
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @return {Promise} Resolves with auth
 */
export const reloadAuth = (dispatch, firebase) => {
  dispatch({ type: actionTypes.AUTH_RELOAD_START })

  // reject and dispatch error if not logged in
  if (!firebase.auth().currentUser) {
    const error = new Error('User must be logged in to reload auth.')
    dispatch({ type: actionTypes.AUTH_RELOAD_ERROR, error })
    return Promise.reject(error)
  }

  return firebase
    .auth()
    .currentUser.reload()
    .then(() => {
      const auth = firebase.auth().currentUser
      dispatch({ type: actionTypes.AUTH_RELOAD_SUCCESS, payload: auth })
      return auth
    })
    .catch(error => {
      dispatch({ type: actionTypes.AUTH_RELOAD_ERROR, error })
      return Promise.reject(error)
    })
}

/**
 * @description Links the user account with the given credentials. Internally
 * calls `firebase.auth().currentUser.linkWithCredential`.
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} credential - Credential with which to link user account
 * @return {Promise} Resolves with auth
 */
export const linkWithCredential = (dispatch, firebase, credential) => {
  dispatch({ type: actionTypes.AUTH_LINK_START })

  // reject and dispatch error if not logged in
  if (!firebase.auth().currentUser) {
    const error = new Error('User must be logged in to link with credential.')
    dispatch({ type: actionTypes.AUTH_LINK_ERROR, error })
    return Promise.reject(error)
  }

  return firebase
    .auth()
    .currentUser.linkWithCredential(credential)
    .then(auth => {
      dispatch({ type: actionTypes.AUTH_LINK_SUCCESS, payload: auth })
      return auth
    })
    .catch(error => {
      dispatch({ type: actionTypes.AUTH_LINK_ERROR, error })
      return Promise.reject(error)
    })
}

/**
 * @description Asynchronously signs in using a phone number and create's
 * user profile. This method sends a code via SMS to the given phone number,
 * and returns a firebase.auth.ConfirmationResult. Internally
 * calls `firebase.auth().signInWithPhoneNumber`.
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {String} phoneNumber - Phone number
 * @param {Object} applicationVerifier - Phone number
 * @return {Promise} Resolves with auth
 */
export const signInWithPhoneNumber = (
  firebase,
  dispatch,
  phoneNumber,
  applicationVerifier,
  options = {}
) => {
  return login(dispatch, firebase, {
    phoneNumber,
    applicationVerifier,
    ...options
  })
}

export default {
  dispatchLoginError,
  unWatchUserProfile,
  watchUserProfile,
  init,
  createUserProfile,
  login,
  logout,
  createUser,
  resetPassword,
  confirmPasswordReset,
  verifyPasswordResetCode,
  updateAuth,
  updateProfile,
  updateEmail,
  reloadAuth,
  signInWithPhoneNumber
}
