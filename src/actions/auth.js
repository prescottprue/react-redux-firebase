import {
  isArray,
  isString,
  isFunction,
  forEach,
  omit
} from 'lodash'
import { actionTypes } from '../constants'
import { populate } from '../helpers'
import { getLoginMethodAndParams } from '../utils/auth'
import {
  promisesForPopulate,
  getPopulateObjs
} from '../utils/populate'

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
export const unWatchUserProfile = (firebase) => {
  const {
    authUid,
    config: { userProfile, useFirestoreForProfile }
  } = firebase._
  if (firebase._.profileWatch) {
    if (useFirestoreForProfile && firebase.firestore) {
      // Call profile onSnapshot unsubscribe stored on profileWatch
      firebase._.profileWatch()
    } else {
      firebase.database()
        .ref()
        .child(`${userProfile}/${authUid}`)
        .off('value', firebase._.profileWatch)
    }
    firebase._.profileWatch = null
  }
}

const getProfileFromSnap = (snap) => {
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
export const handleProfileWatchResponse = (dispatch, firebase, userProfileSnap) => {
  const {
    profileParamsToPopulate,
    autoPopulateProfile
  } = firebase._.config
  const profile = getProfileFromSnap(userProfileSnap)
  if (
    !profileParamsToPopulate ||
    (!isArray(profileParamsToPopulate) &&
      !isString(profileParamsToPopulate))
  ) {
    dispatch({ type: actionTypes.SET_PROFILE, profile })
  } else {
    // Convert array of populate config into an array of once query promises
    promisesForPopulate(
      firebase,
      userProfileSnap.key,
      profile,
      profileParamsToPopulate
    ).then((data) => {
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
    .catch((err) => {
      // Error retrieving data for population onto profile.
      dispatch({ type: actionTypes.UNAUTHORIZED_ERROR, authError: `Error during profile population: ${err.message}` })
      // Update profile with un-populated version
      dispatch({ type: actionTypes.SET_PROFILE, profile })
    })
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
        .onSnapshot(userProfileSnap =>
          handleProfileWatchResponse(dispatch, firebase, userProfileSnap)
        )
    } else if (firebase.database) {
      firebase._.profileWatch = firebase // eslint-disable-line no-param-reassign
        .database()
        .ref()
        .child(`${userProfile}/${authUid}`)
        .on('value', userProfileSnap =>
          handleProfileWatchResponse(dispatch, firebase, userProfileSnap)
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
      console.error( // eslint-disable-line no-console
        'Error occured within profileFactory function:',
        err.message || err
      )
      return Promise.reject(err)
    }
  }
  if (config.useFirestoreForProfile) {
    // Check for user's profile at userProfile path if provided
    return firebase
      .firestore()
      .collection(config.userProfile)
      .doc(userData.uid)
      .get()
      .then(
        profileSnap =>
          // update profile only if doesn't exist or if set by config
          !config.updateProfileOnLogin && profileSnap.exists
            ? profileSnap.data()
            : profileSnap.ref.set(omit(profile, ['providerData'])) // fixes issue with bad write
              .then(() => profile) // Update the profile
      )
      .catch((err) => {
        // Error reading user profile
        dispatch({ type: actionTypes.UNAUTHORIZED_ERROR, authError: err })
        return Promise.reject(err)
      })
  }

  // Check for user's profile at userProfile path if provided
  return firebase
    .database()
    .ref()
    .child(`${config.userProfile}/${userData.uid}`)
    .once('value')
    .then(
      profileSnap =>
        // update profile only if doesn't exist or if set by config
        !config.updateProfileOnLogin && profileSnap.val() !== null
          ? profileSnap.val()
          : profileSnap.ref.update(profile).then(() => profile) // Update the profile
    )
    .catch((err) => {
      // Error reading user profile
      dispatch({ type: actionTypes.UNAUTHORIZED_ERROR, authError: err })
      return Promise.reject(err)
    })
}

/**
 * @description Start presence management for a specificed user uid.
 * Presence collection contains a list of users that are online currently.
 * Sessions collection contains a record of all user sessions.
 * This function is called within login functions if enablePresence: true.
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @return {Promise}
 * @private
 */
const setupPresence = (dispatch, firebase) => {
  // exit if database does not exist on firebase instance
  if (!firebase.database || !firebase.database.ServerValue) {
    return
  }
  const ref = firebase.database().ref()
  const { config: { presence, sessions }, authUid } = firebase._
  const amOnline = ref.child('.info/connected')
  const onlineRef = ref
    .child(
      isFunction(presence)
        ? presence(firebase.auth().currentUser, firebase)
        : presence
    )
    .child(authUid)
  let sessionsRef = isFunction(sessions)
    ? sessions(firebase.auth().currentUser, firebase)
    : sessions
  if (sessionsRef) {
    sessionsRef = ref.child(sessions)
  }
  amOnline.on('value', (snapShot) => {
    if (!snapShot.val()) return
    // user is online
    if (sessionsRef) {
      // add session and set disconnect
      dispatch({ type: actionTypes.SESSION_START, payload: authUid })
      // add new session to sessions collection
      const session = sessionsRef.push({
        startedAt: firebase.database.ServerValue.TIMESTAMP,
        user: authUid
      })
      // Support versions of react-native-firebase that do not have setPriority
      // on firebase.database.ThenableReference
      if (isFunction(session.setPriority)) {
        // set authUid as priority for easy sorting
        session.setPriority(authUid)
      }
      session.child('endedAt')
        .onDisconnect()
        .set(firebase.database.ServerValue.TIMESTAMP, () => {
          dispatch({ type: actionTypes.SESSION_END })
        })
    }
    // add correct session id to user
    // remove from presence list
    onlineRef.set(true)
    onlineRef.onDisconnect().remove()
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

    watchUserProfile(dispatch, firebase)

    dispatch({ type: actionTypes.LOGIN, auth: authData })

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

    dispatch({ type: actionTypes.LOGIN, auth: user })

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
  firebase.auth()
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
      .then(authData =>
        handleRedirectResult(dispatch, firebase, authData)
      )
      .catch((error) => {
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
    dispatch({ type: actionTypes.UNLOAD_PROFILE })
  }

  const { method, params } = getLoginMethodAndParams(firebase, credentials)

  return firebase.auth()[method](...params)
    .then((userData) => {
      // Handle null response from getRedirectResult before redirect has happened
      if (!userData) return Promise.resolve(null)

      // For email auth return uid (createUser is used for creating a profile)
      if (method === 'signInWithEmailAndPassword') {
        return { user: userData }
      }

      // For token auth, the user key doesn't exist. Instead, return the JWT.
      if (method === 'signInWithCustomToken') {
        if (!firebase._.config.updateProfileOnLogin) {
          return { user: userData }
        }
        return createUserProfile(
          dispatch,
          firebase,
          userData
        )
      }

      // Create profile when logging in with external provider
      const user = userData.user || userData

      return createUserProfile(
        dispatch,
        firebase,
        user,
        {
          email: user.email,
          displayName: user.providerData[0].displayName || user.email,
          avatarUrl: user.providerData[0].photoURL,
          providerData: user.providerData
        }
      )
        .then((profile) => ({ profile, ...userData }))
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
export const logout = (dispatch, firebase) =>
  firebase.auth()
    .signOut()
    .then(() => {
      dispatch({
        type: actionTypes.LOGOUT,
        preserve: firebase._.config.preserveOnLogout
      })
      firebase._.authUid = null
      unWatchUserProfile(firebase)
      return firebase
    })

/**
 * @description Create a new user in auth and add an account to userProfile root
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} credentials - Login credentials
 * @return {Promise}
 * @private
 */
export const createUser = (dispatch, firebase, { email, password, signIn }, profile) => {
  dispatchLoginError(dispatch, null)

  if (!email || !password) {
    dispatchLoginError(dispatch, new Error('Email and Password are required to create user'))
    return Promise.reject(new Error('Email and Password are Required'))
  }

  return firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userData) =>
      // Login to newly created account if signIn flag is not set to false
      firebase.auth().currentUser || (!!signIn && signIn === false)
        ? createUserProfile(dispatch, firebase, userData, profile || { email })
        : login(dispatch, firebase, { email, password })
          .then(() =>
            createUserProfile(dispatch, firebase, userData, profile || { email })
          )
          .catch(err => {
            if (err) {
              switch (err.code) {
                case 'auth/user-not-found':
                  dispatchLoginError(dispatch, new Error('The specified user account does not exist.'))
                  break
                default:
                  dispatchLoginError(dispatch, err)
              }
            }
            return Promise.reject(err)
          })
    )
    .catch((err) => {
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
  return firebase.auth()
    .sendPasswordResetEmail(email)
    .catch((err) => {
      if (err) {
        switch (err.code) {
          case 'auth/user-not-found':
            dispatchLoginError(dispatch, new Error('The specified user account does not exist.'))
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
  return firebase.auth()
    .confirmPasswordReset(code, password)
    .catch((err) => {
      if (err) {
        switch (err.code) {
          case 'auth/expired-action-code':
            dispatchLoginError(dispatch, new Error('The action code has expired.'))
            break
          case 'auth/invalid-action-code':
            dispatchLoginError(dispatch, new Error('The action code is invalid.'))
            break
          case 'auth/user-disabled':
            dispatchLoginError(dispatch, new Error('The user is disabled.'))
            break
          case 'auth/user-not-found':
            dispatchLoginError(dispatch, new Error('The user is not found.'))
            break
          case 'auth/weak-password':
            dispatchLoginError(dispatch, new Error('The password is not strong enough.'))
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
  return firebase.auth()
    .verifyPasswordResetCode(code)
    .catch((err) => {
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
  const { database, _: { config, authUid } } = firebase
  dispatch({
    type: actionTypes.PROFILE_UPDATE_START,
    payload: profileUpdate
  })
  const profileRef = database().ref(`${config.userProfile}/${authUid}`)
  return profileRef
    .update(profileUpdate)
    .then(() =>
      profileRef
        .once('value')
        .then((snap) => {
          dispatch({
            type: actionTypes.PROFILE_UPDATE_SUCCESS,
            payload: snap.val()
          })
          return snap
        })
    )
    .catch((payload) => {
      dispatch({ type: actionTypes.PROFILE_UPDATE_ERROR, payload })
      return Promise.reject(payload)
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
    const msg = 'User must be logged in to update auth.'
    dispatch({ type: actionTypes.AUTH_UPDATE_ERROR, payload: msg })
    return Promise.reject(msg)
  }

  return firebase.auth().currentUser
    .updateProfile(authUpdate)
    .then((payload) => {
      dispatch({
        type: actionTypes.AUTH_UPDATE_SUCCESS,
        payload: firebase.auth().currentUser
      })
      if (updateInProfile) {
        return updateProfile(dispatch, firebase, authUpdate)
      }
      return payload
    })
    .catch((payload) => {
      dispatch({ type: actionTypes.AUTH_UPDATE_ERROR, payload })
      return Promise.reject(payload)
    })
}

/**
 * @description Update user's email. Internally calls
 * `firebase.auth().currentUser.updateEmail` as seen [in the firebase docs](https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile).
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {String} newEmail - Update to be auth object
 * @return {Promise}
 * @private
 */
export const updateEmail = (dispatch, firebase, newEmail, updateInProfile) => {
  dispatch({ type: actionTypes.EMAIL_UPDATE_START, payload: newEmail })

  if (!firebase.auth().currentUser) {
    const msg = 'User must be logged in to update email.'
    dispatch({ type: actionTypes.EMAIL_UPDATE_ERROR, payload: msg })
    return Promise.reject(msg)
  }

  return firebase.auth().currentUser
    .updateEmail(newEmail)
    .then((payload) => {
      dispatch({ type: actionTypes.EMAIL_UPDATE_SUCCESS, payload: newEmail })
      if (updateInProfile) {
        return updateProfile(dispatch, firebase, { email: newEmail })
      }
      return payload
    })
    .catch((payload) => {
      dispatch({ type: actionTypes.EMAIL_UPDATE_ERROR, payload })
      return Promise.reject(payload)
    })
}

/**
 * @description Reload Auth state
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @return {Promise} Resolves with auth
 */
export const reloadAuth = (dispatch, firebase) => {
  dispatch({ type: actionTypes.AUTH_RELOAD_START })

  // reject and dispatch error if not logged in
  if (!firebase.auth().currentUser) {
    const err = new Error('Must be logged in to reload auth')
    dispatch({ type: actionTypes.AUTH_RELOAD_ERROR, payload: err })
    return Promise.reject(err)
  }

  return firebase.auth().currentUser.reload()
    .then(() => {
      const auth = firebase.auth().currentUser
      dispatch({ type: actionTypes.AUTH_RELOAD_SUCCESS, payload: auth })
      return auth
    })
    .catch((err) => {
      dispatch({ type: actionTypes.AUTH_RELOAD_ERROR, payload: err })
      return Promise.reject(err)
    })
}

/**
 * @description Reload Auth state
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @return {Promise} Resolves with auth
 */
export const linkWithCredential = (dispatch, firebase, credential) => {
  dispatch({ type: actionTypes.AUTH_LINK_START })

  // reject and dispatch error if not logged in
  if (!firebase.auth().currentUser) {
    const err = new Error('Must be logged in to linkWithCredential')
    dispatch({ type: actionTypes.AUTH_LINK_ERROR, payload: err })
    return Promise.reject(err)
  }

  return firebase.auth().currentUser.linkWithCredential(credential)
    .then((auth) => {
      dispatch({ type: actionTypes.AUTH_LINK_SUCCESS, payload: auth })
      return auth
    })
    .catch((err) => {
      dispatch({ type: actionTypes.AUTH_LINK_ERROR, payload: err })
      return Promise.reject(err)
    })
}

/**
 * @description Reload Auth state
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @return {Promise} Resolves with auth
 */
export const signInWithPhoneNumber = (firebase, dispatch, ...args) => {
  dispatch({ type: actionTypes.UNLOAD_PROFILE })

  // Create profile when logging in with external provider
  // const user = userData.user || userData
  return firebase.auth().signInWithPhoneNumber(...args)
    .then((confirmationResult) => {
      return {
        ...confirmationResult,
        confirm: (code) =>
          confirmationResult.confirm(code)
            .then((userData) => {
              // Create profile when logging in with external provider
              const user = userData.user || userData

              return createUserProfile(
                dispatch,
                firebase,
                user,
                {
                  email: user.email,
                  displayName: user.providerData[0].displayName || user.email,
                  avatarUrl: user.providerData[0].photoURL,
                  providerData: user.providerData
                }
              )
                .then((profile) => ({ profile, ...userData }))
            })
      }
    })
    .catch(err => {
      dispatchLoginError(dispatch, err)
      return Promise.reject(err)
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
