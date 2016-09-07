import Firebase from 'firebase'
import * as Actions from './actions'

export default (config, otherConfig) =>
  next => (reducer, initialState) => {
    const defaultConfig = {
      userProfile: null
    }

    const store = next(reducer, initialState)
    const { dispatch } = store

    const { apiKey, authDomain, databaseURL, storageBucket } = config

    // Throw for missing Firebase Data
    if (!databaseURL) throw new Error('Firebase databaseURL is required')
    if (!authDomain) throw new Error('Firebase authDomain is required')
    if (!apiKey) throw new Error('Firebase apiKey is required')

    // Initialize Firebase
    try {
      Firebase.initializeApp({apiKey, authDomain, databaseURL, storageBucket})
    } catch (err) {}

    const ref = Firebase.database().ref()

    // Combine all configs
    const configs = Object.assign({}, defaultConfig, config, otherConfig)

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

    const watchEvent = (eventName, eventPath) =>
      Actions.watchEvent(firebase, dispatch, eventName, eventPath, true)

    const unWatchEvent = (eventName, eventPath, queryId = undefined) =>
      Actions.unWatchEvent(firebase, eventName, eventPath, queryId)

    const login = credentials =>
      Actions.login(dispatch, firebase, credentials)

    const logout = () =>
      Actions.logout(dispatch, firebase)

    const createUser = (credentials, profile) =>
      Actions.createUser(dispatch, firebase, credentials, profile)

    const resetPassword = (credentials) =>
      Actions.resetPassword(dispatch, firebase, credentials)

    firebase.helpers = {
      set, push, remove, update,
      login, logout,
      createUser, resetPassword,
      watchEvent, unWatchEvent
    }

    Actions.init(dispatch, firebase)

    store.firebase = firebase

    return store
  }
