'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyParamsToQuery = exports.getQueryIdFromPath = exports.unsetWatcher = exports.getWatcherCount = exports.setWatcher = exports.getWatchPath = undefined;

var _constants = require('../constants');

var INIT_BY_PATH = _constants.actionTypes.INIT_BY_PATH;
var getWatchPath = exports.getWatchPath = function getWatchPath(event, path) {
  return event + ':' + (path.substring(0, 1) === '/' ? '' : '/') + path;
};

/**
 * @description Set a new watcher
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} queryId - Id of query
 */
var setWatcher = exports.setWatcher = function setWatcher(firebase, event, path) {
  var queryId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

  var id = queryId || getQueryIdFromPath(path) || getWatchPath(event, path);

  if (firebase._.watchers[id]) {
    firebase._.watchers[id]++;
  } else {
    firebase._.watchers[id] = 1;
  }

  return firebase._.watchers[id];
};

/**
 * @description Get count of currently attached watchers
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} queryId - Id of query
 */
var getWatcherCount = exports.getWatcherCount = function getWatcherCount(firebase, event, path) {
  var queryId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

  var id = queryId || getQueryIdFromPath(path) || getWatchPath(event, path);
  return firebase._.watchers[id];
};

/**
 * @description Remove/Unset a watcher
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} queryId - Id of query
 */
var unsetWatcher = exports.unsetWatcher = function unsetWatcher(firebase, dispatch, event, path) {
  var queryId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

  var id = queryId || getQueryIdFromPath(path) || getWatchPath(event, path);
  path = path.split('#')[0];

  if (firebase._.watchers[id] <= 1) {
    delete firebase._.watchers[id];
    if (event !== 'first_child') {
      firebase.database().ref().child(path).off(event);
      dispatch({
        type: INIT_BY_PATH,
        path: path
      });
    }
  } else if (firebase._.watchers[id]) {
    firebase._.watchers[id]--;
  }
};

/**
 * @description Get query id from query path
 * @param {String} path - Path from which to get query id
 */
var getQueryIdFromPath = exports.getQueryIdFromPath = function getQueryIdFromPath(path) {
  var origPath = path;
  var pathSplitted = path.split('#');
  path = pathSplitted[0];

  var isQuery = pathSplitted.length > 1;
  var queryParams = isQuery ? pathSplitted[1].split('&') : [];
  var queryId = isQuery ? queryParams.map(function (param) {
    var splittedParam = param.split('=');
    if (splittedParam[0] === 'queryId') {
      return splittedParam[1];
    }
  }).filter(function (q) {
    return q;
  }) : undefined;
  return queryId && queryId.length > 0 ? queryId[0] : isQuery ? origPath : undefined;
};

/**
 * @description Modify query to include methods based on query parameters (such as orderByChild)
 * @param {Array} queryParams - Array of query parameters to apply to query
 * @param {Object} query - Query object on which to apply query parameters
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