import { isObject } from 'lodash'
import { merge } from 'lodash/fp'
import { getEventsFromInput, createCallable } from './utils'
import { mapWithFirebaseAndDispatch } from './utils/actions'
import * as authActions from './actions/auth'
import * as queryActions from './actions/query'
import * as storageActions from './actions/storage'

let firebaseInstance

/**
 * Create an extended firebase instance that has methods attached
 * which dispatch redux actions.
 * @param {object} firebase - Firebase instance which to extend
 * @param {object} configs - Configuration object
 * @param {Function} dispatch - Action dispatch function
 * @returns {object} Extended Firebase instance
 */
export default function createFirebaseInstance(firebase, configs, dispatch) {
  /* istanbul ignore next: Logging is external */
  // Enable Logging based on config (handling instances without i.e RNFirebase)
  if (
    configs.enableLogging &&
    firebase.database &&
    typeof firebase.database.enableLogging === 'function'
  ) {
    firebase.database.enableLogging(configs.enableLogging)
  }

  // Add internal variables to firebase instance
  const defaultInternals = {
    watchers: {},
    listeners: {},
    callbacks: {},
    queries: {},
    config: configs,
    authUid: null
  }

  firebase._ = merge(defaultInternals, firebase._) // eslint-disable-line no-param-reassign

  /**
   * @private
   * Calls a method and attaches meta to value object
   * @param {string} method - Method to run with meta attached
   * @param {string} path - Path to location on Firebase which to set
   * @param {object|string|boolean|number} value - Value to write to Firebase
   * @param {Function} onComplete - Function to run on complete
   * @returns {Promise} Containing reference snapshot
   */
  const withMeta = (method, path, value, onComplete) => {
    if (isObject(value)) {
      const prefix = method === 'update' ? 'updated' : 'created'
      const dataWithMeta = {
        ...value,
        [`${prefix}At`]: firebase.database.ServerValue.TIMESTAMP
      }
      if (firebase.auth().currentUser) {
        dataWithMeta[`${prefix}By`] = firebase.auth().currentUser.uid
      }
      return firebase
        .database()
        .ref(path)
        [method](dataWithMeta, onComplete)
    }
    return firebase
      .database()
      .ref(path)
      [method](value, onComplete)
  }

  /**
   * Sets data to Firebase. More info available in
   * [the docs](https://react-redux-firebase.com/api/props-firebase.html#set).
   * @param {string} path - Path to location on Firebase which to set
   * @param {object|string|boolean|number} value - Value to write to Firebase
   * @param {Function} onComplete - Function to run on complete (`not required`)
   * @returns {Promise} Containing reference snapshot
   * @example <caption>Basic</caption>
   * @see https://react-redux-firebase.com/api/firebaseInstance.html#set
   * import React, { Component } from 'react'
   * import PropTypes from 'prop-types'
   * import { firebaseConnect } from 'react-redux-firebase'
   * function Example({ firebase: { set } }) {
   *   return (
   *     <button onClick={() => set('some/path', { here: 'is a value' })}>
   *     Set To Firebase
   *     </button>
   *   )
   * }
   * export default firebaseConnect()(Example)
   */
  const set = (path, value, onComplete) =>
    firebase
      .database()
      .ref(path)
      .set(value, onComplete)

  /**
   * Sets data to Firebase along with meta data. Currently,
   * this includes createdAt and createdBy. *Warning* using this function
   * may have unintented consequences (setting createdAt even if data already
   * exists). More info available in [the docs](https://react-redux-firebase.com/api/props-firebase.html#update).
   * @param {string} path - Path to location on Firebase which to set
   * @param {object|string|boolean|number} value - Value to write to Firebase
   * @param {Function} onComplete - Function to run on complete (`not required`)
   * @returns {Promise} Containing reference snapshot
   */
  const setWithMeta = (path, value, onComplete) =>
    withMeta('set', path, value, onComplete)

  /**
   * Pushes data to Firebase. More info
   * available in [the docs](https://react-redux-firebase.com/api/props-firebase.html#push).
   * @param {string} path - Path to location on Firebase which to push
   * @param {object|string|boolean|number} value - Value to push to Firebase
   * @param {Function} onComplete - Function to run on complete (`not required`)
   * @returns {Promise} Containing reference snapshot
   * @example <caption>Basic</caption>
   * import React from 'react'
   * import PropTypes from 'prop-types'
   * import { firebaseConnect } from 'react-redux-firebase'
   *
   * function Example({ firebase: { push } }) {
   *   return (
   *     <button onClick={() => push('some/path', true)}>
   *       Push To Firebase
   *     </button>
   *   )
   * }
   * export default firebaseConnect()(Example)
   */
  const push = (path, value, onComplete) =>
    firebase
      .database()
      .ref(path)
      .push(value, onComplete)

  /**
   * Pushes data to Firebase along with meta data. Currently,
   * this includes createdAt and createdBy. More info
   * available in [the docs](https://react-redux-firebase.com/api/props-firebase.html#pushWithMeta).
   * @param {string} path - Path to location on Firebase which to set
   * @param {object|string|boolean|number} value - Value to write to Firebase
   * @param {Function} onComplete - Function to run on complete (`not required`)
   * @returns {Promise} Containing reference snapshot
   */
  const pushWithMeta = (path, value, onComplete) =>
    withMeta('push', path, value, onComplete)

  /**
   * Updates data on Firebase and sends new data. More info
   * available in [the docs](https://react-redux-firebase.com/api/props-firebase.html#update).
   * @param {string} path - Path to location on Firebase which to update
   * @param {object|string|boolean|number} value - Value to update to Firebase
   * @param {Function} onComplete - Function to run on complete (`not required`)
   * @returns {Promise} Containing reference snapshot
   * @example <caption>Basic</caption>
   * import React from 'react'
   * import PropTypes from 'prop-types'
   * import { firebaseConnect } from 'react-redux-firebase'
   *
   * function Example({ firebase: { update } }) {
   *   function updateData() {
   *     update('some/path', { here: 'is a value' })
   *   }
   * }
   *   return (
   *     <button onClick={updateData}>
   *       Update To Firebase
   *     </button>
   *   )
   * }
   * export default firebaseConnect()(Example)
   */
  const update = (path, value, onComplete) =>
    firebase
      .database()
      .ref(path)
      .update(value, onComplete)

  /**
   * Updates data on Firebase along with meta. *Warning*
   * using this function may have unintented consequences (setting
   * createdAt even if data already exists). More info available
   * in [the docs](https://react-redux-firebase.com/api/props-firebase.html#updateWithMeta).
   * @param {string} path - Path to location on Firebase which to update
   * @param {object|string|boolean|number} value - Value to update to Firebase
   * @param {Function} onComplete - Function to run on complete (`not required`)
   * @returns {Promise} Containing reference snapshot
   */
  const updateWithMeta = (path, value, onComplete) =>
    withMeta('update', path, value, onComplete)

  /**
   * Removes data from Firebase at a given path. **NOTE** A
   * seperate action is not dispatched unless `dispatchRemoveAction: true` is
   * provided to config on store creation. That means that a listener must
   * be attached in order for state to be updated when calling remove.
   * More info available in [the docs](https://react-redux-firebase.com/api/props-firebase.html#remove).
   * @param {string} path - Path to location on Firebase which to remove
   * @param {Function} onComplete - Function to run on complete (`not required`)
   * @param {Function} options - Options object
   * @returns {Promise} Containing reference snapshot
   * @example <caption>Basic</caption>
   * import React from 'react'
   * import PropTypes from 'prop-types'
   * import { firebaseConnect } from 'react-redux-firebase'
   *
   * function Example({ firebase: { remove } }) {
   *   return (
   *     <button onClick={() => remove('some/path')}>
   *       Remove From Firebase
   *     </button>
   *   )
   * }
   * export default firebaseConnect()(Example)
   */
  const remove = (path, onComplete, options) =>
    queryActions.remove(firebase, dispatch, path, options).then(() => {
      if (typeof onComplete === 'function') onComplete()
      return path
    })

  /**
   * Sets data to Firebase only if the path does not already
   * exist, otherwise it rejects. Internally uses a Firebase transaction to
   * prevent a race condition between seperate clients calling uniqueSet.
   * More info available in [the docs](https://react-redux-firebase.com/api/props-firebase.html#uniqueSet).
   * @param {string} path - Path to location on Firebase which to set
   * @param {object|string|boolean|number} value - Value to write to Firebase
   * @param {Function} onComplete - Function to run on complete (`not required`)
   * @returns {Promise} Containing reference snapshot
   * @example <caption>Basic</caption>
   * import React, { Component } from 'react'
   * import PropTypes from 'prop-types'
   * import { firebaseConnect } from 'react-redux-firebase'
   *
   * function Example({ firebase: { uniqueSet } }) {
   *   return (
   *     <button onClick={() => uniqueSet('some/unique/path', true)}>
   *       Unique Set To Firebase
   *     </button>
   *   )
   * }
   * export default firebaseConnect()(Example)
   */
  const uniqueSet = (path, value, onComplete) =>
    firebase
      .database()
      .ref(path)
      .transaction(d => (d === null ? value : undefined))
      .then(({ committed, snapshot }) => {
        if (!committed) {
          const newError = new Error('Path already exists.')
          if (onComplete) onComplete(newError)
          return Promise.reject(newError)
        }
        if (onComplete) onComplete(snapshot)
        return snapshot
      })

  /**
   * Upload a file to Firebase Storage with the option to store
   * its metadata in Firebase Database. More info available
   * in [the docs](https://react-redux-firebase.com/api/props-firebase.html#uploadFile).
   * @param {string} path - Path to location on Firebase which to set
   * @param {File} file - File object to upload (usually first element from
   * array output of select-file or a drag/drop `onDrop`)
   * @param {string} dbPath - Database path to place uploaded file metadata
   * @param {object} options - Options
   * @param {string} options.name - Name of the file
   * @param {object} options.metdata - Metadata for the file (passed as second
   * argument to storage.put calls)
   * @returns {Promise} Containing the File object
   */
  const uploadFile = (path, file, dbPath, options) =>
    storageActions.uploadFile(dispatch, firebase, {
      path,
      file,
      dbPath,
      options
    })

  /**
   * Upload multiple files to Firebase Storage with the option
   * to store their metadata in Firebase Database. More info available
   * in [the docs](https://react-redux-firebase.com/api/props-firebase.html#uploadFiles).
   * @param {string} path - Path to location on Firebase which to set
   * @param {Array} files - Array of File objects to upload (usually from
   * a select-file or a drag/drop `onDrop`)
   * @param {string} dbPath - Database path to place uploaded files metadata.
   * @param {object} options - Options
   * @param {string} options.name - Name of the file
   * @returns {Promise} Containing an array of File objects
   */
  const uploadFiles = (path, files, dbPath, options) =>
    storageActions.uploadFiles(dispatch, firebase, {
      path,
      files,
      dbPath,
      options
    })

  /**
   * Delete a file from Firebase Storage with the option to
   * remove its metadata in Firebase Database. More info available
   * in [the docs](https://react-redux-firebase.com/api/props-firebase.html#deleteFile).
   * @param {string} path - Path to location on Firebase which to set
   * @param {string} dbPath - Database path to place uploaded file metadata
   * @returns {Promise} Containing the File object
   */
  const deleteFile = (path, dbPath) =>
    storageActions.deleteFile(dispatch, firebase, { path, dbPath })

  /**
   * Watch event. **Note:** this method is used internally
   * so examples have not yet been created, and it may not work as expected.
   * More info available in [the docs](https://react-redux-firebase.com/api/props-firebase.html#watchEvent).
   * @param {string} type - Type of watch event
   * @param {string} path - Path to location on Firebase which to set listener
   * @param {string} storeAs - Name of listener results within redux store
   * @param {object} options - Event options object
   * @param {Array} options.queryParams - List of parameters for the query
   * @param {string} options.queryId - id of the query
   * @returns {Promise|void} Results of calling watch event
   */
  const watchEvent = (type, path, storeAs, options = {}) =>
    queryActions.watchEvent(firebase, dispatch, {
      type,
      path,
      storeAs,
      ...options
    })

  /**
   * Unset a listener watch event. **Note:** this method is used
   * internally so examples have not yet been created, and it may not work
   * as expected. More info available in [the docs](https://react-redux-firebase.com/api/props-firebase.html#unwatchevent).
   * @param {string} type - Type of watch event
   * @param {string} path - Path to location on Firebase which to unset listener
   * @param {string} queryId - Id of the listener
   * @param {object} options - Event options object
   * @returns {void}
   */
  const unWatchEvent = (type, path, queryId, options = {}) =>
    queryActions.unWatchEvent(firebase, dispatch, {
      type,
      path,
      queryId,
      ...options
    })

  /**
   * Similar to the firebaseConnect Higher Order Component but
   * presented as a function (not a React Component). Useful for populating
   * your redux state without React, e.g., for server side rendering. Only
   * `once` type should be used as other query types such as `value` do not
   * return a Promise.
   * @param {Array} watchArray - Array of objects or strings for paths to sync
   * from Firebase. Can also be a function that returns the array. The function
   * is passed the props object specified as the next parameter.
   * @param {object} options - The options object that you would like to pass to
   * your watchArray generating function.
   * @returns {Promise} Resolves with an array of watchEvent results
   */
  const promiseEvents = (watchArray, options) => {
    const inputAsFunc = createCallable(watchArray)
    const prevData = inputAsFunc(options, firebase)
    const queryConfigs = getEventsFromInput(prevData)
    // TODO: Handle calling with non promise queries (must be once or first_child)
    return Promise.all(
      queryConfigs.map(queryConfig =>
        queryActions.watchEvent(firebase, dispatch, queryConfig)
      )
    )
  }

  /**
   * Logs user into Firebase. For examples, visit the
   * [auth section of the docs](/docs/auth.md)
   * @param {object} credentials - Credentials for authenticating
   * @param {string} credentials.provider - External provider (google |
   * facebook | twitter)
   * @param {string} credentials.type - Type of external authentication
   * (popup | redirect) (only used with provider)
   * @param {string} credentials.email - Credentials for authenticating
   * @param {string} credentials.password - Credentials for authenticating (only used with email)
   * @returns {Promise} Containing user's auth data
   */
  const login = credentials =>
    authActions.login(dispatch, firebase, credentials)

  /**
   * Logs user into Firebase using external. For examples, visit the
   * [auth section](/docs/recipes/auth.md)
   * @param {object} authData - Auth data from Firebase's getRedirectResult
   * @returns {Promise} Containing user's profile
   */
  const handleRedirectResult = authData =>
    authActions.handleRedirectResult(dispatch, firebase, authData)

  /**
   * Logs user out of Firebase and empties firebase state from
   * redux store
   * @returns {Promise} Resolves after logout is complete
   */
  const logout = () => authActions.logout(dispatch, firebase)

  /**
   * Creates a new user in Firebase authentication. If
   * `userProfile` config option is set, user profiles will be set to this
   * location.
   * @param {object} credentials - Credentials for authenticating
   * @param {string} credentials.email - Credentials for authenticating
   * @param {string} credentials.password - Credentials for authenticating (only used with email)
   * @param {object} profile - Data to include within new user profile
   * @returns {Promise} Containing user's auth data
   */
  const createUser = (credentials, profile) =>
    authActions.createUser(dispatch, firebase, credentials, profile)

  /**
   * Sends password reset email
   * @param {object} credentials - Credentials for authenticating
   * @param {string} credentials.email - Credentials for authenticating
   * @returns {Promise} Resolves after password reset email is sent
   */
  const resetPassword = credentials =>
    authActions.resetPassword(dispatch, firebase, credentials)

  /**
   * Confirm that a user's password has been reset
   * @param {string} code - Password reset code to verify
   * @param {string} password - New Password to confirm reset to
   * @returns {Promise} Resolves after password reset is confirmed
   */
  const confirmPasswordReset = (code, password) =>
    authActions.confirmPasswordReset(dispatch, firebase, code, password)

  /**
   * Verify that a password reset code from a password reset
   * email is valid
   * @param {string} code - Password reset code to verify
   * @returns {Promise} Containing user auth info
   */
  const verifyPasswordResetCode = code =>
    authActions.verifyPasswordResetCode(dispatch, firebase, code)

  /**
   * Update user profile on Firebase Real Time Database or
   * Firestore (if `useFirestoreForProfile: true` config passed to
   * reactReduxFirebase). Real Time Database update uses `update` method
   * internally while updating profile on Firestore uses `set` with
   * @param {object} profileUpdate - Profile data to place in new profile
   * @param {object} options - Options object (used to change how profile
   * update occurs)
   * @param {boolean} [options.useSet=true] - Use set with merge instead of
   * update. Setting to `false` uses update (can cause issue of profile document
   * does not exist). Note: Only used when updating profile on Firestore
   * @param {boolean} [options.merge=true] - Whether or not to use merge when
   * setting profile. Note: Only used when updating profile on Firestore
   * @returns {Promise} Returns after updating profile within database
   */
  const updateProfile = (profileUpdate, options) =>
    authActions.updateProfile(dispatch, firebase, profileUpdate, options)

  /**
   * Update Auth profile object
   * @param {object} authUpdate - Update to be auth object
   * @param {boolean} updateInProfile - Update in profile
   * @returns {Promise} Returns after updating auth profile
   */
  const updateAuth = (authUpdate, updateInProfile) =>
    authActions.updateAuth(dispatch, firebase, authUpdate, updateInProfile)

  /**
   * Update user's email
   * @param {string} newEmail - Update to be auth object
   * @param {boolean} updateInProfile - Update in profile
   * @returns {Promise} Resolves after email is updated in user's auth
   */
  const updateEmail = (newEmail, updateInProfile) =>
    authActions.updateEmail(dispatch, firebase, newEmail, updateInProfile)

  /**
   * Reload user's auth object. Must be authenticated.
   * @returns {Promise} Resolves after reloading firebase auth
   */
  const reloadAuth = () => authActions.reloadAuth(dispatch, firebase)

  /**
   * Links the user account with the given credentials.
   * @param {firebase.auth.AuthCredential} credential - The auth credential
   * @returns {Promise} Resolves after linking auth with a credential
   */
  const linkWithCredential = credential =>
    authActions.linkWithCredential(dispatch, firebase, credential)

  /**
   * @name signInWithPhoneNumber
   * Asynchronously signs in using a phone number. This method
   * sends a code via SMS to the given phone number, and returns a modified
   * firebase.auth.ConfirmationResult. The `confirm` method
   * authenticates and does profile handling.
   * @param {firebase.auth.ConfirmationResult} credential - The auth credential
   * @returns {Promise}
   */

  /**
   * @name initializeAuth
   * Initialize auth to work with build in profile support
   */
  const actionCreators = mapWithFirebaseAndDispatch(
    firebase,
    dispatch,
    // Actions with arg order (firebase, dispatch)
    {
      signInWithPhoneNumber: authActions.signInWithPhoneNumber
    },
    // Actions with arg order (dispatch, firebase)
    {
      initializeAuth: authActions.init
    }
  )

  /**
   * @name ref
   * @description Firebase ref function
   * @returns {firebase.database.Reference}
   */
  /**
   * @name database
   * @description Firebase database service instance including all Firebase storage methods
   * @returns {firebase.database.Database} Firebase database service
   */
  /**
   * @name storage
   * @description Firebase storage service instance including all Firebase storage methods
   * @returns {firebase.database.Storage} Firebase storage service
   */
  /**
   * @name auth
   * @description Firebase auth service instance including all Firebase auth methods
   * @returns {firebase.database.Auth}
   */
  firebaseInstance = Object.assign(firebase, {
    _reactReduxFirebaseExtended: true,
    ref: path => firebase.database().ref(path),
    set,
    setWithMeta,
    uniqueSet,
    push,
    pushWithMeta,
    remove,
    update,
    updateWithMeta,
    login,
    handleRedirectResult,
    logout,
    updateAuth,
    updateEmail,
    updateProfile,
    uploadFile,
    uploadFiles,
    deleteFile,
    createUser,
    resetPassword,
    confirmPasswordReset,
    verifyPasswordResetCode,
    watchEvent,
    unWatchEvent,
    reloadAuth,
    linkWithCredential,
    promiseEvents,
    dispatch,
    ...actionCreators
  })
  return firebaseInstance
}

