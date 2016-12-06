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
 * @param {Object} fbConfig - Object containing Firebase config including
 * databaseURL
 * @param {String} fbConfig.apiKey - Firebase apiKey
 * @param {String} fbConfig.authDomain - Firebase auth domain
 * @param {String} fbConfig.databaseURL - Firebase database url
 * @param {String} fbConfig.storageBucket - Firebase storage bucket
 * @param {Object} config - Containing react-redux-firebase specific config such as userProfile
 * @param {String} config.userProfile - Location on firebase to store user profiles
 * @param {Boolean} config.enableLogging - Location on firebase to store user profiles. (default: `false`)
 * @param {Boolean} config.updateProfileOnLogin - Whether or not to update profile when logging in. (default: `false`)
 * @param {Function} config.profileFactory - Factory for modifying how user profile is saved
 * @param {Function} config.uploadFileDataFactory - Factory for modifying how file meta data is written during file uploads
 * @param {Array|String} config.profileParamsToPopulate - Whether or not to update profile when logging in.
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

    const ref = Firebase.database().ref()

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
      ref.child(path).set(value, onComplete)

    const push = (path, value, onComplete) =>
      ref.child(path).push(value, onComplete)

    const update = (path, value, onComplete) =>
      ref.child(path).update(value, onComplete)

    const remove = (path, onComplete) =>
      ref.child(path).remove(onComplete)

    const uniqueSet = (path, value, onComplete) =>
      ref.child(path)
        .once('value')
        .then(snap => {
          if (snap.val && snap.val() !== null) {
            const err = new Error('Path already exists.')
            if (onComplete) onComplete(err)
            return Promise.reject(err)
          }
          return ref.child(path).set(value, onComplete)
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
      ref: Firebase.database().ref,
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
  // TODO: Create new firebase here with config passed in
  return firebaseInstance
}
