import { isObject } from 'lodash'
import { getEventsFromInput, createCallable } from './utils'
import { mapWithFirebaseAndDispatch } from './utils/actions'
import { authActions, queryActions, storageActions } from './actions'

/**
 * Create a firebase instance that has helpers attached for dispatching actions
 * @param  {Object} firebase - Firebase instance which to extend
 * @param  {Object} configs - Configuration object
 * @param  {Function} dispatch - Action dispatch function
 * @return {Object} Extended Firebase instance
 * @private
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

  Object.defineProperty(firebase, '_', {
    value: defaultInternals,
    writable: true,
    enumerable: true,
    configurable: true
  })

  /**
   * @private
   * @description Calls a method and attaches meta to value object
   * @param {String} method - Method to run with meta attached
   * @param {String} path - Path to location on Firebase which to set
   * @param {Object|String|Boolean|Number} value - Value to write to Firebase
   * @param {Function} onComplete - Function to run on complete
   * @return {Promise} Containing reference snapshot
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
   * @description Sets data to Firebase.
   * @param {String} path - Path to location on Firebase which to set
   * @param {Object|String|Boolean|Number} value - Value to write to Firebase
   * @param {Function} onComplete - Function to run on complete (`not required`)
   * @return {Promise} Containing reference snapshot
   * @example <caption>Basic</caption>
   * import React, { Component } from 'react'
   * import PropTypes from 'prop-types'
   * import { firebaseConnect } from 'react-redux-firebase'
   * const Example = ({ firebase: { set } }) => (
   *   <button onClick={() => set('some/path', { here: 'is a value' })}>
   *     Set To Firebase
   *   </button>
   * )
   * export default firebaseConnect()(Example)
   */
  const set = (path, value, onComplete) =>
    firebase
      .database()
      .ref(path)
      .set(value, onComplete)

  /**
   * @description Sets data to Firebase along with meta data. Currently,
   * this includes createdAt and createdBy. *Warning* using this function
   * may have unintented consequences (setting createdAt even if data already
   * exists)
   * @param {String} path - Path to location on Firebase which to set
   * @param {Object|String|Boolean|Number} value - Value to write to Firebase
   * @param {Function} onComplete - Function to run on complete (`not required`)
   * @return {Promise} Containing reference snapshot
   */
  const setWithMeta = (path, value, onComplete) =>
    withMeta('set', path, value, onComplete)

  /**
   * @description Pushes data to Firebase.
   * @param {String} path - Path to location on Firebase which to push
   * @param {Object|String|Boolean|Number} value - Value to push to Firebase
   * @param {Function} onComplete - Function to run on complete (`not required`)
   * @return {Promise} Containing reference snapshot
   * @example <caption>Basic</caption>
   * import React, { Component } from 'react'
   * import PropTypes from 'prop-types'
   * import { firebaseConnect } from 'react-redux-firebase'
   * const Example = ({ firebase: { push } }) => (
   *   <button onClick={() => push('some/path', true)}>
   *     Push To Firebase
   *   </button>
   * )
   * export default firebaseConnect()(Example)
   */
  const push = (path, value, onComplete) =>
    firebase
      .database()
      .ref(path)
      .push(value, onComplete)

  /**
   * @description Pushes data to Firebase along with meta data. Currently,
   * this includes createdAt and createdBy.
   * @param {String} path - Path to location on Firebase which to set
   * @param {Object|String|Boolean|Number} value - Value to write to Firebase
   * @param {Function} onComplete - Function to run on complete (`not required`)
   * @return {Promise} Containing reference snapshot
   */
  const pushWithMeta = (path, value, onComplete) =>
    withMeta('push', path, value, onComplete)

  /**
   * @description Updates data on Firebase and sends new data.
   * @param {String} path - Path to location on Firebase which to update
   * @param {Object|String|Boolean|Number} value - Value to update to Firebase
   * @param {Function} onComplete - Function to run on complete (`not required`)
   * @return {Promise} Containing reference snapshot
   * @example <caption>Basic</caption>
   * import React, { Component } from 'react'
   * import PropTypes from 'prop-types'
   * import { firebaseConnect } from 'react-redux-firebase'
   * const Example = ({ firebase: { update } }) => (
   *   <button onClick={() => update('some/path', { here: 'is a value' })}>
   *     Update To Firebase
   *   </button>
   * )
   * export default firebaseConnect()(Example)
   */
  const update = (path, value, onComplete) =>
    firebase
      .database()
      .ref(path)
      .update(value, onComplete)

  /**
   * @description Updates data on Firebase along with meta. *Warning*
   * using this function may have unintented consequences (setting
   * createdAt even if data already exists)
   * @param {String} path - Path to location on Firebase which to update
   * @param {Object|String|Boolean|Number} value - Value to update to Firebase
   * @param {Function} onComplete - Function to run on complete (`not required`)
   * @return {Promise} Containing reference snapshot
   */
  const updateWithMeta = (path, value, onComplete) =>
    withMeta('update', path, value, onComplete)

  /**
   * @description Removes data from Firebase at a given path. **NOTE** A
   * seperate action is not dispatched unless `dispatchRemoveAction: true` is
   * provided to config on store creation. That means that a listener must
   * be attached in order for state to be updated when calling remove.
   * @param {String} path - Path to location on Firebase which to remove
   * @param {Function} onComplete - Function to run on complete (`not required`)
   * @return {Promise} Containing reference snapshot
   * @example <caption>Basic</caption>
   * import React, { Component } from 'react'
   * import PropTypes from 'prop-types'
   * import { firebaseConnect } from 'react-redux-firebase'
   * const Example = ({ firebase: { remove } }) => (
   *   <button onClick={() => remove('some/path')}>
   *     Remove From Firebase
   *   </button>
   * )
   * export default firebaseConnect()(Example)
   */
  const remove = (path, onComplete, options) =>
    queryActions.remove(firebase, dispatch, path, options).then(() => {
      if (typeof onComplete === 'function') onComplete()
      return path
    })

  /**
   * @description Sets data to Firebase only if the path does not already
   * exist, otherwise it rejects. Internally uses a Firebase transaction to
   * prevent a race condition between seperate clients calling uniqueSet.
   * @param {String} path - Path to location on Firebase which to set
   * @param {Object|String|Boolean|Number} value - Value to write to Firebase
   * @param {Function} onComplete - Function to run on complete (`not required`)
   * @return {Promise} Containing reference snapshot
   * @example <caption>Basic</caption>
   * import React, { Component } from 'react'
   * import PropTypes from 'prop-types'
   * import { firebaseConnect } from 'react-redux-firebase'
   * const Example = ({ firebase: { uniqueSet } }) => (
   *   <button onClick={() => uniqueSet('some/unique/path', true)}>
   *     Unique Set To Firebase
   *   </button>
   * )
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
   * @description Upload a file to Firebase Storage with the option to store
   * its metadata in Firebase Database
   * @param {String} path - Path to location on Firebase which to set
   * @param {File} file - File object to upload (usually first element from
   * array output of select-file or a drag/drop `onDrop`)
   * @param {String} dbPath - Database path to place uploaded file metadata
   * @param {Object} options - Options
   * @param {String} options.name - Name of the file
   * @return {Promise} Containing the File object
   */
  const uploadFile = (path, file, dbPath, options) =>
    storageActions.uploadFile(dispatch, firebase, {
      path,
      file,
      dbPath,
      options
    })

  /**
   * @description Upload multiple files to Firebase Storage with the option
   * to store their metadata in Firebase Database
   * @param {String} path - Path to location on Firebase which to set
   * @param {Array} files - Array of File objects to upload (usually from
   * a select-file or a drag/drop `onDrop`)
   * @param {String} dbPath - Database path to place uploaded files metadata.
   * @param {Object} options - Options
   * @param {String} options.name - Name of the file
   * @return {Promise} Containing an array of File objects
   */
  const uploadFiles = (path, files, dbPath, options) =>
    storageActions.uploadFiles(dispatch, firebase, {
      path,
      files,
      dbPath,
      options
    })

  /**
   * @description Delete a file from Firebase Storage with the option to
   * remove its metadata in Firebase Database
   * @param {String} path - Path to location on Firebase which to set
   * @param {String} dbPath - Database path to place uploaded file metadata
   * @return {Promise} Containing the File object
   */
  const deleteFile = (path, dbPath) =>
    storageActions.deleteFile(dispatch, firebase, { path, dbPath })

  /**
   * @description Watch event. **Note:** this method is used internally
   * so examples have not yet been created, and it may not work as expected.
   * @param {String} type - Type of watch event
   * @param {String} path - Path to location on Firebase which to set listener
   * @param {String} storeAs - Name of listener results within redux store
   * @param {Object} options - Event options object
   * @param {Array} options.queryParams - List of parameters for the query
   * @param {String} options.queryId - id of the query
   * @return {Promise}
   */
  const watchEvent = (type, path, storeAs, options = {}) =>
    queryActions.watchEvent(firebase, dispatch, {
      type,
      path,
      storeAs,
      ...options
    })

  /**
   * @description Unset a listener watch event. **Note:** this method is used
   * internally so examples have not yet been created, and it may not work
   * as expected.
   * @param {String} type - Type of watch event
   * @param {String} path - Path to location on Firebase which to unset listener
   * @param {String} queryId - Id of the listener
   * @param {Object} options - Event options object
   * @return {Promise}
   */
  const unWatchEvent = (type, path, queryId, options = {}) =>
    queryActions.unWatchEvent(firebase, dispatch, {
      type,
      path,
      queryId,
      ...options
    })

  /**
   * @description Similar to the firebaseConnect Higher Order Component but
   * presented as a function (not a React Component). Useful for populating
   * your redux state without React, e.g., for server side rendering. Only
   * `once` type should be used as other query types such as `value` do not
   * return a Promise.
   * @param {Array} watchArray - Array of objects or strings for paths to sync
   * from Firebase. Can also be a function that returns the array. The function
   * is passed the props object specified as the next parameter.
   * @param {Object} options - The options object that you would like to pass to
   * your watchArray generating function.
   * @return {Promise}
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
   * @description Logs user into Firebase. For examples, visit the
   * [auth section](/docs/auth.md)
   * @param {Object} credentials - Credentials for authenticating
   * @param {String} credentials.provider - External provider (google |
   * facebook | twitter)
   * @param {String} credentials.type - Type of external authentication
   * (popup | redirect) (only used with provider)
   * @param {String} credentials.email - Credentials for authenticating
   * @param {String} credentials.password - Credentials for authenticating (only used with email)
   * @return {Promise} Containing user's auth data
   */
  const login = credentials =>
    authActions.login(dispatch, firebase, credentials)

  /**
   * @description Logs user out of Firebase and empties firebase state from
   * redux store
   * @return {Promise}
   */
  const logout = () => authActions.logout(dispatch, firebase)

  /**
   * @description Creates a new user in Firebase authentication. If
   * `userProfile` config option is set, user profiles will be set to this
   * location.
   * @param {Object} credentials - Credentials for authenticating
   * @param {String} credentials.email - Credentials for authenticating
   * @param {String} credentials.password - Credentials for authenticating (only used with email)
   * @param {Object} profile - Data to include within new user profile
   * @return {Promise} Containing user's auth data
   */
  const createUser = (credentials, profile) =>
    authActions.createUser(dispatch, firebase, credentials, profile)

  /**
   * @description Sends password reset email
   * @param {Object} credentials - Credentials for authenticating
   * @param {String} credentials.email - Credentials for authenticating
   * @return {Promise}
   */
  const resetPassword = credentials =>
    authActions.resetPassword(dispatch, firebase, credentials)

  /**
   * @description Confirm that a user's password has been reset
   * @param {String} code - Password reset code to verify
   * @param {String} password - New Password to confirm reset to
   * @return {Promise}
   */
  const confirmPasswordReset = (code, password) =>
    authActions.confirmPasswordReset(dispatch, firebase, code, password)

  /**
   * @description Verify that a password reset code from a password reset
   * email is valid
   * @param {String} code - Password reset code to verify
   * @return {Promise} Containing user auth info
   */
  const verifyPasswordResetCode = code =>
    authActions.verifyPasswordResetCode(dispatch, firebase, code)

  /**
   * @description Update user profile on Firebase Real Time Database or
   * Firestore (if `useFirestoreForProfile: true` config passed to
   * reactReduxFirebase). Real Time Database update uses `update` method
   * internally while updating profile on Firestore uses `set` with
   * @param {Object} profileUpdate - Profile data to place in new profile
   * @param {Object} options - Options object (used to change how profile
   * update occurs)
   * @param  {Boolean} [options.useSet=true] - Use set with merge instead of
   * update. Setting to `false` uses update (can cause issue of profile document
   * does not exist). Note: Only used when updating profile on Firestore
   * @param  {Boolean} [options.merge=true] - Whether or not to use merge when
   * setting profile. Note: Only used when updating profile on Firestore
   * @return {Promise}
   */
  const updateProfile = (profileUpdate, options) =>
    authActions.updateProfile(dispatch, firebase, profileUpdate, options)

  /**
   * @description Update Auth Object
   * @param {Object} authUpdate - Update to be auth object
   * @param {Boolean} updateInProfile - Update in profile
   * @return {Promise}
   */
  const updateAuth = (authUpdate, updateInProfile) =>
    authActions.updateAuth(dispatch, firebase, authUpdate, updateInProfile)

  /**
   * @description Update user's email
   * @param {String} newEmail - Update to be auth object
   * @param {Boolean} updateInProfile - Update in profile
   * @return {Promise}
   */
  const updateEmail = (newEmail, updateInProfile) =>
    authActions.updateEmail(dispatch, firebase, newEmail, updateInProfile)

  /**
   * @description Reload user's auth object. Must be authenticated.
   * @return {Promise}
   */
  const reloadAuth = () => authActions.reloadAuth(dispatch, firebase)

  /**
   * @description Links the user account with the given credentials.
   * @param {firebase.auth.AuthCredential} credential - The auth credential
   * @return {Promise}
   */
  const linkWithCredential = credential =>
    authActions.linkWithCredential(dispatch, firebase, credential)

  /**
   * @name signInWithPhoneNumber
   * @description Asynchronously signs in using a phone number. This method
   * sends a code via SMS to the given phone number, and returns a modified
   * firebase.auth.ConfirmationResult. The `confirm` method
   * authenticates and does profile handling.
   * @param {firebase.auth.ConfirmationResult} credential - The auth credential
   * @return {Promise}
   */
  /**
   * @name initializeAuth
   * @description Initialize auth to work with build in profile support
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
   * @return {firebase.database.Reference}
   */
  /**
   * @name database
   * @description Firebase database service instance including all Firebase storage methods
   * @return {firebase.database.Database} Firebase database service
   */
  /**
   * @name storage
   * @description Firebase storage service instance including all Firebase storage methods
   * @return {firebase.database.Storage} Firebase storage service
   */
  /**
   * @name auth
   * @description Firebase auth service instance including all Firebase auth methods
   * @return {firebase.database.Auth}
   */
  return Object.assign(firebase, {
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
}
