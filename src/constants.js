/**
 * @constant
 * @type {string}
 * @description Prefix for all actions within library
 * @example
 * import { constants } from 'react-redux-firebase'
 * constants.actionsPrefix === '@@reactReduxFirebase' // true
 */
export const actionsPrefix = '@@reactReduxFirebase'

/**
 * @constant
 * @type {object}
 * @description Object containing all action types
 * @property {string} START - `@@reactReduxFirebase/START`
 * @property {string} SET - `@@reactReduxFirebase/SET`
 * @property {string} REMOVE - `@@reactReduxFirebase/REMOVE`
 * @property {string} MERGE - `@@reactReduxFirebase/MERGE`
 * @property {string} SET_PROFILE - `@@reactReduxFirebase/SET_PROFILE`
 * @property {string} LOGIN - `@@reactReduxFirebase/LOGIN`
 * @property {string} LOGOUT - `@@reactReduxFirebase/LOGOUT`
 * @property {string} LOGIN_ERROR - `@@reactReduxFirebase/LOGIN_ERROR`
 * @property {string} NO_VALUE - `@@reactReduxFirebase/NO_VALUE`
 * @property {string} UNAUTHORIZED_ERROR - `@@reactReduxFirebase/UNAUTHORIZED_ERROR`
 * @property {string} ERROR - `@@reactReduxFirebase/ERROR`
 * @property {string} SET_LISTENER - `@@reactReduxFirebase/SET_LISTENER`
 * @property {string} UNSET_LISTENER - `@@reactReduxFirebase/UNSET_LISTENER`
 * @property {string} AUTHENTICATION_INIT_STARTED - `@@reactReduxFirebase/AUTHENTICATION_INIT_STARTED`
 * @property {string} AUTHENTICATION_INIT_FINISHED - `@@reactReduxFirebase/AUTHENTICATION_INIT_FINISHED`
 * @property {string} SESSION_START - `@@reactReduxFirebase/SESSION_START`
 * @property {string} SESSION_END - `@@reactReduxFirebase/SESSION_END`
 * @property {string} FILE_UPLOAD_START - `@@reactReduxFirebase/FILE_UPLOAD_START`
 * @property {string} FILE_UPLOAD_ERROR - `@@reactReduxFirebase/FILE_UPLOAD_ERROR`
 * @property {string} FILE_UPLOAD_PROGRESS - `@@reactReduxFirebase/FILE_UPLOAD_PROGRESS`
 * @property {string} FILE_UPLOAD_COMPLETE - `@@reactReduxFirebase/FILE_UPLOAD_COMPLETE`
 * @property {string} FILE_DELETE_START - `@@reactReduxFirebase/FILE_DELETE_START`
 * @property {string} FILE_DELETE_ERROR - `@@reactReduxFirebase/FILE_DELETE_ERROR`
 * @property {string} FILE_DELETE_COMPLETE - `@@reactReduxFirebase/FILE_DELETE_COMPLETE`
 * @property {string} AUTH_UPDATE_START - `@@reactReduxFirebase/AUTH_UPDATE_START`
 * @property {string} AUTH_UPDATE_ERROR - `@@reactReduxFirebase/AUTH_UPDATE_ERROR`
 * @property {string} AUTH_UPDATE_SUCCESS - `@@reactReduxFirebase/AUTH_UPDATE_SUCCESS`
 * @property {string} PROFILE_UPDATE_START - `@@reactReduxFirebase/PROFILE_UPDATE_START`
 * @property {string} PROFILE_UPDATE_ERROR - `@@reactReduxFirebase/PROFILE_UPDATE_ERROR`
 * @property {string} PROFILE_UPDATE_SUCCESS - `@@reactReduxFirebase/PROFILE_UPDATE_SUCCESS`
 * @property {string} EMAIL_UPDATE_START - `@@reactReduxFirebase/EMAIL_UPDATE_START`
 * @property {string} EMAIL_UPDATE_ERROR - `@@reactReduxFirebase/EMAIL_UPDATE_ERROR`
 * @property {string} EMAIL_UPDATE_SUCCESS - `@@reactReduxFirebase/EMAIL_UPDATE_SUCCESS`
 * @property {string} AUTH_RELOAD_START - `@@reactReduxFirebase/AUTH_RELOAD_START`
 * @property {string} AUTH_RELOAD_ERROR - `@@reactReduxFirebase/AUTH_RELOAD_ERROR`
 * @property {string} AUTH_RELOAD_SUCCESS - `@@reactReduxFirebase/AUTH_RELOAD_SUCCESS`
 * @property {string} AUTH_LINK_START - `@@reactReduxFirebase/AUTH_LINK_START`
 * @property {string} AUTH_LINK_ERROR - `@@reactReduxFirebase/AUTH_LINK_ERROR`
 * @property {string} AUTH_LINK_SUCCESS - `@@reactReduxFirebase/AUTH_LINK_SUCCESS`
 * @property {string} AUTH_EMPTY_CHANGE - `@@reactReduxFirebase/AUTH_LINK_SUCCESS`
 * @example
 * import { actionTypes } from 'react-redux-firebase'
 * actionTypes.SET === '@@reactReduxFirebase/SET' // true
 */
