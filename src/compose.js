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
 * @param {Object} fbConfig - Firebase config including databaseURL
 * @param {String} fbConfig.apiKey - Firebase apiKey
 * @param {String} fbConfig.authDomain - Firebase auth domain
 * @param {String} fbConfig.databaseURL - Firebase database url
 * @param {String} fbConfig.storageBucket - Firebase storage bucket
 * @param {Object} config - Containing react-redux-firebase specific config
 * such as userProfile
 * @param {String} config.userProfile - Location on firebase to store user
 * profiles
 * @param {Boolean} config.enableLogging - Whether or not to enable Firebase
 * database logging
 * @param {Boolean} config.updateProfileOnLogin - Whether or not to update
 * profile when logging in. (default: `false`)
 * @param {Boolean} config.resetBeforeLogin - Whether or not to empty profile
 * and auth state on login
 * @param {Boolean} config.enableRedirectHandling - Whether or not to enable
 * auth redirect handling listener. (default: `true`)
 * @param {Function} config.onAuthStateChanged - Function run when auth state
 * changes. Argument Pattern: `(authData, firebase, dispatch)`
 * @param {Boolean} config.enableEmptyAuthChanges - Whether or not to enable
 * empty auth changes. When set to true, `onAuthStateChanged` will be fired with,
 * empty auth changes such as undefined on initialization. See
 * [#137](https://github.com/prescottprue/react-redux-firebase/issues/137) for
 * more details. (default: `false`)
 * @param {Function} config.onRedirectResult - Function run when redirect
 * result is returned. Argument Pattern: `(authData, firebase, dispatch)`
 * @param {Object} config.customAuthParameters - Object for setting which
 * customAuthParameters are passed to external auth providers.
 * @param {Function} config.profileFactory - Factory for modifying how user
 * profile is saved.
 * @param {Function} config.fileMetadataFactory - Factory for modifying
 * how file meta data is written during file uploads
 * @param {Array|String} config.profileParamsToPopulate - Parameters within
 * profile object to populate
 * @param {Boolean} config.autoPopulateProfile - Whether or not to
 * automatically populate profile with data loaded through
 * profileParamsToPopulate config. (default: `true`)
 * @param {Boolean} config.setProfilePopulateResults - Whether or not to
 * call SET actions for data that results from populating profile to redux under
 * the data path. For example role parameter on profile populated from 'roles'
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
    const remove = (path, onComplete) =>
      rootRef.child(path).remove(onComplete)

    /**
     * @private
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
      rootRef.child(path)
        .transaction(d => d === null ? value : undefined)
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
     * @description Create watch event for Firebase Realtime Database
     * @param {String} type - Type of watch event ('value', 'once', etc)
     * @param {String} path - Database path on which to setup watch event
     * @param {Object|String} options - Name of listener results within redux
     * store. If string is passed, it is used as storeAs.
     * @param {String} options.storeAs - Name of listener results within redux store
     * @param {Array} options.queryParams - List of query parameters
     * @param {Array} options.populates - Populates config
     * @return {Promise}
     * @example <caption>Basic</caption>
     * import React, { PureComponent } from 'react'
     * import PropTypes from 'prop-types'
     * import { connect } from 'react-redux'
     * import { toJS, isLoaded, isEmpty } from 'react-redux-firebase'
     *
     * class SomeThing extends PureComponent {
     *   static contextTypes = {
     *     store: PropTypes.object.isRequired
     *   }
     *
     *   componentWillMount() {
     *     this.context.store.firebase.helpers.watchEvent('value', 'todos')
     *   }
     *
     *   componentWillUnmount() {
     *     this.context.store.firebase.helpers.unWatchEvent('value', 'todos')
     *   }
     *
     *   render() {
     *     const { todos } = this.props
     *     const todoData = toJS(todos) // convert from immutable map to JS object
     *     return (
     *       <div>
     *         <h2>Todos</h2>
     *         <span>
     *         {
     *           !isLoaded(todosData)
     *              ? <div>Loading</div>
     *              : isEmpty(todosData)
     *                ? <div>No Todos</div>
     *                : JSON.stringify(toJS(todos), null, 2)
     *         }
     *         </span>
     *       </div>
     *     )
     *   }
     * }
     *
     * export default connect(({ firebase }) =>
     *   todos: firebase.getIn(['data', 'todos']) // pass immutable map as prop
     * )(SomeThing)
     */
    const watchEvent = (type, path, options) =>
      queryActions.watchEvent(
        instance,
        dispatch,
        isObject(options)
          ? { type, path, ...options }
          : { type, path, storeAs: options }
      )

    /**
     * @private
     * @description Unset a listener watch event. **Note:** this method is used
     * internally so examples have not yet been created, and it may not work
     * as expected.
     * @param {String} type - Type of watch event
     * @param {String} path - Database path on which to setup watch event
     * @param {Object|String} options - Name of listener results within redux
     * store. If string is passed, it is used as storeAs.
     * @param {String} options.storeAs - Where results are place within redux store
     * @param {String} options.queryId - Id of query
     * @return {Promise}
     */
    const unWatchEvent = (type, path, options) =>
      queryActions.unWatchEvent(
        instance,
        dispatch,
        isObject(options)
          ? { type, path, ...options }
          : { type, path, storeAs: options }
      )

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
     * @private
     * @description Update the currently logged in user's profile object
     * @param {String} profileUpdate - Changes to apply to profile
     * @return {Promise}
     */
    const updateProfile = (profile) =>
      authActions.updateProfile(dispatch, instance, profile)

    /**
     * @private
     * @description Update the currently logged in user's auth object. **Note**:
     * changes Auth object **only**, not user's profile.
     * @param {String} code - Password reset code to verify
     * @return {Promise}
     */
    const updateAuth = (authUpdate) =>
      authActions.updateAuth(dispatch, instance, authUpdate)

    /**
     * @private
     * @description Update the currently logged in user's email. **Note**:
     * changes email in Auth object only, not within user's profile.
     * @param {String} newEmail - New email
     * @param {Boolean} updateInProfile - Whether or not to update user's
     * profile with email change.
     * @return {Promise}
     */
    const updateEmail = (email, updateInProfile) =>
      authActions.updateEmail(dispatch, instance, email, updateInProfile)

    /**
     * @name ref
     * @description Firebase ref function
     * @return {firebase.database.Reference}
     * @private
     */
    /**
     * @name database
     * @description Firebase database service instance including all Firebase storage methods
     * @return {firebase.database} Firebase database service
     * @private
     */
    /**
     * @name storage
     * @description Firebase storage service instance including all Firebase storage methods
     * @return {firebase.storage} Firebase storage service
     * @private
     */
    /**
     * @name messaging
     * @description Firebase messaging service instance including all Firebase messaging methods
     * @return {firebase.messaging} Firebase messaging service
     * @private
     */
    /**
    * @name auth
    * @description Firebase auth service instance including all Firebase auth methods
    * @return {firebase.auth}
    * @private
    */
    /**
    * @name database
    * @description Firebase database service instance including all Firebase storage methods
    * @return {firebase.database} Firebase database service
    * @private
    */
    /**
    * @name storage
    * @description Firebase storage service instance including all Firebase storage methods
    * @return {firebase.storage} Firebase storage service
    * @private
    */
    /**
     * @name messaging
     * @description Firebase messaging service instance including all Firebase messaging methods
     * @return {firebase.messaging} Firebase messaging service
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
      updateProfile,
      updateAuth,
      updateEmail,
      storage: (app) => firebase.storage(app),
      messaging: (app) => firebase.messaging(app)
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
