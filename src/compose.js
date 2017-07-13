import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import { isObject } from 'lodash'
import { defaultConfig } from './constants'
import { validateConfig } from './utils'
import { authActions, queryActions, storageActions } from './actions'
let firebaseInstance

/**
 * @name reactReduxFirebase
 * @external
 * @description Middleware that handles configuration (placed in redux's
 * `compose` call)
 * @property {Object} fbConfig - Object containing Firebase config including
 * databaseURL
 * @property {String} fbConfig.apiKey - Firebase apiKey
 * @property {String} fbConfig.authDomain - Firebase auth domain
 * @property {String} fbConfig.databaseURL - Firebase database url
 * @property {String} fbConfig.storageBucket - Firebase storage bucket
 * @property {Object} config - Containing react-redux-firebase specific config
 * such as userProfile
 * @property {String} config.userProfile - Location on firebase to store user
 * profiles
 * @property {Boolean} config.enableLogging - Whether or not to enable Firebase
 * database logging
 * @property {Boolean} config.updateProfileOnLogin - Whether or not to update
 * profile when logging in. (default: `false`)
 * @property {Boolean} config.enableRedirectHandling - Whether or not to enable
 * auth redirect handling listener. (default: `true`)
 * @property {Function} config.onAuthStateChanged - Function run when auth state
 * changes. Argument Pattern: `(authData, firebase, dispatch)`
 * @property {Function} config.onRedirectResult - Function run when redirect
 * result is returned. Argument Pattern: `(authData, firebase, dispatch)`
 * @property {Object} config.customAuthParameters - Object for setting which
 * customAuthParameters are passed to external auth providers.
 * @property {Function} config.profileFactory - Factory for modifying how user profile is saved.
 * @property {Array|String} config.profileParamsToPopulate - Parameters within
 * profile object to populate
 * @property {Boolean} config.autoPopulateProfile - Whether or not to
 * automatically populate profile with data loaded through
 * profileParamsToPopulate config. (default: `true`)
 * @property {Boolean} config.setProfilePopulateResults - Whether or not to
 * call SET actions for data that results from populating profile to redux under
 * the data path. For example: role paramter on profile populated from 'roles'
 * root. True will call SET_PROFILE as well as a SET action with the role that
 * is loaded (places it in data/roles). (default: `false`)
 * @return {Function} That accepts a component and returns a Component which
 * wraps the provided component (higher order component).
 * @example <caption>Setup</caption>
 * import { createStore, compose } from 'redux'
 * import { reactReduxFirebase } from 'react-redux-firebase'

 * // React Redux Firebase Config
 * const config = {
 *   userProfile: 'users', // saves user profiles to '/users' on Firebase
 *   // here is where you place other config options
 * }
 *
 * // Add react-redux-firebase to compose
 * // Note: In full projects this will often be within createStore.js or store.js
 * const createStoreWithFirebase = compose(
 *  reactReduxFirebase(fbConfig, config),
 * )(createStore)
 *
 * // Use Function later to create store
 * const store = createStoreWithFirebase(rootReducer, initialState)
 * @example <caption>Custom Auth Parameters</caption>
 * // Follow Setup example with the following config:
 * const config = {
 *   customAuthParameters: {
 *      google: {
 *        // prompts user to select account on every google login
 *        prompt: 'select_account'
 *      }
 *   }
 * }
 */