export const actionTypes = {
  START: `${actionsPrefix}/START`,
  SET: `${actionsPrefix}/SET`,
  REMOVE: `${actionsPrefix}/REMOVE`,
  MERGE: `${actionsPrefix}/MERGE`,
  SET_PROFILE: `${actionsPrefix}/SET_PROFILE`,
  LOGIN: `${actionsPrefix}/LOGIN`,
  LOGOUT: `${actionsPrefix}/LOGOUT`,
  LOGIN_ERROR: `${actionsPrefix}/LOGIN_ERROR`,
  NO_VALUE: `${actionsPrefix}/NO_VALUE`,
  UNAUTHORIZED_ERROR: `${actionsPrefix}/UNAUTHORIZED_ERROR`,
  ERROR: `${actionsPrefix}/ERROR`,
  CLEAR_ERRORS: `${actionsPrefix}/CLEAR_ERRORS`,
  SET_LISTENER: `${actionsPrefix}/SET_LISTENER`,
  UNSET_LISTENER: `${actionsPrefix}/UNSET_LISTENER`,
  AUTHENTICATION_INIT_STARTED: `${actionsPrefix}/AUTHENTICATION_INIT_STARTED`,
  AUTHENTICATION_INIT_FINISHED: `${actionsPrefix}/AUTHENTICATION_INIT_FINISHED`,
  SESSION_START: `${actionsPrefix}/SESSION_START`,
  SESSION_END: `${actionsPrefix}/SESSION_END`,
  FILE_UPLOAD_START: `${actionsPrefix}/FILE_UPLOAD_START`,
  FILE_UPLOAD_ERROR: `${actionsPrefix}/FILE_UPLOAD_ERROR`,
  FILE_UPLOAD_PROGRESS: `${actionsPrefix}/FILE_UPLOAD_PROGRESS`,
  FILE_UPLOAD_COMPLETE: `${actionsPrefix}/FILE_UPLOAD_COMPLETE`,
  FILE_DELETE_START: `${actionsPrefix}/FILE_DELETE_START`,
  FILE_DELETE_ERROR: `${actionsPrefix}/FILE_DELETE_ERROR`,
  FILE_DELETE_COMPLETE: `${actionsPrefix}/FILE_DELETE_COMPLETE`,
  AUTH_UPDATE_START: `${actionsPrefix}/AUTH_UPDATE_START`,
  AUTH_UPDATE_SUCCESS: `${actionsPrefix}/AUTH_UPDATE_SUCCESS`,
  AUTH_UPDATE_ERROR: `${actionsPrefix}/AUTH_UPDATE_ERROR`,
  PROFILE_UPDATE_START: `${actionsPrefix}/PROFILE_UPDATE_START`,
  PROFILE_UPDATE_SUCCESS: `${actionsPrefix}/PROFILE_UPDATE_SUCCESS`,
  PROFILE_UPDATE_ERROR: `${actionsPrefix}/PROFILE_UPDATE_ERROR`,
  EMAIL_UPDATE_START: `${actionsPrefix}/EMAIL_UPDATE_START`,
  EMAIL_UPDATE_SUCCESS: `${actionsPrefix}/EMAIL_UPDATE_SUCCESS`,
  EMAIL_UPDATE_ERROR: `${actionsPrefix}/EMAIL_UPDATE_ERROR`,
  AUTH_RELOAD_START: `${actionsPrefix}/AUTH_RELOAD_START`,
  AUTH_RELOAD_ERROR: `${actionsPrefix}/AUTH_RELOAD_ERROR`,
  AUTH_RELOAD_SUCCESS: `${actionsPrefix}/AUTH_RELOAD_SUCCESS`,
  AUTH_LINK_START: `${actionsPrefix}/AUTH_LINK_START`,
  AUTH_LINK_ERROR: `${actionsPrefix}/AUTH_LINK_ERROR`,
  AUTH_LINK_SUCCESS: `${actionsPrefix}/AUTH_LINK_SUCCESS`,
  AUTH_EMPTY_CHANGE: `${actionsPrefix}/AUTH_EMPTY_CHANGE`
}

