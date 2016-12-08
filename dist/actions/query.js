'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unWatchEvents = exports.watchEvents = exports.unWatchEvent = exports.watchEvent = undefined;

var _constants = require('../constants');

var _populate = require('../utils/populate');

var _query = require('../utils/query');

var START = _constants.actionTypes.START,
    SET = _constants.actionTypes.SET,
    NO_VALUE = _constants.actionTypes.NO_VALUE,
    ERROR = _constants.actionTypes.ERROR;

/**
 * @description Watch a specific event type
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {String} event - Type of event to watch for (defaults to value)
 * @param {String} path - Path to watch with watcher
 * @param {String} dest
 */

var watchEvent = exports.watchEvent = function watchEvent(firebase, dispatch, _ref, dest) {
  var type = _ref.type,
      path = _ref.path,
      populates = _ref.populates,
      queryParams = _ref.queryParams,
      queryId = _ref.queryId,
      isQuery = _ref.isQuery;

  var watchPath = !dest ? path : path + '@' + dest;
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
          path: path
        });
      }
      return snapshot;
    }, function (err) {
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
      path: path
    });

    // Handle once queries
    if (e === 'once') {
      return q.once('value').then(function (snapshot) {
        if (snapshot.val() !== null) {
          dispatch({
            type: SET,
            path: path,
            data: snapshot.val()
          });
        }
        return snapshot;
      }, function (err) {
        dispatch({
          type: ERROR,
          payload: err
        });
      });
    }
    // Handle all other queries

    /* istanbul ignore next: is run by tests but doesn't show in coverage */
    q.on(e, function (snapshot) {
      var data = e === 'child_removed' ? undefined : snapshot.val();
      var resultPath = dest || e === 'value' ? p : p + '/' + snapshot.key;
      var rootPath = dest || path;

      if (dest && e !== 'child_removed') {
        data = {
          _id: snapshot.key,
          val: snapshot.val()
        };
      }

      // Dispatch standard event if no populates exists
      if (!populates) {
        return dispatch({
          type: SET,
          path: resultPath,
          rootPath: rootPath,
          data: data,
          timestamp: Date.now(),
          requesting: false,
          requested: true
        });
      }

      // TODO: Allow setting of unpopulated data before starting population through config

      (0, _populate.promisesForPopulate)(firebase, data, populates).then(function (list) {
        dispatch({
          type: SET,
          path: resultPath,
          rootPath: rootPath,
          timestamp: Date.now(),
          requesting: false,
          requested: true,
          data: list
        });
      });
    }, function (err) {
      dispatch({
        type: ERROR,
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