export default (fbConfig, otherConfig) => next =>
  (reducer, initialState, middleware) => {
    const store = next(reducer, initialState, middleware)
    const { dispatch } = store

    // Combine all configs
    const configs = Object.assign({}, defaultConfig, fbConfig, otherConfig)

    validateConfig(configs)

    // Initialize Firebase
    try {
      firebase.initializeApp(fbConfig)
    } catch (err) {} // silence reinitialize warning (hot-reloading)

    // Enable Logging based on config
    if (configs.enableLogging) {
      firebase.database.enableLogging(configs.enableLogging)
    }

    // Handle react-native
    if (configs.ReactNative) {
      configs.enableRedirectHandling = false
      const { AsyncStorage } = configs.ReactNative
      // Stub firebase's internal's with react-native (based on firebase's react-native index file)
      firebase.INTERNAL.extendNamespace({
        INTERNAL: {
          reactNative: {
            AsyncStorage
          }
        }
      })
    }

    const rootRef = firebase.database().ref()

    const instance = Object.defineProperty(firebase, '_', {
      value: {
        watchers: {},
        config: configs,
        authUid: null
      },
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
        if (instance.auth().currentUser) {
          dataWithMeta[`${prefix}By`] = instance.auth().currentUser.uid
        }
        return rootRef.child(path)[method](dataWithMeta, onComplete)
      }
      return rootRef.child(path)[method](value, onComplete)
    }

    /**
     * @private
     * @description Sets data to Firebase.
     * @param {String} path - Path to location on Firebase which to set
     * @param {Object|String|Boolean|Number} value - Value to write to Firebase
     * @param {Function} onComplete - Function to run on complete (`not required`)
     * @return {Promise} Containing reference snapshot
     * @example <caption>Basic</caption>
     * import React, { Component, PropTypes } from 'react'
     * import { firebaseConnect } from 'react-redux-firebase'
     * const Example = ({ firebase: { set } }) => (
     *   <button onClick={() => set('some/path', { here: 'is a value' })}>
     *     Set To Firebase
     *   </button>
     * )
     * export default firebaseConnect()(Example)
     */
    const set = (path, value, onComplete) =>
      rootRef.child(path).set(value, onComplete)

    /**
     * @private
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
     * @private
     * @description Pushes data to Firebase.
     * @param {String} path - Path to location on Firebase which to push
     * @param {Object|String|Boolean|Number} value - Value to push to Firebase
     * @param {Function} onComplete - Function to run on complete (`not required`)
     * @return {Promise} Containing reference snapshot
     * @example <caption>Basic</caption>
     * import React, { Component, PropTypes } from 'react'
     * import { firebaseConnect } from 'react-redux-firebase'
     * const Example = ({ firebase: { push } }) => (
     *   <button onClick={() => push('some/path', true)}>
     *     Push To Firebase
     *   </button>
     * )
     * export default firebaseConnect()(Example)
     */
    const push = (path, value, onComplete) =>
      rootRef.child(path).push(value, onComplete)

    /**
     * @private
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
     * @private
     * @description Updates data on Firebase and sends new data.
     * @param {String} path - Path to location on Firebase which to update
     * @param {Object|String|Boolean|Number} value - Value to update to Firebase
     * @param {Function} onComplete - Function to run on complete (`not required`)
     * @return {Promise} Containing reference snapshot
     * @example <caption>Basic</caption>
     * import React, { Component, PropTypes } from 'react'
     * import { firebaseConnect } from 'react-redux-firebase'
     * const Example = ({ firebase: { update } }) => (
     *   <button onClick={() => update('some/path', { here: 'is a value' })}>
     *     Update To Firebase
     *   </button>
     * )
     * export default firebaseConnect()(Example)
     */
    const update = (path, value, onComplete) =>
      rootRef.child(path).update(value, onComplete)

    /**
     * @private
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
     * @private
     * @description Removes data from Firebase at a given path.
     * @param {String} path - Path to location on Firebase which to remove
     * @param {Function} onComplete - Function to run on complete (`not required`)
     * @return {Promise} Containing reference snapshot
     * @example <caption>Basic</caption>
     * import React, { Component, PropTypes } from 'react'
     * import { firebaseConnect } from 'react-redux-firebase'
     * const Example = ({ firebase: { remove } }) => (
     *   <button onClick={() => remove('some/path')}>
     *     Remove From Firebase
     *   </button>
     * )
     * export default firebaseConnect()(Example)
     */
    const remove = (path, onComplete) =>
      rootRef.child(path).remove(onComplete)

    /**
     * @private
     * @description Sets data to Firebase only if the path does not already
     * exist, otherwise it rejects.
     * @param {String} path - Path to location on Firebase which to set
     * @param {Object|String|Boolean|Number} value - Value to write to Firebase
     * @param {Function} onComplete - Function to run on complete (`not required`)
     * @return {Promise} Containing reference snapshot
     * @example <caption>Basic</caption>
     * import React, { Component, PropTypes } from 'react'
     * import { firebaseConnect } from 'react-redux-firebase'
     * const Example = ({ firebase: { uniqueSet } }) => (
     *   <button onClick={() => uniqueSet('some/unique/path', true)}>
     *     Unique Set To Firebase
     *   </button>
     * )
     * export default firebaseConnect()(Example)
     */
    const uniqueSet = (path, value, onComplete) =>
      rootRef.child(path)
        .once('value')
        .then(snap => {
          if (snap.val && snap.val() !== null) {
            const err = new Error('Path already exists.')
            if (onComplete) onComplete(err)
            return Promise.reject(err)
          }
          return rootRef.child(path).set(value, onComplete)
        })

    /**
     * @private
     * @description Upload a file to Firebase Storage with the option to store
     * its metadata in Firebase Database
     * @param {String} path - Path to location on Firebase which to set
     * @param {File} file - File object to upload (usually first element from
     * array output of select-file or a drag/drop `onDrop`)
     * @param {String} dbPath - Database path to place uploaded file metadata
     * @return {Promise} Containing the File object
     */
    const uploadFile = (path, file, dbPath) =>
      storageActions.uploadFile(dispatch, instance, { path, file, dbPath })

    /**
     * @private
     * @description Upload multiple files to Firebase Storage with the option
     * to store their metadata in Firebase Database
     * @param {String} path - Path to location on Firebase which to set
     * @param {Array} files - Array of File objects to upload (usually from
     * a select-file or a drag/drop `onDrop`)
     * @param {String} dbPath - Database path to place uploaded files metadata.
     * @return {Promise} Containing an array of File objects
     */
    const uploadFiles = (path, files, dbPath) =>
      storageActions.uploadFiles(dispatch, instance, { path, files, dbPath })

    /**
     * @private
     * @description Delete a file from Firebase Storage with the option to
     * remove its metadata in Firebase Database
     * @param {String} path - Path to location on Firebase which to set
     * @param {String} dbPath - Database path to place uploaded file metadata
     * @return {Promise} Containing the File object
     */
    const deleteFile = (path, dbPath) =>
      storageActions.deleteFile(dispatch, instance, { path, dbPath })

    /**
     * @private
     * @description Watch event. **Note:** this method is used internally
     * so examples have not yet been created, and it may not work as expected.
     * @param {String} type - Type of watch event
     * @param {String} dbPath - Database path on which to setup watch event
     * @param {String} storeAs - Name of listener results within redux store
     * @return {Promise}
     */
    const watchEvent = (type, path, storeAs) =>
      queryActions.watchEvent(instance, dispatch, { type, path, storeAs })

    /**
     * @private
     * @description Unset a listener watch event. **Note:** this method is used
     * internally so examples have not yet been created, and it may not work
     * as expected.
     * @param {String} eventName - Type of watch event
     * @param {String} eventPath - Database path on which to setup watch event
     * @param {String} storeAs - Name of listener results within redux store
     * @return {Promise}
     */
    const unWatchEvent = (eventName, eventPath, queryId = undefined) =>
      queryActions.unWatchEvent(instance, dispatch, eventName, eventPath, queryId)

    /**
     * @private
     * @description Logs user into Firebase. For examples, visit the [auth section](/docs/auth.md)
     * @param {Object} credentials - Credentials for authenticating
     * @param {String} credentials.provider - External provider (google | facebook | twitter)
     * @param {String} credentials.type - Type of external authentication (popup | redirect) (only used with provider)
     * @param {String} credentials.email - Credentials for authenticating
     * @param {String} credentials.password - Credentials for authenticating (only used with email)
     * @return {Promise} Containing user's auth data
     */
    const login = credentials =>
      authActions.login(dispatch, instance, credentials)

    /**
     * @private
     * @description Logs user out of Firebase and empties firebase state from
     * redux store
     * @return {Promise}
     */
    const logout = () =>
      authActions.logout(dispatch, instance)

    /**
     * @private
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
      authActions.createUser(dispatch, instance, credentials, profile)

    /**
     * @private
     * @description Sends password reset email
     * @param {Object} credentials - Credentials for authenticating
     * @param {String} credentials.email - Credentials for authenticating
     * @return {Promise}
     */
    const resetPassword = (credentials) =>
      authActions.resetPassword(dispatch, instance, credentials)

    /**
     * @private
     * @description Confirm that a user's password has been reset
     * @param {String} code - Password reset code to verify
     * @param {String} password - New Password to confirm reset to
     * @return {Promise}
     */
    const confirmPasswordReset = (code, password) =>
      authActions.confirmPasswordReset(dispatch, instance, code, password)

    /**
     * @private
     * @description Verify that a password reset code from a password reset
     * email is valid
     * @param {String} code - Password reset code to verify
     * @return {Promise} Containing user auth info
     */
    const verifyPasswordResetCode = (code) =>
      authActions.verifyPasswordResetCode(dispatch, instance, code)

    /**
     * @name ref
     * @description Firebase ref function
     * @return {database.Reference}
     * @private
     */
   /**
    * @name database
    * @description Firebase database service instance including all Firebase storage methods
    * @return {Database} Firebase database service
    * @private
    */
   /**
    * @name storage
    * @description Firebase storage service instance including all Firebase storage methods
    * @return {Storage} Firebase storage service
    * @private
    */
    /**
     * @name auth
     * @description Firebase auth service instance including all Firebase auth methods
     * @return {Auth}
     * @private
     */
    firebase.helpers = {
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
      uploadFile,
      uploadFiles,
      deleteFile,
      createUser,
      resetPassword,
      confirmPasswordReset,
      verifyPasswordResetCode,
      watchEvent,
      unWatchEvent,
      storage: () => firebase.storage()
    }

    authActions.init(dispatch, instance)

    store.firebase = instance
    firebaseInstance = Object.assign({}, instance, instance.helpers)

    return store
  }