/**
 * @constant
 * @type {object}
 * @name defaultConfig
 * @description Default configuration options
 * @property {string} userProfile - `null` Location on Firebase where user
 * profiles are stored. Often set to `'users'`.
 * @property {Function} profileFactory - `null` Function for changing how profile is written
 * to database (both RTDB and Firestore).
 * @property {string|Function} presence - `null` Location on Firebase where of currently
 * online users is stored. Often set to `'presence'` or `'onlineUsers'`. If a function
 * is passed, the arguments are: `(currentUser, firebase)`.
 * @property {string|Function} sessions - `sessions` Location on Firebase where user
 * sessions are stored (only if presense is set). Often set to `'sessions'` or
 * `'userSessions'`. If a function is passed, the arguments are: `(currentUser, firebase)`.
 * @property {boolean} enableLogging - `false` Whether or not firebase
 * database logging is enabled. Providing `true` turns on error logging
 * (enabled by itself through `logErrors`).
 * @property {boolean} logErrors - `true` Whether or not to log internal
 * Firebase errors (i.e. error querying or writing data) to the javascript
 * console .
 * @property {Array|object} preserveOnLogout - `null` Data parameters to
 * preserve when logging out. If Array is passed, each item represents keys
 * within state.firebase.data preserve. If an object is passed, Keys associate
 * with parts of state to preserve, and the values are Arrays contain keys
 * for keys within that slice of state to preserve.
 * @property {object} preserveOnEmptyAuthChange - `null` Data parameters to
 * preserve when empty auth changes occur. Keys associate with parts of state
 * to preserve, and the values are either Arrays or Functions. If passing an
 * array of keys (i.e. `{ auth: ['key1', 'key2'] }`) - those keys (`'key1'` and
 * `'key2'`) are preserved from that slice of state (`auth`). If passing a
 * function (i.e. `{ auth: (currentAuthState, nextAuthState) => ({}) }`),
 * whatever is returned from the function is set to that slice of state (`auth`).
 * @property {boolean} updateProfileOnLogin - `true` Whether or not to update
 * user profile when logging in.
 * @property {boolean} useFirestoreForProfile - `false` Write profile
 * data to Firestore instead of Real Time Database.
 * @property {boolean} useFirestoreForStorageMeta - `false` Write storage
 * file metadata to Firestore instead of Real Time Database.
 * @property {boolean} resetBeforeLogin - `true` Whether or not to reset auth
 * and profile when logging in (see issue
 * [#254](https://github.com/prescottprue/react-redux-firebase/issues/254)
 * for more details).
 * @property {boolean} enableRedirectHandling - `true` Whether or not to enable
 * redirect handling. This must be disabled if environment is not http/https
 * such as with react-native.
 * @property {Function} onAuthStateChanged - `null` Function that runs when
 * auth state changes.
 * @property {boolean} enableEmptyAuthChanges - `false` Whether or not to enable
 * empty auth changes. When set to true, `onAuthStateChanged` will be fired with,
 * empty auth changes such as `undefined` on initialization
 * (see [#137](https://github.com/prescottprue/react-redux-firebase/issues/137)).
 * Requires `v1.5.0-alpha` or higher.
 * @property {boolean} autoPopulateProfile - `false` REMOVED FROM v2.0.0.
 * Whether or not to automatically populate profile with data loaded through
 * profileParamsToPopulate config.
 * @property {boolean} setProfilePopulateResults - `true` Whether or not to
 * call SET actions for data that results from populating profile to redux under
 * the data path. For example role parameter on profile populated from 'roles'
 * root. True will call SET_PROFILE as well as a SET action with the role that
 * is loaded (places it in data/roles).
 * @property {boolean} dispatchOnUnsetListener - `true` Whether or not to
 * dispatch UNSET_LISTENER when disabling listeners for a specific path. USE WITH CAUTION
 * Setting this to true allows an action to be called that removes data
 * from redux (which might not always be expected).
 * @property {boolean} dispatchRemoveAction - `false` Whether or not to
 * dispatch REMOVE action when calling `remove`. **NOTE** Causes two state
 * updates if a listener is affected by your remove call.
 * @property {string} firebaseStateName - 'firebase' Assumed name of Firebase
 * state (name given when passing reducer to combineReducers). Used in
 * firebaseAuthIsReady promise (see
 * [#264](https://github.com/prescottprue/react-redux-firebase/issues/264)).
 * @property {boolean} attachAuthIsReady - `true` Whether or not to attach
 * firebaseAuthIsReady to store. authIsLoaded can be imported and used
 * directly instead based on preference.
 * @property {boolean} firestoreNamespace - `firestoreHelpers` Namespace for
 * firestore helpers (**WARNING** Changing this will break firestoreConnect HOC.
 * Do **NOT** change to `'firestore'`)
 * @property {Array} keysToRemoveFromAuth - (default at end)
 * list of keys to remove from authentication reponse before writing to profile
 * (currenlty only used for profiles stored on Firestore). `['appName', 'apiKey'
 * , 'authDomain', 'redirectEventId', 'stsTokenManager', 'uid']`
 * @type {object}
 */
