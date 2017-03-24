'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unWatchEvents = exports.watchEvents = exports.unWatchEvent = exports.watchEvent = undefined;

var _size2 = require('lodash/size');

var _size3 = _interopRequireDefault(_size2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('../constants');

var _populate = require('../utils/populate');

var _query = require('../utils/query');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var START = _constants.actionTypes.START,
    SET = _constants.actionTypes.SET,
    NO_VALUE = _constants.actionTypes.NO_VALUE,
    UNAUTHORIZED_ERROR = _constants.actionTypes.UNAUTHORIZED_ERROR,
    ERROR = _constants.actionTypes.ERROR;

/**
 * @description Watch a specific event type
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} options - Event options object
 * @param {String} options.event - Type of event to watch for (defaults to value)
 * @param {String} options.path - Path to watch with watcher
 * @param {String} options.storeAs - Location within redux to store value
 */

var watchEvent = exports.watchEvent = function watchEvent(firebase, dispatch, _ref) {
  var type = _ref.type,
      path = _ref.path,
      populates = _ref.populates,
      queryParams = _ref.queryParams,
      queryId = _ref.queryId,
      isQuery = _ref.isQuery,
      storeAs = _ref.storeAs;

  var watchPath = !storeAs ? path : path + '@' + storeAs;
  var counter = (0, _query.getWatcherCount)(firebase, type, watchPath, queryId);
  queryId = queryId || (0, _query.getQueryIdFromPath)(path);

  if (counter > 0) {
    if (queryId) {
      (0, _query.unsetWatcher)(firebase, dispatch, type, path, queryId);
    } else {
      return;
    }
  }

  (0, _query.setWatcher)(firebase, type, watchPath, queryId);

  if (type === 'first_child') {
    return firebase.database().ref().child(path).orderByKey().limitToFirst(1).once('value', function (snapshot) {
      if (snapshot.val() === null) {
        dispatch({
          type: NO_VALUE,
          timestamp: Date.now(),
          requesting: false,
          requested: true,
          path: storeAs || path
        });
      }
      return snapshot;
    }, function (err) {
      // TODO: Handle catching unauthorized error
      // dispatch({
      //   type: UNAUTHORIZED_ERROR,
      //   payload: err
      // })
      dispatch({
        type: ERROR,
        payload: err
      });
    });
  }

  var query = firebase.database().ref().child(path);

  if (isQuery) {
    query = (0, _query.applyParamsToQuery)(queryParams, query);
  }

  var runQuery = function runQuery(q, e, p, params) {
    dispatch({
      type: START,
      timestamp: Date.now(),
      requesting: true,
      requested: false,
      path: storeAs || path
    });

    // Handle once queries
    if (e === 'once') {
      return q.once('value').then(function (snapshot) {
        if (snapshot.val() !== null) {
          dispatch({
            type: SET,
            path: storeAs || path,
            data: snapshot.val()
          });
        }
        return snapshot;
      }, function (err) {
        dispatch({
          type: UNAUTHORIZED_ERROR,
          payload: err
        });
      });
    }
    // Handle all other queries

    /* istanbul ignore next: is run by tests but doesn't show in coverage */
    q.on(e, function (snapshot) {
      var data = e === 'child_removed' ? undefined : snapshot.val();
      var resultPath = storeAs || e === 'value' ? p : p + '/' + snapshot.key;

      // Dispatch standard event if no populates exists
      if (!populates) {
        var ordered = [];
        // preserve order of children under ordered
        if (e === 'child_added') {
          ordered.push(_extends({ key: snapshot.key }, snapshot.val()));
        } else {
          snapshot.forEach(function (child) {
            ordered.push(_extends({ key: child.key }, child.val()));
          });
        }

        return dispatch({
          type: SET,
          path: storeAs || resultPath,
          ordered: (0, _size3.default)(ordered) ? ordered : undefined,
          data: data,
          timestamp: Date.now(),
          requesting: false,
          requested: true
        });
      }

      // TODO: Allow setting of unpopulated data before starting population through config
      // TODO: Set ordered for populate queries
      // TODO: Allow config to toggle Combining into one SET action
      (0, _populate.promisesForPopulate)(firebase, data, populates).then(function (results) {
        dispatch({
          type: SET,
          path: resultPath,
          data: data,
          timestamp: Date.now(),
          requesting: false,
          requested: true
        });
        (0, _forEach3.default)(results, function (result, path) {
          dispatch({
            type: SET,
            path: path,
            data: result,
            timestamp: Date.now(),
            requesting: false,
            requested: true
          });
        });
      });
    }, function (err) {
      dispatch({
        type: UNAUTHORIZED_ERROR,
        payload: err
      });
    });
  };

  return runQuery(query, type, path, queryParams);
};

/**
 * @description Remove watcher from an event
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Event for which to remove the watcher
 * @param {String} path - Path of watcher to remove
 */
var unWatchEvent = exports.unWatchEvent = function unWatchEvent(firebase, dispatch, event, path) {
  var queryId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
  return (0, _query.unsetWatcher)(firebase, dispatch, event, path, queryId);
};

/**
 * @description Add watchers to a list of events
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {Array} events - List of events for which to add watchers
 */
var watchEvents = exports.watchEvents = function watchEvents(firebase, dispatch, events) {
  return events.forEach(function (event) {
    return watchEvent(firebase, dispatch, event);
  });
};

/**
 * @description Remove watchers from a list of events
 * @param {Object} firebase - Internal firebase object
 * @param {Array} events - List of events for which to remove watchers
 */
var unWatchEvents = exports.unWatchEvents = function unWatchEvents(firebase, dispatch, events) {
  return events.forEach(function (event) {
    return unWatchEvent(firebase, dispatch, event.type, event.path);
  });
};

exports.default = { watchEvents: watchEvents, unWatchEvents: unWatchEvents };