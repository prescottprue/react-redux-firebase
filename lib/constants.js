'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** @constant
 * @description Prefix for all actions within library
 * @type {String}
 * @example
 * import { constants } from 'react-redux-firebase'
 * constants.actionsPrefix === '@@reactReduxFirebase' // true
*/
var actionsPrefix = exports.actionsPrefix = '@@reactReduxFirebase';

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
 * @example
 * import { actionTypes } from 'react-redux-firebase'
 * actionTypes.SET === '@@reactReduxFirebase/SET' // true
*/
var actionTypes = exports.actionTypes = {
  START: actionsPrefix + '/START',
  SET: actionsPrefix + '/SET',
  SET_PROFILE: actionsPrefix + '/SET_PROFILE',
  LOGIN: actionsPrefix + '/LOGIN',
  LOGOUT: actionsPrefix + '/LOGOUT',
  LOGIN_ERROR: actionsPrefix + '/LOGIN_ERROR',
  NO_VALUE: actionsPrefix + '/NO_VALUE',
  UNAUTHORIZED_ERROR: actionsPrefix + '/UNAUTHORIZED_ERROR',
  ERROR: actionsPrefix + '/ERROR',
  UNSET_LISTENER: actionsPrefix + '/UNSET_LISTENER',
  AUTHENTICATION_INIT_STARTED: actionsPrefix + '/AUTHENTICATION_INIT_STARTED',
  AUTHENTICATION_INIT_FINISHED: actionsPrefix + '/AUTHENTICATION_INIT_FINISHED',
  FILE_UPLOAD_START: actionsPrefix + '/FILE_UPLOAD_START',
  FILE_UPLOAD_ERROR: actionsPrefix + '/FILE_UPLOAD_ERROR',
  FILE_UPLOAD_PROGRESS: actionsPrefix + '/FILE_UPLOAD_PROGRESS',
  FILE_UPLOAD_COMPLETE: actionsPrefix + '/FILE_UPLOAD_COMPLETE',
  FILE_DELETE_START: actionsPrefix + '/FILE_DELETE_START',
  FILE_DELETE_ERROR: actionsPrefix + '/FILE_DELETE_ERROR',
  FILE_DELETE_COMPLETE: actionsPrefix + '/FILE_DELETE_COMPLETE'
};

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
 * @property {Boolean} distpatchOnUnsetListener - `false` Whether or not to
 * dispatch UNSET_LISTENER when disabling listeners for a specific path. USE WITH CAUTION
 * Setting this to true allows an action to be called that removes data
 * from redux (which might not always be expected).
 * @type {Array}
*/
var defaultConfig = exports.defaultConfig = {
  userProfile: null,
  enableLogging: false,
  updateProfileOnLogin: true,
  enableRedirectHandling: true,
  autoPopulateProfile: true,
  setProfilePopulateResults: false,
  distpatchOnUnsetListener: false
};

/** @constant
 * @description List of all external auth providers that are supported
 * (firebase's email/anonymous included by default).
 * @type {Array}
 * @private
*/
var supportedAuthProviders = exports.supportedAuthProviders = ['google', 'github', 'twitter', 'facebook'];

/** @constant
 * @description Default keys returned within JSON Web Token recieved when
 * authenticating with Firebase
 * @type {Array}
 * @private
*/
var defaultJWTProps = exports.defaultJWTProps = ['aud', 'auth_time', 'exp', 'firebase', 'iat', 'iss', 'sub', 'user_id'];

/** @constant
 * @description Default initial props used when running firebase.initializeApp
 * @type {Array}
 * @private
*/
var defaultInitProps = exports.defaultInitProps = ['apiKey', 'authDomain', 'databaseURL', 'storageBucket', 'messagingSenderId'];

/** @constant
 * @description Parameters stored by path string instead of full path
 * @type {Array}
 * @private
*/
var metaParams = exports.metaParams = ['timestamp', 'requesting', 'requested'];

/** @constant
 * @description String Character used to split/join meta parameter keys
 * @type {Array}
 * @private
*/
var paramSplitChar = exports.paramSplitChar = '/';

exports.default = {
  defaultJWTProps: defaultJWTProps,
  actionTypes: actionTypes,
  defaultConfig: defaultConfig,
  supportedAuthProviders: supportedAuthProviders,
  defaultInitProps: defaultInitProps,
  metaParams: metaParams,
  paramSplitChar: paramSplitChar
};


module.exports = {
  defaultJWTProps: defaultJWTProps,
  actionTypes: actionTypes,
  defaultConfig: defaultConfig,
  supportedAuthProviders: supportedAuthProviders,
  defaultInitProps: defaultInitProps,
  metaParams: metaParams,
  paramSplitChar: paramSplitChar
};