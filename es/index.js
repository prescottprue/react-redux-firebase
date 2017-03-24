'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _helpers = require('./helpers');

var helpers = _interopRequireWildcard(_helpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({
  firebase: _connect2.default,
  firebaseConnect: _connect2.default,
  firebaseStateReducer: _reducer2.default,
  reduxReactFirebase: _compose2.default,
  reactReduxFirebase: _compose2.default,
  reduxFirebase: _compose2.default,
  constants: _constants2.default,
  actionTypes: _constants.actionTypes,
  getFirebase: _compose.getFirebase,
  helpers: helpers
}, helpers);
module.exports = exports['default'];