'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dropRight2 = require('lodash/dropRight');

var _dropRight3 = _interopRequireDefault(_dropRight2);

var _immutable = require('immutable');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var START = _constants.actionTypes.START,
    SET = _constants.actionTypes.SET,
    SET_PROFILE = _constants.actionTypes.SET_PROFILE,
    LOGIN = _constants.actionTypes.LOGIN,
    LOGOUT = _constants.actionTypes.LOGOUT,
    LOGIN_ERROR = _constants.actionTypes.LOGIN_ERROR,
    NO_VALUE = _constants.actionTypes.NO_VALUE,
    UNSET_LISTENER = _constants.actionTypes.UNSET_LISTENER,
    AUTHENTICATION_INIT_STARTED = _constants.actionTypes.AUTHENTICATION_INIT_STARTED,
    AUTHENTICATION_INIT_FINISHED = _constants.actionTypes.AUTHENTICATION_INIT_FINISHED,
    UNAUTHORIZED_ERROR = _constants.actionTypes.UNAUTHORIZED_ERROR;


var emptyState = {
  auth: undefined,
  authError: undefined,
  profile: undefined,
  isInitializing: undefined,
  data: {},
  timestamp: {},
  requesting: {},
  requested: {}
};

var initialState = (0, _immutable.fromJS)(emptyState);

var pathToArr = function pathToArr(path) {
  return path ? path.split(/\//).filter(function (p) {
    return !!p;
  }) : [];
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
 * @return {Map} Redux State.
 */

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var path = action.path,
      timestamp = action.timestamp,
      requesting = action.requesting,
      requested = action.requested;

  var pathArr = void 0;
  var retVal = void 0;

  switch (action.type) {

    case START:
      pathArr = pathToArr(path);
      retVal = requesting !== undefined ? state.setIn(['requesting', pathArr.join(_constants.paramSplitChar)], (0, _immutable.fromJS)(requesting)) : state.deleteIn(['requesting', pathArr.join(_constants.paramSplitChar)]);

      retVal = requested !== undefined ? retVal.setIn(['requested', pathArr.join(_constants.paramSplitChar)], (0, _immutable.fromJS)(requested)) : retVal.deleteIn(['requested', pathArr.join(_constants.paramSplitChar)]);

      return retVal;

    case SET:
      var data = action.data,
          ordered = action.ordered;

      pathArr = pathToArr(path);

      // Handle invalid keyPath error caused by deep setting to a null value
      if (data !== undefined && state.getIn(['data'].concat(_toConsumableArray(pathArr))) === null) {
        retVal = state.deleteIn(['data'].concat(_toConsumableArray(pathArr)));
      } else if (state.getIn((0, _dropRight3.default)(['data'].concat(_toConsumableArray(pathArr)))) === null) {
        retVal = state.deleteIn((0, _dropRight3.default)(['data'].concat(_toConsumableArray(pathArr))));
      } else {
        retVal = state; // start with state
      }

      retVal = data !== undefined ? retVal.setIn(['data'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)(data)) : retVal.deleteIn(['data'].concat(_toConsumableArray(pathArr)));

      retVal = ordered !== undefined ? retVal.setIn(['ordered'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)(ordered)) : retVal.deleteIn(['ordered'].concat(_toConsumableArray(pathArr)));

      retVal = timestamp !== undefined ? retVal.setIn(['timestamp', pathArr.join(_constants.paramSplitChar)], (0, _immutable.fromJS)(timestamp)) : retVal.deleteIn(['timestamp', pathArr.join(_constants.paramSplitChar)]);

      retVal = requesting !== undefined ? retVal.setIn(['requesting', pathArr.join(_constants.paramSplitChar)], (0, _immutable.fromJS)(requesting)) : retVal.deleteIn(['requesting', pathArr.join(_constants.paramSplitChar)]);

      retVal = requested !== undefined ? retVal.setIn(['requested', pathArr.join(_constants.paramSplitChar)], (0, _immutable.fromJS)(requested)) : retVal.deleteIn(['requested', pathArr.join(_constants.paramSplitChar)]);

      return retVal;

    case NO_VALUE:
      pathArr = pathToArr(path);
      retVal = state.setIn(['data'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)({}));

      retVal = timestamp !== undefined ? retVal.setIn(['timestamp', pathArr.join(_constants.paramSplitChar)], (0, _immutable.fromJS)(timestamp)) : retVal.deleteIn(['timestamp', pathArr.join(_constants.paramSplitChar)]);

      retVal = requesting !== undefined ? retVal.setIn(['requesting', pathArr.join(_constants.paramSplitChar)], (0, _immutable.fromJS)(requesting)) : retVal.deleteIn(['requesting', pathArr.join(_constants.paramSplitChar)]);

      retVal = requested !== undefined ? retVal.setIn(['requested', pathArr.join(_constants.paramSplitChar)], (0, _immutable.fromJS)(requested)) : retVal.deleteIn(['requested', pathArr.join(_constants.paramSplitChar)]);

      return retVal;

    case UNSET_LISTENER:
      pathArr = pathToArr(path);
      retVal = state.deleteIn(['data'].concat(_toConsumableArray(pathArr)));
      retVal = retVal.deleteIn(['timestamp', pathArr.join(_constants.paramSplitChar)]);
      retVal = retVal.deleteIn(['requesting', pathArr.join(_constants.paramSplitChar)]);
      retVal = retVal.deleteIn(['requested', pathArr.join(_constants.paramSplitChar)]);

      return retVal;

    case SET_PROFILE:
      return action.profile !== undefined ? state.setIn(['profile'], (0, _immutable.fromJS)(action.profile)) : state.deleteIn(['profile']);

    case LOGOUT:
      return (0, _immutable.fromJS)({
        auth: null,
        authError: null,
        profile: null,
        isInitializing: false,
        data: {}
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