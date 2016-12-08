'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFirebase = undefined;

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var firebaseInstance = void 0;

/**
 * @name reactReduxFirebase
 * @external
 * @description Middleware that handles configuration (placed in redux's `compose` call)
 * @param {Object} fbConfig - Object containing Firebase config including databaseURL
 * @param {String} fbConfig.apiKey - Firebase apiKey
 * @param {String} fbConfig.authDomain - Firebase auth domain
 * @param {String} fbConfig.databaseURL - Firebase database url
 * @param {String} fbConfig.storageBucket - Firebase storage bucket
 * @param {Object} config - Containing react-redux-firebase specific config such as userProfile
 * @param {String} config.userProfile - Location on firebase to store user profiles
 * @param {Boolean} config.enableLogging - Location on firebase to store user profiles. default: `false`
 * @param {Function} config.profileDecorator - Location on firebase to store user profiles. default: `false`
 * @param {Boolean} config.updateProfileOnLogin - Whether or not to update profile when logging in. default: `false`
 * @param {Boolean} config.profileParamsToPopulate - Whether or not to update profile when logging in. default: `false`
 * @return {Function} That accepts a component a returns a wrapped version of component
 * @example <caption>Data</caption>
 * import { createStore, compose } from 'redux'
 * import { reactReduxFirebase } from 'react-redux-firebase'
 *
 * // Firebase config
 * const fbConfig = {
 *  apiKey: '<your-api-key>',
 *  authDomain: '<your-auth-domain>',
 *  databaseURL: '<your-database-url>',
 *  storageBucket: '<your-storage-bucket>'
 * }
 *
 * // React Redux Firebase Config
 * const config = {
 *   userProfile: 'users'
 * }
 *
 * // Add react-redux-firebase to compose
 * const createStoreWithFirebase = compose(
 *  reactReduxFirebase(fbConfig, config),
 * )(createStore)
 *
 * // Use Function later to create store
 * const store = createStoreWithFirebase(rootReducer, initialState)
 */

exports.default = function (config, otherConfig) {
  return function (next) {
    return function (reducer, initialState, middleware) {
      var defaultConfig = {
        userProfile: null,
        enableLogging: false,
        updateProfileOnLogin: true
      };

      var store = next(reducer, initialState, middleware);
      var dispatch = store.dispatch;
      var apiKey = config.apiKey,
          authDomain = config.authDomain,
          databaseURL = config.databaseURL,
          storageBucket = config.storageBucket;

      // Throw for missing Firebase Data

      if (!databaseURL) throw new Error('Firebase databaseURL is required');
      if (!authDomain) throw new Error('Firebase authDomain is required');
      if (!apiKey) throw new Error('Firebase apiKey is required');

      // Combine all configs
      var configs = Object.assign({}, defaultConfig, config, otherConfig);

      // Initialize Firebase
      try {
        _firebase2.default.initializeApp({ apiKey: apiKey, authDomain: authDomain, databaseURL: databaseURL, storageBucket: storageBucket });
      } catch (err) {}

      // Enable Logging based on config
      if (configs.enableLogging) {
        _firebase2.default.database.enableLogging(configs.enableLogging);
      }

      var ref = _firebase2.default.database().ref();

      var firebase = Object.defineProperty(_firebase2.default, '_', {
        value: {
          watchers: {},
          config: configs,
          authUid: null
        },
        writable: true,
        enumerable: true,
        configurable: true
      });

      var set = function set(path, value, onComplete) {
        return ref.child(path).set(value, onComplete);
      };

      var push = function push(path, value, onComplete) {
        return ref.child(path).push(value, onComplete);
      };

      var update = function update(path, value, onComplete) {
        return ref.child(path).update(value, onComplete);
      };

      var remove = function remove(path, onComplete) {
        return ref.child(path).remove(onComplete);
      };

      var uploadFile = function uploadFile(path, file, dbPath) {
        return _actions.storageActions.uploadFile(dispatch, firebase, { path: path, file: file, dbPath: dbPath });
      };

      var uploadFiles = function uploadFiles(path, files, dbPath) {
        return _actions.storageActions.uploadFiles(dispatch, firebase, { path: path, files: files, dbPath: dbPath });
      };

      var deleteFile = function deleteFile(path, dbPath) {
        return _actions.storageActions.deleteFile(dispatch, firebase, { path: path, dbPath: dbPath });
      };

      var uniqueSet = function uniqueSet(path, value, onComplete) {
        return ref.child(path).once('value').then(function (snap) {
          if (snap.val && snap.val() !== null) {
            var err = new Error('Path already exists.');
            if (onComplete) onComplete(err);
            return Promise.reject(err);
          }
          return ref.child(path).set(value, onComplete);
        });
      };

      var watchEvent = function watchEvent(type, path) {
        return _actions.queryActions.watchEvent(firebase, dispatch, { type: type, path: path }, true);
      };

      var unWatchEvent = function unWatchEvent(eventName, eventPath) {
        var queryId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        return _actions.queryActions.unWatchEvent(firebase, eventName, eventPath, queryId);
      };

      var login = function login(credentials) {
        return _actions.authActions.login(dispatch, firebase, credentials);
      };

      var logout = function logout() {
        return _actions.authActions.logout(dispatch, firebase);
      };

      var createUser = function createUser(credentials, profile) {
        return _actions.authActions.createUser(dispatch, firebase, credentials, profile);
      };

      var resetPassword = function resetPassword(credentials) {
        return _actions.authActions.resetPassword(dispatch, firebase, credentials);
      };

      firebase.helpers = {
        ref: _firebase2.default.database().ref,
        set: set,
        uniqueSet: uniqueSet,
        push: push,
        remove: remove,
        update: update,
        login: login,
        logout: logout,
        uploadFile: uploadFile,
        uploadFiles: uploadFiles,
        deleteFile: deleteFile,
        createUser: createUser,
        resetPassword: resetPassword,
        watchEvent: watchEvent,
        unWatchEvent: unWatchEvent,
        storage: function storage() {
          return _firebase2.default.storage();
        }
      };

      _actions.authActions.init(dispatch, firebase);

      store.firebase = firebase;
      firebaseInstance = Object.assign({}, firebase, firebase.helpers);

      return store;
    };
  };
};

/**
 * @description Expose Firebase instance.
 * Warning: This is going to be rewritten in coming versions.
 * @private
*/


var getFirebase = exports.getFirebase = function getFirebase() {
  // TODO: Handle recieveing config and creating firebase instance if it doesn't exist
  /* istanbul ignore next: Firebase instance always exists during tests */
  if (!firebaseInstance) {
    throw new Error('Firebase instance does not yet exist. Check your compose function.'); // eslint-disable-line no-console
  }
  return firebaseInstance;
};