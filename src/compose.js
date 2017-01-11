import Firebase from 'firebase'
import { authActions, queryActions, storageActions } from './actions'
let firebaseInstance

/**
 * @name reactReduxFirebase
 * @external
 * @description Middleware that handles configuration (placed in redux's `compose` call)
 * @param {Object} fbConfig - Object containing Firebase config including databaseURL
 * @param {String} fbConfig.apiKey - Firebase apiKey
 * @param {String} fbConfig.authDomain - Firebase auth domain
 * @param {String} fbConfig.databaseURL - Firebase database url
 * @param {String} fbConfig.storageBucket - Firebase storage bucket
 * @param {Object} config - Containing react-redux-firebase specific config such as userProfile
 * @param {String} config.userProfile - Location on firebase to store user profiles
 * @param {Boolean} config.enableLogging - Location on firebase to store user profiles. default: `false`
 * @param {Function} config.profileDecorator - Location on firebase to store user profiles. default: `false`
 * @param {Boolean} config.updateProfileOnLogin - Whether or not to update profile when logging in. default: `false`
 * @param {Boolean} config.profileParamsToPopulate - Parameters within profile object to populate
 * @return {Function} Middleware function
 * @example <caption>Data</caption>
 * import { createStore, compose } from 'redux'
 * import { reactReduxFirebase } from 'react-redux-firebase'
 *
 * // Firebase config
 * const fbConfig = {
 *  apiKey: '<your-api-key>',
 *  authDomain: '<your-auth-domain>',
 *  databaseURL: '<your-database-url>',
 *  storageBucket: '<your-storage-bucket>'
 * }
 *
 * // React Redux Firebase Config
 * const config = {
 *   userProfile: 'users'
 * }
 *
 * // Add react-redux-firebase to compose
 * const createStoreWithFirebase = compose(
 *  reactReduxFirebase(fbConfig, config),
 * )(createStore)
 *
 * // Use Function later to create store
 * const store = createStoreWithFirebase(rootReducer, initialState)
 */
export default (config, otherConfig) => next =>
  (reducer, initialState, middleware) => {
    const defaultConfig = {
      userProfile: null,
      enableLogging: false,
      updateProfileOnLogin: true
    }

    const store = next(reducer, initialState, middleware)
    const { dispatch } = store

    const { apiKey, authDomain, databaseURL, storageBucket } = config

    // Throw for missing Firebase Data
    if (!databaseURL) throw new Error('Firebase databaseURL is required')
    if (!authDomain) throw new Error('Firebase authDomain is required')
    if (!apiKey) throw new Error('Firebase apiKey is required')

    // Combine all configs
    const configs = Object.assign({}, defaultConfig, config, otherConfig)

    // Initialize Firebase
    try {
      Firebase.initializeApp({apiKey, authDomain, databaseURL, storageBucket})
    } catch (err) {}

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

    const uploadFile = (path, file, dbPath) =>
      storageActions.uploadFile(dispatch, firebase, { path, file, dbPath })

    const uploadFiles = (path, files, dbPath) =>
      storageActions.uploadFiles(dispatch, firebase, { path, files, dbPath })

    const deleteFile = (path, dbPath) =>
      storageActions.deleteFile(dispatch, firebase, { path, dbPath })

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
 * @description Expose Firebase instance.
 * Warning: This is going to be rewritten in coming versions.
 * @private
*/
export const getFirebase = () => {
  // TODO: Handle recieveing config and creating firebase instance if it doesn't exist
  /* istanbul ignore next: Firebase instance always exists during tests */
  if (!firebaseInstance) {
    throw new Error('Firebase instance does not yet exist. Check your compose function.') // eslint-disable-line no-console
  }
  return firebaseInstance
}
