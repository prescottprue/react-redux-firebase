'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.snapshotToJS = exports.customToJS = exports.dataToJS = exports.pathToJS = exports.toJS = exports.fixPath = exports.isEmpty = exports.isLoaded = undefined;

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _size2 = require('lodash/size');

var _size3 = _interopRequireDefault(_size2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Detect whether items are loaded yet or not
 * @param {Object} item - Item to check loaded status of. A comma seperated list is also acceptable.
 * @return {Boolean} Whether or not item is loaded
 * @example
 * import React, { Component, PropTypes } from 'react'
 * import { connect } from 'react-redux'
 * import { firebaseConnect, helpers } from 'react-redux-firebase'
 * const { isLoaded, dataToJS } = helpers
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
 * import { firebaseConnect, helpers } from 'react-redux-firebase'
 * const { isEmpty, dataToJS } = helpers
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
  if (data && data.toJS) {
    return data.toJS();
  }

  return data;
};

/**
 * @description Convert parameter from Immutable Map to a Javascript object
 * @param {Map} firebase - Immutable Map to be converted to JS object (state.firebase)
 * @param {String} path - Path from state.firebase to convert to JS object
 * @param {Object|String|Boolean} notSetValue - Value to use if data is not available
 * @return {Object} Data located at path within Immutable Map
 * @example <caption>Basic</caption>
 * import { connect } from 'react-redux'
 * import { firebaseConnect, helpers } from 'react-redux-firebase'
 * const { pathToJS } = helpers
 * const fbWrapped = firebaseConnect()(App)
 * export default connect(({ firebase }) => ({
 *   profile: pathToJS(firebase, 'profile'),
 *   auth: pathToJS(firebase, 'auth')
 * }))(fbWrapped)
 */
var pathToJS = exports.pathToJS = function pathToJS(data, path, notSetValue) {
  if (!data) {
    return notSetValue;
  }

  var pathArr = fixPath(path).split(/\//).slice(1);

  if (data.getIn) {
    return toJS(data.getIn(pathArr, notSetValue));
  }

  return data;
};

/**
 * @description Convert parameter under "data" path of Immutable Map to a Javascript object
 * @param {Map} firebase - Immutable Map to be converted to JS object (state.firebase)
 * @param {String} path - Path of parameter to load
 * @param {Object|String|Boolean} notSetValue - Value to return if value is not found
 * @return {Object} Data located at path within Immutable Map
 * @example <caption>Basic</caption>
 * import { connect } from 'react-redux'
 * import { firebaseConnect, helpers } from 'react-redux-firebase'
 * const { dataToJS } = helpers
 *
 * const fbWrapped = firebaseConnect(['/todos'])(App)
 *
 * export default connect(({ firebase }) => ({
 *   // this.props.todos loaded from state.firebase.data.todos
 *   todos: dataToJS(firebase, 'todos')
 * }))(fbWrapped)
 */
var dataToJS = exports.dataToJS = function dataToJS(data, path, notSetValue) {
  if (!data) {
    return notSetValue;
  }

  var dataPath = '/data' + fixPath(path);

  var pathArr = dataPath.split(/\//).slice(1);

  if (data.getIn) {
    return toJS(data.getIn(pathArr, notSetValue));
  }

  return data;
};

/**
 * @description Load custom object from within store
 * @param {Map} firebase - Immutable Map to be converted to JS object (state.firebase)
 * @param {String} path - Path of parameter to load
 * @param {String} customPath - Part of store from which to load
 * @param {Object|String|Boolean} notSetValue - Value to return if value is not found
 * @return {Object} Data located at path within Immutable Map
 */
var customToJS = exports.customToJS = function customToJS(data, path, custom, notSetValue) {
  if (!(data && data.getIn)) {
    return notSetValue;
  }

  var customPath = '/' + custom + fixPath(path);

  var pathArr = customPath.split(/\//).slice(1);

  if (data.getIn) {
    return toJS(data.getIn(pathArr, notSetValue));
  }

  return data;
};

/**
 * @description Convert Immutable Map to a Javascript object
 * @param {Map} snapshot - Snapshot from store
 * @param {String} path - Path of snapshot to load
 * @param {Object|String|Boolean} notSetValue - Value to return if value is not found
 * @return {Object} Data located at path within Immutable Map
 */
var snapshotToJS = exports.snapshotToJS = function snapshotToJS(snapshot, path, notSetValue) {
  if (!snapshot) {
    return notSetValue;
  }

  var snapshotPath = '/snapshot' + fixPath(path);

  var pathArr = snapshotPath.split(/\//).slice(1);

  if (snapshot.getIn) {
    return toJS(snapshot.getIn(pathArr, notSetValue));
  }

  return snapshot;
};

exports.default = {
  toJS: toJS,
  pathToJS: pathToJS,
  dataToJS: dataToJS,
  snapshotToJS: snapshotToJS,
  customToJS: customToJS,
  isLoaded: isLoaded,
  isEmpty: isEmpty
};