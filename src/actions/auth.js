import {
  SET_PROFILE,
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  UNAUTHORIZED_ERROR,
  AUTHENTICATION_INIT_STARTED,
  AUTHENTICATION_INIT_FINISHED,
  defaultJWTKeys
} from '../constants'
import { capitalize, omit, isArray, isString, isFunction } from 'lodash'
import jwtDecode from 'jwt-decode'
import { promisesForPopulate } from '../utils'

/**
 * @description Dispatch login error action
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} authError - Error object
 */
const dispatchLoginError = (dispatch, authError) =>
  dispatch({
    type: LOGIN_ERROR,
    authError
  })

/**
 * @description Dispatch login error action
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} authError - Error object
 */
const dispatchUnauthorizedError = (dispatch, authError) =>
  dispatch({
    type: UNAUTHORIZED_ERROR,
    authError
  })

/**
 * @description Dispatch login action
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} auth - Auth data object
 */
const dispatchLogin = (dispatch, auth) =>
  dispatch({
    type: LOGIN,
    auth,
    authError: null
  })

/**
 * @description Initialize authentication state change listener that
 * watches user profile and dispatches login action
 * @param {Function} dispatch - Action dispatch function
 */
export const init = (dispatch, firebase) => {
  dispatch({ type: AUTHENTICATION_INIT_STARTED })

  firebase.auth().onAuthStateChanged(authData => {
    if (!authData) {
      return dispatch({ type: LOGOUT })
    }

    firebase._.authUid = authData.uid
    watchUserProfile(dispatch, firebase)

    dispatchLogin(dispatch, authData)
  })
  dispatch({ type: AUTHENTICATION_INIT_FINISHED })

  firebase.auth().currentUser
}

/**
 * @description Remove listener from user profile
 * @param {Object} firebase - Internal firebase object
 */
const unWatchUserProfile = (firebase) => {
  const authUid = firebase._.authUid
  const userProfile = firebase._.config.userProfile
  if (firebase._.profileWatch) {
    firebase.database()
      .ref()
      .child(`${userProfile}/${authUid}`)
      .off('value', firebase._.profileWatch)
    firebase._.profileWatch = null
  }
}

/**
 * @description Watch user profile
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 */
const watchUserProfile = (dispatch, firebase) => {
  const authUid = firebase._.authUid
  const userProfile = firebase._.config.userProfile
  unWatchUserProfile(firebase)

  if (firebase._.config.userProfile) {
    firebase._.profileWatch = firebase.database()
      .ref()
      .child(`${userProfile}/${authUid}`)
      .on('value', snap => {
        const { profileParamsToPopulate } = firebase._.config
        if (!profileParamsToPopulate || (!isArray(profileParamsToPopulate) && !isString(profileParamsToPopulate))) {
          dispatch({
            type: SET_PROFILE,
            profile: snap.val()
          })
        } else {
          // Handle string and array for profileParamsToPopulate config option
          const paramsToPopulate = isArray(firebase._.config.profileParamsToPopulate)
            ? firebase._.config.profileParamsToPopulate
            : firebase._.config.profileParamsToPopulate.split(',')

          // Convert each populate string in array into an array of once query promises
          Promise.all(
            paramsToPopulate.map(p =>
              promisesForPopulate(firebase, snap.val(), p)
            )
          )
          .then(data => {
            // Dispatch action with profile combined with populated parameters
            dispatch({
              type: SET_PROFILE,
              profile: Object.assign(
                snap.val(), // profile
                data.reduce((a, b) => Object.assign(a, b)) // populated profile parameters
              )
            })
          })
        }
      })
  }
}

const addScopesToProvider = (provider, scopes) => {
  // TODO: Verify scopes are valid before adding
  if (isArray(scopes)) {
    scopes.forEach(scope => {
      provider.addScope(scope)
    })
  }
  if (isString(scopes)) {
    provider.addScope(scopes)
  }
}

/**
 * @description Get correct login method and params order based on provided credentials
 * @param {Object} credentials - Login credentials
 * @param {String} credentials.email - Email to login with (only needed for email login)
 * @param {String} credentials.password - Password to login with (only needed for email login)
 * @param {String} credentials.provider - Provider name such as google, twitter (only needed for 3rd party provider login)
 * @param {String} credentials.type - Popup or redirect (only needed for 3rd party provider login)
 * @param {String} credentials.token - Custom or provider token
 */
