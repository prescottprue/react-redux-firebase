'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storageActions = exports.queryActions = exports.authActions = undefined;

var _auth = require('./auth');

var authActions = _interopRequireWildcard(_auth);

var _query = require('./query');

var queryActions = _interopRequireWildcard(_query);

var _storage = require('./storage');

var storageActions = _interopRequireWildcard(_storage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.authActions = authActions;
exports.queryActions = queryActions;
exports.storageActions = storageActions;
exports.default = { authActions: authActions, queryActions: queryActions, storageActions: storageActions };