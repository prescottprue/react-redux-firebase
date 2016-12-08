'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLoginMethodAndParams = exports.createAuthProvider = undefined;

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _capitalize2 = require('lodash/capitalize');

var _capitalize3 = _interopRequireDefault(_capitalize2);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Get correct login method and params order based on provided credentials
 * @param {Object} firebase - Internal firebase object
 * @param {String} providerName - Name of Auth Provider (i.e. google, github, facebook, twitter)
 * @param {Array|String} scopes - List of scopes to add to auth provider
 */
var createAuthProvider = exports.createAuthProvider = function createAuthProvider(firebase, providerName, scopes) {
  // TODO: Verify scopes are valid before adding
  // Verify providerName is valid
  if (_constants.supportedAuthProviders.indexOf(providerName.toLowerCase()) === -1) {
    throw new Error(providerName + ' is not a valid Auth Provider');
  }
  var provider = new firebase.auth[(0, _capitalize3.default)(providerName) + 'AuthProvider']();
  provider.addScope('email');
  if (scopes) {
    if ((0, _isArray3.default)(scopes)) {
      scopes.forEach(function (scope) {
        provider.addScope(scope);
      });
    }
    if ((0, _isString3.default)(scopes)) {
      provider.addScope(scopes);
    }
  }
  return provider;
};

/**
 * @description Get correct login method and params order based on provided credentials
 * @param {Object} firebase - Internal firebase object
 * @param {Object} credentials - Login credentials
 * @param {String} credentials.email - Email to login with (only needed for email login)
 * @param {String} credentials.password - Password to login with (only needed for email login)
 * @param {String} credentials.provider - Provider name such as google, twitter (only needed for 3rd party provider login)
 * @param {String} credentials.type - Popup or redirect (only needed for 3rd party provider login)
 * @param {String} credentials.token - Custom or provider token
 * @param {String} credentials.scopes - Scopes to add to provider (i.e. email)
 */
var getLoginMethodAndParams = exports.getLoginMethodAndParams = function getLoginMethodAndParams(firebase, _ref) {
  var email = _ref.email,
      password = _ref.password,
      provider = _ref.provider,
      type = _ref.type,
      token = _ref.token,
      scopes = _ref.scopes;

  if (provider) {
    if (token) {
      return {
        method: 'signInWithCredential',
        params: [provider, token]
      };
    }
    var authProvider = createAuthProvider(firebase, provider, scopes);
    if (type === 'popup') {
      return {
        method: 'signInWithPopup',
        params: [authProvider]
      };
    }
    return {
      method: 'signInWithRedirect',
      params: [authProvider]
    };
  }
  if (token) {
    return {
      method: 'signInWithCustomToken',
      params: [token]
    };
  }
  return {
    method: 'signInWithEmailAndPassword',
    params: [email, password]
  };
};

exports.default = { getLoginMethodAndParams: getLoginMethodAndParams };