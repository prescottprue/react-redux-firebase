'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customToJS = exports.populatedDataToJS = exports.buildChildList = exports.orderedToJS = exports.dataToJS = exports.pathToJS = exports.toJS = exports.fixPath = exports.isEmpty = exports.isLoaded = undefined;

var _defaultsDeep2 = require('lodash/defaultsDeep');

var _defaultsDeep3 = _interopRequireDefault(_defaultsDeep2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _reduce2 = require('lodash/reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _mapValues2 = require('lodash/mapValues');

var _mapValues3 = _interopRequireDefault(_mapValues2);

var _drop2 = require('lodash/drop');

var _drop3 = _interopRequireDefault(_drop2);

var _first2 = require('lodash/first');

var _first3 = _interopRequireDefault(_first2);

var _some2 = require('lodash/some');

var _some3 = _interopRequireDefault(_some2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _size2 = require('lodash/size');

var _size3 = _interopRequireDefault(_size2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _populate = require('./utils/populate');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @description Detect whether items are loaded yet or not
 * @param {Object} item - Item to check loaded status of. A comma seperated list is also acceptable.
 * @return {Boolean} Whether or not item is loaded
 * @example
 * import React, { Component, PropTypes } from 'react'
 * import { connect } from 'react-redux'
 * import { firebaseConnect, isLoaded, dataToJS } from 'react-redux-firebase'
 *
 * @firebaseConnect(['/todos'])
 * @connect(
 *   ({ firebase }) => ({
 *     todos: dataToJS(firebase, '/todos'),
 *   })
 * )
 * class Todos extends Component {
 *   static propTypes = {
 *     todos: PropTypes.object
 *   }
 *
 *   render() {
 *     const { todos } = this.props;
 *
 *     // Show loading while todos are loading
 *     if(!isLoaded(todos)) {
 *        return <span>Loading...</span>
 *     }
 *
 *     return <ul>{todosList}</ul>
 *   }
 * }
 */
var isLoaded = exports.isLoaded = function isLoaded() {
  if (!arguments || !arguments.length) {
    return true;
  }

  return (0, _map3.default)(arguments, function (a) {
    return a !== undefined;
  }).reduce(function (a, b) {
    return a && b;
  });
};

/**
 * @description Detect whether items are empty or not
 * @param {Object} item - Item to check loaded status of. A comma seperated list is also acceptable.
 * @return {Boolean} Whether or not item is empty
 * @example
 * import React, { Component, PropTypes } from 'react'
 * import { connect } from 'react-redux'
 * import { firebaseConnect, isEmpty, dataToJS } from 'react-redux-firebase'
 *
 * @firebaseConnect(['/todos'])
 * @connect(
 *   ({ firebase }) => ({
 *     todos: dataToJS(firebase, '/todos'),
 *   })
 * )
 * class Todos extends Component {
 *   static propTypes = {
 *     todos: PropTypes.object
 *   }
 *
 *   render() {
 *     const { todos } = this.props;
 *
 *     // Message for if todos are empty
 *     if(isEmpty(todos)) {
 *        return <span>No Todos Found</span>
 *     }
 *
 *     return <ul>{todosList}</ul>
 *   }
 * }
 */
var isEmpty = exports.isEmpty = function isEmpty(data) {
  return !(data && (0, _size3.default)(data));
};

/**
 * @description Fix path by adding "/" to path if needed
 * @param {String} path - Path string to fix
 * @return {String} - Fixed path
 * @private
 */
var fixPath = exports.fixPath = function fixPath(path) {
  return (path.substring(0, 1) === '/' ? '' : '/') + path;
};

/**
 * @description Convert Immutable Map to a Javascript object
 * @param {Object} data - Immutable Map to be converted to JS object (state.firebase)
 * @return {Object} data - Javascript version of Immutable Map
 * @return {Object} Data located at path within Immutable Map
 */
var toJS = exports.toJS = function toJS(data) {
  return data && data.toJS ? data.toJS() : data;
};

/**
 * @description Convert parameter from Immutable Map to a Javascript object
 * @param {Map} firebase - Immutable Map to be converted to JS object (state.firebase)
 * @param {String} path - Path from state.firebase to convert to JS object
 * @param {Object|String|Boolean} notSetValue - Value to use if data is not available
 * @return {Object} Data located at path within Immutable Map
 * @example <caption>Basic</caption>
 * import { connect } from 'react-redux'
 * import { firebaseConnect, pathToJS } from 'react-redux-firebase'
 *
 * @firebaseConnect()
 * @connect(({ firebase }) => ({
 *   profile: pathToJS(firebase, 'profile'),
 *   auth: pathToJS(firebase, 'auth')
 * })
 * export default class MyComponent extends Component {
 * ...
 */
var pathToJS = exports.pathToJS = function pathToJS(data, path, notSetValue) {
  if (!data) {
    return notSetValue;
  }
  var pathArr = fixPath(path).split(/\//).slice(1);

  if (data.getIn) {
    // Handle meta params (stored by string key)
    if ((0, _some3.default)(_constants.metaParams, function (v) {
      return pathArr.indexOf(v) !== -1;
    })) {
      return toJS(data.getIn([(0, _first3.default)(pathArr), (0, _drop3.default)(pathArr).join(_constants.paramSplitChar)], notSetValue));
    }
    return toJS(data.getIn(pathArr, notSetValue));
  }

  return data;
};

/**
 * @description Convert parameter under "data" path of Immutable Map to a Javascript object.
 * **NOTE:** Setting a default value will cause `isLoaded` to always return true
 * @param {Map} firebase - Immutable Map to be converted to JS object (state.firebase)
 * @param {String} path - Path of parameter to load
 * @param {Object|String|Boolean} notSetValue - Value to return if value is not
 * found in redux. This will cause `isLoaded` to always return true (since
 * value is set from the start).
 * @return {Object} Data located at path within Immutable Map
 * @example <caption>Basic</caption>
 * import { connect } from 'react-redux'
 * import { firebaseConnect, dataToJS } from 'react-redux-firebase'
 *
 * @firebaseConnect(['/todos'])
 * @connect(({ firebase }) => ({
 *   // this.props.todos loaded from state.firebase.data.todos
 *   todos: dataToJS(firebase, 'todos')
 * })
 * @example <caption>Default Value</caption>
 * import { connect } from 'react-redux'
 * import { firebaseConnect, dataToJS } from 'react-redux-firebase'
 * const defaultValue = {
 *  1: {
 *    text: 'Example Todo'
 *  }
 * }
 * @firebaseConnect(['/todos'])
 * @connect(({ firebase }) => ({
 *   // this.props.todos loaded from state.firebase.data.todos
 *   todos: dataToJS(firebase, 'todos', defaultValue)
 * })
 */
var dataToJS = exports.dataToJS = function dataToJS(data, path, notSetValue) {
  if (!data) {
    return notSetValue;
  }

  var pathArr = ('/data' + fixPath(path)).split(/\//).slice(1);

  if (data.getIn) {
    return toJS(data.getIn(pathArr, notSetValue));
  }

  return data;
};

/**
 * @description Convert parameter under "ordered" path of Immutable Map to a
 * Javascript array. This preserves order set by query.
 * @param {Map} firebase - Immutable Map to be converted to JS object (state.firebase)
 * @param {String} path - Path of parameter to load
 * @param {Object|String|Boolean} notSetValue - Value to return if value is not found
 * @return {Object} Data located at path within Immutable Map
 * @example <caption>Basic</caption>
 * import { connect } from 'react-redux'
 * import { firebaseConnect, orderedToJS } from 'react-redux-firebase'
 *
 * @firebaseConnect([
 *   {
 *     path: 'todos',
 *     queryParams: ['orderByChild=text'] // order alphabetically based on text
 *   },
 * ])
 * @connect(({ firebase }) => ({
 *   // this.props.todos loaded from state.firebase.ordered.todos
 *   todos: orderedToJS(firebase, 'todos')
 * })
 */
var orderedToJS = exports.orderedToJS = function orderedToJS(data, path, notSetValue) {
  if (!data) {
    return notSetValue;
  }

  var pathArr = ('/ordered' + fixPath(path)).split(/\//).slice(1);

  if (data.getIn) {
    return toJS(data.getIn(pathArr, notSetValue));
  }

  return data;
};

/**
 * @private
 * @description Build child list based on populate
 * @param {Map} data - Immutable Map to be converted to JS object (state.firebase)
 * @param {Object} list - Path of parameter to load
 * @param {Object} populate - Object with population settings
 */
var buildChildList = exports.buildChildList = function buildChildList(data, list, p) {
  return (0, _mapValues3.default)(list, function (val, key) {
    var getKey = val;
    // Handle key: true lists
    if (val === true) {
      getKey = key;
    }
    var pathString = p.childParam ? p.root + '/' + getKey + '/' + p.childParam : p.root + '/' + getKey;
    // Set to child under key if populate child exists
    if (dataToJS(data, pathString)) {
      return p.keyProp ? _extends(_defineProperty({}, p.keyProp, getKey), dataToJS(data, pathString)) : dataToJS(data, pathString);
    }
    // Populate child does not exist
    return val === true ? val : getKey;
  });
};

/**
 * @description Convert parameter under "data" path of Immutable Map to a
 * Javascript object with parameters populated based on populates array
 * @param {Map} firebase - Immutable Map to be converted to JS object (state.firebase)
 * @param {String} path - Path of parameter to load
 * @param {Array} populates - Array of populate objects
 * @param {Object|String|Boolean} notSetValue - Value to return if value is not found
 * @return {Object} Data located at path within Immutable Map
 * @example <caption>Basic</caption>
 * import { connect } from 'react-redux'
 * import { firebaseConnect, helpers } from 'react-redux-firebase'
 * const { dataToJS } = helpers
 * const populates = [{ child: 'owner', root: 'users' }]
 *
 * const fbWrapped = firebaseConnect([
 *   { path: '/todos', populates } // load "todos" and matching "users" to redux
 * ])(App)
 *
 * export default connect(({ firebase }) => ({
 *   // this.props.todos loaded from state.firebase.data.todos
 *   // each todo has child 'owner' populated from matching uid in 'users' root
 *   // for loading un-populated todos use dataToJS(firebase, 'todos')
 *   todos: populatedDataToJS(firebase, 'todos', populates),
 * }))(fbWrapped)
 */
var populatedDataToJS = exports.populatedDataToJS = function populatedDataToJS(data, path, populates, notSetValue) {
  if (!data) {
    return notSetValue;
  }
  // Handle undefined child
  if (!dataToJS(data, path, notSetValue)) {
    return dataToJS(data, path, notSetValue);
  }
  var populateObjs = (0, _populate.getPopulateObjs)(populates);
  // reduce array of populates to object of combined populated data
  return (0, _reduce3.default)((0, _map3.default)(populateObjs, function (p, obj) {
    // single item with iterable child
    if (dataToJS(data, path)[p.child]) {
      // populate child is key
      if ((0, _isString3.default)(dataToJS(data, path)[p.child])) {
        var key = dataToJS(data, path)[p.child];
        var pathString = p.childParam ? p.root + '/' + key + '/' + p.childParam : p.root + '/' + key;
        if (dataToJS(data, pathString)) {
          return _defineProperty({}, p.child, p.keyProp ? _extends(_defineProperty({}, p.keyProp, key), dataToJS(data, pathString)) : dataToJS(data, pathString));
        }

        // matching child does not exist
        return dataToJS(data, path);
      }

      return _defineProperty({}, p.child, buildChildList(data, dataToJS(data, path)[p.child], p));
    }
    // list with child param in each item
    return (0, _mapValues3.default)(dataToJS(data, path), function (child, i) {
      // no matching child parameter
      if (!child || !child[p.child]) {
        return child;
      }
      // populate child is key
      if ((0, _isString3.default)(child[p.child])) {
        var _key = child[p.child];
        var _pathString = p.childParam ? p.root + '/' + _key + '/' + p.childParam : p.root + '/' + _key;
        if (dataToJS(data, _pathString)) {
          return _defineProperty({}, p.child, p.keyProp ? _extends(_defineProperty({}, p.keyProp, _key), dataToJS(data, _pathString)) : dataToJS(data, _pathString));
        }
        // matching child does not exist
        return child;
      }
      // populate child list
      return _defineProperty({}, p.child, buildChildList(data, child[p.child], p));
    });
  }),
  // combine data from all populates to one object starting with original data
  function (obj, v) {
    return (0, _defaultsDeep3.default)(v, obj);
  }, dataToJS(data, path));
};

/**
 * @description Load custom object from within store
 * @param {Map} firebase - Immutable Map to be converted to JS object (state.firebase)
 * @param {String} path - Path of parameter to load
 * @param {String} customPath - Part of store from which to load
 * @param {Object|String|Boolean} notSetValue - Value to return if value is not found
 * @return {Object} Data located at path within state
 * @example <caption>Basic</caption>
 * import { connect } from 'react-redux'
 * import { firebaseConnect, helpers } from 'react-redux-firebase'
 * const { customToJS } = helpers
 *
 * const fbWrapped = firebaseConnect(['/todos'])(App)
 *
 * export default connect(({ firebase }) => ({
 *   // this.props.todos loaded from state.firebase.data.todos
 *   requesting: customToJS(firebase, 'todos', 'requesting')
 * }))(fbWrapped)
 */
var customToJS = exports.customToJS = function customToJS(data, path, custom, notSetValue) {
  if (!data) {
    return notSetValue;
  }

  var pathArr = ('/' + custom + fixPath(path)).split(/\//).slice(1);

  if (data.getIn) {
    return toJS(data.getIn(pathArr, notSetValue));
  }

  return data;
};

exports.default = {
  toJS: toJS,
  pathToJS: pathToJS,
  dataToJS: dataToJS,
  orderedToJS: orderedToJS,
  populatedDataToJS: populatedDataToJS,
  customToJS: customToJS,
  isLoaded: isLoaded,
  isEmpty: isEmpty
};