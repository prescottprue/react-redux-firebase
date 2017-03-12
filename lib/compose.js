'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFirebase = undefined;

var _app = require('firebase/app');

var firebase = _interopRequireWildcard(_app);

require('firebase/auth');

require('firebase/database');

require('firebase/storage');

var _constants = require('./constants');

var _utils = require('./utils');

var _actions = require('./actions');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _Promise = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise; // import * as firebase from 'firebase'


var firebaseInstance = void 0;

/**
 * @name reactReduxFirebase
 * @external
 * @description Middleware that handles configuration (placed in redux's
 * `compose` call)
 * @property {Object} fbConfig - Object containing Firebase config including
 * databaseURL
 * @property {String} fbConfig.apiKey - Firebase apiKey
 * @property {String} fbConfig.authDomain - Firebase auth domain
 * @property {String} fbConfig.databaseURL - Firebase database url
 * @property {String} fbConfig.storageBucket - Firebase storage bucket
 * @property {Object} config - Containing react-redux-firebase specific config
 * such as userProfile
 * @property {String} config.userProfile - Location on firebase to store user
 * profiles
 * @property {Boolean} config.enableLogging - Whether or not to enable Firebase
 * database logging
 * @property {Boolean} config.updateProfileOnLogin - Whether or not to update
 * profile when logging in. (default: `false`)
 * @property {Boolean} config.enableRedirectHandling - Whether or not to enable
 * auth redirect handling listener. (default: `true`)
 * @property {Function} config.profileFactory - Factory for modifying how user profile is saved.
 * @property {Function} config.uploadFileDataFactory - Factory for modifying how file meta data is written during file uploads
 * @property {Array|String} config.profileParamsToPopulate - Parameters within
 * profile object to populate
 * @property {Boolean} config.autoPopulateProfile - Whether or not to
 * automatically populate profile with data loaded through
 * profileParamsToPopulate config. (default: `true`)
 * @property {Boolean} config.setProfilePopulateResults - Whether or not to
 * call SET actions for data that results from populating profile to redux under
 * the data path. For example: role paramter on profile populated from 'roles'
 * root. True will call SET_PROFILE as well as a SET action with the role that
 * is loaded (places it in data/roles). (default: `false`)
 * @return {Function} That accepts a component a returns a wrapped version of component
 * @example <caption>Setup</caption>
 * import { createStore, compose } from 'redux'
 * import { reactReduxFirebase } from 'react-redux-firebase'

 * // React Redux Firebase Config
 * const config = {
 *   userProfile: 'users', // saves user profiles to '/users' on Firebase
 *   // here is where you place other config options
 * }
 *
 * // Add react-redux-firebase to compose
 * // Note: In full projects this will often be within createStore.js or store.js
 * const createStoreWithFirebase = compose(
 *  reactReduxFirebase(fbConfig, config),
 * )(createStore)
 *
 * // Use Function later to create store
 * const store = createStoreWithFirebase(rootReducer, initialState)
 */

exports.default = function (fbConfig, otherConfig) {
  return function (next) {
    return function (reducer, initialState, middleware) {
      var store = next(reducer, initialState, middleware);
      var dispatch = store.dispatch;

      // Combine all configs

      var configs = Object.assign({}, _constants.defaultConfig, fbConfig, otherConfig);

      (0, _utils.validateConfig)(configs);

      // Initialize Firebase
      try {
        firebase.initializeApp(fbConfig);
      } catch (err) {} // silence reinitialize warning (hot-reloading)

      // Enable Logging based on config
      if (configs.enableLogging) {
        firebase.database.enableLogging(configs.enableLogging);
      }
      if (configs.rn) {
        var AsyncStorage = config.rn.AsyncStorage;
        firebase.INTERNAL.extendNamespace({
          'INTERNAL': {
            'reactNative': {
              'AsyncStorage': AsyncStorage
            }
          }
        });
      }

      var rootRef = firebase.database().ref();

      var instance = Object.defineProperty(firebase, '_', {
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
        return rootRef.child(path).set(value, onComplete);
      };

      var push = function push(path, value, onComplete) {
        return rootRef.child(path).push(value, onComplete);
      };

      var update = function update(path, value, onComplete) {
        return rootRef.child(path).update(value, onComplete);
      };

      var remove = function remove(path, onComplete) {
        return rootRef.child(path).remove(onComplete);
      };

      var uniqueSet = function uniqueSet(path, value, onComplete) {
        return rootRef.child(path).once('value').then(function (snap) {
          if (snap.val && snap.val() !== null) {
            var err = new Error('Path already exists.');
            if (onComplete) onComplete(err);
            return _Promise.reject(err);
          }
          return rootRef.child(path).set(value, onComplete);
        });
      };

      var uploadFile = function uploadFile(path, file, dbPath) {
        return _actions.storageActions.uploadFile(dispatch, instance, { path: path, file: file, dbPath: dbPath });
      };

      var uploadFiles = function uploadFiles(path, files, dbPath) {
        return _actions.storageActions.uploadFiles(dispatch, instance, { path: path, files: files, dbPath: dbPath });
      };

      var deleteFile = function deleteFile(path, dbPath) {
        return _actions.storageActions.deleteFile(dispatch, instance, { path: path, dbPath: dbPath });
      };

      var watchEvent = function watchEvent(type, path, storeAs) {
        return _actions.queryActions.watchEvent(instance, dispatch, { type: type, path: path, storeAs: storeAs });
      };

      var unWatchEvent = function unWatchEvent(eventName, eventPath) {
        var queryId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        return _actions.queryActions.unWatchEvent(instance, eventName, eventPath, queryId);
      };

      var login = function login(credentials) {
        return _actions.authActions.login(dispatch, instance, credentials);
      };

      var logout = function logout() {
        return _actions.authActions.logout(dispatch, instance);
      };

      var createUser = function createUser(credentials, profile) {
        return _actions.authActions.createUser(dispatch, instance, credentials, profile);
      };

      var resetPassword = function resetPassword(credentials) {
        return _actions.authActions.resetPassword(dispatch, instance, credentials);
      };

      var confirmPasswordReset = function confirmPasswordReset(code, password) {
        return _actions.authActions.confirmPasswordReset(dispatch, instance, code, password);
      };

      var verifyPasswordResetCode = function verifyPasswordResetCode(code) {
        return _actions.authActions.verifyPasswordResetCode(dispatch, instance, code);
      };

      instance.helpers = {
        ref: function ref(path) {
          return firebase.database().ref(path);
        },
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
        confirmPasswordReset: confirmPasswordReset,
        verifyPasswordResetCode: verifyPasswordResetCode,
        watchEvent: watchEvent,
        unWatchEvent: unWatchEvent,
        storage: function storage() {
          return firebase.storage();
        }
      };

      _actions.authActions.init(dispatch, instance);

      store.firebase = instance;
      firebaseInstance = Object.assign({}, instance, instance.helpers);

      return store;
    };
  };
};

/**
 * @external
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


var getFirebase = exports.getFirebase = function getFirebase() {
  // TODO: Handle recieveing config and creating firebase instance if it doesn't exist
  /* istanbul ignore next: Firebase instance always exists during tests */
  if (!firebaseInstance) {
    throw new Error('Firebase instance does not yet exist. Check your compose function.'); // eslint-disable-line no-console
  }
  // TODO: Create new firebase here with config passed in
  return firebaseInstance;
};