export const defaultConfig = {
  userProfile: null,
  presence: null,
  sessions: 'sessions',
  enableLogging: false,
  logErrors: true,
  preserveOnLogout: null,
  preserveOnEmptyAuthChange: null,
  resetBeforeLogin: true,
  updateProfileOnLogin: true,
  enableRedirectHandling: true,
  autoPopulateProfile: false,
  setProfilePopulateResults: false,
  dispatchOnUnsetListener: true,
  dispatchRemoveAction: false,
  enableEmptyAuthChanges: true,
  firebaseStateName: 'firebase',
  attachAuthIsReady: false,
  keysToRemoveFromAuth: [
    'appName',
    'apiKey',
    'authDomain',
    'redirectEventId',
    'stsTokenManager',
    'uid'
  ],
  keysToPreserveFromProviderData: [
    'email',
    'phoneNumber',
    'photoURL',
    'providerId',
    'uid'
  ]
}

/**
 * @constant
 * @type {Array}
 * @description List of all external auth providers that are supported
 * (firebase's email/anonymous included by default).
 * @private
 */
export const supportedAuthProviders = [
  'google',
  'github',
  'twitter',
  'facebook'
]

/**
 * @constant
 * @description Top level redux paths that can be populated
 * @type {Array}
 * @private
 */
export const topLevelPaths = ['auth', 'profile', 'ordered', 'data']

/**
 * @constant
 * @description Error message shown if runnning react-redux v6 with a v2.0.0 version
 * of react-redux-firebase
 * @type {string}
 * @private
 */
export const v3ErrorMessage =
  'Context from react-redux not found. If you are using react-redux v6 a v3.*.* version of react-redux-firebase is required. Please checkout the v3 migration guide: http://bit.ly/2SRNdiO'

export default {
  actionTypes,
  defaultConfig
}
