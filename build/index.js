'use strict';

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _helpers = require('./helpers');

var helpers = _interopRequireWildcard(_helpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  firebase: _connect2.default,
  firebaseStateReducer: _reducer2.default,
  reduxReactFirebase: _compose2.default,
  reduxFirebase: _compose2.default,
  helpers: helpers
};