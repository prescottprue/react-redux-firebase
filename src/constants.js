/** @constant
 * @description Prefix for all actions within library
 * @type {String}
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
 * @property {String} SET_PROFILE - `@@reactReduxFirebase/SET_PROFILE`
 * @property {String} LOGIN - `@@reactReduxFirebase/LOGIN`
 * @property {String} LOGOUT - `@@reactReduxFirebase/LOGOUT`
 * @property {String} LOGIN_ERROR - `@@reactReduxFirebase/LOGIN_ERROR`
 * @property {String} NO_VALUE - `@@reactReduxFirebase/NO_VALUE`
 * @property {String} UNAUTHORIZED_ERROR - `@@reactReduxFirebase/UNAUTHORIZED_ERROR`
 * @property {String} UNSET_LISTENER - `@@reactReduxFirebase/UNSET_LISTENER`
 * @property {String} AUTHENTICATION_INIT_STARTED - `@@reactReduxFirebase/AUTHENTICATION_INIT_STARTED`
 * @property {String} AUTHENTICATION_INIT_FINISHED - `@@reactReduxFirebase/AUTHENTICATION_INIT_FINISHED`
 * @property {String} FILE_UPLOAD_START - `@@reactReduxFirebase/FILE_UPLOAD_START`
 * @property {String} FILE_UPLOAD_ERROR - `@@reactReduxFirebase/FILE_UPLOAD_ERROR`
 * @property {String} FILE_UPLOAD_PROGRESS - `@@reactReduxFirebase/FILE_UPLOAD_PROGRESS`
 * @property {String} FILE_UPLOAD_COMPLETE - `@@reactReduxFirebase/FILE_UPLOAD_COMPLETE`
 * @property {String} FILE_DELETE_START - `@@reactReduxFirebase/FILE_DELETE_START`
 * @property {String} FILE_DELETE_ERROR - `@@reactReduxFirebase/FILE_DELETE_ERROR`
 * @property {String} FILE_DELETE_COMPLETE - `@@reactReduxFirebase/FILE_DELETE_COMPLETE`
 * @property {String} AUTH_UPDATE_START - `@@reactReduxFirebase/AUTH_UPDATE_START`
 * @property {String} AUTH_UPDATE_ERROR - `@@reactReduxFirebase/AUTH_UPDATE_ERROR`
 * @property {String} AUTH_UPDATE_COMPLETE - `@@reactReduxFirebase/AUTH_UPDATE_COMPLETE`
 * @property {String} PROFILE_UPDATE_START - `@@reactReduxFirebase/PROFILE_UPDATE_START`
 * @property {String} PROFILE_UPDATE_ERROR - `@@reactReduxFirebase/PROFILE_UPDATE_ERROR`
 * @property {String} PROFILE_UPDATE_COMPLETE - `@@reactReduxFirebase/PROFILE_UPDATE_COMPLETE`
 * @property {String} EMAIL_UPDATE_START - `@@reactReduxFirebase/EMAIL_UPDATE_START`
 * @property {String} EMAIL_UPDATE_ERROR - `@@reactReduxFirebase/EMAIL_UPDATE_ERROR`
 * @property {String} EMAIL_UPDATE_COMPLETE - `@@reactReduxFirebase/EMAIL_UPDATE_COMPLETE`
 * @example
 * import { actionTypes } from 'react-redux-firebase'
 * actionTypes.SET === '@@reactReduxFirebase/SET' // true
*/
export const actionTypes = {
  START: `${actionsPrefix}/START`,
  SET: `${actionsPrefix}/SET`,
  SET_PROFILE: `${actionsPrefix}/SET_PROFILE`,
  LOGIN: `${actionsPrefix}/LOGIN`,
  LOGOUT: `${actionsPrefix}/LOGOUT`,
  LOGIN_ERROR: `${actionsPrefix}/LOGIN_ERROR`,
  NO_VALUE: `${actionsPrefix}/NO_VALUE`,
  UNAUTHORIZED_ERROR: `${actionsPrefix}/UNAUTHORIZED_ERROR`,
  ERROR: `${actionsPrefix}/ERROR`,
  UNSET_LISTENER: `${actionsPrefix}/UNSET_LISTENER`,
  AUTHENTICATION_INIT_STARTED: `${actionsPrefix}/AUTHENTICATION_INIT_STARTED`,
  AUTHENTICATION_INIT_FINISHED: `${actionsPrefix}/AUTHENTICATION_INIT_FINISHED`,
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
  EMAIL_UPDATE_ERROR: `${actionsPrefix}/EMAIL_UPDATE_ERROR`
}

/** @constant
 * @description Default configuration options
 * @property {String} userProfile - `null` Location on Firebase where user
 * profiles are stored. Often set to `'users'`.
 * @property {Boolean} enableLogging - `false` Whether or not firebase
 * database logging is enabled.
 * @property {Boolean} updateProfileOnLogin - `true` Whether or not to update
 * user profile when logging in.
 * @property {Boolean} enableRedirectHandling - `true` Whether or not to enable
 * redirect handling. This must be disabled if environment is not http/https
 * such as with react-native.
 * @property {Boolean} autoPopulateProfile - `true` Whether or not to
 * automatically populate profile with data loaded through
 * profileParamsToPopulate config.
 * @property {Boolean} setProfilePopulateResults - `true` Whether or not to
 * call SET actions for data that results from populating profile to redux under
 * the data path. For example: role paramter on profile populated from 'roles'
 * root. True will call SET_PROFILE as well as a SET action with the role that
 * is loaded (places it in data/roles).
 * @property {Boolean} dispatchOnUnsetListener - `false` Whether or not to
 * dispatch UNSET_LISTENER when disabling listeners for a specific path. USE WITH CAUTION
 * Setting this to true allows an action to be called that removes data
 * from redux (which might not always be expected).
 * @type {Array}
*/
export const defaultConfig = {
  userProfile: null,
  enableLogging: false,
  updateProfileOnLogin: true,
  enableRedirectHandling: true,
  autoPopulateProfile: true,
  setProfilePopulateResults: false,
  dispatchOnUnsetListener: false
}

/** @constant
 * @description List of all external auth providers that are supported
 * (firebase's email/anonymous included by default).
 * @type {Array}
 * @private
*/
export const supportedAuthProviders = [
  'google',
  'github',
  'twitter',
  'facebook'
]

/** @constant
 * @description Default keys returned within JSON Web Token recieved when
 * authenticating with Firebase
 * @type {Array}
 * @private
*/
export const defaultJWTProps = [
  'aud',
  'auth_time',
  'exp',
  'firebase',
  'iat',
  'iss',
  'sub',
  'user_id'
]

/** @constant
 * @description Default initial props used when running firebase.initializeApp
 * @type {Array}
 * @private
*/
export const defaultInitProps = [
  'apiKey',
  'authDomain',
  'databaseURL',
  'storageBucket',
  'messagingSenderId'
]

/** @constant
 * @description Parameters stored by path string instead of full path
 * @type {Array}
 * @private
*/
export const metaParams = ['timestamp', 'requesting', 'requested']

/** @constant
 * @description String Character used to split/join meta parameter keys
 * @type {Array}
 * @private
*/
export const paramSplitChar = '/'

export default {
  defaultJWTProps,
  actionTypes,
  defaultConfig,
  supportedAuthProviders,
  defaultInitProps,
  metaParams,
  paramSplitChar
}

module.exports = {
  defaultJWTProps,
  actionTypes,
  defaultConfig,
  supportedAuthProviders,
  defaultInitProps,
  metaParams,
  paramSplitChar
}
