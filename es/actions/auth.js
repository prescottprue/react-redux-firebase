'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyPasswordResetCode = exports.confirmPasswordReset = exports.resetPassword = exports.createUser = exports.logout = exports.login = exports.init = exports.createUserProfile = exports.watchUserProfile = exports.unWatchUserProfile = exports.dispatchLogin = exports.dispatchUnauthorizedError = exports.dispatchLoginError = undefined;

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _set2 = require('lodash/set');

var _set3 = _interopRequireDefault(_set2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _constants = require('../constants');

var _populate = require('../utils/populate');

var _auth = require('../utils/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _Promise = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise;

var SET = _constants.actionTypes.SET,
    SET_PROFILE = _constants.actionTypes.SET_PROFILE,
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
 * @private
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
 * @private
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
 * @private
 */
var dispatchLogin = exports.dispatchLogin = function dispatchLogin(dispatch, auth) {
  return dispatch({
    type: LOGIN,
    auth: auth,
    authError: null
  });
};

/**
 * @description Remove listener from user profile
 * @param {Object} firebase - Internal firebase object
 * @private
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
 * @private
 */
var watchUserProfile = exports.watchUserProfile = function watchUserProfile(dispatch, firebase) {
  var authUid = firebase._.authUid;
  var userProfile = firebase._.config.userProfile;
  unWatchUserProfile(firebase);

  if (firebase._.config.userProfile) {
    firebase._.profileWatch = firebase.database().ref().child(userProfile + '/' + authUid).on('value', function (snap) {
      var _firebase$_$config = firebase._.config,
          profileParamsToPopulate = _firebase$_$config.profileParamsToPopulate,
          autoPopulateProfile = _firebase$_$config.autoPopulateProfile,
          setProfilePopulateResults = _firebase$_$config.setProfilePopulateResults;

      if (!profileParamsToPopulate || !(0, _isArray3.default)(profileParamsToPopulate) && !(0, _isString3.default)(profileParamsToPopulate)) {
        dispatch({
          type: SET_PROFILE,
          profile: snap.val()
        });
      } else {
        // Convert each populate string in array into an array of once query promises
        (0, _populate.promisesForPopulate)(firebase, snap.val(), profileParamsToPopulate).then(function (data) {
          // Dispatch action with profile combined with populated parameters
          // Auto Populate profile
          if (autoPopulateProfile) {
            var populates = (0, _populate.getPopulateObjs)(profileParamsToPopulate);
            var profile = snap.val();
            (0, _forEach3.default)(populates, function (p) {
              (0, _set3.default)(profile, p.child, (0, _get3.default)(data, p.root + '.' + snap.val()[p.child]));
            });
            dispatch({
              type: SET_PROFILE,
              profile: profile
            });
          } else {
            // dispatch with unpopulated profile data
            dispatch({
              type: SET_PROFILE,
              profile: snap.val()
            });
          }

          // Fire actions for placement of data gathered in populate into redux
          if (setProfilePopulateResults) {
            (0, _forEach3.default)(data, function (result, path) {
              dispatch({
                type: SET,
                path: path,
                data: result,
                timestamp: Date.now(),
                requesting: false,
                requested: true
              });
            });
          }
        });
      }
    });
  }
};

/**
 * @description Create user profile if it does not already exist. `updateProifleOnLogin: false`
 * can be passed to config to dsiable updating. Profile factory is applied if it exists and is a function.
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} userData - User data object (response from authenticating)
 * @param {Object} profile - Profile data to place in new profile
 * @return {Promise}
 * @private
 */
var createUserProfile = exports.createUserProfile = function createUserProfile(dispatch, firebase, userData, profile) {
  if (!firebase._.config.userProfile) {
    return _Promise.resolve(userData);
  }
  var database = firebase.database,
      config = firebase._.config;

  if ((0, _isFunction3.default)(config.profileFactory)) {
    profile = config.profileFactory(userData, profile);
  }
  if ((0, _isFunction3.default)(config.profileDecorator)) {
    if ((0, _isFunction3.default)(console.warn)) {
      // eslint-disable-line no-console
      console.warn('profileDecorator is Depreceated and will be removed in future versions. Please use profileFactory.'); // eslint-disable-line no-console
    }
    profile = config.profileDecorator(userData, profile);
  }
  // Check for user's profile at userProfile path if provided
  return database().ref().child(config.userProfile + '/' + userData.uid).once('value').then(function (profileSnap) {
    return (
      // update profile only if doesn't exist or if set by config
      !config.updateProfileOnLogin && profileSnap.val() !== null ? profileSnap.val() : profileSnap.ref.update(profile) // Update the profile
      .then(function () {
        return profile;
      }).catch(function (err) {
        // Error setting profile
        dispatchUnauthorizedError(dispatch, err);
        return _Promise.reject(err);
      })
    );
  }).catch(function (err) {
    // Error reading user profile
    dispatchUnauthorizedError(dispatch, err);
    return _Promise.reject(err);
  });
};

/**
 * @description Initialize authentication state change listener that
 * watches user profile and dispatches login action
 * @param {Function} dispatch - Action dispatch function
 * @private
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

  if (firebase._.config.enableRedirectHandling) {
    firebase.auth().getRedirectResult().then(function (authData) {
      if (authData && authData.user) {
        var user = authData.user;


        firebase._.authUid = user.uid;
        watchUserProfile(dispatch, firebase);

        dispatchLogin(dispatch, user);

        createUserProfile(dispatch, firebase, user, {
          email: user.email,
          displayName: user.providerData[0].displayName || user.email,
          avatarUrl: user.providerData[0].photoURL,
          providerData: user.providerData
        });
      }
    }).catch(function (error) {
      dispatchLoginError(dispatch, error);
      return _Promise.reject(error);
    });
  }

  firebase.auth().currentUser;

  dispatch({ type: AUTHENTICATION_INIT_FINISHED });
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
 * @return {Promise}
 * @private
 */
var login = exports.login = function login(dispatch, firebase, credentials) {
  var _firebase$auth;

  dispatchLoginError(dispatch, null);

  var _getLoginMethodAndPar = (0, _auth.getLoginMethodAndParams)(firebase, credentials),
      method = _getLoginMethodAndPar.method,
      params = _getLoginMethodAndPar.params;

  return (_firebase$auth = firebase.auth())[method].apply(_firebase$auth, _toConsumableArray(params)).then(function (userData) {
    // Handle null response from getRedirectResult before redirect has happened
    if (!userData) return _Promise.resolve(null);

    // For email auth return uid (createUser is used for creating a profile)
    if (userData.email) return userData.uid;

    // For token auth, the user key doesn't exist. Instead, return the JWT.
    if (method === 'signInWithCustomToken') {
      // Extract the extra data in the JWT token for user object
      var _userData$toJSON = userData.toJSON(),
          accessToken = _userData$toJSON.stsTokenManager.accessToken,
          uid = _userData$toJSON.uid;

      var extraJWTData = (0, _omit3.default)((0, _jwtDecode2.default)(accessToken), _constants.defaultJWTProps);

      return createUserProfile(dispatch, firebase, { uid: uid }, _extends({}, extraJWTData, { uid: uid }));
    }

    // Create profile when logging in with external provider
    var user = userData.user;


    return createUserProfile(dispatch, firebase, user, {
      email: user.email,
      displayName: user.providerData[0].displayName || user.email,
      avatarUrl: user.providerData[0].photoURL,
      providerData: user.providerData
    });
  }).catch(function (err) {
    dispatchLoginError(dispatch, err);
    return _Promise.reject(err);
  });
};

/**
 * @description Logout of firebase and dispatch logout event
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @private
 */
var logout = exports.logout = function logout(dispatch, firebase) {
  firebase.auth().signOut();
  dispatch({ type: LOGOUT });
  firebase._.authUid = null;
  unWatchUserProfile(firebase);
  return _Promise.resolve(firebase);
};

/**
 * @description Create a new user in auth and add an account to userProfile root
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} credentials - Login credentials
 * @return {Promise}
 * @private
 */
var createUser = exports.createUser = function createUser(dispatch, firebase, _ref, profile) {
  var email = _ref.email,
      password = _ref.password,
      signIn = _ref.signIn;

  dispatchLoginError(dispatch, null);

  if (!email || !password) {
    dispatchLoginError(dispatch, new Error('Email and Password are required to create user'));
    return _Promise.reject(new Error('Email and Password are Required'));
  }

  return firebase.auth().createUserWithEmailAndPassword(email, password).then(function (userData) {
    return (
      // Login to newly created account if signIn flag is not set to false
      firebase.auth().currentUser || !!signIn && signIn === false ? createUserProfile(dispatch, firebase, userData, profile || { email: email }) : login(dispatch, firebase, { email: email, password: password }).then(function () {
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
        return _Promise.reject(err);
      })
    );
  }).catch(function (err) {
    dispatchLoginError(dispatch, err);
    return _Promise.reject(err);
  });
};

/**
 * @description Send password reset email to provided email
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {String} email - Email to send recovery email to
 * @return {Promise}
 * @private
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
      return _Promise.reject(err);
    }
  });
};

/**
 * @description Confirm the password reset with code and password
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {String} code - Email confirmation reset code
 * @param {String} password - Password to set it to
 * @return {Promise}
 * @private
 */
var confirmPasswordReset = exports.confirmPasswordReset = function confirmPasswordReset(dispatch, firebase, code, password) {
  dispatchLoginError(dispatch, null);
  return firebase.auth().confirmPasswordReset(code, password).catch(function (err) {
    if (err) {
      switch (err.code) {
        case 'auth/expired-action-code':
          dispatchLoginError(dispatch, new Error('The action code has expired.'));
          break;
        case 'auth/invalid-action-code':
          dispatchLoginError(dispatch, new Error('The action code is invalid.'));
          break;
        case 'auth/user-disabled':
          dispatchLoginError(dispatch, new Error('The user is disabled.'));
          break;
        case 'auth/user-not-found':
          dispatchLoginError(dispatch, new Error('The user is not found.'));
          break;
        case 'auth/weak-password':
          dispatchLoginError(dispatch, new Error('The password is not strong enough.'));
          break;
        default:
          dispatchLoginError(dispatch, err);
      }
      return _Promise.reject(err);
    }
  });
};

/**
 * @description Verify that password reset code is valid
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {String} code - Password reset code
 * @return {Promise} email - Email associated with reset code
 * @private
 */
var verifyPasswordResetCode = exports.verifyPasswordResetCode = function verifyPasswordResetCode(dispatch, firebase, code) {
  dispatchLoginError(dispatch, null);
  return firebase.auth().verifyPasswordResetCode(code).catch(function (err) {
    if (err) {
      dispatchLoginError(dispatch, err);
    }
    return _Promise.reject(err);
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
  resetPassword: resetPassword,
  confirmPasswordReset: confirmPasswordReset,
  verifyPasswordResetCode: verifyPasswordResetCode
};