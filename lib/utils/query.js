'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyParamsToQuery = exports.unsetWatcher = exports.getWatcherCount = exports.setWatcher = exports.getQueryIdFromPath = exports.getWatchPath = undefined;

var _constants = require('../constants');

var UNSET_LISTENER = _constants.actionTypes.UNSET_LISTENER;

/**
 * @private
 * @description Get path to watch
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @return {String} watchPath
 */

var getWatchPath = exports.getWatchPath = function getWatchPath(event, path) {
  if (!event || event === '' || !path) {
    throw new Error('Event and path are required');
  }
  return event + ':' + (path.substring(0, 1) === '/' ? '' : '/') + path;
};

/**
 * @private
 * @description Get query id from query path
 * @param {String} path - Path from which to get query id
 * @param {String} event - Type of query event
 */
var getQueryIdFromPath = exports.getQueryIdFromPath = function getQueryIdFromPath(path) {
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  var origPath = path;
  var pathSplitted = path.split('#');
  path = pathSplitted[0];

  var isQuery = pathSplitted.length > 1;
  var queryParams = isQuery ? pathSplitted[1].split('&') : [];
  var queryId = isQuery ? queryParams.map(function (param) {
    var splittedParam = param.split('=');
    // Handle query id in path
    if (splittedParam[0] === 'queryId') {
      return splittedParam[1];
    }
  }).filter(function (q) {
    return q;
  }) : undefined;
  return queryId && queryId.length > 0 ? event ? event + ':/' + queryId : queryId[0] : isQuery ? origPath : undefined;
};

/**
 * @private
 * @description Update the number of watchers for a query
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} queryId - Id of query
 * @return {Integer} watcherCount - count
 */
var setWatcher = exports.setWatcher = function setWatcher(firebase, event, path) {
  var queryId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

  var id = queryId || getQueryIdFromPath(path, event) || getWatchPath(event, path);

  if (firebase._.watchers[id]) {
    firebase._.watchers[id]++;
  } else {
    firebase._.watchers[id] = 1;
  }

  return firebase._.watchers[id];
};

/**
 * @private
 * @description Get count of currently attached watchers
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} queryId - Id of query
 * @return {Number} watcherCount
 */
var getWatcherCount = exports.getWatcherCount = function getWatcherCount(firebase, event, path) {
  var queryId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

  var id = queryId || getQueryIdFromPath(path, event) || getWatchPath(event, path);
  return firebase._.watchers[id];
};

/**
 * @private
 * @description Remove/Unset a watcher
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} queryId - Id of query
 */
var unsetWatcher = exports.unsetWatcher = function unsetWatcher(firebase, dispatch, event, path) {
  var queryId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

  var id = queryId || getQueryIdFromPath(path, event) || getWatchPath(event, path);
  path = path.split('#')[0];
  if (firebase._.watchers[id] <= 1) {
    delete firebase._.watchers[id];
    if (event !== 'first_child' && event !== 'once') {
      firebase.database().ref().child(path).off(event);
      if (firebase._.config.distpatchOnUnsetListener) {
        dispatch({ type: UNSET_LISTENER, path: path });
      }
    }
  } else if (firebase._.watchers[id]) {
    firebase._.watchers[id]--;
  }
};

/**
 * @description Modify query to include methods based on query parameters (such as orderByChild)
 * @param {Array} queryParams - Array of query parameters to apply to query
 * @param {Object} query - Query object on which to apply query parameters
 * @return {FirebaseQuery}
 */
var applyParamsToQuery = exports.applyParamsToQuery = function applyParamsToQuery(queryParams, query) {
  var doNotParse = false;
  if (queryParams) {
    queryParams.forEach(function (param) {
      param = param.split('=');
      switch (param[0]) {
        case 'orderByValue':
          query = query.orderByValue();
          doNotParse = true;
          break;
        case 'orderByPriority':
          query = query.orderByPriority();
          doNotParse = true;
          break;
        case 'orderByKey':
          query = query.orderByKey();
          doNotParse = true;
          break;
        case 'orderByChild':
          query = query.orderByChild(param[1]);
          break;
        case 'limitToFirst':
          // TODO: Handle number not being passed as param
          query = query.limitToFirst(parseInt(param[1], 10));
          break;
        case 'limitToLast':
          // TODO: Handle number not being passed as param
          query = query.limitToLast(parseInt(param[1], 10));
          break;
        case 'equalTo':
          var equalToParam = !doNotParse ? parseInt(param[1], 10) || param[1] : param[1];
          equalToParam = equalToParam === 'null' ? null : equalToParam;
          equalToParam = equalToParam === 'false' ? false : equalToParam;
          equalToParam = equalToParam === 'true' ? true : equalToParam;
          query = param.length === 3 ? query.equalTo(equalToParam, param[2]) : query.equalTo(equalToParam);
          break;
        case 'startAt':
          var startAtParam = !doNotParse ? parseInt(param[1], 10) || param[1] : param[1];
          startAtParam = startAtParam === 'null' ? null : startAtParam;
          query = param.length === 3 ? query.startAt(startAtParam, param[2]) : query.startAt(startAtParam);
          break;
        case 'endAt':
          var endAtParam = !doNotParse ? parseInt(param[1], 10) || param[1] : param[1];
          endAtParam = endAtParam === 'null' ? null : endAtParam;
          query = param.length === 3 ? query.endAt(endAtParam, param[2]) : query.endAt(endAtParam);
          break;
      }
    });
  }

  return query;
};