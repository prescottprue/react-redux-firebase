'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _constants = require('./constants');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var START = _constants.actionTypes.START,
    SET = _constants.actionTypes.SET,
    SET_PROFILE = _constants.actionTypes.SET_PROFILE,
    LOGIN = _constants.actionTypes.LOGIN,
    LOGOUT = _constants.actionTypes.LOGOUT,
    LOGIN_ERROR = _constants.actionTypes.LOGIN_ERROR,
    NO_VALUE = _constants.actionTypes.NO_VALUE,
    INIT_BY_PATH = _constants.actionTypes.INIT_BY_PATH,
    AUTHENTICATION_INIT_STARTED = _constants.actionTypes.AUTHENTICATION_INIT_STARTED,
    AUTHENTICATION_INIT_FINISHED = _constants.actionTypes.AUTHENTICATION_INIT_FINISHED,
    UNAUTHORIZED_ERROR = _constants.actionTypes.UNAUTHORIZED_ERROR;


var emptyState = {
  auth: undefined,
  authError: undefined,
  profile: undefined,
  isInitializing: undefined,
  data: {}
};

var initialState = (0, _immutable.fromJS)(emptyState);

var pathToArr = function pathToArr(path) {
  return path.split(/\//).filter(function (p) {
    return !!p;
  });
};

/**
 * @name firebaseStateReducer
 * @description Reducer for react redux firebase. This function is called
 * automatically by redux every time an action is fired. Based on which action
 * is called and its payload, the reducer will update redux state with relevant
 * changes.
 * @param {Map} state - Current Redux State
 * @param {Object} action - Action which will modify state
 * @param {String} action.type - Type of Action being called
 * @param {String} action.data - Type of Action which will modify state
 * @return {Map} State
 */

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var path = action.path,
      timestamp = action.timestamp,
      requesting = action.requesting,
      requested = action.requested;

  var pathArr = void 0;
  var rootPathArr = void 0;
  var retVal = void 0;

  switch (action.type) {

    case START:
      pathArr = pathToArr(path);
      retVal = requesting !== undefined ? state.setIn(['requesting'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)(requesting)) : state.deleteIn(['requesting'].concat(_toConsumableArray(pathArr)));

      retVal = requested !== undefined ? retVal.setIn(['requested'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)(requested)) : retVal.deleteIn(['requested'].concat(_toConsumableArray(pathArr)));

      return retVal;

    case SET:
      var data = action.data,
          rootPath = action.rootPath;

      pathArr = pathToArr(path);
      rootPathArr = pathToArr(rootPath);
      retVal = data !== undefined ? state.setIn(['data'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)(data)) : state.deleteIn(['data'].concat(_toConsumableArray(pathArr)));

      retVal = timestamp !== undefined ? retVal.setIn(['timestamp'].concat(_toConsumableArray(rootPathArr)), (0, _immutable.fromJS)(timestamp)) : retVal.deleteIn(['timestamp'].concat(_toConsumableArray(rootPathArr)));

      retVal = requesting !== undefined ? retVal.setIn(['requesting'].concat(_toConsumableArray(rootPathArr)), (0, _immutable.fromJS)(requesting)) : retVal.deleteIn(['requesting'].concat(_toConsumableArray(rootPathArr)));

      retVal = requested !== undefined ? retVal.setIn(['requested'].concat(_toConsumableArray(rootPathArr)), (0, _immutable.fromJS)(requested)) : retVal.deleteIn(['requested'].concat(_toConsumableArray(rootPathArr)));

      return retVal;

    case NO_VALUE:
      pathArr = pathToArr(path);
      retVal = state.setIn(['data'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)({}));

      retVal = timestamp !== undefined ? retVal.setIn(['timestamp'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)(timestamp)) : retVal.deleteIn(['timestamp'].concat(_toConsumableArray(pathArr)));

      retVal = requesting !== undefined ? retVal.setIn(['requesting'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)(requesting)) : retVal.deleteIn(['requesting'].concat(_toConsumableArray(pathArr)));

      retVal = requested !== undefined ? retVal.setIn(['requested'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)(requested)) : retVal.deleteIn(['requested'].concat(_toConsumableArray(pathArr)));

      return retVal;

    case INIT_BY_PATH:
      pathArr = pathToArr(path);
      retVal = state.deleteIn(['data'].concat(_toConsumableArray(pathArr)));
      retVal = retVal.deleteIn(['timestamp'].concat(_toConsumableArray(pathArr)));
      retVal = retVal.deleteIn(['requesting'].concat(_toConsumableArray(pathArr)));
      retVal = retVal.deleteIn(['requested'].concat(_toConsumableArray(pathArr)));

    case SET_PROFILE:
      var profile = action.profile;

      return profile !== undefined ? state.setIn(['profile'], (0, _immutable.fromJS)(profile)) : state.deleteIn(['profile']);

    case LOGOUT:
      return (0, _immutable.fromJS)({
        auth: null,
        authError: null,
        profile: null,
        isLoading: false,
        data: {},
        timestamp: {},
        requesting: false,
        requested: false
      });

    case LOGIN:
      return state.setIn(['auth'], (0, _immutable.fromJS)(action.auth)).setIn(['authError'], null);

    case LOGIN_ERROR:
      return state.setIn(['authError'], action.authError).setIn(['auth'], null).setIn(['profile'], null);

    case AUTHENTICATION_INIT_STARTED:
      return initialState.setIn(['isInitializing'], true);
    // return state.setIn(['isInitializing'], true) // throws state.setIn not a function error

    case AUTHENTICATION_INIT_FINISHED:
      return state.setIn(['isInitializing'], false);

    case UNAUTHORIZED_ERROR:
      return state.setIn(['authError'], action.authError);

    default:
      return state;

  }
};

module.exports = exports['default'];