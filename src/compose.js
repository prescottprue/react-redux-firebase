import { createFirebaseInstance } from './createFirebaseInstance'
import { defaultConfig } from './constants'
import { authActions } from './actions'

let firebaseInstance

/**
 * @name reactReduxFirebase
 * @external
 * @description Middleware that handles configuration (placed in redux's
 * `compose` call)
 * @property {Object} firebaseInstance - Initiated firebase instance (can also
 * be library following Firebase JS API such as `react-native-firebase`)
 * @property {Object} config - Containing react-redux-firebase specific configuration
 * @property {String} config.userProfile - Location on firebase to store user profiles
 * @property {Boolean} config.enableLogging - Whether or not to enable Firebase database logging.
 * **Note**: Only works if instance has enableLogging function.
 * @property {Function} config.profileFactory - Factory for modifying how user profile is saved.
 * @property {Boolean} config.presence - Location on Firebase to store currently
 * online users list. Often set to `'presence'` or `'onlineUsers'`.
 * @property {Boolean} config.sessions - Location on Firebase where user
 * sessions are stored (only if presense is set). Often set to `'sessions'` or `'onlineUsers'`.
 * @property {Boolean} config.updateProfileOnLogin - Whether or not to update
 * profile when logging in. (default: `false`)
 * @property {Boolean} config.resetBeforeLogin - Whether or not to empty profile
 * and auth state on login
 * @property {Boolean} config.enableRedirectHandling - Whether or not to enable
 * auth redirect handling listener. (default: `true`)
 * @property {Function} config.onAuthStateChanged - Function run when auth state
 * changes. Argument Pattern: `(authData, firebase, dispatch)`
 * @property {Boolean} config.enableEmptyAuthChanges - Whether or not to enable
 * empty auth changes. When set to true, `onAuthStateChanged` will be fired with,
 * empty auth changes such as undefined on initialization. See
 * [#137](https://github.com/prescottprue/react-redux-firebase/issues/137) for
 * more details. (default: `false`)
 * @property {Function} config.onRedirectResult - Function run when redirect
 * result is returned. Argument Pattern: `(authData, firebase, dispatch)`
 * @property {Object} config.customAuthParameters - Object for setting which
 * customAuthParameters are passed to external auth providers.
 * @property {Function} config.profileFactory - Factory for modifying how user profile is saved.
 * @property {Function} config.fileMetadataFactory - Factory for modifying
 * how file meta data is written during file uploads
 * @property {Array|String} config.profileParamsToPopulate - Parameters within
 * profile object to populate. As of `v2.0.0` data is only loaded for population, not actually automatically populated
 * (allows access to both unpopulated and populated profile data).
 * @property {Boolean} config.autoPopulateProfile - **NOTE**: Not yet enabled for v2.0.0. Whether or not to
 * automatically populate profile with data loaded through profileParamsToPopulate config. (default: `true`)
 * @property {Boolean} config.setProfilePopulateResults - Whether or not to
 * call SET actions for data that results from populating profile to redux under
 * the data path. For example role parameter on profile populated from 'roles'
 * root. True will call SET_PROFILE as well as a SET action with the role that
 * is loaded (places it in data/roles). (default: `false`)
 * @return {Function} That accepts a component and returns a Component which
 * wraps the provided component (higher order component).
 * @example <caption>Setup</caption>
 * import { createStore, compose } from 'redux'
 * import { reactReduxFirebase } from 'react-redux-firebase'
 * import * as firebase from 'firebase'

 * // React Redux Firebase Config
 * const config = {
 *   userProfile: 'users', // saves user profiles to '/users' on Firebase
 *   // here is where you place other config options
 * }

 * // initialize script from Firebase page
 * const fbConfg = {} // firebase config object
 * firebase.initializeApp(fbConfig)
 *
 * // Add react-redux-firebase to compose
 * // Note: In full projects this will often be within createStore.js or store.js
 * const createStoreWithFirebase = compose(
 *  reactReduxFirebase(firebase, config),
 * )(createStore)
 *
 * // Use Function later to create store
 * const store = createStoreWithFirebase(rootReducer, initialState)
 */
export default (instance, otherConfig) => next =>
  (reducer, initialState, middleware) => {
    const store = next(reducer, initialState, middleware)

    // firebase library or app instance not being passed in as first argument
    if (!instance.SDK_VERSION && !instance.firebase_ && !instance.database) {
      throw new Error('v2.0.0-beta and higher require passing a firebase app instance or a firebase library instance. View the migration guide for details.')
    }

    const configs = { ...defaultConfig, ...otherConfig }
    firebaseInstance = createFirebaseInstance(instance.firebase_ || instance, configs, store.dispatch)

    authActions.init(store.dispatch, firebaseInstance)
    store.firebase = firebaseInstance

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
