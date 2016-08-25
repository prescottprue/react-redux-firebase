'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _actions = require('./actions');

var Actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (config, otherConfig) {
  return function (next) {
    return function (reducer, initialState) {
      var defaultConfig = {
        userProfile: null
      };

      var store = next(reducer, initialState);

      var dispatch = store.dispatch;


      if (!config.databaseURL) throw new Error('Firebase Database URL is required');

      try {
        _firebase2.default.initializeApp(config);
      } catch (err) {}

      var ref = _firebase2.default.database().ref();

      var configs = Object.assign({}, defaultConfig, config, otherConfig);

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
      var remove = function remove(path, onComplete) {
        return ref.child(path).remove(onComplete);
      };
      var watchEvent = function watchEvent(eventName, eventPath) {
        return Actions.watchEvent(firebase, dispatch, eventName, eventPath);
      };
      var unWatchEvent = function unWatchEvent(eventName, eventPath) {
        var queryId = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];
        return Actions.unWatchEvent(firebase, dispatch, eventName, eventPath, queryId);
      };
      var login = function login(credentials) {
        return Actions.login(dispatch, firebase, credentials);
      };
      var logout = function logout() {
        return Actions.logout(dispatch, firebase);
      };
      var createUser = function createUser(credentials, profile) {
        return Actions.createUser(dispatch, firebase, credentials, profile);
      };
      var resetPassword = function resetPassword(credentials) {
        return Actions.resetPassword(dispatch, firebase, credentials);
      };
      var changePassword = function changePassword(credentials) {
        return Actions.changePassword(dispatch, firebase, credentials);
      };

      firebase.helpers = {
        set: set, push: push, remove: remove,
        createUser: createUser,
        login: login, logout: logout,
        resetPassword: resetPassword, changePassword: changePassword,
        watchEvent: watchEvent, unWatchEvent: unWatchEvent
      };

      Actions.init(dispatch, firebase);

      store.firebase = firebase;

      return store;
    };
  };
};