import Firebase from 'firebase'
import { authActions, queryActions } from './actions'

export default (config, otherConfig) =>
  next => (reducer, initialState) => {
    const defaultConfig = {
      userProfile: null,
      enableLogging: false
    }

    const store = next(reducer, initialState)
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

    const watchEvent = (eventName, eventPath) =>
      queryActions.watchEvent(firebase, dispatch, eventName, eventPath, true)

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
      set,
      uniqueSet,
      push,
      remove,
      update,
      login,
      logout,
      createUser,
      resetPassword,
      watchEvent,
      unWatchEvent,
      storage: () => Firebase.storage()
    }

    authActions.init(dispatch, firebase)

    store.firebase = firebase

    return store
  }
