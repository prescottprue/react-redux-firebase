/**
 * @constant
 * @type {String}
 * @description Prefix for all actions within library
 * @example
 * import { constants } from 'react-redux-firebase'
 * constants.actionsPrefix === '@@reactReduxFirebase' // true
*/
export const actionsPrefix = '@@reactReduxFirebase'

/**
 * @constant
 * @type {Object}
 * @description Object containing all action types
 * @property {String} START - `@@reactReduxFirebase/START`
 * @property {String} SET - `@@reactReduxFirebase/SET`
 * @property {String} REMOVE - `@@reactReduxFirebase/REMOVE`
 * @property {String} MERGE - `@@reactReduxFirebase/MERGE`
 * @property {String} SET_PROFILE - `@@reactReduxFirebase/SET_PROFILE`
 * @property {String} LOGIN - `@@reactReduxFirebase/LOGIN`
 * @property {String} LOGOUT - `@@reactReduxFirebase/LOGOUT`
 * @property {String} LOGIN_ERROR - `@@reactReduxFirebase/LOGIN_ERROR`
 * @property {String} NO_VALUE - `@@reactReduxFirebase/NO_VALUE`
 * @property {String} UNAUTHORIZED_ERROR - `@@reactReduxFirebase/UNAUTHORIZED_ERROR`
 * @property {String} ERROR - `@@reactReduxFirebase/ERROR`
 * @property {String} SET_LISTENER - `@@reactReduxFirebase/SET_LISTENER`
 * @property {String} UNSET_LISTENER - `@@reactReduxFirebase/UNSET_LISTENER`
 * @property {String} AUTHENTICATION_INIT_STARTED - `@@reactReduxFirebase/AUTHENTICATION_INIT_STARTED`
 * @property {String} AUTHENTICATION_INIT_FINISHED - `@@reactReduxFirebase/AUTHENTICATION_INIT_FINISHED`
 * @property {String} SESSION_START - `@@reactReduxFirebase/SESSION_START`
 * @property {String} SESSION_END - `@@reactReduxFirebase/SESSION_END`
 * @property {String} FILE_UPLOAD_START - `@@reactReduxFirebase/FILE_UPLOAD_START`
 * @property {String} FILE_UPLOAD_ERROR - `@@reactReduxFirebase/FILE_UPLOAD_ERROR`
 * @property {String} FILE_UPLOAD_PROGRESS - `@@reactReduxFirebase/FILE_UPLOAD_PROGRESS`
 * @property {String} FILE_UPLOAD_COMPLETE - `@@reactReduxFirebase/FILE_UPLOAD_COMPLETE`
 * @property {String} FILE_DELETE_START - `@@reactReduxFirebase/FILE_DELETE_START`
 * @property {String} FILE_DELETE_ERROR - `@@reactReduxFirebase/FILE_DELETE_ERROR`
 * @property {String} FILE_DELETE_COMPLETE - `@@reactReduxFirebase/FILE_DELETE_COMPLETE`
 * @property {String} AUTH_UPDATE_START - `@@reactReduxFirebase/AUTH_UPDATE_START`
 * @property {String} AUTH_UPDATE_ERROR - `@@reactReduxFirebase/AUTH_UPDATE_ERROR`
 * @property {String} AUTH_UPDATE_SUCCESS - `@@reactReduxFirebase/AUTH_UPDATE_SUCCESS`
 * @property {String} PROFILE_UPDATE_START - `@@reactReduxFirebase/PROFILE_UPDATE_START`
 * @property {String} PROFILE_UPDATE_ERROR - `@@reactReduxFirebase/PROFILE_UPDATE_ERROR`
 * @property {String} PROFILE_UPDATE_SUCCESS - `@@reactReduxFirebase/PROFILE_UPDATE_SUCCESS`
 * @property {String} EMAIL_UPDATE_START - `@@reactReduxFirebase/EMAIL_UPDATE_START`
 * @property {String} EMAIL_UPDATE_ERROR - `@@reactReduxFirebase/EMAIL_UPDATE_ERROR`
 * @property {String} EMAIL_UPDATE_SUCCESS - `@@reactReduxFirebase/EMAIL_UPDATE_SUCCESS`
 * @property {String} AUTH_RELOAD_START - `@@reactReduxFirebase/AUTH_RELOAD_START`
 * @property {String} AUTH_RELOAD_ERROR - `@@reactReduxFirebase/AUTH_RELOAD_ERROR`
 * @property {String} AUTH_RELOAD_SUCCESS - `@@reactReduxFirebase/AUTH_RELOAD_SUCCESS`
 * @property {String} AUTH_LINK_START - `@@reactReduxFirebase/AUTH_LINK_START`
 * @property {String} AUTH_LINK_ERROR - `@@reactReduxFirebase/AUTH_LINK_ERROR`
 * @property {String} AUTH_LINK_SUCCESS - `@@reactReduxFirebase/AUTH_LINK_SUCCESS`
 * @property {String} AUTH_EMPTY_CHANGE - `@@reactReduxFirebase/AUTH_LINK_SUCCESS`
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
 * @type {Object}
 * @name defaultConfig
 * @description Default configuration options
 * @property {String} userProfile - `null` Location on Firebase where user
 * profiles are stored. Often set to `'users'`.
 * @property {String|Function} presence - `null` Location on Firebase where of currently
 * online users is stored. Often set to `'presence'` or `'onlineUsers'`. If a function
 * is passed, the arguments are: `(currentUser, firebase)`.
 * @property {String|Function} sessions - `sessions` Location on Firebase where user
 * sessions are stored (only if presense is set). Often set to `'sessions'` or
 * `'userSessions'`. If a function is passed, the arguments are: `(currentUser, firebase)`.
 * @property {Boolean} enableLogging - `false` Whether or not firebase
 * database logging is enabled.
 * @property {Array} preserveOnLogout - `null` Data parameters to preserve when
 * logging out.
 * @property {Boolean} updateProfileOnLogin - `true` Whether or not to update
 * user profile when logging in.
 * @property {Boolean} resetBeforeLogin - `true` Whether or not to reset auth
 * and profile when logging in (see issue
 * [#254](https://github.com/prescottprue/react-redux-firebase/issues/254)
 * for more details).
 * @property {Boolean} enableRedirectHandling - `true` Whether or not to enable
 * redirect handling. This must be disabled if environment is not http/https
 * such as with react-native.
 * @property {Function} onAuthStateChanged - `null` Function that runs when
 * auth state changes.
 * @property {Boolean} enableEmptyAuthChanges - `false` Whether or not to enable
 * empty auth changes. When set to true, `onAuthStateChanged` will be fired with,
 * empty auth changes such as `undefined` on initialization
 * (see [#137](https://github.com/prescottprue/react-redux-firebase/issues/137)).
 * Requires `v1.5.0-alpha` or higher.
 * @property {Boolean} autoPopulateProfile - `false` REMOVED FROM v2.0.0. Whether or not to
 * automatically populate profile with data loaded through
 * profileParamsToPopulate config.
 * @property {Boolean} setProfilePopulateResults - `true` Whether or not to
 * call SET actions for data that results from populating profile to redux under
 * the data path. For example role parameter on profile populated from 'roles'
 * root. True will call SET_PROFILE as well as a SET action with the role that
 * is loaded (places it in data/roles).
 * @property {Boolean} dispatchOnUnsetListener - `true` Whether or not to
 * dispatch UNSET_LISTENER when disabling listeners for a specific path. USE WITH CAUTION
 * Setting this to true allows an action to be called that removes data
 * from redux (which might not always be expected).
 * @property {Boolean} dispatchRemoveAction - `true` Whether or not to
 * dispatch REMOVE action when calling `remove`.
 * @property {String} firebaseStateName - 'firebase' Assumed name of Firebase
 * state (name given when passing reducer to combineReducers). Used in
 * firebaseAuthIsReady promise (see
 * [#264](https://github.com/prescottprue/react-redux-firebase/issues/264)).
 * @property {Boolean} attachAuthIsReady - `true` Whether or not to attach
 * firebaseAuthIsReady to store. authIsLoaded can be imported and used
 * directly instead based on preference.
 * @property {Boolean} includeFirestore - `true` Whether or not to include
 * firestore helpers (needed for use of firestoreConnect).
 * @property {Boolean} firestoreNamespace - `firestoreHelpers` Namespace for
 * firestore helpers (**WARNING** Changing this will break firestoreConnect HOC.
 * Do **NOT** change to `'firestore'`)
 * @type {Object}
*/
export const defaultConfig = {
  userProfile: null,
  presence: null,
  sessions: 'sessions',
  enableLogging: false,
  resetBeforeLogin: true,
  updateProfileOnLogin: true,
  enableRedirectHandling: true,
  autoPopulateProfile: false,
  setProfilePopulateResults: false,
  dispatchOnUnsetListener: true,
  dispatchRemoveAction: true,
  enableEmptyAuthChanges: false,
  firebaseStateName: 'firebase',
  includeFirestore: true,
  firestoreNamespace: 'firestoreHelpers',
  attachAuthIsReady: false
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

export default {
  actionTypes,
  defaultConfig
}
