import Firebase from 'firebase'
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
 * @property {Function} config.profileFactory - Factory for modifying how user profile is saved.
 * @property {Function} config.uploadFileDataFactory - Factory for modifying how file meta data is written during file uploads
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
 * @return {Function} That accepts a component a returns a wrapped version of component
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
      Firebase.initializeApp(fbConfig)
    } catch (err) {} // silence reinitialize warning (hot-reloading)

    // Enable Logging based on config
    if (configs.enableLogging) {
      Firebase.database.enableLogging(configs.enableLogging)
    }

    const rootRef = Firebase.database().ref()

    const firebase = Object.defineProperty(Firebase, '_', {
      value: {
        watchers: {},
        config: configs,
        authUid: null
      },
      writable: true,
      enumerable: true,
      configurable: true
    })

    const set = (path, value, onComplete) =>
      rootRef.child(path).set(value, onComplete)

    const push = (path, value, onComplete) =>
      rootRef.child(path).push(value, onComplete)

    const update = (path, value, onComplete) =>
      rootRef.child(path).update(value, onComplete)

    const remove = (path, onComplete) =>
      rootRef.child(path).remove(onComplete)

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

    const uploadFile = (path, file, dbPath) =>
      storageActions.uploadFile(dispatch, firebase, { path, file, dbPath })

    const uploadFiles = (path, files, dbPath) =>
      storageActions.uploadFiles(dispatch, firebase, { path, files, dbPath })

    const deleteFile = (path, dbPath) =>
      storageActions.deleteFile(dispatch, firebase, { path, dbPath })

    const watchEvent = (type, path) =>
      queryActions.watchEvent(firebase, dispatch, { type, path }, true)

    const unWatchEvent = (eventName, eventPath, queryId = undefined) =>
      queryActions.unWatchEvent(firebase, eventName, eventPath, queryId)

    const login = credentials =>
      authActions.login(dispatch, firebase, credentials)

    const logout = () =>
      authActions.logout(dispatch, firebase)

    const createUser = (credentials, profile) =>
      authActions.createUser(dispatch, firebase, credentials, profile)

    const resetPassword = (credentials) =>
      authActions.resetPassword(dispatch, firebase, credentials)

    firebase.helpers = {
      ref: path => Firebase.database().ref(path),
      set,
      uniqueSet,
      push,
      remove,
      update,
      login,
      logout,
      uploadFile,
      uploadFiles,
      deleteFile,
      createUser,
      resetPassword,
      watchEvent,
      unWatchEvent,
      storage: () => Firebase.storage()
    }

    authActions.init(dispatch, firebase)

    store.firebase = firebase
    firebaseInstance = Object.assign({}, firebase, firebase.helpers)

    return store
  }

/**
 * @external
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
 *      .helpers
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
  return firebaseInstance
}
