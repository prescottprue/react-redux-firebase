'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.createUser = exports.logout = exports.login = exports.createUserProfile = exports.watchUserProfile = exports.unWatchUserProfile = exports.init = exports.dispatchLogin = exports.dispatchUnauthorizedError = exports.dispatchLoginError = undefined;

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _constants = require('../constants');

var _populate = require('../utils/populate');

var _auth = require('../utils/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var SET_PROFILE = _constants.actionTypes.SET_PROFILE,
    LOGIN = _constants.actionTypes.LOGIN,
    LOGOUT = _constants.actionTypes.LOGOUT,
    LOGIN_ERROR = _constants.actionTypes.LOGIN_ERROR,
    UNAUTHORIZED_ERROR = _constants.actionTypes.UNAUTHORIZED_ERROR,
    AUTHENTICATION_INIT_STARTED = _constants.actionTypes.AUTHENTICATION_INIT_STARTED,
    AUTHENTICATION_INIT_FINISHED = _constants.actionTypes.AUTHENTICATION_INIT_FINISHED;

/**
 * @description Dispatch login error action
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} authError - Error object
 */

var dispatchLoginError = exports.dispatchLoginError = function dispatchLoginError(dispatch, authError) {
  return dispatch({
    type: LOGIN_ERROR,
    authError: authError
  });
};

/**
 * @description Dispatch login error action
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} authError - Error object
 */
var dispatchUnauthorizedError = exports.dispatchUnauthorizedError = function dispatchUnauthorizedError(dispatch, authError) {
  return dispatch({
    type: UNAUTHORIZED_ERROR,
    authError: authError
  });
};

/**
 * @description Dispatch login action
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} auth - Auth data object
 */
var dispatchLogin = exports.dispatchLogin = function dispatchLogin(dispatch, auth) {
  return dispatch({
    type: LOGIN,
    auth: auth,
    authError: null
  });
};

/**
 * @description Initialize authentication state change listener that
 * watches user profile and dispatches login action
 * @param {Function} dispatch - Action dispatch function
 */
var init = exports.init = function init(dispatch, firebase) {
  dispatch({ type: AUTHENTICATION_INIT_STARTED });

  firebase.auth().onAuthStateChanged(function (authData) {
    if (!authData) {
      return dispatch({ type: LOGOUT });
    }

    firebase._.authUid = authData.uid;
    watchUserProfile(dispatch, firebase);

    dispatchLogin(dispatch, authData);

    // Run onAuthStateChanged if it exists in config
    if (firebase._.config.onAuthStateChanged) {
      firebase._.config.onAuthStateChanged(authData, firebase);
    }
  });

  firebase.auth().currentUser;

  dispatch({ type: AUTHENTICATION_INIT_FINISHED });
};

/**
 * @description Remove listener from user profile
 * @param {Object} firebase - Internal firebase object
 */
var unWatchUserProfile = exports.unWatchUserProfile = function unWatchUserProfile(firebase) {
  var authUid = firebase._.authUid;
  var userProfile = firebase._.config.userProfile;
  if (firebase._.profileWatch) {
    firebase.database().ref().child(userProfile + '/' + authUid).off('value', firebase._.profileWatch);
    firebase._.profileWatch = null;
  }
};

/**
 * @description Watch user profile
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 */
var watchUserProfile = exports.watchUserProfile = function watchUserProfile(dispatch, firebase) {
  var authUid = firebase._.authUid;
  var userProfile = firebase._.config.userProfile;
  unWatchUserProfile(firebase);

  if (firebase._.config.userProfile) {
    firebase._.profileWatch = firebase.database().ref().child(userProfile + '/' + authUid).on('value', function (snap) {
      var profileParamsToPopulate = firebase._.config.profileParamsToPopulate;

      if (!profileParamsToPopulate || !(0, _isArray3.default)(profileParamsToPopulate) && !(0, _isString3.default)(profileParamsToPopulate)) {
        dispatch({
          type: SET_PROFILE,
          profile: snap.val()
        });
      } else {
        // Convert each populate string in array into an array of once query promises
        Promise.all((0, _populate.promisesForPopulate)(firebase, snap.val(), profileParamsToPopulate)).then(function (data) {
          // Dispatch action with profile combined with populated parameters
          dispatch({
            type: SET_PROFILE,
            profile: Object.assign(snap.val(), // profile
            data.reduce(function (a, b) {
              return Object.assign(a, b);
            }) // populated profile parameters
            )
          });
        });
      }
    });
  }
};

/**
 * @description Login with errors dispatched
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} userData - User data object (response from authenticating)
 * @param {Object} profile - Profile data to place in new profile
 */
var createUserProfile = exports.createUserProfile = function createUserProfile(dispatch, firebase, userData, profile) {
  return (
    // Check for user's profile at userProfile path if provided
    !firebase._.config.userProfile ? Promise.resolve(userData) : firebase.database().ref().child(firebase._.config.userProfile + '/' + userData.uid).once('value').then(function (profileSnap) {
      return (
        // update profile only if doesn't exist or if set by config
        !firebase._.config.updateProfileOnLogin && profileSnap.val() !== null ? profileSnap.val() : profileSnap.ref.update(profile) // Update the profile
        .then(function () {
          return profile;
        }).catch(function (err) {
          // Error setting profile
          dispatchUnauthorizedError(dispatch, err);
          return Promise.reject(err);
        })
      );
    }).catch(function (err) {
      // Error reading user profile
      dispatchUnauthorizedError(dispatch, err);
      return Promise.reject(err);
    })
  );
};

/**
 * @description Login with errors dispatched
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} credentials - Login credentials
 * @param {Object} credentials.email - Email to login with (only needed for email login)
 * @param {Object} credentials.password - Password to login with (only needed for email login)
 * @param {Object} credentials.provider - Provider name such as google, twitter (only needed for 3rd party provider login)
 * @param {Object} credentials.type - Popup or redirect (only needed for 3rd party provider login)
 * @param {Object} credentials.token - Custom or provider token
 */
var login = exports.login = function login(dispatch, firebase, credentials) {
  var _firebase$auth;

  dispatchLoginError(dispatch, null);

  var _getLoginMethodAndPar = (0, _auth.getLoginMethodAndParams)(firebase, credentials),
      method = _getLoginMethodAndPar.method,
      params = _getLoginMethodAndPar.params;

  return (_firebase$auth = firebase.auth())[method].apply(_firebase$auth, _toConsumableArray(params)).then(function (userData) {
    // Handle null response from getRedirectResult before redirect has happened
    if (!userData) return Promise.resolve(null);

    // For email auth return uid (createUser is used for creating a profile)
    if (userData.email) return userData.uid;

    var profileDecorator = firebase._.config.profileDecorator;

    // For token auth, the user key doesn't exist. Instead, return the JWT.

    if (method === 'signInWithCustomToken') {
      // Extract the extra data in the JWT token for user object
      var _userData$toJSON = userData.toJSON(),
          accessToken = _userData$toJSON.stsTokenManager.accessToken,
          uid = _userData$toJSON.uid;

      var jwtData = (0, _jwtDecode2.default)(accessToken);
      var extraJWTData = (0, _omit3.default)(jwtData, _constants.defaultJWTKeys);

      // Handle profile decorator
      var _profileData = profileDecorator && (0, _isFunction3.default)(profileDecorator) ? profileDecorator(Object.assign(userData.toJSON(), extraJWTData)) : extraJWTData;

      return createUserProfile(dispatch, firebase, { uid: uid }, _profileData);
    }

    // Create profile when logging in with external provider
    var user = userData.user;

    // Handle profile decorator

    var profileData = profileDecorator && (0, _isFunction3.default)(profileDecorator) ? profileDecorator(user) : Object.assign({}, {
      email: user.email,
      displayName: user.providerData[0].displayName || user.email,
      avatarUrl: user.providerData[0].photoURL,
      providerData: user.providerData
    });

    return createUserProfile(dispatch, firebase, user, profileData);
  }).catch(function (err) {
    dispatchLoginError(dispatch, err);
    return Promise.reject(err);
  });
};

/**
 * @description Logout of firebase and dispatch logout event
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 */
var logout = exports.logout = function logout(dispatch, firebase) {
  firebase.auth().signOut();
  dispatch({ type: LOGOUT });
  firebase._.authUid = null;
  unWatchUserProfile(firebase);
  return Promise.resolve(firebase);
};

/**
 * @description Create a new user in auth and add an account to userProfile root
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} credentials - Login credentials
 * @return {Promise}
 */
var createUser = exports.createUser = function createUser(dispatch, firebase, _ref, profile) {
  var email = _ref.email,
      password = _ref.password,
      signIn = _ref.signIn;

  dispatchLoginError(dispatch, null);

  if (!email || !password) {
    dispatchLoginError(dispatch, new Error('Email and Password are required to create user'));
    return Promise.reject(new Error('Email and Password are Required'));
  }

  return firebase.auth().createUserWithEmailAndPassword(email, password).then(function (userData) {
    return (
      // Login to newly created account if signIn flag is true
      firebase.auth().currentUser || !!signIn && signIn === false ? createUserProfile(dispatch, firebase, userData, profile) : login(dispatch, firebase, { email: email, password: password }).then(function () {
        return createUserProfile(dispatch, firebase, userData, profile || { email: email });
      }).catch(function (err) {
        if (err) {
          switch (err.code) {
            case 'auth/user-not-found':
              dispatchLoginError(dispatch, new Error('The specified user account does not exist.'));
              break;
            default:
              dispatchLoginError(dispatch, err);
          }
        }
        return Promise.reject(err);
      })
    );
  }).catch(function (err) {
    dispatchLoginError(dispatch, err);
    return Promise.reject(err);
  });
};

/**
 * @description Send password reset email to provided email
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {String} email - Email to send recovery email to
 * @return {Promise}
 */
var resetPassword = exports.resetPassword = function resetPassword(dispatch, firebase, email) {
  dispatchLoginError(dispatch, null);
  return firebase.auth().sendPasswordResetEmail(email).catch(function (err) {
    if (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          dispatchLoginError(dispatch, new Error('The specified user account does not exist.'));
          break;
        default:
          dispatchLoginError(dispatch, err);
      }
      return Promise.reject(err);
    }
  });
};

exports.default = {
  dispatchLoginError: dispatchLoginError,
  dispatchUnauthorizedError: dispatchUnauthorizedError,
  dispatchLogin: dispatchLogin,
  unWatchUserProfile: unWatchUserProfile,
  watchUserProfile: watchUserProfile,
  init: init,
  createUserProfile: createUserProfile,
  login: login,
  logout: logout,
  createUser: createUser,
  resetPassword: resetPassword
};