/**
 * Get internal Firebase instance with methods which are wrapped with action dispatches. Useful for
 * integrations into external libraries such as redux-thunk and redux-observable.
 * @returns {object} Firebase instance with methods which dispatch redux actions
 * @see http://react-redux-firebase.com/api/getFirebase.html
 * @example <caption>redux-thunk integration</caption>
 * import { applyMiddleware, compose, createStore } from 'redux';
 * import thunk from 'redux-thunk';
 * import { getFirebase } from 'react-redux-firebase';
 * import makeRootReducer from './reducers';
 *
 * const fbConfig = {} // your firebase config
 *
 * const store = createStore(
 *   makeRootReducer(),
 *   initialState,
 *   compose(
 *     applyMiddleware([
 *       // Pass getFirebase function as extra argument
 *       thunk.withExtraArgument(getFirebase)
 *     ])
 *   )
 * );
 * // then later
 * export function addTodo(newTodo) {
 *   return (dispatch, getState, getFirebase) => {
 *     const firebase = getFirebase()
 *     firebase
 *       .push('todos', newTodo)
 *       .then(() => {
 *         dispatch({ type: 'SOME_ACTION' })
 *       })
 *   }
 * }
 */
export function getFirebase() {
  /* istanbul ignore next: Firebase instance always exists during tests */
  if (!firebaseInstance) {
    throw new Error(
      'Firebase instance does not yet exist. Check your compose function.'
    ) // eslint-disable-line no-console
  }
  return firebaseInstance
}
