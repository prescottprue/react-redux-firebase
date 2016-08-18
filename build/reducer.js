'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _constants = require('./constants');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = (0, _immutable.fromJS)({
  auth: undefined,
  authError: undefined,
  profile: undefined,
  data: {},
  snapshot: {}
});

var pathToArr = function pathToArr(path) {
  return path.split(/\//).filter(function (p) {
    return !!p;
  });
};

exports.default = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var path = action.path;

  var pathArr = void 0;
  var retVal = void 0;

  switch (action.type) {

    case _constants.START:
      var requesting = action.requesting;
      var requested = action.requested;

      pathArr = pathToArr(path);

      retVal = requesting !== undefined ? state.setIn(['requesting'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)(requesting)) : state.deleteIn(['requesting'].concat(_toConsumableArray(pathArr)));

      retVal = requested !== undefined ? retVal.setIn(['requested'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)(requested)) : retVal.deleteIn(['requested'].concat(_toConsumableArray(pathArr)));

      return retVal;

    case _constants.SET:
      var data = action.data;
      var snapshot = action.snapshot;
      var timestamp = action.timestamp;
      var requesting = action.requesting;
      var requested = action.requested;
      var rootPath = action.rootPath;

      pathArr = pathToArr(path);
      var rootPathArr = pathToArr(rootPath);

      retVal = data !== undefined ? state.setIn(['data'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)(data)) : state.deleteIn(['data'].concat(_toConsumableArray(pathArr)));

      retVal = snapshot !== undefined ? retVal.setIn(['snapshot'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)(snapshot)) : retVal.deleteIn(['snapshot'].concat(_toConsumableArray(pathArr)));

      retVal = timestamp !== undefined ? retVal.setIn(['timestamp'].concat(_toConsumableArray(rootPathArr)), (0, _immutable.fromJS)(timestamp)) : retVal.deleteIn(['timestamp'].concat(_toConsumableArray(rootPathArr)));

      retVal = requesting !== undefined ? retVal.setIn(['requesting'].concat(_toConsumableArray(rootPathArr)), (0, _immutable.fromJS)(requesting)) : retVal.deleteIn(['requesting'].concat(_toConsumableArray(rootPathArr)));

      retVal = requested !== undefined ? retVal.setIn(['requested'].concat(_toConsumableArray(rootPathArr)), (0, _immutable.fromJS)(requested)) : retVal.deleteIn(['requested'].concat(_toConsumableArray(rootPathArr)));

      return retVal;

    case _constants.NO_VALUE:
      var timestamp = action.timestamp;
      var requesting = action.requesting;
      var requested = action.requested;

      pathArr = pathToArr(path);
      retVal = state.setIn(['data'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)({}));
      retVal = retVal.setIn(['snapshot'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)({}));

      retVal = timestamp !== undefined ? retVal.setIn(['timestamp'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)(timestamp)) : retVal.deleteIn(['timestamp'].concat(_toConsumableArray(pathArr)));

      retVal = requesting !== undefined ? retVal.setIn(['requesting'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)(requesting)) : retVal.deleteIn(['requesting'].concat(_toConsumableArray(pathArr)));

      retVal = requested !== undefined ? retVal.setIn(['requested'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)(requested)) : retVal.deleteIn(['requested'].concat(_toConsumableArray(pathArr)));

      return retVal;

    case _constants.INIT_BY_PATH:
      pathArr = pathToArr(path);
      retVal = state.deleteIn(['data'].concat(_toConsumableArray(pathArr)));
      //keep the prev snapshot until it will override by the new one
      //retVal = retVal.deleteIn(['snapshot', ...pathArr])
      retVal = retVal.deleteIn(['timestamp'].concat(_toConsumableArray(pathArr)));
      retVal = retVal.deleteIn(['requesting'].concat(_toConsumableArray(pathArr)));
      retVal = retVal.deleteIn(['requested'].concat(_toConsumableArray(pathArr)));

      return retVal;

    case _constants.SET_PROFILE:
      var profile = action.profile;

      return profile !== undefined ? state.setIn(['profile'], (0, _immutable.fromJS)(profile)) : state.deleteIn(['profile']);

    case _constants.LOGOUT:
      return (0, _immutable.fromJS)({
        auth: null,
        authError: null,
        profile: null,
        data: {},
        timestamp: {},
        requesting: false,
        requested: false,
        snapshot: {}
      });

    case _constants.LOGIN:
      return state.setIn(['auth'], (0, _immutable.fromJS)(action.auth)).setIn(['authError'], null);

    case _constants.LOGIN_ERROR:
      return state.setIn(['authError'], action.authError).setIn(['auth'], null).setIn(['profile'], null);

    default:
      return state;

  }
};