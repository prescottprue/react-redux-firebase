'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEventsFromInput = exports.pathStrToObj = undefined;

var _remove2 = require('lodash/remove');

var _remove3 = _interopRequireDefault(_remove2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _flatMap2 = require('lodash/flatMap');

var _flatMap3 = _interopRequireDefault(_flatMap2);

var _populate = require('./populate');

var _query = require('./query');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Convert path string to object with queryParams, path, and populates
 * @param {String} path - Path that can contain query parameters and populates
 * @return {Object} watchEvents - Array of watch events
 */
var pathStrToObj = exports.pathStrToObj = function pathStrToObj(path) {
  var pathObj = { path: path, type: 'value', isQuery: false };
  var queryId = (0, _query.getQueryIdFromPath)(path);
  // If Query id exists split params from path
  if (queryId) {
    var pathArray = path.split('#');
    pathObj = Object.assign({}, pathObj, {
      queryId: queryId,
      isQuery: true,
      path: pathArray[0],
      queryParams: pathArray[1].split('&')
    });
    if ((0, _populate.getPopulates)(pathArray[1].split('&'))) {
      pathObj.populates = (0, _populate.getPopulates)(pathArray[1].split('&'));
      pathObj.queryParams = (0, _remove3.default)(pathArray[1].split('&'), function (p) {
        return p.indexOf('populate') === -1;
      });
    }
  }
  // if queryId does not exist, return original pathObj
  return pathObj;
};

/**
 * @description Convert watch path definition array to watch events
 * @param {Array} paths - Array of path strings, objects, and arrays to watch
 * @return {Array} watchEvents - Array of watch events
 */
var getEventsFromInput = exports.getEventsFromInput = function getEventsFromInput(paths) {
  return (0, _flatMap3.default)(paths, function (path) {
    if ((0, _isString3.default)(path)) {
      return [pathStrToObj(path)];
    }

    if ((0, _isArray3.default)(path)) {
      // TODO: Handle input other than array with string
      // TODO: Handle populates within array
      return [{ type: 'first_child', path: path[0] }, { type: 'child_added', path: path[0] }, { type: 'child_removed', path: path[0] }, { type: 'child_moved', path: path[0] }, { type: 'child_changed', path: path[0] }];
    }

    if ((0, _isObject3.default)(path)) {
      if (!path.path) {
        throw new Error('Path is a required parameter within definition object');
      }
      var strPath = path.path;

      if (path.queryParams) {
        // append query params to path for queryId added in pathStrToObj
        strPath = strPath + '#' + path.queryParams.join('&');
      }

      // Add all parameters that are missing (ones that exist will remain)
      path = Object.assign({}, pathStrToObj(strPath), path);
      return [path];
    }

    throw new Error('Invalid Path Definition: ' + path + '. Only strings, objects, and arrays accepted.');
  });
};

exports.default = { getEventsFromInput: getEventsFromInput };