const getLoginMethodAndParams = ({email, password, provider, type, token, scopes}, firebase) => {
  if (provider) {
    if (token) {
      return {
        method: 'signInWithCredential',
        params: [ provider, token ]
      }
    }
    const authProvider = new firebase.auth[`${capitalize(provider)}AuthProvider`]()
    authProvider.addScope('email')
    if (scopes) {
      addScopesToProvider(authProvider, scopes)
    }
    if (type === 'popup') {
      return {
        method: 'signInWithPopup',
        params: [ authProvider ]
      }
    }
    return {
      method: 'signInWithRedirect',
      params: [ authProvider ]
    }
  }
  if (token) {
    return {
      method: 'signInWithCustomToken',
      params: [ token ]
    }
  }
  return {
    method: 'signInWithEmailAndPassword',
    params: [ email, password ]
  }
}

export const createUserProfile = (dispatch, firebase, userData, profile) =>
  // Check for user's profile at userProfile path if provided
  !firebase._.config.userProfile
    ? Promise.resolve(userData)
    : firebase.database()
    .ref()
    .child(`${firebase._.config.userProfile}/${userData.uid}`)
    .once('value')
    .then(profileSnap =>
      // update profile only if doesn't exist or if set by config
      !firebase._.config.updateProfileOnLogin && profileSnap.val() !== null
        ? profileSnap.val()
        : profileSnap.ref.update(profile) // Update the profile
        .then(() => profile)
        .catch(err => {
          // Error setting profile
          dispatchUnauthorizedError(dispatch, err)
          return Promise.reject(err)
        })
    )
    .catch(err => {
      // Error reading user profile
      dispatchUnauthorizedError(dispatch, err)
      return Promise.reject(err)
    })

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
 */
export const login = (dispatch, firebase, credentials) => {
  dispatchLoginError(dispatch, null)
  let { method, params } = getLoginMethodAndParams(credentials, firebase)

  return firebase.auth()[method](...params)
    .then((userData) => {
      // Handle null response from getRedirectResult before redirect has happened
      if (!userData) return Promise.resolve(null)

      // For email auth return uid (createUser is used for creating a profile)
      if (userData.email) return userData.uid

      const { profileDecorator } = firebase._.config

      // For token auth, the user key doesn't exist. Instead, return the JWT.
      if (method === 'signInWithCustomToken') {
        // Extract the extra data in the JWT token for user object
        const { stsTokenManager: { accessToken }, uid } = userData.toJSON()
        const jwtData = jwtDecode(accessToken)
        const extraJWTData = omit(jwtData, defaultJWTKeys)

        // Handle profile decorator
        const profileData = profileDecorator && isFunction(profileDecorator)
          ? profileDecorator(Object.assign(userData.toJSON(), extraJWTData))
          : extraJWTData

        return createUserProfile(
          dispatch,
          firebase,
          { uid },
          profileData
        )
      }

      // Create profile when logging in with external provider
      const { user } = userData

      // Handle profile decorator
      const profileData = profileDecorator && isFunction(profileDecorator)
        ? profileDecorator(user)
        : Object.assign(
          {},
          {
            email: user.email,
            displayName: user.providerData[0].displayName || user.email,
            avatarUrl: user.providerData[0].photoURL,
            providerData: user.providerData
          }
        )

      return createUserProfile(
        dispatch,
        firebase,
        user,
        profileData
      )
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
 */
export const logout = (dispatch, firebase) => {
  firebase.auth().signOut()
  dispatch({ type: LOGOUT })
  firebase._.authUid = null
  unWatchUserProfile(firebase)
  return Promise.resolve(firebase)
}

/**
 * @description Create a new user in auth and add an account to userProfile root
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} credentials - Login credentials
 * @return {Promise}
 */
export const createUser = (dispatch, firebase, { email, password, signIn }, profile) => {
  dispatchLoginError(dispatch, null)

  if (!email || !password) {
    dispatchLoginError(dispatch, new Error('Email and Password are required to create user'))
    return Promise.reject('Email and Password are Required')
  }

  return firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userData) =>
      // Login to newly created account if signIn flag is true
      firebase.auth().currentUser || (!!signIn && signIn === false)
        ? createUserProfile(dispatch, firebase, userData, profile)
        : login(dispatch, firebase, { email, password })
            .then(() => createUserProfile(dispatch, firebase, userData, profile || { email }))
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
 */
export const resetPassword = (dispatch, firebase, email) => {
  dispatchLoginError(dispatch, null)
  return firebase.auth()
    .sendPasswordResetEmail(email)
    .catch((err) => {
      if (err) {
        switch (err.code) {
          case 'INVALID_USER':
            dispatchLoginError(dispatch, new Error('The specified user account does not exist.'))
            break
          default:
            dispatchLoginError(dispatch, err)
        }
        return Promise.reject(err)
      }
    })
}

export default { init, logout, createUser, resetPassword }
