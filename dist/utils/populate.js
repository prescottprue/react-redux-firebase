'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promisesForPopulate = exports.getPopulateChild = exports.getPopulates = exports.getPopulateObj = undefined;

var _set2 = require('lodash/set');

var _set3 = _interopRequireDefault(_set2);

var _reduce2 = require('lodash/reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @description Create standardized populate object from strings or objects
 * @param {String|Object} str - String or Object to standardize into populate object
 */
var getPopulateObj = exports.getPopulateObj = function getPopulateObj(str) {
  var strArray = str.split(':');
  return { child: strArray[0], root: strArray[1] };
};

/**
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
      snap.val() || id
    );
  });
};

/**
 * @description Create an array of promises for population of an object or list
 * @param {Object} firebase - Internal firebase object
 * @param {Object} originalObj - Object to have parameter populated
 * @param {Object} populateString - String containg population data
 */
var promisesForPopulate = exports.promisesForPopulate = function promisesForPopulate(firebase, originalData, populates) {
  // TODO: Handle selecting of parameter to populate with (i.e. displayName of users/user)
  var promisesArray = [];
  // Loop over all populates
  (0, _forEach3.default)(populates, function (p) {
    return (
      // Loop over each object in list
      (0, _forEach3.default)(originalData, function (d, key) {
        // Handle input of [] within child (notating parameter for whole list)
        var mainChild = p.child.split('[]')[0];
        var childParam = p.child.split('[]')[1];

        // Get value of parameter to be populated (key or list of keys)
        var idOrList = (0, _get3.default)(d, mainChild);

        // Parameter/child to be populated does not exist
        if (!idOrList) {
          return;
        }

        // Parameter is single ID
        if ((0, _isString3.default)(idOrList)) {
          return promisesArray.push(getPopulateChild(firebase, p, idOrList).then(function (v) {
            return (
              // replace parameter with loaded object
              (0, _set3.default)(originalData, key + '.' + p.child, v)
            );
          }));
        }

        // Parameter is a list of ids
        if ((0, _isArray3.default)(idOrList) || (0, _isObject3.default)(idOrList)) {
          // Create single promise that includes a promise for each child
          return promisesArray.push(Promise.all((0, _map3.default)(idOrList, function (id, childKey) {
            return getPopulateChild(firebase, p, childParam ? (0, _get3.default)(id, childParam) : id // get child parameter if [] notation
            ).then(function (pc) {
              return !childParam ? pc : _defineProperty({}, childKey, (0, _set3.default)(id, childParam, Object.assign(pc, { key: (0, _get3.default)(id, childParam) })));
            });
          }))
          // replace parameter with populated list
          .then(function (v) {
            // reduce array of arrays if childParam exists
            var vObj = childParam ? (0, _reduce3.default)(v, function (a, b) {
              return Object.assign(a, b);
            }, {}) : v;
            return (0, _set3.default)(originalData, key + '.' + mainChild, vObj);
          }));
        }
      })
    );
  });

  // Return original data after population promises run
  return Promise.all(promisesArray).then(function (d) {
    return originalData;
  });
};

exports.default = { promisesForPopulate: promisesForPopulate };