/**
 * @private
 * @description Expose Firebase instance created internally. Useful for
 * integrations into external libraries such as redux-thunk and redux-observable.
 * @example <caption>redux-thunk integration</caption>
 * import { applyMiddleware, compose, createStore } from 'redux';
 * import thunk from 'redux-thunk';
 * import { reactReduxFirebase } from 'react-redux-firebase';
 * import makeRootReducer from './reducers';
 * import { getFirebase } from 'react-redux-firebase';
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
 *     ]),
 *     reactReduxFirebase(fbConfig)
 *   )
 * );
 * // then later
 * export const addTodo = (newTodo) =>
 *  (dispatch, getState, getFirebase) => {
 *    const firebase = getFirebase()
 *    firebase
 *      .push('todos', newTodo)
 *      .then(() => {
 *        dispatch({ type: 'SOME_ACTION' })
 *      })
 * };
 *
 */
export const getFirebase = () => {
  // TODO: Handle recieveing config and creating firebase instance if it doesn't exist
  /* istanbul ignore next: Firebase instance always exists during tests */
  if (!firebaseInstance) {
    throw new Error('Firebase instance does not yet exist. Check your compose function.') // eslint-disable-line no-console
  }
  // TODO: Create new firebase here with config passed in
  return firebaseInstance
}
