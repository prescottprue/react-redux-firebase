'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promisesForPopulate = exports.populateList = exports.getPopulateChild = exports.getPopulates = exports.getPopulateObjs = exports.getPopulateObj = undefined;

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _set2 = require('lodash/set');

var _set3 = _interopRequireDefault(_set2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _filter2 = require('lodash/filter');

var _filter3 = _interopRequireDefault(_filter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _Promise = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise;

/**
 * @private
 * @description Create standardized populate object from strings or objects
 * @param {String|Object} str - String or Object to standardize into populate object
 */
var getPopulateObj = exports.getPopulateObj = function getPopulateObj(str) {
  if (!(0, _isString3.default)(str)) {
    return str;
  }
  var strArray = str.split(':');
  // TODO: Handle childParam
  return { child: strArray[0], root: strArray[1] };
};
/**
 * @private
 * @description Create standardized populate object from strings or objects
 * @param {String|Object} str - String or Object to standardize into populate object
 */
var getPopulateObjs = exports.getPopulateObjs = function getPopulateObjs(arr) {
  if (!(0, _isArray3.default)(arr)) {
    return arr;
  }
  return arr.map(function (o) {
    return (0, _isObject3.default)(o) ? o : getPopulateObj(o);
  });
};

/**
 * @private
 * @description Get array of populates from list of query params
 * @param {Array} queryParams - Query parameters from which to get populates
 */
var getPopulates = exports.getPopulates = function getPopulates(params) {
  var populates = (0, _filter3.default)(params, function (param) {
    return param.indexOf('populate') !== -1 || (0, _isObject3.default)(param) && param.populates;
  }).map(function (p) {
    return p.split('=')[1];
  });
  // No populates
  if (!populates.length) {
    return null;
  }
  return populates.map(getPopulateObj);
};

/**
 * @private
 * @description Create an array of promises for population of an object or list
 * @param {Object} firebase - Internal firebase object
 * @param {Object} populate - Object containing root to be populate
 * @param {Object} populate.root - Firebase root path from which to load populate item
 * @param {String} id - String id
 */
var getPopulateChild = exports.getPopulateChild = function getPopulateChild(firebase, populate, id) {
  return firebase.database().ref().child(populate.root + '/' + id).once('value').then(function (snap) {
    return (
      // Return id if population value does not exist
      snap.val()
    );
  });
};

/**
 * @private
 * @description Populate list of data
 * @param {Object} firebase - Internal firebase object
 * @param {Object} originalObj - Object to have parameter populated
 * @param {Object} populate - Object containing populate information
 * @param {Object} results - Object containing results of population from other populates
 */
var populateList = exports.populateList = function populateList(firebase, list, p, results) {
  // Handle root not being defined
  if (!results[p.root]) {
    (0, _set3.default)(results, p.root, {});
  }
  return _Promise.all((0, _map3.default)(list, function (id, childKey) {
    // handle list of keys
    var populateKey = id === true ? childKey : id;
    return getPopulateChild(firebase, p, populateKey).then(function (pc) {
      if (pc) {
        // write child to result object under root name if it is found
        return (0, _set3.default)(results, p.root + '.' + populateKey, pc);
      }
      return results;
    });
  }));
};

/**
 * @private
 * @description Create an array of promises for population of an object or list
 * @param {Object} firebase - Internal firebase object
 * @param {Object} originalObj - Object to have parameter populated
 * @param {Object} populateString - String containg population data
 */
var promisesForPopulate = exports.promisesForPopulate = function promisesForPopulate(firebase, originalData, populatesIn) {
  // TODO: Handle selecting of parameter to populate with (i.e. displayName of users/user)
  var promisesArray = [];
  var results = {};
  var populates = getPopulateObjs(populatesIn);
  // Loop over all populates
  (0, _forEach3.default)(populates, function (p) {
    // Data is single parameter
    if ((0, _has3.default)(originalData, p.child)) {
      // Single Parameter is single ID
      if ((0, _isString3.default)(originalData[p.child])) {
        return promisesArray.push(getPopulateChild(firebase, p, originalData[p.child]).then(function (v) {
          // write child to result object under root name if it is found
          if (v) {
            (0, _set3.default)(results, p.root + '.' + originalData[p.child], v);
          }
        }));
      }

      // Single Parameter is list
      return promisesArray.push(populateList(firebase, originalData[p.child], p, results));
    }

    // Data is list, each item has parameter to be populated
    (0, _forEach3.default)(originalData, function (d, key) {
      // Get value of parameter to be populated (key or list of keys)
      var idOrList = (0, _get3.default)(d, p.child);

      // Parameter/child of list item does not exist
      if (!idOrList) {
        return;
      }

      // Parameter of each list item is single ID
      if ((0, _isString3.default)(idOrList)) {
        return promisesArray.push(getPopulateChild(firebase, p, idOrList).then(function (v) {
          // write child to result object under root name if it is found
          if (v) {
            (0, _set3.default)(results, p.root + '.' + idOrList, v);
          }
          return results;
        }));
      }

      // Parameter of each list item is a list of ids
      if ((0, _isArray3.default)(idOrList) || (0, _isObject3.default)(idOrList)) {
        // Create single promise that includes a promise for each child
        return promisesArray.push(populateList(firebase, idOrList, p, results));
      }
    });
  });

  // Return original data after population promises run
  return _Promise.all(promisesArray).then(function () {
    return results;
  });
};

exports.default = { promisesForPopulate: promisesForPopulate };