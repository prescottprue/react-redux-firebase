/*! react-redux-firebase.js v1.3.3 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactReduxFirebase"] = factory(require("react"));
	else
		root["ReactReduxFirebase"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_248__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _connect = __webpack_require__(105);

	var _connect2 = _interopRequireDefault(_connect);

	var _compose = __webpack_require__(104);

	var _compose2 = _interopRequireDefault(_compose);

	var _reducer = __webpack_require__(107);

	var _reducer2 = _interopRequireDefault(_reducer);

	var _constants = __webpack_require__(4);

	var _constants2 = _interopRequireDefault(_constants);

	var _helpers = __webpack_require__(106);

	var helpers = _interopRequireWildcard(_helpers);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _extends({
	  firebase: _connect2.default,
	  firebaseConnect: _connect2.default,
	  firebaseStateReducer: _reducer2.default,
	  reduxReactFirebase: _compose2.default,
	  reactReduxFirebase: _compose2.default,
	  reduxFirebase: _compose2.default,
	  constants: _constants2.default,
	  actionTypes: _constants.actionTypes,
	  getFirebase: _compose.getFirebase,
	  helpers: helpers
	}, helpers);
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(81);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/** @constant
	 * @description Prefix for all actions within library
	 * @type {String}
	 * @example
	 * import { constants } from 'react-redux-firebase'
	 * constants.actionsPrefix === '@@reactReduxFirebase' // true
	*/
	var actionsPrefix = exports.actionsPrefix = '@@reactReduxFirebase';

	/**
	 * @constant
	 * @type {Object}
	 * @description Object containing all action types
	 * @property {String} START - `@@reactReduxFirebase/START`
	 * @property {String} SET - `@@reactReduxFirebase/SET`
	 * @property {String} SET_PROFILE - `@@reactReduxFirebase/SET_PROFILE`
	 * @property {String} LOGIN - `@@reactReduxFirebase/LOGIN`
	 * @property {String} LOGOUT - `@@reactReduxFirebase/LOGOUT`
	 * @property {String} LOGIN_ERROR - `@@reactReduxFirebase/LOGIN_ERROR`
	 * @property {String} NO_VALUE - `@@reactReduxFirebase/NO_VALUE`
	 * @property {String} UNAUTHORIZED_ERROR - `@@reactReduxFirebase/UNAUTHORIZED_ERROR`
	 * @property {String} UNSET_LISTENER - `@@reactReduxFirebase/UNSET_LISTENER`
	 * @property {String} AUTHENTICATION_INIT_STARTED - `@@reactReduxFirebase/AUTHENTICATION_INIT_STARTED`
	 * @property {String} AUTHENTICATION_INIT_FINISHED - `@@reactReduxFirebase/AUTHENTICATION_INIT_FINISHED`
	 * @property {String} FILE_UPLOAD_START - `@@reactReduxFirebase/FILE_UPLOAD_START`
	 * @property {String} FILE_UPLOAD_ERROR - `@@reactReduxFirebase/FILE_UPLOAD_ERROR`
	 * @property {String} FILE_UPLOAD_PROGRESS - `@@reactReduxFirebase/FILE_UPLOAD_PROGRESS`
	 * @property {String} FILE_UPLOAD_COMPLETE - `@@reactReduxFirebase/FILE_UPLOAD_COMPLETE`
	 * @property {String} FILE_DELETE_START - `@@reactReduxFirebase/FILE_DELETE_START`
	 * @property {String} FILE_DELETE_ERROR - `@@reactReduxFirebase/FILE_DELETE_ERROR`
	 * @property {String} FILE_DELETE_COMPLETE - `@@reactReduxFirebase/FILE_DELETE_COMPLETE`
	 * @example
	 * import { actionTypes } from 'react-redux-firebase'
	 * actionTypes.SET === '@@reactReduxFirebase/SET' // true
	*/
	var actionTypes = exports.actionTypes = {
	  START: actionsPrefix + '/START',
	  SET: actionsPrefix + '/SET',
	  SET_PROFILE: actionsPrefix + '/SET_PROFILE',
	  LOGIN: actionsPrefix + '/LOGIN',
	  LOGOUT: actionsPrefix + '/LOGOUT',
	  LOGIN_ERROR: actionsPrefix + '/LOGIN_ERROR',
	  NO_VALUE: actionsPrefix + '/NO_VALUE',
	  UNAUTHORIZED_ERROR: actionsPrefix + '/UNAUTHORIZED_ERROR',
	  ERROR: actionsPrefix + '/ERROR',
	  UNSET_LISTENER: actionsPrefix + '/UNSET_LISTENER',
	  AUTHENTICATION_INIT_STARTED: actionsPrefix + '/AUTHENTICATION_INIT_STARTED',
	  AUTHENTICATION_INIT_FINISHED: actionsPrefix + '/AUTHENTICATION_INIT_FINISHED',
	  FILE_UPLOAD_START: actionsPrefix + '/FILE_UPLOAD_START',
	  FILE_UPLOAD_ERROR: actionsPrefix + '/FILE_UPLOAD_ERROR',
	  FILE_UPLOAD_PROGRESS: actionsPrefix + '/FILE_UPLOAD_PROGRESS',
	  FILE_UPLOAD_COMPLETE: actionsPrefix + '/FILE_UPLOAD_COMPLETE',
	  FILE_DELETE_START: actionsPrefix + '/FILE_DELETE_START',
	  FILE_DELETE_ERROR: actionsPrefix + '/FILE_DELETE_ERROR',
	  FILE_DELETE_COMPLETE: actionsPrefix + '/FILE_DELETE_COMPLETE'
	};

	/** @constant
	 * @description Default configuration options
	 * @property {String} userProfile - `null` Location on Firebase where user
	 * profiles are stored. Often set to `'users'`.
	 * @property {Boolean} enableLogging - `false` Whether or not firebase
	 * database logging is enabled.
	 * @property {Boolean} updateProfileOnLogin - `true` Whether or not to update
	 * user profile when logging in.
	 * @property {Boolean} enableRedirectHandling - `true` Whether or not to enable
	 * redirect handling. This must be disabled if environment is not http/https
	 * such as with react-native.
	 * @property {Boolean} autoPopulateProfile - `true` Whether or not to
	 * automatically populate profile with data loaded through
	 * profileParamsToPopulate config.
	 * @property {Boolean} setProfilePopulateResults - `true` Whether or not to
	 * call SET actions for data that results from populating profile to redux under
	 * the data path. For example: role paramter on profile populated from 'roles'
	 * root. True will call SET_PROFILE as well as a SET action with the role that
	 * is loaded (places it in data/roles).
	 * @property {Boolean} distpatchOnUnsetListener - `false` Whether or not to
	 * dispatch UNSET_LISTENER when disabling listeners for a specific path. USE WITH CAUTION
	 * Setting this to true allows an action to be called that removes data
	 * from redux (which might not always be expected).
	 * @type {Array}
	*/
	var defaultConfig = exports.defaultConfig = {
	  userProfile: null,
	  enableLogging: false,
	  updateProfileOnLogin: true,
	  enableRedirectHandling: true,
	  autoPopulateProfile: true,
	  setProfilePopulateResults: false,
	  distpatchOnUnsetListener: false
	};

	/** @constant
	 * @description List of all external auth providers that are supported
	 * (firebase's email/anonymous included by default).
	 * @type {Array}
	 * @private
	*/
	var supportedAuthProviders = exports.supportedAuthProviders = ['google', 'github', 'twitter', 'facebook'];

	/** @constant
	 * @description Default keys returned within JSON Web Token recieved when
	 * authenticating with Firebase
	 * @type {Array}
	 * @private
	*/
	var defaultJWTProps = exports.defaultJWTProps = ['aud', 'auth_time', 'exp', 'firebase', 'iat', 'iss', 'sub', 'user_id'];

	/** @constant
	 * @description Default initial props used when running firebase.initializeApp
	 * @type {Array}
	 * @private
	*/
	var defaultInitProps = exports.defaultInitProps = ['apiKey', 'authDomain', 'databaseURL', 'storageBucket', 'messagingSenderId'];

	/** @constant
	 * @description Parameters stored by path string instead of full path
	 * @type {Array}
	 * @private
	*/
	var metaParams = exports.metaParams = ['timestamp', 'requesting', 'requested'];

	/** @constant
	 * @description String Character used to split/join meta parameter keys
	 * @type {Array}
	 * @private
	*/
	var paramSplitChar = exports.paramSplitChar = '/';

	exports.default = {
	  defaultJWTProps: defaultJWTProps,
	  actionTypes: actionTypes,
	  defaultConfig: defaultConfig,
	  supportedAuthProviders: supportedAuthProviders,
	  defaultInitProps: defaultInitProps,
	  metaParams: metaParams,
	  paramSplitChar: paramSplitChar
	};


	module.exports = {
	  defaultJWTProps: defaultJWTProps,
	  actionTypes: actionTypes,
	  defaultConfig: defaultConfig,
	  supportedAuthProviders: supportedAuthProviders,
	  defaultInitProps: defaultInitProps,
	  metaParams: metaParams,
	  paramSplitChar: paramSplitChar
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(10),
	    getRawTag = __webpack_require__(178),
	    objectToString = __webpack_require__(204);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(141),
	    getValue = __webpack_require__(179);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(9),
	    isLength = __webpack_require__(53);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(6),
	    isObject = __webpack_require__(2);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(3);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(145),
	    baseMatchesProperty = __webpack_require__(146),
	    identity = __webpack_require__(30),
	    isArray = __webpack_require__(1),
	    property = __webpack_require__(238);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(41),
	    baseAssignValue = __webpack_require__(26);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	module.exports = copyObject;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(33);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(6),
	    isArray = __webpack_require__(1),
	    isObjectLike = __webpack_require__(5);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var firebase = (function(){
	/*! @license Firebase v3.7.1
	    Build: 3.7.1-rc.1
	    Terms: https://firebase.google.com/terms/ */
	var firebase = null; (function() { var aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},k="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,l=function(){l=function(){};k.Symbol||(k.Symbol=ba)},ca=0,ba=function(a){return"jscomp_symbol_"+(a||"")+ca++},n=function(){l();var a=k.Symbol.iterator;a||(a=k.Symbol.iterator=
	k.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&aa(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return m(this)}});n=function(){}},m=function(a){var b=0;return da(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})},da=function(a){n();a={next:a};a[k.Symbol.iterator]=function(){return this};return a},q=this,r=function(){},t=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);
	if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},v=function(a){return"function"==t(a)},ea=function(a,
	b,c){return a.call.apply(a.bind,arguments)},fa=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},w=function(a,b,c){w=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ea:fa;return w.apply(null,arguments)},x=function(a,b){var c=Array.prototype.slice.call(arguments,
	1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},y=function(a,b){function c(){}c.prototype=b.prototype;a.ha=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.base=function(a,c,h){for(var e=Array(arguments.length-2),d=2;d<arguments.length;d++)e[d-2]=arguments[d];return b.prototype[c].apply(a,e)}};var A;A="undefined"!==typeof window?window:"undefined"!==typeof self?self:global;
	var __extends=function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},__assign=Object.assign||function(a){for(var b,c=1,d=arguments.length;c<d;c++){b=arguments[c];for(var e in b)Object.prototype.hasOwnProperty.call(b,e)&&(a[e]=b[e])}return a},__rest=function(a,b){var c={},d;for(d in a)Object.prototype.hasOwnProperty.call(a,d)&&0>b.indexOf(d)&&(c[d]=a[d]);if(null!=a&&"function"===typeof Object.getOwnPropertySymbols){var e=
	0;for(d=Object.getOwnPropertySymbols(a);e<d.length;e++)0>b.indexOf(d[e])&&(c[d[e]]=a[d[e]])}return c},__decorate=function(a,b,c,d){var e=arguments.length,h=3>e?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d,g;g=A.Reflect;if("object"===typeof g&&"function"===typeof g.decorate)h=g.decorate(a,b,c,d);else for(var f=a.length-1;0<=f;f--)if(g=a[f])h=(3>e?g(h):3<e?g(b,c,h):g(b,c))||h;return 3<e&&h&&Object.defineProperty(b,c,h),h},__metadata=function(a,b){var c=A.Reflect;if("object"===typeof c&&"function"===
	typeof c.metadata)return c.metadata(a,b)},__param=function(a,b){return function(c,d){b(c,d,a)}},__awaiter=function(a,b,c,d){return new (c||(c=Promise))(function(e,h){function g(a){try{p(d.next(a))}catch(u){h(u)}}function f(a){try{p(d["throw"](a))}catch(u){h(u)}}function p(a){a.done?e(a.value):(new c(function(b){b(a.value)})).then(g,f)}p((d=d.apply(a,b)).next())})},__generator=function(a,b){function c(a){return function(b){return d([a,b])}}function d(c){if(h)throw new TypeError("Generator is already executing.");
	for(;e;)try{if(h=1,g&&(f=g[c[0]&2?"return":c[0]?"throw":"next"])&&!(f=f.call(g,c[1])).done)return f;if(g=0,f)c=[0,f.value];switch(c[0]){case 0:case 1:f=c;break;case 4:return e.label++,{value:c[1],done:!1};case 5:e.label++;g=c[1];c=[0];continue;case 7:c=e.G.pop();e.I.pop();continue;default:if(!(f=e.I,f=0<f.length&&f[f.length-1])&&(6===c[0]||2===c[0])){e=0;continue}if(3===c[0]&&(!f||c[1]>f[0]&&c[1]<f[3]))e.label=c[1];else if(6===c[0]&&e.label<f[1])e.label=f[1],f=c;else if(f&&e.label<f[2])e.label=f[2],
	e.G.push(c);else{f[2]&&e.G.pop();e.I.pop();continue}}c=b.call(a,e)}catch(z){c=[6,z],g=0}finally{h=f=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}var e={label:0,ga:function(){if(f[0]&1)throw f[1];return f[1]},I:[],G:[]},h,g,f;return{next:c(0),"throw":c(1),"return":c(2)}};
	"undefined"!==typeof A.S&&A.S||(A.__extends=__extends,A.__assign=__assign,A.__rest=__rest,A.__extends=__extends,A.__decorate=__decorate,A.__metadata=__metadata,A.__param=__param,A.__awaiter=__awaiter,A.__generator=__generator);var B=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,B);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};y(B,Error);B.prototype.name="CustomError";var ga=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")};var C=function(a,b){b.unshift(a);B.call(this,ga.apply(null,b));b.shift()};y(C,B);C.prototype.name="AssertionError";var ha=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),h=d;else a&&(e+=": "+a,h=b);throw new C(""+e,h||[]);},D=function(a,b,c){a||ha("",null,b,Array.prototype.slice.call(arguments,2))},E=function(a,b,c){v(a)||ha("Expected function but got %s: %s.",[t(a),a],b,Array.prototype.slice.call(arguments,2))};var F=function(a,b,c){this.Y=c;this.T=a;this.Z=b;this.s=0;this.o=null};F.prototype.get=function(){var a;0<this.s?(this.s--,a=this.o,this.o=a.next,a.next=null):a=this.T();return a};F.prototype.put=function(a){this.Z(a);this.s<this.Y&&(this.s++,a.next=this.o,this.o=a)};var G;a:{var ia=q.navigator;if(ia){var ja=ia.userAgent;if(ja){G=ja;break a}}G=""};var ka=function(a){q.setTimeout(function(){throw a;},0)},H,la=function(){var a=q.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==G.indexOf("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+
	"//"+b.location.host,a=w(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&-1==G.indexOf("Trident")&&-1==G.indexOf("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var a=c.J;c.J=null;a()}};return function(a){d.next={J:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in
	document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){q.setTimeout(a,0)}};var I=function(){this.v=this.g=null},ma=new F(function(){return new J},function(a){a.reset()},100);I.prototype.add=function(a,b){var c=ma.get();c.set(a,b);this.v?this.v.next=c:(D(!this.g),this.g=c);this.v=c};I.prototype.remove=function(){var a=null;this.g&&(a=this.g,this.g=this.g.next,this.g||(this.v=null),a.next=null);return a};var J=function(){this.next=this.scope=this.B=null};J.prototype.set=function(a,b){this.B=a;this.scope=b;this.next=null};
	J.prototype.reset=function(){this.next=this.scope=this.B=null};var M=function(a,b){K||na();L||(K(),L=!0);oa.add(a,b)},K,na=function(){if(-1!=String(q.Promise).indexOf("[native code]")){var a=q.Promise.resolve(void 0);K=function(){a.then(pa)}}else K=function(){var a=pa;!v(q.setImmediate)||q.Window&&q.Window.prototype&&-1==G.indexOf("Edge")&&q.Window.prototype.setImmediate==q.setImmediate?(H||(H=la()),H(a)):q.setImmediate(a)}},L=!1,oa=new I,pa=function(){for(var a;a=oa.remove();){try{a.B.call(a.scope)}catch(b){ka(b)}ma.put(a)}L=!1};var O=function(a,b){this.b=0;this.R=void 0;this.j=this.h=this.u=null;this.m=this.A=!1;if(a!=r)try{var c=this;a.call(b,function(a){N(c,2,a)},function(a){try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(e){}N(c,3,a)})}catch(d){N(this,3,d)}},qa=function(){this.next=this.context=this.i=this.f=this.child=null;this.w=!1};qa.prototype.reset=function(){this.context=this.i=this.f=this.child=null;this.w=!1};
	var ra=new F(function(){return new qa},function(a){a.reset()},100),sa=function(a,b,c){var d=ra.get();d.f=a;d.i=b;d.context=c;return d},ua=function(a,b,c){ta(a,b,c,null)||M(x(b,a))};O.prototype.then=function(a,b,c){null!=a&&E(a,"opt_onFulfilled should be a function.");null!=b&&E(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return va(this,v(a)?a:null,v(b)?b:null,c)};O.prototype.then=O.prototype.then;O.prototype.$goog_Thenable=!0;
	O.prototype.ba=function(a,b){return va(this,null,a,b)};var xa=function(a,b){a.h||2!=a.b&&3!=a.b||wa(a);D(null!=b.f);a.j?a.j.next=b:a.h=b;a.j=b},va=function(a,b,c,d){var e=sa(null,null,null);e.child=new O(function(a,g){e.f=b?function(c){try{var e=b.call(d,c);a(e)}catch(z){g(z)}}:a;e.i=c?function(b){try{var e=c.call(d,b);a(e)}catch(z){g(z)}}:g});e.child.u=a;xa(a,e);return e.child};O.prototype.da=function(a){D(1==this.b);this.b=0;N(this,2,a)};
	O.prototype.ea=function(a){D(1==this.b);this.b=0;N(this,3,a)};
	var N=function(a,b,c){0==a.b&&(a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself")),a.b=1,ta(c,a.da,a.ea,a)||(a.R=c,a.b=b,a.u=null,wa(a),3!=b||ya(a,c)))},ta=function(a,b,c,d){if(a instanceof O)return null!=b&&E(b,"opt_onFulfilled should be a function."),null!=c&&E(c,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),xa(a,sa(b||r,c||null,d)),!0;var e;if(a)try{e=!!a.$goog_Thenable}catch(g){e=!1}else e=!1;if(e)return a.then(b,c,d),
	!0;e=typeof a;if("object"==e&&null!=a||"function"==e)try{var h=a.then;if(v(h))return za(a,h,b,c,d),!0}catch(g){return c.call(d,g),!0}return!1},za=function(a,b,c,d,e){var h=!1,g=function(a){h||(h=!0,c.call(e,a))},f=function(a){h||(h=!0,d.call(e,a))};try{b.call(a,g,f)}catch(p){f(p)}},wa=function(a){a.A||(a.A=!0,M(a.V,a))},Aa=function(a){var b=null;a.h&&(b=a.h,a.h=b.next,b.next=null);a.h||(a.j=null);null!=b&&D(null!=b.f);return b};
	O.prototype.V=function(){for(var a;a=Aa(this);){var b=this.b,c=this.R;if(3==b&&a.i&&!a.w){var d;for(d=this;d&&d.m;d=d.u)d.m=!1}if(a.child)a.child.u=null,Ba(a,b,c);else try{a.w?a.f.call(a.context):Ba(a,b,c)}catch(e){Ca.call(null,e)}ra.put(a)}this.A=!1};var Ba=function(a,b,c){2==b?a.f.call(a.context,c):a.i&&a.i.call(a.context,c)},ya=function(a,b){a.m=!0;M(function(){a.m&&Ca.call(null,b)})},Ca=ka;function P(a,b){if(!(b instanceof Object))return b;switch(b.constructor){case Date:return new Date(b.getTime());case Object:void 0===a&&(a={});break;case Array:a=[];break;default:return b}for(var c in b)b.hasOwnProperty(c)&&(a[c]=P(a[c],b[c]));return a};O.all=function(a){return new O(function(b,c){var d=a.length,e=[];if(d)for(var h=function(a,c){d--;e[a]=c;0==d&&b(e)},g=function(a){c(a)},f=0,p;f<a.length;f++)p=a[f],ua(p,x(h,f),g);else b(e)})};O.resolve=function(a){if(a instanceof O)return a;var b=new O(r);N(b,2,a);return b};O.reject=function(a){return new O(function(b,c){c(a)})};O.prototype["catch"]=O.prototype.ba;var Q=O;"undefined"!==typeof Promise&&(Q=Promise);var Da=Q;function Ea(a,b){a=new R(a,b);return a.subscribe.bind(a)}var R=function(a,b){var c=this;this.a=[];this.P=0;this.task=Da.resolve();this.l=!1;this.F=b;this.task.then(function(){a(c)}).catch(function(a){c.error(a)})};R.prototype.next=function(a){S(this,function(b){b.next(a)})};R.prototype.error=function(a){S(this,function(b){b.error(a)});this.close(a)};R.prototype.complete=function(){S(this,function(a){a.complete()});this.close()};
	R.prototype.subscribe=function(a,b,c){var d=this,e;if(void 0===a&&void 0===b&&void 0===c)throw Error("Missing Observer.");e=Fa(a)?a:{next:a,error:b,complete:c};void 0===e.next&&(e.next=T);void 0===e.error&&(e.error=T);void 0===e.complete&&(e.complete=T);a=this.fa.bind(this,this.a.length);this.l&&this.task.then(function(){try{d.K?e.error(d.K):e.complete()}catch(h){}});this.a.push(e);return a};
	R.prototype.fa=function(a){void 0!==this.a&&void 0!==this.a[a]&&(delete this.a[a],--this.P,0===this.P&&void 0!==this.F&&this.F(this))};var S=function(a,b){if(!a.l)for(var c=0;c<a.a.length;c++)Ga(a,c,b)},Ga=function(a,b,c){a.task.then(function(){if(void 0!==a.a&&void 0!==a.a[b])try{c(a.a[b])}catch(d){"undefined"!==typeof console&&console.error&&console.error(d)}})};R.prototype.close=function(a){var b=this;this.l||(this.l=!0,void 0!==a&&(this.K=a),this.task.then(function(){b.a=void 0;b.F=void 0}))};
	function Fa(a){if("object"!==typeof a||null===a)return!1;var b;b=["next","error","complete"];n();var c=b[Symbol.iterator];b=c?c.call(b):m(b);for(c=b.next();!c.done;c=b.next())if(c=c.value,c in a&&"function"===typeof a[c])return!0;return!1}function T(){};var Ha=Error.captureStackTrace,V=function(a,b){this.code=a;this.message=b;if(Ha)Ha(this,U.prototype.create);else{var c=Error.apply(this,arguments);this.name="FirebaseError";Object.defineProperty(this,"stack",{get:function(){return c.stack}})}};V.prototype=Object.create(Error.prototype);V.prototype.constructor=V;V.prototype.name="FirebaseError";var U=function(a,b,c){this.$=a;this.aa=b;this.U=c;this.pattern=/\{\$([^}]+)}/g};
	U.prototype.create=function(a,b){void 0===b&&(b={});var c=this.U[a];a=this.$+"/"+a;var c=void 0===c?"Error":c.replace(this.pattern,function(a,c){a=b[c];return void 0!==a?a.toString():"<"+c+"?>"}),c=this.aa+": "+c+" ("+a+").",c=new V(a,c),d;for(d in b)b.hasOwnProperty(d)&&"_"!==d.slice(-1)&&(c[d]=b[d]);return c};var W=Q,X=function(a,b,c){var d=this;this.M=c;this.N=!1;this.c={};this.D=b;this.H=P(void 0,a);a="serviceAccount"in this.H;("credential"in this.H||a)&&"undefined"!==typeof console&&console.log("The '"+(a?"serviceAccount":"credential")+"' property specified in the first argument to initializeApp() is deprecated and will be removed in the next major version. You should instead use the 'firebase-admin' package. See https://firebase.google.com/docs/admin/setup for details on how to get started.");Object.keys(c.INTERNAL.factories).forEach(function(a){var b=
	c.INTERNAL.useAsService(d,a);null!==b&&(b=d.X.bind(d,b),d[a]=b)})};X.prototype.delete=function(){var a=this;return(new W(function(b){Y(a);b()})).then(function(){a.M.INTERNAL.removeApp(a.D);var b=[];Object.keys(a.c).forEach(function(c){Object.keys(a.c[c]).forEach(function(d){b.push(a.c[c][d])})});return W.all(b.map(function(a){return a.INTERNAL.delete()}))}).then(function(){a.N=!0;a.c={}})};
	X.prototype.X=function(a,b){Y(this);"undefined"===typeof this.c[a]&&(this.c[a]={});var c=b||"[DEFAULT]";return"undefined"===typeof this.c[a][c]?(b=this.M.INTERNAL.factories[a](this,this.W.bind(this),b),this.c[a][c]=b):this.c[a][c]};X.prototype.W=function(a){P(this,a)};var Y=function(a){a.N&&Z("app-deleted",{name:a.D})};k.Object.defineProperties(X.prototype,{name:{configurable:!0,enumerable:!0,get:function(){Y(this);return this.D}},options:{configurable:!0,enumerable:!0,get:function(){Y(this);return this.H}}});
	X.prototype.name&&X.prototype.options||X.prototype.delete||console.log("dc");
	function Ia(){function a(a){a=a||"[DEFAULT]";var b=d[a];void 0===b&&Z("no-app",{name:a});return b}function b(a,b){Object.keys(e).forEach(function(d){d=c(a,d);if(null!==d&&h[d])h[d](b,a)})}function c(a,b){if("serverAuth"===b)return null;var c=b;a=a.options;"auth"===b&&(a.serviceAccount||a.credential)&&(c="serverAuth","serverAuth"in e||Z("sa-not-supported"));return c}var d={},e={},h={},g={__esModule:!0,initializeApp:function(a,c){void 0===c?c="[DEFAULT]":"string"===typeof c&&""!==c||Z("bad-app-name",
	{name:c+""});void 0!==d[c]&&Z("duplicate-app",{name:c});a=new X(a,c,g);d[c]=a;b(a,"create");void 0!=a.INTERNAL&&void 0!=a.INTERNAL.getToken||P(a,{INTERNAL:{getUid:function(){return null},getToken:function(){return W.resolve(null)},addAuthTokenListener:function(){},removeAuthTokenListener:function(){}}});return a},app:a,apps:null,Promise:W,SDK_VERSION:"0.0.0",INTERNAL:{registerService:function(b,c,d,u){e[b]&&Z("duplicate-service",{name:b});e[b]=c;u&&(h[b]=u);c=function(c){void 0===c&&(c=a());return c[b]()};
	void 0!==d&&P(c,d);return g[b]=c},createFirebaseNamespace:Ia,extendNamespace:function(a){P(g,a)},createSubscribe:Ea,ErrorFactory:U,removeApp:function(a){b(d[a],"delete");delete d[a]},factories:e,useAsService:c,Promise:O,deepExtend:P}};g["default"]=g;Object.defineProperty(g,"apps",{get:function(){return Object.keys(d).map(function(a){return d[a]})}});a.App=X;return g}function Z(a,b){throw Ja.create(a,b);}
	var Ja=new U("app","Firebase",{"no-app":"No Firebase App '{$name}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$name}","duplicate-app":"Firebase App named '{$name}' already exists","app-deleted":"Firebase App named '{$name}' already deleted","duplicate-service":"Firebase service named '{$name}' already registered","sa-not-supported":"Initializing the Firebase SDK with a service account is only allowed in a Node.js environment. On client devices, you should instead initialize the SDK with an api key and auth domain"});"undefined"!==typeof firebase&&(firebase=Ia()); }).call(this);
	firebase.SDK_VERSION = "3.7.1";
	return firebase;}).call(typeof global !== undefined ? global : typeof self !== undefined ? self : typeof window !== undefined ? window : {});
	module.exports = firebase;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(69),
	    createBaseEach = __webpack_require__(169);

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(1),
	    isKey = __webpack_require__(49),
	    stringToPath = __webpack_require__(216),
	    toString = __webpack_require__(55);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value, object) {
	  if (isArray(value)) {
	    return value;
	  }
	  return isKey(value, object) ? [value] : stringToPath(toString(value));
	}

	module.exports = castPath;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(64),
	    baseKeys = __webpack_require__(71),
	    isArrayLike = __webpack_require__(8);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.promisesForPopulate = exports.populateList = exports.getPopulateChild = exports.getPopulates = exports.getPopulateObjs = exports.getPopulateObj = undefined;

	var _has2 = __webpack_require__(228);

	var _has3 = _interopRequireDefault(_has2);

	var _set2 = __webpack_require__(97);

	var _set3 = _interopRequireDefault(_set2);

	var _forEach2 = __webpack_require__(51);

	var _forEach3 = _interopRequireDefault(_forEach2);

	var _get2 = __webpack_require__(52);

	var _get3 = _interopRequireDefault(_get2);

	var _map2 = __webpack_require__(35);

	var _map3 = _interopRequireDefault(_map2);

	var _isObject2 = __webpack_require__(2);

	var _isObject3 = _interopRequireDefault(_isObject2);

	var _isArray2 = __webpack_require__(1);

	var _isArray3 = _interopRequireDefault(_isArray2);

	var _isString2 = __webpack_require__(14);

	var _isString3 = _interopRequireDefault(_isString2);

	var _filter2 = __webpack_require__(224);

	var _filter3 = _interopRequireDefault(_filter2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _Promise = typeof Promise === 'undefined' ? __webpack_require__(22).Promise : Promise;

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

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   4.1.0
	 */

	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.ES6Promise = factory());
	}(this, (function () { 'use strict';

	function objectOrFunction(x) {
	  return typeof x === 'function' || typeof x === 'object' && x !== null;
	}

	function isFunction(x) {
	  return typeof x === 'function';
	}

	var _isArray = undefined;
	if (!Array.isArray) {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	} else {
	  _isArray = Array.isArray;
	}

	var isArray = _isArray;

	var len = 0;
	var vertxNext = undefined;
	var customSchedulerFn = undefined;

	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};

	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}

	function setAsap(asapFn) {
	  asap = asapFn;
	}

	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}

	// vertx
	function useVertxTimer() {
	  if (typeof vertxNext !== 'undefined') {
	    return function () {
	      vertxNext(flush);
	    };
	  }

	  return useSetTimeout();
	}

	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });

	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}

	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}

	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}

	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];

	    callback(arg);

	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }

	  len = 0;
	}

	function attemptVertx() {
	  try {
	    var r = require;
	    var vertx = __webpack_require__(249);
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}

	var scheduleFlush = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}

	function then(onFulfillment, onRejection) {
	  var _arguments = arguments;

	  var parent = this;

	  var child = new this.constructor(noop);

	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }

	  var _state = parent._state;

	  if (_state) {
	    (function () {
	      var callback = _arguments[_state - 1];
	      asap(function () {
	        return invokeCallback(_state, child, callback, parent._result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }

	  return child;
	}

	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.resolve(1);

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve(object) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }

	  var promise = new Constructor(noop);
	  _resolve(promise, object);
	  return promise;
	}

	var PROMISE_ID = Math.random().toString(36).substring(16);

	function noop() {}

	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;

	var GET_THEN_ERROR = new ErrorObject();

	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}

	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}

	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}

	function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}

	function handleForeignThenable(promise, thenable, then) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        _resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;

	      _reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));

	    if (!sealed && error) {
	      sealed = true;
	      _reject(promise, error);
	    }
	  }, promise);
	}

	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    _reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return _resolve(promise, value);
	    }, function (reason) {
	      return _reject(promise, reason);
	    });
	  }
	}

	function handleMaybeThenable(promise, maybeThenable, then$$) {
	  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$ === GET_THEN_ERROR) {
	      _reject(promise, GET_THEN_ERROR.error);
	      GET_THEN_ERROR.error = null;
	    } else if (then$$ === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$)) {
	      handleForeignThenable(promise, maybeThenable, then$$);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}

	function _resolve(promise, value) {
	  if (promise === value) {
	    _reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}

	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }

	  publish(promise);
	}

	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }

	  promise._result = value;
	  promise._state = FULFILLED;

	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}

	function _reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;

	  asap(publishRejection, promise);
	}

	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;

	  parent._onerror = null;

	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;

	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}

	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;

	  if (subscribers.length === 0) {
	    return;
	  }

	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;

	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];

	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }

	  promise._subscribers.length = 0;
	}

	function ErrorObject() {
	  this.error = null;
	}

	var TRY_CATCH_ERROR = new ErrorObject();

	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}

	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;

	  if (hasCallback) {
	    value = tryCatch(callback, detail);

	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value.error = null;
	    } else {
	      succeeded = true;
	    }

	    if (promise === value) {
	      _reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }

	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      _resolve(promise, value);
	    } else if (failed) {
	      _reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      _reject(promise, value);
	    }
	}

	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      _resolve(promise, value);
	    }, function rejectPromise(reason) {
	      _reject(promise, reason);
	    });
	  } catch (e) {
	    _reject(promise, e);
	  }
	}

	var id = 0;
	function nextId() {
	  return id++;
	}

	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}

	function Enumerator(Constructor, input) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop);

	  if (!this.promise[PROMISE_ID]) {
	    makePromise(this.promise);
	  }

	  if (isArray(input)) {
	    this._input = input;
	    this.length = input.length;
	    this._remaining = input.length;

	    this._result = new Array(this.length);

	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate();
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    _reject(this.promise, validationError());
	  }
	}

	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	};

	Enumerator.prototype._enumerate = function () {
	  var length = this.length;
	  var _input = this._input;

	  for (var i = 0; this._state === PENDING && i < length; i++) {
	    this._eachEntry(_input[i], i);
	  }
	};

	Enumerator.prototype._eachEntry = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$ = c.resolve;

	  if (resolve$$ === resolve) {
	    var _then = getThen(entry);

	    if (_then === then && entry._state !== PENDING) {
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof _then !== 'function') {
	      this._remaining--;
	      this._result[i] = entry;
	    } else if (c === Promise) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, _then);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve$$) {
	        return resolve$$(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve$$(entry), i);
	  }
	};

	Enumerator.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;

	  if (promise._state === PENDING) {
	    this._remaining--;

	    if (state === REJECTED) {
	      _reject(promise, value);
	    } else {
	      this._result[i] = value;
	    }
	  }

	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};

	Enumerator.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;

	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};

	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```

	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```

	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}

	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.

	  Example:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```

	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```

	  An example real-world use case is implementing timeouts:

	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```

	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}

	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  _reject(promise, reason);
	  return promise;
	}

	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}

	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}

	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.

	  Terminology
	  -----------

	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.

	  A promise can be in one of three states: pending, fulfilled, or rejected.

	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.

	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.


	  Basic Usage:
	  ------------

	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);

	    // on failure
	    reject(reason);
	  });

	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Advanced Usage:
	  ---------------

	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.

	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();

	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();

	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }

	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Unlike callbacks, promises are great composable primitives.

	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON

	    return values;
	  });
	  ```

	  @class Promise
	  @param {function} resolver
	  Useful for tooling.
	  @constructor
	*/
	function Promise(resolver) {
	  this[PROMISE_ID] = nextId();
	  this._result = this._state = undefined;
	  this._subscribers = [];

	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	  }
	}

	Promise.all = all;
	Promise.race = race;
	Promise.resolve = resolve;
	Promise.reject = reject;
	Promise._setScheduler = setScheduler;
	Promise._setAsap = setAsap;
	Promise._asap = asap;

	Promise.prototype = {
	  constructor: Promise,

	  /**
	    The primary way of interacting with a promise is through its `then` method,
	    which registers callbacks to receive either a promise's eventual value or the
	    reason why the promise cannot be fulfilled.
	  
	    ```js
	    findUser().then(function(user){
	      // user is available
	    }, function(reason){
	      // user is unavailable, and you are given the reason why
	    });
	    ```
	  
	    Chaining
	    --------
	  
	    The return value of `then` is itself a promise.  This second, 'downstream'
	    promise is resolved with the return value of the first promise's fulfillment
	    or rejection handler, or rejected if the handler throws an exception.
	  
	    ```js
	    findUser().then(function (user) {
	      return user.name;
	    }, function (reason) {
	      return 'default name';
	    }).then(function (userName) {
	      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	      // will be `'default name'`
	    });
	  
	    findUser().then(function (user) {
	      throw new Error('Found user, but still unhappy');
	    }, function (reason) {
	      throw new Error('`findUser` rejected and we're unhappy');
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	    });
	    ```
	    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	  
	    ```js
	    findUser().then(function (user) {
	      throw new PedagogicalException('Upstream error');
	    }).then(function (value) {
	      // never reached
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // The `PedgagocialException` is propagated all the way down to here
	    });
	    ```
	  
	    Assimilation
	    ------------
	  
	    Sometimes the value you want to propagate to a downstream promise can only be
	    retrieved asynchronously. This can be achieved by returning a promise in the
	    fulfillment or rejection handler. The downstream promise will then be pending
	    until the returned promise is settled. This is called *assimilation*.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // The user's comments are now available
	    });
	    ```
	  
	    If the assimliated promise rejects, then the downstream promise will also reject.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // If `findCommentsByAuthor` fulfills, we'll have the value here
	    }, function (reason) {
	      // If `findCommentsByAuthor` rejects, we'll have the reason here
	    });
	    ```
	  
	    Simple Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let result;
	  
	    try {
	      result = findResult();
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	    findResult(function(result, err){
	      if (err) {
	        // failure
	      } else {
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findResult().then(function(result){
	      // success
	    }, function(reason){
	      // failure
	    });
	    ```
	  
	    Advanced Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let author, books;
	  
	    try {
	      author = findAuthor();
	      books  = findBooksByAuthor(author);
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	  
	    function foundBooks(books) {
	  
	    }
	  
	    function failure(reason) {
	  
	    }
	  
	    findAuthor(function(author, err){
	      if (err) {
	        failure(err);
	        // failure
	      } else {
	        try {
	          findBoooksByAuthor(author, function(books, err) {
	            if (err) {
	              failure(err);
	            } else {
	              try {
	                foundBooks(books);
	              } catch(reason) {
	                failure(reason);
	              }
	            }
	          });
	        } catch(error) {
	          failure(err);
	        }
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findAuthor().
	      then(findBooksByAuthor).
	      then(function(books){
	        // found books
	    }).catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method then
	    @param {Function} onFulfilled
	    @param {Function} onRejected
	    Useful for tooling.
	    @return {Promise}
	  */
	  then: then,

	  /**
	    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	    as the catch block of a try/catch statement.
	  
	    ```js
	    function findAuthor(){
	      throw new Error('couldn't find that author');
	    }
	  
	    // synchronous
	    try {
	      findAuthor();
	    } catch(reason) {
	      // something went wrong
	    }
	  
	    // async with promises
	    findAuthor().catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method catch
	    @param {Function} onRejection
	    Useful for tooling.
	    @return {Promise}
	  */
	  'catch': function _catch(onRejection) {
	    return this.then(null, onRejection);
	  }
	};

	function polyfill() {
	    var local = undefined;

	    if (typeof global !== 'undefined') {
	        local = global;
	    } else if (typeof self !== 'undefined') {
	        local = self;
	    } else {
	        try {
	            local = Function('return this')();
	        } catch (e) {
	            throw new Error('polyfill failed because global object is unavailable in this environment');
	        }
	    }

	    var P = local.Promise;

	    if (P) {
	        var promiseToString = null;
	        try {
	            promiseToString = Object.prototype.toString.call(P.resolve());
	        } catch (e) {
	            // silently ignored
	        }

	        if (promiseToString === '[object Promise]' && !P.cast) {
	            return;
	        }
	    }

	    local.Promise = Promise;
	}

	// Strange compat..
	Promise.polyfill = polyfill;
	Promise.Promise = Promise;

	return Promise;

	})));
	//# sourceMappingURL=es6-promise.map

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(247), (function() { return this; }())))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(190),
	    listCacheDelete = __webpack_require__(191),
	    listCacheGet = __webpack_require__(192),
	    listCacheHas = __webpack_require__(193),
	    listCacheSet = __webpack_require__(194);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(23),
	    stackClear = __webpack_require__(209),
	    stackDelete = __webpack_require__(210),
	    stackGet = __webpack_require__(211),
	    stackHas = __webpack_require__(212),
	    stackSet = __webpack_require__(213);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(19);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(79);

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;


/***/ },
/* 27 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(188);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(7);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(138),
	    isObjectLike = __webpack_require__(5);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	module.exports = isArguments;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(3),
	    stubFalse = __webpack_require__(242);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(56)(module)))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(6),
	    isObjectLike = __webpack_require__(5);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(64),
	    baseKeysIn = __webpack_require__(143),
	    isArrayLike = __webpack_require__(8);

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	module.exports = keysIn;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(38),
	    baseIteratee = __webpack_require__(11),
	    baseMap = __webpack_require__(144),
	    isArray = __webpack_require__(1);

	/**
	 * Creates an array of values by running each element in `collection` thru
	 * `iteratee`. The iteratee is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	 *
	 * The guarded methods are:
	 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
	 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
	 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
	 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * _.map([4, 8], square);
	 * // => [16, 64]
	 *
	 * _.map({ 'a': 4, 'b': 8 }, square);
	 * // => [16, 64] (iteration order is not guaranteed)
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.map(users, 'user');
	 * // => ['barney', 'fred']
	 */
	function map(collection, iteratee) {
	  var func = isArray(collection) ? arrayMap : baseMap;
	  return func(collection, baseIteratee(iteratee, 3));
	}

	module.exports = map;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(7),
	    root = __webpack_require__(3);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(195),
	    mapCacheDelete = __webpack_require__(196),
	    mapCacheGet = __webpack_require__(197),
	    mapCacheHas = __webpack_require__(198),
	    mapCacheSet = __webpack_require__(199);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ },
/* 38 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ },
/* 40 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	module.exports = arrayReduce;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(26),
	    eq = __webpack_require__(19);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignValue;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(17),
	    toKey = __webpack_require__(13);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = castPath(path, object);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(139),
	    isObjectLike = __webpack_require__(5);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Unordered comparison
	 *  2 - Partial comparison
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, bitmask, customizer, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(60);

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	module.exports = cloneArrayBuffer;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(91);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(63),
	    stubArray = __webpack_require__(99);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return arrayFilter(nativeGetSymbols(object), function(symbol) {
	    return propertyIsEnumerable.call(object, symbol);
	  });
	};

	module.exports = getSymbols;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(121),
	    Map = __webpack_require__(36),
	    Promise = __webpack_require__(123),
	    Set = __webpack_require__(124),
	    WeakMap = __webpack_require__(126),
	    baseGetTag = __webpack_require__(6),
	    toSource = __webpack_require__(95);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = baseGetTag(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 48 */
/***/ function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	    rsVarRange = '\\ufe0e\\ufe0f';

	/** Used to compose unicode capture groups. */
	var rsZWJ = '\\u200d';

	/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
	var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

	/**
	 * Checks if `string` contains Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
	 */
	function hasUnicode(string) {
	  return reHasUnicode.test(string);
	}

	module.exports = hasUnicode;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(1),
	    isSymbol = __webpack_require__(33);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ },
/* 50 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(62),
	    baseEach = __webpack_require__(16),
	    castFunction = __webpack_require__(158),
	    isArray = __webpack_require__(1);

	/**
	 * Iterates over elements of `collection` and invokes `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length"
	 * property are iterated like arrays. To avoid this behavior use `_.forIn`
	 * or `_.forOwn` for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @see _.forEachRight
	 * @example
	 *
	 * _.forEach([1, 2], function(value) {
	 *   console.log(value);
	 * });
	 * // => Logs `1` then `2`.
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	 */
	function forEach(collection, iteratee) {
	  var func = isArray(collection) ? arrayEach : baseEach;
	  return func(collection, castFunction(iteratee));
	}

	module.exports = forEach;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(42);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 53 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(142),
	    baseUnary = __webpack_require__(156),
	    nodeUtil = __webpack_require__(203);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(155);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.unWatchEvents = exports.watchEvents = exports.unWatchEvent = exports.watchEvent = undefined;

	var _size2 = __webpack_require__(98);

	var _size3 = _interopRequireDefault(_size2);

	var _forEach2 = __webpack_require__(51);

	var _forEach3 = _interopRequireDefault(_forEach2);

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _constants = __webpack_require__(4);

	var _populate = __webpack_require__(21);

	var _query = __webpack_require__(59);

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

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.validateConfig = exports.createCallable = exports.getEventsFromInput = undefined;

	var _isFunction2 = __webpack_require__(9);

	var _isFunction3 = _interopRequireDefault(_isFunction2);

	var _events = __webpack_require__(110);

	Object.defineProperty(exports, 'getEventsFromInput', {
	  enumerable: true,
	  get: function get() {
	    return _events.getEventsFromInput;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @private
	 * @description Create a function if not already one
	 * @param {Function|Object|Array|String} Callable function or value of return for new function
	 */
	var createCallable = exports.createCallable = function createCallable(f) {
	  return (0, _isFunction3.default)(f) ? f : function () {
	    return f;
	  };
	};

	/**
	 * @private
	 * @description Validate config input
	 * @param {Object} Config object containing all combined configs
	 */
	var validateConfig = exports.validateConfig = function validateConfig(config) {
	  // require needed Firebase config
	  var requiredProps = ['databaseURL', 'authDomain', 'apiKey'];
	  requiredProps.forEach(function (p) {
	    if (!config[p]) {
	      throw new Error(p + ' is a required config parameter for react-redux-firebase.');
	    }
	  });

	  // Check that some certain config are functions if they exist
	  var functionProps = ['fileMetadataFactory', 'profileDecorator'];
	  functionProps.forEach(function (p) {
	    if (!!config[p] && !(0, _isFunction3.default)(config[p])) {
	      throw new Error(p + ' parameter in react-redux-firebase config must be a function. check your compose function.');
	    }
	  });
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.applyParamsToQuery = exports.unsetWatcher = exports.getWatcherCount = exports.setWatcher = exports.getQueryIdFromPath = exports.getWatchPath = undefined;

	var _constants = __webpack_require__(4);

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

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(3);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 61 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 62 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 63 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayFilter;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(154),
	    isArguments = __webpack_require__(31),
	    isArray = __webpack_require__(1),
	    isBuffer = __webpack_require__(32),
	    isIndex = __webpack_require__(18),
	    isTypedArray = __webpack_require__(54);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ },
/* 65 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(26),
	    eq = __webpack_require__(19);

	/**
	 * This function is like `assignValue` except that it doesn't assign
	 * `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if ((value !== undefined && !eq(object[key], value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignMergeValue;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(39),
	    isFlattenable = __webpack_require__(187);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;

	  predicate || (predicate = isFlattenable);
	  result || (result = []);

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(170);

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(68),
	    keys = __webpack_require__(20);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(39),
	    isArray = __webpack_require__(1);

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	module.exports = baseGetAllKeys;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(50),
	    nativeKeys = __webpack_require__(201);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(24),
	    assignMergeValue = __webpack_require__(66),
	    baseFor = __webpack_require__(68),
	    baseMergeDeep = __webpack_require__(147),
	    isObject = __webpack_require__(2),
	    keysIn = __webpack_require__(34);

	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  baseFor(source, function(srcValue, key) {
	    if (isObject(srcValue)) {
	      stack || (stack = new Stack);
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer
	        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
	        : undefined;

	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  }, keysIn);
	}

	module.exports = baseMerge;


/***/ },
/* 73 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(30),
	    overRest = __webpack_require__(92),
	    setToString = __webpack_require__(94);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(17),
	    last = __webpack_require__(233),
	    parent = __webpack_require__(205),
	    toKey = __webpack_require__(13);

	/**
	 * The base implementation of `_.unset`.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {Array|string} path The property path to unset.
	 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
	 */
	function baseUnset(object, path) {
	  path = castPath(path, object);
	  object = parent(object, path);
	  return object == null || delete object[toKey(last(path))];
	}

	module.exports = baseUnset;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(3);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(56)(module)))

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(44);

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	module.exports = cloneTypedArray;


/***/ },
/* 78 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(7);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(125),
	    arraySome = __webpack_require__(65),
	    cacheHas = __webpack_require__(157);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, bitmask, customizer, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 81 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(70),
	    getSymbols = __webpack_require__(46),
	    keys = __webpack_require__(20);

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	module.exports = getAllKeys;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(70),
	    getSymbolsIn = __webpack_require__(84),
	    keysIn = __webpack_require__(34);

	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeysIn(object) {
	  return baseGetAllKeys(object, keysIn, getSymbolsIn);
	}

	module.exports = getAllKeysIn;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(39),
	    getPrototype = __webpack_require__(45),
	    getSymbols = __webpack_require__(46),
	    stubArray = __webpack_require__(99);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own and inherited enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
	  var result = [];
	  while (object) {
	    arrayPush(result, getSymbols(object));
	    object = getPrototype(object);
	  }
	  return result;
	};

	module.exports = getSymbolsIn;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(17),
	    isArguments = __webpack_require__(31),
	    isArray = __webpack_require__(1),
	    isIndex = __webpack_require__(18),
	    isLength = __webpack_require__(53),
	    toKey = __webpack_require__(13);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = castPath(path, object);

	  var index = -1,
	      length = path.length,
	      result = false;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result || ++index != length) {
	    return result;
	  }
	  length = object == null ? 0 : object.length;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}

	module.exports = hasPath;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(134),
	    getPrototype = __webpack_require__(45),
	    isPrototype = __webpack_require__(50);

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	module.exports = initCloneObject;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(19),
	    isArrayLike = __webpack_require__(8),
	    isIndex = __webpack_require__(18),
	    isObject = __webpack_require__(2);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 89 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ },
/* 90 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}

	module.exports = matchesStrictComparable;


/***/ },
/* 91 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(61);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ },
/* 93 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(152),
	    shortOut = __webpack_require__(208);

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	module.exports = setToString;


/***/ },
/* 95 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(6),
	    getPrototype = __webpack_require__(45),
	    isObjectLike = __webpack_require__(5);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}

	module.exports = isPlainObject;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var baseSet = __webpack_require__(151);

	/**
	 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
	 * it's created. Arrays are created for missing index properties while objects
	 * are created for all other missing properties. Use `_.setWith` to customize
	 * `path` creation.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to modify.
	 * @param {Array|string} path The path of the property to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.set(object, 'a[0].b.c', 4);
	 * console.log(object.a[0].b.c);
	 * // => 4
	 *
	 * _.set(object, ['x', '0', 'y', 'z'], 5);
	 * console.log(object.x[0].y.z);
	 * // => 5
	 */
	function set(object, path, value) {
	  return object == null ? object : baseSet(object, path, value);
	}

	module.exports = set;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var baseKeys = __webpack_require__(71),
	    getTag = __webpack_require__(47),
	    isArrayLike = __webpack_require__(8),
	    isString = __webpack_require__(14),
	    stringSize = __webpack_require__(214);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    setTag = '[object Set]';

	/**
	 * Gets the size of `collection` by returning its length for array-like
	 * values or the number of own enumerable string keyed properties for objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to inspect.
	 * @returns {number} Returns the collection size.
	 * @example
	 *
	 * _.size([1, 2, 3]);
	 * // => 3
	 *
	 * _.size({ 'a': 1, 'b': 2 });
	 * // => 2
	 *
	 * _.size('pebbles');
	 * // => 7
	 */
	function size(collection) {
	  if (collection == null) {
	    return 0;
	  }
	  if (isArrayLike(collection)) {
	    return isString(collection) ? stringSize(collection) : collection.length;
	  }
	  var tag = getTag(collection);
	  if (tag == mapTag || tag == setTag) {
	    return collection.size;
	  }
	  return baseKeys(collection).length;
	}

	module.exports = size;


/***/ },
/* 99 */
/***/ function(module, exports) {

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	module.exports = stubArray;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var toFinite = __webpack_require__(243);

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;

	  return result === result ? (remainder ? result - remainder : result) : 0;
	}

	module.exports = toInteger;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.verifyPasswordResetCode = exports.confirmPasswordReset = exports.resetPassword = exports.createUser = exports.logout = exports.login = exports.init = exports.createUserProfile = exports.watchUserProfile = exports.unWatchUserProfile = exports.dispatchLogin = exports.dispatchUnauthorizedError = exports.dispatchLoginError = undefined;

	var _get2 = __webpack_require__(52);

	var _get3 = _interopRequireDefault(_get2);

	var _set2 = __webpack_require__(97);

	var _set3 = _interopRequireDefault(_set2);

	var _forEach2 = __webpack_require__(51);

	var _forEach3 = _interopRequireDefault(_forEach2);

	var _isFunction2 = __webpack_require__(9);

	var _isFunction3 = _interopRequireDefault(_isFunction2);

	var _isString2 = __webpack_require__(14);

	var _isString3 = _interopRequireDefault(_isString2);

	var _isArray2 = __webpack_require__(1);

	var _isArray3 = _interopRequireDefault(_isArray2);

	var _omit2 = __webpack_require__(237);

	var _omit3 = _interopRequireDefault(_omit2);

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _jwtDecode = __webpack_require__(120);

	var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

	var _constants = __webpack_require__(4);

	var _populate = __webpack_require__(21);

	var _auth = __webpack_require__(109);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var _Promise = typeof Promise === 'undefined' ? __webpack_require__(22).Promise : Promise;

	var SET = _constants.actionTypes.SET,
	    SET_PROFILE = _constants.actionTypes.SET_PROFILE,
	    LOGIN = _constants.actionTypes.LOGIN,
	    LOGOUT = _constants.actionTypes.LOGOUT,
	    LOGIN_ERROR = _constants.actionTypes.LOGIN_ERROR,
	    UNAUTHORIZED_ERROR = _constants.actionTypes.UNAUTHORIZED_ERROR,
	    AUTHENTICATION_INIT_STARTED = _constants.actionTypes.AUTHENTICATION_INIT_STARTED,
	    AUTHENTICATION_INIT_FINISHED = _constants.actionTypes.AUTHENTICATION_INIT_FINISHED;

	/**
	 * @description Dispatch login error action
	 * @param {Function} dispatch - Action dispatch function
	 * @param {Object} authError - Error object
	 * @private
	 */

	var dispatchLoginError = exports.dispatchLoginError = function dispatchLoginError(dispatch, authError) {
	  return dispatch({
	    type: LOGIN_ERROR,
	    authError: authError
	  });
	};

	/**
	 * @description Dispatch login error action
	 * @param {Function} dispatch - Action dispatch function
	 * @param {Object} authError - Error object
	 * @private
	 */
	var dispatchUnauthorizedError = exports.dispatchUnauthorizedError = function dispatchUnauthorizedError(dispatch, authError) {
	  return dispatch({
	    type: UNAUTHORIZED_ERROR,
	    authError: authError
	  });
	};

	/**
	 * @description Dispatch login action
	 * @param {Function} dispatch - Action dispatch function
	 * @param {Object} auth - Auth data object
	 * @private
	 */
	var dispatchLogin = exports.dispatchLogin = function dispatchLogin(dispatch, auth) {
	  return dispatch({
	    type: LOGIN,
	    auth: auth,
	    authError: null
	  });
	};

	/**
	 * @description Remove listener from user profile
	 * @param {Object} firebase - Internal firebase object
	 * @private
	 */
	var unWatchUserProfile = exports.unWatchUserProfile = function unWatchUserProfile(firebase) {
	  var authUid = firebase._.authUid;
	  var userProfile = firebase._.config.userProfile;
	  if (firebase._.profileWatch) {
	    firebase.database().ref().child(userProfile + '/' + authUid).off('value', firebase._.profileWatch);
	    firebase._.profileWatch = null;
	  }
	};

	/**
	 * @description Watch user profile
	 * @param {Function} dispatch - Action dispatch function
	 * @param {Object} firebase - Internal firebase object
	 * @private
	 */
	var watchUserProfile = exports.watchUserProfile = function watchUserProfile(dispatch, firebase) {
	  var authUid = firebase._.authUid;
	  var userProfile = firebase._.config.userProfile;
	  unWatchUserProfile(firebase);

	  if (firebase._.config.userProfile) {
	    firebase._.profileWatch = firebase.database().ref().child(userProfile + '/' + authUid).on('value', function (snap) {
	      var _firebase$_$config = firebase._.config,
	          profileParamsToPopulate = _firebase$_$config.profileParamsToPopulate,
	          autoPopulateProfile = _firebase$_$config.autoPopulateProfile,
	          setProfilePopulateResults = _firebase$_$config.setProfilePopulateResults;

	      if (!profileParamsToPopulate || !(0, _isArray3.default)(profileParamsToPopulate) && !(0, _isString3.default)(profileParamsToPopulate)) {
	        dispatch({
	          type: SET_PROFILE,
	          profile: snap.val()
	        });
	      } else {
	        // Convert each populate string in array into an array of once query promises
	        (0, _populate.promisesForPopulate)(firebase, snap.val(), profileParamsToPopulate).then(function (data) {
	          // Dispatch action with profile combined with populated parameters
	          // Auto Populate profile
	          if (autoPopulateProfile) {
	            var populates = (0, _populate.getPopulateObjs)(profileParamsToPopulate);
	            var profile = snap.val();
	            (0, _forEach3.default)(populates, function (p) {
	              (0, _set3.default)(profile, p.child, (0, _get3.default)(data, p.root + '.' + snap.val()[p.child]));
	            });
	            dispatch({
	              type: SET_PROFILE,
	              profile: profile
	            });
	          } else {
	            // dispatch with unpopulated profile data
	            dispatch({
	              type: SET_PROFILE,
	              profile: snap.val()
	            });
	          }

	          // Fire actions for placement of data gathered in populate into redux
	          if (setProfilePopulateResults) {
	            (0, _forEach3.default)(data, function (result, path) {
	              dispatch({
	                type: SET,
	                path: path,
	                data: result,
	                timestamp: Date.now(),
	                requesting: false,
	                requested: true
	              });
	            });
	          }
	        });
	      }
	    });
	  }
	};

	/**
	 * @description Create user profile if it does not already exist. `updateProifleOnLogin: false`
	 * can be passed to config to dsiable updating. Profile factory is applied if it exists and is a function.
	 * @param {Function} dispatch - Action dispatch function
	 * @param {Object} firebase - Internal firebase object
	 * @param {Object} userData - User data object (response from authenticating)
	 * @param {Object} profile - Profile data to place in new profile
	 * @return {Promise}
	 * @private
	 */
	var createUserProfile = exports.createUserProfile = function createUserProfile(dispatch, firebase, userData, profile) {
	  if (!firebase._.config.userProfile) {
	    return _Promise.resolve(userData);
	  }
	  var database = firebase.database,
	      config = firebase._.config;

	  if ((0, _isFunction3.default)(config.profileFactory)) {
	    profile = config.profileFactory(userData, profile);
	  }
	  if ((0, _isFunction3.default)(config.profileDecorator)) {
	    if ((0, _isFunction3.default)(console.warn)) {
	      // eslint-disable-line no-console
	      console.warn('profileDecorator is Depreceated and will be removed in future versions. Please use profileFactory.'); // eslint-disable-line no-console
	    }
	    profile = config.profileDecorator(userData, profile);
	  }
	  // Check for user's profile at userProfile path if provided
	  return database().ref().child(config.userProfile + '/' + userData.uid).once('value').then(function (profileSnap) {
	    return (
	      // update profile only if doesn't exist or if set by config
	      !config.updateProfileOnLogin && profileSnap.val() !== null ? profileSnap.val() : profileSnap.ref.update(profile) // Update the profile
	      .then(function () {
	        return profile;
	      }).catch(function (err) {
	        // Error setting profile
	        dispatchUnauthorizedError(dispatch, err);
	        return _Promise.reject(err);
	      })
	    );
	  }).catch(function (err) {
	    // Error reading user profile
	    dispatchUnauthorizedError(dispatch, err);
	    return _Promise.reject(err);
	  });
	};

	/**
	 * @description Initialize authentication state change listener that
	 * watches user profile and dispatches login action
	 * @param {Function} dispatch - Action dispatch function
	 * @private
	 */
	var init = exports.init = function init(dispatch, firebase) {
	  dispatch({ type: AUTHENTICATION_INIT_STARTED });

	  firebase.auth().onAuthStateChanged(function (authData) {
	    if (!authData) {
	      return dispatch({ type: LOGOUT });
	    }

	    firebase._.authUid = authData.uid;
	    watchUserProfile(dispatch, firebase);

	    dispatchLogin(dispatch, authData);

	    // Run onAuthStateChanged if it exists in config
	    if (firebase._.config.onAuthStateChanged) {
	      firebase._.config.onAuthStateChanged(authData, firebase);
	    }
	  });

	  if (firebase._.config.enableRedirectHandling) {
	    firebase.auth().getRedirectResult().then(function (authData) {
	      if (authData && authData.user) {
	        var user = authData.user;


	        firebase._.authUid = user.uid;
	        watchUserProfile(dispatch, firebase);

	        dispatchLogin(dispatch, user);

	        createUserProfile(dispatch, firebase, user, {
	          email: user.email,
	          displayName: user.providerData[0].displayName || user.email,
	          avatarUrl: user.providerData[0].photoURL,
	          providerData: user.providerData
	        });
	      }
	    }).catch(function (error) {
	      dispatchLoginError(dispatch, error);
	      return _Promise.reject(error);
	    });
	  }

	  firebase.auth().currentUser;

	  dispatch({ type: AUTHENTICATION_INIT_FINISHED });
	};

	/**
	 * @description Login with errors dispatched
	 * @param {Function} dispatch - Action dispatch function
	 * @param {Object} firebase - Internal firebase object
	 * @param {Object} credentials - Login credentials
	 * @param {Object} credentials.email - Email to login with (only needed for email login)
	 * @param {Object} credentials.password - Password to login with (only needed for email login)
	 * @param {Object} credentials.provider - Provider name such as google, twitter (only needed for 3rd party provider login)
	 * @param {Object} credentials.type - Popup or redirect (only needed for 3rd party provider login)
	 * @param {Object} credentials.token - Custom or provider token
	 * @return {Promise}
	 * @private
	 */
	var login = exports.login = function login(dispatch, firebase, credentials) {
	  var _firebase$auth;

	  dispatchLoginError(dispatch, null);

	  var _getLoginMethodAndPar = (0, _auth.getLoginMethodAndParams)(firebase, credentials),
	      method = _getLoginMethodAndPar.method,
	      params = _getLoginMethodAndPar.params;

	  return (_firebase$auth = firebase.auth())[method].apply(_firebase$auth, _toConsumableArray(params)).then(function (userData) {
	    // Handle null response from getRedirectResult before redirect has happened
	    if (!userData) return _Promise.resolve(null);

	    // For email auth return uid (createUser is used for creating a profile)
	    if (userData.email) return userData.uid;

	    // For token auth, the user key doesn't exist. Instead, return the JWT.
	    if (method === 'signInWithCustomToken') {
	      // Extract the extra data in the JWT token for user object
	      var _userData$toJSON = userData.toJSON(),
	          accessToken = _userData$toJSON.stsTokenManager.accessToken,
	          uid = _userData$toJSON.uid;

	      var extraJWTData = (0, _omit3.default)((0, _jwtDecode2.default)(accessToken), _constants.defaultJWTProps);

	      return createUserProfile(dispatch, firebase, { uid: uid }, _extends({}, extraJWTData, { uid: uid }));
	    }

	    // Create profile when logging in with external provider
	    var user = userData.user;


	    return createUserProfile(dispatch, firebase, user, {
	      email: user.email,
	      displayName: user.providerData[0].displayName || user.email,
	      avatarUrl: user.providerData[0].photoURL,
	      providerData: user.providerData
	    });
	  }).catch(function (err) {
	    dispatchLoginError(dispatch, err);
	    return _Promise.reject(err);
	  });
	};

	/**
	 * @description Logout of firebase and dispatch logout event
	 * @param {Function} dispatch - Action dispatch function
	 * @param {Object} firebase - Internal firebase object
	 * @private
	 */
	var logout = exports.logout = function logout(dispatch, firebase) {
	  firebase.auth().signOut();
	  dispatch({ type: LOGOUT });
	  firebase._.authUid = null;
	  unWatchUserProfile(firebase);
	  return _Promise.resolve(firebase);
	};

	/**
	 * @description Create a new user in auth and add an account to userProfile root
	 * @param {Function} dispatch - Action dispatch function
	 * @param {Object} firebase - Internal firebase object
	 * @param {Object} credentials - Login credentials
	 * @return {Promise}
	 * @private
	 */
	var createUser = exports.createUser = function createUser(dispatch, firebase, _ref, profile) {
	  var email = _ref.email,
	      password = _ref.password,
	      signIn = _ref.signIn;

	  dispatchLoginError(dispatch, null);

	  if (!email || !password) {
	    dispatchLoginError(dispatch, new Error('Email and Password are required to create user'));
	    return _Promise.reject(new Error('Email and Password are Required'));
	  }

	  return firebase.auth().createUserWithEmailAndPassword(email, password).then(function (userData) {
	    return (
	      // Login to newly created account if signIn flag is not set to false
	      firebase.auth().currentUser || !!signIn && signIn === false ? createUserProfile(dispatch, firebase, userData, profile || { email: email }) : login(dispatch, firebase, { email: email, password: password }).then(function () {
	        return createUserProfile(dispatch, firebase, userData, profile || { email: email });
	      }).catch(function (err) {
	        if (err) {
	          switch (err.code) {
	            case 'auth/user-not-found':
	              dispatchLoginError(dispatch, new Error('The specified user account does not exist.'));
	              break;
	            default:
	              dispatchLoginError(dispatch, err);
	          }
	        }
	        return _Promise.reject(err);
	      })
	    );
	  }).catch(function (err) {
	    dispatchLoginError(dispatch, err);
	    return _Promise.reject(err);
	  });
	};

	/**
	 * @description Send password reset email to provided email
	 * @param {Function} dispatch - Action dispatch function
	 * @param {Object} firebase - Internal firebase object
	 * @param {String} email - Email to send recovery email to
	 * @return {Promise}
	 * @private
	 */
	var resetPassword = exports.resetPassword = function resetPassword(dispatch, firebase, email) {
	  dispatchLoginError(dispatch, null);
	  return firebase.auth().sendPasswordResetEmail(email).catch(function (err) {
	    if (err) {
	      switch (err.code) {
	        case 'auth/user-not-found':
	          dispatchLoginError(dispatch, new Error('The specified user account does not exist.'));
	          break;
	        default:
	          dispatchLoginError(dispatch, err);
	      }
	      return _Promise.reject(err);
	    }
	  });
	};

	/**
	 * @description Confirm the password reset with code and password
	 * @param {Function} dispatch - Action dispatch function
	 * @param {Object} firebase - Internal firebase object
	 * @param {String} code - Email confirmation reset code
	 * @param {String} password - Password to set it to
	 * @return {Promise}
	 * @private
	 */
	var confirmPasswordReset = exports.confirmPasswordReset = function confirmPasswordReset(dispatch, firebase, code, password) {
	  dispatchLoginError(dispatch, null);
	  return firebase.auth().confirmPasswordReset(code, password).catch(function (err) {
	    if (err) {
	      switch (err.code) {
	        case 'auth/expired-action-code':
	          dispatchLoginError(dispatch, new Error('The action code has expired.'));
	          break;
	        case 'auth/invalid-action-code':
	          dispatchLoginError(dispatch, new Error('The action code is invalid.'));
	          break;
	        case 'auth/user-disabled':
	          dispatchLoginError(dispatch, new Error('The user is disabled.'));
	          break;
	        case 'auth/user-not-found':
	          dispatchLoginError(dispatch, new Error('The user is not found.'));
	          break;
	        case 'auth/weak-password':
	          dispatchLoginError(dispatch, new Error('The password is not strong enough.'));
	          break;
	        default:
	          dispatchLoginError(dispatch, err);
	      }
	      return _Promise.reject(err);
	    }
	  });
	};

	/**
	 * @description Verify that password reset code is valid
	 * @param {Function} dispatch - Action dispatch function
	 * @param {Object} firebase - Internal firebase object
	 * @param {String} code - Password reset code
	 * @return {Promise} email - Email associated with reset code
	 * @private
	 */
	var verifyPasswordResetCode = exports.verifyPasswordResetCode = function verifyPasswordResetCode(dispatch, firebase, code) {
	  dispatchLoginError(dispatch, null);
	  return firebase.auth().verifyPasswordResetCode(code).catch(function (err) {
	    if (err) {
	      dispatchLoginError(dispatch, err);
	    }
	    return _Promise.reject(err);
	  });
	};

	exports.default = {
	  dispatchLoginError: dispatchLoginError,
	  dispatchUnauthorizedError: dispatchUnauthorizedError,
	  dispatchLogin: dispatchLogin,
	  unWatchUserProfile: unWatchUserProfile,
	  watchUserProfile: watchUserProfile,
	  init: init,
	  createUserProfile: createUserProfile,
	  login: login,
	  logout: logout,
	  createUser: createUser,
	  resetPassword: resetPassword,
	  confirmPasswordReset: confirmPasswordReset,
	  verifyPasswordResetCode: verifyPasswordResetCode
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.storageActions = exports.queryActions = exports.authActions = undefined;

	var _auth = __webpack_require__(101);

	var authActions = _interopRequireWildcard(_auth);

	var _query = __webpack_require__(57);

	var queryActions = _interopRequireWildcard(_query);

	var _storage = __webpack_require__(103);

	var storageActions = _interopRequireWildcard(_storage);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.authActions = authActions;
	exports.queryActions = queryActions;
	exports.storageActions = storageActions;
	exports.default = { authActions: authActions, queryActions: queryActions, storageActions: storageActions };

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.deleteFile = exports.uploadFiles = exports.uploadFile = exports.uploadFileWithProgress = undefined;

	var _isFunction2 = __webpack_require__(9);

	var _isFunction3 = _interopRequireDefault(_isFunction2);

	var _map2 = __webpack_require__(35);

	var _map3 = _interopRequireDefault(_map2);

	var _constants = __webpack_require__(4);

	var _actions = __webpack_require__(108);

	var _storage = __webpack_require__(111);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _Promise = typeof Promise === 'undefined' ? __webpack_require__(22).Promise : Promise;

	var FILE_UPLOAD_START = _constants.actionTypes.FILE_UPLOAD_START,
	    FILE_UPLOAD_ERROR = _constants.actionTypes.FILE_UPLOAD_ERROR,
	    FILE_UPLOAD_PROGRESS = _constants.actionTypes.FILE_UPLOAD_PROGRESS,
	    FILE_UPLOAD_COMPLETE = _constants.actionTypes.FILE_UPLOAD_COMPLETE,
	    FILE_DELETE_START = _constants.actionTypes.FILE_DELETE_START,
	    FILE_DELETE_ERROR = _constants.actionTypes.FILE_DELETE_ERROR,
	    FILE_DELETE_COMPLETE = _constants.actionTypes.FILE_DELETE_COMPLETE;

	/**
	 * @description Upload a file with actions fired for progress, success, and errors
	 * @param {Function} dispatch - Action dispatch function
	 * @param {Object} firebase - Internal firebase object
	 * @param {Object} opts - File data object
	 * @param {Object} opts.path - Location within Firebase Stroage at which to upload file.
	 * @param {Blob} opts.file - File to upload
	 * @private
	 */

	var uploadFileWithProgress = exports.uploadFileWithProgress = function uploadFileWithProgress(dispatch, firebase, _ref) {
	  var path = _ref.path,
	      file = _ref.file;

	  dispatch({
	    type: FILE_UPLOAD_START,
	    payload: { path: path, file: file }
	  });
	  var uploadEvent = firebase.storage().ref(path + '/' + file.name).put(file);
	  // TODO: Allow config to control whether progress it set to state or not
	  var unListen = uploadEvent.on(firebase.storage.TaskEvent.STATE_CHANGED, {
	    next: function next(snapshot) {
	      var percent = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100);
	      dispatch({
	        type: FILE_UPLOAD_PROGRESS,
	        path: path,
	        payload: { snapshot: snapshot, percent: percent }
	      });
	    },
	    error: function error(err) {
	      dispatch({ type: FILE_UPLOAD_ERROR, path: path, payload: err });
	      unListen();
	    },
	    complete: function complete() {
	      dispatch({ type: FILE_UPLOAD_COMPLETE, path: path, payload: file });
	      unListen();
	    }
	  });
	  return uploadEvent;
	};

	/**
	 * @description Upload file to Firebase Storage with option to store
	 * file metadata within Firebase Database
	 * @param {Function} dispatch - Action dispatch function
	 * @param {Object} firebase - Internal firebase object
	 * @param {Object} opts - Options object
	 * @param {String} opts.path - Location within Firebase Stroage at which to upload files.
	 * @param {Blob} opts.file - File Blob to be uploaded
	 * @param {String} opts.dbPath - Datbase path to write file meta data to
	 * @private
	 */
	var uploadFile = exports.uploadFile = function uploadFile(dispatch, firebase, _ref2) {
	  var path = _ref2.path,
	      file = _ref2.file,
	      dbPath = _ref2.dbPath;
	  return uploadFileWithProgress(dispatch, firebase, { path: path, file: file }).then(function (res) {
	    if (!dbPath) {
	      return res;
	    }
	    var _res$metadata = res.metadata,
	        name = _res$metadata.name,
	        fullPath = _res$metadata.fullPath,
	        downloadURLs = _res$metadata.downloadURLs;
	    var fileMetadataFactory = firebase._.config.fileMetadataFactory;

	    // Apply fileMetadataFactory if it exists in config

	    var fileData = (0, _isFunction3.default)(fileMetadataFactory) ? fileMetadataFactory(res) : { name: name, fullPath: fullPath, downloadURL: downloadURLs[0] };

	    return firebase.database().ref(dbPath).push(fileData);
	  });
	};

	/**
	 * @description Upload multiple files to Firebase Storage with option to store
	 * file's metadata within Firebase Database
	 * @param {Function} dispatch - Action dispatch function
	 * @param {Object} firebase - Internal firebase object
	 * @param {Object} opts - Options object
	 * @param {String} opts.path - Storage path to write files to
	 * @param {Array} opts.files - List of files to be uploaded
	 * @param {String} opts.dbPath - Datbase path to write file meta data to
	 * @private
	 */
	var uploadFiles = exports.uploadFiles = function uploadFiles(dispatch, firebase, _ref3) {
	  var path = _ref3.path,
	      files = _ref3.files,
	      dbPath = _ref3.dbPath;
	  return _Promise.all((0, _map3.default)(files, function (file) {
	    return uploadFile(dispatch, firebase, { path: path, file: file, dbPath: dbPath });
	  }));
	};

	/**
	 * @description Delete File from Firebase Storage with option to remove meta
	 * @param {Function} dispatch - Action dispatch function
	 * @param {Object} firebase - Internal firebase object
	 * @param {Object} opts - Options object
	 * @param {String} opts.path - Storage path to write files to
	 * @param {String} opts.dbPath - Datbase path to write file meta data to
	 * @private
	 */
	var deleteFile = exports.deleteFile = function deleteFile(dispatch, firebase, _ref4) {
	  var path = _ref4.path,
	      dbPath = _ref4.dbPath;
	  return (0, _actions.wrapInDispatch)(dispatch, {
	    method: _storage.deleteFile,
	    args: [firebase, { path: path, dbPath: dbPath }],
	    types: [FILE_DELETE_START, FILE_DELETE_COMPLETE, FILE_DELETE_ERROR]
	  });
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getFirebase = undefined;

	var _firebase = __webpack_require__(114);

	var Firebase = _interopRequireWildcard(_firebase);

	var _constants = __webpack_require__(4);

	var _utils = __webpack_require__(58);

	var _actions = __webpack_require__(102);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var _Promise = typeof Promise === 'undefined' ? __webpack_require__(22).Promise : Promise;

	var firebaseInstance = void 0;

	/**
	 * @name reactReduxFirebase
	 * @external
	 * @description Middleware that handles configuration (placed in redux's
	 * `compose` call)
	 * @property {Object} fbConfig - Object containing Firebase config including
	 * databaseURL
	 * @property {String} fbConfig.apiKey - Firebase apiKey
	 * @property {String} fbConfig.authDomain - Firebase auth domain
	 * @property {String} fbConfig.databaseURL - Firebase database url
	 * @property {String} fbConfig.storageBucket - Firebase storage bucket
	 * @property {Object} config - Containing react-redux-firebase specific config
	 * such as userProfile
	 * @property {String} config.userProfile - Location on firebase to store user
	 * profiles
	 * @property {Boolean} config.enableLogging - Whether or not to enable Firebase
	 * database logging
	 * @property {Boolean} config.updateProfileOnLogin - Whether or not to update
	 * profile when logging in. (default: `false`)
	 * @property {Boolean} config.enableRedirectHandling - Whether or not to enable
	 * auth redirect handling listener. (default: `true`)
	 * @property {Function} config.profileFactory - Factory for modifying how user profile is saved.
	 * @property {Function} config.uploadFileDataFactory - Factory for modifying how file meta data is written during file uploads
	 * @property {Array|String} config.profileParamsToPopulate - Parameters within
	 * profile object to populate
	 * @property {Boolean} config.autoPopulateProfile - Whether or not to
	 * automatically populate profile with data loaded through
	 * profileParamsToPopulate config. (default: `true`)
	 * @property {Boolean} config.setProfilePopulateResults - Whether or not to
	 * call SET actions for data that results from populating profile to redux under
	 * the data path. For example: role paramter on profile populated from 'roles'
	 * root. True will call SET_PROFILE as well as a SET action with the role that
	 * is loaded (places it in data/roles). (default: `false`)
	 * @return {Function} That accepts a component a returns a wrapped version of component
	 * @example <caption>Setup</caption>
	 * import { createStore, compose } from 'redux'
	 * import { reactReduxFirebase } from 'react-redux-firebase'

	 * // React Redux Firebase Config
	 * const config = {
	 *   userProfile: 'users', // saves user profiles to '/users' on Firebase
	 *   // here is where you place other config options
	 * }
	 *
	 * // Add react-redux-firebase to compose
	 * // Note: In full projects this will often be within createStore.js or store.js
	 * const createStoreWithFirebase = compose(
	 *  reactReduxFirebase(fbConfig, config),
	 * )(createStore)
	 *
	 * // Use Function later to create store
	 * const store = createStoreWithFirebase(rootReducer, initialState)
	 */

	exports.default = function (fbConfig, otherConfig) {
	  return function (next) {
	    return function (reducer, initialState, middleware) {
	      var store = next(reducer, initialState, middleware);
	      var dispatch = store.dispatch;

	      // Combine all configs

	      var configs = Object.assign({}, _constants.defaultConfig, fbConfig, otherConfig);

	      (0, _utils.validateConfig)(configs);

	      // Initialize Firebase
	      try {
	        Firebase.initializeApp(fbConfig);
	      } catch (err) {} // silence reinitialize warning (hot-reloading)

	      // Enable Logging based on config
	      if (configs.enableLogging) {
	        Firebase.database.enableLogging(configs.enableLogging);
	      }

	      var rootRef = Firebase.database().ref();

	      var firebase = Object.defineProperty(Firebase, '_', {
	        value: {
	          watchers: {},
	          config: configs,
	          authUid: null
	        },
	        writable: true,
	        enumerable: true,
	        configurable: true
	      });

	      var set = function set(path, value, onComplete) {
	        return rootRef.child(path).set(value, onComplete);
	      };

	      var push = function push(path, value, onComplete) {
	        return rootRef.child(path).push(value, onComplete);
	      };

	      var update = function update(path, value, onComplete) {
	        return rootRef.child(path).update(value, onComplete);
	      };

	      var remove = function remove(path, onComplete) {
	        return rootRef.child(path).remove(onComplete);
	      };

	      var uniqueSet = function uniqueSet(path, value, onComplete) {
	        return rootRef.child(path).once('value').then(function (snap) {
	          if (snap.val && snap.val() !== null) {
	            var err = new Error('Path already exists.');
	            if (onComplete) onComplete(err);
	            return _Promise.reject(err);
	          }
	          return rootRef.child(path).set(value, onComplete);
	        });
	      };

	      var uploadFile = function uploadFile(path, file, dbPath) {
	        return _actions.storageActions.uploadFile(dispatch, firebase, { path: path, file: file, dbPath: dbPath });
	      };

	      var uploadFiles = function uploadFiles(path, files, dbPath) {
	        return _actions.storageActions.uploadFiles(dispatch, firebase, { path: path, files: files, dbPath: dbPath });
	      };

	      var deleteFile = function deleteFile(path, dbPath) {
	        return _actions.storageActions.deleteFile(dispatch, firebase, { path: path, dbPath: dbPath });
	      };

	      var watchEvent = function watchEvent(type, path, storeAs) {
	        return _actions.queryActions.watchEvent(firebase, dispatch, { type: type, path: path, storeAs: storeAs });
	      };

	      var unWatchEvent = function unWatchEvent(eventName, eventPath) {
	        var queryId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
	        return _actions.queryActions.unWatchEvent(firebase, eventName, eventPath, queryId);
	      };

	      var login = function login(credentials) {
	        return _actions.authActions.login(dispatch, firebase, credentials);
	      };

	      var logout = function logout() {
	        return _actions.authActions.logout(dispatch, firebase);
	      };

	      var createUser = function createUser(credentials, profile) {
	        return _actions.authActions.createUser(dispatch, firebase, credentials, profile);
	      };

	      var resetPassword = function resetPassword(credentials) {
	        return _actions.authActions.resetPassword(dispatch, firebase, credentials);
	      };

	      var confirmPasswordReset = function confirmPasswordReset(code, password) {
	        return _actions.authActions.confirmPasswordReset(dispatch, firebase, code, password);
	      };

	      var verifyPasswordResetCode = function verifyPasswordResetCode(code) {
	        return _actions.authActions.verifyPasswordResetCode(dispatch, firebase, code);
	      };

	      firebase.helpers = {
	        ref: function ref(path) {
	          return Firebase.database().ref(path);
	        },
	        set: set,
	        uniqueSet: uniqueSet,
	        push: push,
	        remove: remove,
	        update: update,
	        login: login,
	        logout: logout,
	        uploadFile: uploadFile,
	        uploadFiles: uploadFiles,
	        deleteFile: deleteFile,
	        createUser: createUser,
	        resetPassword: resetPassword,
	        confirmPasswordReset: confirmPasswordReset,
	        verifyPasswordResetCode: verifyPasswordResetCode,
	        watchEvent: watchEvent,
	        unWatchEvent: unWatchEvent,
	        storage: function storage() {
	          return Firebase.storage();
	        }
	      };

	      _actions.authActions.init(dispatch, firebase);

	      store.firebase = firebase;
	      firebaseInstance = Object.assign({}, firebase, firebase.helpers);

	      return store;
	    };
	  };
	};

	/**
	 * @external
	 * @description Expose Firebase instance created internally. Useful for
	 * integrations into external libraries such as redux-thunk and redux-observable.
	 * @example <caption>redux-thunk integration</caption>
	 * import { applyMiddleware, compose, createStore } from 'redux';
	 * import thunk from 'redux-thunk';
	 * import { reactReduxFirebase } from 'react-redux-firebase';
	 * import makeRootReducer from './reducers';
	 * import { getFirebase } from 'react-redux-firebase';
	 *
	 * const fbConfig = {} // your firebase config
	 *
	 * const store = createStore(
	 *   makeRootReducer(),
	 *   initialState,
	 *   compose(
	 *     applyMiddleware([
	 *       // Pass getFirebase function as extra argument
	 *       thunk.withExtraArgument(getFirebase)
	 *     ]),
	 *     reactReduxFirebase(fbConfig)
	 *   )
	 * );
	 * // then later
	 * export const addTodo = (newTodo) =>
	 *  (dispatch, getState, getFirebase) => {
	 *    const firebase = getFirebase()
	 *    firebase
	 *      .push('todos', newTodo)
	 *      .then(() => {
	 *        dispatch({ type: 'SOME_ACTION' })
	 *      })
	 * };
	 *
	 */


	var getFirebase = exports.getFirebase = function getFirebase() {
	  // TODO: Handle recieveing config and creating firebase instance if it doesn't exist
	  /* istanbul ignore next: Firebase instance always exists during tests */
	  if (!firebaseInstance) {
	    throw new Error('Firebase instance does not yet exist. Check your compose function.'); // eslint-disable-line no-console
	  }
	  // TODO: Create new firebase here with config passed in
	  return firebaseInstance;
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isEqual2 = __webpack_require__(232);

	var _isEqual3 = _interopRequireDefault(_isEqual2);

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(248);

	var _react2 = _interopRequireDefault(_react);

	var _query = __webpack_require__(57);

	var _utils = __webpack_require__(58);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @name firebaseConnect
	 * @extends React.Component
	 * @description Higher Order Component that automatically listens/unListens
	 * to provided firebase paths using React's Lifecycle hooks.
	 * @param {Array} watchArray - Array of objects or strings for paths to sync from Firebase
	 * @return {Function} - that accepts a component to wrap and returns the wrapped component
	 * @example <caption>Basic</caption>
	 * // this.props.firebase set on App component as firebase object with helpers
	 * import { firebaseConnect } from 'react-redux-firebase'
	 * export default firebaseConnect()(App)
	 * @example <caption>Data</caption>
	 * import { connect } from 'react-redux'
	 * import { firebaseConnect, dataToJS } from 'react-redux-firebase'
	 *
	 * // sync /todos from firebase into redux
	 * const fbWrapped = firebaseConnect([
	 *   'todos'
	 * ])(App)
	 *
	 * // pass todos list from redux as this.props.todosList
	 * export default connect(({ firebase }) => ({
	 *   todosList: dataToJS(firebase, 'todos'),
	 *   profile: pathToJS(firebase, 'profile'), // pass profile data as this.props.proifle
	 *   auth: pathToJS(firebase, 'auth') // pass auth data as this.props.auth
	 * }))(fbWrapped)
	 */
	exports.default = function () {
	  var dataOrFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  return function (WrappedComponent) {
	    var FirebaseConnect = function (_Component) {
	      _inherits(FirebaseConnect, _Component);

	      function FirebaseConnect(props, context) {
	        _classCallCheck(this, FirebaseConnect);

	        var _this = _possibleConstructorReturn(this, (FirebaseConnect.__proto__ || Object.getPrototypeOf(FirebaseConnect)).call(this, props, context));

	        _this._firebaseEvents = [];
	        _this.firebase = null;
	        return _this;
	      }

	      _createClass(FirebaseConnect, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	          var _context$store = this.context.store,
	              firebase = _context$store.firebase,
	              dispatch = _context$store.dispatch;

	          // Allow function to be passed

	          var inputAsFunc = (0, _utils.createCallable)(dataOrFn);
	          this.prevData = inputAsFunc(this.props, firebase);

	          var ref = firebase.ref,
	              helpers = firebase.helpers,
	              storage = firebase.storage,
	              database = firebase.database,
	              auth = firebase.auth;

	          this.firebase = _extends({ ref: ref, storage: storage, database: database, auth: auth }, helpers);

	          this._firebaseEvents = (0, _utils.getEventsFromInput)(this.prevData);

	          (0, _query.watchEvents)(firebase, dispatch, this._firebaseEvents);
	        }
	      }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	          var _context$store2 = this.context.store,
	              firebase = _context$store2.firebase,
	              dispatch = _context$store2.dispatch;

	          (0, _query.unWatchEvents)(firebase, dispatch, this._firebaseEvents);
	        }
	      }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(np) {
	          var _context$store3 = this.context.store,
	              firebase = _context$store3.firebase,
	              dispatch = _context$store3.dispatch;

	          var inputAsFunc = (0, _utils.createCallable)(dataOrFn);
	          var data = inputAsFunc(np, firebase);

	          // Handle a data parameter having changed
	          if (!(0, _isEqual3.default)(data, this.prevData)) {
	            this.prevData = data;
	            // UnWatch all current events
	            (0, _query.unWatchEvents)(firebase, dispatch, this._firebaseEvents);
	            // Get watch events from new data
	            this._firebaseEvents = (0, _utils.getEventsFromInput)(data);
	            // Watch new events
	            (0, _query.watchEvents)(firebase, dispatch, this._firebaseEvents);
	          }
	        }
	      }, {
	        key: 'render',
	        value: function render() {
	          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.state, {
	            firebase: this.firebase
	          }));
	        }
	      }]);

	      return FirebaseConnect;
	    }(_react.Component);

	    FirebaseConnect.contextTypes = {
	      store: _react.PropTypes.object.isRequired
	    };


	    return FirebaseConnect;
	  };
	};

	module.exports = exports['default'];

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.customToJS = exports.populatedDataToJS = exports.buildChildList = exports.orderedToJS = exports.dataToJS = exports.pathToJS = exports.toJS = exports.fixPath = exports.isEmpty = exports.isLoaded = undefined;

	var _defaultsDeep2 = __webpack_require__(221);

	var _defaultsDeep3 = _interopRequireDefault(_defaultsDeep2);

	var _isString2 = __webpack_require__(14);

	var _isString3 = _interopRequireDefault(_isString2);

	var _reduce2 = __webpack_require__(239);

	var _reduce3 = _interopRequireDefault(_reduce2);

	var _mapValues2 = __webpack_require__(234);

	var _mapValues3 = _interopRequireDefault(_mapValues2);

	var _drop2 = __webpack_require__(222);

	var _drop3 = _interopRequireDefault(_drop2);

	var _first2 = __webpack_require__(225);

	var _first3 = _interopRequireDefault(_first2);

	var _some2 = __webpack_require__(241);

	var _some3 = _interopRequireDefault(_some2);

	var _map2 = __webpack_require__(35);

	var _map3 = _interopRequireDefault(_map2);

	var _size2 = __webpack_require__(98);

	var _size3 = _interopRequireDefault(_size2);

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _populate = __webpack_require__(21);

	var _constants = __webpack_require__(4);

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

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dropRight2 = __webpack_require__(223);

	var _dropRight3 = _interopRequireDefault(_dropRight2);

	var _immutable = __webpack_require__(117);

	var _constants = __webpack_require__(4);

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

/***/ },
/* 108 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * @description Wrap method call in dispatched actions
	 * @param {Function} dispatch - Action dispatch function
	 * @param {Object} opts - Options object
	 * @param {Function} opts.method - Method to call
	 * @param {Array} opts.args - Arguments to call method with
	 * @param {Array} opts.types - Action types array ([BEFORE, SUCCESS, FAILURE])
	 * @private
	 */
	var wrapInDispatch = exports.wrapInDispatch = function wrapInDispatch(dispatch, _ref) {
	  var method = _ref.method,
	      args = _ref.args,
	      types = _ref.types;

	  dispatch({
	    type: types[0]
	  });
	  return method.apply(undefined, _toConsumableArray(args)).then(function (val) {
	    dispatch({
	      type: types[1],
	      payload: val
	    });
	  }).catch(function (err) {
	    dispatch({
	      type: types[2],
	      payload: err
	    });
	  });
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getLoginMethodAndParams = exports.createAuthProvider = undefined;

	var _isFunction2 = __webpack_require__(9);

	var _isFunction3 = _interopRequireDefault(_isFunction2);

	var _isString2 = __webpack_require__(14);

	var _isString3 = _interopRequireDefault(_isString2);

	var _isArray2 = __webpack_require__(1);

	var _isArray3 = _interopRequireDefault(_isArray2);

	var _capitalize2 = __webpack_require__(219);

	var _capitalize3 = _interopRequireDefault(_capitalize2);

	var _constants = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @description Get correct login method and params order based on provided credentials
	 * @param {Object} firebase - Internal firebase object
	 * @param {String} providerName - Name of Auth Provider (i.e. google, github, facebook, twitter)
	 * @param {Array|String} scopes - List of scopes to add to auth provider
	 * @return {Object} provider - Auth Provider
	 * @private
	 */
	var createAuthProvider = exports.createAuthProvider = function createAuthProvider(firebase, providerName, scopes) {
	  // TODO: Verify scopes are valid before adding
	  // TODO: Validate parameter inputs
	  // Verify providerName is valid
	  if (_constants.supportedAuthProviders.indexOf(providerName.toLowerCase()) === -1) {
	    throw new Error(providerName + ' is not a valid Auth Provider');
	  }
	  var provider = new firebase.auth[(0, _capitalize3.default)(providerName) + 'AuthProvider']();

	  // Handle providers without scopes
	  if (providerName.toLowerCase() === 'twitter' || !(0, _isFunction3.default)(provider.addScope)) {
	    return provider;
	  }

	  provider.addScope('email');

	  if (scopes) {
	    if ((0, _isArray3.default)(scopes)) {
	      scopes.forEach(function (scope) {
	        provider.addScope(scope);
	      });
	    }
	    if ((0, _isString3.default)(scopes)) {
	      provider.addScope(scopes);
	    }
	  }

	  return provider;
	};

	/**
	 * @description Get correct login method and params order based on provided credentials
	 * @param {Object} firebase - Internal firebase object
	 * @param {Object} credentials - Login credentials
	 * @param {String} credentials.email - Email to login with (only needed for email login)
	 * @param {String} credentials.password - Password to login with (only needed for email login)
	 * @param {String} credentials.provider - Provider name such as google, twitter (only needed for 3rd party provider login)
	 * @param {String} credentials.type - Popup or redirect (only needed for 3rd party provider login)
	 * @param {String} credentials.token - Custom or provider token
	 * @param {String} credentials.scopes - Scopes to add to provider (i.e. email)
	 * @private
	 */
	var getLoginMethodAndParams = exports.getLoginMethodAndParams = function getLoginMethodAndParams(firebase, _ref) {
	  var email = _ref.email,
	      password = _ref.password,
	      provider = _ref.provider,
	      type = _ref.type,
	      token = _ref.token,
	      scopes = _ref.scopes;

	  if (provider) {
	    if (token) {
	      return {
	        method: 'signInWithCredential',
	        params: [provider, token]
	      };
	    }
	    var authProvider = createAuthProvider(firebase, provider, scopes);
	    if (type === 'popup') {
	      return {
	        method: 'signInWithPopup',
	        params: [authProvider]
	      };
	    }
	    return {
	      method: 'signInWithRedirect',
	      params: [authProvider]
	    };
	  }
	  if (token) {
	    return {
	      method: 'signInWithCustomToken',
	      params: [token]
	    };
	  }
	  return {
	    method: 'signInWithEmailAndPassword',
	    params: [email, password]
	  };
	};

	exports.default = { getLoginMethodAndParams: getLoginMethodAndParams };

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getEventsFromInput = exports.pathStrToObj = undefined;

	var _remove2 = __webpack_require__(240);

	var _remove3 = _interopRequireDefault(_remove2);

	var _isString2 = __webpack_require__(14);

	var _isString3 = _interopRequireDefault(_isString2);

	var _isObject2 = __webpack_require__(2);

	var _isObject3 = _interopRequireDefault(_isObject2);

	var _isArray2 = __webpack_require__(1);

	var _isArray3 = _interopRequireDefault(_isArray2);

	var _flatMap2 = __webpack_require__(226);

	var _flatMap3 = _interopRequireDefault(_flatMap2);

	var _populate = __webpack_require__(21);

	var _query = __webpack_require__(59);

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

/***/ },
/* 111 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var deleteFile = exports.deleteFile = function deleteFile(firebase, _ref) {
	  var path = _ref.path,
	      dbPath = _ref.dbPath;
	  return firebase.storage().ref(path).delete().then(function () {
	    return !dbPath ? { path: path, dbPath: dbPath } : firebase // Handle option for removing file info from database
	    .database().ref(dbPath).remove().then(function () {
	      return { path: path, dbPath: dbPath };
	    });
	  });
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var firebase = __webpack_require__(15);
	(function(){
	/*! @license Firebase v3.7.1
	    Build: 3.7.1-rc.1
	    Terms: https://firebase.google.com/terms/ */
	(function(){var h,aa=aa||{},l=this,ba=function(){},m=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&
	!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},ca=function(a){return null===a},da=function(a){return"array"==m(a)},ea=function(a){var b=m(a);return"array"==b||"object"==b&&"number"==typeof a.length},p=function(a){return"string"==typeof a},fa=function(a){return"number"==typeof a},q=function(a){return"function"==m(a)},ga=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b},ha=function(a,b,
	c){return a.call.apply(a.bind,arguments)},ia=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},r=function(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ha:ia;return r.apply(null,arguments)},ja=function(a,b){var c=Array.prototype.slice.call(arguments,
	1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},ka=Date.now||function(){return+new Date},t=function(a,b){function c(){}c.prototype=b.prototype;a.pd=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Hf=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};var u=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,u);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};t(u,Error);u.prototype.name="CustomError";var la=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},ma=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},na=/&/g,oa=/</g,pa=/>/g,qa=/"/g,ra=/'/g,sa=/\x00/g,ta=/[\x00&<>"']/,v=function(a,b){return-1!=a.indexOf(b)},ua=function(a,b){return a<b?-1:a>b?1:0};var va=function(a,b){b.unshift(a);u.call(this,la.apply(null,b));b.shift()};t(va,u);va.prototype.name="AssertionError";
	var wa=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);throw new va(""+e,f||[]);},w=function(a,b,c){a||wa("",null,b,Array.prototype.slice.call(arguments,2))},xa=function(a,b){throw new va("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));},ya=function(a,b,c){fa(a)||wa("Expected number but got %s: %s.",[m(a),a],b,Array.prototype.slice.call(arguments,2));return a},za=function(a,b,c){p(a)||wa("Expected string but got %s: %s.",[m(a),a],b,Array.prototype.slice.call(arguments,
	2))},Aa=function(a,b,c){q(a)||wa("Expected function but got %s: %s.",[m(a),a],b,Array.prototype.slice.call(arguments,2))};var Ba=Array.prototype.indexOf?function(a,b,c){w(null!=a.length);return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},x=Array.prototype.forEach?function(a,b,c){w(null!=a.length);Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ca=function(a,b){for(var c=p(a)?
	a.split(""):a,d=a.length-1;0<=d;--d)d in c&&b.call(void 0,c[d],d,a)},Da=Array.prototype.map?function(a,b,c){w(null!=a.length);return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=p(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},Ea=Array.prototype.some?function(a,b,c){w(null!=a.length);return Array.prototype.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1},
	Ga=function(a){var b;a:{b=Fa;for(var c=a.length,d=p(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:p(a)?a.charAt(b):a[b]},Ha=function(a,b){return 0<=Ba(a,b)},Ja=function(a,b){b=Ba(a,b);var c;(c=0<=b)&&Ia(a,b);return c},Ia=function(a,b){w(null!=a.length);return 1==Array.prototype.splice.call(a,b,1).length},Ka=function(a,b){var c=0;Ca(a,function(d,e){b.call(void 0,d,e,a)&&Ia(a,e)&&c++})},La=function(a){return Array.prototype.concat.apply([],arguments)},
	Ma=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};var Na=function(a,b){for(var c in a)b.call(void 0,a[c],c,a)},Oa=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},Pa=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},Qa=function(a){for(var b in a)return!1;return!0},Ra=function(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(c in b)if(!(c in a))return!1;return!0},Sa=function(a){var b={},c;for(c in a)b[c]=a[c];return b},Ta="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
	Ua=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<Ta.length;f++)c=Ta[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var Va;a:{var Wa=l.navigator;if(Wa){var Ya=Wa.userAgent;if(Ya){Va=Ya;break a}}Va=""}var y=function(a){return v(Va,a)};var Za=function(a){Za[" "](a);return a};Za[" "]=ba;var ab=function(a,b){var c=$a;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)};var bb=y("Opera"),z=y("Trident")||y("MSIE"),cb=y("Edge"),db=cb||z,eb=y("Gecko")&&!(v(Va.toLowerCase(),"webkit")&&!y("Edge"))&&!(y("Trident")||y("MSIE"))&&!y("Edge"),fb=v(Va.toLowerCase(),"webkit")&&!y("Edge"),gb=function(){var a=l.document;return a?a.documentMode:void 0},hb;
	a:{var ib="",jb=function(){var a=Va;if(eb)return/rv\:([^\);]+)(\)|;)/.exec(a);if(cb)return/Edge\/([\d\.]+)/.exec(a);if(z)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(fb)return/WebKit\/(\S+)/.exec(a);if(bb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();jb&&(ib=jb?jb[1]:"");if(z){var kb=gb();if(null!=kb&&kb>parseFloat(ib)){hb=String(kb);break a}}hb=ib}
	var lb=hb,$a={},B=function(a){return ab(a,function(){for(var b=0,c=ma(String(lb)).split("."),d=ma(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",k=d[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];k=/(\d*)(\D*)(.*)/.exec(k)||["","","",""];if(0==g[0].length&&0==k[0].length)break;b=ua(0==g[1].length?0:parseInt(g[1],10),0==k[1].length?0:parseInt(k[1],10))||ua(0==g[2].length,0==k[2].length)||ua(g[2],k[2]);g=g[3];k=k[3]}while(0==b)}return 0<=b})},mb;var nb=l.document;
	mb=nb&&z?gb()||("CSS1Compat"==nb.compatMode?parseInt(lb,10):5):void 0;var ob=function(a){return Da(a,function(a){a=a.toString(16);return 1<a.length?a:"0"+a}).join("")};var pb=null,qb=null,sb=function(a){var b="";rb(a,function(a){b+=String.fromCharCode(a)});return b},rb=function(a,b){function c(b){for(;d<a.length;){var c=a.charAt(d++),e=qb[c];if(null!=e)return e;if(!/^[\s\xa0]*$/.test(c))throw Error("Unknown base64 encoding at char: "+c);}return b}tb();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),k=c(64);if(64===k&&-1===e)break;b(e<<2|f>>4);64!=g&&(b(f<<4&240|g>>2),64!=k&&b(g<<6&192|k))}},tb=function(){if(!pb){pb={};qb={};for(var a=0;65>a;a++)pb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),
	qb[pb[a]]=a,62<=a&&(qb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)]=a)}};var ub=function(){this.za=-1};var xb=function(a,b){this.za=64;this.Wb=l.Uint8Array?new Uint8Array(this.za):Array(this.za);this.Ac=this.$a=0;this.h=[];this.Ze=a;this.Ld=b;this.Af=l.Int32Array?new Int32Array(64):Array(64);void 0!==vb||(vb=l.Int32Array?new Int32Array(wb):wb);this.reset()},vb;t(xb,ub);for(var yb=[],zb=0;63>zb;zb++)yb[zb]=0;var Ab=La(128,yb);xb.prototype.reset=function(){this.Ac=this.$a=0;this.h=l.Int32Array?new Int32Array(this.Ld):Ma(this.Ld)};
	var Bb=function(a){var b=a.Wb;w(b.length==a.za);for(var c=a.Af,d=0,e=0;e<b.length;)c[d++]=b[e]<<24|b[e+1]<<16|b[e+2]<<8|b[e+3],e=4*d;for(b=16;64>b;b++){var e=c[b-15]|0,d=c[b-2]|0,f=(c[b-16]|0)+((e>>>7|e<<25)^(e>>>18|e<<14)^e>>>3)|0,g=(c[b-7]|0)+((d>>>17|d<<15)^(d>>>19|d<<13)^d>>>10)|0;c[b]=f+g|0}for(var d=a.h[0]|0,e=a.h[1]|0,k=a.h[2]|0,n=a.h[3]|0,A=a.h[4]|0,Xa=a.h[5]|0,Gb=a.h[6]|0,f=a.h[7]|0,b=0;64>b;b++)var gh=((d>>>2|d<<30)^(d>>>13|d<<19)^(d>>>22|d<<10))+(d&e^d&k^e&k)|0,g=A&Xa^~A&Gb,f=f+((A>>>6|
	A<<26)^(A>>>11|A<<21)^(A>>>25|A<<7))|0,g=g+(vb[b]|0)|0,g=f+(g+(c[b]|0)|0)|0,f=Gb,Gb=Xa,Xa=A,A=n+g|0,n=k,k=e,e=d,d=g+gh|0;a.h[0]=a.h[0]+d|0;a.h[1]=a.h[1]+e|0;a.h[2]=a.h[2]+k|0;a.h[3]=a.h[3]+n|0;a.h[4]=a.h[4]+A|0;a.h[5]=a.h[5]+Xa|0;a.h[6]=a.h[6]+Gb|0;a.h[7]=a.h[7]+f|0};
	xb.prototype.update=function(a,b){void 0===b&&(b=a.length);var c=0,d=this.$a;if(p(a))for(;c<b;)this.Wb[d++]=a.charCodeAt(c++),d==this.za&&(Bb(this),d=0);else if(ea(a))for(;c<b;){var e=a[c++];if(!("number"==typeof e&&0<=e&&255>=e&&e==(e|0)))throw Error("message must be a byte array");this.Wb[d++]=e;d==this.za&&(Bb(this),d=0)}else throw Error("message must be string or array");this.$a=d;this.Ac+=b};
	xb.prototype.digest=function(){var a=[],b=8*this.Ac;56>this.$a?this.update(Ab,56-this.$a):this.update(Ab,this.za-(this.$a-56));for(var c=63;56<=c;c--)this.Wb[c]=b&255,b/=256;Bb(this);for(c=b=0;c<this.Ze;c++)for(var d=24;0<=d;d-=8)a[b++]=this.h[c]>>d&255;return a};
	var wb=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,
	4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];var Db=function(){xb.call(this,8,Cb)};t(Db,xb);var Cb=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];var Eb=!z||9<=Number(mb),Fb=z&&!B("9");!fb||B("528");eb&&B("1.9b")||z&&B("8")||bb&&B("9.5")||fb&&B("528");eb&&!B("8")||z&&B("9");var Hb=function(){this.Ba=this.Ba;this.nc=this.nc};Hb.prototype.Ba=!1;Hb.prototype.isDisposed=function(){return this.Ba};Hb.prototype.Wa=function(){if(this.nc)for(;this.nc.length;)this.nc.shift()()};var Ib=function(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.gb=!1;this.Wd=!0};Ib.prototype.preventDefault=function(){this.defaultPrevented=!0;this.Wd=!1};var Jb=function(a,b){Ib.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.key="";this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.Xa=this.state=null;a&&this.init(a,b)};t(Jb,Ib);
	Jb.prototype.init=function(a,b){var c=this.type=a.type,d=a.changedTouches?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.currentTarget=b;if(b=a.relatedTarget){if(eb){var e;a:{try{Za(b.nodeName);e=!0;break a}catch(f){}e=!1}e||(b=null)}}else"mouseover"==c?b=a.fromElement:"mouseout"==c&&(b=a.toElement);this.relatedTarget=b;null===d?(this.offsetX=fb||void 0!==a.offsetX?a.offsetX:a.layerX,this.offsetY=fb||void 0!==a.offsetY?a.offsetY:a.layerY,this.clientX=void 0!==a.clientX?a.clientX:
	a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0):(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.key=a.key||"";this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.state=a.state;this.Xa=
	a;a.defaultPrevented&&this.preventDefault()};Jb.prototype.preventDefault=function(){Jb.pd.preventDefault.call(this);var a=this.Xa;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Fb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};Jb.prototype.Ee=function(){return this.Xa};var Kb="closure_listenable_"+(1E6*Math.random()|0),Lb=0;var Mb=function(a,b,c,d,e){this.listener=a;this.rc=null;this.src=b;this.type=c;this.capture=!!d;this.dc=e;this.key=++Lb;this.lb=this.Vb=!1},Nb=function(a){a.lb=!0;a.listener=null;a.rc=null;a.src=null;a.dc=null};var Ob=function(a){this.src=a;this.D={};this.Rb=0};Ob.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.D[f];a||(a=this.D[f]=[],this.Rb++);var g=Pb(a,b,d,e);-1<g?(b=a[g],c||(b.Vb=!1)):(b=new Mb(b,this.src,f,!!d,e),b.Vb=c,a.push(b));return b};Ob.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.D))return!1;var e=this.D[a];b=Pb(e,b,c,d);return-1<b?(Nb(e[b]),Ia(e,b),0==e.length&&(delete this.D[a],this.Rb--),!0):!1};
	var Qb=function(a,b){var c=b.type;c in a.D&&Ja(a.D[c],b)&&(Nb(b),0==a.D[c].length&&(delete a.D[c],a.Rb--))};Ob.prototype.Oc=function(a,b,c,d){a=this.D[a.toString()];var e=-1;a&&(e=Pb(a,b,c,d));return-1<e?a[e]:null};var Pb=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.lb&&f.listener==b&&f.capture==!!c&&f.dc==d)return e}return-1};var Rb="closure_lm_"+(1E6*Math.random()|0),Sb={},Tb=0,Ub=function(a,b,c,d,e){if(da(b))for(var f=0;f<b.length;f++)Ub(a,b[f],c,d,e);else c=Vb(c),a&&a[Kb]?a.listen(b,c,d,e):Wb(a,b,c,!1,d,e)},Wb=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=!!e,k=Xb(a);k||(a[Rb]=k=new Ob(a));c=k.add(b,c,d,e,f);if(!c.rc){d=Yb();c.rc=d;d.src=a;d.listener=c;if(a.addEventListener)a.addEventListener(b.toString(),d,g);else if(a.attachEvent)a.attachEvent(Zb(b.toString()),d);else throw Error("addEventListener and attachEvent are unavailable.");
	Tb++}},Yb=function(){var a=$b,b=Eb?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b},ac=function(a,b,c,d,e){if(da(b))for(var f=0;f<b.length;f++)ac(a,b[f],c,d,e);else c=Vb(c),a&&a[Kb]?bc(a,b,c,d,e):Wb(a,b,c,!0,d,e)},cc=function(a,b,c,d,e){if(da(b))for(var f=0;f<b.length;f++)cc(a,b[f],c,d,e);else c=Vb(c),a&&a[Kb]?a.aa.remove(String(b),c,d,e):a&&(a=Xb(a))&&(b=a.Oc(b,c,!!d,e))&&dc(b)},dc=function(a){if(!fa(a)&&a&&!a.lb){var b=a.src;if(b&&
	b[Kb])Qb(b.aa,a);else{var c=a.type,d=a.rc;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent&&b.detachEvent(Zb(c),d);Tb--;(c=Xb(b))?(Qb(c,a),0==c.Rb&&(c.src=null,b[Rb]=null)):Nb(a)}}},Zb=function(a){return a in Sb?Sb[a]:Sb[a]="on"+a},fc=function(a,b,c,d){var e=!0;if(a=Xb(a))if(b=a.D[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.capture==c&&!f.lb&&(f=ec(f,d),e=e&&!1!==f)}return e},ec=function(a,b){var c=a.listener,d=a.dc||a.src;a.Vb&&dc(a);return c.call(d,
	b)},$b=function(a,b){if(a.lb)return!0;if(!Eb){if(!b)a:{b=["window","event"];for(var c=l,d;d=b.shift();)if(null!=c[d])c=c[d];else{b=null;break a}b=c}d=b;b=new Jb(d,this);c=!0;if(!(0>d.keyCode||void 0!=d.returnValue)){a:{var e=!1;if(0==d.keyCode)try{d.keyCode=-1;break a}catch(g){e=!0}if(e||void 0==d.returnValue)d.returnValue=!0}d=[];for(e=b.currentTarget;e;e=e.parentNode)d.push(e);a=a.type;for(e=d.length-1;!b.gb&&0<=e;e--){b.currentTarget=d[e];var f=fc(d[e],a,!0,b),c=c&&f}for(e=0;!b.gb&&e<d.length;e++)b.currentTarget=
	d[e],f=fc(d[e],a,!1,b),c=c&&f}return c}return ec(a,new Jb(b,this))},Xb=function(a){a=a[Rb];return a instanceof Ob?a:null},gc="__closure_events_fn_"+(1E9*Math.random()>>>0),Vb=function(a){w(a,"Listener can not be null.");if(q(a))return a;w(a.handleEvent,"An object listener must have handleEvent method.");a[gc]||(a[gc]=function(b){return a.handleEvent(b)});return a[gc]};var hc=/^[+a-zA-Z0-9_.!#$%&'*\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/;var jc=function(){this.xc="";this.me=ic};jc.prototype.hc=!0;jc.prototype.bc=function(){return this.xc};jc.prototype.toString=function(){return"Const{"+this.xc+"}"};var kc=function(a){if(a instanceof jc&&a.constructor===jc&&a.me===ic)return a.xc;xa("expected object of type Const, got '"+a+"'");return"type_error:Const"},ic={},lc=function(a){var b=new jc;b.xc=a;return b};lc("");var nc=function(){this.qc="";this.ne=mc};nc.prototype.hc=!0;nc.prototype.bc=function(){return this.qc};nc.prototype.toString=function(){return"TrustedResourceUrl{"+this.qc+"}"};var mc={};var pc=function(){this.ma="";this.le=oc};pc.prototype.hc=!0;pc.prototype.bc=function(){return this.ma};pc.prototype.toString=function(){return"SafeUrl{"+this.ma+"}"};
	var qc=function(a){if(a instanceof pc&&a.constructor===pc&&a.le===oc)return a.ma;xa("expected object of type SafeUrl, got '"+a+"' of type "+m(a));return"type_error:SafeUrl"},rc=/^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i,tc=function(a){if(a instanceof pc)return a;a=a.hc?a.bc():String(a);rc.test(a)||(a="about:invalid#zClosurez");return sc(a)},oc={},sc=function(a){var b=new pc;b.ma=a;return b};sc("about:blank");var vc=function(){this.ma="";this.ke=uc};vc.prototype.hc=!0;vc.prototype.bc=function(){return this.ma};vc.prototype.toString=function(){return"SafeHtml{"+this.ma+"}"};var wc=function(a){if(a instanceof vc&&a.constructor===vc&&a.ke===uc)return a.ma;xa("expected object of type SafeHtml, got '"+a+"' of type "+m(a));return"type_error:SafeHtml"},uc={};vc.prototype.Pe=function(a){this.ma=a;return this};var xc="StopIteration"in l?l.StopIteration:{message:"StopIteration",stack:""},yc=function(){};yc.prototype.next=function(){throw xc;};yc.prototype.oe=function(){return this};var zc=function(a,b){this.ba={};this.w=[];this.sb=this.o=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else a&&this.addAll(a)};zc.prototype.X=function(){Ac(this);for(var a=[],b=0;b<this.w.length;b++)a.push(this.ba[this.w[b]]);return a};zc.prototype.ka=function(){Ac(this);return this.w.concat()};zc.prototype.ub=function(a){return Bc(this.ba,a)};
	zc.prototype.remove=function(a){return Bc(this.ba,a)?(delete this.ba[a],this.o--,this.sb++,this.w.length>2*this.o&&Ac(this),!0):!1};var Ac=function(a){if(a.o!=a.w.length){for(var b=0,c=0;b<a.w.length;){var d=a.w[b];Bc(a.ba,d)&&(a.w[c++]=d);b++}a.w.length=c}if(a.o!=a.w.length){for(var e={},c=b=0;b<a.w.length;)d=a.w[b],Bc(e,d)||(a.w[c++]=d,e[d]=1),b++;a.w.length=c}};h=zc.prototype;h.get=function(a,b){return Bc(this.ba,a)?this.ba[a]:b};
	h.set=function(a,b){Bc(this.ba,a)||(this.o++,this.w.push(a),this.sb++);this.ba[a]=b};h.addAll=function(a){var b;a instanceof zc?(b=a.ka(),a=a.X()):(b=Pa(a),a=Oa(a));for(var c=0;c<b.length;c++)this.set(b[c],a[c])};h.forEach=function(a,b){for(var c=this.ka(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};h.clone=function(){return new zc(this)};
	h.oe=function(a){Ac(this);var b=0,c=this.sb,d=this,e=new yc;e.next=function(){if(c!=d.sb)throw Error("The map has changed since the iterator was created");if(b>=d.w.length)throw xc;var e=d.w[b++];return a?e:d.ba[e]};return e};var Bc=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var Cc=function(a){if(a.X&&"function"==typeof a.X)return a.X();if(p(a))return a.split("");if(ea(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return Oa(a)},Dc=function(a){if(a.ka&&"function"==typeof a.ka)return a.ka();if(!a.X||"function"!=typeof a.X){if(ea(a)||p(a)){var b=[];a=a.length;for(var c=0;c<a;c++)b.push(c);return b}return Pa(a)}},Ec=function(a,b){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,void 0);else if(ea(a)||p(a))x(a,b,void 0);else for(var c=Dc(a),d=Cc(a),e=
	d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)};var Fc=function(a,b,c,d,e){this.reset(a,b,c,d,e)};Fc.prototype.Cd=null;var Gc=0;Fc.prototype.reset=function(a,b,c,d,e){"number"==typeof e||Gc++;d||ka();this.Bb=a;this.We=b;delete this.Cd};Fc.prototype.$d=function(a){this.Bb=a};var Hc=function(a){this.Xe=a;this.Id=this.Jc=this.Bb=this.s=null},Ic=function(a,b){this.name=a;this.value=b};Ic.prototype.toString=function(){return this.name};var Jc=new Ic("SEVERE",1E3),Kc=new Ic("CONFIG",700),Lc=new Ic("FINE",500);Hc.prototype.getParent=function(){return this.s};Hc.prototype.$d=function(a){this.Bb=a};var Mc=function(a){if(a.Bb)return a.Bb;if(a.s)return Mc(a.s);xa("Root logger has no level set.");return null};
	Hc.prototype.log=function(a,b,c){if(a.value>=Mc(this).value)for(q(b)&&(b=b()),a=new Fc(a,String(b),this.Xe),c&&(a.Cd=c),c="log:"+a.We,l.console&&(l.console.timeStamp?l.console.timeStamp(c):l.console.markTimeline&&l.console.markTimeline(c)),l.msWriteProfilerMark&&l.msWriteProfilerMark(c),c=this;c;){var d=c,e=a;if(d.Id)for(var f=0;b=d.Id[f];f++)b(e);c=c.getParent()}};
	var Nc={},Oc=null,Pc=function(a){Oc||(Oc=new Hc(""),Nc[""]=Oc,Oc.$d(Kc));var b;if(!(b=Nc[a])){b=new Hc(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=Pc(a.substr(0,c));c.Jc||(c.Jc={});c.Jc[d]=b;b.s=c;Nc[a]=b}return b};var C=function(a,b){a&&a.log(Lc,b,void 0)};var Sc=function(a){var b=[];Qc(new Rc,a,b);return b.join("")},Rc=function(){this.tc=void 0},Qc=function(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(da(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),e=d[f],Qc(a,a.tc?a.tc.call(d,String(f),e):e,c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");f="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(e=b[d],"function"!=typeof e&&(c.push(f),
	Tc(d,c),c.push(":"),Qc(a,a.tc?a.tc.call(b,d,e):e,c),f=","));c.push("}");return}}switch(typeof b){case "string":Tc(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}},Uc={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Vc=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,
	Tc=function(a,b){b.push('"',a.replace(Vc,function(a){var b=Uc[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),Uc[a]=b);return b}),'"')};var Wc=function(){};Wc.prototype.td=null;var Xc=function(a){return a.td||(a.td=a.Uc())};var Yc,Zc=function(){};t(Zc,Wc);Zc.prototype.Xb=function(){var a=$c(this);return a?new ActiveXObject(a):new XMLHttpRequest};Zc.prototype.Uc=function(){var a={};$c(this)&&(a[0]=!0,a[1]=!0);return a};
	var $c=function(a){if(!a.Kd&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.Kd=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.Kd};Yc=new Zc;var ad=function(){};t(ad,Wc);ad.prototype.Xb=function(){var a=new XMLHttpRequest;if("withCredentials"in a)return a;if("undefined"!=typeof XDomainRequest)return new bd;throw Error("Unsupported browser");};ad.prototype.Uc=function(){return{}};
	var bd=function(){this.qa=new XDomainRequest;this.readyState=0;this.onreadystatechange=null;this.responseText="";this.status=-1;this.statusText=this.responseXML=null;this.qa.onload=r(this.Ge,this);this.qa.onerror=r(this.Hd,this);this.qa.onprogress=r(this.He,this);this.qa.ontimeout=r(this.Ie,this)};h=bd.prototype;h.open=function(a,b,c){if(null!=c&&!c)throw Error("Only async requests are supported.");this.qa.open(a,b)};
	h.send=function(a){if(a)if("string"==typeof a)this.qa.send(a);else throw Error("Only string data is supported");else this.qa.send()};h.abort=function(){this.qa.abort()};h.setRequestHeader=function(){};h.Ge=function(){this.status=200;this.responseText=this.qa.responseText;cd(this,4)};h.Hd=function(){this.status=500;this.responseText="";cd(this,4)};h.Ie=function(){this.Hd()};h.He=function(){this.status=200;cd(this,1)};var cd=function(a,b){a.readyState=b;if(a.onreadystatechange)a.onreadystatechange()};!eb&&!z||z&&9<=Number(mb)||eb&&B("1.9.1");z&&B("9");var ed=function(a,b){Na(b,function(b,d){"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:dd.hasOwnProperty(d)?a.setAttribute(dd[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})},dd={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};var fd=function(a,b,c){this.Te=c;this.ue=a;this.jf=b;this.mc=0;this.ec=null};fd.prototype.get=function(){var a;0<this.mc?(this.mc--,a=this.ec,this.ec=a.next,a.next=null):a=this.ue();return a};fd.prototype.put=function(a){this.jf(a);this.mc<this.Te&&(this.mc++,a.next=this.ec,this.ec=a)};var gd=function(a){l.setTimeout(function(){throw a;},0)},hd,id=function(){var a=l.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!y("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,
	a=r(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!y("Trident")&&!y("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var a=c.wd;c.wd=null;a()}};return function(a){d.next={wd:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?
	function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){l.setTimeout(a,0)}};var jd=function(){this.Dc=this.Ra=null},ld=new fd(function(){return new kd},function(a){a.reset()},100);jd.prototype.add=function(a,b){var c=ld.get();c.set(a,b);this.Dc?this.Dc.next=c:(w(!this.Ra),this.Ra=c);this.Dc=c};jd.prototype.remove=function(){var a=null;this.Ra&&(a=this.Ra,this.Ra=this.Ra.next,this.Ra||(this.Dc=null),a.next=null);return a};var kd=function(){this.next=this.scope=this.Nc=null};kd.prototype.set=function(a,b){this.Nc=a;this.scope=b;this.next=null};
	kd.prototype.reset=function(){this.next=this.scope=this.Nc=null};var qd=function(a,b){md||nd();od||(md(),od=!0);pd.add(a,b)},md,nd=function(){if(-1!=String(l.Promise).indexOf("[native code]")){var a=l.Promise.resolve(void 0);md=function(){a.then(rd)}}else md=function(){var a=rd;!q(l.setImmediate)||l.Window&&l.Window.prototype&&!y("Edge")&&l.Window.prototype.setImmediate==l.setImmediate?(hd||(hd=id()),hd(a)):l.setImmediate(a)}},od=!1,pd=new jd,rd=function(){for(var a;a=pd.remove();){try{a.Nc.call(a.scope)}catch(b){gd(b)}ld.put(a)}od=!1};var sd=function(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0},td=function(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}};var D=function(a,b){this.M=0;this.na=void 0;this.Ua=this.ja=this.s=null;this.cc=this.Mc=!1;if(a!=ba)try{var c=this;a.call(b,function(a){ud(c,2,a)},function(a){if(!(a instanceof vd))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(e){}ud(c,3,a)})}catch(d){ud(this,3,d)}},wd=function(){this.next=this.context=this.bb=this.Ja=this.child=null;this.tb=!1};wd.prototype.reset=function(){this.context=this.bb=this.Ja=this.child=null;this.tb=!1};
	var xd=new fd(function(){return new wd},function(a){a.reset()},100),yd=function(a,b,c){var d=xd.get();d.Ja=a;d.bb=b;d.context=c;return d},E=function(a){if(a instanceof D)return a;var b=new D(ba);ud(b,2,a);return b},F=function(a){return new D(function(b,c){c(a)})},Ad=function(a,b,c){zd(a,b,c,null)||qd(ja(b,a))},Bd=function(a){return new D(function(b){var c=a.length,d=[];if(c)for(var e=function(a,e,f){c--;d[a]=e?{Ce:!0,value:f}:{Ce:!1,reason:f};0==c&&b(d)},f=0,g;f<a.length;f++)g=a[f],Ad(g,ja(e,f,!0),
	ja(e,f,!1));else b(d)})};D.prototype.then=function(a,b,c){null!=a&&Aa(a,"opt_onFulfilled should be a function.");null!=b&&Aa(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return Cd(this,q(a)?a:null,q(b)?b:null,c)};sd(D);var Ed=function(a,b){b=yd(b,b,void 0);b.tb=!0;Dd(a,b);return a};D.prototype.f=function(a,b){return Cd(this,null,a,b)};D.prototype.cancel=function(a){0==this.M&&qd(function(){var b=new vd(a);Fd(this,b)},this)};
	var Fd=function(a,b){if(0==a.M)if(a.s){var c=a.s;if(c.ja){for(var d=0,e=null,f=null,g=c.ja;g&&(g.tb||(d++,g.child==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.M&&1==d?Fd(c,b):(f?(d=f,w(c.ja),w(null!=d),d.next==c.Ua&&(c.Ua=d),d.next=d.next.next):Gd(c),Hd(c,e,3,b)))}a.s=null}else ud(a,3,b)},Dd=function(a,b){a.ja||2!=a.M&&3!=a.M||Id(a);w(null!=b.Ja);a.Ua?a.Ua.next=b:a.ja=b;a.Ua=b},Cd=function(a,b,c,d){var e=yd(null,null,null);e.child=new D(function(a,g){e.Ja=b?function(c){try{var e=b.call(d,c);a(e)}catch(A){g(A)}}:
	a;e.bb=c?function(b){try{var e=c.call(d,b);void 0===e&&b instanceof vd?g(b):a(e)}catch(A){g(A)}}:g});e.child.s=a;Dd(a,e);return e.child};D.prototype.xf=function(a){w(1==this.M);this.M=0;ud(this,2,a)};D.prototype.yf=function(a){w(1==this.M);this.M=0;ud(this,3,a)};
	var ud=function(a,b,c){0==a.M&&(a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself")),a.M=1,zd(c,a.xf,a.yf,a)||(a.na=c,a.M=b,a.s=null,Id(a),3!=b||c instanceof vd||Jd(a,c)))},zd=function(a,b,c,d){if(a instanceof D)return null!=b&&Aa(b,"opt_onFulfilled should be a function."),null!=c&&Aa(c,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),Dd(a,yd(b||ba,c||null,d)),!0;if(td(a))return a.then(b,c,d),!0;if(ga(a))try{var e=a.then;if(q(e))return Kd(a,
	e,b,c,d),!0}catch(f){return c.call(d,f),!0}return!1},Kd=function(a,b,c,d,e){var f=!1,g=function(a){f||(f=!0,c.call(e,a))},k=function(a){f||(f=!0,d.call(e,a))};try{b.call(a,g,k)}catch(n){k(n)}},Id=function(a){a.Mc||(a.Mc=!0,qd(a.xe,a))},Gd=function(a){var b=null;a.ja&&(b=a.ja,a.ja=b.next,b.next=null);a.ja||(a.Ua=null);null!=b&&w(null!=b.Ja);return b};D.prototype.xe=function(){for(var a;a=Gd(this);)Hd(this,a,this.M,this.na);this.Mc=!1};
	var Hd=function(a,b,c,d){if(3==c&&b.bb&&!b.tb)for(;a&&a.cc;a=a.s)a.cc=!1;if(b.child)b.child.s=null,Ld(b,c,d);else try{b.tb?b.Ja.call(b.context):Ld(b,c,d)}catch(e){Md.call(null,e)}xd.put(b)},Ld=function(a,b,c){2==b?a.Ja.call(a.context,c):a.bb&&a.bb.call(a.context,c)},Jd=function(a,b){a.cc=!0;qd(function(){a.cc&&Md.call(null,b)})},Md=gd,vd=function(a){u.call(this,a)};t(vd,u);vd.prototype.name="cancel";/*
	 Portions of this code are from MochiKit, received by
	 The Closure Authors under the MIT license. All other code is Copyright
	 2005-2009 The Closure Authors. All Rights Reserved.
	*/
	var Nd=function(a,b){this.uc=[];this.Qd=a;this.zd=b||null;this.wb=this.Ya=!1;this.na=void 0;this.md=this.sd=this.Hc=!1;this.Bc=0;this.s=null;this.Ic=0};Nd.prototype.cancel=function(a){if(this.Ya)this.na instanceof Nd&&this.na.cancel();else{if(this.s){var b=this.s;delete this.s;a?b.cancel(a):(b.Ic--,0>=b.Ic&&b.cancel())}this.Qd?this.Qd.call(this.zd,this):this.md=!0;this.Ya||Od(this,new Pd)}};Nd.prototype.xd=function(a,b){this.Hc=!1;Qd(this,a,b)};
	var Qd=function(a,b,c){a.Ya=!0;a.na=c;a.wb=!b;Rd(a)},Td=function(a){if(a.Ya){if(!a.md)throw new Sd;a.md=!1}};Nd.prototype.callback=function(a){Td(this);Ud(a);Qd(this,!0,a)};
	var Od=function(a,b){Td(a);Ud(b);Qd(a,!1,b)},Ud=function(a){w(!(a instanceof Nd),"An execution sequence may not be initiated with a blocking Deferred.")},Yd=function(a){var b=Vd("https://apis.google.com/js/client.js?onload="+Wd);Xd(b,null,a,void 0)},Xd=function(a,b,c,d){w(!a.sd,"Blocking Deferreds can not be re-used");a.uc.push([b,c,d]);a.Ya&&Rd(a)};Nd.prototype.then=function(a,b,c){var d,e,f=new D(function(a,b){d=a;e=b});Xd(this,d,function(a){a instanceof Pd?f.cancel():e(a)});return f.then(a,b,c)};
	sd(Nd);
	var Zd=function(a){return Ea(a.uc,function(a){return q(a[1])})},Rd=function(a){if(a.Bc&&a.Ya&&Zd(a)){var b=a.Bc,c=$d[b];c&&(l.clearTimeout(c.xb),delete $d[b]);a.Bc=0}a.s&&(a.s.Ic--,delete a.s);for(var b=a.na,d=c=!1;a.uc.length&&!a.Hc;){var e=a.uc.shift(),f=e[0],g=e[1],e=e[2];if(f=a.wb?g:f)try{var k=f.call(e||a.zd,b);void 0!==k&&(a.wb=a.wb&&(k==b||k instanceof Error),a.na=b=k);if(td(b)||"function"===typeof l.Promise&&b instanceof l.Promise)d=!0,a.Hc=!0}catch(n){b=n,a.wb=!0,Zd(a)||(c=!0)}}a.na=b;d&&
	(k=r(a.xd,a,!0),d=r(a.xd,a,!1),b instanceof Nd?(Xd(b,k,d),b.sd=!0):b.then(k,d));c&&(b=new ae(b),$d[b.xb]=b,a.Bc=b.xb)},Sd=function(){u.call(this)};t(Sd,u);Sd.prototype.message="Deferred has already fired";Sd.prototype.name="AlreadyCalledError";var Pd=function(){u.call(this)};t(Pd,u);Pd.prototype.message="Deferred was canceled";Pd.prototype.name="CanceledError";var ae=function(a){this.xb=l.setTimeout(r(this.wf,this),0);this.O=a};
	ae.prototype.wf=function(){w($d[this.xb],"Cannot throw an error that is not scheduled.");delete $d[this.xb];throw this.O;};var $d={};var Vd=function(a){var b=new nc;b.qc=a;return be(b)},be=function(a){var b={},c=b.document||document,d;a instanceof nc&&a.constructor===nc&&a.ne===mc?d=a.qc:(xa("expected object of type TrustedResourceUrl, got '"+a+"' of type "+m(a)),d="type_error:TrustedResourceUrl");var e=document.createElement("SCRIPT");a={Xd:e,Qb:void 0};var f=new Nd(ce,a),g=null,k=null!=b.timeout?b.timeout:5E3;0<k&&(g=window.setTimeout(function(){de(e,!0);Od(f,new ee(1,"Timeout reached for loading script "+d))},k),a.Qb=g);e.onload=
	e.onreadystatechange=function(){e.readyState&&"loaded"!=e.readyState&&"complete"!=e.readyState||(de(e,b.If||!1,g),f.callback(null))};e.onerror=function(){de(e,!0,g);Od(f,new ee(0,"Error while loading script "+d))};a=b.attributes||{};Ua(a,{type:"text/javascript",charset:"UTF-8",src:d});ed(e,a);fe(c).appendChild(e);return f},fe=function(a){var b;return(b=(a||document).getElementsByTagName("HEAD"))&&0!=b.length?b[0]:a.documentElement},ce=function(){if(this&&this.Xd){var a=this.Xd;a&&"SCRIPT"==a.tagName&&
	de(a,!0,this.Qb)}},de=function(a,b,c){null!=c&&l.clearTimeout(c);a.onload=ba;a.onerror=ba;a.onreadystatechange=ba;b&&window.setTimeout(function(){a&&a.parentNode&&a.parentNode.removeChild(a)},0)},ee=function(a,b){var c="Jsloader error (code #"+a+")";b&&(c+=": "+b);u.call(this,c);this.code=a};t(ee,u);var ge=function(){Hb.call(this);this.aa=new Ob(this);this.pe=this;this.$c=null};t(ge,Hb);ge.prototype[Kb]=!0;h=ge.prototype;h.addEventListener=function(a,b,c,d){Ub(this,a,b,c,d)};h.removeEventListener=function(a,b,c,d){cc(this,a,b,c,d)};
	h.dispatchEvent=function(a){he(this);var b,c=this.$c;if(c){b=[];for(var d=1;c;c=c.$c)b.push(c),w(1E3>++d,"infinite loop")}c=this.pe;d=a.type||a;if(p(a))a=new Ib(a,c);else if(a instanceof Ib)a.target=a.target||c;else{var e=a;a=new Ib(d,c);Ua(a,e)}var e=!0,f;if(b)for(var g=b.length-1;!a.gb&&0<=g;g--)f=a.currentTarget=b[g],e=ie(f,d,!0,a)&&e;a.gb||(f=a.currentTarget=c,e=ie(f,d,!0,a)&&e,a.gb||(e=ie(f,d,!1,a)&&e));if(b)for(g=0;!a.gb&&g<b.length;g++)f=a.currentTarget=b[g],e=ie(f,d,!1,a)&&e;return e};
	h.Wa=function(){ge.pd.Wa.call(this);if(this.aa){var a=this.aa,b=0,c;for(c in a.D){for(var d=a.D[c],e=0;e<d.length;e++)++b,Nb(d[e]);delete a.D[c];a.Rb--}}this.$c=null};h.listen=function(a,b,c,d){he(this);return this.aa.add(String(a),b,!1,c,d)};
	var bc=function(a,b,c,d,e){a.aa.add(String(b),c,!0,d,e)},ie=function(a,b,c,d){b=a.aa.D[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.lb&&g.capture==c){var k=g.listener,n=g.dc||g.src;g.Vb&&Qb(a.aa,g);e=!1!==k.call(n,d)&&e}}return e&&0!=d.Wd};ge.prototype.Oc=function(a,b,c,d){return this.aa.Oc(String(a),b,c,d)};var he=function(a){w(a.aa,"Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")};var je=function(a,b,c){if(q(a))c&&(a=r(a,c));else if(a&&"function"==typeof a.handleEvent)a=r(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:l.setTimeout(a,b||0)},ke=function(a){var b=null;return(new D(function(c,d){b=je(function(){c(void 0)},a);-1==b&&d(Error("Failed to schedule timer."))})).f(function(a){l.clearTimeout(b);throw a;})};var le=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,me=function(a,b){if(a){a=a.split("&");for(var c=0;c<a.length;c++){var d=a[c].indexOf("="),e,f=null;0<=d?(e=a[c].substring(0,d),f=a[c].substring(d+1)):e=a[c];b(e,f?decodeURIComponent(f.replace(/\+/g," ")):"")}}};var G=function(a){ge.call(this);this.headers=new zc;this.Fc=a||null;this.ra=!1;this.Ec=this.b=null;this.Ab=this.Od=this.kc="";this.Fa=this.Sc=this.ic=this.Lc=!1;this.ob=0;this.zc=null;this.Vd="";this.Cc=this.ef=this.je=!1};t(G,ge);var ne=G.prototype,oe=Pc("goog.net.XhrIo");ne.T=oe;var pe=/^https?$/i,qe=["POST","PUT"];
	G.prototype.send=function(a,b,c,d){if(this.b)throw Error("[goog.net.XhrIo] Object is active with another request="+this.kc+"; newUri="+a);b=b?b.toUpperCase():"GET";this.kc=a;this.Ab="";this.Od=b;this.Lc=!1;this.ra=!0;this.b=this.Fc?this.Fc.Xb():Yc.Xb();this.Ec=this.Fc?Xc(this.Fc):Xc(Yc);this.b.onreadystatechange=r(this.Sd,this);this.ef&&"onprogress"in this.b&&(this.b.onprogress=r(function(a){this.Rd(a,!0)},this),this.b.upload&&(this.b.upload.onprogress=r(this.Rd,this)));try{C(this.T,re(this,"Opening Xhr")),
	this.Sc=!0,this.b.open(b,String(a),!0),this.Sc=!1}catch(f){C(this.T,re(this,"Error opening Xhr: "+f.message));this.O(5,f);return}a=c||"";var e=this.headers.clone();d&&Ec(d,function(a,b){e.set(b,a)});d=Ga(e.ka());c=l.FormData&&a instanceof l.FormData;!Ha(qe,b)||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e.forEach(function(a,b){this.b.setRequestHeader(b,a)},this);this.Vd&&(this.b.responseType=this.Vd);"withCredentials"in this.b&&this.b.withCredentials!==this.je&&(this.b.withCredentials=
	this.je);try{se(this),0<this.ob&&(this.Cc=te(this.b),C(this.T,re(this,"Will abort after "+this.ob+"ms if incomplete, xhr2 "+this.Cc)),this.Cc?(this.b.timeout=this.ob,this.b.ontimeout=r(this.Qb,this)):this.zc=je(this.Qb,this.ob,this)),C(this.T,re(this,"Sending request")),this.ic=!0,this.b.send(a),this.ic=!1}catch(f){C(this.T,re(this,"Send error: "+f.message)),this.O(5,f)}};var te=function(a){return z&&B(9)&&fa(a.timeout)&&void 0!==a.ontimeout},Fa=function(a){return"content-type"==a.toLowerCase()};
	G.prototype.Qb=function(){"undefined"!=typeof aa&&this.b&&(this.Ab="Timed out after "+this.ob+"ms, aborting",C(this.T,re(this,this.Ab)),this.dispatchEvent("timeout"),this.abort(8))};G.prototype.O=function(a,b){this.ra=!1;this.b&&(this.Fa=!0,this.b.abort(),this.Fa=!1);this.Ab=b;ue(this);ve(this)};var ue=function(a){a.Lc||(a.Lc=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))};
	G.prototype.abort=function(){this.b&&this.ra&&(C(this.T,re(this,"Aborting")),this.ra=!1,this.Fa=!0,this.b.abort(),this.Fa=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),ve(this))};G.prototype.Wa=function(){this.b&&(this.ra&&(this.ra=!1,this.Fa=!0,this.b.abort(),this.Fa=!1),ve(this,!0));G.pd.Wa.call(this)};G.prototype.Sd=function(){this.isDisposed()||(this.Sc||this.ic||this.Fa?we(this):this.af())};G.prototype.af=function(){we(this)};
	var we=function(a){if(a.ra&&"undefined"!=typeof aa)if(a.Ec[1]&&4==xe(a)&&2==ye(a))C(a.T,re(a,"Local request error detected and ignored"));else if(a.ic&&4==xe(a))je(a.Sd,0,a);else if(a.dispatchEvent("readystatechange"),4==xe(a)){C(a.T,re(a,"Request complete"));a.ra=!1;try{var b=ye(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}var d;if(!(d=c)){var e;if(e=0===b){var f=String(a.kc).match(le)[1]||null;if(!f&&l.self&&l.self.location)var g=l.self.location.protocol,
	f=g.substr(0,g.length-1);e=!pe.test(f?f.toLowerCase():"")}d=e}if(d)a.dispatchEvent("complete"),a.dispatchEvent("success");else{var k;try{k=2<xe(a)?a.b.statusText:""}catch(n){C(a.T,"Can not get status: "+n.message),k=""}a.Ab=k+" ["+ye(a)+"]";ue(a)}}finally{ve(a)}}};G.prototype.Rd=function(a,b){w("progress"===a.type,"goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");this.dispatchEvent(ze(a,"progress"));this.dispatchEvent(ze(a,b?"downloadprogress":"uploadprogress"))};
	var ze=function(a,b){return{type:b,lengthComputable:a.lengthComputable,loaded:a.loaded,total:a.total}},ve=function(a,b){if(a.b){se(a);var c=a.b,d=a.Ec[0]?ba:null;a.b=null;a.Ec=null;b||a.dispatchEvent("ready");try{c.onreadystatechange=d}catch(e){(a=a.T)&&a.log(Jc,"Problem encountered resetting onreadystatechange: "+e.message,void 0)}}},se=function(a){a.b&&a.Cc&&(a.b.ontimeout=null);fa(a.zc)&&(l.clearTimeout(a.zc),a.zc=null)},xe=function(a){return a.b?a.b.readyState:0},ye=function(a){try{return 2<xe(a)?
	a.b.status:-1}catch(b){return-1}},Ae=function(a){try{return a.b?a.b.responseText:""}catch(b){return C(a.T,"Can not get responseText: "+b.message),""}},re=function(a,b){return b+" ["+a.Od+" "+a.kc+" "+ye(a)+"]"};var Be=function(a,b){this.$=this.Pa=this.da="";this.eb=null;this.Ea=this.ta="";this.R=this.Se=!1;var c;a instanceof Be?(this.R=void 0!==b?b:a.R,Ce(this,a.da),c=a.Pa,H(this),this.Pa=c,De(this,a.$),Ee(this,a.eb),Fe(this,a.ta),Ge(this,a.V.clone()),a=a.Ea,H(this),this.Ea=a):a&&(c=String(a).match(le))?(this.R=!!b,Ce(this,c[1]||"",!0),a=c[2]||"",H(this),this.Pa=He(a),De(this,c[3]||"",!0),Ee(this,c[4]),Fe(this,c[5]||"",!0),Ge(this,c[6]||"",!0),a=c[7]||"",H(this),this.Ea=He(a)):(this.R=!!b,this.V=new I(null,
	0,this.R))};Be.prototype.toString=function(){var a=[],b=this.da;b&&a.push(Ie(b,Je,!0),":");var c=this.$;if(c||"file"==b)a.push("//"),(b=this.Pa)&&a.push(Ie(b,Je,!0),"@"),a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.eb,null!=c&&a.push(":",String(c));if(c=this.ta)this.$&&"/"!=c.charAt(0)&&a.push("/"),a.push(Ie(c,"/"==c.charAt(0)?Ke:Le,!0));(c=this.V.toString())&&a.push("?",c);(c=this.Ea)&&a.push("#",Ie(c,Me));return a.join("")};
	Be.prototype.resolve=function(a){var b=this.clone(),c=!!a.da;c?Ce(b,a.da):c=!!a.Pa;if(c){var d=a.Pa;H(b);b.Pa=d}else c=!!a.$;c?De(b,a.$):c=null!=a.eb;d=a.ta;if(c)Ee(b,a.eb);else if(c=!!a.ta){if("/"!=d.charAt(0))if(this.$&&!this.ta)d="/"+d;else{var e=b.ta.lastIndexOf("/");-1!=e&&(d=b.ta.substr(0,e+1)+d)}e=d;if(".."==e||"."==e)d="";else if(v(e,"./")||v(e,"/.")){for(var d=0==e.lastIndexOf("/",0),e=e.split("/"),f=[],g=0;g<e.length;){var k=e[g++];"."==k?d&&g==e.length&&f.push(""):".."==k?((1<f.length||
	1==f.length&&""!=f[0])&&f.pop(),d&&g==e.length&&f.push("")):(f.push(k),d=!0)}d=f.join("/")}else d=e}c?Fe(b,d):c=""!==a.V.toString();c?Ge(b,a.V.clone()):c=!!a.Ea;c&&(a=a.Ea,H(b),b.Ea=a);return b};Be.prototype.clone=function(){return new Be(this)};
	var Ce=function(a,b,c){H(a);a.da=c?He(b,!0):b;a.da&&(a.da=a.da.replace(/:$/,""))},De=function(a,b,c){H(a);a.$=c?He(b,!0):b},Ee=function(a,b){H(a);if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.eb=b}else a.eb=null},Fe=function(a,b,c){H(a);a.ta=c?He(b,!0):b},Ge=function(a,b,c){H(a);b instanceof I?(a.V=b,a.V.ld(a.R)):(c||(b=Ie(b,Ne)),a.V=new I(b,0,a.R))},J=function(a,b,c){H(a);a.V.set(b,c)},Oe=function(a,b){return a.V.get(b)},Pe=function(a,b){H(a);a.V.remove(b)},H=function(a){if(a.Se)throw Error("Tried to modify a read-only Uri");
	};Be.prototype.ld=function(a){this.R=a;this.V&&this.V.ld(a);return this};
	var Qe=function(a){return a instanceof Be?a.clone():new Be(a,void 0)},Re=function(a,b){var c=new Be(null,void 0);Ce(c,"https");a&&De(c,a);b&&Fe(c,b);return c},He=function(a,b){return a?b?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""},Ie=function(a,b,c){return p(a)?(a=encodeURI(a).replace(b,Se),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null},Se=function(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)},Je=/[#\/\?@]/g,Le=/[\#\?:]/g,Ke=/[\#\?]/g,Ne=/[\#\?@]/g,
	Me=/#/g,I=function(a,b,c){this.o=this.l=null;this.N=a||null;this.R=!!c},Te=function(a){a.l||(a.l=new zc,a.o=0,a.N&&me(a.N,function(b,c){a.add(decodeURIComponent(b.replace(/\+/g," ")),c)}))},Ve=function(a){var b=Dc(a);if("undefined"==typeof b)throw Error("Keys are undefined");var c=new I(null,0,void 0);a=Cc(a);for(var d=0;d<b.length;d++){var e=b[d],f=a[d];da(f)?Ue(c,e,f):c.add(e,f)}return c};h=I.prototype;
	h.add=function(a,b){Te(this);this.N=null;a=this.P(a);var c=this.l.get(a);c||this.l.set(a,c=[]);c.push(b);this.o=ya(this.o)+1;return this};h.remove=function(a){Te(this);a=this.P(a);return this.l.ub(a)?(this.N=null,this.o=ya(this.o)-this.l.get(a).length,this.l.remove(a)):!1};h.ub=function(a){Te(this);a=this.P(a);return this.l.ub(a)};h.ka=function(){Te(this);for(var a=this.l.X(),b=this.l.ka(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};
	h.X=function(a){Te(this);var b=[];if(p(a))this.ub(a)&&(b=La(b,this.l.get(this.P(a))));else{a=this.l.X();for(var c=0;c<a.length;c++)b=La(b,a[c])}return b};h.set=function(a,b){Te(this);this.N=null;a=this.P(a);this.ub(a)&&(this.o=ya(this.o)-this.l.get(a).length);this.l.set(a,[b]);this.o=ya(this.o)+1;return this};h.get=function(a,b){a=a?this.X(a):[];return 0<a.length?String(a[0]):b};var Ue=function(a,b,c){a.remove(b);0<c.length&&(a.N=null,a.l.set(a.P(b),Ma(c)),a.o=ya(a.o)+c.length)};
	I.prototype.toString=function(){if(this.N)return this.N;if(!this.l)return"";for(var a=[],b=this.l.ka(),c=0;c<b.length;c++)for(var d=b[c],e=encodeURIComponent(String(d)),d=this.X(d),f=0;f<d.length;f++){var g=e;""!==d[f]&&(g+="="+encodeURIComponent(String(d[f])));a.push(g)}return this.N=a.join("&")};I.prototype.clone=function(){var a=new I;a.N=this.N;this.l&&(a.l=this.l.clone(),a.o=this.o);return a};I.prototype.P=function(a){a=String(a);this.R&&(a=a.toLowerCase());return a};
	I.prototype.ld=function(a){a&&!this.R&&(Te(this),this.N=null,this.l.forEach(function(a,c){var b=c.toLowerCase();c!=b&&(this.remove(c),Ue(this,b,a))},this));this.R=a};var We=function(){var a=K();return z&&!!mb&&11==mb||/Edge\/\d+/.test(a)},Xe=function(){return l.window&&l.window.location.href||""},Ye=function(a,b){b=b||l.window;var c="about:blank";a&&(c=qc(tc(a)));b.location.href=c},Ze=function(a,b){var c=[],d;for(d in a)d in b?typeof a[d]!=typeof b[d]?c.push(d):da(a[d])?Ra(a[d],b[d])||c.push(d):"object"==typeof a[d]&&null!=a[d]&&null!=b[d]?0<Ze(a[d],b[d]).length&&c.push(d):a[d]!==b[d]&&c.push(d):c.push(d);for(d in b)d in a||c.push(d);return c},af=function(){var a;
	a=K();a="Chrome"!=$e(a)?null:(a=a.match(/\sChrome\/(\d+)/i))&&2==a.length?parseInt(a[1],10):null;return a&&30>a?!1:!z||!mb||9<mb},bf=function(a){a=(a||K()).toLowerCase();return a.match(/android/)||a.match(/webos/)||a.match(/iphone|ipad|ipod/)||a.match(/blackberry/)||a.match(/windows phone/)||a.match(/iemobile/)?!0:!1},cf=function(a){a=a||l.window;try{a.close()}catch(b){}},df=function(a,b,c){var d=Math.floor(1E9*Math.random()).toString();b=b||500;c=c||600;var e=(window.screen.availHeight-c)/2,f=(window.screen.availWidth-
	b)/2;b={width:b,height:c,top:0<e?e:0,left:0<f?f:0,location:!0,resizable:!0,statusbar:!0,toolbar:!1};c=K().toLowerCase();d&&(b.target=d,v(c,"crios/")&&(b.target="_blank"));"Firefox"==$e(K())&&(a=a||"http://localhost",b.scrollbars=!0);var g;c=a||"about:blank";(d=b)||(d={});a=window;b=c instanceof pc?c:tc("undefined"!=typeof c.href?c.href:String(c));c=d.target||c.target;e=[];for(g in d)switch(g){case "width":case "height":case "top":case "left":e.push(g+"="+d[g]);break;case "target":case "noreferrer":break;
	default:e.push(g+"="+(d[g]?1:0))}g=e.join(",");(y("iPhone")&&!y("iPod")&&!y("iPad")||y("iPad")||y("iPod"))&&a.navigator&&a.navigator.standalone&&c&&"_self"!=c?(g=a.document.createElement("A"),"undefined"!=typeof HTMLAnchorElement&&"undefined"!=typeof Location&&"undefined"!=typeof Element&&(e=g&&(g instanceof HTMLAnchorElement||!(g instanceof Location||g instanceof Element)),f=ga(g)?g.constructor.displayName||g.constructor.name||Object.prototype.toString.call(g):void 0===g?"undefined":null===g?"null":
	typeof g,w(e,"Argument is not a HTMLAnchorElement (or a non-Element mock); got: %s",f)),b=b instanceof pc?b:tc(b),g.href=qc(b),g.setAttribute("target",c),d.noreferrer&&g.setAttribute("rel","noreferrer"),d=document.createEvent("MouseEvent"),d.initMouseEvent("click",!0,!0,a,1),g.dispatchEvent(d),g={}):d.noreferrer?(g=a.open("",c,g),d=qc(b),g&&(db&&v(d,";")&&(d="'"+d.replace(/'/g,"%27")+"'"),g.opener=null,a=lc("b/12014412, meta tag with sanitized URL"),ta.test(d)&&(-1!=d.indexOf("&")&&(d=d.replace(na,
	"&amp;")),-1!=d.indexOf("<")&&(d=d.replace(oa,"&lt;")),-1!=d.indexOf(">")&&(d=d.replace(pa,"&gt;")),-1!=d.indexOf('"')&&(d=d.replace(qa,"&quot;")),-1!=d.indexOf("'")&&(d=d.replace(ra,"&#39;")),-1!=d.indexOf("\x00")&&(d=d.replace(sa,"&#0;"))),d='<META HTTP-EQUIV="refresh" content="0; url='+d+'">',za(kc(a),"must provide justification"),w(!/^[\s\xa0]*$/.test(kc(a)),"must provide non-empty justification"),g.document.write(wc((new vc).Pe(d))),g.document.close())):g=a.open(qc(b),c,g);if(g)try{g.focus()}catch(k){}return g},
	ef=function(a){return new D(function(b){var c=function(){ke(2E3).then(function(){if(!a||a.closed)b();else return c()})};return c()})},ff=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,gf=function(){var a=null;return(new D(function(b){"complete"==l.document.readyState?b():(a=function(){b()},ac(window,"load",a))})).f(function(b){cc(window,"load",a);throw b;})},jf=function(){return hf(void 0)?gf().then(function(){return new D(function(a,b){var c=l.document,d=setTimeout(function(){b(Error("Cordova framework is not ready."))},
	1E3);c.addEventListener("deviceready",function(){clearTimeout(d);a()},!1)})}):F(Error("Cordova must run in an Android or iOS file scheme."))},hf=function(a){a=a||K();return!("file:"!==kf()||!a.toLowerCase().match(/iphone|ipad|ipod|android/))},lf=function(){var a=l.window;try{return!(!a||a==a.top)}catch(b){return!1}},L=function(){return firebase.INTERNAL.hasOwnProperty("reactNative")?"ReactNative":firebase.INTERNAL.hasOwnProperty("node")?"Node":"Browser"},mf=function(){var a=L();return"ReactNative"===
	a||"Node"===a},$e=function(a){var b=a.toLowerCase();if(v(b,"opera/")||v(b,"opr/")||v(b,"opios/"))return"Opera";if(v(b,"iemobile"))return"IEMobile";if(v(b,"msie")||v(b,"trident/"))return"IE";if(v(b,"edge/"))return"Edge";if(v(b,"firefox/"))return"Firefox";if(v(b,"silk/"))return"Silk";if(v(b,"blackberry"))return"Blackberry";if(v(b,"webos"))return"Webos";if(!v(b,"safari/")||v(b,"chrome/")||v(b,"crios/")||v(b,"android"))if(!v(b,"chrome/")&&!v(b,"crios/")||v(b,"edge/")){if(v(b,"android"))return"Android";
	if((a=a.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/))&&2==a.length)return a[1]}else return"Chrome";else return"Safari";return"Other"},nf=function(a){var b=L();return("Browser"===b?$e(K()):b)+"/JsCore/"+a},K=function(){return l.navigator&&l.navigator.userAgent||""},M=function(a,b){a=a.split(".");b=b||l;for(var c=0;c<a.length&&"object"==typeof b&&null!=b;c++)b=b[a[c]];c!=a.length&&(b=void 0);return b},qf=function(){var a;if(a=(of()||"chrome-extension:"===kf()||hf()&&!1)&&!mf())a:{try{var b=l.localStorage,
	c=pf();if(b){b.setItem(c,"1");b.removeItem(c);a=We()?!!l.indexedDB:!0;break a}}catch(d){}a=!1}return a},of=function(){return"http:"===kf()||"https:"===kf()},kf=function(){return l.location&&l.location.protocol||null},rf=function(a){a=a||K();return bf(a)||"Firefox"==$e(a)?!1:!0},sf=function(a){return"undefined"===typeof a?null:Sc(a)},tf=function(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&null!==a[c]&&void 0!==a[c]&&(b[c]=a[c]);return b},uf=function(a){if(null!==a)return JSON.parse(a)},pf=function(a){return a?
	a:""+Math.floor(1E9*Math.random()).toString()},vf=function(a){a=a||K();return"Safari"==$e(a)||a.toLowerCase().match(/iphone|ipad|ipod/)?!1:!0},wf=function(){var a=l.___jsl;if(a&&a.H)for(var b in a.H)if(a.H[b].r=a.H[b].r||[],a.H[b].L=a.H[b].L||[],a.H[b].r=a.H[b].L.concat(),a.CP)for(var c=0;c<a.CP.length;c++)a.CP[c]=null},xf=function(){return l.navigator&&"boolean"===typeof l.navigator.onLine?l.navigator.onLine:!0},yf=function(a,b,c,d){if(a>b)throw Error("Short delay should be less than long delay!");
	this.tf=a;this.Ve=b;a=c||K();d=d||L();this.Re=bf(a)||"ReactNative"===d};yf.prototype.get=function(){return this.Re?this.Ve:this.tf};
	var zf=function(){var a=l.document;return a&&"undefined"!==typeof a.visibilityState?"visible"==a.visibilityState:!0},Af=function(){var a=l.document,b=null;return zf()||!a?E():(new D(function(c){b=function(){zf()&&(a.removeEventListener("visibilitychange",b,!1),c())};a.addEventListener("visibilitychange",b,!1)})).f(function(c){a.removeEventListener("visibilitychange",b,!1);throw c;})};var Bf;try{var Cf={};Object.defineProperty(Cf,"abcd",{configurable:!0,enumerable:!0,value:1});Object.defineProperty(Cf,"abcd",{configurable:!0,enumerable:!0,value:2});Bf=2==Cf.abcd}catch(a){Bf=!1}
	var N=function(a,b,c){Bf?Object.defineProperty(a,b,{configurable:!0,enumerable:!0,value:c}):a[b]=c},Df=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&N(a,c,b[c])},Ef=function(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b},Ff=function(a,b){if(!b||!b.length)return!0;if(!a)return!1;for(var c=0;c<b.length;c++){var d=a[b[c]];if(void 0===d||null===d||""===d)return!1}return!0},Gf=function(a){var b=a;if("object"==typeof a&&null!=a){var b="length"in a?[]:{},c;for(c in a)N(b,c,
	Gf(a[c]))}return b};var Hf="oauth_consumer_key oauth_nonce oauth_signature oauth_signature_method oauth_timestamp oauth_token oauth_version".split(" "),If=["client_id","response_type","scope","redirect_uri","state"],Jf={Df:{Fb:500,Eb:600,providerId:"facebook.com",hd:If},Ef:{Fb:500,Eb:620,providerId:"github.com",hd:If},Ff:{Fb:515,Eb:680,providerId:"google.com",hd:If},Gf:{Fb:485,Eb:705,providerId:"twitter.com",hd:Hf}},Kf=function(a){for(var b in Jf)if(Jf[b].providerId==a)return Jf[b];return null};var O=function(a,b){this.code="auth/"+a;this.message=b||Lf[a]||""};t(O,Error);O.prototype.C=function(){return{code:this.code,message:this.message}};O.prototype.toJSON=function(){return this.C()};
	var Mf=function(a){var b=a&&a.code;return b?new O(b.substring(5),a.message):null},Lf={"argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","cordova-not-ready":"Cordova framework is not ready.",
	"cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-already-in-use":"The email address is already in use by another account.",
	"expired-action-code":"The action code has expired. ","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal error has occurred.","invalid-user-token":"The user's credential is no longer valid. The user must sign in again.","invalid-auth-event":"An internal error has occurred.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
	"invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-email":"The email address is badly formatted.","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-credential":"The supplied auth credential is malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
	"invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.",
	"invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","missing-iframe-start":"An internal error has occurred.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
	"app-deleted":"This instance of FirebaseApp has been deleted.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network error (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal error has occurred.","no-such-provider":"User was not linked to an account with the given provider.",
	"operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.",
	"popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.",
	"too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","user-cancelled":"User did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.",
	"web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled."};var P=function(a,b,c,d,e){this.ga=a;this.F=b||null;this.qb=c||null;this.kd=d||null;this.O=e||null;if(this.qb||this.O){if(this.qb&&this.O)throw new O("invalid-auth-event");if(this.qb&&!this.kd)throw new O("invalid-auth-event");}else throw new O("invalid-auth-event");};P.prototype.ac=function(){return this.kd};P.prototype.getError=function(){return this.O};P.prototype.C=function(){return{type:this.ga,eventId:this.F,urlResponse:this.qb,sessionId:this.kd,error:this.O&&this.O.C()}};
	var Nf=function(a){a=a||{};return a.type?new P(a.type,a.eventId,a.urlResponse,a.sessionId,a.error&&Mf(a.error)):null};var Of=function(a){var b="unauthorized-domain",c=void 0,d=Qe(a);a=d.$;d=d.da;"chrome-extension"==d?c=la("This chrome extension ID (chrome-extension://%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.",a):"http"==d||"https"==d?c=la("This domain (%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.",a):b=
	"operation-not-supported-in-this-environment";O.call(this,b,c)};t(Of,O);var Pf=function(a){this.Ue=a.sub;ka();this.Yb=a.email||null};var Qf=function(a,b){if(b.idToken||b.accessToken)b.idToken&&N(this,"idToken",b.idToken),b.accessToken&&N(this,"accessToken",b.accessToken);else if(b.oauthToken&&b.oauthTokenSecret)N(this,"accessToken",b.oauthToken),N(this,"secret",b.oauthTokenSecret);else throw new O("internal-error","failed to construct a credential");N(this,"provider",a)};Qf.prototype.$b=function(a){return Rf(a,Sf(this))};Qf.prototype.Pd=function(a,b){var c=Sf(this);c.idToken=b;return Tf(a,c)};
	var Sf=function(a){var b={};a.idToken&&(b.id_token=a.idToken);a.accessToken&&(b.access_token=a.accessToken);a.secret&&(b.oauth_token_secret=a.secret);b.providerId=a.provider;return{postBody:Ve(b).toString(),requestUri:"http://localhost"}};Qf.prototype.C=function(){var a={provider:this.provider};this.idToken&&(a.oauthIdToken=this.idToken);this.accessToken&&(a.oauthAccessToken=this.accessToken);this.secret&&(a.oauthTokenSecret=this.secret);return a};
	var Uf=function(a,b){this.hf=b||[];Df(this,{providerId:a,isOAuthProvider:!0});this.yd={}};Uf.prototype.setCustomParameters=function(a){this.yd=Sa(a);return this};var Q=function(a){Uf.call(this,a,If);this.jd=[]};t(Q,Uf);Q.prototype.addScope=function(a){Ha(this.jd,a)||this.jd.push(a);return this};Q.prototype.Gd=function(){return Ma(this.jd)};
	Q.prototype.credential=function(a,b){if(!a&&!b)throw new O("argument-error","credential failed: must provide the ID token and/or the access token.");return new Qf(this.providerId,{idToken:a||null,accessToken:b||null})};var Vf=function(){Q.call(this,"facebook.com")};t(Vf,Q);N(Vf,"PROVIDER_ID","facebook.com");var Wf=function(a){if(!a)throw new O("argument-error","credential failed: expected 1 argument (the OAuth access token).");return(new Vf).credential(null,a)},Xf=function(){Q.call(this,"github.com")};
	t(Xf,Q);N(Xf,"PROVIDER_ID","github.com");var Yf=function(a){if(!a)throw new O("argument-error","credential failed: expected 1 argument (the OAuth access token).");return(new Xf).credential(null,a)},Zf=function(){Q.call(this,"google.com");this.addScope("profile")};t(Zf,Q);N(Zf,"PROVIDER_ID","google.com");var $f=function(a,b){return(new Zf).credential(a,b)},ag=function(){Uf.call(this,"twitter.com",Hf)};t(ag,Uf);N(ag,"PROVIDER_ID","twitter.com");
	var bg=function(a,b){if(!a||!b)throw new O("argument-error","credential failed: expected 2 arguments (the OAuth access token and secret).");return new Qf("twitter.com",{oauthToken:a,oauthTokenSecret:b})},cg=function(a,b){this.Yb=a;this.ad=b;N(this,"provider","password")};cg.prototype.$b=function(a){return R(a,dg,{email:this.Yb,password:this.ad})};cg.prototype.Pd=function(a,b){return R(a,eg,{idToken:b,email:this.Yb,password:this.ad})};cg.prototype.C=function(){return{email:this.Yb,password:this.ad}};
	var fg=function(){Df(this,{providerId:"password",isOAuthProvider:!1})};Df(fg,{PROVIDER_ID:"password"});
	var gg=function(a){var b=a&&a.providerId;if(!b||"password"===b)return null;var c=a&&a.oauthAccessToken,d=a&&a.oauthTokenSecret;a=a&&a.oauthIdToken;try{switch(b){case "google.com":return $f(a,c);case "facebook.com":return Wf(c);case "github.com":return Yf(c);case "twitter.com":return bg(c,d);default:return(new Q(b)).credential(a,c)}}catch(e){return null}},hg=function(a){if(!a.isOAuthProvider)throw new O("invalid-oauth-provider");};var ig=function(a,b,c,d){O.call(this,a,d);N(this,"email",b);N(this,"credential",c)};t(ig,O);ig.prototype.C=function(){var a={code:this.code,message:this.message,email:this.email},b=this.credential&&this.credential.C();b&&(Ua(a,b),a.providerId=b.provider,delete a.provider);return a};ig.prototype.toJSON=function(){return this.C()};var jg=function(a){if(a.code){var b=a.code||"";0==b.indexOf("auth/")&&(b=b.substring(5));return a.email?new ig(b,a.email,gg(a),a.message):new O(b,a.message||void 0)}return null};var kg=function(a){this.Cf=a};t(kg,Wc);kg.prototype.Xb=function(){return new this.Cf};kg.prototype.Uc=function(){return{}};
	var S=function(a,b,c){var d;d="Node"==L();d=l.XMLHttpRequest||d&&firebase.INTERNAL.node&&firebase.INTERNAL.node.XMLHttpRequest;if(!d)throw new O("internal-error","The XMLHttpRequest compatibility library was not found.");this.j=a;a=b||{};this.pf=a.secureTokenEndpoint||"https://securetoken.googleapis.com/v1/token";this.qf=a.secureTokenTimeout||lg;this.Yd=Sa(a.secureTokenHeaders||mg);this.Ae=a.firebaseEndpoint||"https://www.googleapis.com/identitytoolkit/v3/relyingparty/";this.Be=a.firebaseTimeout||
	ng;this.Ed=Sa(a.firebaseHeaders||og);c&&(this.Ed["X-Client-Version"]=c,this.Yd["X-Client-Version"]=c);this.te=new ad;this.Bf=new kg(d)},pg,lg=new yf(3E4,6E4),mg={"Content-Type":"application/x-www-form-urlencoded"},ng=new yf(3E4,6E4),og={"Content-Type":"application/json"},rg=function(a,b,c,d,e,f,g){xf()?(af()?a=r(a.sf,a):(pg||(pg=new D(function(a,b){qg(a,b)})),a=r(a.rf,a)),a(b,c,d,e,f,g)):c&&c(null)};
	S.prototype.sf=function(a,b,c,d,e,f){var g="Node"==L(),k=mf()?g?new G(this.Bf):new G:new G(this.te),n;f&&(k.ob=Math.max(0,f),n=setTimeout(function(){k.dispatchEvent("timeout")},f));k.listen("complete",function(){n&&clearTimeout(n);var a=null;try{a=JSON.parse(Ae(this))||null}catch(Xa){a=null}b&&b(a)});bc(k,"ready",function(){n&&clearTimeout(n);this.Ba||(this.Ba=!0,this.Wa())});bc(k,"timeout",function(){n&&clearTimeout(n);this.Ba||(this.Ba=!0,this.Wa());b&&b(null)});k.send(a,c,d,e)};
	var Wd="__fcb"+Math.floor(1E6*Math.random()).toString(),qg=function(a,b){((window.gapi||{}).client||{}).request?a():(l[Wd]=function(){((window.gapi||{}).client||{}).request?a():b(Error("CORS_UNSUPPORTED"))},Yd(function(){b(Error("CORS_UNSUPPORTED"))}))};
	S.prototype.rf=function(a,b,c,d,e){var f=this;pg.then(function(){window.gapi.client.setApiKey(f.j);var g=window.gapi.auth.getToken();window.gapi.auth.setToken(null);window.gapi.client.request({path:a,method:c,body:d,headers:e,authType:"none",callback:function(a){window.gapi.auth.setToken(g);b&&b(a)}})}).f(function(a){b&&b({error:{message:a&&a.message||"CORS_UNSUPPORTED"}})})};
	var tg=function(a,b){return new D(function(c,d){"refresh_token"==b.grant_type&&b.refresh_token||"authorization_code"==b.grant_type&&b.code?rg(a,a.pf+"?key="+encodeURIComponent(a.j),function(a){a?a.error?d(sg(a)):a.access_token&&a.refresh_token?c(a):d(new O("internal-error")):d(new O("network-request-failed"))},"POST",Ve(b).toString(),a.Yd,a.qf.get()):d(new O("internal-error"))})},ug=function(a,b,c,d,e){var f=Qe(a.Ae+b);J(f,"key",a.j);e&&J(f,"cb",ka().toString());var g="GET"==c;if(g)for(var k in d)d.hasOwnProperty(k)&&
	J(f,k,d[k]);return new D(function(b,e){rg(a,f.toString(),function(a){a?a.error?e(sg(a)):b(a):e(new O("network-request-failed"))},c,g?void 0:Sc(tf(d)),a.Ed,a.Be.get())})},vg=function(a){if(!hc.test(a.email))throw new O("invalid-email");},wg=function(a){"email"in a&&vg(a)},yg=function(a,b){return R(a,xg,{identifier:b,continueUri:of()?Xe():"http://localhost"}).then(function(a){return a.allProviders||[]})},Ag=function(a){return R(a,zg,{}).then(function(a){return a.authorizedDomains||[]})},Bg=function(a){if(!a.idToken)throw new O("internal-error");
	};S.prototype.signInAnonymously=function(){return R(this,Cg,{})};S.prototype.updateEmail=function(a,b){return R(this,Dg,{idToken:a,email:b})};S.prototype.updatePassword=function(a,b){return R(this,eg,{idToken:a,password:b})};var Eg={displayName:"DISPLAY_NAME",photoUrl:"PHOTO_URL"};S.prototype.updateProfile=function(a,b){var c={idToken:a},d=[];Na(Eg,function(a,f){var e=b[f];null===e?d.push(a):f in b&&(c[f]=e)});d.length&&(c.deleteAttribute=d);return R(this,Dg,c)};
	S.prototype.sendPasswordResetEmail=function(a){return R(this,Fg,{requestType:"PASSWORD_RESET",email:a})};S.prototype.sendEmailVerification=function(a){return R(this,Gg,{requestType:"VERIFY_EMAIL",idToken:a})};
	var Ig=function(a,b,c){return R(a,Hg,{idToken:b,deleteProvider:c})},Jg=function(a){if(!a.requestUri||!a.sessionId&&!a.postBody)throw new O("internal-error");},Kg=function(a){var b=null;a.needConfirmation?(a.code="account-exists-with-different-credential",b=jg(a)):"FEDERATED_USER_ID_ALREADY_LINKED"==a.errorMessage?(a.code="credential-already-in-use",b=jg(a)):"EMAIL_EXISTS"==a.errorMessage&&(a.code="email-already-in-use",b=jg(a));if(b)throw b;if(!a.idToken)throw new O("internal-error");},Rf=function(a,
	b){b.returnIdpCredential=!0;return R(a,Lg,b)},Tf=function(a,b){b.returnIdpCredential=!0;return R(a,Mg,b)},Ng=function(a){if(!a.oobCode)throw new O("invalid-action-code");};S.prototype.confirmPasswordReset=function(a,b){return R(this,Og,{oobCode:a,newPassword:b})};S.prototype.checkActionCode=function(a){return R(this,Pg,{oobCode:a})};S.prototype.applyActionCode=function(a){return R(this,Qg,{oobCode:a})};
	var Qg={endpoint:"setAccountInfo",K:Ng,nb:"email"},Pg={endpoint:"resetPassword",K:Ng,va:function(a){if(!a.email||!a.requestType)throw new O("internal-error");}},Rg={endpoint:"signupNewUser",K:function(a){vg(a);if(!a.password)throw new O("weak-password");},va:Bg,wa:!0},xg={endpoint:"createAuthUri"},Sg={endpoint:"deleteAccount",mb:["idToken"]},Hg={endpoint:"setAccountInfo",mb:["idToken","deleteProvider"],K:function(a){if(!da(a.deleteProvider))throw new O("internal-error");}},Tg={endpoint:"getAccountInfo"},
	Gg={endpoint:"getOobConfirmationCode",mb:["idToken","requestType"],K:function(a){if("VERIFY_EMAIL"!=a.requestType)throw new O("internal-error");},nb:"email"},Fg={endpoint:"getOobConfirmationCode",mb:["requestType"],K:function(a){if("PASSWORD_RESET"!=a.requestType)throw new O("internal-error");vg(a)},nb:"email"},zg={se:!0,endpoint:"getProjectConfig",Le:"GET"},Og={endpoint:"resetPassword",K:Ng,nb:"email"},Dg={endpoint:"setAccountInfo",mb:["idToken"],K:wg,wa:!0},eg={endpoint:"setAccountInfo",mb:["idToken"],
	K:function(a){wg(a);if(!a.password)throw new O("weak-password");},va:Bg,wa:!0},Cg={endpoint:"signupNewUser",va:Bg,wa:!0},Lg={endpoint:"verifyAssertion",K:Jg,va:Kg,wa:!0},Mg={endpoint:"verifyAssertion",K:function(a){Jg(a);if(!a.idToken)throw new O("internal-error");},va:Kg,wa:!0},Ug={endpoint:"verifyCustomToken",K:function(a){if(!a.token)throw new O("invalid-custom-token");},va:Bg,wa:!0},dg={endpoint:"verifyPassword",K:function(a){vg(a);if(!a.password)throw new O("wrong-password");},va:Bg,wa:!0},R=
	function(a,b,c){if(!Ff(c,b.mb))return F(new O("internal-error"));var d=b.Le||"POST",e;return E(c).then(b.K).then(function(){b.wa&&(c.returnSecureToken=!0);return ug(a,b.endpoint,d,c,b.se||!1)}).then(function(a){return e=a}).then(b.va).then(function(){if(!b.nb)return e;if(!(b.nb in e))throw new O("internal-error");return e[b.nb]})},sg=function(a){var b,c;c=(a.error&&a.error.errors&&a.error.errors[0]||{}).reason||"";var d={keyInvalid:"invalid-api-key",ipRefererBlocked:"app-not-authorized"};if(c=d[c]?
	new O(d[c]):null)return c;c=a.error&&a.error.message||"";d={INVALID_CUSTOM_TOKEN:"invalid-custom-token",CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_EMAIL:"invalid-email",INVALID_PASSWORD:"wrong-password",USER_DISABLED:"user-disabled",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",
	FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",INVALID_MESSAGE_PAYLOAD:"invalid-message-payload",INVALID_RECIPIENT_EMAIL:"invalid-recipient-email",INVALID_SENDER:"invalid-sender",EMAIL_NOT_FOUND:"user-not-found",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",
	CORS_UNSUPPORTED:"cors-unsupported",DYNAMIC_LINK_NOT_ACTIVATED:"dynamic-link-not-activated",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",WEAK_PASSWORD:"weak-password",OPERATION_NOT_ALLOWED:"operation-not-allowed",USER_CANCELLED:"user-cancelled"};b=(b=c.match(/^[^\s]+\s*:\s*(.*)$/))&&1<b.length?b[1]:void 0;for(var e in d)if(0===c.indexOf(e))return new O(d[e],b);!b&&a&&(b=sf(a));return new O("internal-error",b)};var Vg=function(a){this.U=a};Vg.prototype.value=function(){return this.U};Vg.prototype.ae=function(a){this.U.style=a;return this};var Wg=function(a){this.U=a||{}};Wg.prototype.value=function(){return this.U};Wg.prototype.ae=function(a){this.U.style=a;return this};var Yg=function(a){this.zf=a;this.gc=null;this.Zc=Xg(this)},Zg=function(a){var b=new Wg;b.U.where=document.body;b.U.url=a.zf;b.U.messageHandlersFilter=M("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER");b.U.attributes=b.U.attributes||{};(new Vg(b.U.attributes)).ae({position:"absolute",top:"-100px",width:"1px",height:"1px"});b.U.dontclear=!0;return b},Xg=function(a){return $g().then(function(){return new D(function(b,c){M("gapi.iframes.getContext")().open(Zg(a).value(),function(d){a.gc=d;a.gc.restyle({setHideOnLeave:!1});
	var e=setTimeout(function(){c(Error("Network Error"))},ah.get()),f=function(){clearTimeout(e);b()};d.ping(f).then(f,function(){c(Error("Network Error"))})})})})};Yg.prototype.sendMessage=function(a){var b=this;return this.Zc.then(function(){return new D(function(c){b.gc.send(a.type,a,c,M("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))})})};
	var bh=function(a,b){a.Zc.then(function(){a.gc.register("authEvent",b,M("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))})},ch=new yf(3E4,6E4),ah=new yf(5E3,15E3),$g=function(){return new D(function(a,b){if(xf()){var c=function(){wf();M("gapi.load")("gapi.iframes",{callback:a,ontimeout:function(){wf();b(Error("Network Error"))},timeout:ch.get()})};if(M("gapi.iframes.Iframe"))a();else if(M("gapi.load"))c();else{var d="__iframefcb"+Math.floor(1E6*Math.random()).toString();l[d]=function(){M("gapi.load")?
	c():b(Error("Network Error"))};E(Vd("https://apis.google.com/js/api.js?onload="+d)).f(function(){b(Error("Network Error"))})}}else b(Error("Network Error"))})};var dh=function(a,b,c){this.v=a;this.j=b;this.B=c;this.Qa=null;this.Sb=Re(this.v,"/__/auth/iframe");J(this.Sb,"apiKey",this.j);J(this.Sb,"appName",this.B)};dh.prototype.setVersion=function(a){this.Qa=a;return this};dh.prototype.toString=function(){this.Qa?J(this.Sb,"v",this.Qa):Pe(this.Sb,"v");return this.Sb.toString()};var eh=function(a,b,c,d,e){this.v=a;this.j=b;this.B=c;this.re=d;this.Qa=this.F=this.fd=null;this.Ib=e};eh.prototype.setVersion=function(a){this.Qa=a;return this};
	eh.prototype.toString=function(){var a=Re(this.v,"/__/auth/handler");J(a,"apiKey",this.j);J(a,"appName",this.B);J(a,"authType",this.re);if(this.Ib.isOAuthProvider){J(a,"providerId",this.Ib.providerId);var b=this.Ib,c=tf(b.yd),d;for(d in c)c[d]=c[d].toString();b=b.hf;c=Sa(c);for(d=0;d<b.length;d++){var e=b[d];e in c&&delete c[e]}Qa(c)||J(a,"customParameters",sf(c))}"function"===typeof this.Ib.Gd&&(b=this.Ib.Gd(),b.length&&J(a,"scopes",b.join(",")));this.fd?J(a,"redirectUrl",this.fd):Pe(a,"redirectUrl");
	this.F?J(a,"eventId",this.F):Pe(a,"eventId");this.Qa?J(a,"v",this.Qa):Pe(a,"v");if(this.Tb)for(var f in this.Tb)this.Tb.hasOwnProperty(f)&&!Oe(a,f)&&J(a,f,this.Tb[f]);return a.toString()};
	var fh=function(a,b,c,d){this.v=a;this.j=b;this.B=c;this.De=(this.Aa=d||null)?nf(this.Aa):null;d=this.Aa;this.Me=(new dh(a,b,c)).setVersion(d).toString();this.ia=[];this.g=new S(b,null,this.De);this.jc=this.sa=null},hh=function(a){var b=Xe();return Ag(a).then(function(a){a:{for(var c=Qe(b),e=c.da,c=c.$,f=0;f<a.length;f++){var g;var k=a[f];g=c;var n=e;0==k.indexOf("chrome-extension://")?g=Qe(k).$==g&&"chrome-extension"==n:"http"!=n&&"https"!=n?g=!1:ff.test(k)?g=g==k:(k=k.split(".").join("\\."),g=(new RegExp("^(.+\\."+
	k+"|"+k+")$","i")).test(g));if(g){a=!0;break a}}a=!1}if(!a)throw new Of(Xe());})};h=fh.prototype;h.zb=function(){if(this.jc)return this.jc;var a=this;return this.jc=gf().then(function(){a.fc=new Yg(a.Me);ih(a)})};h.Nb=function(a,b,c){var d=new O("popup-closed-by-user"),e=new O("web-storage-unsupported"),f=this,g=!1;return this.Ga().then(function(){jh(f).then(function(c){c||(a&&cf(a),b(e),g=!0)})}).f(function(){}).then(function(){if(!g)return ef(a)}).then(function(){if(!g)return ke(c).then(function(){b(d)})})};
	h.be=function(){var a=K();return!rf(a)&&!vf(a)};h.Jd=function(){return!1};h.Gb=function(a,b,c,d,e,f,g){if(!a)return F(new O("popup-blocked"));if(g&&!rf())return this.Ga().f(function(b){cf(a);e(b)}),d(),E();this.sa||(this.sa=hh(this.g));var k=this;return this.sa.then(function(){var b=k.Ga().f(function(b){cf(a);e(b);throw b;});d();return b}).then(function(){hg(c);if(!g){var d=kh(k.v,k.j,k.B,b,c,null,f,k.Aa);Ye(d,a)}}).f(function(a){"auth/network-request-failed"==a.code&&(k.sa=null);throw a;})};
	h.Hb=function(a,b,c){this.sa||(this.sa=hh(this.g));var d=this;return this.sa.then(function(){hg(b);var e=kh(d.v,d.j,d.B,a,b,Xe(),c,d.Aa);Ye(e)})};h.Ga=function(){var a=this;return this.zb().then(function(){return a.fc.Zc}).f(function(){a.sa=null;throw new O("network-request-failed");})};h.ee=function(){return!0};
	var kh=function(a,b,c,d,e,f,g,k,n){a=new eh(a,b,c,d,e);a.fd=f;a.F=g;f=a.setVersion(k);f.Tb=Sa(n||null);return f.toString()},ih=function(a){if(!a.fc)throw Error("IfcHandler must be initialized!");bh(a.fc,function(b){var c={};if(b&&b.authEvent){var d=!1;b=Nf(b.authEvent);for(c=0;c<a.ia.length;c++)d=a.ia[c](b)||d;c={};c.status=d?"ACK":"ERROR";return E(c)}c.status="ERROR";return E(c)})},jh=function(a){var b={type:"webStorageSupport"};return a.zb().then(function(){return a.fc.sendMessage(b)}).then(function(a){if(a&&
	a.length&&"undefined"!==typeof a[0].webStorageSupport)return a[0].webStorageSupport;throw Error();})};fh.prototype.Sa=function(a){this.ia.push(a)};fh.prototype.Lb=function(a){Ka(this.ia,function(b){return b==a})};var lh=function(a){this.A=a||firebase.INTERNAL.reactNative&&firebase.INTERNAL.reactNative.AsyncStorage;if(!this.A)throw new O("internal-error","The React Native compatibility library was not found.");};h=lh.prototype;h.get=function(a){return E(this.A.getItem(a)).then(function(a){return a&&uf(a)})};h.set=function(a,b){return E(this.A.setItem(a,sf(b)))};h.remove=function(a){return E(this.A.removeItem(a))};h.Ta=function(){};h.Na=function(){};var mh=function(){this.A={}};h=mh.prototype;h.get=function(a){return E(this.A[a])};h.set=function(a,b){this.A[a]=b;return E()};h.remove=function(a){delete this.A[a];return E()};h.Ta=function(){};h.Na=function(){};var oh=function(){if(!nh()){if("Node"==L())throw new O("internal-error","The LocalStorage compatibility library was not found.");throw new O("web-storage-unsupported");}this.A=l.localStorage||firebase.INTERNAL.node.localStorage},nh=function(){var a="Node"==L(),a=l.localStorage||a&&firebase.INTERNAL.node&&firebase.INTERNAL.node.localStorage;if(!a)return!1;try{return a.setItem("__sak","1"),a.removeItem("__sak"),!0}catch(b){return!1}};h=oh.prototype;
	h.get=function(a){var b=this;return E().then(function(){var c=b.A.getItem(a);return uf(c)})};h.set=function(a,b){var c=this;return E().then(function(){var d=sf(b);null===d?c.remove(a):c.A.setItem(a,d)})};h.remove=function(a){var b=this;return E().then(function(){b.A.removeItem(a)})};h.Ta=function(a){l.window&&Ub(l.window,"storage",a)};h.Na=function(a){l.window&&cc(l.window,"storage",a)};var ph=function(){this.A={}};h=ph.prototype;h.get=function(){return E(null)};h.set=function(){return E()};h.remove=function(){return E()};h.Ta=function(){};h.Na=function(){};var rh=function(){if(!qh()){if("Node"==L())throw new O("internal-error","The SessionStorage compatibility library was not found.");throw new O("web-storage-unsupported");}this.A=l.sessionStorage||firebase.INTERNAL.node.sessionStorage},qh=function(){var a="Node"==L(),a=l.sessionStorage||a&&firebase.INTERNAL.node&&firebase.INTERNAL.node.sessionStorage;if(!a)return!1;try{return a.setItem("__sak","1"),a.removeItem("__sak"),!0}catch(b){return!1}};h=rh.prototype;
	h.get=function(a){var b=this;return E().then(function(){var c=b.A.getItem(a);return uf(c)})};h.set=function(a,b){var c=this;return E().then(function(){var d=sf(b);null===d?c.remove(a):c.A.setItem(a,d)})};h.remove=function(a){var b=this;return E().then(function(){b.A.removeItem(a)})};h.Ta=function(){};h.Na=function(){};var sh=function(a,b,c,d,e,f){if(!window.indexedDB)throw new O("web-storage-unsupported");this.ve=a;this.Yc=b;this.Kc=c;this.ie=d;this.sb=e;this.Y={};this.Ob=[];this.Cb=0;this.Ne=f||l.indexedDB},th,uh=function(a){return new D(function(b,c){var d=a.Ne.open(a.ve,a.sb);d.onerror=function(a){c(Error(a.target.errorCode))};d.onupgradeneeded=function(b){b=b.target.result;try{b.createObjectStore(a.Yc,{keyPath:a.Kc})}catch(f){c(f)}};d.onsuccess=function(a){b(a.target.result)}})},vh=function(a){a.Md||(a.Md=
	uh(a));return a.Md},wh=function(a,b){return b.objectStore(a.Yc)},xh=function(a,b,c){return b.transaction([a.Yc],c?"readwrite":"readonly")},yh=function(a){return new D(function(b,c){a.onsuccess=function(a){a&&a.target?b(a.target.result):b()};a.onerror=function(a){c(Error(a.target.errorCode))}})};h=sh.prototype;
	h.set=function(a,b){var c=!1,d,e=this;return Ed(vh(this).then(function(b){d=b;b=wh(e,xh(e,d,!0));return yh(b.get(a))}).then(function(f){var g=wh(e,xh(e,d,!0));if(f)return f.value=b,yh(g.put(f));e.Cb++;c=!0;f={};f[e.Kc]=a;f[e.ie]=b;return yh(g.add(f))}).then(function(){e.Y[a]=b}),function(){c&&e.Cb--})};h.get=function(a){var b=this;return vh(this).then(function(c){return yh(wh(b,xh(b,c,!1)).get(a))}).then(function(a){return a&&a.value})};
	h.remove=function(a){var b=!1,c=this;return Ed(vh(this).then(function(d){b=!0;c.Cb++;return yh(wh(c,xh(c,d,!0))["delete"](a))}).then(function(){delete c.Y[a]}),function(){b&&c.Cb--})};
	h.vf=function(){var a=this;return vh(this).then(function(b){var c=wh(a,xh(a,b,!1));return c.getAll?yh(c.getAll()):new D(function(a,b){var d=[],e=c.openCursor();e.onsuccess=function(b){(b=b.target.result)?(d.push(b.value),b["continue"]()):a(d)};e.onerror=function(a){b(Error(a.target.errorCode))}})}).then(function(b){var c={},d=[];if(0==a.Cb){for(d=0;d<b.length;d++)c[b[d][a.Kc]]=b[d][a.ie];d=Ze(a.Y,c);a.Y=c}return d})};h.Ta=function(a){0==this.Ob.length&&this.nd();this.Ob.push(a)};
	h.Na=function(a){Ka(this.Ob,function(b){return b==a});0==this.Ob.length&&this.wc()};h.nd=function(){var a=this;this.wc();var b=function(){a.bd=ke(800).then(r(a.vf,a)).then(function(b){0<b.length&&x(a.Ob,function(a){a(b)})}).then(b).f(function(a){"STOP_EVENT"!=a.message&&b()});return a.bd};b()};h.wc=function(){this.bd&&this.bd.cancel("STOP_EVENT")};var Ch=function(){this.Bd={Browser:zh,Node:Ah,ReactNative:Bh}[L()]},Dh,zh={I:oh,qd:rh},Ah={I:oh,qd:rh},Bh={I:lh,qd:ph};var Eh=function(a){var b={},c=a.email,d=a.newEmail;a=a.requestType;if(!c||!a)throw Error("Invalid provider user info!");b.fromEmail=d||null;b.email=c;N(this,"operation",a);N(this,"data",Gf(b))};var Fh="First Second Third Fourth Fifth Sixth Seventh Eighth Ninth".split(" "),T=function(a,b){return{name:a||"",fa:"a valid string",optional:!!b,ha:p}},Gh=function(a){return{name:a||"",fa:"a valid object",optional:!1,ha:ga}},Hh=function(a,b){return{name:a||"",fa:"a function",optional:!!b,ha:q}},Ih=function(){return{name:"",fa:"null",optional:!1,ha:ca}},Jh=function(){return{name:"credential",fa:"a valid credential",optional:!1,ha:function(a){return!(!a||!a.$b)}}},Kh=function(){return{name:"authProvider",
	fa:"a valid Auth provider",optional:!1,ha:function(a){return!!(a&&a.providerId&&a.hasOwnProperty&&a.hasOwnProperty("isOAuthProvider"))}}},Lh=function(a,b,c,d){return{name:c||"",fa:a.fa+" or "+b.fa,optional:!!d,ha:function(c){return a.ha(c)||b.ha(c)}}};var Mh=function(a,b,c,d,e,f){this.bf=a;this.kf=b;this.Fe=c;this.lc=d;this.rd=e;this.lf=!!f;this.cb=null;this.Ha=this.lc;if(this.rd<this.lc)throw Error("Proactive refresh lower bound greater than upper bound!");};Mh.prototype.start=function(){this.Ha=this.lc;Nh(this,!0)};
	var Oh=function(a,b){if(b)return a.Ha=a.lc,a.Fe();b=a.Ha;a.Ha*=2;a.Ha>a.rd&&(a.Ha=a.rd);return b},Nh=function(a,b){a.stop();a.cb=ke(Oh(a,b)).then(function(){return a.lf?E():Af()}).then(function(){return a.bf()}).then(function(){Nh(a,!0)}).f(function(b){a.kf(b)&&Nh(a,!1)})};Mh.prototype.stop=function(){this.cb&&(this.cb.cancel(),this.cb=null)};var U=function(a,b){for(var c in b){var d=b[c].name;a[d]=Ph(d,a[c],b[c].a)}},V=function(a,b,c,d){a[b]=Ph(b,c,d)},Ph=function(a,b,c){if(!c)return b;var d=Qh(a);a=function(){var a=Array.prototype.slice.call(arguments),e;a:{e=Array.prototype.slice.call(a);var k;k=0;for(var n=!1,A=0;A<c.length;A++)if(c[A].optional)n=!0;else{if(n)throw new O("internal-error","Argument validator encountered a required argument after an optional argument.");k++}n=c.length;if(e.length<k||n<e.length)e="Expected "+(k==n?1==
	k?"1 argument":k+" arguments":k+"-"+n+" arguments")+" but got "+e.length+".";else{for(k=0;k<e.length;k++)if(n=c[k].optional&&void 0===e[k],!c[k].ha(e[k])&&!n){e=c[k];if(0>k||k>=Fh.length)throw new O("internal-error","Argument validator received an unsupported number of arguments.");e=Fh[k]+" argument "+(e.name?'"'+e.name+'" ':"")+"must be "+e.fa+".";break a}e=null}}if(e)throw new O("argument-error",d+" failed: "+e);return b.apply(this,a)};for(var e in b)a[e]=b[e];for(e in b.prototype)a.prototype[e]=
	b.prototype[e];return a},Qh=function(a){a=a.split(".");return a[a.length-1]};var Rh=function(a,b,c,d){this.Ye=a;this.Zd=b;this.mf=c;this.Mb=d;this.S={};Dh||(Dh=new Ch);a=Dh;try{var e;We()?(th||(th=new sh("firebaseLocalStorageDb","firebaseLocalStorage","fbase_key","value",1)),e=th):e=new a.Bd.I;this.La=e}catch(f){this.La=new mh,this.Mb=!0}try{this.yc=new a.Bd.qd}catch(f){this.yc=new mh}this.od=r(this.ce,this);this.Y={}},Sh,Th=function(){Sh||(Sh=new Rh("firebase",":",!vf(K())&&lf()?!0:!1,rf()));return Sh};h=Rh.prototype;
	h.P=function(a,b){return this.Ye+this.Zd+a.name+(b?this.Zd+b:"")};h.get=function(a,b){return(a.I?this.La:this.yc).get(this.P(a,b))};h.remove=function(a,b){b=this.P(a,b);a.I&&!this.Mb&&(this.Y[b]=null);return(a.I?this.La:this.yc).remove(b)};h.set=function(a,b,c){var d=this.P(a,c),e=this,f=a.I?this.La:this.yc;return f.set(d,b).then(function(){return f.get(d)}).then(function(b){a.I&&!this.Mb&&(e.Y[d]=b)})};
	h.addListener=function(a,b,c){a=this.P(a,b);this.Mb||(this.Y[a]=l.localStorage.getItem(a));Qa(this.S)&&this.nd();this.S[a]||(this.S[a]=[]);this.S[a].push(c)};h.removeListener=function(a,b,c){a=this.P(a,b);this.S[a]&&(Ka(this.S[a],function(a){return a==c}),0==this.S[a].length&&delete this.S[a]);Qa(this.S)&&this.wc()};h.nd=function(){this.La.Ta(this.od);this.Mb||We()||Uh(this)};
	var Uh=function(a){Vh(a);a.Xc=setInterval(function(){for(var b in a.S){var c=l.localStorage.getItem(b),d=a.Y[b];c!=d&&(a.Y[b]=c,c=new Jb({type:"storage",key:b,target:window,oldValue:d,newValue:c,df:!0}),a.ce(c))}},1E3)},Vh=function(a){a.Xc&&(clearInterval(a.Xc),a.Xc=null)};Rh.prototype.wc=function(){this.La.Na(this.od);Vh(this)};
	Rh.prototype.ce=function(a){if(a&&a.Ee){var b=a.Xa.key;"undefined"!==typeof a.Xa.df?this.La.Na(this.od):Vh(this);if(this.mf){var c=l.localStorage.getItem(b);a=a.Xa.newValue;a!=c&&(a?l.localStorage.setItem(b,a):a||l.localStorage.removeItem(b))}this.Y[b]=l.localStorage.getItem(b);this.ud(b)}else x(a,r(this.ud,this))};Rh.prototype.ud=function(a){this.S[a]&&x(this.S[a],function(a){a()})};var Wh=function(a,b){this.u=a;this.i=b||Th()},Xh={name:"authEvent",I:!0},Yh=function(a){return a.i.get(Xh,a.u).then(function(a){return Nf(a)})};Wh.prototype.Sa=function(a){this.i.addListener(Xh,this.u,a)};Wh.prototype.Lb=function(a){this.i.removeListener(Xh,this.u,a)};var Zh=function(a){this.i=a||Th()},$h={name:"sessionId",I:!1};Zh.prototype.ac=function(a){return this.i.get($h,a)};var ai=function(a,b,c,d,e,f){this.v=a;this.j=b;this.B=c;this.Aa=d||null;this.de=b+":"+c;this.nf=new Zh;this.Fd=new Wh(this.de);this.Tc=null;this.ia=[];this.Qe=e||500;this.ff=f||2E3;this.yb=this.oc=null},bi=function(a){return new O("invalid-cordova-configuration",a)};
	ai.prototype.Ga=function(){return this.Vc?this.Vc:this.Vc=jf().then(function(){if("function"!==typeof M("universalLinks.subscribe",l))throw bi("cordova-universal-links-plugin is not installed");if("undefined"===typeof M("BuildInfo.packageName",l))throw bi("cordova-plugin-buildinfo is not installed");if("function"!==typeof M("cordova.plugins.browsertab.openUrl",l))throw bi("cordova-plugin-browsertab is not installed");if("function"!==typeof M("cordova.InAppBrowser.open",l))throw bi("cordova-plugin-inappbrowser is not installed");
	},function(){throw new O("cordova-not-ready");})};var ci=function(){for(var a=20,b=[];0<a;)b.push("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(62*Math.random()))),a--;return b.join("")},di=function(a){var b=new Db;b.update(a);return ob(b.digest())};h=ai.prototype;h.Nb=function(a,b){b(new O("operation-not-supported-in-this-environment"));return E()};h.Gb=function(){return F(new O("operation-not-supported-in-this-environment"))};h.ee=function(){return!1};h.be=function(){return!0};
	h.Jd=function(){return!0};
	h.Hb=function(a,b,c){if(this.oc)return F(new O("redirect-operation-pending"));var d=this,e=l.document,f=null,g=null,k=null,n=null;return this.oc=Ed(E().then(function(){hg(b);return ei(d)}).then(function(){return fi(d,a,b,c)}).then(function(){return(new D(function(a,b){g=function(){var b=M("cordova.plugins.browsertab.close",l);a();"function"===typeof b&&b();d.yb&&"function"===typeof d.yb.close&&(d.yb.close(),d.yb=null);return!1};d.Sa(g);k=function(){f||(f=ke(d.ff).then(function(){b(new O("redirect-cancelled-by-user"))}))};n=
	function(){zf()&&k()};e.addEventListener("resume",k,!1);K().toLowerCase().match(/android/)||e.addEventListener("visibilitychange",n,!1)})).f(function(a){return gi(d).then(function(){throw a;})})}),function(){k&&e.removeEventListener("resume",k,!1);n&&e.removeEventListener("visibilitychange",n,!1);f&&f.cancel();g&&d.Lb(g);d.oc=null})};
	var fi=function(a,b,c,d){var e=ci(),f=new P(b,d,null,e,new O("no-auth-event")),g=M("BuildInfo.packageName",l);if("string"!==typeof g)throw new O("invalid-cordova-configuration");var k=M("BuildInfo.displayName",l),n={};if(K().toLowerCase().match(/iphone|ipad|ipod/))n.ibi=g;else if(K().toLowerCase().match(/android/))n.apn=g;else return F(new O("operation-not-supported-in-this-environment"));k&&(n.appDisplayName=k);e=di(e);n.sessionId=e;var A=kh(a.v,a.j,a.B,b,c,null,d,a.Aa,n);return a.Ga().then(function(){var b=
	a.de;return a.nf.i.set(Xh,f.C(),b)}).then(function(){var b=M("cordova.plugins.browsertab.isAvailable",l);if("function"!==typeof b)throw new O("invalid-cordova-configuration");var c=null;b(function(b){if(b){c=M("cordova.plugins.browsertab.openUrl",l);if("function"!==typeof c)throw new O("invalid-cordova-configuration");c(A)}else{c=M("cordova.InAppBrowser.open",l);if("function"!==typeof c)throw new O("invalid-cordova-configuration");b=c;var d;d=K();d=!(!d.match(/(iPad|iPhone|iPod).*OS 7_\d/i)&&!d.match(/(iPad|iPhone|iPod).*OS 8_\d/i));
	a.yb=b(A,d?"_blank":"_system","location=yes")}})})},hi=function(a,b){for(var c=0;c<a.ia.length;c++)try{a.ia[c](b)}catch(d){}},ei=function(a){a.Tc||(a.Tc=a.Ga().then(function(){return new D(function(b){var c=function(d){b(d);a.Lb(c);return!1};a.Sa(c);ii(a)})}));return a.Tc},gi=function(a){var b=null;return Yh(a.Fd).then(function(c){b=c;c=a.Fd;return c.i.remove(Xh,c.u)}).then(function(){return b})},ii=function(a){var b=M("universalLinks.subscribe",l);if("function"!==typeof b)throw new O("invalid-cordova-configuration");
	var c=new P("unknown",null,null,null,new O("no-auth-event")),d=!1,e=ke(a.Qe).then(function(){return gi(a).then(function(){d||hi(a,c)})}),f=function(b){d=!0;e&&e.cancel();gi(a).then(function(d){var e=c;if(d&&b&&b.url){var e=null,f;f=b.url;var g=Qe(f),k=Oe(g,"link"),n=Oe(Qe(k),"link"),g=Oe(g,"deep_link_id");f=Oe(Qe(g),"link")||g||n||k||f;-1!=f.indexOf("/__/auth/callback")&&(e=Qe(f),e=uf(Oe(e,"firebaseError")||null),e=(e="object"===typeof e?Mf(e):null)?new P(d.ga,d.F,null,null,e):new P(d.ga,d.F,f,d.ac()));
	e=e||c}hi(a,e)})},g=l.handleOpenURL;l.handleOpenURL=function(a){0==a.indexOf(M("BuildInfo.packageName",l)+"://")&&f({url:a});if("function"===typeof g)try{g(a)}catch(n){console.error(n)}};b(null,f)};ai.prototype.Sa=function(a){this.ia.push(a);ei(this).f(function(){})};ai.prototype.Lb=function(a){Ka(this.ia,function(b){return b==a})};var ji=function(a){this.u=a;this.i=Th()},ki={name:"pendingRedirect",I:!1},li=function(a){return a.i.set(ki,"pending",a.u)},mi=function(a){return a.i.remove(ki,a.u)},ni=function(a){return a.i.get(ki,a.u).then(function(a){return"pending"==a})};var W=function(a,b,c){this.v=a;this.j=b;this.B=c;this.Pb=[];this.ab=!1;this.Gc=r(this.Qc,this);this.hb=new oi(this);this.Td=new pi(this);this.Db=new ji(this.j+":"+this.B);this.pb={};this.pb.unknown=this.hb;this.pb.signInViaRedirect=this.hb;this.pb.linkViaRedirect=this.hb;this.pb.signInViaPopup=this.Td;this.pb.linkViaPopup=this.Td;this.G=qi(this.v,this.j,this.B)},qi=function(a,b,c){var d=firebase.SDK_VERSION||null;return hf()?new ai(a,b,c,d):new fh(a,b,c,d)};
	W.prototype.reset=function(){this.ab=!1;this.G.Lb(this.Gc);this.G=qi(this.v,this.j,this.B)};W.prototype.zb=function(){var a=this;this.ab||(this.ab=!0,this.G.Sa(this.Gc));var b=this.G;return this.G.Ga().f(function(c){a.G==b&&a.reset();throw c;})};var ti=function(a){a.G.be()&&a.zb().f(function(b){var c=new P("unknown",null,null,null,new O("operation-not-supported-in-this-environment"));ri(b)&&a.Qc(c)});a.G.Jd()||si(a.hb)};
	W.prototype.subscribe=function(a){Ha(this.Pb,a)||this.Pb.push(a);if(!this.ab){var b=this;ni(this.Db).then(function(a){a?mi(b.Db).then(function(){b.zb().f(function(a){var c=new P("unknown",null,null,null,new O("operation-not-supported-in-this-environment"));ri(a)&&b.Qc(c)})}):ti(b)}).f(function(){ti(b)})}};W.prototype.unsubscribe=function(a){Ka(this.Pb,function(b){return b==a})};
	W.prototype.Qc=function(a){if(!a)throw new O("invalid-auth-event");for(var b=!1,c=0;c<this.Pb.length;c++){var d=this.Pb[c];if(d.vd(a.ga,a.F)){(b=this.pb[a.ga])&&b.Ud(a,d);b=!0;break}}si(this.hb);return b};var ui=new yf(2E3,1E4),vi=new yf(3E4,6E4);W.prototype.getRedirectResult=function(){return this.hb.getRedirectResult()};W.prototype.Gb=function(a,b,c,d,e){var f=this;return this.G.Gb(a,b,c,function(){f.ab||(f.ab=!0,f.G.Sa(f.Gc))},function(){f.reset()},d,e)};
	var ri=function(a){return a&&"auth/cordova-not-ready"==a.code?!0:!1};W.prototype.Hb=function(a,b,c){var d=this,e;return li(this.Db).then(function(){return d.G.Hb(a,b,c).f(function(a){if(ri(a))throw new O("operation-not-supported-in-this-environment");e=a;return mi(d.Db).then(function(){throw e;})}).then(function(){return d.G.ee()?new D(function(){}):mi(d.Db).then(function(){return d.getRedirectResult()}).then(function(){}).f(function(){})})})};
	W.prototype.Nb=function(a,b,c,d){return this.G.Nb(c,function(c){a.Oa(b,null,c,d)},ui.get())};var wi={},xi=function(a,b,c){var d=b+":"+c;wi[d]||(wi[d]=new W(a,b,c));return wi[d]},oi=function(a){this.i=a;this.kb=null;this.Kb=[];this.Jb=[];this.ib=null;this.ed=!1};oi.prototype.reset=function(){this.kb=null;this.ib&&(this.ib.cancel(),this.ib=null)};
	oi.prototype.Ud=function(a,b){if(!a)return F(new O("invalid-auth-event"));this.reset();this.ed=!0;var c=a.ga,d=a.F,e=a.getError()&&"auth/web-storage-unsupported"==a.getError().code,f=a.getError()&&"auth/operation-not-supported-in-this-environment"==a.getError().code;"unknown"!=c||e||f?a=a.O?this.cd(a,b):b.vb(c,d)?this.dd(a,b):F(new O("invalid-auth-event")):(yi(this,!1,null,null),a=E());return a};var si=function(a){a.ed||(a.ed=!0,yi(a,!1,null,null))};
	oi.prototype.cd=function(a){yi(this,!0,null,a.getError());return E()};oi.prototype.dd=function(a,b){var c=this,d=a.ga;b=b.vb(d,a.F);var e=a.qb;a=a.ac();var f="signInViaRedirect"==d||"linkViaRedirect"==d;return b(e,a).then(function(a){yi(c,f,a,null)}).f(function(a){yi(c,f,null,a)})};
	var zi=function(a,b){a.kb=function(){return F(b)};if(a.Jb.length)for(var c=0;c<a.Jb.length;c++)a.Jb[c](b)},Ai=function(a,b){a.kb=function(){return E(b)};if(a.Kb.length)for(var c=0;c<a.Kb.length;c++)a.Kb[c](b)},yi=function(a,b,c,d){b?d?zi(a,d):Ai(a,c):Ai(a,{user:null});a.Kb=[];a.Jb=[]};oi.prototype.getRedirectResult=function(){var a=this;return new D(function(b,c){a.kb?a.kb().then(b,c):(a.Kb.push(b),a.Jb.push(c),Bi(a))})};
	var Bi=function(a){var b=new O("timeout");a.ib&&a.ib.cancel();a.ib=ke(vi.get()).then(function(){a.kb||yi(a,!0,null,b)})},pi=function(a){this.i=a};pi.prototype.Ud=function(a,b){if(!a)return F(new O("invalid-auth-event"));var c=a.ga,d=a.F;return a.O?this.cd(a,b):b.vb(c,d)?this.dd(a,b):F(new O("invalid-auth-event"))};pi.prototype.cd=function(a,b){b.Oa(a.ga,null,a.getError(),a.F);return E()};
	pi.prototype.dd=function(a,b){var c=a.F,d=a.ga,e=b.vb(d,c),f=a.qb;a=a.ac();return e(f,a).then(function(a){b.Oa(d,a,null,c)}).f(function(a){b.Oa(d,null,a,c)})};var Ci=function(a){this.g=a;this.xa=this.W=null;this.Ca=0};Ci.prototype.C=function(){return{apiKey:this.g.j,refreshToken:this.W,accessToken:this.xa,expirationTime:this.Ca}};
	var Ei=function(a,b){var c=b.idToken,d=b.refreshToken;b=Di(b.expiresIn);a.xa=c;a.Ca=b;a.W=d},Di=function(a){return ka()+1E3*parseInt(a,10)},Fi=function(a,b){return tg(a.g,b).then(function(b){a.xa=b.access_token;a.Ca=Di(b.expires_in);a.W=b.refresh_token;return{accessToken:a.xa,expirationTime:a.Ca,refreshToken:a.W}}).f(function(b){"auth/user-token-expired"==b.code&&(a.W=null);throw b;})};
	Ci.prototype.getToken=function(a){a=!!a;return this.xa&&!this.W?F(new O("user-token-expired")):a||!this.xa||ka()>this.Ca-3E4?this.W?Fi(this,{grant_type:"refresh_token",refresh_token:this.W}):E(null):E({accessToken:this.xa,expirationTime:this.Ca,refreshToken:this.W})};var Gi=function(a,b,c,d,e){Df(this,{uid:a,displayName:d||null,photoURL:e||null,email:c||null,providerId:b})},Hi=function(a,b){Ib.call(this,a);for(var c in b)this[c]=b[c]};t(Hi,Ib);
	var X=function(a,b,c){this.Z=[];this.j=a.apiKey;this.B=a.appName;this.v=a.authDomain||null;a=firebase.SDK_VERSION?nf(firebase.SDK_VERSION):null;this.g=new S(this.j,null,a);this.ea=new Ci(this.g);Ii(this,b.idToken);Ei(this.ea,b);N(this,"refreshToken",this.ea.W);Ji(this,c||{});ge.call(this);this.pc=!1;this.v&&qf()&&(this.m=xi(this.v,this.j,this.B));this.vc=[];this.oa=null;this.fb=Ki(this);this.rb=r(this.Rc,this)};t(X,ge);X.prototype.Rc=function(){this.fb.cb&&(this.fb.stop(),this.fb.start())};
	var Ki=function(a){return new Mh(function(){return a.getToken(!0)},function(a){return a&&"auth/network-request-failed"==a.code?!0:!1},function(){var b=a.ea.Ca-ka()-3E5;return 0<b?b:0},3E4,96E4,!1)},Li=function(a){a.Ad||a.fb.cb||(a.fb.start(),cc(a,"tokenChanged",a.rb),Ub(a,"tokenChanged",a.rb))},Mi=function(a){cc(a,"tokenChanged",a.rb);a.fb.stop()},Ii=function(a,b){a.Nd=b;N(a,"_lat",b)},Ni=function(a,b){Ka(a.vc,function(a){return a==b})},Oi=function(a){for(var b=[],c=0;c<a.vc.length;c++)b.push(a.vc[c](a));
	return Bd(b).then(function(){return a})},Pi=function(a){a.m&&!a.pc&&(a.pc=!0,a.m.subscribe(a))},Ji=function(a,b){Df(a,{uid:b.uid,displayName:b.displayName||null,photoURL:b.photoURL||null,email:b.email||null,emailVerified:b.emailVerified||!1,isAnonymous:b.isAnonymous||!1,providerData:[]})};N(X.prototype,"providerId","firebase");
	var Qi=function(){},Ri=function(a){return E().then(function(){if(a.Ad)throw new O("app-deleted");})},Si=function(a){return Da(a.providerData,function(a){return a.providerId})},Ui=function(a,b){b&&(Ti(a,b.providerId),a.providerData.push(b))},Ti=function(a,b){Ka(a.providerData,function(a){return a.providerId==b})},Vi=function(a,b,c){("uid"!=b||c)&&a.hasOwnProperty(b)&&N(a,b,c)};
	X.prototype.copy=function(a){var b=this;b!=a&&(Df(this,{uid:a.uid,displayName:a.displayName,photoURL:a.photoURL,email:a.email,emailVerified:a.emailVerified,isAnonymous:a.isAnonymous,providerData:[]}),x(a.providerData,function(a){Ui(b,a)}),this.ea=a.ea,N(this,"refreshToken",this.ea.W))};X.prototype.reload=function(){var a=this;return this.c(Ri(this).then(function(){return Wi(a).then(function(){return Oi(a)}).then(Qi)}))};
	var Wi=function(a){return a.getToken().then(function(b){var c=a.isAnonymous;return Xi(a,b).then(function(){c||Vi(a,"isAnonymous",!1);return b})})};X.prototype.getToken=function(a){var b=this;return this.c(Ri(this).then(function(){return b.ea.getToken(a)}).then(function(a){if(!a)throw new O("internal-error");a.accessToken!=b.Nd&&(Ii(b,a.accessToken),b.Ia());Vi(b,"refreshToken",a.refreshToken);return a.accessToken}))};
	var Yi=function(a,b){b.idToken&&a.Nd!=b.idToken&&(Ei(a.ea,b),a.Ia(),Ii(a,b.idToken),Vi(a,"refreshToken",a.ea.W))};X.prototype.Ia=function(){this.dispatchEvent(new Hi("tokenChanged"))};var Xi=function(a,b){return R(a.g,Tg,{idToken:b}).then(r(a.cf,a))};
	X.prototype.cf=function(a){a=a.users;if(!a||!a.length)throw new O("internal-error");a=a[0];Ji(this,{uid:a.localId,displayName:a.displayName,photoURL:a.photoUrl,email:a.email,emailVerified:!!a.emailVerified});for(var b=Zi(a),c=0;c<b.length;c++)Ui(this,b[c]);Vi(this,"isAnonymous",!(this.email&&a.passwordHash)&&!(this.providerData&&this.providerData.length))};
	var Zi=function(a){return(a=a.providerUserInfo)&&a.length?Da(a,function(a){return new Gi(a.rawId,a.providerId,a.email,a.displayName,a.photoUrl)}):[]};
	X.prototype.reauthenticate=function(a){var b=this;return this.c(a.$b(this.g).then(function(a){var c;a:{var e=a.idToken.split(".");if(3==e.length){for(var e=e[1],f=(4-e.length%4)%4,g=0;g<f;g++)e+=".";try{var k=JSON.parse(sb(e));if(k.sub&&k.iss&&k.aud&&k.exp){c=new Pf(k);break a}}catch(n){}}c=null}if(!c||b.uid!=c.Ue)throw new O("user-mismatch");Yi(b,a);b.oa=null;return b.reload()}),!0)};
	var $i=function(a,b){return Wi(a).then(function(){if(Ha(Si(a),b))return Oi(a).then(function(){throw new O("provider-already-linked");})})};h=X.prototype;h.link=function(a){var b=this;return this.c($i(this,a.provider).then(function(){return b.getToken()}).then(function(c){return a.Pd(b.g,c)}).then(r(this.Dd,this)))};h.Dd=function(a){Yi(this,a);var b=this;return this.reload().then(function(){return b})};
	h.updateEmail=function(a){var b=this;return this.c(this.getToken().then(function(c){return b.g.updateEmail(c,a)}).then(function(a){Yi(b,a);return b.reload()}))};h.updatePassword=function(a){var b=this;return this.c(this.getToken().then(function(c){return b.g.updatePassword(c,a)}).then(function(a){Yi(b,a);return b.reload()}))};
	h.updateProfile=function(a){if(void 0===a.displayName&&void 0===a.photoURL)return Ri(this);var b=this;return this.c(this.getToken().then(function(c){return b.g.updateProfile(c,{displayName:a.displayName,photoUrl:a.photoURL})}).then(function(a){Yi(b,a);Vi(b,"displayName",a.displayName||null);Vi(b,"photoURL",a.photoUrl||null);return Oi(b)}).then(Qi))};
	h.unlink=function(a){var b=this;return this.c(Wi(this).then(function(c){return Ha(Si(b),a)?Ig(b.g,c,[a]).then(function(a){var c={};x(a.providerUserInfo||[],function(a){c[a.providerId]=!0});x(Si(b),function(a){c[a]||Ti(b,a)});return Oi(b)}):Oi(b).then(function(){throw new O("no-such-provider");})}))};
	h["delete"]=function(){var a=this;return this.c(this.getToken().then(function(b){return R(a.g,Sg,{idToken:b})}).then(function(){a.dispatchEvent(new Hi("userDeleted"))})).then(function(){for(var b=0;b<a.Z.length;b++)a.Z[b].cancel("app-deleted");a.Z=[];a.Ad=!0;Mi(a);N(a,"refreshToken",null);a.m&&a.m.unsubscribe(a)})};h.vd=function(a,b){return"linkViaPopup"==a&&(this.la||null)==b&&this.ca||"linkViaRedirect"==a&&(this.sc||null)==b?!0:!1};
	h.Oa=function(a,b,c,d){"linkViaPopup"==a&&d==(this.la||null)&&(c&&this.Ka?this.Ka(c):b&&!c&&this.ca&&this.ca(b),this.J&&(this.J.cancel(),this.J=null),delete this.ca,delete this.Ka)};h.vb=function(a,b){return"linkViaPopup"==a&&b==(this.la||null)||"linkViaRedirect"==a&&(this.sc||null)==b?r(this.ye,this):null};h.Zb=function(){return pf(this.uid+":::")};
	h.linkWithPopup=function(a){if(!qf())return F(new O("operation-not-supported-in-this-environment"));if(this.oa)return F(this.oa);var b=this,c=Kf(a.providerId),d=this.Zb(),e=null;(!rf()||lf())&&this.v&&a.isOAuthProvider&&(e=kh(this.v,this.j,this.B,"linkViaPopup",a,null,d,firebase.SDK_VERSION||null));var f=df(e,c&&c.Fb,c&&c.Eb),c=$i(this,a.providerId).then(function(){return Oi(b)}).then(function(){aj(b);return b.getToken()}).then(function(){return b.m.Gb(f,"linkViaPopup",a,d,!!e)}).then(function(){return new D(function(a,
	c){b.Oa("linkViaPopup",null,new O("cancelled-popup-request"),b.la||null);b.ca=a;b.Ka=c;b.la=d;b.J=b.m.Nb(b,"linkViaPopup",f,d)})}).then(function(a){f&&cf(f);return a}).f(function(a){f&&cf(f);throw a;});return this.c(c)};
	h.linkWithRedirect=function(a){if(!qf())return F(new O("operation-not-supported-in-this-environment"));if(this.oa)return F(this.oa);var b=this,c=null,d=this.Zb(),e=$i(this,a.providerId).then(function(){aj(b);return b.getToken()}).then(function(){b.sc=d;return Oi(b)}).then(function(a){b.Ma&&(a=b.Ma,a=a.i.set(bj,b.C(),a.u));return a}).then(function(){return b.m.Hb("linkViaRedirect",a,d)}).f(function(a){c=a;if(b.Ma)return cj(b.Ma);throw c;}).then(function(){if(c)throw c;});return this.c(e)};
	var aj=function(a){if(!a.m||!a.pc){if(a.m&&!a.pc)throw new O("internal-error");throw new O("auth-domain-config-required");}};X.prototype.ye=function(a,b){var c=this;this.J&&(this.J.cancel(),this.J=null);var d=null,e=this.getToken().then(function(d){return Tf(c.g,{requestUri:a,sessionId:b,idToken:d})}).then(function(a){d=gg(a);return c.Dd(a)}).then(function(a){return{user:a,credential:d}});return this.c(e)};
	X.prototype.sendEmailVerification=function(){var a=this;return this.c(this.getToken().then(function(b){return a.g.sendEmailVerification(b)}).then(function(b){if(a.email!=b)return a.reload()}).then(function(){}))};X.prototype.c=function(a,b){var c=this,d=dj(this,a,b);this.Z.push(d);Ed(d,function(){Ja(c.Z,d)});return d};
	var dj=function(a,b,c){return a.oa&&!c?(b.cancel(),F(a.oa)):b.f(function(b){!b||"auth/user-disabled"!=b.code&&"auth/user-token-expired"!=b.code||(a.oa||a.dispatchEvent(new Hi("userInvalidated")),a.oa=b);throw b;})};X.prototype.toJSON=function(){return this.C()};
	X.prototype.C=function(){var a={uid:this.uid,displayName:this.displayName,photoURL:this.photoURL,email:this.email,emailVerified:this.emailVerified,isAnonymous:this.isAnonymous,providerData:[],apiKey:this.j,appName:this.B,authDomain:this.v,stsTokenManager:this.ea.C(),redirectEventId:this.sc||null};x(this.providerData,function(b){a.providerData.push(Ef(b))});return a};
	var ej=function(a){if(!a.apiKey)return null;var b={apiKey:a.apiKey,authDomain:a.authDomain,appName:a.appName},c={};if(a.stsTokenManager&&a.stsTokenManager.accessToken&&a.stsTokenManager.expirationTime)c.idToken=a.stsTokenManager.accessToken,c.refreshToken=a.stsTokenManager.refreshToken||null,c.expiresIn=(a.stsTokenManager.expirationTime-ka())/1E3;else return null;var d=new X(b,c,a);a.providerData&&x(a.providerData,function(a){if(a){var b={};Df(b,a);Ui(d,b)}});a.redirectEventId&&(d.sc=a.redirectEventId);
	return d},fj=function(a,b,c){var d=new X(a,b);c&&(d.Ma=c);return d.reload().then(function(){return d})};var gj=function(a){this.u=a;this.i=Th()},bj={name:"redirectUser",I:!1},cj=function(a){return a.i.remove(bj,a.u)},hj=function(a,b){return a.i.get(bj,a.u).then(function(a){a&&b&&(a.authDomain=b);return ej(a||{})})};var ij=function(a){this.u=a;this.i=Th()},jj={name:"authUser",I:!0},kj=function(a,b){return a.i.set(jj,b.C(),a.u)},lj=function(a){return a.i.remove(jj,a.u)},mj=function(a,b){return a.i.get(jj,a.u).then(function(a){a&&b&&(a.authDomain=b);return ej(a||{})})};var rj=function(a){this.Va=!1;N(this,"app",a);if(Y(this).options&&Y(this).options.apiKey)a=firebase.SDK_VERSION?nf(firebase.SDK_VERSION):null,this.g=new S(Y(this).options&&Y(this).options.apiKey,null,a);else throw new O("invalid-api-key");this.Z=[];this.ya=[];this.$e=firebase.INTERNAL.createSubscribe(r(this.Oe,this));nj(this,null);this.pa=new ij(Y(this).options.apiKey+":"+Y(this).name);this.jb=new gj(Y(this).options.apiKey+":"+Y(this).name);this.Ub=this.c(oj(this));this.ua=this.c(pj(this));this.Wc=
	!1;this.Pc=r(this.uf,this);this.he=r(this.Za,this);this.rb=r(this.Rc,this);this.fe=r(this.Je,this);this.ge=r(this.Ke,this);qj(this);this.INTERNAL={};this.INTERNAL["delete"]=r(this["delete"],this);this.Da=0};rj.prototype.toJSON=function(){return{apiKey:Y(this).options.apiKey,authDomain:Y(this).options.authDomain,appName:Y(this).name,currentUser:Z(this)&&Z(this).C()}};
	var sj=function(a){return a.we||F(new O("auth-domain-config-required"))},qj=function(a){var b=Y(a).options.authDomain,c=Y(a).options.apiKey;b&&qf()&&(a.we=a.Ub.then(function(){if(!a.Va)return a.m=xi(b,c,Y(a).name),a.m.subscribe(a),Z(a)&&Pi(Z(a)),a.gd&&(Pi(a.gd),a.gd=null),a.m}))};h=rj.prototype;h.vd=function(a,b){switch(a){case "unknown":case "signInViaRedirect":return!0;case "signInViaPopup":return this.la==b&&!!this.ca;default:return!1}};
	h.Oa=function(a,b,c,d){"signInViaPopup"==a&&this.la==d&&(c&&this.Ka?this.Ka(c):b&&!c&&this.ca&&this.ca(b),this.J&&(this.J.cancel(),this.J=null),delete this.ca,delete this.Ka)};h.vb=function(a,b){return"signInViaRedirect"==a||"signInViaPopup"==a&&this.la==b&&this.ca?r(this.ze,this):null};
	h.ze=function(a,b){var c=this;a={requestUri:a,sessionId:b};this.J&&(this.J.cancel(),this.J=null);var d=null,e=Rf(c.g,a).then(function(a){d=gg(a);return a});a=c.Ub.then(function(){return e}).then(function(a){return tj(c,a)}).then(function(){return{user:Z(c),credential:d}});return this.c(a)};h.Zb=function(){return pf()};
	h.signInWithPopup=function(a){if(!qf())return F(new O("operation-not-supported-in-this-environment"));var b=this,c=Kf(a.providerId),d=this.Zb(),e=null;(!rf()||lf())&&Y(this).options.authDomain&&a.isOAuthProvider&&(e=kh(Y(this).options.authDomain,Y(this).options.apiKey,Y(this).name,"signInViaPopup",a,null,d,firebase.SDK_VERSION||null));var f=df(e,c&&c.Fb,c&&c.Eb),c=sj(this).then(function(b){return b.Gb(f,"signInViaPopup",a,d,!!e)}).then(function(){return new D(function(a,c){b.Oa("signInViaPopup",null,
	new O("cancelled-popup-request"),b.la);b.ca=a;b.Ka=c;b.la=d;b.J=b.m.Nb(b,"signInViaPopup",f,d)})}).then(function(a){f&&cf(f);return a}).f(function(a){f&&cf(f);throw a;});return this.c(c)};h.signInWithRedirect=function(a){if(!qf())return F(new O("operation-not-supported-in-this-environment"));var b=this,c=sj(this).then(function(){return b.m.Hb("signInViaRedirect",a)});return this.c(c)};
	h.getRedirectResult=function(){if(!qf())return F(new O("operation-not-supported-in-this-environment"));var a=this,b=sj(this).then(function(){return a.m.getRedirectResult()});return this.c(b)};
	var tj=function(a,b){var c={};c.apiKey=Y(a).options.apiKey;c.authDomain=Y(a).options.authDomain;c.appName=Y(a).name;return a.Ub.then(function(){return fj(c,b,a.jb)}).then(function(b){if(Z(a)&&b.uid==Z(a).uid)return Z(a).copy(b),a.Za(b);nj(a,b);Pi(b);return a.Za(b)}).then(function(){a.Ia()})},nj=function(a,b){Z(a)&&(Ni(Z(a),a.he),cc(Z(a),"tokenChanged",a.rb),cc(Z(a),"userDeleted",a.fe),cc(Z(a),"userInvalidated",a.ge),Mi(Z(a)));b&&(b.vc.push(a.he),Ub(b,"tokenChanged",a.rb),Ub(b,"userDeleted",a.fe),
	Ub(b,"userInvalidated",a.ge),0<a.Da&&Li(b));N(a,"currentUser",b)};rj.prototype.signOut=function(){var a=this,b=this.ua.then(function(){if(!Z(a))return E();nj(a,null);return lj(a.pa).then(function(){a.Ia()})});return this.c(b)};
	var uj=function(a){var b=hj(a.jb,Y(a).options.authDomain).then(function(b){if(a.gd=b)b.Ma=a.jb;return cj(a.jb)});return a.c(b)},oj=function(a){var b=Y(a).options.authDomain,c=uj(a).then(function(){return mj(a.pa,b)}).then(function(b){return b?(b.Ma=a.jb,b.reload().then(function(){return kj(a.pa,b).then(function(){return b})}).f(function(c){return"auth/network-request-failed"==c.code?b:lj(a.pa)})):null}).then(function(b){nj(a,b||null)});return a.c(c)},pj=function(a){return a.Ub.then(function(){return a.getRedirectResult()}).f(function(){}).then(function(){if(!a.Va)return a.Pc()}).f(function(){}).then(function(){if(!a.Va){a.Wc=
	!0;var b=a.pa;b.i.addListener(jj,b.u,a.Pc)}})};h=rj.prototype;h.uf=function(){var a=this;return mj(this.pa,Y(this).options.authDomain).then(function(b){if(!a.Va){var c;if(c=Z(a)&&b){c=Z(a).uid;var d=b.uid;c=void 0===c||null===c||""===c||void 0===d||null===d||""===d?!1:c==d}if(c)return Z(a).copy(b),Z(a).getToken();if(Z(a)||b)nj(a,b),b&&(Pi(b),b.Ma=a.jb),a.m&&a.m.subscribe(a),a.Ia()}})};h.Za=function(a){return kj(this.pa,a)};h.Rc=function(){this.Ia();this.Za(Z(this))};h.Je=function(){this.signOut()};
	h.Ke=function(){this.signOut()};var vj=function(a,b){return a.c(b.then(function(b){return tj(a,b)}).then(function(){return Z(a)}))};h=rj.prototype;h.Oe=function(a){var b=this;this.addAuthTokenListener(function(){a.next(Z(b))})};h.onAuthStateChanged=function(a,b,c){var d=this;this.Wc&&firebase.Promise.resolve().then(function(){q(a)?a(Z(d)):q(a.next)&&a.next(Z(d))});return this.$e(a,b,c)};
	h.getToken=function(a){var b=this,c=this.ua.then(function(){return Z(b)?Z(b).getToken(a).then(function(a){return{accessToken:a}}):null});return this.c(c)};h.signInWithCustomToken=function(a){var b=this;return this.ua.then(function(){return vj(b,R(b.g,Ug,{token:a}))}).then(function(a){Vi(a,"isAnonymous",!1);return b.Za(a)}).then(function(){return Z(b)})};h.signInWithEmailAndPassword=function(a,b){var c=this;return this.ua.then(function(){return vj(c,R(c.g,dg,{email:a,password:b}))})};
	h.createUserWithEmailAndPassword=function(a,b){var c=this;return this.ua.then(function(){return vj(c,R(c.g,Rg,{email:a,password:b}))})};h.signInWithCredential=function(a){var b=this;return this.ua.then(function(){return vj(b,a.$b(b.g))})};h.signInAnonymously=function(){var a=Z(this),b=this;return a&&a.isAnonymous?E(a):this.ua.then(function(){return vj(b,b.g.signInAnonymously())}).then(function(a){Vi(a,"isAnonymous",!0);return b.Za(a)}).then(function(){return Z(b)})};
	var Y=function(a){return a.app},Z=function(a){return a.currentUser};h=rj.prototype;h.getUid=function(){return Z(this)&&Z(this).uid||null};h.Ia=function(){if(this.Wc)for(var a=0;a<this.ya.length;a++)if(this.ya[a])this.ya[a](Z(this)&&Z(this)._lat||null)};h.qe=function(a){this.addAuthTokenListener(a);this.Da++;0<this.Da&&Z(this)&&Li(Z(this))};h.gf=function(a){var b=this;x(this.ya,function(c){c==a&&b.Da--});0>this.Da&&(this.Da=0);0==this.Da&&Z(this)&&Mi(Z(this));this.removeAuthTokenListener(a)};
	h.addAuthTokenListener=function(a){var b=this;this.ya.push(a);this.c(this.ua.then(function(){b.Va||Ha(b.ya,a)&&a(Z(b)&&Z(b)._lat||null)}))};h.removeAuthTokenListener=function(a){Ka(this.ya,function(b){return b==a})};h["delete"]=function(){this.Va=!0;for(var a=0;a<this.Z.length;a++)this.Z[a].cancel("app-deleted");this.Z=[];this.pa&&(a=this.pa,a.i.removeListener(jj,a.u,this.Pc));this.m&&this.m.unsubscribe(this);return firebase.Promise.resolve()};
	h.c=function(a){var b=this;this.Z.push(a);Ed(a,function(){Ja(b.Z,a)});return a};h.fetchProvidersForEmail=function(a){return this.c(yg(this.g,a))};h.verifyPasswordResetCode=function(a){return this.checkActionCode(a).then(function(a){return a.data.email})};h.confirmPasswordReset=function(a,b){return this.c(this.g.confirmPasswordReset(a,b).then(function(){}))};h.checkActionCode=function(a){return this.c(this.g.checkActionCode(a).then(function(a){return new Eh(a)}))};h.applyActionCode=function(a){return this.c(this.g.applyActionCode(a).then(function(){}))};
	h.sendPasswordResetEmail=function(a){return this.c(this.g.sendPasswordResetEmail(a).then(function(){}))};U(rj.prototype,{applyActionCode:{name:"applyActionCode",a:[T("code")]},checkActionCode:{name:"checkActionCode",a:[T("code")]},confirmPasswordReset:{name:"confirmPasswordReset",a:[T("code"),T("newPassword")]},createUserWithEmailAndPassword:{name:"createUserWithEmailAndPassword",a:[T("email"),T("password")]},fetchProvidersForEmail:{name:"fetchProvidersForEmail",a:[T("email")]},getRedirectResult:{name:"getRedirectResult",a:[]},onAuthStateChanged:{name:"onAuthStateChanged",a:[Lh(Gh(),Hh(),"nextOrObserver"),
	Hh("opt_error",!0),Hh("opt_completed",!0)]},sendPasswordResetEmail:{name:"sendPasswordResetEmail",a:[T("email")]},signInAnonymously:{name:"signInAnonymously",a:[]},signInWithCredential:{name:"signInWithCredential",a:[Jh()]},signInWithCustomToken:{name:"signInWithCustomToken",a:[T("token")]},signInWithEmailAndPassword:{name:"signInWithEmailAndPassword",a:[T("email"),T("password")]},signInWithPopup:{name:"signInWithPopup",a:[Kh()]},signInWithRedirect:{name:"signInWithRedirect",a:[Kh()]},signOut:{name:"signOut",
	a:[]},toJSON:{name:"toJSON",a:[T(null,!0)]},verifyPasswordResetCode:{name:"verifyPasswordResetCode",a:[T("code")]}});
	U(X.prototype,{"delete":{name:"delete",a:[]},getToken:{name:"getToken",a:[{name:"opt_forceRefresh",fa:"a boolean",optional:!0,ha:function(a){return"boolean"==typeof a}}]},link:{name:"link",a:[Jh()]},linkWithPopup:{name:"linkWithPopup",a:[Kh()]},linkWithRedirect:{name:"linkWithRedirect",a:[Kh()]},reauthenticate:{name:"reauthenticate",a:[Jh()]},reload:{name:"reload",a:[]},sendEmailVerification:{name:"sendEmailVerification",a:[]},toJSON:{name:"toJSON",a:[T(null,!0)]},unlink:{name:"unlink",a:[T("provider")]},
	updateEmail:{name:"updateEmail",a:[T("email")]},updatePassword:{name:"updatePassword",a:[T("password")]},updateProfile:{name:"updateProfile",a:[Gh("profile")]}});U(D.prototype,{f:{name:"catch"},then:{name:"then"}});V(fg,"credential",function(a,b){return new cg(a,b)},[T("email"),T("password")]);U(Vf.prototype,{addScope:{name:"addScope",a:[T("scope")]},setCustomParameters:{name:"setCustomParameters",a:[Gh("customOAuthParameters")]}});V(Vf,"credential",Wf,[Lh(T(),Gh(),"token")]);
	U(Xf.prototype,{addScope:{name:"addScope",a:[T("scope")]},setCustomParameters:{name:"setCustomParameters",a:[Gh("customOAuthParameters")]}});V(Xf,"credential",Yf,[Lh(T(),Gh(),"token")]);U(Zf.prototype,{addScope:{name:"addScope",a:[T("scope")]},setCustomParameters:{name:"setCustomParameters",a:[Gh("customOAuthParameters")]}});V(Zf,"credential",$f,[Lh(T(),Ih(),"idToken",!0),Lh(T(),Ih(),"accessToken",!0)]);U(ag.prototype,{setCustomParameters:{name:"setCustomParameters",a:[Gh("customOAuthParameters")]}});
	V(ag,"credential",bg,[Lh(T(),Gh(),"token"),T("secret",!0)]);U(O.prototype,{toJSON:{name:"toJSON",a:[T(null,!0)]}});U(ig.prototype,{toJSON:{name:"toJSON",a:[T(null,!0)]}});U(Of.prototype,{toJSON:{name:"toJSON",a:[T(null,!0)]}});
	(function(){if("undefined"!==typeof firebase&&firebase.INTERNAL&&firebase.INTERNAL.registerService){var a={Auth:rj,Error:O};V(a,"EmailAuthProvider",fg,[]);V(a,"FacebookAuthProvider",Vf,[]);V(a,"GithubAuthProvider",Xf,[]);V(a,"GoogleAuthProvider",Zf,[]);V(a,"TwitterAuthProvider",ag,[]);firebase.INTERNAL.registerService("auth",function(a,c){a=new rj(a);c({INTERNAL:{getUid:r(a.getUid,a),getToken:r(a.getToken,a),addAuthTokenListener:r(a.qe,a),removeAuthTokenListener:r(a.gf,a)}});return a},a,function(a,
	c){if("create"===a)try{c.auth()}catch(d){}});firebase.INTERNAL.extendNamespace({User:X})}else throw Error("Cannot find the firebase namespace; be sure to include firebase-app.js before this library.");})();}).call(this);
	}).call(typeof global !== undefined ? global : typeof self !== undefined ? self : typeof window !== undefined ? window : {});
	module.exports = firebase.auth;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var firebase = __webpack_require__(15);
	(function(){
	/*! @license Firebase v3.7.1
	    Build: 3.7.1-rc.1
	    Terms: https://firebase.google.com/terms/

	    ---

	    typedarray.js
	    Copyright (c) 2010, Linden Research, Inc.

	    Permission is hereby granted, free of charge, to any person obtaining a copy
	    of this software and associated documentation files (the "Software"), to deal
	    in the Software without restriction, including without limitation the rights
	    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	    copies of the Software, and to permit persons to whom the Software is
	    furnished to do so, subject to the following conditions:

	    The above copyright notice and this permission notice shall be included in
	    all copies or substantial portions of the Software.

	    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	    THE SOFTWARE. */
	(function() {var g,aa=this;function n(a){return void 0!==a}function ba(){}function ca(a){a.Vb=function(){return a.Ye?a.Ye:a.Ye=new a}}
	function da(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
	else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ea(a){return"array"==da(a)}function fa(a){var b=da(a);return"array"==b||"object"==b&&"number"==typeof a.length}function p(a){return"string"==typeof a}function ga(a){return"number"==typeof a}function ha(a){return"function"==da(a)}function ia(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ja(a,b,c){return a.call.apply(a.bind,arguments)}
	function ka(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function q(a,b,c){q=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ja:ka;return q.apply(null,arguments)}
	function la(a,b){function c(){}c.prototype=b.prototype;a.wg=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.sg=function(a,c,f){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return b.prototype[c].apply(a,h)}};function r(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function ma(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function na(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function oa(a){var b=0,c;for(c in a)b++;return b}function pa(a){for(var b in a)return b}function qa(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function ra(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function sa(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
	function ta(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function ua(a,b){var c=ta(a,b,void 0);return c&&a[c]}function va(a){for(var b in a)return!1;return!0}function wa(a){var b={},c;for(c in a)b[c]=a[c];return b};var t=Array.prototype,xa=t.indexOf?function(a,b,c){return t.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},ya=t.forEach?function(a,b,c){t.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},za=t.filter?function(a,b,c){return t.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,h=p(a)?
	a.split(""):a,k=0;k<d;k++)if(k in h){var l=h[k];b.call(c,l,k,a)&&(e[f++]=l)}return e},Aa=t.map?function(a,b,c){return t.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=p(a)?a.split(""):a,h=0;h<d;h++)h in f&&(e[h]=b.call(c,f[h],h,a));return e},Ba=t.reduce?function(a,b,c,d){for(var e=[],f=1,h=arguments.length;f<h;f++)e.push(arguments[f]);d&&(e[0]=q(b,d));return t.reduce.apply(a,e)}:function(a,b,c,d){var e=c;ya(a,function(c,h){e=b.call(d,e,c,h,a)});return e},Ca=t.every?function(a,b,
	c){return t.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function Da(a,b){var c=Ea(a,b,void 0);return 0>c?null:p(a)?a.charAt(c):a[c]}function Ea(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Fa(a,b){var c=xa(a,b);0<=c&&t.splice.call(a,c,1)}function Ga(a,b,c){return 2>=arguments.length?t.slice.call(a,b):t.slice.call(a,b,c)}
	function Ha(a,b){a.sort(b||Ia)}function Ia(a,b){return a>b?1:a<b?-1:0};function Ja(){this.Wa=-1};function Ka(){this.Wa=-1;this.Wa=64;this.M=[];this.Wd=[];this.Af=[];this.zd=[];this.zd[0]=128;for(var a=1;a<this.Wa;++a)this.zd[a]=0;this.Pd=this.$b=0;this.reset()}la(Ka,Ja);Ka.prototype.reset=function(){this.M[0]=1732584193;this.M[1]=4023233417;this.M[2]=2562383102;this.M[3]=271733878;this.M[4]=3285377520;this.Pd=this.$b=0};
	function La(a,b,c){c||(c=0);var d=a.Af;if(p(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.M[0];c=a.M[1];for(var h=a.M[2],k=a.M[3],l=a.M[4],m,e=0;80>e;e++)40>e?20>e?(f=k^c&(h^k),m=1518500249):(f=c^h^k,m=1859775393):60>e?(f=c&h|k&(c|h),m=2400959708):(f=c^h^k,m=3395469782),f=(b<<
	5|b>>>27)+f+l+m+d[e]&4294967295,l=k,k=h,h=(c<<30|c>>>2)&4294967295,c=b,b=f;a.M[0]=a.M[0]+b&4294967295;a.M[1]=a.M[1]+c&4294967295;a.M[2]=a.M[2]+h&4294967295;a.M[3]=a.M[3]+k&4294967295;a.M[4]=a.M[4]+l&4294967295}
	Ka.prototype.update=function(a,b){if(null!=a){n(b)||(b=a.length);for(var c=b-this.Wa,d=0,e=this.Wd,f=this.$b;d<b;){if(0==f)for(;d<=c;)La(this,a,d),d+=this.Wa;if(p(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.Wa){La(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.Wa){La(this,e);f=0;break}}this.$b=f;this.Pd+=b}};var v;a:{var Ma=aa.navigator;if(Ma){var Na=Ma.userAgent;if(Na){v=Na;break a}}v=""};var Oa=-1!=v.indexOf("Opera")||-1!=v.indexOf("OPR"),Pa=-1!=v.indexOf("Trident")||-1!=v.indexOf("MSIE"),Qa=-1!=v.indexOf("Gecko")&&-1==v.toLowerCase().indexOf("webkit")&&!(-1!=v.indexOf("Trident")||-1!=v.indexOf("MSIE")),Ra=-1!=v.toLowerCase().indexOf("webkit");
	(function(){var a="",b;if(Oa&&aa.opera)return a=aa.opera.version,ha(a)?a():a;Qa?b=/rv\:([^\);]+)(\)|;)/:Pa?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:Ra&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(v))?a[1]:"");return Pa&&(b=(b=aa.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();var Sa=null,Ta=null,Ua=null;function Va(a,b){if(!fa(a))throw Error("encodeByteArray takes an array as a parameter");Wa();for(var c=b?Ta:Sa,d=[],e=0;e<a.length;e+=3){var f=a[e],h=e+1<a.length,k=h?a[e+1]:0,l=e+2<a.length,m=l?a[e+2]:0,u=f>>2,f=(f&3)<<4|k>>4,k=(k&15)<<2|m>>6,m=m&63;l||(m=64,h||(k=64));d.push(c[u],c[f],c[k],c[m])}return d.join("")}
	function Wa(){if(!Sa){Sa={};Ta={};Ua={};for(var a=0;65>a;a++)Sa[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),Ta[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),Ua[Ta[a]]=a,62<=a&&(Ua["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};function Xa(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function Ya(){this.Fd=void 0}
	function Za(a,b,c){switch(typeof b){case "string":$a(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(ea(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],Za(a,a.Fd?a.Fd.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),$a(f,c),
	c.push(":"),Za(a,a.Fd?a.Fd.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var ab={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},bb=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
	function $a(a,b){b.push('"',a.replace(bb,function(a){if(a in ab)return ab[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return ab[a]=e+b.toString(16)}),'"')};var cb=firebase.Promise;function db(){var a=this;this.reject=this.resolve=null;this.ra=new cb(function(b,c){a.resolve=b;a.reject=c})}function eb(a,b){return function(c,d){c?a.reject(c):a.resolve(d);ha(b)&&(fb(a.ra),1===b.length?b(c):b(c,d))}}function fb(a){a.then(void 0,ba)};function gb(a){return"undefined"!==typeof JSON&&n(JSON.parse)?JSON.parse(a):Xa(a)}function w(a){if("undefined"!==typeof JSON&&n(JSON.stringify))a=JSON.stringify(a);else{var b=[];Za(new Ya,a,b);a=b.join("")}return a};function x(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function y(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
	function A(a,b,c,d){if((!d||n(c))&&!ha(c))throw Error(y(a,b,d)+"must be a valid function.");}function hb(a,b,c){if(n(c)&&(!ia(c)||null===c))throw Error(y(a,b,!0)+"must be a valid context object.");};function ib(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function B(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function jb(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])};function kb(a){var b=[];jb(a,function(a,d){ea(d)?ya(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""};function lb(a,b){if(!a)throw mb(b);}function mb(a){return Error("Firebase Database ("+firebase.SDK_VERSION+") INTERNAL ASSERT FAILED: "+a)};function nb(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,lb(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function ob(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};function pb(a){this.te=a;this.Bd=[];this.Qb=0;this.Yd=-1;this.Fb=null}function qb(a,b,c){a.Yd=b;a.Fb=c;a.Yd<a.Qb&&(a.Fb(),a.Fb=null)}function rb(a,b,c){for(a.Bd[b]=c;a.Bd[a.Qb];){var d=a.Bd[a.Qb];delete a.Bd[a.Qb];for(var e=0;e<d.length;++e)if(d[e]){var f=a;sb(function(){f.te(d[e])})}if(a.Qb===a.Yd){a.Fb&&(clearTimeout(a.Fb),a.Fb(),a.Fb=null);break}a.Qb++}};function tb(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test("undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:"")};function ub(a,b){this.committed=a;this.snapshot=b};function vb(a,b,c){this.type=wb;this.source=a;this.path=b;this.Ga=c}vb.prototype.Mc=function(a){return this.path.e()?new vb(this.source,C,this.Ga.Q(a)):new vb(this.source,D(this.path),this.Ga)};vb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ga.toString()+")"};function xb(a,b){this.type=yb;this.source=a;this.path=b}xb.prototype.Mc=function(){return this.path.e()?new xb(this.source,C):new xb(this.source,D(this.path))};xb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function zb(){this.tc={}}function Ab(a,b,c){n(c)||(c=1);ib(a.tc,b)||(a.tc[b]=0);a.tc[b]+=c}zb.prototype.get=function(){return wa(this.tc)};function Bb(a){this.Ef=a;this.rd=null}Bb.prototype.get=function(){var a=this.Ef.get(),b=wa(a);if(this.rd)for(var c in this.rd)b[c]-=this.rd[c];this.rd=a;return b};function Cb(a){this.uc=a;this.Cd="firebase:"}g=Cb.prototype;g.set=function(a,b){null==b?this.uc.removeItem(this.Cd+a):this.uc.setItem(this.Cd+a,w(b))};g.get=function(a){a=this.uc.getItem(this.Cd+a);return null==a?null:gb(a)};g.remove=function(a){this.uc.removeItem(this.Cd+a)};g.Ze=!1;g.toString=function(){return this.uc.toString()};function Db(){this.pc={}}Db.prototype.set=function(a,b){null==b?delete this.pc[a]:this.pc[a]=b};Db.prototype.get=function(a){return ib(this.pc,a)?this.pc[a]:null};Db.prototype.remove=function(a){delete this.pc[a]};Db.prototype.Ze=!0;function Eb(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new Cb(b)}}catch(c){}return new Db}var Fb=Eb("localStorage"),Gb=Eb("sessionStorage");function Hb(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.Sc=b;this.pe=c;this.qg=d;this.gf=e||"";this.$a=Fb.get("host:"+a)||this.host}function Ib(a,b){b!==a.$a&&(a.$a=b,"s-"===a.$a.substr(0,2)&&Fb.set("host:"+a.host,a.$a))}
	function Jb(a,b,c){E("string"===typeof b,"typeof type must == string");E("object"===typeof c,"typeof params must == object");if("websocket"===b)b=(a.Sc?"wss://":"ws://")+a.$a+"/.ws?";else if("long_polling"===b)b=(a.Sc?"https://":"http://")+a.$a+"/.lp?";else throw Error("Unknown connection type: "+b);a.host!==a.$a&&(c.ns=a.pe);var d=[];r(c,function(a,b){d.push(b+"="+a)});return b+d.join("&")}
	Hb.prototype.toString=function(){var a=(this.Sc?"https://":"http://")+this.host;this.gf&&(a+="<"+this.gf+">");return a};function Kb(a){this.oc=a}Kb.prototype.getToken=function(a){return this.oc.INTERNAL.getToken(a).then(null,function(a){return a&&"auth/token-not-initialized"===a.code?(G("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(a)})};function Lb(a,b){a.oc.INTERNAL.addAuthTokenListener(b)};function Mb(a,b,c){this.A=a;this.da=b;this.Sb=c}function Nb(a){return a.da}function Ob(a){return a.Sb}function Pb(a,b){return b.e()?a.da&&!a.Sb:Qb(a,H(b))}function Qb(a,b){return a.da&&!a.Sb||a.A.Da(b)}Mb.prototype.j=function(){return this.A};function Rb(a,b,c,d){this.ae=b;this.Md=c;this.Dd=d;this.hd=a}Rb.prototype.Yb=function(){var a=this.Md.wb();return"value"===this.hd?a.path:a.getParent().path};Rb.prototype.ge=function(){return this.hd};Rb.prototype.Tb=function(){return this.ae.Tb(this)};Rb.prototype.toString=function(){return this.Yb().toString()+":"+this.hd+":"+w(this.Md.be())};function Sb(a,b,c){this.ae=a;this.error=b;this.path=c}Sb.prototype.Yb=function(){return this.path};Sb.prototype.ge=function(){return"cancel"};
	Sb.prototype.Tb=function(){return this.ae.Tb(this)};Sb.prototype.toString=function(){return this.path.toString()+":cancel"};function Tb(){this.vb=[]}function Ub(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.Yb();null===c||f.Z(c.Yb())||(a.vb.push(c),c=null);null===c&&(c=new Vb(f));c.add(e)}c&&a.vb.push(c)}function Wb(a,b,c){Ub(a,c);Xb(a,function(a){return a.Z(b)})}function Yb(a,b,c){Ub(a,c);Xb(a,function(a){return a.contains(b)||b.contains(a)})}
	function Xb(a,b){for(var c=!0,d=0;d<a.vb.length;d++){var e=a.vb[d];if(e)if(e=e.Yb(),b(e)){for(var e=a.vb[d],f=0;f<e.jd.length;f++){var h=e.jd[f];if(null!==h){e.jd[f]=null;var k=h.Tb();Zb&&G("event: "+h.toString());sb(k)}}a.vb[d]=null}else c=!1}c&&(a.vb=[])}function Vb(a){this.qa=a;this.jd=[]}Vb.prototype.add=function(a){this.jd.push(a)};Vb.prototype.Yb=function(){return this.qa};function I(a,b,c,d){this.type=a;this.Ja=b;this.Xa=c;this.qe=d;this.Dd=void 0}function $b(a){return new I(ac,a)}var ac="value";function bc(){}bc.prototype.Te=function(){return null};bc.prototype.fe=function(){return null};var cc=new bc;function dc(a,b,c){this.xf=a;this.Ka=b;this.yd=c}dc.prototype.Te=function(a){var b=this.Ka.N;if(Qb(b,a))return b.j().Q(a);b=null!=this.yd?new Mb(this.yd,!0,!1):this.Ka.w();return this.xf.qc(a,b)};dc.prototype.fe=function(a,b,c){var d=null!=this.yd?this.yd:ec(this.Ka);a=this.xf.Xd(d,b,1,c,a);return 0===a.length?null:a[0]};function fc(){this.Jd=J}fc.prototype.j=function(a){return this.Jd.P(a)};fc.prototype.toString=function(){return this.Jd.toString()};function gc(a,b){this.La=a;this.ba=b?b:hc}g=gc.prototype;g.Oa=function(a,b){return new gc(this.La,this.ba.Oa(a,b,this.La).X(null,null,!1,null,null))};g.remove=function(a){return new gc(this.La,this.ba.remove(a,this.La).X(null,null,!1,null,null))};g.get=function(a){for(var b,c=this.ba;!c.e();){b=this.La(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
	function ic(a,b){for(var c,d=a.ba,e=null;!d.e();){c=a.La(b,d.key);if(0===c){if(d.left.e())return e?e.key:null;for(d=d.left;!d.right.e();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}g.e=function(){return this.ba.e()};g.count=function(){return this.ba.count()};g.Gc=function(){return this.ba.Gc()};g.ec=function(){return this.ba.ec()};g.ha=function(a){return this.ba.ha(a)};
	g.Wb=function(a){return new jc(this.ba,null,this.La,!1,a)};g.Xb=function(a,b){return new jc(this.ba,a,this.La,!1,b)};g.Zb=function(a,b){return new jc(this.ba,a,this.La,!0,b)};g.We=function(a){return new jc(this.ba,null,this.La,!0,a)};function jc(a,b,c,d,e){this.Hd=e||null;this.le=d;this.Pa=[];for(e=1;!a.e();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.le?a.left:a.right;else if(0===e){this.Pa.push(a);break}else this.Pa.push(a),a=this.le?a.right:a.left}
	function K(a){if(0===a.Pa.length)return null;var b=a.Pa.pop(),c;c=a.Hd?a.Hd(b.key,b.value):{key:b.key,value:b.value};if(a.le)for(b=b.left;!b.e();)a.Pa.push(b),b=b.right;else for(b=b.right;!b.e();)a.Pa.push(b),b=b.left;return c}function kc(a){if(0===a.Pa.length)return null;var b;b=a.Pa;b=b[b.length-1];return a.Hd?a.Hd(b.key,b.value):{key:b.key,value:b.value}}function lc(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:hc;this.right=null!=e?e:hc}g=lc.prototype;
	g.X=function(a,b,c,d,e){return new lc(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};g.count=function(){return this.left.count()+1+this.right.count()};g.e=function(){return!1};g.ha=function(a){return this.left.ha(a)||a(this.key,this.value)||this.right.ha(a)};function mc(a){return a.left.e()?a:mc(a.left)}g.Gc=function(){return mc(this).key};g.ec=function(){return this.right.e()?this.key:this.right.ec()};
	g.Oa=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.X(null,null,null,e.left.Oa(a,b,c),null):0===d?e.X(null,b,null,null,null):e.X(null,null,null,null,e.right.Oa(a,b,c));return nc(e)};function oc(a){if(a.left.e())return hc;a.left.ea()||a.left.left.ea()||(a=pc(a));a=a.X(null,null,null,oc(a.left),null);return nc(a)}
	g.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.e()||c.left.ea()||c.left.left.ea()||(c=pc(c)),c=c.X(null,null,null,c.left.remove(a,b),null);else{c.left.ea()&&(c=qc(c));c.right.e()||c.right.ea()||c.right.left.ea()||(c=rc(c),c.left.left.ea()&&(c=qc(c),c=rc(c)));if(0===b(a,c.key)){if(c.right.e())return hc;d=mc(c.right);c=c.X(d.key,d.value,null,null,oc(c.right))}c=c.X(null,null,null,null,c.right.remove(a,b))}return nc(c)};g.ea=function(){return this.color};
	function nc(a){a.right.ea()&&!a.left.ea()&&(a=sc(a));a.left.ea()&&a.left.left.ea()&&(a=qc(a));a.left.ea()&&a.right.ea()&&(a=rc(a));return a}function pc(a){a=rc(a);a.right.left.ea()&&(a=a.X(null,null,null,null,qc(a.right)),a=sc(a),a=rc(a));return a}function sc(a){return a.right.X(null,null,a.color,a.X(null,null,!0,null,a.right.left),null)}function qc(a){return a.left.X(null,null,a.color,null,a.X(null,null,!0,a.left.right,null))}
	function rc(a){return a.X(null,null,!a.color,a.left.X(null,null,!a.left.color,null,null),a.right.X(null,null,!a.right.color,null,null))}function tc(){}g=tc.prototype;g.X=function(){return this};g.Oa=function(a,b){return new lc(a,b,null)};g.remove=function(){return this};g.count=function(){return 0};g.e=function(){return!0};g.ha=function(){return!1};g.Gc=function(){return null};g.ec=function(){return null};g.ea=function(){return!1};var hc=new tc;function uc(a,b){return a&&"object"===typeof a?(E(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function vc(a,b){var c=new wc;xc(a,new L(""),function(a,e){yc(c,a,zc(e,b))});return c}function zc(a,b){var c=a.C().H(),c=uc(c,b),d;if(a.J()){var e=uc(a.Ca(),b);return e!==a.Ca()||c!==a.C().H()?new Ac(e,M(c)):a}d=a;c!==a.C().H()&&(d=d.fa(new Ac(c)));a.O(N,function(a,c){var e=zc(c,b);e!==c&&(d=d.T(a,e))});return d};var Bc=function(){var a=1;return function(){return a++}}(),E=lb,Cc=mb;
	function Dc(a){try{var b;Wa();for(var c=Ua,d=[],e=0;e<a.length;){var f=c[a.charAt(e++)],h=e<a.length?c[a.charAt(e)]:0;++e;var k=e<a.length?c[a.charAt(e)]:64;++e;var l=e<a.length?c[a.charAt(e)]:64;++e;if(null==f||null==h||null==k||null==l)throw Error();d.push(f<<2|h>>4);64!=k&&(d.push(h<<4&240|k>>2),64!=l&&d.push(k<<6&192|l))}if(8192>d.length)b=String.fromCharCode.apply(null,d);else{a="";for(c=0;c<d.length;c+=8192)a+=String.fromCharCode.apply(null,Ga(d,c,c+8192));b=a}return b}catch(m){G("base64Decode failed: ",
	m)}return null}function Ec(a){var b=nb(a);a=new Ka;a.update(b);var b=[],c=8*a.Pd;56>a.$b?a.update(a.zd,56-a.$b):a.update(a.zd,a.Wa-(a.$b-56));for(var d=a.Wa-1;56<=d;d--)a.Wd[d]=c&255,c/=256;La(a,a.Wd);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c]=a.M[d]>>e&255,++c;return Va(b)}function Fc(a){for(var b="",c=0;c<arguments.length;c++)b=fa(arguments[c])?b+Fc.apply(null,arguments[c]):"object"===typeof arguments[c]?b+w(arguments[c]):b+arguments[c],b+=" ";return b}var Zb=null,Gc=!0;
	function Hc(a,b){lb(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?Zb=q(console.log,console):"object"===typeof console.log&&(Zb=function(a){console.log(a)})),b&&Gb.set("logging_enabled",!0)):ha(a)?Zb=a:(Zb=null,Gb.remove("logging_enabled"))}function G(a){!0===Gc&&(Gc=!1,null===Zb&&!0===Gb.get("logging_enabled")&&Hc(!0));if(Zb){var b=Fc.apply(null,arguments);Zb(b)}}
	function Ic(a){return function(){G(a,arguments)}}function Jc(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+Fc.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function Kc(a){var b=Fc.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function O(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+Fc.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
	function Lc(a){var b,c,d,e,f,h=a;f=c=a=b="";d=!0;e="https";if(p(h)){var k=h.indexOf("//");0<=k&&(e=h.substring(0,k-1),h=h.substring(k+2));k=h.indexOf("/");-1===k&&(k=h.length);b=h.substring(0,k);f="";h=h.substring(k).split("/");for(k=0;k<h.length;k++)if(0<h[k].length){var l=h[k];try{l=decodeURIComponent(l.replace(/\+/g," "))}catch(m){}f+="/"+l}h=b.split(".");3===h.length?(a=h[1],c=h[0].toLowerCase()):2===h.length&&(a=h[0]);k=b.indexOf(":");0<=k&&(d="https"===e||"wss"===e)}"firebase"===a&&Kc(b+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
	c&&"undefined"!=c||Kc("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");d||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&O("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");return{jc:new Hb(b,d,c,"ws"===e||"wss"===e),path:new L(f)}}function Mc(a){return ga(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}
	function Nc(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
	function Oc(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=Pc(a),d=Pc(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function Qc(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+w(b));}
	function Rc(a){if("object"!==typeof a||null===a)return w(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=w(b[d]),c+=":",c+=Rc(a[b[d]]);return c+"}"}function Sc(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function Tc(a,b){if(ea(a))for(var c=0;c<a.length;++c)b(c,a[c]);else r(a,b)}
	function Uc(a){E(!Mc(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
	(d="0"+d),c+=d;return c.toLowerCase()}var Vc=/^-?\d{1,10}$/;function Pc(a){return Vc.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function sb(a){try{a()}catch(b){setTimeout(function(){O("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function Wc(a,b,c){Object.defineProperty(a,b,{get:c})}function Xc(a,b){var c=setTimeout(a,b);"object"===typeof c&&c.unref&&c.unref();return c};function Yc(a){var b={},c={},d={},e="";try{var f=a.split("."),b=gb(Dc(f[0])||""),c=gb(Dc(f[1])||""),e=f[2],d=c.d||{};delete c.d}catch(h){}return{tg:b,Je:c,data:d,mg:e}}function Zc(a){a=Yc(a);var b=a.Je;return!!a.mg&&!!b&&"object"===typeof b&&b.hasOwnProperty("iat")}function $c(a){a=Yc(a).Je;return"object"===typeof a&&!0===B(a,"admin")};function ad(a,b,c){this.type=bd;this.source=a;this.path=b;this.children=c}ad.prototype.Mc=function(a){if(this.path.e())return a=this.children.subtree(new L(a)),a.e()?null:a.value?new vb(this.source,C,a.value):new ad(this.source,C,a);E(H(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new ad(this.source,D(this.path),this.children)};ad.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};function cd(a,b,c){this.f=Ic("p:rest:");this.L=a;this.Gb=b;this.$c=c;this.$={}}function dd(a,b){if(n(b))return"tag$"+b;E(ed(a.m),"should have a tag if it's not a default query.");return a.path.toString()}g=cd.prototype;
	g.$e=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.ja());var f=dd(a,c),h={};this.$[f]=h;a=fd(a.m);var k=this;gd(this,e+".json",a,function(a,b){var u=b;404===a&&(a=u=null);null===a&&k.Gb(e,u,!1,c);B(k.$,f)===h&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};g.uf=function(a,b){var c=dd(a,b);delete this.$[c]};g.kf=function(){};g.re=function(){};g.cf=function(){};g.xd=function(){};g.put=function(){};g.af=function(){};g.ye=function(){};
	function gd(a,b,c,d){c=c||{};c.format="export";a.$c.getToken(!1).then(function(e){(e=e&&e.accessToken)&&(c.auth=e);var f=(a.L.Sc?"https://":"http://")+a.L.host+b+"?"+kb(c);a.f("Sending REST request for "+f);var h=new XMLHttpRequest;h.onreadystatechange=function(){if(d&&4===h.readyState){a.f("REST Response for "+f+" received. status:",h.status,"response:",h.responseText);var b=null;if(200<=h.status&&300>h.status){try{b=gb(h.responseText)}catch(c){O("Failed to parse JSON response for "+f+": "+h.responseText)}d(null,
	b)}else 401!==h.status&&404!==h.status&&O("Got unsuccessful REST response for "+f+" Status: "+h.status),d(h.status);d=null}};h.open("GET",f,!0);h.send()})};function hd(a,b){this.rf={};this.Vc=new Bb(a);this.va=b;var c=1E4+2E4*Math.random();Xc(q(this.lf,this),Math.floor(c))}hd.prototype.lf=function(){var a=this.Vc.get(),b={},c=!1,d;for(d in a)0<a[d]&&ib(this.rf,d)&&(b[d]=a[d],c=!0);c&&this.va.ye(b);Xc(q(this.lf,this),Math.floor(6E5*Math.random()))};var id={},jd={};function kd(a){a=a.toString();id[a]||(id[a]=new zb);return id[a]}function ld(a,b){var c=a.toString();jd[c]||(jd[c]=b());return jd[c]};function md(a,b){this.Sd=a;this.Df=b}function nd(a){this.U=a}
	nd.prototype.eb=function(a,b,c,d){var e=new od,f;if(b.type===wb)b.source.ee?c=pd(this,a,b.path,b.Ga,c,d,e):(E(b.source.Se,"Unknown source."),f=b.source.Ee||Ob(a.w())&&!b.path.e(),c=qd(this,a,b.path,b.Ga,c,d,f,e));else if(b.type===bd)b.source.ee?c=rd(this,a,b.path,b.children,c,d,e):(E(b.source.Se,"Unknown source."),f=b.source.Ee||Ob(a.w()),c=sd(this,a,b.path,b.children,c,d,f,e));else if(b.type===ud)if(b.Id)if(b=b.path,null!=c.lc(b))c=a;else{f=new dc(c,a,d);d=a.N.j();if(b.e()||".priority"===H(b))Nb(a.w())?
	b=c.Aa(ec(a)):(b=a.w().j(),E(b instanceof P,"serverChildren would be complete if leaf node"),b=c.rc(b)),b=this.U.ya(d,b,e);else{var h=H(b),k=c.qc(h,a.w());null==k&&Qb(a.w(),h)&&(k=d.Q(h));b=null!=k?this.U.F(d,h,k,D(b),f,e):a.N.j().Da(h)?this.U.F(d,h,J,D(b),f,e):d;b.e()&&Nb(a.w())&&(d=c.Aa(ec(a)),d.J()&&(b=this.U.ya(b,d,e)))}d=Nb(a.w())||null!=c.lc(C);c=vd(a,b,d,this.U.Na())}else c=wd(this,a,b.path,b.Ob,c,d,e);else if(b.type===yb)d=b.path,b=a.w(),f=b.j(),h=b.da||d.e(),c=xd(this,new yd(a.N,new Mb(f,
	h,b.Sb)),d,c,cc,e);else throw Cc("Unknown operation type: "+b.type);e=qa(e.fb);d=c;b=d.N;b.da&&(f=b.j().J()||b.j().e(),h=zd(a),(0<e.length||!a.N.da||f&&!b.j().Z(h)||!b.j().C().Z(h.C()))&&e.push($b(zd(d))));return new md(c,e)};
	function xd(a,b,c,d,e,f){var h=b.N;if(null!=d.lc(c))return b;var k;if(c.e())E(Nb(b.w()),"If change path is empty, we must have complete server data"),Ob(b.w())?(e=ec(b),d=d.rc(e instanceof P?e:J)):d=d.Aa(ec(b)),f=a.U.ya(b.N.j(),d,f);else{var l=H(c);if(".priority"==l)E(1==Ad(c),"Can't have a priority with additional path components"),f=h.j(),k=b.w().j(),d=d.ad(c,f,k),f=null!=d?a.U.fa(f,d):h.j();else{var m=D(c);Qb(h,l)?(k=b.w().j(),d=d.ad(c,h.j(),k),d=null!=d?h.j().Q(l).F(m,d):h.j().Q(l)):d=d.qc(l,
	b.w());f=null!=d?a.U.F(h.j(),l,d,m,e,f):h.j()}}return vd(b,f,h.da||c.e(),a.U.Na())}function qd(a,b,c,d,e,f,h,k){var l=b.w();h=h?a.U:a.U.Ub();if(c.e())d=h.ya(l.j(),d,null);else if(h.Na()&&!l.Sb)d=l.j().F(c,d),d=h.ya(l.j(),d,null);else{var m=H(c);if(!Pb(l,c)&&1<Ad(c))return b;var u=D(c);d=l.j().Q(m).F(u,d);d=".priority"==m?h.fa(l.j(),d):h.F(l.j(),m,d,u,cc,null)}l=l.da||c.e();b=new yd(b.N,new Mb(d,l,h.Na()));return xd(a,b,c,e,new dc(e,b,f),k)}
	function pd(a,b,c,d,e,f,h){var k=b.N;e=new dc(e,b,f);if(c.e())h=a.U.ya(b.N.j(),d,h),a=vd(b,h,!0,a.U.Na());else if(f=H(c),".priority"===f)h=a.U.fa(b.N.j(),d),a=vd(b,h,k.da,k.Sb);else{c=D(c);var l=k.j().Q(f);if(!c.e()){var m=e.Te(f);d=null!=m?".priority"===Bd(c)&&m.P(c.parent()).e()?m:m.F(c,d):J}l.Z(d)?a=b:(h=a.U.F(k.j(),f,d,c,e,h),a=vd(b,h,k.da,a.U.Na()))}return a}
	function rd(a,b,c,d,e,f,h){var k=b;Cd(d,function(d,m){var u=c.n(d);Qb(b.N,H(u))&&(k=pd(a,k,u,m,e,f,h))});Cd(d,function(d,m){var u=c.n(d);Qb(b.N,H(u))||(k=pd(a,k,u,m,e,f,h))});return k}function Dd(a,b){Cd(b,function(b,d){a=a.F(b,d)});return a}
	function sd(a,b,c,d,e,f,h,k){if(b.w().j().e()&&!Nb(b.w()))return b;var l=b;c=c.e()?d:Ed(Q,c,d);var m=b.w().j();c.children.ha(function(c,d){if(m.Da(c)){var F=b.w().j().Q(c),F=Dd(F,d);l=qd(a,l,new L(c),F,e,f,h,k)}});c.children.ha(function(c,d){var F=!Qb(b.w(),c)&&null==d.value;m.Da(c)||F||(F=b.w().j().Q(c),F=Dd(F,d),l=qd(a,l,new L(c),F,e,f,h,k))});return l}
	function wd(a,b,c,d,e,f,h){if(null!=e.lc(c))return b;var k=Ob(b.w()),l=b.w();if(null!=d.value){if(c.e()&&l.da||Pb(l,c))return qd(a,b,c,l.j().P(c),e,f,k,h);if(c.e()){var m=Q;l.j().O(Fd,function(a,b){m=m.set(new L(a),b)});return sd(a,b,c,m,e,f,k,h)}return b}m=Q;Cd(d,function(a){var b=c.n(a);Pb(l,b)&&(m=m.set(a,l.j().P(b)))});return sd(a,b,c,m,e,f,k,h)};function od(){this.fb={}}
	function Gd(a,b){var c=b.type,d=b.Xa;E("child_added"==c||"child_changed"==c||"child_removed"==c,"Only child changes supported for tracking");E(".priority"!==d,"Only non-priority child changes can be tracked.");var e=B(a.fb,d);if(e){var f=e.type;if("child_added"==c&&"child_removed"==f)a.fb[d]=new I("child_changed",b.Ja,d,e.Ja);else if("child_removed"==c&&"child_added"==f)delete a.fb[d];else if("child_removed"==c&&"child_changed"==f)a.fb[d]=new I("child_removed",e.qe,d);else if("child_changed"==c&&
	"child_added"==f)a.fb[d]=new I("child_added",b.Ja,d);else if("child_changed"==c&&"child_changed"==f)a.fb[d]=new I("child_changed",b.Ja,d,e.qe);else throw Cc("Illegal combination of changes: "+b+" occurred after "+e);}else a.fb[d]=b};function Hd(a){this.g=a}g=Hd.prototype;g.F=function(a,b,c,d,e,f){E(a.yc(this.g),"A node must be indexed if only a child is updated");e=a.Q(b);if(e.P(d).Z(c.P(d))&&e.e()==c.e())return a;null!=f&&(c.e()?a.Da(b)?Gd(f,new I("child_removed",e,b)):E(a.J(),"A child remove without an old child only makes sense on a leaf node"):e.e()?Gd(f,new I("child_added",c,b)):Gd(f,new I("child_changed",c,b,e)));return a.J()&&c.e()?a:a.T(b,c).nb(this.g)};
	g.ya=function(a,b,c){null!=c&&(a.J()||a.O(N,function(a,e){b.Da(a)||Gd(c,new I("child_removed",e,a))}),b.J()||b.O(N,function(b,e){if(a.Da(b)){var f=a.Q(b);f.Z(e)||Gd(c,new I("child_changed",e,b,f))}else Gd(c,new I("child_added",e,b))}));return b.nb(this.g)};g.fa=function(a,b){return a.e()?J:a.fa(b)};g.Na=function(){return!1};g.Ub=function(){return this};function Id(a){this.he=new Hd(a.g);this.g=a.g;var b;a.ka?(b=Jd(a),b=a.g.Ec(Kd(a),b)):b=a.g.Hc();this.Uc=b;a.na?(b=Ld(a),a=a.g.Ec(Md(a),b)):a=a.g.Fc();this.vc=a}g=Id.prototype;g.matches=function(a){return 0>=this.g.compare(this.Uc,a)&&0>=this.g.compare(a,this.vc)};g.F=function(a,b,c,d,e,f){this.matches(new R(b,c))||(c=J);return this.he.F(a,b,c,d,e,f)};
	g.ya=function(a,b,c){b.J()&&(b=J);var d=b.nb(this.g),d=d.fa(J),e=this;b.O(N,function(a,b){e.matches(new R(a,b))||(d=d.T(a,J))});return this.he.ya(a,d,c)};g.fa=function(a){return a};g.Na=function(){return!0};g.Ub=function(){return this.he};function L(a,b){if(1==arguments.length){this.o=a.split("/");for(var c=0,d=0;d<this.o.length;d++)0<this.o[d].length&&(this.o[c]=this.o[d],c++);this.o.length=c;this.Y=0}else this.o=a,this.Y=b}function S(a,b){var c=H(a);if(null===c)return b;if(c===H(b))return S(D(a),D(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}
	function Nd(a,b){for(var c=a.slice(),d=b.slice(),e=0;e<c.length&&e<d.length;e++){var f=Oc(c[e],d[e]);if(0!==f)return f}return c.length===d.length?0:c.length<d.length?-1:1}function H(a){return a.Y>=a.o.length?null:a.o[a.Y]}function Ad(a){return a.o.length-a.Y}function D(a){var b=a.Y;b<a.o.length&&b++;return new L(a.o,b)}function Bd(a){return a.Y<a.o.length?a.o[a.o.length-1]:null}g=L.prototype;
	g.toString=function(){for(var a="",b=this.Y;b<this.o.length;b++)""!==this.o[b]&&(a+="/"+this.o[b]);return a||"/"};g.slice=function(a){return this.o.slice(this.Y+(a||0))};g.parent=function(){if(this.Y>=this.o.length)return null;for(var a=[],b=this.Y;b<this.o.length-1;b++)a.push(this.o[b]);return new L(a,0)};
	g.n=function(a){for(var b=[],c=this.Y;c<this.o.length;c++)b.push(this.o[c]);if(a instanceof L)for(c=a.Y;c<a.o.length;c++)b.push(a.o[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new L(b,0)};g.e=function(){return this.Y>=this.o.length};g.Z=function(a){if(Ad(this)!==Ad(a))return!1;for(var b=this.Y,c=a.Y;b<=this.o.length;b++,c++)if(this.o[b]!==a.o[c])return!1;return!0};
	g.contains=function(a){var b=this.Y,c=a.Y;if(Ad(this)>Ad(a))return!1;for(;b<this.o.length;){if(this.o[b]!==a.o[c])return!1;++b;++c}return!0};var C=new L("");function Od(a,b){this.Qa=a.slice();this.Ha=Math.max(1,this.Qa.length);this.Qe=b;for(var c=0;c<this.Qa.length;c++)this.Ha+=ob(this.Qa[c]);Pd(this)}Od.prototype.push=function(a){0<this.Qa.length&&(this.Ha+=1);this.Qa.push(a);this.Ha+=ob(a);Pd(this)};Od.prototype.pop=function(){var a=this.Qa.pop();this.Ha-=ob(a);0<this.Qa.length&&--this.Ha};
	function Pd(a){if(768<a.Ha)throw Error(a.Qe+"has a key path longer than 768 bytes ("+a.Ha+").");if(32<a.Qa.length)throw Error(a.Qe+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+Qd(a));}function Qd(a){return 0==a.Qa.length?"":"in property '"+a.Qa.join(".")+"'"};function Rd(a){a instanceof Sd||Kc("Don't call new Database() directly - please use firebase.database().");this.ta=a;this.ba=new T(a,C);this.INTERNAL=new Td(this)}var Ud={TIMESTAMP:{".sv":"timestamp"}};g=Rd.prototype;g.app=null;g.jf=function(a){Vd(this,"ref");x("database.ref",0,1,arguments.length);return n(a)?this.ba.n(a):this.ba};
	g.gg=function(a){Vd(this,"database.refFromURL");x("database.refFromURL",1,1,arguments.length);var b=Lc(a);Wd("database.refFromURL",b);var c=b.jc;c.host!==this.ta.L.host&&Kc("database.refFromURL: Host name does not match the current database: (found "+c.host+" but expected "+this.ta.L.host+")");return this.jf(b.path.toString())};function Vd(a,b){null===a.ta&&Kc("Cannot call "+b+" on a deleted database.")}g.Pf=function(){x("database.goOffline",0,0,arguments.length);Vd(this,"goOffline");this.ta.ab()};
	g.Qf=function(){x("database.goOnline",0,0,arguments.length);Vd(this,"goOnline");this.ta.kc()};Object.defineProperty(Rd.prototype,"app",{get:function(){return this.ta.app}});function Td(a){this.Ya=a}Td.prototype.delete=function(){Vd(this.Ya,"delete");var a=Xd.Vb(),b=this.Ya.ta;B(a.lb,b.app.name)!==b&&Kc("Database "+b.app.name+" has already been deleted.");b.ab();delete a.lb[b.app.name];this.Ya.ta=null;this.Ya.ba=null;this.Ya=this.Ya.INTERNAL=null;return firebase.Promise.resolve()};
	Rd.prototype.ref=Rd.prototype.jf;Rd.prototype.refFromURL=Rd.prototype.gg;Rd.prototype.goOnline=Rd.prototype.Qf;Rd.prototype.goOffline=Rd.prototype.Pf;Td.prototype["delete"]=Td.prototype.delete;function Yd(){this.children={};this.bd=0;this.value=null}function Zd(a,b,c){this.ud=a?a:"";this.Pc=b?b:null;this.A=c?c:new Yd}function $d(a,b){for(var c=b instanceof L?b:new L(b),d=a,e;null!==(e=H(c));)d=new Zd(e,d,B(d.A.children,e)||new Yd),c=D(c);return d}g=Zd.prototype;g.Ca=function(){return this.A.value};function ae(a,b){E("undefined"!==typeof b,"Cannot set value to undefined");a.A.value=b;be(a)}g.clear=function(){this.A.value=null;this.A.children={};this.A.bd=0;be(this)};
	g.kd=function(){return 0<this.A.bd};g.e=function(){return null===this.Ca()&&!this.kd()};g.O=function(a){var b=this;r(this.A.children,function(c,d){a(new Zd(d,b,c))})};function ce(a,b,c,d){c&&!d&&b(a);a.O(function(a){ce(a,b,!0,d)});c&&d&&b(a)}function de(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}g.path=function(){return new L(null===this.Pc?this.ud:this.Pc.path()+"/"+this.ud)};g.name=function(){return this.ud};g.parent=function(){return this.Pc};
	function be(a){if(null!==a.Pc){var b=a.Pc,c=a.ud,d=a.e(),e=ib(b.A.children,c);d&&e?(delete b.A.children[c],b.A.bd--,be(b)):d||e||(b.A.children[c]=a.A,b.A.bd++,be(b))}};function ee(){this.set={}}g=ee.prototype;g.add=function(a,b){this.set[a]=null!==b?b:!0};g.contains=function(a){return ib(this.set,a)};g.get=function(a){return this.contains(a)?this.set[a]:void 0};g.remove=function(a){delete this.set[a]};g.clear=function(){this.set={}};g.e=function(){return va(this.set)};g.count=function(){return oa(this.set)};function fe(a,b){r(a.set,function(a,d){b(d,a)})}g.keys=function(){var a=[];r(this.set,function(b,c){a.push(c)});return a};function ge(a,b,c,d){this.Zd=a;this.f=Ic(a);this.jc=b;this.pb=this.qb=0;this.Va=kd(b);this.tf=c;this.wc=!1;this.Cb=d;this.Yc=function(a){return Jb(b,"long_polling",a)}}var he,ie;
	ge.prototype.open=function(a,b){this.Ne=0;this.ia=b;this.bf=new pb(a);this.Ab=!1;var c=this;this.sb=setTimeout(function(){c.f("Timed out trying to connect.");c.bb();c.sb=null},Math.floor(3E4));Nc(function(){if(!c.Ab){c.Ta=new je(function(a,b,d,k,l){ke(c,arguments);if(c.Ta)if(c.sb&&(clearTimeout(c.sb),c.sb=null),c.wc=!0,"start"==a)c.id=b,c.ff=d;else if("close"===a)b?(c.Ta.Kd=!1,qb(c.bf,b,function(){c.bb()})):c.bb();else throw Error("Unrecognized command received: "+a);},function(a,b){ke(c,arguments);
	rb(c.bf,a,b)},function(){c.bb()},c.Yc);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.Ta.Qd&&(a.cb=c.Ta.Qd);a.v="5";c.tf&&(a.s=c.tf);c.Cb&&(a.ls=c.Cb);"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");a=c.Yc(a);c.f("Connecting via long-poll to "+a);le(c.Ta,a,function(){})}})};
	ge.prototype.start=function(){var a=this.Ta,b=this.ff;a.Vf=this.id;a.Wf=b;for(a.Ud=!0;me(a););a=this.id;b=this.ff;this.fc=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.fc.src=this.Yc(c);this.fc.style.display="none";document.body.appendChild(this.fc)};
	ge.isAvailable=function(){return he||!ie&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.rg)&&!0};g=ge.prototype;g.sd=function(){};g.Tc=function(){this.Ab=!0;this.Ta&&(this.Ta.close(),this.Ta=null);this.fc&&(document.body.removeChild(this.fc),this.fc=null);this.sb&&(clearTimeout(this.sb),this.sb=null)};
	g.bb=function(){this.Ab||(this.f("Longpoll is closing itself"),this.Tc(),this.ia&&(this.ia(this.wc),this.ia=null))};g.close=function(){this.Ab||(this.f("Longpoll is being closed."),this.Tc())};g.send=function(a){a=w(a);this.qb+=a.length;Ab(this.Va,"bytes_sent",a.length);a=nb(a);a=Va(a,!0);a=Sc(a,1840);for(var b=0;b<a.length;b++){var c=this.Ta;c.Qc.push({jg:this.Ne,pg:a.length,Pe:a[b]});c.Ud&&me(c);this.Ne++}};function ke(a,b){var c=w(b).length;a.pb+=c;Ab(a.Va,"bytes_received",c)}
	function je(a,b,c,d){this.Yc=d;this.ib=c;this.ve=new ee;this.Qc=[];this.$d=Math.floor(1E8*Math.random());this.Kd=!0;this.Qd=Bc();window["pLPCommand"+this.Qd]=a;window["pRTLPCB"+this.Qd]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||G("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
	a.contentDocument?a.gb=a.contentDocument:a.contentWindow?a.gb=a.contentWindow.document:a.document&&(a.gb=a.document);this.Ea=a;a="";this.Ea.src&&"javascript:"===this.Ea.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Ea.gb.open(),this.Ea.gb.write(a),this.Ea.gb.close()}catch(f){G("frame writing exception"),f.stack&&G(f.stack),G(f)}}
	je.prototype.close=function(){this.Ud=!1;if(this.Ea){this.Ea.gb.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Ea&&(document.body.removeChild(a.Ea),a.Ea=null)},Math.floor(0))}var b=this.ib;b&&(this.ib=null,b())};
	function me(a){if(a.Ud&&a.Kd&&a.ve.count()<(0<a.Qc.length?2:1)){a.$d++;var b={};b.id=a.Vf;b.pw=a.Wf;b.ser=a.$d;for(var b=a.Yc(b),c="",d=0;0<a.Qc.length;)if(1870>=a.Qc[0].Pe.length+30+c.length){var e=a.Qc.shift(),c=c+"&seg"+d+"="+e.jg+"&ts"+d+"="+e.pg+"&d"+d+"="+e.Pe;d++}else break;ne(a,b+c,a.$d);return!0}return!1}function ne(a,b,c){function d(){a.ve.remove(c);me(a)}a.ve.add(c,1);var e=setTimeout(d,Math.floor(25E3));le(a,b,function(){clearTimeout(e);d()})}
	function le(a,b,c){setTimeout(function(){try{if(a.Kd){var d=a.Ea.gb.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){G("Long-poll script failed to load: "+b);a.Kd=!1;a.close()};a.Ea.gb.body.appendChild(d)}}catch(e){}},Math.floor(1))};var oe=/[\[\].#$\/\u0000-\u001F\u007F]/,pe=/[\[\].#$\u0000-\u001F\u007F]/;function qe(a){return p(a)&&0!==a.length&&!oe.test(a)}function re(a){return null===a||p(a)||ga(a)&&!Mc(a)||ia(a)&&ib(a,".sv")}function se(a,b,c,d){d&&!n(b)||te(y(a,1,d),b,c)}
	function te(a,b,c){c instanceof L&&(c=new Od(c,a));if(!n(b))throw Error(a+"contains undefined "+Qd(c));if(ha(b))throw Error(a+"contains a function "+Qd(c)+" with contents: "+b.toString());if(Mc(b))throw Error(a+"contains "+b.toString()+" "+Qd(c));if(p(b)&&b.length>10485760/3&&10485760<ob(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+Qd(c)+" ('"+b.substring(0,50)+"...')");if(ia(b)){var d=!1,e=!1;jb(b,function(b,h){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
	!0,!qe(b)))throw Error(a+" contains an invalid key ("+b+") "+Qd(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);te(a,h,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+Qd(c)+" in addition to actual children.");}}
	function ue(a,b){var c,d;for(c=0;c<b.length;c++){d=b[c];for(var e=d.slice(),f=0;f<e.length;f++)if((".priority"!==e[f]||f!==e.length-1)&&!qe(e[f]))throw Error(a+"contains an invalid key ("+e[f]+") in path "+d.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');}b.sort(Nd);e=null;for(c=0;c<b.length;c++){d=b[c];if(null!==e&&e.contains(d))throw Error(a+"contains a path "+e.toString()+" that is ancestor of another path "+d.toString());e=d}}
	function ve(a,b,c){var d=y(a,1,!1);if(!ia(b)||ea(b))throw Error(d+" must be an object containing the children to replace.");var e=[];jb(b,function(a,b){var k=new L(a);te(d,b,c.n(k));if(".priority"===Bd(k)&&!re(b))throw Error(d+"contains an invalid value for '"+k.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");e.push(k)});ue(d,e)}
	function we(a,b,c){if(Mc(c))throw Error(y(a,b,!1)+"is "+c.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!re(c))throw Error(y(a,b,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).");}
	function xe(a,b,c){if(!c||n(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(y(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function ye(a,b){if(n(b)&&!qe(b))throw Error(y(a,2,!0)+'was an invalid key: "'+b+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
	function ze(a,b){if(!p(b)||0===b.length||pe.test(b))throw Error(y(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function Ae(a,b){if(".info"===H(b))throw Error(a+" failed: Can't modify data under /.info/");}
	function Wd(a,b){var c=b.path.toString(),d;!(d=!p(b.jc.host)||0===b.jc.host.length||!qe(b.jc.pe))&&(d=0!==c.length)&&(c&&(c=c.replace(/^\/*\.info(\/|$)/,"/")),d=!(p(c)&&0!==c.length&&!pe.test(c)));if(d)throw Error(y(a,1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');};function U(a,b){this.ta=a;this.qa=b}U.prototype.cancel=function(a){x("Firebase.onDisconnect().cancel",0,1,arguments.length);A("Firebase.onDisconnect().cancel",1,a,!0);var b=new db;this.ta.xd(this.qa,eb(b,a));return b.ra};U.prototype.cancel=U.prototype.cancel;U.prototype.remove=function(a){x("Firebase.onDisconnect().remove",0,1,arguments.length);Ae("Firebase.onDisconnect().remove",this.qa);A("Firebase.onDisconnect().remove",1,a,!0);var b=new db;Be(this.ta,this.qa,null,eb(b,a));return b.ra};
	U.prototype.remove=U.prototype.remove;U.prototype.set=function(a,b){x("Firebase.onDisconnect().set",1,2,arguments.length);Ae("Firebase.onDisconnect().set",this.qa);se("Firebase.onDisconnect().set",a,this.qa,!1);A("Firebase.onDisconnect().set",2,b,!0);var c=new db;Be(this.ta,this.qa,a,eb(c,b));return c.ra};U.prototype.set=U.prototype.set;
	U.prototype.Jb=function(a,b,c){x("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);Ae("Firebase.onDisconnect().setWithPriority",this.qa);se("Firebase.onDisconnect().setWithPriority",a,this.qa,!1);we("Firebase.onDisconnect().setWithPriority",2,b);A("Firebase.onDisconnect().setWithPriority",3,c,!0);var d=new db;Ce(this.ta,this.qa,a,b,eb(d,c));return d.ra};U.prototype.setWithPriority=U.prototype.Jb;
	U.prototype.update=function(a,b){x("Firebase.onDisconnect().update",1,2,arguments.length);Ae("Firebase.onDisconnect().update",this.qa);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;O("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}ve("Firebase.onDisconnect().update",a,this.qa);A("Firebase.onDisconnect().update",2,b,!0);
	c=new db;De(this.ta,this.qa,a,eb(c,b));return c.ra};U.prototype.update=U.prototype.update;function Ee(a){E(ea(a)&&0<a.length,"Requires a non-empty array");this.Bf=a;this.Dc={}}Ee.prototype.Ge=function(a,b){var c;c=this.Dc[a]||[];var d=c.length;if(0<d){for(var e=Array(d),f=0;f<d;f++)e[f]=c[f];c=e}else c=[];for(d=0;d<c.length;d++)c[d].Ie.apply(c[d].Ma,Array.prototype.slice.call(arguments,1))};Ee.prototype.gc=function(a,b,c){Fe(this,a);this.Dc[a]=this.Dc[a]||[];this.Dc[a].push({Ie:b,Ma:c});(a=this.Ue(a))&&b.apply(c,a)};
	Ee.prototype.Ic=function(a,b,c){Fe(this,a);a=this.Dc[a]||[];for(var d=0;d<a.length;d++)if(a[d].Ie===b&&(!c||c===a[d].Ma)){a.splice(d,1);break}};function Fe(a,b){E(Da(a.Bf,function(a){return a===b}),"Unknown event: "+b)};function Ge(){Ee.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.Mb=!0;if(b){var c=this;document.addEventListener(b,
	function(){var b=!document[a];b!==c.Mb&&(c.Mb=b,c.Ge("visible",b))},!1)}}la(Ge,Ee);Ge.prototype.Ue=function(a){E("visible"===a,"Unknown event type: "+a);return[this.Mb]};ca(Ge);function He(){Ee.call(this,["online"]);this.hc=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener&&!tb()){var a=this;window.addEventListener("online",function(){a.hc||(a.hc=!0,a.Ge("online",!0))},!1);window.addEventListener("offline",function(){a.hc&&(a.hc=!1,a.Ge("online",!1))},!1)}}la(He,Ee);He.prototype.Ue=function(a){E("online"===a,"Unknown event type: "+a);return[this.hc]};ca(He);var Ie=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);E(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);E(20===c.length,"nextPushId: Length should be 20.");
	return c}}();function Je(a,b){this.value=a;this.children=b||Ke}var Ke=new gc(function(a,b){return a===b?0:a<b?-1:1});function Le(a){var b=Q;r(a,function(a,d){b=b.set(new L(d),a)});return b}g=Je.prototype;g.e=function(){return null===this.value&&this.children.e()};function Me(a,b,c){if(null!=a.value&&c(a.value))return{path:C,value:a.value};if(b.e())return null;var d=H(b);a=a.children.get(d);return null!==a?(b=Me(a,D(b),c),null!=b?{path:(new L(d)).n(b.path),value:b.value}:null):null}
	function Ne(a,b){return Me(a,b,function(){return!0})}g.subtree=function(a){if(a.e())return this;var b=this.children.get(H(a));return null!==b?b.subtree(D(a)):Q};g.set=function(a,b){if(a.e())return new Je(b,this.children);var c=H(a),d=(this.children.get(c)||Q).set(D(a),b),c=this.children.Oa(c,d);return new Je(this.value,c)};
	g.remove=function(a){if(a.e())return this.children.e()?Q:new Je(null,this.children);var b=H(a),c=this.children.get(b);return c?(a=c.remove(D(a)),b=a.e()?this.children.remove(b):this.children.Oa(b,a),null===this.value&&b.e()?Q:new Je(this.value,b)):this};g.get=function(a){if(a.e())return this.value;var b=this.children.get(H(a));return b?b.get(D(a)):null};
	function Ed(a,b,c){if(b.e())return c;var d=H(b);b=Ed(a.children.get(d)||Q,D(b),c);d=b.e()?a.children.remove(d):a.children.Oa(d,b);return new Je(a.value,d)}function Oe(a,b){return Pe(a,C,b)}function Pe(a,b,c){var d={};a.children.ha(function(a,f){d[a]=Pe(f,b.n(a),c)});return c(b,a.value,d)}function Qe(a,b,c){return Re(a,b,C,c)}function Re(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.e())return null;e=H(b);return(a=a.children.get(e))?Re(a,D(b),c.n(e),d):null}
	function Se(a,b,c){Te(a,b,C,c)}function Te(a,b,c,d){if(b.e())return a;a.value&&d(c,a.value);var e=H(b);return(a=a.children.get(e))?Te(a,D(b),c.n(e),d):Q}function Cd(a,b){Ue(a,C,b)}function Ue(a,b,c){a.children.ha(function(a,e){Ue(e,b.n(a),c)});a.value&&c(b,a.value)}function Ve(a,b){a.children.ha(function(a,d){d.value&&b(a,d.value)})}var Q=new Je(null);Je.prototype.toString=function(){var a={};Cd(this,function(b,c){a[b.toString()]=c.toString()});return w(a)};function We(a,b,c){this.type=ud;this.source=Xe;this.path=a;this.Ob=b;this.Id=c}We.prototype.Mc=function(a){if(this.path.e()){if(null!=this.Ob.value)return E(this.Ob.children.e(),"affectedTree should not have overlapping affected paths."),this;a=this.Ob.subtree(new L(a));return new We(C,a,this.Id)}E(H(this.path)===a,"operationForChild called for unrelated child.");return new We(D(this.path),this.Ob,this.Id)};
	We.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Id+" affectedTree="+this.Ob+")"};var wb=0,bd=1,ud=2,yb=3;function Ye(a,b,c,d){this.ee=a;this.Se=b;this.Hb=c;this.Ee=d;E(!d||b,"Tagged queries must be from server.")}var Xe=new Ye(!0,!1,null,!1),Ze=new Ye(!1,!0,null,!1);Ye.prototype.toString=function(){return this.ee?"user":this.Ee?"server(queryID="+this.Hb+")":"server"};var $e=null;"undefined"!==typeof MozWebSocket?$e=MozWebSocket:"undefined"!==typeof WebSocket&&($e=WebSocket);function af(a,b,c,d){this.Zd=a;this.f=Ic(this.Zd);this.frames=this.zc=null;this.pb=this.qb=this.Fe=0;this.Va=kd(b);a={v:"5"};"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");c&&(a.s=c);d&&(a.ls=d);this.Ke=Jb(b,"websocket",a)}var bf;
	af.prototype.open=function(a,b){this.ib=b;this.Xf=a;this.f("Websocket connecting to "+this.Ke);this.wc=!1;Fb.set("previous_websocket_failure",!0);try{this.Ia=new $e(this.Ke)}catch(c){this.f("Error instantiating WebSocket.");var d=c.message||c.data;d&&this.f(d);this.bb();return}var e=this;this.Ia.onopen=function(){e.f("Websocket connected.");e.wc=!0};this.Ia.onclose=function(){e.f("Websocket connection was disconnected.");e.Ia=null;e.bb()};this.Ia.onmessage=function(a){if(null!==e.Ia)if(a=a.data,e.pb+=
	a.length,Ab(e.Va,"bytes_received",a.length),cf(e),null!==e.frames)df(e,a);else{a:{E(null===e.frames,"We already have a frame buffer");if(6>=a.length){var b=Number(a);if(!isNaN(b)){e.Fe=b;e.frames=[];a=null;break a}}e.Fe=1;e.frames=[]}null!==a&&df(e,a)}};this.Ia.onerror=function(a){e.f("WebSocket error.  Closing connection.");(a=a.message||a.data)&&e.f(a);e.bb()}};af.prototype.start=function(){};
	af.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==$e&&!bf};af.responsesRequiredToBeHealthy=2;af.healthyTimeout=3E4;g=af.prototype;g.sd=function(){Fb.remove("previous_websocket_failure")};function df(a,b){a.frames.push(b);if(a.frames.length==a.Fe){var c=a.frames.join("");a.frames=null;c=gb(c);a.Xf(c)}}
	g.send=function(a){cf(this);a=w(a);this.qb+=a.length;Ab(this.Va,"bytes_sent",a.length);a=Sc(a,16384);1<a.length&&ef(this,String(a.length));for(var b=0;b<a.length;b++)ef(this,a[b])};g.Tc=function(){this.Ab=!0;this.zc&&(clearInterval(this.zc),this.zc=null);this.Ia&&(this.Ia.close(),this.Ia=null)};g.bb=function(){this.Ab||(this.f("WebSocket is closing itself"),this.Tc(),this.ib&&(this.ib(this.wc),this.ib=null))};g.close=function(){this.Ab||(this.f("WebSocket is being closed"),this.Tc())};
	function cf(a){clearInterval(a.zc);a.zc=setInterval(function(){a.Ia&&ef(a,"0");cf(a)},Math.floor(45E3))}function ef(a,b){try{a.Ia.send(b)}catch(c){a.f("Exception thrown from WebSocket.send():",c.message||c.data,"Closing connection."),setTimeout(q(a.bb,a),0)}};function ff(a){gf(this,a)}var hf=[ge,af];function gf(a,b){var c=af&&af.isAvailable(),d=c&&!(Fb.Ze||!0===Fb.get("previous_websocket_failure"));b.qg&&(c||O("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.Wc=[af];else{var e=a.Wc=[];Tc(hf,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function jf(a){if(0<a.Wc.length)return a.Wc[0];throw Error("No transports available");};function kf(a,b,c,d,e,f,h){this.id=a;this.f=Ic("c:"+this.id+":");this.te=c;this.Lc=d;this.ia=e;this.se=f;this.L=b;this.Ad=[];this.Le=0;this.sf=new ff(b);this.Ua=0;this.Cb=h;this.f("Connection created");lf(this)}
	function lf(a){var b=jf(a.sf);a.I=new b("c:"+a.id+":"+a.Le++,a.L,void 0,a.Cb);a.xe=b.responsesRequiredToBeHealthy||0;var c=mf(a,a.I),d=nf(a,a.I);a.Xc=a.I;a.Rc=a.I;a.D=null;a.Bb=!1;setTimeout(function(){a.I&&a.I.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.md=Xc(function(){a.md=null;a.Bb||(a.I&&102400<a.I.pb?(a.f("Connection exceeded healthy timeout but has received "+a.I.pb+" bytes.  Marking connection healthy."),a.Bb=!0,a.I.sd()):a.I&&10240<a.I.qb?a.f("Connection exceeded healthy timeout but has sent "+
	a.I.qb+" bytes.  Leaving connection alive."):(a.f("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function nf(a,b){return function(c){b===a.I?(a.I=null,c||0!==a.Ua?1===a.Ua&&a.f("Realtime connection lost."):(a.f("Realtime connection failed."),"s-"===a.L.$a.substr(0,2)&&(Fb.remove("host:"+a.L.host),a.L.$a=a.L.host)),a.close()):b===a.D?(a.f("Secondary connection lost."),c=a.D,a.D=null,a.Xc!==c&&a.Rc!==c||a.close()):a.f("closing an old connection")}}
	function mf(a,b){return function(c){if(2!=a.Ua)if(b===a.Rc){var d=Qc("t",c);c=Qc("d",c);if("c"==d){if(d=Qc("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.qf=c.s;Ib(a.L,f);0==a.Ua&&(a.I.start(),of(a,a.I,d),"5"!==e&&O("Protocol version mismatch detected"),c=a.sf,(c=1<c.Wc.length?c.Wc[1]:null)&&pf(a,c))}else if("n"===d){a.f("recvd end transmission on primary");a.Rc=a.D;for(c=0;c<a.Ad.length;++c)a.wd(a.Ad[c]);a.Ad=[];qf(a)}else"s"===d?(a.f("Connection shutdown command received. Shutting down..."),
	a.se&&(a.se(c),a.se=null),a.ia=null,a.close()):"r"===d?(a.f("Reset packet received.  New host: "+c),Ib(a.L,c),1===a.Ua?a.close():(rf(a),lf(a))):"e"===d?Jc("Server Error: "+c):"o"===d?(a.f("got pong on primary."),sf(a),tf(a)):Jc("Unknown control packet command: "+d)}else"d"==d&&a.wd(c)}else if(b===a.D)if(d=Qc("t",c),c=Qc("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?uf(a):"r"===c?(a.f("Got a reset on secondary, closing it"),a.D.close(),a.Xc!==a.D&&a.Rc!==a.D||a.close()):"o"===c&&(a.f("got pong on secondary."),
	a.pf--,uf(a)));else if("d"==d)a.Ad.push(c);else throw Error("Unknown protocol layer: "+d);else a.f("message on old connection")}}kf.prototype.ua=function(a){vf(this,{t:"d",d:a})};function qf(a){a.Xc===a.D&&a.Rc===a.D&&(a.f("cleaning up and promoting a connection: "+a.D.Zd),a.I=a.D,a.D=null)}
	function uf(a){0>=a.pf?(a.f("Secondary connection is healthy."),a.Bb=!0,a.D.sd(),a.D.start(),a.f("sending client ack on secondary"),a.D.send({t:"c",d:{t:"a",d:{}}}),a.f("Ending transmission on primary"),a.I.send({t:"c",d:{t:"n",d:{}}}),a.Xc=a.D,qf(a)):(a.f("sending ping on secondary."),a.D.send({t:"c",d:{t:"p",d:{}}}))}kf.prototype.wd=function(a){sf(this);this.te(a)};function sf(a){a.Bb||(a.xe--,0>=a.xe&&(a.f("Primary connection is healthy."),a.Bb=!0,a.I.sd()))}
	function pf(a,b){a.D=new b("c:"+a.id+":"+a.Le++,a.L,a.qf);a.pf=b.responsesRequiredToBeHealthy||0;a.D.open(mf(a,a.D),nf(a,a.D));Xc(function(){a.D&&(a.f("Timed out trying to upgrade."),a.D.close())},Math.floor(6E4))}function of(a,b,c){a.f("Realtime connection established.");a.I=b;a.Ua=1;a.Lc&&(a.Lc(c,a.qf),a.Lc=null);0===a.xe?(a.f("Primary connection is healthy."),a.Bb=!0):Xc(function(){tf(a)},Math.floor(5E3))}
	function tf(a){a.Bb||1!==a.Ua||(a.f("sending ping on primary."),vf(a,{t:"c",d:{t:"p",d:{}}}))}function vf(a,b){if(1!==a.Ua)throw"Connection is not connected";a.Xc.send(b)}kf.prototype.close=function(){2!==this.Ua&&(this.f("Closing realtime connection."),this.Ua=2,rf(this),this.ia&&(this.ia(),this.ia=null))};function rf(a){a.f("Shutting down all connections");a.I&&(a.I.close(),a.I=null);a.D&&(a.D.close(),a.D=null);a.md&&(clearTimeout(a.md),a.md=null)};function wf(a,b,c,d,e,f){this.id=xf++;this.f=Ic("p:"+this.id+":");this.qd={};this.$={};this.pa=[];this.Oc=0;this.Kc=[];this.ma=!1;this.Sa=1E3;this.td=3E5;this.Gb=b;this.Jc=c;this.ue=d;this.L=a;this.ob=this.Fa=this.Cb=this.ze=null;this.$c=e;this.de=!1;this.ke=0;if(f)throw Error("Auth override specified in options, but not supported on non Node.js platforms");this.Vd=f;this.ub=null;this.Mb=!1;this.Gd={};this.ig=0;this.Re=!0;this.Ac=this.me=null;yf(this,0);Ge.Vb().gc("visible",this.Zf,this);-1===a.host.indexOf("fblocal")&&
	He.Vb().gc("online",this.Yf,this)}var xf=0,zf=0;g=wf.prototype;g.ua=function(a,b,c){var d=++this.ig;a={r:d,a:a,b:b};this.f(w(a));E(this.ma,"sendRequest call when we're not connected not allowed.");this.Fa.ua(a);c&&(this.Gd[d]=c)};
	g.$e=function(a,b,c,d){var e=a.ja(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.$[f]=this.$[f]||{};E(ed(a.m)||!V(a.m),"listen() called for non-default but complete query");E(!this.$[f][e],"listen() called twice for same path/queryId.");a={G:d,ld:b,eg:a,tag:c};this.$[f][e]=a;this.ma&&Af(this,a)};
	function Af(a,b){var c=b.eg,d=c.path.toString(),e=c.ja();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=Bf(c.m),f.t=b.tag);f.h=b.ld();a.ua("q",f,function(f){var k=f.d,l=f.s;if(k&&"object"===typeof k&&ib(k,"w")){var m=B(k,"w");ea(m)&&0<=xa(m,"no_index")&&O("Using an unspecified index. Consider adding "+('".indexOn": "'+c.m.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.$[d]&&a.$[d][e])===b&&(a.f("listen response",f),"ok"!==l&&Cf(a,d,e),b.G&&b.G(l,
	k))})}g.kf=function(a){this.ob=a;this.f("Auth token refreshed");this.ob?Df(this):this.ma&&this.ua("unauth",{},function(){});if(a&&40===a.length||$c(a))this.f("Admin auth credential detected.  Reducing max reconnect time."),this.td=3E4};function Df(a){if(a.ma&&a.ob){var b=a.ob,c=Zc(b)?"auth":"gauth",d={cred:b};null===a.Vd?d.noauth=!0:"object"===typeof a.Vd&&(d.authvar=a.Vd);a.ua(c,d,function(c){var d=c.s;c=c.d||"error";a.ob===b&&("ok"===d?a.ke=0:Ef(a,d,c))})}}
	g.uf=function(a,b){var c=a.path.toString(),d=a.ja();this.f("Unlisten called for "+c+" "+d);E(ed(a.m)||!V(a.m),"unlisten() called for non-default but complete query");if(Cf(this,c,d)&&this.ma){var e=Bf(a.m);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.ua("n",c)}};g.re=function(a,b,c){this.ma?Ff(this,"o",a,b,c):this.Kc.push({we:a,action:"o",data:b,G:c})};g.cf=function(a,b,c){this.ma?Ff(this,"om",a,b,c):this.Kc.push({we:a,action:"om",data:b,G:c})};
	g.xd=function(a,b){this.ma?Ff(this,"oc",a,null,b):this.Kc.push({we:a,action:"oc",data:null,G:b})};function Ff(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.ua(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}g.put=function(a,b,c,d){Gf(this,"p",a,b,c,d)};g.af=function(a,b,c,d){Gf(this,"m",a,b,c,d)};function Gf(a,b,c,d,e,f){d={p:c,d:d};n(f)&&(d.h=f);a.pa.push({action:b,mf:d,G:e});a.Oc++;b=a.pa.length-1;a.ma?Hf(a,b):a.f("Buffering put: "+c)}
	function Hf(a,b){var c=a.pa[b].action,d=a.pa[b].mf,e=a.pa[b].G;a.pa[b].fg=a.ma;a.ua(c,d,function(d){a.f(c+" response",d);delete a.pa[b];a.Oc--;0===a.Oc&&(a.pa=[]);e&&e(d.s,d.d)})}g.ye=function(a){this.ma&&(a={c:a},this.f("reportStats",a),this.ua("s",a,function(a){"ok"!==a.s&&this.f("reportStats","Error sending stats: "+a.d)}))};
	g.wd=function(a){if("r"in a){this.f("from server: "+w(a));var b=a.r,c=this.Gd[b];c&&(delete this.Gd[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,a=a.b,this.f("handleServerMessage",b,a),"d"===b?this.Gb(a.p,a.d,!1,a.t):"m"===b?this.Gb(a.p,a.d,!0,a.t):"c"===b?If(this,a.p,a.q):"ac"===b?Ef(this,a.s,a.d):"sd"===b?this.ze?this.ze(a):"msg"in a&&"undefined"!==typeof console&&console.log("FIREBASE: "+a.msg.replace("\n","\nFIREBASE: ")):Jc("Unrecognized action received from server: "+
	w(b)+"\nAre you using the latest client?"))}};g.Lc=function(a,b){this.f("connection ready");this.ma=!0;this.Ac=(new Date).getTime();this.ue({serverTimeOffset:a-(new Date).getTime()});this.Cb=b;if(this.Re){var c={};c["sdk.js."+firebase.SDK_VERSION.replace(/\./g,"-")]=1;tb()?c["framework.cordova"]=1:"object"===typeof navigator&&"ReactNative"===navigator.product&&(c["framework.reactnative"]=1);this.ye(c)}Jf(this);this.Re=!1;this.Jc(!0)};
	function yf(a,b){E(!a.Fa,"Scheduling a connect when we're already connected/ing?");a.ub&&clearTimeout(a.ub);a.ub=setTimeout(function(){a.ub=null;Kf(a)},Math.floor(b))}g.Zf=function(a){a&&!this.Mb&&this.Sa===this.td&&(this.f("Window became visible.  Reducing delay."),this.Sa=1E3,this.Fa||yf(this,0));this.Mb=a};g.Yf=function(a){a?(this.f("Browser went online."),this.Sa=1E3,this.Fa||yf(this,0)):(this.f("Browser went offline.  Killing connection."),this.Fa&&this.Fa.close())};
	g.df=function(){this.f("data client disconnected");this.ma=!1;this.Fa=null;for(var a=0;a<this.pa.length;a++){var b=this.pa[a];b&&"h"in b.mf&&b.fg&&(b.G&&b.G("disconnect"),delete this.pa[a],this.Oc--)}0===this.Oc&&(this.pa=[]);this.Gd={};Lf(this)&&(this.Mb?this.Ac&&(3E4<(new Date).getTime()-this.Ac&&(this.Sa=1E3),this.Ac=null):(this.f("Window isn't visible.  Delaying reconnect."),this.Sa=this.td,this.me=(new Date).getTime()),a=Math.max(0,this.Sa-((new Date).getTime()-this.me)),a*=Math.random(),this.f("Trying to reconnect in "+
	a+"ms"),yf(this,a),this.Sa=Math.min(this.td,1.3*this.Sa));this.Jc(!1)};
	function Kf(a){if(Lf(a)){a.f("Making a connection attempt");a.me=(new Date).getTime();a.Ac=null;var b=q(a.wd,a),c=q(a.Lc,a),d=q(a.df,a),e=a.id+":"+zf++,f=a.Cb,h=!1,k=null,l=function(){k?k.close():(h=!0,d())};a.Fa={close:l,ua:function(a){E(k,"sendRequest call when we're not connected not allowed.");k.ua(a)}};var m=a.de;a.de=!1;a.$c.getToken(m).then(function(l){h?G("getToken() completed but was canceled"):(G("getToken() completed. Creating connection."),a.ob=l&&l.accessToken,k=new kf(e,a.L,b,c,d,function(b){O(b+
	" ("+a.L.toString()+")");a.ab("server_kill")},f))}).then(null,function(b){a.f("Failed to get token: "+b);h||l()})}}g.ab=function(a){G("Interrupting connection for reason: "+a);this.qd[a]=!0;this.Fa?this.Fa.close():(this.ub&&(clearTimeout(this.ub),this.ub=null),this.ma&&this.df())};g.kc=function(a){G("Resuming connection for reason: "+a);delete this.qd[a];va(this.qd)&&(this.Sa=1E3,this.Fa||yf(this,0))};
	function If(a,b,c){c=c?Aa(c,function(a){return Rc(a)}).join("$"):"default";(a=Cf(a,b,c))&&a.G&&a.G("permission_denied")}function Cf(a,b,c){b=(new L(b)).toString();var d;n(a.$[b])?(d=a.$[b][c],delete a.$[b][c],0===oa(a.$[b])&&delete a.$[b]):d=void 0;return d}
	function Ef(a,b,c){G("Auth token revoked: "+b+"/"+c);a.ob=null;a.de=!0;a.Fa.close();"invalid_token"===b&&(a.ke++,3<=a.ke&&(a.Sa=3E4,a=a.$c,b='Provided authentication credentials for the app named "'+a.oc.name+'" are invalid. This usually indicates your app was not initialized correctly. ',b="credential"in a.oc.options?b+'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in a.oc.options?
	b+'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':b+'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',O(b)))}
	function Jf(a){Df(a);r(a.$,function(b){r(b,function(b){Af(a,b)})});for(var b=0;b<a.pa.length;b++)a.pa[b]&&Hf(a,b);for(;a.Kc.length;)b=a.Kc.shift(),Ff(a,b.action,b.we,b.data,b.G)}function Lf(a){var b;b=He.Vb().hc;return va(a.qd)&&b};var W={Mf:function(){he=bf=!0}};W.forceLongPolling=W.Mf;W.Nf=function(){ie=!0};W.forceWebSockets=W.Nf;W.Tf=function(){return af.isAvailable()};W.isWebSocketsAvailable=W.Tf;W.lg=function(a,b){a.u.Ra.ze=b};W.setSecurityDebugCallback=W.lg;W.Be=function(a,b){a.u.Be(b)};W.stats=W.Be;W.Ce=function(a,b){a.u.Ce(b)};W.statsIncrementCounter=W.Ce;W.fd=function(a){return a.u.fd};W.dataUpdateCount=W.fd;W.Sf=function(a,b){a.u.je=b};W.interceptServerData=W.Sf;function R(a,b){this.name=a;this.R=b}function Mf(a,b){return new R(a,b)};function Nf(a){this.V=a;this.g=a.m.g}function Of(a,b,c,d){var e=[],f=[];ya(b,function(b){"child_changed"===b.type&&a.g.nd(b.qe,b.Ja)&&f.push(new I("child_moved",b.Ja,b.Xa))});Pf(a,e,"child_removed",b,d,c);Pf(a,e,"child_added",b,d,c);Pf(a,e,"child_moved",f,d,c);Pf(a,e,"child_changed",b,d,c);Pf(a,e,ac,b,d,c);return e}function Pf(a,b,c,d,e,f){d=za(d,function(a){return a.type===c});Ha(d,q(a.Ff,a));ya(d,function(c){var d=Qf(a,c,f);ya(e,function(e){e.nf(c.type)&&b.push(e.createEvent(d,a.V))})})}
	function Qf(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Dd=c.Ve(b.Xa,b.Ja,a.g));return b}Nf.prototype.Ff=function(a,b){if(null==a.Xa||null==b.Xa)throw Cc("Should only compare child_ events.");return this.g.compare(new R(a.Xa,a.Ja),new R(b.Xa,b.Ja))};function Rf(a){this.sa=new Id(a);this.g=a.g;E(a.xa,"Only valid if limit has been set");this.oa=a.oa;this.Ib=!Sf(a)}g=Rf.prototype;g.F=function(a,b,c,d,e,f){this.sa.matches(new R(b,c))||(c=J);return a.Q(b).Z(c)?a:a.Eb()<this.oa?this.sa.Ub().F(a,b,c,d,e,f):Tf(this,a,b,c,e,f)};
	g.ya=function(a,b,c){var d;if(b.J()||b.e())d=J.nb(this.g);else if(2*this.oa<b.Eb()&&b.yc(this.g)){d=J.nb(this.g);b=this.Ib?b.Zb(this.sa.vc,this.g):b.Xb(this.sa.Uc,this.g);for(var e=0;0<b.Pa.length&&e<this.oa;){var f=K(b),h;if(h=this.Ib?0>=this.g.compare(this.sa.Uc,f):0>=this.g.compare(f,this.sa.vc))d=d.T(f.name,f.R),e++;else break}}else{d=b.nb(this.g);d=d.fa(J);var k,l,m;if(this.Ib){b=d.We(this.g);k=this.sa.vc;l=this.sa.Uc;var u=Uf(this.g);m=function(a,b){return u(b,a)}}else b=d.Wb(this.g),k=this.sa.Uc,
	l=this.sa.vc,m=Uf(this.g);for(var e=0,z=!1;0<b.Pa.length;)f=K(b),!z&&0>=m(k,f)&&(z=!0),(h=z&&e<this.oa&&0>=m(f,l))?e++:d=d.T(f.name,J)}return this.sa.Ub().ya(a,d,c)};g.fa=function(a){return a};g.Na=function(){return!0};g.Ub=function(){return this.sa.Ub()};
	function Tf(a,b,c,d,e,f){var h;if(a.Ib){var k=Uf(a.g);h=function(a,b){return k(b,a)}}else h=Uf(a.g);E(b.Eb()==a.oa,"");var l=new R(c,d),m=a.Ib?Vf(b,a.g):Wf(b,a.g),u=a.sa.matches(l);if(b.Da(c)){for(var z=b.Q(c),m=e.fe(a.g,m,a.Ib);null!=m&&(m.name==c||b.Da(m.name));)m=e.fe(a.g,m,a.Ib);e=null==m?1:h(m,l);if(u&&!d.e()&&0<=e)return null!=f&&Gd(f,new I("child_changed",d,c,z)),b.T(c,d);null!=f&&Gd(f,new I("child_removed",z,c));b=b.T(c,J);return null!=m&&a.sa.matches(m)?(null!=f&&Gd(f,new I("child_added",
	m.R,m.name)),b.T(m.name,m.R)):b}return d.e()?b:u&&0<=h(m,l)?(null!=f&&(Gd(f,new I("child_removed",m.R,m.name)),Gd(f,new I("child_added",d,c))),b.T(c,d).T(m.name,J)):b};function Ac(a,b){this.B=a;E(n(this.B)&&null!==this.B,"LeafNode shouldn't be created with null/undefined value.");this.aa=b||J;Xf(this.aa);this.Db=null}var Yf=["object","boolean","number","string"];g=Ac.prototype;g.J=function(){return!0};g.C=function(){return this.aa};g.fa=function(a){return new Ac(this.B,a)};g.Q=function(a){return".priority"===a?this.aa:J};g.P=function(a){return a.e()?this:".priority"===H(a)?this.aa:J};g.Da=function(){return!1};g.Ve=function(){return null};
	g.T=function(a,b){return".priority"===a?this.fa(b):b.e()&&".priority"!==a?this:J.T(a,b).fa(this.aa)};g.F=function(a,b){var c=H(a);if(null===c)return b;if(b.e()&&".priority"!==c)return this;E(".priority"!==c||1===Ad(a),".priority must be the last token in a path");return this.T(c,J.F(D(a),b))};g.e=function(){return!1};g.Eb=function(){return 0};g.O=function(){return!1};g.H=function(a){return a&&!this.C().e()?{".value":this.Ca(),".priority":this.C().H()}:this.Ca()};
	g.hash=function(){if(null===this.Db){var a="";this.aa.e()||(a+="priority:"+Zf(this.aa.H())+":");var b=typeof this.B,a=a+(b+":"),a="number"===b?a+Uc(this.B):a+this.B;this.Db=Ec(a)}return this.Db};g.Ca=function(){return this.B};g.sc=function(a){if(a===J)return 1;if(a instanceof P)return-1;E(a.J(),"Unknown node type");var b=typeof a.B,c=typeof this.B,d=xa(Yf,b),e=xa(Yf,c);E(0<=d,"Unknown leaf type: "+b);E(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.B<a.B?-1:this.B===a.B?0:1:e-d};
	g.nb=function(){return this};g.yc=function(){return!0};g.Z=function(a){return a===this?!0:a.J()?this.B===a.B&&this.aa.Z(a.aa):!1};g.toString=function(){return w(this.H(!0))};function $f(a,b){return Oc(a.name,b.name)}function ag(a,b){return Oc(a,b)};function bg(){}var cg={};function Uf(a){return q(a.compare,a)}bg.prototype.nd=function(a,b){return 0!==this.compare(new R("[MIN_NAME]",a),new R("[MIN_NAME]",b))};bg.prototype.Hc=function(){return dg};function eg(a){E(!a.e()&&".priority"!==H(a),"Can't create PathIndex with empty path or .priority key");this.bc=a}la(eg,bg);g=eg.prototype;g.xc=function(a){return!a.P(this.bc).e()};g.compare=function(a,b){var c=a.R.P(this.bc),d=b.R.P(this.bc),c=c.sc(d);return 0===c?Oc(a.name,b.name):c};
	g.Ec=function(a,b){var c=M(a),c=J.F(this.bc,c);return new R(b,c)};g.Fc=function(){var a=J.F(this.bc,fg);return new R("[MAX_NAME]",a)};g.toString=function(){return this.bc.slice().join("/")};function gg(){}la(gg,bg);g=gg.prototype;g.compare=function(a,b){var c=a.R.C(),d=b.R.C(),c=c.sc(d);return 0===c?Oc(a.name,b.name):c};g.xc=function(a){return!a.C().e()};g.nd=function(a,b){return!a.C().Z(b.C())};g.Hc=function(){return dg};g.Fc=function(){return new R("[MAX_NAME]",new Ac("[PRIORITY-POST]",fg))};
	g.Ec=function(a,b){var c=M(a);return new R(b,new Ac("[PRIORITY-POST]",c))};g.toString=function(){return".priority"};var N=new gg;function hg(){}la(hg,bg);g=hg.prototype;g.compare=function(a,b){return Oc(a.name,b.name)};g.xc=function(){throw Cc("KeyIndex.isDefinedOn not expected to be called.");};g.nd=function(){return!1};g.Hc=function(){return dg};g.Fc=function(){return new R("[MAX_NAME]",J)};g.Ec=function(a){E(p(a),"KeyIndex indexValue must always be a string.");return new R(a,J)};g.toString=function(){return".key"};
	var Fd=new hg;function ig(){}la(ig,bg);g=ig.prototype;g.compare=function(a,b){var c=a.R.sc(b.R);return 0===c?Oc(a.name,b.name):c};g.xc=function(){return!0};g.nd=function(a,b){return!a.Z(b)};g.Hc=function(){return dg};g.Fc=function(){return jg};g.Ec=function(a,b){var c=M(a);return new R(b,c)};g.toString=function(){return".value"};var kg=new ig;function lg(){this.Rb=this.na=this.Kb=this.ka=this.xa=!1;this.oa=0;this.mb="";this.dc=null;this.zb="";this.ac=null;this.xb="";this.g=N}var mg=new lg;function Sf(a){return""===a.mb?a.ka:"l"===a.mb}function Kd(a){E(a.ka,"Only valid if start has been set");return a.dc}function Jd(a){E(a.ka,"Only valid if start has been set");return a.Kb?a.zb:"[MIN_NAME]"}function Md(a){E(a.na,"Only valid if end has been set");return a.ac}
	function Ld(a){E(a.na,"Only valid if end has been set");return a.Rb?a.xb:"[MAX_NAME]"}function ng(a){var b=new lg;b.xa=a.xa;b.oa=a.oa;b.ka=a.ka;b.dc=a.dc;b.Kb=a.Kb;b.zb=a.zb;b.na=a.na;b.ac=a.ac;b.Rb=a.Rb;b.xb=a.xb;b.g=a.g;b.mb=a.mb;return b}g=lg.prototype;g.ne=function(a){var b=ng(this);b.xa=!0;b.oa=a;b.mb="l";return b};g.oe=function(a){var b=ng(this);b.xa=!0;b.oa=a;b.mb="r";return b};g.Nd=function(a,b){var c=ng(this);c.ka=!0;n(a)||(a=null);c.dc=a;null!=b?(c.Kb=!0,c.zb=b):(c.Kb=!1,c.zb="");return c};
	g.gd=function(a,b){var c=ng(this);c.na=!0;n(a)||(a=null);c.ac=a;n(b)?(c.Rb=!0,c.xb=b):(c.vg=!1,c.xb="");return c};function og(a,b){var c=ng(a);c.g=b;return c}function Bf(a){var b={};a.ka&&(b.sp=a.dc,a.Kb&&(b.sn=a.zb));a.na&&(b.ep=a.ac,a.Rb&&(b.en=a.xb));if(a.xa){b.l=a.oa;var c=a.mb;""===c&&(c=Sf(a)?"l":"r");b.vf=c}a.g!==N&&(b.i=a.g.toString());return b}function V(a){return!(a.ka||a.na||a.xa)}function ed(a){return V(a)&&a.g==N}
	function fd(a){var b={};if(ed(a))return b;var c;a.g===N?c="$priority":a.g===kg?c="$value":a.g===Fd?c="$key":(E(a.g instanceof eg,"Unrecognized index type!"),c=a.g.toString());b.orderBy=w(c);a.ka&&(b.startAt=w(a.dc),a.Kb&&(b.startAt+=","+w(a.zb)));a.na&&(b.endAt=w(a.ac),a.Rb&&(b.endAt+=","+w(a.xb)));a.xa&&(Sf(a)?b.limitToFirst=a.oa:b.limitToLast=a.oa);return b}g.toString=function(){return w(Bf(this))};function wc(){this.k=this.B=null}wc.prototype.find=function(a){if(null!=this.B)return this.B.P(a);if(a.e()||null==this.k)return null;var b=H(a);a=D(a);return this.k.contains(b)?this.k.get(b).find(a):null};function yc(a,b,c){if(b.e())a.B=c,a.k=null;else if(null!==a.B)a.B=a.B.F(b,c);else{null==a.k&&(a.k=new ee);var d=H(b);a.k.contains(d)||a.k.add(d,new wc);a=a.k.get(d);b=D(b);yc(a,b,c)}}
	function pg(a,b){if(b.e())return a.B=null,a.k=null,!0;if(null!==a.B){if(a.B.J())return!1;var c=a.B;a.B=null;c.O(N,function(b,c){yc(a,new L(b),c)});return pg(a,b)}return null!==a.k?(c=H(b),b=D(b),a.k.contains(c)&&pg(a.k.get(c),b)&&a.k.remove(c),a.k.e()?(a.k=null,!0):!1):!0}function xc(a,b,c){null!==a.B?c(b,a.B):a.O(function(a,e){var f=new L(b.toString()+"/"+a);xc(e,f,c)})}wc.prototype.O=function(a){null!==this.k&&fe(this.k,function(b,c){a(b,c)})};function qg(a,b){this.od=a;this.cc=b}qg.prototype.get=function(a){var b=B(this.od,a);if(!b)throw Error("No index defined for "+a);return b===cg?null:b};function rg(a,b,c){var d=ma(a.od,function(d,f){var h=B(a.cc,f);E(h,"Missing index implementation for "+f);if(d===cg){if(h.xc(b.R)){for(var k=[],l=c.Wb(Mf),m=K(l);m;)m.name!=b.name&&k.push(m),m=K(l);k.push(b);return sg(k,Uf(h))}return cg}h=c.get(b.name);k=d;h&&(k=k.remove(new R(b.name,h)));return k.Oa(b,b.R)});return new qg(d,a.cc)}
	function tg(a,b,c){var d=ma(a.od,function(a){if(a===cg)return a;var d=c.get(b.name);return d?a.remove(new R(b.name,d)):a});return new qg(d,a.cc)}var ug=new qg({".priority":cg},{".priority":N});function P(a,b,c){this.k=a;(this.aa=b)&&Xf(this.aa);a.e()&&E(!this.aa||this.aa.e(),"An empty node cannot have a priority");this.yb=c;this.Db=null}g=P.prototype;g.J=function(){return!1};g.C=function(){return this.aa||J};g.fa=function(a){return this.k.e()?this:new P(this.k,a,this.yb)};g.Q=function(a){if(".priority"===a)return this.C();a=this.k.get(a);return null===a?J:a};g.P=function(a){var b=H(a);return null===b?this:this.Q(b).P(D(a))};g.Da=function(a){return null!==this.k.get(a)};
	g.T=function(a,b){E(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.fa(b);var c=new R(a,b),d,e;b.e()?(d=this.k.remove(a),c=tg(this.yb,c,this.k)):(d=this.k.Oa(a,b),c=rg(this.yb,c,this.k));e=d.e()?J:this.aa;return new P(d,e,c)};g.F=function(a,b){var c=H(a);if(null===c)return b;E(".priority"!==H(a)||1===Ad(a),".priority must be the last token in a path");var d=this.Q(c).F(D(a),b);return this.T(c,d)};g.e=function(){return this.k.e()};g.Eb=function(){return this.k.count()};
	var vg=/^(0|[1-9]\d*)$/;g=P.prototype;g.H=function(a){if(this.e())return null;var b={},c=0,d=0,e=!0;this.O(N,function(f,h){b[f]=h.H(a);c++;e&&vg.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],h;for(h in b)f[h]=b[h];return f}a&&!this.C().e()&&(b[".priority"]=this.C().H());return b};g.hash=function(){if(null===this.Db){var a="";this.C().e()||(a+="priority:"+Zf(this.C().H())+":");this.O(N,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Db=""===a?"":Ec(a)}return this.Db};
	g.Ve=function(a,b,c){return(c=wg(this,c))?(a=ic(c,new R(a,b)))?a.name:null:ic(this.k,a)};function Vf(a,b){var c;c=(c=wg(a,b))?(c=c.Gc())&&c.name:a.k.Gc();return c?new R(c,a.k.get(c)):null}function Wf(a,b){var c;c=(c=wg(a,b))?(c=c.ec())&&c.name:a.k.ec();return c?new R(c,a.k.get(c)):null}g.O=function(a,b){var c=wg(this,a);return c?c.ha(function(a){return b(a.name,a.R)}):this.k.ha(b)};g.Wb=function(a){return this.Xb(a.Hc(),a)};
	g.Xb=function(a,b){var c=wg(this,b);if(c)return c.Xb(a,function(a){return a});for(var c=this.k.Xb(a.name,Mf),d=kc(c);null!=d&&0>b.compare(d,a);)K(c),d=kc(c);return c};g.We=function(a){return this.Zb(a.Fc(),a)};g.Zb=function(a,b){var c=wg(this,b);if(c)return c.Zb(a,function(a){return a});for(var c=this.k.Zb(a.name,Mf),d=kc(c);null!=d&&0<b.compare(d,a);)K(c),d=kc(c);return c};g.sc=function(a){return this.e()?a.e()?0:-1:a.J()||a.e()?1:a===fg?-1:0};
	g.nb=function(a){if(a===Fd||sa(this.yb.cc,a.toString()))return this;var b=this.yb,c=this.k;E(a!==Fd,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.Wb(Mf),f=K(c);f;)e=e||a.xc(f.R),d.push(f),f=K(c);d=e?sg(d,Uf(a)):cg;e=a.toString();c=wa(b.cc);c[e]=a;a=wa(b.od);a[e]=d;return new P(this.k,this.aa,new qg(a,c))};g.yc=function(a){return a===Fd||sa(this.yb.cc,a.toString())};
	g.Z=function(a){if(a===this)return!0;if(a.J())return!1;if(this.C().Z(a.C())&&this.k.count()===a.k.count()){var b=this.Wb(N);a=a.Wb(N);for(var c=K(b),d=K(a);c&&d;){if(c.name!==d.name||!c.R.Z(d.R))return!1;c=K(b);d=K(a)}return null===c&&null===d}return!1};function wg(a,b){return b===Fd?null:a.yb.get(b.toString())}g.toString=function(){return w(this.H(!0))};function M(a,b){if(null===a)return J;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);E(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new Ac(a,M(c));if(a instanceof Array){var d=J,e=a;r(e,function(a,b){if(ib(e,b)&&"."!==b.substring(0,1)){var c=M(a);if(c.J()||!c.e())d=
	d.T(b,c)}});return d.fa(M(c))}var f=[],h=!1,k=a;jb(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=M(k[a]);b.e()||(h=h||!b.C().e(),f.push(new R(a,b)))}});if(0==f.length)return J;var l=sg(f,$f,function(a){return a.name},ag);if(h){var m=sg(f,Uf(N));return new P(l,M(c),new qg({".priority":m},{".priority":N}))}return new P(l,M(c),ug)}var xg=Math.log(2);
	function yg(a){this.count=parseInt(Math.log(a+1)/xg,10);this.Oe=this.count-1;this.Cf=a+1&parseInt(Array(this.count+1).join("1"),2)}function zg(a){var b=!(a.Cf&1<<a.Oe);a.Oe--;return b}
	function sg(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var m=a[b],u=c?c(m):m;return new lc(u,m.R,!1,null,null)}var m=parseInt(f/2,10)+b,f=e(b,m),z=e(m+1,d),m=a[m],u=c?c(m):m;return new lc(u,m.R,!1,f,z)}a.sort(b);var f=function(b){function d(b,h){var k=u-b,z=u;u-=b;var z=e(k+1,z),k=a[k],F=c?c(k):k,z=new lc(F,k.R,h,null,z);f?f.left=z:m=z;f=z}for(var f=null,m=null,u=a.length,z=0;z<b.count;++z){var F=zg(b),td=Math.pow(2,b.count-(z+1));F?d(td,!1):(d(td,!1),d(td,!0))}return m}(new yg(a.length));
	return null!==f?new gc(d||b,f):new gc(d||b)}function Zf(a){return"number"===typeof a?"number:"+Uc(a):"string:"+a}function Xf(a){if(a.J()){var b=a.H();E("string"===typeof b||"number"===typeof b||"object"===typeof b&&ib(b,".sv"),"Priority must be a string or number.")}else E(a===fg||a.e(),"priority of unexpected type.");E(a===fg||a.C().e(),"Priority nodes can't have a priority of their own.")}var J=new P(new gc(ag),null,ug);function Ag(){P.call(this,new gc(ag),J,ug)}la(Ag,P);g=Ag.prototype;
	g.sc=function(a){return a===this?0:1};g.Z=function(a){return a===this};g.C=function(){return this};g.Q=function(){return J};g.e=function(){return!1};var fg=new Ag,dg=new R("[MIN_NAME]",J),jg=new R("[MAX_NAME]",fg);function X(a,b,c){this.A=a;this.V=b;this.g=c}X.prototype.H=function(){x("Firebase.DataSnapshot.val",0,0,arguments.length);return this.A.H()};X.prototype.val=X.prototype.H;X.prototype.be=function(){x("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.A.H(!0)};X.prototype.exportVal=X.prototype.be;X.prototype.toJSON=function(){x("Firebase.DataSnapshot.toJSON",0,1,arguments.length);return this.be()};X.prototype.toJSON=X.prototype.toJSON;
	X.prototype.Lf=function(){x("Firebase.DataSnapshot.exists",0,0,arguments.length);return!this.A.e()};X.prototype.exists=X.prototype.Lf;X.prototype.n=function(a){x("Firebase.DataSnapshot.child",0,1,arguments.length);ga(a)&&(a=String(a));ze("Firebase.DataSnapshot.child",a);var b=new L(a),c=this.V.n(b);return new X(this.A.P(b),c,N)};X.prototype.child=X.prototype.n;
	X.prototype.Da=function(a){x("Firebase.DataSnapshot.hasChild",1,1,arguments.length);ze("Firebase.DataSnapshot.hasChild",a);var b=new L(a);return!this.A.P(b).e()};X.prototype.hasChild=X.prototype.Da;X.prototype.C=function(){x("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.A.C().H()};X.prototype.getPriority=X.prototype.C;
	X.prototype.forEach=function(a){x("Firebase.DataSnapshot.forEach",1,1,arguments.length);A("Firebase.DataSnapshot.forEach",1,a,!1);if(this.A.J())return!1;var b=this;return!!this.A.O(this.g,function(c,d){return a(new X(d,b.V.n(c),N))})};X.prototype.forEach=X.prototype.forEach;X.prototype.kd=function(){x("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.A.J()?!1:!this.A.e()};X.prototype.hasChildren=X.prototype.kd;
	X.prototype.getKey=function(){x("Firebase.DataSnapshot.key",0,0,arguments.length);return this.V.getKey()};Wc(X.prototype,"key",X.prototype.getKey);X.prototype.Eb=function(){x("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.A.Eb()};X.prototype.numChildren=X.prototype.Eb;X.prototype.wb=function(){x("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.V};Wc(X.prototype,"ref",X.prototype.wb);function yd(a,b){this.N=a;this.Ld=b}function vd(a,b,c,d){return new yd(new Mb(b,c,d),a.Ld)}function zd(a){return a.N.da?a.N.j():null}yd.prototype.w=function(){return this.Ld};function ec(a){return a.Ld.da?a.Ld.j():null};function Bg(a,b){this.V=a;var c=a.m,d=new Hd(c.g),c=V(c)?new Hd(c.g):c.xa?new Rf(c):new Id(c);this.hf=new nd(c);var e=b.w(),f=b.N,h=d.ya(J,e.j(),null),k=c.ya(J,f.j(),null);this.Ka=new yd(new Mb(k,f.da,c.Na()),new Mb(h,e.da,d.Na()));this.Za=[];this.Jf=new Nf(a)}function Cg(a){return a.V}g=Bg.prototype;g.w=function(){return this.Ka.w().j()};g.hb=function(a){var b=ec(this.Ka);return b&&(V(this.V.m)||!a.e()&&!b.Q(H(a)).e())?b.P(a):null};g.e=function(){return 0===this.Za.length};g.Nb=function(a){this.Za.push(a)};
	g.kb=function(a,b){var c=[];if(b){E(null==a,"A cancel should cancel all event registrations.");var d=this.V.path;ya(this.Za,function(a){(a=a.Me(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.Za.length;++f){var h=this.Za[f];if(!h.matches(a))e.push(h);else if(a.Xe()){e=e.concat(this.Za.slice(f+1));break}}this.Za=e}else this.Za=[];return c};
	g.eb=function(a,b,c){a.type===bd&&null!==a.source.Hb&&(E(ec(this.Ka),"We should always have a full cache before handling merges"),E(zd(this.Ka),"Missing event cache, even though we have a server cache"));var d=this.Ka;a=this.hf.eb(d,a,b,c);b=this.hf;c=a.Sd;E(c.N.j().yc(b.U.g),"Event snap not indexed");E(c.w().j().yc(b.U.g),"Server snap not indexed");E(Nb(a.Sd.w())||!Nb(d.w()),"Once a server snap is complete, it should never go back");this.Ka=a.Sd;return Dg(this,a.Df,a.Sd.N.j(),null)};
	function Eg(a,b){var c=a.Ka.N,d=[];c.j().J()||c.j().O(N,function(a,b){d.push(new I("child_added",b,a))});c.da&&d.push($b(c.j()));return Dg(a,d,c.j(),b)}function Dg(a,b,c,d){return Of(a.Jf,b,c,d?[d]:a.Za)};function Fg(a,b,c){this.Pb=a;this.rb=b;this.tb=c||null}g=Fg.prototype;g.nf=function(a){return"value"===a};g.createEvent=function(a,b){var c=b.m.g;return new Rb("value",this,new X(a.Ja,b.wb(),c))};g.Tb=function(a){var b=this.tb;if("cancel"===a.ge()){E(this.rb,"Raising a cancel event on a listener with no cancel callback");var c=this.rb;return function(){c.call(b,a.error)}}var d=this.Pb;return function(){d.call(b,a.Md)}};g.Me=function(a,b){return this.rb?new Sb(this,a,b):null};
	g.matches=function(a){return a instanceof Fg?a.Pb&&this.Pb?a.Pb===this.Pb&&a.tb===this.tb:!0:!1};g.Xe=function(){return null!==this.Pb};function Gg(a,b,c){this.ga=a;this.rb=b;this.tb=c}g=Gg.prototype;g.nf=function(a){a="children_added"===a?"child_added":a;return("children_removed"===a?"child_removed":a)in this.ga};g.Me=function(a,b){return this.rb?new Sb(this,a,b):null};
	g.createEvent=function(a,b){E(null!=a.Xa,"Child events should have a childName.");var c=b.wb().n(a.Xa);return new Rb(a.type,this,new X(a.Ja,c,b.m.g),a.Dd)};g.Tb=function(a){var b=this.tb;if("cancel"===a.ge()){E(this.rb,"Raising a cancel event on a listener with no cancel callback");var c=this.rb;return function(){c.call(b,a.error)}}var d=this.ga[a.hd];return function(){d.call(b,a.Md,a.Dd)}};
	g.matches=function(a){if(a instanceof Gg){if(!this.ga||!a.ga)return!0;if(this.tb===a.tb){var b=oa(a.ga);if(b===oa(this.ga)){if(1===b){var b=pa(a.ga),c=pa(this.ga);return c===b&&(!a.ga[b]||!this.ga[c]||a.ga[b]===this.ga[c])}return na(this.ga,function(b,c){return a.ga[c]===b})}}}return!1};g.Xe=function(){return null!==this.ga};function Y(a,b,c,d){this.u=a;this.path=b;this.m=c;this.Nc=d}
	function Hg(a){var b=null,c=null;a.ka&&(b=Kd(a));a.na&&(c=Md(a));if(a.g===Fd){if(a.ka){if("[MIN_NAME]"!=Jd(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.na){if("[MAX_NAME]"!=Ld(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
	typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===N){if(null!=b&&!re(b)||null!=c&&!re(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(E(a.g instanceof eg||a.g===kg,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
	}function Ig(a){if(a.ka&&a.na&&a.xa&&(!a.xa||""===a.mb))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function Jg(a,b){if(!0===a.Nc)throw Error(b+": You can't combine multiple orderBy calls.");}g=Y.prototype;g.wb=function(){x("Query.ref",0,0,arguments.length);return new T(this.u,this.path)};
	g.gc=function(a,b,c,d){x("Query.on",2,4,arguments.length);xe("Query.on",a,!1);A("Query.on",2,b,!1);var e=Kg("Query.on",c,d);if("value"===a)Lg(this.u,this,new Fg(b,e.cancel||null,e.Ma||null));else{var f={};f[a]=b;Lg(this.u,this,new Gg(f,e.cancel,e.Ma))}return b};
	g.Ic=function(a,b,c){x("Query.off",0,3,arguments.length);xe("Query.off",a,!0);A("Query.off",2,b,!0);hb("Query.off",3,c);var d=null,e=null;"value"===a?d=new Fg(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new Gg(e,null,c||null));e=this.u;d=".info"===H(this.path)?e.pd.kb(this,d):e.K.kb(this,d);Wb(e.ca,this.path,d)};
	g.$f=function(a,b){function c(k){f&&(f=!1,e.Ic(a,c),b&&b.call(d.Ma,k),h.resolve(k))}x("Query.once",1,4,arguments.length);xe("Query.once",a,!1);A("Query.once",2,b,!0);var d=Kg("Query.once",arguments[2],arguments[3]),e=this,f=!0,h=new db;fb(h.ra);this.gc(a,c,function(b){e.Ic(a,c);d.cancel&&d.cancel.call(d.Ma,b);h.reject(b)});return h.ra};
	g.ne=function(a){x("Query.limitToFirst",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.m.xa)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.u,this.path,this.m.ne(a),this.Nc)};
	g.oe=function(a){x("Query.limitToLast",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.m.xa)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.u,this.path,this.m.oe(a),this.Nc)};
	g.ag=function(a){x("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');ze("Query.orderByChild",a);Jg(this,"Query.orderByChild");var b=new L(a);if(b.e())throw Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
	b=new eg(b);b=og(this.m,b);Hg(b);return new Y(this.u,this.path,b,!0)};g.bg=function(){x("Query.orderByKey",0,0,arguments.length);Jg(this,"Query.orderByKey");var a=og(this.m,Fd);Hg(a);return new Y(this.u,this.path,a,!0)};g.cg=function(){x("Query.orderByPriority",0,0,arguments.length);Jg(this,"Query.orderByPriority");var a=og(this.m,N);Hg(a);return new Y(this.u,this.path,a,!0)};
	g.dg=function(){x("Query.orderByValue",0,0,arguments.length);Jg(this,"Query.orderByValue");var a=og(this.m,kg);Hg(a);return new Y(this.u,this.path,a,!0)};g.Nd=function(a,b){x("Query.startAt",0,2,arguments.length);se("Query.startAt",a,this.path,!0);ye("Query.startAt",b);var c=this.m.Nd(a,b);Ig(c);Hg(c);if(this.m.ka)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");n(a)||(b=a=null);return new Y(this.u,this.path,c,this.Nc)};
	g.gd=function(a,b){x("Query.endAt",0,2,arguments.length);se("Query.endAt",a,this.path,!0);ye("Query.endAt",b);var c=this.m.gd(a,b);Ig(c);Hg(c);if(this.m.na)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new Y(this.u,this.path,c,this.Nc)};
	g.If=function(a,b){x("Query.equalTo",1,2,arguments.length);se("Query.equalTo",a,this.path,!1);ye("Query.equalTo",b);if(this.m.ka)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.m.na)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.Nd(a,b).gd(a,b)};
	g.toString=function(){x("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.Y;c<a.o.length;c++)""!==a.o[c]&&(b+="/"+encodeURIComponent(String(a.o[c])));return this.u.toString()+(b||"/")};g.toJSON=function(){x("Query.toJSON",0,1,arguments.length);return this.toString()};g.ja=function(){var a=Rc(Bf(this.m));return"{}"===a?"default":a};
	g.isEqual=function(a){x("Query.isEqual",1,1,arguments.length);if(!(a instanceof Y))throw Error("Query.isEqual failed: First argument must be an instance of firebase.database.Query.");var b=this.u===a.u,c=this.path.Z(a.path),d=this.ja()===a.ja();return b&&c&&d};
	function Kg(a,b,c){var d={cancel:null,Ma:null};if(b&&c)d.cancel=b,A(a,3,d.cancel,!0),d.Ma=c,hb(a,4,d.Ma);else if(b)if("object"===typeof b&&null!==b)d.Ma=b;else if("function"===typeof b)d.cancel=b;else throw Error(y(a,3,!0)+" must either be a cancel callback or a context object.");return d}Y.prototype.on=Y.prototype.gc;Y.prototype.off=Y.prototype.Ic;Y.prototype.once=Y.prototype.$f;Y.prototype.limitToFirst=Y.prototype.ne;Y.prototype.limitToLast=Y.prototype.oe;Y.prototype.orderByChild=Y.prototype.ag;
	Y.prototype.orderByKey=Y.prototype.bg;Y.prototype.orderByPriority=Y.prototype.cg;Y.prototype.orderByValue=Y.prototype.dg;Y.prototype.startAt=Y.prototype.Nd;Y.prototype.endAt=Y.prototype.gd;Y.prototype.equalTo=Y.prototype.If;Y.prototype.toString=Y.prototype.toString;Y.prototype.isEqual=Y.prototype.isEqual;Wc(Y.prototype,"ref",Y.prototype.wb);function Mg(){this.za={}}g=Mg.prototype;g.e=function(){return va(this.za)};g.eb=function(a,b,c){var d=a.source.Hb;if(null!==d)return d=B(this.za,d),E(null!=d,"SyncTree gave us an op for an invalid query."),d.eb(a,b,c);var e=[];r(this.za,function(d){e=e.concat(d.eb(a,b,c))});return e};g.Nb=function(a,b,c,d,e){var f=a.ja(),h=B(this.za,f);if(!h){var h=c.Aa(e?d:null),k=!1;h?k=!0:(h=d instanceof P?c.rc(d):J,k=!1);h=new Bg(a,new yd(new Mb(h,k,!1),new Mb(d,e,!1)));this.za[f]=h}h.Nb(b);return Eg(h,b)};
	g.kb=function(a,b,c){var d=a.ja(),e=[],f=[],h=null!=Ng(this);if("default"===d){var k=this;r(this.za,function(a,d){f=f.concat(a.kb(b,c));a.e()&&(delete k.za[d],V(a.V.m)||e.push(a.V))})}else{var l=B(this.za,d);l&&(f=f.concat(l.kb(b,c)),l.e()&&(delete this.za[d],V(l.V.m)||e.push(l.V)))}h&&null==Ng(this)&&e.push(new T(a.u,a.path));return{hg:e,Kf:f}};function Og(a){return za(qa(a.za),function(a){return!V(a.V.m)})}g.hb=function(a){var b=null;r(this.za,function(c){b=b||c.hb(a)});return b};
	function Pg(a,b){if(V(b.m))return Ng(a);var c=b.ja();return B(a.za,c)}function Ng(a){return ua(a.za,function(a){return V(a.V.m)})||null};function Qg(a){this.W=a}var Rg=new Qg(new Je(null));function Sg(a,b,c){if(b.e())return new Qg(new Je(c));var d=Ne(a.W,b);if(null!=d){var e=d.path,d=d.value;b=S(e,b);d=d.F(b,c);return new Qg(a.W.set(e,d))}a=Ed(a.W,b,new Je(c));return new Qg(a)}function Tg(a,b,c){var d=a;jb(c,function(a,c){d=Sg(d,b.n(a),c)});return d}Qg.prototype.Ed=function(a){if(a.e())return Rg;a=Ed(this.W,a,Q);return new Qg(a)};function Ug(a,b){var c=Ne(a.W,b);return null!=c?a.W.get(c.path).P(S(c.path,b)):null}
	function Vg(a){var b=[],c=a.W.value;null!=c?c.J()||c.O(N,function(a,c){b.push(new R(a,c))}):a.W.children.ha(function(a,c){null!=c.value&&b.push(new R(a,c.value))});return b}function Wg(a,b){if(b.e())return a;var c=Ug(a,b);return null!=c?new Qg(new Je(c)):new Qg(a.W.subtree(b))}Qg.prototype.e=function(){return this.W.e()};Qg.prototype.apply=function(a){return Xg(C,this.W,a)};
	function Xg(a,b,c){if(null!=b.value)return c.F(a,b.value);var d=null;b.children.ha(function(b,f){".priority"===b?(E(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=Xg(a.n(b),f,c)});c.P(a).e()||null===d||(c=c.F(a.n(".priority"),d));return c};function Yg(){this.S=Rg;this.la=[];this.Bc=-1}function Zg(a,b){for(var c=0;c<a.la.length;c++){var d=a.la[c];if(d.Zc===b)return d}return null}g=Yg.prototype;
	g.Ed=function(a){var b=Ea(this.la,function(b){return b.Zc===a});E(0<=b,"removeWrite called with nonexistent writeId.");var c=this.la[b];this.la.splice(b,1);for(var d=c.visible,e=!1,f=this.la.length-1;d&&0<=f;){var h=this.la[f];h.visible&&(f>=b&&$g(h,c.path)?d=!1:c.path.contains(h.path)&&(e=!0));f--}if(d){if(e)this.S=ah(this.la,bh,C),this.Bc=0<this.la.length?this.la[this.la.length-1].Zc:-1;else if(c.Ga)this.S=this.S.Ed(c.path);else{var k=this;r(c.children,function(a,b){k.S=k.S.Ed(c.path.n(b))})}return!0}return!1};
	g.Aa=function(a,b,c,d){if(c||d){var e=Wg(this.S,a);return!d&&e.e()?b:d||null!=b||null!=Ug(e,C)?(e=ah(this.la,function(b){return(b.visible||d)&&(!c||!(0<=xa(c,b.Zc)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||J,e.apply(b)):null}e=Ug(this.S,a);if(null!=e)return e;e=Wg(this.S,a);return e.e()?b:null!=b||null!=Ug(e,C)?(b=b||J,e.apply(b)):null};
	g.rc=function(a,b){var c=J,d=Ug(this.S,a);if(d)d.J()||d.O(N,function(a,b){c=c.T(a,b)});else if(b){var e=Wg(this.S,a);b.O(N,function(a,b){var d=Wg(e,new L(a)).apply(b);c=c.T(a,d)});ya(Vg(e),function(a){c=c.T(a.name,a.R)})}else e=Wg(this.S,a),ya(Vg(e),function(a){c=c.T(a.name,a.R)});return c};g.ad=function(a,b,c,d){E(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.n(b);if(null!=Ug(this.S,a))return null;a=Wg(this.S,a);return a.e()?d.P(b):a.apply(d.P(b))};
	g.qc=function(a,b,c){a=a.n(b);var d=Ug(this.S,a);return null!=d?d:Qb(c,b)?Wg(this.S,a).apply(c.j().Q(b)):null};g.lc=function(a){return Ug(this.S,a)};g.Xd=function(a,b,c,d,e,f){var h;a=Wg(this.S,a);h=Ug(a,C);if(null==h)if(null!=b)h=a.apply(b);else return[];h=h.nb(f);if(h.e()||h.J())return[];b=[];a=Uf(f);e=e?h.Zb(c,f):h.Xb(c,f);for(f=K(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=K(e);return b};
	function $g(a,b){return a.Ga?a.path.contains(b):!!ta(a.children,function(c,d){return a.path.n(d).contains(b)})}function bh(a){return a.visible}
	function ah(a,b,c){for(var d=Rg,e=0;e<a.length;++e){var f=a[e];if(b(f)){var h=f.path;if(f.Ga)c.contains(h)?(h=S(c,h),d=Sg(d,h,f.Ga)):h.contains(c)&&(h=S(h,c),d=Sg(d,C,f.Ga.P(h)));else if(f.children)if(c.contains(h))h=S(c,h),d=Tg(d,h,f.children);else{if(h.contains(c))if(h=S(h,c),h.e())d=Tg(d,C,f.children);else if(f=B(f.children,H(h)))f=f.P(D(h)),d=Sg(d,C,f)}else throw Cc("WriteRecord should have .snap or .children");}}return d}function ch(a,b){this.Lb=a;this.W=b}g=ch.prototype;
	g.Aa=function(a,b,c){return this.W.Aa(this.Lb,a,b,c)};g.rc=function(a){return this.W.rc(this.Lb,a)};g.ad=function(a,b,c){return this.W.ad(this.Lb,a,b,c)};g.lc=function(a){return this.W.lc(this.Lb.n(a))};g.Xd=function(a,b,c,d,e){return this.W.Xd(this.Lb,a,b,c,d,e)};g.qc=function(a,b){return this.W.qc(this.Lb,a,b)};g.n=function(a){return new ch(this.Lb.n(a),this.W)};function dh(a){this.wa=Q;this.jb=new Yg;this.De={};this.ic={};this.Cc=a}function eh(a,b,c,d,e){var f=a.jb,h=e;E(d>f.Bc,"Stacking an older write on top of newer ones");n(h)||(h=!0);f.la.push({path:b,Ga:c,Zc:d,visible:h});h&&(f.S=Sg(f.S,b,c));f.Bc=d;return e?fh(a,new vb(Xe,b,c)):[]}function gh(a,b,c,d){var e=a.jb;E(d>e.Bc,"Stacking an older merge on top of newer ones");e.la.push({path:b,children:c,Zc:d,visible:!0});e.S=Tg(e.S,b,c);e.Bc=d;c=Le(c);return fh(a,new ad(Xe,b,c))}
	function hh(a,b,c){c=c||!1;var d=Zg(a.jb,b);if(a.jb.Ed(b)){var e=Q;null!=d.Ga?e=e.set(C,!0):jb(d.children,function(a,b){e=e.set(new L(a),b)});return fh(a,new We(d.path,e,c))}return[]}function ih(a,b,c){c=Le(c);return fh(a,new ad(Ze,b,c))}function jh(a,b,c,d){d=kh(a,d);if(null!=d){var e=lh(d);d=e.path;e=e.Hb;b=S(d,b);c=new vb(new Ye(!1,!0,e,!0),b,c);return mh(a,d,c)}return[]}
	function nh(a,b,c,d){if(d=kh(a,d)){var e=lh(d);d=e.path;e=e.Hb;b=S(d,b);c=Le(c);c=new ad(new Ye(!1,!0,e,!0),b,c);return mh(a,d,c)}return[]}
	dh.prototype.Nb=function(a,b){var c=a.path,d=null,e=!1;Se(this.wa,c,function(a,b){var f=S(a,c);d=d||b.hb(f);e=e||null!=Ng(b)});var f=this.wa.get(c);f?(e=e||null!=Ng(f),d=d||f.hb(C)):(f=new Mg,this.wa=this.wa.set(c,f));var h;null!=d?h=!0:(h=!1,d=J,Ve(this.wa.subtree(c),function(a,b){var c=b.hb(C);c&&(d=d.T(a,c))}));var k=null!=Pg(f,a);if(!k&&!V(a.m)){var l=oh(a);E(!(l in this.ic),"View does not exist, but we have a tag");var m=ph++;this.ic[l]=m;this.De["_"+m]=l}h=f.Nb(a,b,new ch(c,this.jb),d,h);k||
	e||(f=Pg(f,a),h=h.concat(qh(this,a,f)));return h};
	dh.prototype.kb=function(a,b,c){var d=a.path,e=this.wa.get(d),f=[];if(e&&("default"===a.ja()||null!=Pg(e,a))){f=e.kb(a,b,c);e.e()&&(this.wa=this.wa.remove(d));e=f.hg;f=f.Kf;b=-1!==Ea(e,function(a){return V(a.m)});var h=Qe(this.wa,d,function(a,b){return null!=Ng(b)});if(b&&!h&&(d=this.wa.subtree(d),!d.e()))for(var d=rh(d),k=0;k<d.length;++k){var l=d[k],m=l.V,l=sh(this,l);this.Cc.Ae(th(m),uh(this,m),l.ld,l.G)}if(!h&&0<e.length&&!c)if(b)this.Cc.Od(th(a),null);else{var u=this;ya(e,function(a){a.ja();
	var b=u.ic[oh(a)];u.Cc.Od(th(a),b)})}vh(this,e)}return f};dh.prototype.Aa=function(a,b){var c=this.jb,d=Qe(this.wa,a,function(b,c){var d=S(b,a);if(d=c.hb(d))return d});return c.Aa(a,d,b,!0)};function rh(a){return Oe(a,function(a,c,d){if(c&&null!=Ng(c))return[Ng(c)];var e=[];c&&(e=Og(c));r(d,function(a){e=e.concat(a)});return e})}function vh(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!V(d.m)){var d=oh(d),e=a.ic[d];delete a.ic[d];delete a.De["_"+e]}}}
	function th(a){return V(a.m)&&!ed(a.m)?a.wb():a}function qh(a,b,c){var d=b.path,e=uh(a,b);c=sh(a,c);b=a.Cc.Ae(th(b),e,c.ld,c.G);d=a.wa.subtree(d);if(e)E(null==Ng(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=Oe(d,function(a,b,c){if(!a.e()&&b&&null!=Ng(b))return[Cg(Ng(b))];var d=[];b&&(d=d.concat(Aa(Og(b),function(a){return a.V})));r(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Cc.Od(th(c),uh(a,c));return b}
	function sh(a,b){var c=b.V,d=uh(a,c);return{ld:function(){return(b.w()||J).hash()},G:function(b){if("ok"===b){if(d){var f=c.path;if(b=kh(a,d)){var h=lh(b);b=h.path;h=h.Hb;f=S(b,f);f=new xb(new Ye(!1,!0,h,!0),f);b=mh(a,b,f)}else b=[]}else b=fh(a,new xb(Ze,c.path));return b}f="Unknown Error";"too_big"===b?f="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==b?f="Client doesn't have permission to access the desired data.":"unavailable"==b&&
	(f="The service is unavailable");f=Error(b+" at "+c.path.toString()+": "+f);f.code=b.toUpperCase();return a.kb(c,null,f)}}}function oh(a){return a.path.toString()+"$"+a.ja()}function lh(a){var b=a.indexOf("$");E(-1!==b&&b<a.length-1,"Bad queryKey.");return{Hb:a.substr(b+1),path:new L(a.substr(0,b))}}function kh(a,b){var c=a.De,d="_"+b;return d in c?c[d]:void 0}function uh(a,b){var c=oh(b);return B(a.ic,c)}var ph=1;
	function mh(a,b,c){var d=a.wa.get(b);E(d,"Missing sync point for query tag that we're tracking");return d.eb(c,new ch(b,a.jb),null)}function fh(a,b){return wh(a,b,a.wa,null,new ch(C,a.jb))}function wh(a,b,c,d,e){if(b.path.e())return xh(a,b,c,d,e);var f=c.get(C);null==d&&null!=f&&(d=f.hb(C));var h=[],k=H(b.path),l=b.Mc(k);if((c=c.children.get(k))&&l)var m=d?d.Q(k):null,k=e.n(k),h=h.concat(wh(a,l,c,m,k));f&&(h=h.concat(f.eb(b,e,d)));return h}
	function xh(a,b,c,d,e){var f=c.get(C);null==d&&null!=f&&(d=f.hb(C));var h=[];c.children.ha(function(c,f){var m=d?d.Q(c):null,u=e.n(c),z=b.Mc(c);z&&(h=h.concat(xh(a,z,f,m,u)))});f&&(h=h.concat(f.eb(b,e,d)));return h};function Sd(a,b,c){this.app=c;var d=new Kb(c);this.L=a;this.Va=kd(a);this.Vc=null;this.ca=new Tb;this.vd=1;this.Ra=null;if(b||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i))this.va=new cd(this.L,q(this.Gb,this),d),setTimeout(q(this.Jc,this,!0),0);else{b=c.options.databaseAuthVariableOverride;if("undefined"!==da(b)&&null!==b){if("object"!==da(b))throw Error("Only objects are supported for option databaseAuthVariableOverride");
	try{w(b)}catch(e){throw Error("Invalid authOverride provided: "+e);}}this.va=this.Ra=new wf(this.L,q(this.Gb,this),q(this.Jc,this),q(this.ue,this),d,b)}var f=this;Lb(d,function(a){f.va.kf(a)});this.og=ld(a,q(function(){return new hd(this.Va,this.va)},this));this.mc=new Zd;this.ie=new fc;this.pd=new dh({Ae:function(a,b,c,d){b=[];c=f.ie.j(a.path);c.e()||(b=fh(f.pd,new vb(Ze,a.path,c)),setTimeout(function(){d("ok")},0));return b},Od:ba});yh(this,"connected",!1);this.ia=new wc;this.Ya=new Rd(this);this.fd=
	0;this.je=null;this.K=new dh({Ae:function(a,b,c,d){f.va.$e(a,c,b,function(b,c){var e=d(b,c);Yb(f.ca,a.path,e)});return[]},Od:function(a,b){f.va.uf(a,b)}})}g=Sd.prototype;g.toString=function(){return(this.L.Sc?"https://":"http://")+this.L.host};g.name=function(){return this.L.pe};function zh(a){a=a.ie.j(new L(".info/serverTimeOffset")).H()||0;return(new Date).getTime()+a}function Ah(a){a=a={timestamp:zh(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
	g.Gb=function(a,b,c,d){this.fd++;var e=new L(a);b=this.je?this.je(a,b):b;a=[];d?c?(b=ma(b,function(a){return M(a)}),a=nh(this.K,e,b,d)):(b=M(b),a=jh(this.K,e,b,d)):c?(d=ma(b,function(a){return M(a)}),a=ih(this.K,e,d)):(d=M(b),a=fh(this.K,new vb(Ze,e,d)));d=e;0<a.length&&(d=Bh(this,e));Yb(this.ca,d,a)};g.Jc=function(a){yh(this,"connected",a);!1===a&&Ch(this)};g.ue=function(a){var b=this;Tc(a,function(a,d){yh(b,d,a)})};
	function yh(a,b,c){b=new L("/.info/"+b);c=M(c);var d=a.ie;d.Jd=d.Jd.F(b,c);c=fh(a.pd,new vb(Ze,b,c));Yb(a.ca,b,c)}g.Jb=function(a,b,c,d){this.f("set",{path:a.toString(),value:b,ug:c});var e=Ah(this);b=M(b,c);var e=zc(b,e),f=this.vd++,e=eh(this.K,a,e,f,!0);Ub(this.ca,e);var h=this;this.va.put(a.toString(),b.H(!0),function(b,c){var e="ok"===b;e||O("set at "+a+" failed: "+b);e=hh(h.K,f,!e);Yb(h.ca,a,e);Dh(d,b,c)});e=Eh(this,a);Bh(this,e);Yb(this.ca,e,[])};
	g.update=function(a,b,c){this.f("update",{path:a.toString(),value:b});var d=!0,e=Ah(this),f={};r(b,function(a,b){d=!1;var c=M(a);f[b]=zc(c,e)});if(d)G("update() called with empty data.  Don't do anything."),Dh(c,"ok");else{var h=this.vd++,k=gh(this.K,a,f,h);Ub(this.ca,k);var l=this;this.va.af(a.toString(),b,function(b,d){var e="ok"===b;e||O("update at "+a+" failed: "+b);var e=hh(l.K,h,!e),f=a;0<e.length&&(f=Bh(l,a));Yb(l.ca,f,e);Dh(c,b,d)});r(b,function(b,c){var d=Eh(l,a.n(c));Bh(l,d)});Yb(this.ca,
	a,[])}};function Ch(a){a.f("onDisconnectEvents");var b=Ah(a),c=[];xc(vc(a.ia,b),C,function(b,e){c=c.concat(fh(a.K,new vb(Ze,b,e)));var f=Eh(a,b);Bh(a,f)});a.ia=new wc;Yb(a.ca,C,c)}g.xd=function(a,b){var c=this;this.va.xd(a.toString(),function(d,e){"ok"===d&&pg(c.ia,a);Dh(b,d,e)})};function Be(a,b,c,d){var e=M(c);a.va.re(b.toString(),e.H(!0),function(c,h){"ok"===c&&yc(a.ia,b,e);Dh(d,c,h)})}
	function Ce(a,b,c,d,e){var f=M(c,d);a.va.re(b.toString(),f.H(!0),function(c,d){"ok"===c&&yc(a.ia,b,f);Dh(e,c,d)})}function De(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(G("onDisconnect().update() called with empty data.  Don't do anything."),Dh(d,"ok")):a.va.cf(b.toString(),c,function(e,f){if("ok"===e)for(var l in c){var m=M(c[l]);yc(a.ia,b.n(l),m)}Dh(d,e,f)})}function Lg(a,b,c){c=".info"===H(b.path)?a.pd.Nb(b,c):a.K.Nb(b,c);Wb(a.ca,b.path,c)}g.ab=function(){this.Ra&&this.Ra.ab("repo_interrupt")};
	g.kc=function(){this.Ra&&this.Ra.kc("repo_interrupt")};g.Be=function(a){if("undefined"!==typeof console){a?(this.Vc||(this.Vc=new Bb(this.Va)),a=this.Vc.get()):a=this.Va.get();var b=Ba(ra(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};g.Ce=function(a){Ab(this.Va,a);this.og.rf[a]=!0};g.f=function(a){var b="";this.Ra&&(b=this.Ra.id+":");G(b,arguments)};
	function Dh(a,b,c){a&&sb(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function Fh(a,b,c,d,e){function f(){}a.f("transaction on "+b);var h=new T(a,b);h.gc("value",f);c={path:b,update:c,G:d,status:null,ef:Bc(),He:e,of:0,Rd:function(){h.Ic("value",f)},Td:null,Ba:null,cd:null,dd:null,ed:null};d=a.K.Aa(b,void 0)||J;c.cd=d;d=c.update(d.H());if(n(d)){te("transaction failed: Data returned ",d,c.path);c.status=1;e=$d(a.mc,b);var k=e.Ca()||[];k.push(c);ae(e,k);"object"===typeof d&&null!==d&&ib(d,".priority")?(k=B(d,".priority"),E(re(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
	k=(a.K.Aa(b)||J).C().H();e=Ah(a);d=M(d,k);e=zc(d,e);c.dd=d;c.ed=e;c.Ba=a.vd++;c=eh(a.K,b,e,c.Ba,c.He);Yb(a.ca,b,c);Gh(a)}else c.Rd(),c.dd=null,c.ed=null,c.G&&(a=new X(c.cd,new T(a,c.path),N),c.G(null,!1,a))}function Gh(a,b){var c=b||a.mc;b||Hh(a,c);if(null!==c.Ca()){var d=Ih(a,c);E(0<d.length,"Sending zero length transaction queue");Ca(d,function(a){return 1===a.status})&&Jh(a,c.path(),d)}else c.kd()&&c.O(function(b){Gh(a,b)})}
	function Jh(a,b,c){for(var d=Aa(c,function(a){return a.Ba}),e=a.K.Aa(b,d)||J,d=e,e=e.hash(),f=0;f<c.length;f++){var h=c[f];E(1===h.status,"tryToSendTransactionQueue_: items in queue should all be run.");h.status=2;h.of++;var k=S(b,h.path),d=d.F(k,h.dd)}d=d.H(!0);a.va.put(b.toString(),d,function(d){a.f("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(hh(a.K,c[f].Ba));if(c[f].G){var h=c[f].ed,k=new T(a,c[f].path);d.push(q(c[f].G,
	null,null,!0,new X(h,k,N)))}c[f].Rd()}Hh(a,$d(a.mc,b));Gh(a);Yb(a.ca,b,e);for(f=0;f<d.length;f++)sb(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(O("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].Td=d;Bh(a,b)}},e)}function Bh(a,b){var c=Kh(a,b),d=c.path(),c=Ih(a,c);Lh(a,c,d);return d}
	function Lh(a,b,c){if(0!==b.length){for(var d=[],e=[],f=za(b,function(a){return 1===a.status}),f=Aa(f,function(a){return a.Ba}),h=0;h<b.length;h++){var k=b[h],l=S(c,k.path),m=!1,u;E(null!==l,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)m=!0,u=k.Td,e=e.concat(hh(a.K,k.Ba,!0));else if(1===k.status)if(25<=k.of)m=!0,u="maxretry",e=e.concat(hh(a.K,k.Ba,!0));else{var z=a.K.Aa(k.path,f)||J;k.cd=z;var F=b[h].update(z.H());n(F)?(te("transaction failed: Data returned ",F,
	k.path),l=M(F),"object"===typeof F&&null!=F&&ib(F,".priority")||(l=l.fa(z.C())),z=k.Ba,F=Ah(a),F=zc(l,F),k.dd=l,k.ed=F,k.Ba=a.vd++,Fa(f,z),e=e.concat(eh(a.K,k.path,F,k.Ba,k.He)),e=e.concat(hh(a.K,z,!0))):(m=!0,u="nodata",e=e.concat(hh(a.K,k.Ba,!0)))}Yb(a.ca,c,e);e=[];m&&(b[h].status=3,setTimeout(b[h].Rd,Math.floor(0)),b[h].G&&("nodata"===u?(k=new T(a,b[h].path),d.push(q(b[h].G,null,null,!1,new X(b[h].cd,k,N)))):d.push(q(b[h].G,null,Error(u),!1,null))))}Hh(a,a.mc);for(h=0;h<d.length;h++)sb(d[h]);Gh(a)}}
	function Kh(a,b){for(var c,d=a.mc;null!==(c=H(b))&&null===d.Ca();)d=$d(d,c),b=D(b);return d}function Ih(a,b){var c=[];Mh(a,b,c);c.sort(function(a,b){return a.ef-b.ef});return c}function Mh(a,b,c){var d=b.Ca();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.O(function(b){Mh(a,b,c)})}function Hh(a,b){var c=b.Ca();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;ae(b,0<c.length?c:null)}b.O(function(b){Hh(a,b)})}
	function Eh(a,b){var c=Kh(a,b).path(),d=$d(a.mc,b);de(d,function(b){Nh(a,b)});Nh(a,d);ce(d,function(b){Nh(a,b)});return c}
	function Nh(a,b){var c=b.Ca();if(null!==c){for(var d=[],e=[],f=-1,h=0;h<c.length;h++)4!==c[h].status&&(2===c[h].status?(E(f===h-1,"All SENT items should be at beginning of queue."),f=h,c[h].status=4,c[h].Td="set"):(E(1===c[h].status,"Unexpected transaction status in abort"),c[h].Rd(),e=e.concat(hh(a.K,c[h].Ba,!0)),c[h].G&&d.push(q(c[h].G,null,Error("set"),!1,null))));-1===f?ae(b,null):c.length=f+1;Yb(a.ca,b.path(),e);for(h=0;h<d.length;h++)sb(d[h])}};function Xd(){this.lb={};this.wf=!1}Xd.prototype.ab=function(){for(var a in this.lb)this.lb[a].ab()};Xd.prototype.kc=function(){for(var a in this.lb)this.lb[a].kc()};Xd.prototype.ce=function(a){this.wf=a};ca(Xd);Xd.prototype.interrupt=Xd.prototype.ab;Xd.prototype.resume=Xd.prototype.kc;var Z={};Z.nc=wf;Z.DataConnection=Z.nc;wf.prototype.ng=function(a,b){this.ua("q",{p:a},b)};Z.nc.prototype.simpleListen=Z.nc.prototype.ng;wf.prototype.Hf=function(a,b){this.ua("echo",{d:a},b)};Z.nc.prototype.echo=Z.nc.prototype.Hf;wf.prototype.interrupt=wf.prototype.ab;Z.zf=kf;Z.RealTimeConnection=Z.zf;kf.prototype.sendRequest=kf.prototype.ua;kf.prototype.close=kf.prototype.close;
	Z.Rf=function(a){var b=wf.prototype.put;wf.prototype.put=function(c,d,e,f){n(f)&&(f=a());b.call(this,c,d,e,f)};return function(){wf.prototype.put=b}};Z.hijackHash=Z.Rf;Z.yf=Hb;Z.ConnectionTarget=Z.yf;Z.ja=function(a){return a.ja()};Z.queryIdentifier=Z.ja;Z.Uf=function(a){return a.u.Ra.$};Z.listens=Z.Uf;Z.ce=function(a){Xd.Vb().ce(a)};Z.forceRestClient=Z.ce;Z.Context=Xd;function T(a,b){if(!(a instanceof Sd))throw Error("new Firebase() no longer supported - use app.database().");Y.call(this,a,b,mg,!1);this.then=void 0;this["catch"]=void 0}la(T,Y);g=T.prototype;g.getKey=function(){x("Firebase.key",0,0,arguments.length);return this.path.e()?null:Bd(this.path)};
	g.n=function(a){x("Firebase.child",1,1,arguments.length);if(ga(a))a=String(a);else if(!(a instanceof L))if(null===H(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));ze("Firebase.child",b)}else ze("Firebase.child",a);return new T(this.u,this.path.n(a))};g.getParent=function(){x("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new T(this.u,a)};
	g.Of=function(){x("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.getParent();)a=a.getParent();return a};g.Gf=function(){return this.u.Ya};g.set=function(a,b){x("Firebase.set",1,2,arguments.length);Ae("Firebase.set",this.path);se("Firebase.set",a,this.path,!1);A("Firebase.set",2,b,!0);var c=new db;this.u.Jb(this.path,a,null,eb(c,b));return c.ra};
	g.update=function(a,b){x("Firebase.update",1,2,arguments.length);Ae("Firebase.update",this.path);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;O("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}ve("Firebase.update",a,this.path);A("Firebase.update",2,b,!0);c=new db;this.u.update(this.path,a,eb(c,b));return c.ra};
	g.Jb=function(a,b,c){x("Firebase.setWithPriority",2,3,arguments.length);Ae("Firebase.setWithPriority",this.path);se("Firebase.setWithPriority",a,this.path,!1);we("Firebase.setWithPriority",2,b);A("Firebase.setWithPriority",3,c,!0);if(".length"===this.getKey()||".keys"===this.getKey())throw"Firebase.setWithPriority failed: "+this.getKey()+" is a read-only object.";var d=new db;this.u.Jb(this.path,a,b,eb(d,c));return d.ra};
	g.remove=function(a){x("Firebase.remove",0,1,arguments.length);Ae("Firebase.remove",this.path);A("Firebase.remove",1,a,!0);return this.set(null,a)};
	g.transaction=function(a,b,c){x("Firebase.transaction",1,3,arguments.length);Ae("Firebase.transaction",this.path);A("Firebase.transaction",1,a,!1);A("Firebase.transaction",2,b,!0);if(n(c)&&"boolean"!=typeof c)throw Error(y("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.getKey()||".keys"===this.getKey())throw"Firebase.transaction failed: "+this.getKey()+" is a read-only object.";"undefined"===typeof c&&(c=!0);var d=new db;ha(b)&&fb(d.ra);Fh(this.u,this.path,a,function(a,c,h){a?
	d.reject(a):d.resolve(new ub(c,h));ha(b)&&b(a,c,h)},c);return d.ra};g.kg=function(a,b){x("Firebase.setPriority",1,2,arguments.length);Ae("Firebase.setPriority",this.path);we("Firebase.setPriority",1,a);A("Firebase.setPriority",2,b,!0);var c=new db;this.u.Jb(this.path.n(".priority"),a,null,eb(c,b));return c.ra};
	g.push=function(a,b){x("Firebase.push",0,2,arguments.length);Ae("Firebase.push",this.path);se("Firebase.push",a,this.path,!0);A("Firebase.push",2,b,!0);var c=zh(this.u),d=Ie(c),c=this.n(d),e;if(null!=a){var f=this;e=c.set(a,b).then(function(){return f.n(d)})}else e=cb.resolve(c);c.then=q(e.then,e);c["catch"]=q(e.then,e,void 0);ha(b)&&fb(e);return c};g.ib=function(){Ae("Firebase.onDisconnect",this.path);return new U(this.u,this.path)};T.prototype.child=T.prototype.n;T.prototype.set=T.prototype.set;
	T.prototype.update=T.prototype.update;T.prototype.setWithPriority=T.prototype.Jb;T.prototype.remove=T.prototype.remove;T.prototype.transaction=T.prototype.transaction;T.prototype.setPriority=T.prototype.kg;T.prototype.push=T.prototype.push;T.prototype.onDisconnect=T.prototype.ib;Wc(T.prototype,"database",T.prototype.Gf);Wc(T.prototype,"key",T.prototype.getKey);Wc(T.prototype,"parent",T.prototype.getParent);Wc(T.prototype,"root",T.prototype.Of);if("undefined"===typeof firebase)throw Error("Cannot install Firebase Database - be sure to load firebase-app.js first.");
	try{firebase.INTERNAL.registerService("database",function(a){var b=Xd.Vb(),c=a.options.databaseURL;n(c)||Kc("Can't determine Firebase Database URL.  Be sure to include databaseURL option when calling firebase.intializeApp().");var d=Lc(c),c=d.jc;Wd("Invalid Firebase Database URL",d);d.path.e()||Kc("Database URL must point to the root of a Firebase Database (not including a child path).");(d=B(b.lb,a.name))&&Kc("FIREBASE INTERNAL ERROR: Database initialized multiple times.");d=new Sd(c,b.wf,a);b.lb[a.name]=
	d;return d.Ya},{Reference:T,Query:Y,Database:Rd,enableLogging:Hc,INTERNAL:W,TEST_ACCESS:Z,ServerValue:Ud})}catch(Oh){Kc("Failed to register the Firebase Database Service ("+Oh+")")};})();

	}).call(typeof global !== undefined ? global : typeof self !== undefined ? self : typeof window !== undefined ? window : {});
	module.exports = firebase.database;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *  Firebase libraries for browser - npm package.
	 *
	 * Usage:
	 *
	 *   firebase = require('firebase');
	 */
	var firebase = __webpack_require__(15);
	__webpack_require__(112);
	__webpack_require__(113);
	__webpack_require__(116);
	__webpack_require__(115);
	module.exports = firebase;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var firebase = __webpack_require__(15);
	(function(){
	/*! @license Firebase v3.7.1
	    Build: 3.7.1-rc.1
	    Terms: https://firebase.google.com/terms/ */
	(function(){var f=function(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c;for(var d in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]},g=this,h=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=
	typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},k=function(a,b){function c(){}c.prototype=b.prototype;a.B=b.prototype;a.prototype=new c;a.u=function(a,c,n){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];
	return b.prototype[c].apply(a,d)}};var m={},p=(m["only-available-in-window"]="This method is available in a Window context.",m["only-available-in-sw"]="This method is available in a service worker context.",m["should-be-overriden"]="This method should be overriden by extended classes.",m["bad-sender-id"]="Please ensure that 'messagingSenderId' is set correctly in the options passed into firebase.initializeApp().",m["permission-default"]="The required permissions were not granted and dismissed instead.",m["permission-blocked"]="The required permissions were not granted and blocked instead.",
	m["unsupported-browser"]="This browser doesn't support the API's required to use the firebase SDK.",m["notifications-blocked"]="Notifications have been blocked.",m["failed-serviceworker-registration"]="We are unable to register the default service worker. {$browserErrorMessage}",m["sw-registration-expected"]="A service worker registration was the expected input.",m["get-subscription-failed"]="There was an error when trying to get any existing Push Subscriptions.",m["invalid-saved-token"]="Unable to access details of the saved token.",
	m["sw-reg-redundant"]="The service worker being used for push was made redundant.",m["token-subscribe-failed"]="A problem occured while subscribing the user to FCM: {$message}",m["token-subscribe-no-token"]="FCM returned no token when subscribing the user to push.",m["token-subscribe-no-push-set"]="FCM returned an invalid response when getting an FCM token.",m["use-sw-before-get-token"]="You must call useServiceWorker() before calling getToken() to ensure your service worker is used.",m["invalid-delete-token"]=
	"You must pass a valid token into deleteToken(), i.e. the token from getToken().",m["delete-token-not-found"]="The deletion attempt for token could not be performed as the token was not found.",m["bg-handler-function-expected"]="The input to setBackgroundMessageHandler() must be a function.",m["no-window-client-to-msg"]="An attempt was made to message a non-existant window client.",m["unable-to-resubscribe"]="There was an error while re-subscribing the FCM token for push messaging. Will have to resubscribe the user on next visit. {$message}",
	m["no-fcm-token-for-resubscribe"]="Could not find an FCM token and as a result, unable to resubscribe. Will have to resubscribe the user on next visit.",m["failed-to-delete-token"]="Unable to delete the currently saved token.",m["no-sw-in-reg"]="Even though the service worker registration was successful, there was a problem accessing the service worker itself.",m["incorrect-gcm-sender-id"]="Please change your web app manifest's 'gcm_sender_id' value to '103953800507' to use Firebase messaging.",m);var q={userVisibleOnly:!0,applicationServerKey:new Uint8Array([4,51,148,247,223,161,235,177,220,3,162,94,21,113,219,72,211,46,237,237,178,52,219,183,71,58,12,143,196,204,225,111,60,140,132,223,171,182,102,62,242,12,212,139,254,227,249,118,47,20,28,99,8,106,111,45,177,26,149,176,206,55,192,156,110])};var r=function(a,b){var c={};return c["firebase-messaging-msg-type"]=a,c["firebase-messaging-msg-data"]=b,c};var u=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,u);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};k(u,Error);var v=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")};var w=function(a,b){b.unshift(a);u.call(this,v.apply(null,b));b.shift()};k(w,u);var x=function(a,b,c){if(!a){var d="Assertion failed";if(b)var d=d+(": "+b),e=Array.prototype.slice.call(arguments,2);throw new w(""+d,e||[]);}};var y=null;var A=function(a){a=new Uint8Array(a);var b=h(a);x("array"==b||"object"==b&&"number"==typeof a.length,"encodeByteArray takes an array as a parameter");if(!y)for(y={},b=0;65>b;b++)y[b]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b);for(var b=y,c=[],d=0;d<a.length;d+=3){var e=a[d],n=d+1<a.length,l=n?a[d+1]:0,z=d+2<a.length,t=z?a[d+2]:0,M=e>>2,e=(e&3)<<4|l>>4,l=(l&15)<<2|t>>6,t=t&63;z||(t=64,n||(l=64));c.push(b[M],b[e],b[l],b[t])}return c.join("").replace(/\+/g,"-").replace(/\//g,
	"_").replace(/=+$/,"")};var B=new firebase.INTERNAL.ErrorFactory("messaging","Messaging",p),C=function(){this.a=null},D=function(a){if(a.a)return a.a;a.a=new Promise(function(a,c){var b=g.indexedDB.open("fcm_token_details_db",1);b.onerror=function(a){c(a.target.error)};b.onsuccess=function(b){a(b.target.result)};b.onupgradeneeded=function(a){a=a.target.result.createObjectStore("fcm_token_object_Store",{keyPath:"swScope"});a.createIndex("fcmSenderId","fcmSenderId",{unique:!1});a.createIndex("fcmToken","fcmToken",{unique:!0})}});
	return a.a},E=function(a){a.a?a.a.then(function(b){b.close();a.a=null}):Promise.resolve()},F=function(a,b){return D(a).then(function(a){return new Promise(function(c,e){var d=a.transaction(["fcm_token_object_Store"]).objectStore("fcm_token_object_Store").index("fcmToken").get(b);d.onerror=function(a){e(a.target.error)};d.onsuccess=function(a){c(a.target.result)}})})},G=function(a,b){return D(a).then(function(a){return new Promise(function(c,e){var d=[],l=a.transaction(["fcm_token_object_Store"]).objectStore("fcm_token_object_Store").openCursor();
	l.onerror=function(a){e(a.target.error)};l.onsuccess=function(a){(a=a.target.result)?(a.value.fcmSenderId===b&&d.push(a.value),a.continue()):c(d)}})})},H=function(a,b,c){var d=A(b.getKey("p256dh")),e=A(b.getKey("auth"));a="authorized_entity="+a+"&"+("endpoint="+b.endpoint+"&")+("encryption_key="+d+"&")+("encryption_auth="+e);c&&(a+="&pushSet="+c);c=new Headers;c.append("Content-Type","application/x-www-form-urlencoded");return fetch("https://fcm.googleapis.com/fcm/connect/subscribe",{method:"POST",
	headers:c,body:a}).then(function(a){return a.json()}).then(function(a){if(a.error)throw B.create("token-subscribe-failed",{message:a.error.message});if(!a.token)throw B.create("token-subscribe-no-token");if(!a.pushSet)throw B.create("token-subscribe-no-push-set");return{token:a.token,pushSet:a.pushSet}})},I=function(a,b,c,d,e,n){var l={swScope:c.scope,endpoint:d.endpoint,auth:A(d.getKey("auth")),p256dh:A(d.getKey("p256dh")),fcmToken:e,fcmPushSet:n,fcmSenderId:b};return D(a).then(function(a){return new Promise(function(b,
	c){var d=a.transaction(["fcm_token_object_Store"],"readwrite").objectStore("fcm_token_object_Store").put(l);d.onerror=function(a){c(a.target.error)};d.onsuccess=function(){b()}})})};
	C.prototype.i=function(a,b){return b instanceof ServiceWorkerRegistration?"string"!==typeof a||0===a.length?Promise.reject(B.create("bad-sender-id")):G(this,a).then(function(c){if(0!==c.length){var d=c.findIndex(function(c){return b.scope===c.swScope&&a===c.fcmSenderId});if(-1!==d)return c[d]}}).then(function(a){if(a)return b.pushManager.getSubscription().catch(function(){throw B.create("get-subscription-failed");}).then(function(b){var c;if(c=b)c=b.endpoint===a.endpoint&&A(b.getKey("auth"))===a.auth&&
	A(b.getKey("p256dh"))===a.p256dh;if(c)return a.fcmToken})}):Promise.reject(B.create("sw-registration-expected"))};C.prototype.getSavedToken=C.prototype.i;
	C.prototype.h=function(a,b){var c=this;return"string"!==typeof a||0===a.length?Promise.reject(B.create("bad-sender-id")):b instanceof ServiceWorkerRegistration?b.pushManager.getSubscription().then(function(a){return a?a:b.pushManager.subscribe(q)}).then(function(d){return H(a,d).then(function(e){return I(c,a,b,d,e.token,e.pushSet).then(function(){return e.token})})}):Promise.reject(B.create("sw-registration-expected"))};C.prototype.createToken=C.prototype.h;
	C.prototype.deleteToken=function(a){var b=this;return"string"!==typeof a||0===a.length?Promise.reject(B.create("invalid-delete-token")):F(this,a).then(function(a){if(!a)throw B.create("delete-token-not-found");return D(b).then(function(b){return new Promise(function(c,d){var e=b.transaction(["fcm_token_object_Store"],"readwrite").objectStore("fcm_token_object_Store").delete(a.swScope);e.onerror=function(a){d(a.target.error)};e.onsuccess=function(b){0===b.target.result?d(B.create("failed-to-delete-token")):
	c(a)}})})})};var J=function(a){var b=this;this.a=new firebase.INTERNAL.ErrorFactory("messaging","Messaging",p);if(!a.options.messagingSenderId||"string"!==typeof a.options.messagingSenderId)throw this.a.create("bad-sender-id");this.l=a.options.messagingSenderId;this.c=new C;this.app=a;this.INTERNAL={};this.INTERNAL.delete=function(){return b.delete}};
	J.prototype.getToken=function(){var a=this,b=Notification.permission;return"granted"!==b?"denied"===b?Promise.reject(this.a.create("notifications-blocked")):Promise.resolve(null):this.f().then(function(b){return a.c.i(a.l,b).then(function(c){return c?c:a.c.h(a.l,b)})})};J.prototype.getToken=J.prototype.getToken;J.prototype.deleteToken=function(a){var b=this;return this.c.deleteToken(a).then(function(){return b.f()}).then(function(a){return a?a.pushManager.getSubscription():null}).then(function(a){if(a)return a.unsubscribe()})};
	J.prototype.deleteToken=J.prototype.deleteToken;J.prototype.f=function(){throw this.a.create("should-be-overriden");};J.prototype.requestPermission=function(){throw this.a.create("only-available-in-window");};J.prototype.useServiceWorker=function(){throw this.a.create("only-available-in-window");};J.prototype.useServiceWorker=J.prototype.useServiceWorker;J.prototype.onMessage=function(){throw this.a.create("only-available-in-window");};J.prototype.onMessage=J.prototype.onMessage;
	J.prototype.onTokenRefresh=function(){throw this.a.create("only-available-in-window");};J.prototype.onTokenRefresh=J.prototype.onTokenRefresh;J.prototype.setBackgroundMessageHandler=function(){throw this.a.create("only-available-in-sw");};J.prototype.setBackgroundMessageHandler=J.prototype.setBackgroundMessageHandler;J.prototype.delete=function(){E(this.c)};var K=self,P=function(a){J.call(this,a);var b=this;this.a=new firebase.INTERNAL.ErrorFactory("messaging","Messaging",p);K.addEventListener("push",function(a){return L(b,a)},!1);K.addEventListener("pushsubscriptionchange",function(a){return N(b,a)},!1);K.addEventListener("notificationclick",function(a){return O(b,a)},!1);this.b=null};f(P,J);
	var L=function(a,b){var c;try{c=b.data.json()}catch(e){return}var d=Q().then(function(b){if(b){if(c.notification||a.b)return R(a,c)}else{if((b=c)&&"object"===typeof b.notification){var d=Object.assign({},b.notification),e={};d.data=(e.FCM_MSG=b,e);b=d}else b=void 0;if(b)return K.registration.showNotification(b.title||"",b);if(a.b)return a.b(c)}});b.waitUntil(d)},N=function(a,b){var c=a.getToken().then(function(b){if(!b)throw a.a.create("no-fcm-token-for-resubscribe");var c=a.c;return F(c,b).then(function(b){if(!b)throw a.a.create("invalid-saved-token");
	return K.registration.pushManager.subscribe(q).then(function(a){return H(b.w,a,b.v)}).catch(function(d){return c.deleteToken(b.A).then(function(){throw a.a.create("unable-to-resubscribe",{message:d});})})})});b.waitUntil(c)},O=function(a,b){if(b.notification&&b.notification.data&&b.notification.data.FCM_MSG){b.stopImmediatePropagation();b.notification.close();var c=b.notification.data.FCM_MSG,d=c.notification.click_action;if(d){var e=S(d).then(function(a){return a?a:K.clients.openWindow(d)}).then(function(b){if(b)return delete c.notification,
	T(a,b,r("notification-clicked",c))});b.waitUntil(e)}}};P.prototype.setBackgroundMessageHandler=function(a){if(a&&"function"!==typeof a)throw this.a.create("bg-handler-function-expected");this.b=a};P.prototype.setBackgroundMessageHandler=P.prototype.setBackgroundMessageHandler;
	var S=function(a){var b=(new URL(a)).href;return K.clients.matchAll({type:"window",includeUncontrolled:!0}).then(function(a){for(var c=null,e=0;e<a.length;e++)if((new URL(a[e].url)).href===b){c=a[e];break}if(c)return c.focus(),c})},T=function(a,b,c){return new Promise(function(d,e){if(!b)return e(a.a.create("no-window-client-to-msg"));b.postMessage(c);d()})},Q=function(){return K.clients.matchAll({type:"window",includeUncontrolled:!0}).then(function(a){return a.some(function(a){return"visible"===
	a.visibilityState})})},R=function(a,b){return K.clients.matchAll({type:"window",includeUncontrolled:!0}).then(function(c){var d=r("push-msg-received",b);return Promise.all(c.map(function(b){return T(a,b,d)}))})};P.prototype.f=function(){return Promise.resolve(K.registration)};var V=function(a){J.call(this,a);var b=this;this.j=null;this.m=firebase.INTERNAL.createSubscribe(function(a){b.j=a});this.s=null;this.o=firebase.INTERNAL.createSubscribe(function(a){b.s=a});U(this)};f(V,J);
	V.prototype.getToken=function(){var a=this;return"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")?W(this).then(function(){return J.prototype.getToken.call(a)}):Promise.reject(this.a.create("unsupported-browser"))};V.prototype.getToken=V.prototype.getToken;
	var W=function(a){if(a.g)return a.g;var b=document.querySelector('link[rel="manifest"]');b?a.g=fetch(b.href).then(function(a){return a.json()}).catch(function(){return Promise.resolve()}).then(function(b){if(b&&b.gcm_sender_id&&"103953800507"!==b.gcm_sender_id)throw a.a.create("incorrect-gcm-sender-id");}):a.g=Promise.resolve();return a.g};
	V.prototype.requestPermission=function(){var a=this;return"granted"===Notification.permission?Promise.resolve():new Promise(function(b,c){var d=function(d){return"granted"===d?b():"denied"===d?c(a.a.create("permission-blocked")):c(a.a.create("permission-default"))},e=Notification.requestPermission(function(a){e||d(a)});e&&e.then(d)})};V.prototype.requestPermission=V.prototype.requestPermission;
	V.prototype.useServiceWorker=function(a){if(!(a instanceof ServiceWorkerRegistration))throw this.a.create("sw-registration-expected");if("undefined"!==typeof this.b)throw this.a.create("use-sw-before-get-token");this.b=a};V.prototype.useServiceWorker=V.prototype.useServiceWorker;V.prototype.onMessage=function(a,b,c){return this.m(a,b,c)};V.prototype.onMessage=V.prototype.onMessage;V.prototype.onTokenRefresh=function(a,b,c){return this.o(a,b,c)};V.prototype.onTokenRefresh=V.prototype.onTokenRefresh;
	var X=function(a,b){var c=b.installing||b.waiting||b.active;return new Promise(function(d,e){if(c)if("activated"===c.state)d(b);else if("redundant"===c.state)e(a.a.create("sw-reg-redundant"));else{var n=function(){if("activated"===c.state)d(b);else if("redundant"===c.state)e(a.a.create("sw-reg-redundant"));else return;c.removeEventListener("statechange",n)};c.addEventListener("statechange",n)}else e(a.a.create("no-sw-in-reg"))})};
	V.prototype.f=function(){var a=this;if(this.b)return X(this,this.b);this.b=null;return navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}).catch(function(b){throw a.a.create("failed-serviceworker-registration",{browserErrorMessage:b.message});}).then(function(b){return X(a,b).then(function(){a.b=b;b.update();return b})})};
	var U=function(a){"serviceWorker"in navigator&&navigator.serviceWorker.addEventListener("message",function(b){if(b.data&&b.data["firebase-messaging-msg-type"])switch(b=b.data,b["firebase-messaging-msg-type"]){case "push-msg-received":case "notification-clicked":a.j.next(b["firebase-messaging-msg-data"])}},!1)};if(!(firebase&&firebase.INTERNAL&&firebase.INTERNAL.registerService))throw Error("Cannot install Firebase Messaging - be sure to load firebase-app.js first.");firebase.INTERNAL.registerService("messaging",function(a){return self&&"ServiceWorkerGlobalScope"in self?new P(a):new V(a)},{Messaging:V});}).call(this);
	}).call(typeof global !== undefined ? global : typeof self !== undefined ? self : typeof window !== undefined ? window : {});
	module.exports = firebase.messaging;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var firebase = __webpack_require__(15);
	(function(){
	/*! @license Firebase v3.7.1
	    Build: 3.7.1-rc.1
	    Terms: https://firebase.google.com/terms/ */
	(function(){for(var k,aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},l="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,m=["Number","MIN_SAFE_INTEGER"],ba=0;ba<m.length-1;ba++){var ca=m[ba];ca in l||(l[ca]={});l=l[ca]}var da=m[m.length-1];
	-9007199254740991!=l[da]&&aa(l,da,{configurable:!0,writable:!0,value:-9007199254740991});
	var n=this,q=function(a){return void 0!==a},ea=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&
	!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b};var r=function(a,b){return-1!==a.indexOf(b)};var fa=function(a,b,c){function d(){z||(z=!0,b.apply(null,arguments))}function e(b){p=setTimeout(function(){p=null;a(g,2===C)},b)}function g(a,b){if(!z)if(a)d.apply(null,arguments);else if(2===C||B)d.apply(null,arguments);else{64>h&&(h*=2);var c;1===C?(C=2,c=0):c=1E3*(h+Math.random());e(c)}}function f(a){Ma||(Ma=!0,z||(null!==p?(a||(C=2),clearTimeout(p),e(0)):a||(C=1)))}var h=1,p=null,B=!1,C=0,z=!1,Ma=!1;e(0);setTimeout(function(){B=!0;f(!0)},c);return f};var t="https://firebasestorage.googleapis.com";var u=function(a,b){this.code="storage/"+a;this.message="Firebase Storage: "+b;this.serverResponse=null;this.name="FirebaseError"};(function(){var a=Error;function b(){}b.prototype=a.prototype;u.b=a.prototype;u.prototype=new b;u.a=function(b,d,e){for(var c=Array(arguments.length-2),f=2;f<arguments.length;f++)c[f-2]=arguments[f];return a.prototype[d].apply(b,c)}})();
	var ga=function(){return new u("unknown","An unknown error occurred, please check the error payload for server response.")},ha=function(){return new u("canceled","User canceled the upload/download.")},ia=function(){return new u("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.")},ja=function(a,b,c){return new u("invalid-argument","Invalid argument in `"+b+"` at index "+a+": "+c)},ka=function(){return new u("app-deleted","The Firebase app was deleted.")},v=function(a,b){return new u("invalid-format",
	"String does not match format '"+a+"': "+b)},la=function(a){throw new u("internal-error","Internal error: "+a);};var ma=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])},na=function(a){var b={};ma(a,function(a,d){b[a]=d});return b};var oa=function(a,b){b=b.split("/").filter(function(a){return 0<a.length}).join("/");return 0===a.length?b:a+"/"+b},pa=function(a){var b=a.lastIndexOf("/",a.length-2);return-1===b?a:a.slice(b+1)};var qa=function(a){if("undefined"!==typeof firebase)return new firebase.Promise(a);throw Error("Error in Firebase Storage - be sure to load firebase-app.js first.");};var w=function(a,b,c,d){this.h=a;this.b={};this.method=b;this.headers={};this.body=null;this.j=c;this.l=this.a=null;this.c=[200];this.g=[];this.timeout=d;this.f=!0};var ra={STATE_CHANGED:"state_changed"},x={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"},sa=function(a){switch(a){case "running":case "pausing":case "canceling":return"running";case "paused":return"paused";case "success":return"success";case "canceled":return"canceled";case "error":return"error";default:return"error"}};var y=function(a){return q(a)&&null!==a},ta=function(a){return"string"===typeof a||a instanceof String},ua=function(){return"undefined"!==typeof Blob};var wa=function(a,b){var c=va;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)};var xa=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},ya=function(a,b){return a<b?-1:a>b?1:0};var A=function(a){return function(){var b=[];Array.prototype.push.apply(b,arguments);firebase.Promise.resolve(!0).then(function(){a.apply(null,b)})}};var D=function(a,b){this.bucket=a;this.path=b},za=function(a){var b=encodeURIComponent;return"/b/"+b(a.bucket)+"/o/"+b(a.path)},Ba=function(a){var b;try{b=Aa(a)}catch(c){return new D(a,"")}if(""===b.path)return b;throw new u("invalid-default-bucket","Invalid default bucket '"+a+"'.");},Aa=function(a){for(var b=null,c=[{K:/^gs:\/\/([A-Za-z0-9.\-]+)(\/(.*))?$/i,G:{bucket:1,path:3},J:function(a){"/"===a.path.charAt(a.path.length-1)&&(a.path=a.path.slice(0,-1))}},{K:/^https?:\/\/firebasestorage\.googleapis\.com\/v[A-Za-z0-9_]+\/b\/([A-Za-z0-9.\-]+)\/o(\/([^?#]*).*)?$/i,
	G:{bucket:1,path:3},J:function(a){a.path=decodeURIComponent(a.path)}}],d=0;d<c.length;d++){var e=c[d],g=e.K.exec(a);if(g){b=g[e.G.bucket];(g=g[e.G.path])||(g="");b=new D(b,g);e.J(b);break}}if(null==b)throw new u("invalid-url","Invalid URL '"+a+"'.");return b};var Ca=function(a,b,c){"function"==ea(a)||y(b)||y(c)?(this.b=a,this.error=b||null,this.a=c||null):(this.b=a.next||null,this.error=a.error||null,this.a=a.complete||null)};var E={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"},Da=function(a){switch(a){case "raw":case "base64":case "base64url":case "data_url":break;default:throw"Expected one of the event types: [raw, base64, base64url, data_url].";}},Ea=function(a,b){this.data=a;this.a=b||null},Ia=function(a,b){switch(a){case "raw":return new Ea(Fa(b));case "base64":case "base64url":return new Ea(Ga(a,b));case "data_url":a=new Ha(b);var c;if(a.a)c=Ga("base64",a.c);else{try{c=decodeURIComponent(a.c)}catch(d){throw v("data_url",
	"Malformed data URL.");}c=Fa(c)}return new Ea(c,(new Ha(b)).b)}throw ga();},Fa=function(a){for(var b=[],c=0;c<a.length;c++){var d=a.charCodeAt(c);if(127>=d)b.push(d);else if(2047>=d)b.push(192|d>>6,128|d&63);else if(55296==(d&64512))if(c<a.length-1&&56320==(a.charCodeAt(c+1)&64512)){var e=a.charCodeAt(++c),d=65536|(d&1023)<<10|e&1023;b.push(240|d>>18,128|d>>12&63,128|d>>6&63,128|d&63)}else b.push(239,191,189);else 56320==(d&64512)?b.push(239,191,189):b.push(224|d>>12,128|d>>6&63,128|d&63)}return new Uint8Array(b)},
	Ga=function(a,b){switch(a){case "base64":var c=-1!==b.indexOf("-"),d=-1!==b.indexOf("_");if(c||d)throw v(a,"Invalid character '"+(c?"-":"_")+"' found: is it base64url encoded?");break;case "base64url":c=-1!==b.indexOf("+");d=-1!==b.indexOf("/");if(c||d)throw v(a,"Invalid character '"+(c?"+":"/")+"' found: is it base64 encoded?");b=b.replace(/-/g,"+").replace(/_/g,"/")}var e;try{e=atob(b)}catch(g){throw v(a,"Invalid character found");}a=new Uint8Array(e.length);for(b=0;b<e.length;b++)a[b]=e.charCodeAt(b);
	return a},Ha=function(a){var b=a.match(/^data:([^,]+)?,/);if(null===b)throw v("data_url","Must be formatted 'data:[<mediatype>][;base64],<data>");b=b[1]||null;this.a=!1;this.b=null;if(null!=b){var c=b.length-7;this.b=(this.a=0<=c&&b.indexOf(";base64",c)==c)?b.substring(0,b.length-7):b}this.c=a.substring(a.indexOf(",")+1)};var Ja=function(a){var b=encodeURIComponent,c="?";ma(a,function(a,e){a=b(a)+"="+b(e);c=c+a+"&"});return c=c.slice(0,-1)};var Ka=function(){var a=this;this.a=new XMLHttpRequest;this.c=0;this.f=qa(function(b){a.a.addEventListener("abort",function(){a.c=2;b(a)});a.a.addEventListener("error",function(){a.c=1;b(a)});a.a.addEventListener("load",function(){b(a)})});this.b=!1},La=function(a,b,c,d,e){if(a.b)throw la("cannot .send() more than once");a.b=!0;a.a.open(c,b,!0);y(e)&&ma(e,function(b,c){a.a.setRequestHeader(b,c.toString())});y(d)?a.a.send(d):a.a.send();return a.f},Na=function(a){if(!a.b)throw la("cannot .getErrorCode() before sending");
	return a.c},F=function(a){if(!a.b)throw la("cannot .getStatus() before sending");try{return a.a.status}catch(b){return-1}},Oa=function(a){if(!a.b)throw la("cannot .getResponseText() before sending");return a.a.responseText};Ka.prototype.abort=function(){this.a.abort()};var G=function(a,b,c,d,e,g){this.b=a;this.h=b;this.f=c;this.a=d;this.g=e;this.c=g};k=G.prototype;k.V=function(){return this.b};k.qa=function(){return this.h};k.na=function(){return this.f};k.ia=function(){return this.a};k.W=function(){if(y(this.a)){var a=this.a.downloadURLs;return y(a)&&y(a[0])?a[0]:null}return null};k.pa=function(){return this.g};k.la=function(){return this.c};var H;a:{var Pa=n.navigator;if(Pa){var Qa=Pa.userAgent;if(Qa){H=Qa;break a}}H=""};var Sa=function(a,b,c,d,e,g,f,h,p,B,C){this.C=a;this.A=b;this.v=c;this.o=d;this.B=e.slice();this.m=g.slice();this.j=this.l=this.c=this.b=null;this.f=this.g=!1;this.s=f;this.h=h;this.D=C;this.w=p;var z=this;this.u=qa(function(a,b){z.l=a;z.j=b;Ra(z)})},Ta=function(a,b,c){this.b=a;this.c=b;this.a=!!c},Ra=function(a){function b(a,b){b?a(!1,new Ta(!1,null,!0)):(b=new Ka,b.a.withCredentials=d.D,d.b=b,La(b,d.C,d.A,d.o,d.v).then(function(b){d.b=null;var c=0===Na(b),e=F(b);if(!(c=!c))var c=r([408,429],e),
	g=r(d.m,e),c=500<=e&&600>e||c||g;c?(b=2===Na(b),a(!1,new Ta(!1,null,b))):a(!0,new Ta(r(d.B,e),b))}))}function c(a,b){var c=d.l;a=d.j;var e=b.c;if(b.b)try{var g=d.s(e,Oa(e));q(g)?c(g):c()}catch(B){a(B)}else null!==e?(b=ga(),g=Oa(e),b.serverResponse=g,d.h?a(d.h(e,b)):a(b)):(b=b.a?d.f?ka():ha():new u("retry-limit-exceeded","Max retry time for operation exceeded, please try again."),a(b))}var d=a;a.g?c(0,new Ta(!1,null,!0)):a.c=fa(b,c,a.w)};Sa.prototype.a=function(){return this.u};
	Sa.prototype.cancel=function(a){this.g=!0;this.f=a||!1;null!==this.c&&(0,this.c)(!1);null!==this.b&&this.b.abort()};var Ua=function(a,b,c){var d=Ja(a.b),d=a.h+d,e=a.headers?na(a.headers):{};null!==b&&0<b.length&&(e.Authorization="Firebase "+b);e["X-Firebase-Storage-Version"]="webjs/"+("undefined"!==typeof firebase?firebase.SDK_VERSION:"AppManager");return new Sa(d,a.method,e,a.body,a.c,a.g,a.j,a.a,a.timeout,0,c)};var Va=function(){};var Wa=function(a){this.b=firebase.Promise.reject(a)};Wa.prototype.a=function(){return this.b};Wa.prototype.cancel=function(){};var Xa=function(){this.a={};this.b=Number.MIN_SAFE_INTEGER},Ya=function(a,b){function c(){delete e.a[d]}var d=a.b;a.b++;a.a[d]=b;var e=a;b.a().then(c,c)},Za=function(a){ma(a.a,function(a,c){c&&c.cancel(!0)});a.a={}};var $a=function(a,b,c,d,e){this.a=a;this.g=null;null!==this.a&&(a=this.a.options,y(a)&&(a=a.storageBucket||null,this.g=null==a?null:Ba(a).bucket));this.o=b;this.m=c;this.j=e;this.l=d;this.c=12E4;this.b=6E4;this.h=new Xa;this.f=!1},ab=function(a){return null!==a.a&&y(a.a.INTERNAL)&&y(a.a.INTERNAL.getToken)?a.a.INTERNAL.getToken().then(function(a){return y(a)?a.accessToken:null},function(){return null}):firebase.Promise.resolve(null)};$a.prototype.bucket=function(){if(this.f)throw ka();return this.g};
	var I=function(a,b,c){if(a.f)return new Wa(ka());b=a.m(b,c,null===a.a,a.j);Ya(a.h,b);return b};var bb=-1!=H.indexOf("Opera"),cb=-1!=H.indexOf("Trident")||-1!=H.indexOf("MSIE"),db=-1!=H.indexOf("Edge"),eb=-1!=H.indexOf("Gecko")&&!(-1!=H.toLowerCase().indexOf("webkit")&&-1==H.indexOf("Edge"))&&!(-1!=H.indexOf("Trident")||-1!=H.indexOf("MSIE"))&&-1==H.indexOf("Edge"),fb=-1!=H.toLowerCase().indexOf("webkit")&&-1==H.indexOf("Edge"),gb;
	a:{var hb="",ib=function(){var a=H;if(eb)return/rv\:([^\);]+)(\)|;)/.exec(a);if(db)return/Edge\/([\d\.]+)/.exec(a);if(cb)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(fb)return/WebKit\/(\S+)/.exec(a);if(bb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();ib&&(hb=ib?ib[1]:"");if(cb){var jb,kb=n.document;jb=kb?kb.documentMode:void 0;if(null!=jb&&jb>parseFloat(hb)){gb=String(jb);break a}}gb=hb}
	var lb=gb,va={},mb=function(a){return wa(a,function(){for(var b=0,c=xa(String(lb)).split("."),d=xa(String(a)).split("."),e=Math.max(c.length,d.length),g=0;0==b&&g<e;g++){var f=c[g]||"",h=d[g]||"";do{f=/(\d*)(\D*)(.*)/.exec(f)||["","","",""];h=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];if(0==f[0].length&&0==h[0].length)break;b=ya(0==f[1].length?0:parseInt(f[1],10),0==h[1].length?0:parseInt(h[1],10))||ya(0==f[2].length,0==h[2].length)||ya(f[2],h[2]);f=f[3];h=h[3]}while(0==b)}return 0<=b})};var nb=function(a){var b=n.BlobBuilder||n.WebKitBlobBuilder;if(q(b)){for(var b=new b,c=0;c<arguments.length;c++)b.append(arguments[c]);return b.getBlob()}b=Array.prototype.slice.call(arguments);c=n.BlobBuilder||n.WebKitBlobBuilder;if(q(c)){for(var c=new c,d=0;d<b.length;d++)c.append(b[d],void 0);b=c.getBlob(void 0)}else if(q(n.Blob))b=new Blob(b,{});else throw Error("This browser doesn't seem to support creating Blobs");return b},ob=function(a,b,c){q(c)||(c=a.size);return a.webkitSlice?a.webkitSlice(b,
	c):a.mozSlice?a.mozSlice(b,c):a.slice?eb&&!mb("13.0")||fb&&!mb("537.1")?(0>b&&(b+=a.size),0>b&&(b=0),0>c&&(c+=a.size),c<b&&(c=b),a.slice(b,c-b)):a.slice(b,c):null};var pb=function(a,b){return b},J=function(a,b,c,d){this.c=a;this.b=b||a;this.writable=!!c;this.a=d||pb},qb=null,rb=function(){if(qb)return qb;var a=[];a.push(new J("bucket"));a.push(new J("generation"));a.push(new J("metageneration"));a.push(new J("name","fullPath",!0));var b=new J("name");b.a=function(a,b){return!ta(b)||2>b.length?b:pa(b)};a.push(b);b=new J("size");b.a=function(a,b){return y(b)?+b:b};a.push(b);a.push(new J("timeCreated"));a.push(new J("updated"));a.push(new J("md5Hash",null,!0));
	a.push(new J("cacheControl",null,!0));a.push(new J("contentDisposition",null,!0));a.push(new J("contentEncoding",null,!0));a.push(new J("contentLanguage",null,!0));a.push(new J("contentType",null,!0));a.push(new J("metadata","customMetadata",!0));a.push(new J("downloadTokens","downloadURLs",!1,function(a,b){if(!(ta(b)&&0<b.length))return[];var c=encodeURIComponent;return b.split(",").map(function(b){var d=a.fullPath,d="https://firebasestorage.googleapis.com/v0"+("/b/"+c(a.bucket)+"/o/"+c(d));b=Ja({alt:"media",
	token:b});return d+b})}));return qb=a},sb=function(a,b){Object.defineProperty(a,"ref",{get:function(){return b.o(b,new D(a.bucket,a.fullPath))}})},tb=function(a,b){for(var c={},d=b.length,e=0;e<d;e++){var g=b[e];g.writable&&(c[g.c]=a[g.b])}return JSON.stringify(c)},ub=function(a){if(!a||"object"!==typeof a)throw"Expected Metadata object.";for(var b in a){var c=a[b];if("customMetadata"===b){if("object"!==typeof c)throw"Expected object for 'customMetadata' mapping.";}else if(null!=c&&"object"===typeof c)throw"Mapping for '"+
	b+"' cannot be an object.";}};var K=function(a,b,c){for(var d=b.length,e=b.length,g=0;g<b.length;g++)if(b[g].b){d=g;break}if(!(d<=c.length&&c.length<=e))throw d===e?(b=d,d=1===d?"argument":"arguments"):(b="between "+d+" and "+e,d="arguments"),new u("invalid-argument-count","Invalid argument count in `"+a+"`: Expected "+b+" "+d+", received "+c.length+".");for(g=0;g<c.length;g++)try{b[g].a(c[g])}catch(f){if(f instanceof Error)throw ja(g,a,f.message);throw ja(g,a,f);}},L=function(a,b){var c=this;this.a=function(b){c.b&&!q(b)||a(b)};
	this.b=!!b},vb=function(a,b){return function(c){a(c);b(c)}},M=function(a,b){function c(a){if(!("string"===typeof a||a instanceof String))throw"Expected string.";}var d;a?d=vb(c,a):d=c;return new L(d,b)},wb=function(){return new L(function(a){if(!(a instanceof Uint8Array||a instanceof ArrayBuffer||ua()&&a instanceof Blob))throw"Expected Blob or File.";})},xb=function(){return new L(function(a){if(!(("number"===typeof a||a instanceof Number)&&0<=a))throw"Expected a number 0 or greater.";})},yb=function(a,
	b){return new L(function(b){if(!(null===b||y(b)&&b instanceof Object))throw"Expected an Object.";y(a)&&a(b)},b)},N=function(){return new L(function(a){if(null!==a&&"function"!=ea(a))throw"Expected a Function.";},!0)};var O=function(a,b){ua()&&a instanceof Blob?(this.i=a,b=a.size,a=a.type):(a instanceof ArrayBuffer?(b?this.i=new Uint8Array(a):(this.i=new Uint8Array(a.byteLength),this.i.set(new Uint8Array(a))),b=this.i.length):(b?this.i=a:(this.i=new Uint8Array(a.length),this.i.set(a)),b=a.length),a="");this.a=b;this.b=a};O.prototype.type=function(){return this.b};
	O.prototype.slice=function(a,b){if(ua()&&this.i instanceof Blob)return a=ob(this.i,a,b),null===a?null:new O(a);a=new Uint8Array(this.i.buffer,a,b-a);return new O(a,!0)};
	var zb=function(a){var b=[];Array.prototype.push.apply(b,arguments);if(ua())return b=b.map(function(a){return a instanceof O?a.i:a}),new O(nb.apply(null,b));var b=b.map(function(a){return ta(a)?Ia("raw",a).data.buffer:a.i.buffer}),c=0;b.forEach(function(a){c+=a.byteLength});var d=new Uint8Array(c),e=0;b.forEach(function(a){a=new Uint8Array(a);for(var b=0;b<a.length;b++)d[e++]=a[b]});return new O(d,!0)};var P=function(a){if(!a)throw ga();},Ab=function(a,b){return function(c,d){var e;a:{try{e=JSON.parse(d)}catch(h){e=null;break a}c=typeof e;e="object"==c&&null!=e||"function"==c?e:null}if(null===e)e=null;else{c={type:"file"};d=b.length;for(var g=0;g<d;g++){var f=b[g];c[f.b]=f.a(c,e[f.c])}sb(c,a);e=c}P(null!==e);return e}},Q=function(a){return function(b,c){b=401===F(b)?new u("unauthenticated","User is not authenticated, please authenticate using Firebase Authentication and try again."):402===F(b)?
	new u("quota-exceeded","Quota for bucket '"+a.bucket+"' exceeded, please view quota on https://firebase.google.com/pricing/."):403===F(b)?new u("unauthorized","User does not have permission to access '"+a.path+"'."):c;b.serverResponse=c.serverResponse;return b}},Bb=function(a){var b=Q(a);return function(c,d){var e=b(c,d);404===F(c)&&(e=new u("object-not-found","Object '"+a.path+"' does not exist."));e.serverResponse=d.serverResponse;return e}},Cb=function(a,b,c){var d=za(b);a=new w(t+"/v0"+d,"GET",
	Ab(a,c),a.c);a.a=Bb(b);return a},Db=function(a,b){var c=za(b);a=new w(t+"/v0"+c,"DELETE",function(){},a.c);a.c=[200,204];a.a=Bb(b);return a},Eb=function(a,b,c){c=c?na(c):{};c.fullPath=a.path;c.size=b.a;c.contentType||(a=b&&b.type()||"application/octet-stream",c.contentType=a);return c},Fb=function(a,b,c,d,e){var g="/b/"+encodeURIComponent(b.bucket)+"/o",f={"X-Goog-Upload-Protocol":"multipart"},h;h="";for(var p=0;2>p;p++)h+=Math.random().toString().slice(2);f["Content-Type"]="multipart/related; boundary="+
	h;e=Eb(b,d,e);p=tb(e,c);d=zb("--"+h+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+p+"\r\n--"+h+"\r\nContent-Type: "+e.contentType+"\r\n\r\n",d,"\r\n--"+h+"--");if(null===d)throw ia();a=new w(t+"/v0"+g,"POST",Ab(a,c),a.b);a.b={name:e.fullPath};a.headers=f;a.body=d.i;a.a=Q(b);return a},Gb=function(a,b,c,d){this.a=a;this.total=b;this.b=!!c;this.c=d||null},Hb=function(a,b){var c;try{c=a.a.getResponseHeader("X-Goog-Upload-Status")}catch(d){P(!1)}P(r(b||["active"],c));return c},Ib=function(a,
	b,c,d,e){var g="/b/"+encodeURIComponent(b.bucket)+"/o",f=Eb(b,d,e);e={name:f.fullPath};g=t+"/v0"+g;d={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":d.a,"X-Goog-Upload-Header-Content-Type":f.contentType,"Content-Type":"application/json; charset=utf-8"};c=tb(f,c);a=new w(g,"POST",function(a){Hb(a);var b;try{b=a.a.getResponseHeader("X-Goog-Upload-URL")}catch(B){P(!1)}P(ta(b));return b},a.b);a.b=e;a.headers=d;a.body=c;a.a=Q(b);return a},Jb=
	function(a,b,c,d){a=new w(c,"POST",function(a){var b=Hb(a,["active","final"]),c;try{c=a.a.getResponseHeader("X-Goog-Upload-Size-Received")}catch(h){P(!1)}a=c;isFinite(a)&&(a=String(a));a="string"==typeof a?/^\s*-?0x/i.test(a)?parseInt(a,16):parseInt(a,10):NaN;P(!isNaN(a));return new Gb(a,d.a,"final"===b)},a.b);a.headers={"X-Goog-Upload-Command":"query"};a.a=Q(b);a.f=!1;return a},Kb=function(a,b,c,d,e,g,f){var h=new Gb(0,0);f?(h.a=f.a,h.total=f.total):(h.a=0,h.total=d.a);if(d.a!==h.total)throw new u("server-file-wrong-size",
	"Server recorded incorrect upload file size, please retry the upload.");var p=f=h.total-h.a;0<e&&(p=Math.min(p,e));var B=h.a;e={"X-Goog-Upload-Command":p===f?"upload, finalize":"upload","X-Goog-Upload-Offset":h.a};f=d.slice(B,B+p);if(null===f)throw ia();c=new w(c,"POST",function(a,c){var e=Hb(a,["active","final"]),f=h.a+p,C=d.a,z;"final"===e?z=Ab(b,g)(a,c):z=null;return new Gb(f,C,"final"===e,z)},b.b);c.headers=e;c.body=f.i;c.l=null;c.a=Q(a);c.f=!1;return c};var T=function(a,b,c,d,e,g){this.L=a;this.c=b;this.l=c;this.f=e;this.h=g||null;this.s=d;this.m=0;this.D=this.u=!1;this.B=[];this.S=262144<this.f.a;this.b="running";this.a=this.v=this.g=null;this.j=1;var f=this;this.F=function(a){f.a=null;f.j=1;"storage/canceled"===a.code?(f.u=!0,R(f)):(f.g=a,S(f,"error"))};this.P=function(a){f.a=null;"storage/canceled"===a.code?R(f):(f.g=a,S(f,"error"))};this.A=this.o=null;this.C=qa(function(a,b){f.o=a;f.A=b;Lb(f)});this.C.then(null,function(){})},Lb=function(a){"running"===
	a.b&&null===a.a&&(a.S?null===a.v?Mb(a):a.u?Nb(a):a.D?Ob(a):Pb(a):Qb(a))},U=function(a,b){ab(a.c).then(function(c){switch(a.b){case "running":b(c);break;case "canceling":S(a,"canceled");break;case "pausing":S(a,"paused")}})},Mb=function(a){U(a,function(b){var c=Ib(a.c,a.l,a.s,a.f,a.h);a.a=I(a.c,c,b);a.a.a().then(function(b){a.a=null;a.v=b;a.u=!1;R(a)},this.F)})},Nb=function(a){var b=a.v;U(a,function(c){var d=Jb(a.c,a.l,b,a.f);a.a=I(a.c,d,c);a.a.a().then(function(b){a.a=null;Rb(a,b.a);a.u=!1;b.b&&(a.D=
	!0);R(a)},a.F)})},Pb=function(a){var b=262144*a.j,c=new Gb(a.m,a.f.a),d=a.v;U(a,function(e){var g;try{g=Kb(a.l,a.c,d,a.f,b,a.s,c)}catch(f){a.g=f;S(a,"error");return}a.a=I(a.c,g,e);a.a.a().then(function(b){33554432>262144*a.j&&(a.j*=2);a.a=null;Rb(a,b.a);b.b?(a.h=b.c,S(a,"success")):R(a)},a.F)})},Ob=function(a){U(a,function(b){var c=Cb(a.c,a.l,a.s);a.a=I(a.c,c,b);a.a.a().then(function(b){a.a=null;a.h=b;S(a,"success")},a.P)})},Qb=function(a){U(a,function(b){var c=Fb(a.c,a.l,a.s,a.f,a.h);a.a=I(a.c,c,
	b);a.a.a().then(function(b){a.a=null;a.h=b;Rb(a,a.f.a);S(a,"success")},a.F)})},Rb=function(a,b){var c=a.m;a.m=b;a.m>c&&V(a)},S=function(a,b){if(a.b!==b)switch(b){case "canceling":a.b=b;null!==a.a&&a.a.cancel();break;case "pausing":a.b=b;null!==a.a&&a.a.cancel();break;case "running":var c="paused"===a.b;a.b=b;c&&(V(a),Lb(a));break;case "paused":a.b=b;V(a);break;case "canceled":a.g=ha();a.b=b;V(a);break;case "error":a.b=b;V(a);break;case "success":a.b=b,V(a)}},R=function(a){switch(a.b){case "pausing":S(a,
	"paused");break;case "canceling":S(a,"canceled");break;case "running":Lb(a)}};T.prototype.w=function(){return new G(this.m,this.f.a,sa(this.b),this.h,this,this.L)};
	T.prototype.M=function(a,b,c,d){function e(a){try{f(a);return}catch(z){}try{if(h(a),!(q(a.next)||q(a.error)||q(a.complete)))throw"";}catch(z){throw"Expected a function or an Object with one of `next`, `error`, `complete` properties.";}}function g(a){return function(b,c,d){null!==a&&K("on",a,arguments);var e=new Ca(b,c,d);Sb(p,e);return function(){var a=p.B,b=a.indexOf(e);-1!==b&&a.splice(b,1)}}}var f=N().a,h=yb(null,!0).a;K("on",[M(function(){if("state_changed"!==a)throw"Expected one of the event types: [state_changed].";
	}),yb(e,!0),N(),N()],arguments);var p=this,B=[yb(function(a){if(null===a)throw"Expected a function or an Object with one of `next`, `error`, `complete` properties.";e(a)}),N(),N()];return q(b)||q(c)||q(d)?g(null)(b,c,d):g(B)};T.prototype.then=function(a,b){return this.C.then(a,b)};T.prototype["catch"]=function(a){return this.then(null,a)};
	var Sb=function(a,b){a.B.push(b);Tb(a,b)},V=function(a){Ub(a);Array.prototype.slice.call(a.B).forEach(function(b){Tb(a,b)})},Ub=function(a){if(null!==a.o){var b=!0;switch(sa(a.b)){case "success":A(a.o.bind(null,a.w()))();break;case "canceled":case "error":A(a.A.bind(null,a.g))();break;default:b=!1}b&&(a.o=null,a.A=null)}},Tb=function(a,b){switch(sa(a.b)){case "running":case "paused":null!==b.b&&A(b.b.bind(b,a.w()))();break;case "success":null!==b.a&&A(b.a.bind(b))();break;case "canceled":case "error":null!==
	b.error&&A(b.error.bind(b,a.g))();break;default:null!==b.error&&A(b.error.bind(b,a.g))()}};T.prototype.O=function(){K("resume",[],arguments);var a="paused"===this.b||"pausing"===this.b;a&&S(this,"running");return a};T.prototype.N=function(){K("pause",[],arguments);var a="running"===this.b;a&&S(this,"pausing");return a};T.prototype.cancel=function(){K("cancel",[],arguments);var a="running"===this.b||"pausing"===this.b;a&&S(this,"canceling");return a};var W=function(a,b){this.a=a;this.location=b instanceof D?b:Aa(b)};W.prototype.toString=function(){K("toString",[],arguments);return"gs://"+this.location.bucket+"/"+this.location.path};var Vb=function(a,b){return new W(a,b)};k=W.prototype;k.H=function(a){K("child",[M()],arguments);var b=oa(this.location.path,a);return Vb(this.a,new D(this.location.bucket,b))};
	k.ka=function(){var a;a=this.location.path;if(0==a.length)a=null;else{var b=a.lastIndexOf("/");a=-1===b?"":a.slice(0,b)}return null===a?null:Vb(this.a,new D(this.location.bucket,a))};k.ma=function(){return Vb(this.a,new D(this.location.bucket,""))};k.U=function(){return this.location.bucket};k.fa=function(){return this.location.path};k.ja=function(){return pa(this.location.path)};k.oa=function(){return this.a.l};
	k.Z=function(a,b){K("put",[wb(),new L(ub,!0)],arguments);X(this,"put");return new T(this,this.a,this.location,rb(),new O(a),b)};k.$=function(a,b,c){K("putString",[M(),M(Da,!0),new L(ub,!0)],arguments);X(this,"putString");var d=Ia(y(b)?b:"raw",a),e=c?na(c):{};!y(e.contentType)&&y(d.a)&&(e.contentType=d.a);return new T(this,this.a,this.location,rb(),new O(d.data,!0),e)};
	k.X=function(){K("delete",[],arguments);X(this,"delete");var a=this;return ab(this.a).then(function(b){var c=Db(a.a,a.location);return I(a.a,c,b).a()})};k.I=function(){K("getMetadata",[],arguments);X(this,"getMetadata");var a=this;return ab(this.a).then(function(b){var c=Cb(a.a,a.location,rb());return I(a.a,c,b).a()})};
	k.aa=function(a){K("updateMetadata",[new L(ub,void 0)],arguments);X(this,"updateMetadata");var b=this;return ab(this.a).then(function(c){var d=b.a,e=b.location,g=a,f=rb(),h=za(e),h=t+"/v0"+h,g=tb(g,f),d=new w(h,"PATCH",Ab(d,f),d.c);d.headers={"Content-Type":"application/json; charset=utf-8"};d.body=g;d.a=Bb(e);return I(b.a,d,c).a()})};
	k.Y=function(){K("getDownloadURL",[],arguments);X(this,"getDownloadURL");return this.I().then(function(a){a=a.downloadURLs[0];if(y(a))return a;throw new u("no-download-url","The given file does not have any download URLs.");})};var X=function(a,b){if(""===a.location.path)throw new u("invalid-root-operation","The operation '"+b+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').");};var Y=function(a,b,c){this.a=new $a(a,function(a,b){return new W(a,b)},Ua,this,b);this.c=a;q(c)?this.b=Ba(c):null!=this.a.bucket()&&(this.b=new D(this.a.bucket(),""));this.f=new Wb(this)};k=Y.prototype;k.ba=function(a){K("ref",[M(function(a){if(/^[A-Za-z]+:\/\//.test(a))throw"Expected child path but got a URL, use refFromURL instead.";},!0)],arguments);if(null===this.b)throw Error("No Storage Bucket defined in Firebase Options.");var b=new W(this.a,this.b);return q(a)?b.H(a):b};
	k.ca=function(a){K("refFromURL",[M(function(a){if(!/^[A-Za-z]+:\/\//.test(a))throw"Expected full URL but got a child path, use ref instead.";try{Aa(a)}catch(c){throw"Expected valid full URL but got an invalid one.";}},!1)],arguments);return new W(this.a,a)};k.ha=function(){return this.a.b};k.ea=function(a){K("setMaxUploadRetryTime",[xb()],arguments);this.a.b=a};k.ga=function(){return this.a.c};k.da=function(a){K("setMaxOperationRetryTime",[xb()],arguments);this.a.c=a};k.T=function(){return this.c};
	k.R=function(){return this.f};var Wb=function(a){this.a=a};Wb.prototype.b=function(){var a=this.a.a;a.f=!0;a.a=null;Za(a.h)};var Z=function(a,b,c){Object.defineProperty(a,b,{get:c})};W.prototype.toString=W.prototype.toString;W.prototype.child=W.prototype.H;W.prototype.put=W.prototype.Z;W.prototype.putString=W.prototype.$;W.prototype["delete"]=W.prototype.X;W.prototype.getMetadata=W.prototype.I;W.prototype.updateMetadata=W.prototype.aa;W.prototype.getDownloadURL=W.prototype.Y;Z(W.prototype,"parent",W.prototype.ka);Z(W.prototype,"root",W.prototype.ma);Z(W.prototype,"bucket",W.prototype.U);Z(W.prototype,"fullPath",W.prototype.fa);
	Z(W.prototype,"name",W.prototype.ja);Z(W.prototype,"storage",W.prototype.oa);Y.prototype.ref=Y.prototype.ba;Y.prototype.refFromURL=Y.prototype.ca;Z(Y.prototype,"maxOperationRetryTime",Y.prototype.ga);Y.prototype.setMaxOperationRetryTime=Y.prototype.da;Z(Y.prototype,"maxUploadRetryTime",Y.prototype.ha);Y.prototype.setMaxUploadRetryTime=Y.prototype.ea;Z(Y.prototype,"app",Y.prototype.T);Z(Y.prototype,"INTERNAL",Y.prototype.R);Wb.prototype["delete"]=Wb.prototype.b;Y.prototype.capi_=function(a){t=a};
	T.prototype.on=T.prototype.M;T.prototype.resume=T.prototype.O;T.prototype.pause=T.prototype.N;T.prototype.cancel=T.prototype.cancel;T.prototype.then=T.prototype.then;T.prototype["catch"]=T.prototype["catch"];Z(T.prototype,"snapshot",T.prototype.w);Z(G.prototype,"bytesTransferred",G.prototype.V);Z(G.prototype,"totalBytes",G.prototype.qa);Z(G.prototype,"state",G.prototype.na);Z(G.prototype,"metadata",G.prototype.ia);Z(G.prototype,"downloadURL",G.prototype.W);Z(G.prototype,"task",G.prototype.pa);
	Z(G.prototype,"ref",G.prototype.la);ra.STATE_CHANGED="state_changed";x.RUNNING="running";x.PAUSED="paused";x.SUCCESS="success";x.CANCELED="canceled";x.ERROR="error";E.RAW="raw";E.BASE64="base64";E.BASE64URL="base64url";E.DATA_URL="data_url";
	(function(){function a(a,b,e){return new Y(a,new Va,e)}var b={TaskState:x,TaskEvent:ra,StringFormat:E,Storage:Y,Reference:W};if("undefined"!==typeof firebase)firebase.INTERNAL.registerService("storage",a,b);else throw Error("Cannot install Firebase Storage - be sure to load firebase-app.js first.");})();}).call(this);
	}).call(typeof global !== undefined ? global : typeof self !== undefined ? self : typeof window !== undefined ? window : {});
	module.exports = firebase.storage;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *  Copyright (c) 2014-2015, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */

	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.Immutable = factory());
	}(this, function () { 'use strict';var SLICE$0 = Array.prototype.slice;

	  function createClass(ctor, superClass) {
	    if (superClass) {
	      ctor.prototype = Object.create(superClass.prototype);
	    }
	    ctor.prototype.constructor = ctor;
	  }

	  function Iterable(value) {
	      return isIterable(value) ? value : Seq(value);
	    }


	  createClass(KeyedIterable, Iterable);
	    function KeyedIterable(value) {
	      return isKeyed(value) ? value : KeyedSeq(value);
	    }


	  createClass(IndexedIterable, Iterable);
	    function IndexedIterable(value) {
	      return isIndexed(value) ? value : IndexedSeq(value);
	    }


	  createClass(SetIterable, Iterable);
	    function SetIterable(value) {
	      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
	    }



	  function isIterable(maybeIterable) {
	    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
	  }

	  function isKeyed(maybeKeyed) {
	    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
	  }

	  function isIndexed(maybeIndexed) {
	    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
	  }

	  function isAssociative(maybeAssociative) {
	    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
	  }

	  function isOrdered(maybeOrdered) {
	    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
	  }

	  Iterable.isIterable = isIterable;
	  Iterable.isKeyed = isKeyed;
	  Iterable.isIndexed = isIndexed;
	  Iterable.isAssociative = isAssociative;
	  Iterable.isOrdered = isOrdered;

	  Iterable.Keyed = KeyedIterable;
	  Iterable.Indexed = IndexedIterable;
	  Iterable.Set = SetIterable;


	  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  // Used for setting prototype methods that IE8 chokes on.
	  var DELETE = 'delete';

	  // Constants describing the size of trie nodes.
	  var SHIFT = 5; // Resulted in best performance after ______?
	  var SIZE = 1 << SHIFT;
	  var MASK = SIZE - 1;

	  // A consistent shared value representing "not set" which equals nothing other
	  // than itself, and nothing that could be provided externally.
	  var NOT_SET = {};

	  // Boolean references, Rough equivalent of `bool &`.
	  var CHANGE_LENGTH = { value: false };
	  var DID_ALTER = { value: false };

	  function MakeRef(ref) {
	    ref.value = false;
	    return ref;
	  }

	  function SetRef(ref) {
	    ref && (ref.value = true);
	  }

	  // A function which returns a value representing an "owner" for transient writes
	  // to tries. The return value will only ever equal itself, and will not equal
	  // the return of any subsequent call of this function.
	  function OwnerID() {}

	  // http://jsperf.com/copy-array-inline
	  function arrCopy(arr, offset) {
	    offset = offset || 0;
	    var len = Math.max(0, arr.length - offset);
	    var newArr = new Array(len);
	    for (var ii = 0; ii < len; ii++) {
	      newArr[ii] = arr[ii + offset];
	    }
	    return newArr;
	  }

	  function ensureSize(iter) {
	    if (iter.size === undefined) {
	      iter.size = iter.__iterate(returnTrue);
	    }
	    return iter.size;
	  }

	  function wrapIndex(iter, index) {
	    // This implements "is array index" which the ECMAString spec defines as:
	    //
	    //     A String property name P is an array index if and only if
	    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
	    //     to 2^32−1.
	    //
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
	    if (typeof index !== 'number') {
	      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
	      if ('' + uint32Index !== index || uint32Index === 4294967295) {
	        return NaN;
	      }
	      index = uint32Index;
	    }
	    return index < 0 ? ensureSize(iter) + index : index;
	  }

	  function returnTrue() {
	    return true;
	  }

	  function wholeSlice(begin, end, size) {
	    return (begin === 0 || (size !== undefined && begin <= -size)) &&
	      (end === undefined || (size !== undefined && end >= size));
	  }

	  function resolveBegin(begin, size) {
	    return resolveIndex(begin, size, 0);
	  }

	  function resolveEnd(end, size) {
	    return resolveIndex(end, size, size);
	  }

	  function resolveIndex(index, size, defaultIndex) {
	    return index === undefined ?
	      defaultIndex :
	      index < 0 ?
	        Math.max(0, size + index) :
	        size === undefined ?
	          index :
	          Math.min(size, index);
	  }

	  /* global Symbol */

	  var ITERATE_KEYS = 0;
	  var ITERATE_VALUES = 1;
	  var ITERATE_ENTRIES = 2;

	  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator';

	  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


	  function Iterator(next) {
	      this.next = next;
	    }

	    Iterator.prototype.toString = function() {
	      return '[Iterator]';
	    };


	  Iterator.KEYS = ITERATE_KEYS;
	  Iterator.VALUES = ITERATE_VALUES;
	  Iterator.ENTRIES = ITERATE_ENTRIES;

	  Iterator.prototype.inspect =
	  Iterator.prototype.toSource = function () { return this.toString(); }
	  Iterator.prototype[ITERATOR_SYMBOL] = function () {
	    return this;
	  };


	  function iteratorValue(type, k, v, iteratorResult) {
	    var value = type === 0 ? k : type === 1 ? v : [k, v];
	    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
	      value: value, done: false
	    });
	    return iteratorResult;
	  }

	  function iteratorDone() {
	    return { value: undefined, done: true };
	  }

	  function hasIterator(maybeIterable) {
	    return !!getIteratorFn(maybeIterable);
	  }

	  function isIterator(maybeIterator) {
	    return maybeIterator && typeof maybeIterator.next === 'function';
	  }

	  function getIterator(iterable) {
	    var iteratorFn = getIteratorFn(iterable);
	    return iteratorFn && iteratorFn.call(iterable);
	  }

	  function getIteratorFn(iterable) {
	    var iteratorFn = iterable && (
	      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
	      iterable[FAUX_ITERATOR_SYMBOL]
	    );
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  function isArrayLike(value) {
	    return value && typeof value.length === 'number';
	  }

	  createClass(Seq, Iterable);
	    function Seq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        isIterable(value) ? value.toSeq() : seqFromValue(value);
	    }

	    Seq.of = function(/*...values*/) {
	      return Seq(arguments);
	    };

	    Seq.prototype.toSeq = function() {
	      return this;
	    };

	    Seq.prototype.toString = function() {
	      return this.__toString('Seq {', '}');
	    };

	    Seq.prototype.cacheResult = function() {
	      if (!this._cache && this.__iterateUncached) {
	        this._cache = this.entrySeq().toArray();
	        this.size = this._cache.length;
	      }
	      return this;
	    };

	    // abstract __iterateUncached(fn, reverse)

	    Seq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, true);
	    };

	    // abstract __iteratorUncached(type, reverse)

	    Seq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, true);
	    };



	  createClass(KeyedSeq, Seq);
	    function KeyedSeq(value) {
	      return value === null || value === undefined ?
	        emptySequence().toKeyedSeq() :
	        isIterable(value) ?
	          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
	          keyedSeqFromValue(value);
	    }

	    KeyedSeq.prototype.toKeyedSeq = function() {
	      return this;
	    };



	  createClass(IndexedSeq, Seq);
	    function IndexedSeq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
	    }

	    IndexedSeq.of = function(/*...values*/) {
	      return IndexedSeq(arguments);
	    };

	    IndexedSeq.prototype.toIndexedSeq = function() {
	      return this;
	    };

	    IndexedSeq.prototype.toString = function() {
	      return this.__toString('Seq [', ']');
	    };

	    IndexedSeq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, false);
	    };

	    IndexedSeq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, false);
	    };



	  createClass(SetSeq, Seq);
	    function SetSeq(value) {
	      return (
	        value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value
	      ).toSetSeq();
	    }

	    SetSeq.of = function(/*...values*/) {
	      return SetSeq(arguments);
	    };

	    SetSeq.prototype.toSetSeq = function() {
	      return this;
	    };



	  Seq.isSeq = isSeq;
	  Seq.Keyed = KeyedSeq;
	  Seq.Set = SetSeq;
	  Seq.Indexed = IndexedSeq;

	  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

	  Seq.prototype[IS_SEQ_SENTINEL] = true;



	  createClass(ArraySeq, IndexedSeq);
	    function ArraySeq(array) {
	      this._array = array;
	      this.size = array.length;
	    }

	    ArraySeq.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
	    };

	    ArraySeq.prototype.__iterate = function(fn, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ArraySeq.prototype.__iterator = function(type, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      var ii = 0;
	      return new Iterator(function() 
	        {return ii > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
	      );
	    };



	  createClass(ObjectSeq, KeyedSeq);
	    function ObjectSeq(object) {
	      var keys = Object.keys(object);
	      this._object = object;
	      this._keys = keys;
	      this.size = keys.length;
	    }

	    ObjectSeq.prototype.get = function(key, notSetValue) {
	      if (notSetValue !== undefined && !this.has(key)) {
	        return notSetValue;
	      }
	      return this._object[key];
	    };

	    ObjectSeq.prototype.has = function(key) {
	      return this._object.hasOwnProperty(key);
	    };

	    ObjectSeq.prototype.__iterate = function(fn, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        if (fn(object[key], key, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ObjectSeq.prototype.__iterator = function(type, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      var ii = 0;
	      return new Iterator(function()  {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, key, object[key]);
	      });
	    };

	  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(IterableSeq, IndexedSeq);
	    function IterableSeq(iterable) {
	      this._iterable = iterable;
	      this.size = iterable.length || iterable.size;
	    }

	    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      var iterations = 0;
	      if (isIterator(iterator)) {
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (fn(step.value, iterations++, this) === false) {
	            break;
	          }
	        }
	      }
	      return iterations;
	    };

	    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      if (!isIterator(iterator)) {
	        return new Iterator(iteratorDone);
	      }
	      var iterations = 0;
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step : iteratorValue(type, iterations++, step.value);
	      });
	    };



	  createClass(IteratorSeq, IndexedSeq);
	    function IteratorSeq(iterator) {
	      this._iterator = iterator;
	      this._iteratorCache = [];
	    }

	    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      while (iterations < cache.length) {
	        if (fn(cache[iterations], iterations++, this) === false) {
	          return iterations;
	        }
	      }
	      var step;
	      while (!(step = iterator.next()).done) {
	        var val = step.value;
	        cache[iterations] = val;
	        if (fn(val, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };

	    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      return new Iterator(function()  {
	        if (iterations >= cache.length) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          cache[iterations] = step.value;
	        }
	        return iteratorValue(type, iterations, cache[iterations++]);
	      });
	    };




	  // # pragma Helper functions

	  function isSeq(maybeSeq) {
	    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
	  }

	  var EMPTY_SEQ;

	  function emptySequence() {
	    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
	  }

	  function keyedSeqFromValue(value) {
	    var seq =
	      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
	      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
	      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
	      typeof value === 'object' ? new ObjectSeq(value) :
	      undefined;
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of [k, v] entries, '+
	        'or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function indexedSeqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value);
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values: ' + value
	      );
	    }
	    return seq;
	  }

	  function seqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value) ||
	      (typeof value === 'object' && new ObjectSeq(value));
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values, or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function maybeIndexedSeqFromValue(value) {
	    return (
	      isArrayLike(value) ? new ArraySeq(value) :
	      isIterator(value) ? new IteratorSeq(value) :
	      hasIterator(value) ? new IterableSeq(value) :
	      undefined
	    );
	  }

	  function seqIterate(seq, fn, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    }
	    return seq.__iterateUncached(fn, reverse);
	  }

	  function seqIterator(seq, type, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      var ii = 0;
	      return new Iterator(function()  {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
	      });
	    }
	    return seq.__iteratorUncached(type, reverse);
	  }

	  function fromJS(json, converter) {
	    return converter ?
	      fromJSWith(converter, json, '', {'': json}) :
	      fromJSDefault(json);
	  }

	  function fromJSWith(converter, json, key, parentJSON) {
	    if (Array.isArray(json)) {
	      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    if (isPlainObj(json)) {
	      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    return json;
	  }

	  function fromJSDefault(json) {
	    if (Array.isArray(json)) {
	      return IndexedSeq(json).map(fromJSDefault).toList();
	    }
	    if (isPlainObj(json)) {
	      return KeyedSeq(json).map(fromJSDefault).toMap();
	    }
	    return json;
	  }

	  function isPlainObj(value) {
	    return value && (value.constructor === Object || value.constructor === undefined);
	  }

	  /**
	   * An extension of the "same-value" algorithm as [described for use by ES6 Map
	   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
	   *
	   * NaN is considered the same as NaN, however -0 and 0 are considered the same
	   * value, which is different from the algorithm described by
	   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
	   *
	   * This is extended further to allow Objects to describe the values they
	   * represent, by way of `valueOf` or `equals` (and `hashCode`).
	   *
	   * Note: because of this extension, the key equality of Immutable.Map and the
	   * value equality of Immutable.Set will differ from ES6 Map and Set.
	   *
	   * ### Defining custom values
	   *
	   * The easiest way to describe the value an object represents is by implementing
	   * `valueOf`. For example, `Date` represents a value by returning a unix
	   * timestamp for `valueOf`:
	   *
	   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
	   *     var date2 = new Date(1234567890000);
	   *     date1.valueOf(); // 1234567890000
	   *     assert( date1 !== date2 );
	   *     assert( Immutable.is( date1, date2 ) );
	   *
	   * Note: overriding `valueOf` may have other implications if you use this object
	   * where JavaScript expects a primitive, such as implicit string coercion.
	   *
	   * For more complex types, especially collections, implementing `valueOf` may
	   * not be performant. An alternative is to implement `equals` and `hashCode`.
	   *
	   * `equals` takes another object, presumably of similar type, and returns true
	   * if the it is equal. Equality is symmetrical, so the same result should be
	   * returned if this and the argument are flipped.
	   *
	   *     assert( a.equals(b) === b.equals(a) );
	   *
	   * `hashCode` returns a 32bit integer number representing the object which will
	   * be used to determine how to store the value object in a Map or Set. You must
	   * provide both or neither methods, one must not exist without the other.
	   *
	   * Also, an important relationship between these methods must be upheld: if two
	   * values are equal, they *must* return the same hashCode. If the values are not
	   * equal, they might have the same hashCode; this is called a hash collision,
	   * and while undesirable for performance reasons, it is acceptable.
	   *
	   *     if (a.equals(b)) {
	   *       assert( a.hashCode() === b.hashCode() );
	   *     }
	   *
	   * All Immutable collections implement `equals` and `hashCode`.
	   *
	   */
	  function is(valueA, valueB) {
	    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	      return true;
	    }
	    if (!valueA || !valueB) {
	      return false;
	    }
	    if (typeof valueA.valueOf === 'function' &&
	        typeof valueB.valueOf === 'function') {
	      valueA = valueA.valueOf();
	      valueB = valueB.valueOf();
	      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	        return true;
	      }
	      if (!valueA || !valueB) {
	        return false;
	      }
	    }
	    if (typeof valueA.equals === 'function' &&
	        typeof valueB.equals === 'function' &&
	        valueA.equals(valueB)) {
	      return true;
	    }
	    return false;
	  }

	  function deepEqual(a, b) {
	    if (a === b) {
	      return true;
	    }

	    if (
	      !isIterable(b) ||
	      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
	      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
	      isKeyed(a) !== isKeyed(b) ||
	      isIndexed(a) !== isIndexed(b) ||
	      isOrdered(a) !== isOrdered(b)
	    ) {
	      return false;
	    }

	    if (a.size === 0 && b.size === 0) {
	      return true;
	    }

	    var notAssociative = !isAssociative(a);

	    if (isOrdered(a)) {
	      var entries = a.entries();
	      return b.every(function(v, k)  {
	        var entry = entries.next().value;
	        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
	      }) && entries.next().done;
	    }

	    var flipped = false;

	    if (a.size === undefined) {
	      if (b.size === undefined) {
	        if (typeof a.cacheResult === 'function') {
	          a.cacheResult();
	        }
	      } else {
	        flipped = true;
	        var _ = a;
	        a = b;
	        b = _;
	      }
	    }

	    var allEqual = true;
	    var bSize = b.__iterate(function(v, k)  {
	      if (notAssociative ? !a.has(v) :
	          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
	        allEqual = false;
	        return false;
	      }
	    });

	    return allEqual && a.size === bSize;
	  }

	  createClass(Repeat, IndexedSeq);

	    function Repeat(value, times) {
	      if (!(this instanceof Repeat)) {
	        return new Repeat(value, times);
	      }
	      this._value = value;
	      this.size = times === undefined ? Infinity : Math.max(0, times);
	      if (this.size === 0) {
	        if (EMPTY_REPEAT) {
	          return EMPTY_REPEAT;
	        }
	        EMPTY_REPEAT = this;
	      }
	    }

	    Repeat.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Repeat []';
	      }
	      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
	    };

	    Repeat.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._value : notSetValue;
	    };

	    Repeat.prototype.includes = function(searchValue) {
	      return is(this._value, searchValue);
	    };

	    Repeat.prototype.slice = function(begin, end) {
	      var size = this.size;
	      return wholeSlice(begin, end, size) ? this :
	        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
	    };

	    Repeat.prototype.reverse = function() {
	      return this;
	    };

	    Repeat.prototype.indexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return 0;
	      }
	      return -1;
	    };

	    Repeat.prototype.lastIndexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return this.size;
	      }
	      return -1;
	    };

	    Repeat.prototype.__iterate = function(fn, reverse) {
	      for (var ii = 0; ii < this.size; ii++) {
	        if (fn(this._value, ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      var ii = 0;
	      return new Iterator(function() 
	        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
	      );
	    };

	    Repeat.prototype.equals = function(other) {
	      return other instanceof Repeat ?
	        is(this._value, other._value) :
	        deepEqual(other);
	    };


	  var EMPTY_REPEAT;

	  function invariant(condition, error) {
	    if (!condition) throw new Error(error);
	  }

	  createClass(Range, IndexedSeq);

	    function Range(start, end, step) {
	      if (!(this instanceof Range)) {
	        return new Range(start, end, step);
	      }
	      invariant(step !== 0, 'Cannot step a Range by 0');
	      start = start || 0;
	      if (end === undefined) {
	        end = Infinity;
	      }
	      step = step === undefined ? 1 : Math.abs(step);
	      if (end < start) {
	        step = -step;
	      }
	      this._start = start;
	      this._end = end;
	      this._step = step;
	      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
	      if (this.size === 0) {
	        if (EMPTY_RANGE) {
	          return EMPTY_RANGE;
	        }
	        EMPTY_RANGE = this;
	      }
	    }

	    Range.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Range []';
	      }
	      return 'Range [ ' +
	        this._start + '...' + this._end +
	        (this._step !== 1 ? ' by ' + this._step : '') +
	      ' ]';
	    };

	    Range.prototype.get = function(index, notSetValue) {
	      return this.has(index) ?
	        this._start + wrapIndex(this, index) * this._step :
	        notSetValue;
	    };

	    Range.prototype.includes = function(searchValue) {
	      var possibleIndex = (searchValue - this._start) / this._step;
	      return possibleIndex >= 0 &&
	        possibleIndex < this.size &&
	        possibleIndex === Math.floor(possibleIndex);
	    };

	    Range.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      begin = resolveBegin(begin, this.size);
	      end = resolveEnd(end, this.size);
	      if (end <= begin) {
	        return new Range(0, 0);
	      }
	      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
	    };

	    Range.prototype.indexOf = function(searchValue) {
	      var offsetValue = searchValue - this._start;
	      if (offsetValue % this._step === 0) {
	        var index = offsetValue / this._step;
	        if (index >= 0 && index < this.size) {
	          return index
	        }
	      }
	      return -1;
	    };

	    Range.prototype.lastIndexOf = function(searchValue) {
	      return this.indexOf(searchValue);
	    };

	    Range.prototype.__iterate = function(fn, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(value, ii, this) === false) {
	          return ii + 1;
	        }
	        value += reverse ? -step : step;
	      }
	      return ii;
	    };

	    Range.prototype.__iterator = function(type, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      var ii = 0;
	      return new Iterator(function()  {
	        var v = value;
	        value += reverse ? -step : step;
	        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
	      });
	    };

	    Range.prototype.equals = function(other) {
	      return other instanceof Range ?
	        this._start === other._start &&
	        this._end === other._end &&
	        this._step === other._step :
	        deepEqual(this, other);
	    };


	  var EMPTY_RANGE;

	  createClass(Collection, Iterable);
	    function Collection() {
	      throw TypeError('Abstract');
	    }


	  createClass(KeyedCollection, Collection);function KeyedCollection() {}

	  createClass(IndexedCollection, Collection);function IndexedCollection() {}

	  createClass(SetCollection, Collection);function SetCollection() {}


	  Collection.Keyed = KeyedCollection;
	  Collection.Indexed = IndexedCollection;
	  Collection.Set = SetCollection;

	  var imul =
	    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
	    Math.imul :
	    function imul(a, b) {
	      a = a | 0; // int
	      b = b | 0; // int
	      var c = a & 0xffff;
	      var d = b & 0xffff;
	      // Shift by 0 fixes the sign on the high part.
	      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
	    };

	  // v8 has an optimization for storing 31-bit signed numbers.
	  // Values which have either 00 or 11 as the high order bits qualify.
	  // This function drops the highest order bit in a signed number, maintaining
	  // the sign bit.
	  function smi(i32) {
	    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
	  }

	  function hash(o) {
	    if (o === false || o === null || o === undefined) {
	      return 0;
	    }
	    if (typeof o.valueOf === 'function') {
	      o = o.valueOf();
	      if (o === false || o === null || o === undefined) {
	        return 0;
	      }
	    }
	    if (o === true) {
	      return 1;
	    }
	    var type = typeof o;
	    if (type === 'number') {
	      if (o !== o || o === Infinity) {
	        return 0;
	      }
	      var h = o | 0;
	      if (h !== o) {
	        h ^= o * 0xFFFFFFFF;
	      }
	      while (o > 0xFFFFFFFF) {
	        o /= 0xFFFFFFFF;
	        h ^= o;
	      }
	      return smi(h);
	    }
	    if (type === 'string') {
	      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
	    }
	    if (typeof o.hashCode === 'function') {
	      return o.hashCode();
	    }
	    if (type === 'object') {
	      return hashJSObj(o);
	    }
	    if (typeof o.toString === 'function') {
	      return hashString(o.toString());
	    }
	    throw new Error('Value type ' + type + ' cannot be hashed.');
	  }

	  function cachedHashString(string) {
	    var hash = stringHashCache[string];
	    if (hash === undefined) {
	      hash = hashString(string);
	      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
	        STRING_HASH_CACHE_SIZE = 0;
	        stringHashCache = {};
	      }
	      STRING_HASH_CACHE_SIZE++;
	      stringHashCache[string] = hash;
	    }
	    return hash;
	  }

	  // http://jsperf.com/hashing-strings
	  function hashString(string) {
	    // This is the hash from JVM
	    // The hash code for a string is computed as
	    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
	    // where s[i] is the ith character of the string and n is the length of
	    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
	    // (exclusive) by dropping high bits.
	    var hash = 0;
	    for (var ii = 0; ii < string.length; ii++) {
	      hash = 31 * hash + string.charCodeAt(ii) | 0;
	    }
	    return smi(hash);
	  }

	  function hashJSObj(obj) {
	    var hash;
	    if (usingWeakMap) {
	      hash = weakMap.get(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = obj[UID_HASH_KEY];
	    if (hash !== undefined) {
	      return hash;
	    }

	    if (!canDefineProperty) {
	      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
	      if (hash !== undefined) {
	        return hash;
	      }

	      hash = getIENodeHash(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = ++objHashUID;
	    if (objHashUID & 0x40000000) {
	      objHashUID = 0;
	    }

	    if (usingWeakMap) {
	      weakMap.set(obj, hash);
	    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
	      throw new Error('Non-extensible objects are not allowed as keys.');
	    } else if (canDefineProperty) {
	      Object.defineProperty(obj, UID_HASH_KEY, {
	        'enumerable': false,
	        'configurable': false,
	        'writable': false,
	        'value': hash
	      });
	    } else if (obj.propertyIsEnumerable !== undefined &&
	               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
	      // Since we can't define a non-enumerable property on the object
	      // we'll hijack one of the less-used non-enumerable properties to
	      // save our hash on it. Since this is a function it will not show up in
	      // `JSON.stringify` which is what we want.
	      obj.propertyIsEnumerable = function() {
	        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
	      };
	      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
	    } else if (obj.nodeType !== undefined) {
	      // At this point we couldn't get the IE `uniqueID` to use as a hash
	      // and we couldn't use a non-enumerable property to exploit the
	      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
	      // itself.
	      obj[UID_HASH_KEY] = hash;
	    } else {
	      throw new Error('Unable to set a non-enumerable property on object.');
	    }

	    return hash;
	  }

	  // Get references to ES5 object methods.
	  var isExtensible = Object.isExtensible;

	  // True if Object.defineProperty works as expected. IE8 fails this test.
	  var canDefineProperty = (function() {
	    try {
	      Object.defineProperty({}, '@', {});
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }());

	  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
	  // and avoid memory leaks from the IE cloneNode bug.
	  function getIENodeHash(node) {
	    if (node && node.nodeType > 0) {
	      switch (node.nodeType) {
	        case 1: // Element
	          return node.uniqueID;
	        case 9: // Document
	          return node.documentElement && node.documentElement.uniqueID;
	      }
	    }
	  }

	  // If possible, use a WeakMap.
	  var usingWeakMap = typeof WeakMap === 'function';
	  var weakMap;
	  if (usingWeakMap) {
	    weakMap = new WeakMap();
	  }

	  var objHashUID = 0;

	  var UID_HASH_KEY = '__immutablehash__';
	  if (typeof Symbol === 'function') {
	    UID_HASH_KEY = Symbol(UID_HASH_KEY);
	  }

	  var STRING_HASH_CACHE_MIN_STRLEN = 16;
	  var STRING_HASH_CACHE_MAX_SIZE = 255;
	  var STRING_HASH_CACHE_SIZE = 0;
	  var stringHashCache = {};

	  function assertNotInfinite(size) {
	    invariant(
	      size !== Infinity,
	      'Cannot perform this action with an infinite size.'
	    );
	  }

	  createClass(Map, KeyedCollection);

	    // @pragma Construction

	    function Map(value) {
	      return value === null || value === undefined ? emptyMap() :
	        isMap(value) && !isOrdered(value) ? value :
	        emptyMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    Map.of = function() {var keyValues = SLICE$0.call(arguments, 0);
	      return emptyMap().withMutations(function(map ) {
	        for (var i = 0; i < keyValues.length; i += 2) {
	          if (i + 1 >= keyValues.length) {
	            throw new Error('Missing value for key: ' + keyValues[i]);
	          }
	          map.set(keyValues[i], keyValues[i + 1]);
	        }
	      });
	    };

	    Map.prototype.toString = function() {
	      return this.__toString('Map {', '}');
	    };

	    // @pragma Access

	    Map.prototype.get = function(k, notSetValue) {
	      return this._root ?
	        this._root.get(0, undefined, k, notSetValue) :
	        notSetValue;
	    };

	    // @pragma Modification

	    Map.prototype.set = function(k, v) {
	      return updateMap(this, k, v);
	    };

	    Map.prototype.setIn = function(keyPath, v) {
	      return this.updateIn(keyPath, NOT_SET, function()  {return v});
	    };

	    Map.prototype.remove = function(k) {
	      return updateMap(this, k, NOT_SET);
	    };

	    Map.prototype.deleteIn = function(keyPath) {
	      return this.updateIn(keyPath, function()  {return NOT_SET});
	    };

	    Map.prototype.update = function(k, notSetValue, updater) {
	      return arguments.length === 1 ?
	        k(this) :
	        this.updateIn([k], notSetValue, updater);
	    };

	    Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
	      if (!updater) {
	        updater = notSetValue;
	        notSetValue = undefined;
	      }
	      var updatedValue = updateInDeepMap(
	        this,
	        forceIterator(keyPath),
	        notSetValue,
	        updater
	      );
	      return updatedValue === NOT_SET ? undefined : updatedValue;
	    };

	    Map.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._root = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyMap();
	    };

	    // @pragma Composition

	    Map.prototype.merge = function(/*...iters*/) {
	      return mergeIntoMapWith(this, undefined, arguments);
	    };

	    Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, merger, iters);
	    };

	    Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(
	        keyPath,
	        emptyMap(),
	        function(m ) {return typeof m.merge === 'function' ?
	          m.merge.apply(m, iters) :
	          iters[iters.length - 1]}
	      );
	    };

	    Map.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoMapWith(this, deepMerger, arguments);
	    };

	    Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, deepMergerWith(merger), iters);
	    };

	    Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(
	        keyPath,
	        emptyMap(),
	        function(m ) {return typeof m.mergeDeep === 'function' ?
	          m.mergeDeep.apply(m, iters) :
	          iters[iters.length - 1]}
	      );
	    };

	    Map.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator));
	    };

	    Map.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator, mapper));
	    };

	    // @pragma Mutability

	    Map.prototype.withMutations = function(fn) {
	      var mutable = this.asMutable();
	      fn(mutable);
	      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
	    };

	    Map.prototype.asMutable = function() {
	      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
	    };

	    Map.prototype.asImmutable = function() {
	      return this.__ensureOwner();
	    };

	    Map.prototype.wasAltered = function() {
	      return this.__altered;
	    };

	    Map.prototype.__iterator = function(type, reverse) {
	      return new MapIterator(this, type, reverse);
	    };

	    Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      this._root && this._root.iterate(function(entry ) {
	        iterations++;
	        return fn(entry[1], entry[0], this$0);
	      }, reverse);
	      return iterations;
	    };

	    Map.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeMap(this.size, this._root, ownerID, this.__hash);
	    };


	  function isMap(maybeMap) {
	    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
	  }

	  Map.isMap = isMap;

	  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

	  var MapPrototype = Map.prototype;
	  MapPrototype[IS_MAP_SENTINEL] = true;
	  MapPrototype[DELETE] = MapPrototype.remove;
	  MapPrototype.removeIn = MapPrototype.deleteIn;


	  // #pragma Trie Nodes



	    function ArrayMapNode(ownerID, entries) {
	      this.ownerID = ownerID;
	      this.entries = entries;
	    }

	    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && entries.length === 1) {
	        return; // undefined
	      }

	      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
	        return createNodes(ownerID, entries, key, value);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new ArrayMapNode(ownerID, newEntries);
	    };




	    function BitmapIndexedNode(ownerID, bitmap, nodes) {
	      this.ownerID = ownerID;
	      this.bitmap = bitmap;
	      this.nodes = nodes;
	    }

	    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
	      var bitmap = this.bitmap;
	      return (bitmap & bit) === 0 ? notSetValue :
	        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
	    };

	    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var bit = 1 << keyHashFrag;
	      var bitmap = this.bitmap;
	      var exists = (bitmap & bit) !== 0;

	      if (!exists && value === NOT_SET) {
	        return this;
	      }

	      var idx = popCount(bitmap & (bit - 1));
	      var nodes = this.nodes;
	      var node = exists ? nodes[idx] : undefined;
	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

	      if (newNode === node) {
	        return this;
	      }

	      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
	        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
	      }

	      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
	        return nodes[idx ^ 1];
	      }

	      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
	        return newNode;
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
	      var newNodes = exists ? newNode ?
	        setIn(nodes, idx, newNode, isEditable) :
	        spliceOut(nodes, idx, isEditable) :
	        spliceIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.bitmap = newBitmap;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
	    };




	    function HashArrayMapNode(ownerID, count, nodes) {
	      this.ownerID = ownerID;
	      this.count = count;
	      this.nodes = nodes;
	    }

	    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var node = this.nodes[idx];
	      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
	    };

	    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var removed = value === NOT_SET;
	      var nodes = this.nodes;
	      var node = nodes[idx];

	      if (removed && !node) {
	        return this;
	      }

	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
	      if (newNode === node) {
	        return this;
	      }

	      var newCount = this.count;
	      if (!node) {
	        newCount++;
	      } else if (!newNode) {
	        newCount--;
	        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
	          return packNodes(ownerID, nodes, newCount, idx);
	        }
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newNodes = setIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.count = newCount;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new HashArrayMapNode(ownerID, newCount, newNodes);
	    };




	    function HashCollisionNode(ownerID, keyHash, entries) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entries = entries;
	    }

	    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }

	      var removed = value === NOT_SET;

	      if (keyHash !== this.keyHash) {
	        if (removed) {
	          return this;
	        }
	        SetRef(didAlter);
	        SetRef(didChangeSize);
	        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
	      }

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && len === 2) {
	        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
	    };




	    function ValueNode(ownerID, keyHash, entry) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entry = entry;
	    }

	    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
	    };

	    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;
	      var keyMatch = is(key, this.entry[0]);
	      if (keyMatch ? value === this.entry[1] : removed) {
	        return this;
	      }

	      SetRef(didAlter);

	      if (removed) {
	        SetRef(didChangeSize);
	        return; // undefined
	      }

	      if (keyMatch) {
	        if (ownerID && ownerID === this.ownerID) {
	          this.entry[1] = value;
	          return this;
	        }
	        return new ValueNode(ownerID, this.keyHash, [key, value]);
	      }

	      SetRef(didChangeSize);
	      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
	    };



	  // #pragma Iterators

	  ArrayMapNode.prototype.iterate =
	  HashCollisionNode.prototype.iterate = function (fn, reverse) {
	    var entries = this.entries;
	    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
	      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
	        return false;
	      }
	    }
	  }

	  BitmapIndexedNode.prototype.iterate =
	  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
	    var nodes = this.nodes;
	    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
	      var node = nodes[reverse ? maxIndex - ii : ii];
	      if (node && node.iterate(fn, reverse) === false) {
	        return false;
	      }
	    }
	  }

	  ValueNode.prototype.iterate = function (fn, reverse) {
	    return fn(this.entry);
	  }

	  createClass(MapIterator, Iterator);

	    function MapIterator(map, type, reverse) {
	      this._type = type;
	      this._reverse = reverse;
	      this._stack = map._root && mapIteratorFrame(map._root);
	    }

	    MapIterator.prototype.next = function() {
	      var type = this._type;
	      var stack = this._stack;
	      while (stack) {
	        var node = stack.node;
	        var index = stack.index++;
	        var maxIndex;
	        if (node.entry) {
	          if (index === 0) {
	            return mapIteratorValue(type, node.entry);
	          }
	        } else if (node.entries) {
	          maxIndex = node.entries.length - 1;
	          if (index <= maxIndex) {
	            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
	          }
	        } else {
	          maxIndex = node.nodes.length - 1;
	          if (index <= maxIndex) {
	            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
	            if (subNode) {
	              if (subNode.entry) {
	                return mapIteratorValue(type, subNode.entry);
	              }
	              stack = this._stack = mapIteratorFrame(subNode, stack);
	            }
	            continue;
	          }
	        }
	        stack = this._stack = this._stack.__prev;
	      }
	      return iteratorDone();
	    };


	  function mapIteratorValue(type, entry) {
	    return iteratorValue(type, entry[0], entry[1]);
	  }

	  function mapIteratorFrame(node, prev) {
	    return {
	      node: node,
	      index: 0,
	      __prev: prev
	    };
	  }

	  function makeMap(size, root, ownerID, hash) {
	    var map = Object.create(MapPrototype);
	    map.size = size;
	    map._root = root;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_MAP;
	  function emptyMap() {
	    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
	  }

	  function updateMap(map, k, v) {
	    var newRoot;
	    var newSize;
	    if (!map._root) {
	      if (v === NOT_SET) {
	        return map;
	      }
	      newSize = 1;
	      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
	    } else {
	      var didChangeSize = MakeRef(CHANGE_LENGTH);
	      var didAlter = MakeRef(DID_ALTER);
	      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
	      if (!didAlter.value) {
	        return map;
	      }
	      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
	    }
	    if (map.__ownerID) {
	      map.size = newSize;
	      map._root = newRoot;
	      map.__hash = undefined;
	      map.__altered = true;
	      return map;
	    }
	    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
	  }

	  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (!node) {
	      if (value === NOT_SET) {
	        return node;
	      }
	      SetRef(didAlter);
	      SetRef(didChangeSize);
	      return new ValueNode(ownerID, keyHash, [key, value]);
	    }
	    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
	  }

	  function isLeafNode(node) {
	    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
	  }

	  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
	    if (node.keyHash === keyHash) {
	      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
	    }

	    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
	    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

	    var newNode;
	    var nodes = idx1 === idx2 ?
	      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
	      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

	    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
	  }

	  function createNodes(ownerID, entries, key, value) {
	    if (!ownerID) {
	      ownerID = new OwnerID();
	    }
	    var node = new ValueNode(ownerID, hash(key), [key, value]);
	    for (var ii = 0; ii < entries.length; ii++) {
	      var entry = entries[ii];
	      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
	    }
	    return node;
	  }

	  function packNodes(ownerID, nodes, count, excluding) {
	    var bitmap = 0;
	    var packedII = 0;
	    var packedNodes = new Array(count);
	    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
	      var node = nodes[ii];
	      if (node !== undefined && ii !== excluding) {
	        bitmap |= bit;
	        packedNodes[packedII++] = node;
	      }
	    }
	    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
	  }

	  function expandNodes(ownerID, nodes, bitmap, including, node) {
	    var count = 0;
	    var expandedNodes = new Array(SIZE);
	    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
	      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
	    }
	    expandedNodes[including] = node;
	    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
	  }

	  function mergeIntoMapWith(map, merger, iterables) {
	    var iters = [];
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = KeyedIterable(value);
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    return mergeIntoCollectionWith(map, merger, iters);
	  }

	  function deepMerger(existing, value, key) {
	    return existing && existing.mergeDeep && isIterable(value) ?
	      existing.mergeDeep(value) :
	      is(existing, value) ? existing : value;
	  }

	  function deepMergerWith(merger) {
	    return function(existing, value, key)  {
	      if (existing && existing.mergeDeepWith && isIterable(value)) {
	        return existing.mergeDeepWith(merger, value);
	      }
	      var nextValue = merger(existing, value, key);
	      return is(existing, nextValue) ? existing : nextValue;
	    };
	  }

	  function mergeIntoCollectionWith(collection, merger, iters) {
	    iters = iters.filter(function(x ) {return x.size !== 0});
	    if (iters.length === 0) {
	      return collection;
	    }
	    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
	      return collection.constructor(iters[0]);
	    }
	    return collection.withMutations(function(collection ) {
	      var mergeIntoMap = merger ?
	        function(value, key)  {
	          collection.update(key, NOT_SET, function(existing )
	            {return existing === NOT_SET ? value : merger(existing, value, key)}
	          );
	        } :
	        function(value, key)  {
	          collection.set(key, value);
	        }
	      for (var ii = 0; ii < iters.length; ii++) {
	        iters[ii].forEach(mergeIntoMap);
	      }
	    });
	  }

	  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
	    var isNotSet = existing === NOT_SET;
	    var step = keyPathIter.next();
	    if (step.done) {
	      var existingValue = isNotSet ? notSetValue : existing;
	      var newValue = updater(existingValue);
	      return newValue === existingValue ? existing : newValue;
	    }
	    invariant(
	      isNotSet || (existing && existing.set),
	      'invalid keyPath'
	    );
	    var key = step.value;
	    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
	    var nextUpdated = updateInDeepMap(
	      nextExisting,
	      keyPathIter,
	      notSetValue,
	      updater
	    );
	    return nextUpdated === nextExisting ? existing :
	      nextUpdated === NOT_SET ? existing.remove(key) :
	      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
	  }

	  function popCount(x) {
	    x = x - ((x >> 1) & 0x55555555);
	    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
	    x = (x + (x >> 4)) & 0x0f0f0f0f;
	    x = x + (x >> 8);
	    x = x + (x >> 16);
	    return x & 0x7f;
	  }

	  function setIn(array, idx, val, canEdit) {
	    var newArray = canEdit ? array : arrCopy(array);
	    newArray[idx] = val;
	    return newArray;
	  }

	  function spliceIn(array, idx, val, canEdit) {
	    var newLen = array.length + 1;
	    if (canEdit && idx + 1 === newLen) {
	      array[idx] = val;
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        newArray[ii] = val;
	        after = -1;
	      } else {
	        newArray[ii] = array[ii + after];
	      }
	    }
	    return newArray;
	  }

	  function spliceOut(array, idx, canEdit) {
	    var newLen = array.length - 1;
	    if (canEdit && idx === newLen) {
	      array.pop();
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        after = 1;
	      }
	      newArray[ii] = array[ii + after];
	    }
	    return newArray;
	  }

	  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
	  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
	  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

	  createClass(List, IndexedCollection);

	    // @pragma Construction

	    function List(value) {
	      var empty = emptyList();
	      if (value === null || value === undefined) {
	        return empty;
	      }
	      if (isList(value)) {
	        return value;
	      }
	      var iter = IndexedIterable(value);
	      var size = iter.size;
	      if (size === 0) {
	        return empty;
	      }
	      assertNotInfinite(size);
	      if (size > 0 && size < SIZE) {
	        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
	      }
	      return empty.withMutations(function(list ) {
	        list.setSize(size);
	        iter.forEach(function(v, i)  {return list.set(i, v)});
	      });
	    }

	    List.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    List.prototype.toString = function() {
	      return this.__toString('List [', ']');
	    };

	    // @pragma Access

	    List.prototype.get = function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      if (index >= 0 && index < this.size) {
	        index += this._origin;
	        var node = listNodeFor(this, index);
	        return node && node.array[index & MASK];
	      }
	      return notSetValue;
	    };

	    // @pragma Modification

	    List.prototype.set = function(index, value) {
	      return updateList(this, index, value);
	    };

	    List.prototype.remove = function(index) {
	      return !this.has(index) ? this :
	        index === 0 ? this.shift() :
	        index === this.size - 1 ? this.pop() :
	        this.splice(index, 1);
	    };

	    List.prototype.insert = function(index, value) {
	      return this.splice(index, 0, value);
	    };

	    List.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = this._origin = this._capacity = 0;
	        this._level = SHIFT;
	        this._root = this._tail = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyList();
	    };

	    List.prototype.push = function(/*...values*/) {
	      var values = arguments;
	      var oldSize = this.size;
	      return this.withMutations(function(list ) {
	        setListBounds(list, 0, oldSize + values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(oldSize + ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.pop = function() {
	      return setListBounds(this, 0, -1);
	    };

	    List.prototype.unshift = function(/*...values*/) {
	      var values = arguments;
	      return this.withMutations(function(list ) {
	        setListBounds(list, -values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.shift = function() {
	      return setListBounds(this, 1);
	    };

	    // @pragma Composition

	    List.prototype.merge = function(/*...iters*/) {
	      return mergeIntoListWith(this, undefined, arguments);
	    };

	    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, merger, iters);
	    };

	    List.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoListWith(this, deepMerger, arguments);
	    };

	    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, deepMergerWith(merger), iters);
	    };

	    List.prototype.setSize = function(size) {
	      return setListBounds(this, 0, size);
	    };

	    // @pragma Iteration

	    List.prototype.slice = function(begin, end) {
	      var size = this.size;
	      if (wholeSlice(begin, end, size)) {
	        return this;
	      }
	      return setListBounds(
	        this,
	        resolveBegin(begin, size),
	        resolveEnd(end, size)
	      );
	    };

	    List.prototype.__iterator = function(type, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      return new Iterator(function()  {
	        var value = values();
	        return value === DONE ?
	          iteratorDone() :
	          iteratorValue(type, index++, value);
	      });
	    };

	    List.prototype.__iterate = function(fn, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      var value;
	      while ((value = values()) !== DONE) {
	        if (fn(value, index++, this) === false) {
	          break;
	        }
	      }
	      return index;
	    };

	    List.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        return this;
	      }
	      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
	    };


	  function isList(maybeList) {
	    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
	  }

	  List.isList = isList;

	  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

	  var ListPrototype = List.prototype;
	  ListPrototype[IS_LIST_SENTINEL] = true;
	  ListPrototype[DELETE] = ListPrototype.remove;
	  ListPrototype.setIn = MapPrototype.setIn;
	  ListPrototype.deleteIn =
	  ListPrototype.removeIn = MapPrototype.removeIn;
	  ListPrototype.update = MapPrototype.update;
	  ListPrototype.updateIn = MapPrototype.updateIn;
	  ListPrototype.mergeIn = MapPrototype.mergeIn;
	  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  ListPrototype.withMutations = MapPrototype.withMutations;
	  ListPrototype.asMutable = MapPrototype.asMutable;
	  ListPrototype.asImmutable = MapPrototype.asImmutable;
	  ListPrototype.wasAltered = MapPrototype.wasAltered;



	    function VNode(array, ownerID) {
	      this.array = array;
	      this.ownerID = ownerID;
	    }

	    // TODO: seems like these methods are very similar

	    VNode.prototype.removeBefore = function(ownerID, level, index) {
	      if (index === level ? 1 << level : 0 || this.array.length === 0) {
	        return this;
	      }
	      var originIndex = (index >>> level) & MASK;
	      if (originIndex >= this.array.length) {
	        return new VNode([], ownerID);
	      }
	      var removingFirst = originIndex === 0;
	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[originIndex];
	        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && removingFirst) {
	          return this;
	        }
	      }
	      if (removingFirst && !newChild) {
	        return this;
	      }
	      var editable = editableVNode(this, ownerID);
	      if (!removingFirst) {
	        for (var ii = 0; ii < originIndex; ii++) {
	          editable.array[ii] = undefined;
	        }
	      }
	      if (newChild) {
	        editable.array[originIndex] = newChild;
	      }
	      return editable;
	    };

	    VNode.prototype.removeAfter = function(ownerID, level, index) {
	      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
	        return this;
	      }
	      var sizeIndex = ((index - 1) >>> level) & MASK;
	      if (sizeIndex >= this.array.length) {
	        return this;
	      }

	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[sizeIndex];
	        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
	          return this;
	        }
	      }

	      var editable = editableVNode(this, ownerID);
	      editable.array.splice(sizeIndex + 1);
	      if (newChild) {
	        editable.array[sizeIndex] = newChild;
	      }
	      return editable;
	    };



	  var DONE = {};

	  function iterateList(list, reverse) {
	    var left = list._origin;
	    var right = list._capacity;
	    var tailPos = getTailOffset(right);
	    var tail = list._tail;

	    return iterateNodeOrLeaf(list._root, list._level, 0);

	    function iterateNodeOrLeaf(node, level, offset) {
	      return level === 0 ?
	        iterateLeaf(node, offset) :
	        iterateNode(node, level, offset);
	    }

	    function iterateLeaf(node, offset) {
	      var array = offset === tailPos ? tail && tail.array : node && node.array;
	      var from = offset > left ? 0 : left - offset;
	      var to = right - offset;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        if (from === to) {
	          return DONE;
	        }
	        var idx = reverse ? --to : from++;
	        return array && array[idx];
	      };
	    }

	    function iterateNode(node, level, offset) {
	      var values;
	      var array = node && node.array;
	      var from = offset > left ? 0 : (left - offset) >> level;
	      var to = ((right - offset) >> level) + 1;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        do {
	          if (values) {
	            var value = values();
	            if (value !== DONE) {
	              return value;
	            }
	            values = null;
	          }
	          if (from === to) {
	            return DONE;
	          }
	          var idx = reverse ? --to : from++;
	          values = iterateNodeOrLeaf(
	            array && array[idx], level - SHIFT, offset + (idx << level)
	          );
	        } while (true);
	      };
	    }
	  }

	  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
	    var list = Object.create(ListPrototype);
	    list.size = capacity - origin;
	    list._origin = origin;
	    list._capacity = capacity;
	    list._level = level;
	    list._root = root;
	    list._tail = tail;
	    list.__ownerID = ownerID;
	    list.__hash = hash;
	    list.__altered = false;
	    return list;
	  }

	  var EMPTY_LIST;
	  function emptyList() {
	    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
	  }

	  function updateList(list, index, value) {
	    index = wrapIndex(list, index);

	    if (index !== index) {
	      return list;
	    }

	    if (index >= list.size || index < 0) {
	      return list.withMutations(function(list ) {
	        index < 0 ?
	          setListBounds(list, index).set(0, value) :
	          setListBounds(list, 0, index + 1).set(index, value)
	      });
	    }

	    index += list._origin;

	    var newTail = list._tail;
	    var newRoot = list._root;
	    var didAlter = MakeRef(DID_ALTER);
	    if (index >= getTailOffset(list._capacity)) {
	      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
	    } else {
	      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
	    }

	    if (!didAlter.value) {
	      return list;
	    }

	    if (list.__ownerID) {
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
	  }

	  function updateVNode(node, ownerID, level, index, value, didAlter) {
	    var idx = (index >>> level) & MASK;
	    var nodeHas = node && idx < node.array.length;
	    if (!nodeHas && value === undefined) {
	      return node;
	    }

	    var newNode;

	    if (level > 0) {
	      var lowerNode = node && node.array[idx];
	      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
	      if (newLowerNode === lowerNode) {
	        return node;
	      }
	      newNode = editableVNode(node, ownerID);
	      newNode.array[idx] = newLowerNode;
	      return newNode;
	    }

	    if (nodeHas && node.array[idx] === value) {
	      return node;
	    }

	    SetRef(didAlter);

	    newNode = editableVNode(node, ownerID);
	    if (value === undefined && idx === newNode.array.length - 1) {
	      newNode.array.pop();
	    } else {
	      newNode.array[idx] = value;
	    }
	    return newNode;
	  }

	  function editableVNode(node, ownerID) {
	    if (ownerID && node && ownerID === node.ownerID) {
	      return node;
	    }
	    return new VNode(node ? node.array.slice() : [], ownerID);
	  }

	  function listNodeFor(list, rawIndex) {
	    if (rawIndex >= getTailOffset(list._capacity)) {
	      return list._tail;
	    }
	    if (rawIndex < 1 << (list._level + SHIFT)) {
	      var node = list._root;
	      var level = list._level;
	      while (node && level > 0) {
	        node = node.array[(rawIndex >>> level) & MASK];
	        level -= SHIFT;
	      }
	      return node;
	    }
	  }

	  function setListBounds(list, begin, end) {
	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      end = end | 0;
	    }
	    var owner = list.__ownerID || new OwnerID();
	    var oldOrigin = list._origin;
	    var oldCapacity = list._capacity;
	    var newOrigin = oldOrigin + begin;
	    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
	    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
	      return list;
	    }

	    // If it's going to end after it starts, it's empty.
	    if (newOrigin >= newCapacity) {
	      return list.clear();
	    }

	    var newLevel = list._level;
	    var newRoot = list._root;

	    // New origin might need creating a higher root.
	    var offsetShift = 0;
	    while (newOrigin + offsetShift < 0) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
	      newLevel += SHIFT;
	      offsetShift += 1 << newLevel;
	    }
	    if (offsetShift) {
	      newOrigin += offsetShift;
	      oldOrigin += offsetShift;
	      newCapacity += offsetShift;
	      oldCapacity += offsetShift;
	    }

	    var oldTailOffset = getTailOffset(oldCapacity);
	    var newTailOffset = getTailOffset(newCapacity);

	    // New size might need creating a higher root.
	    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
	      newLevel += SHIFT;
	    }

	    // Locate or create the new tail.
	    var oldTail = list._tail;
	    var newTail = newTailOffset < oldTailOffset ?
	      listNodeFor(list, newCapacity - 1) :
	      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

	    // Merge Tail into tree.
	    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
	      newRoot = editableVNode(newRoot, owner);
	      var node = newRoot;
	      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
	        var idx = (oldTailOffset >>> level) & MASK;
	        node = node.array[idx] = editableVNode(node.array[idx], owner);
	      }
	      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
	    }

	    // If the size has been reduced, there's a chance the tail needs to be trimmed.
	    if (newCapacity < oldCapacity) {
	      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
	    }

	    // If the new origin is within the tail, then we do not need a root.
	    if (newOrigin >= newTailOffset) {
	      newOrigin -= newTailOffset;
	      newCapacity -= newTailOffset;
	      newLevel = SHIFT;
	      newRoot = null;
	      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

	    // Otherwise, if the root has been trimmed, garbage collect.
	    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
	      offsetShift = 0;

	      // Identify the new top root node of the subtree of the old root.
	      while (newRoot) {
	        var beginIndex = (newOrigin >>> newLevel) & MASK;
	        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
	          break;
	        }
	        if (beginIndex) {
	          offsetShift += (1 << newLevel) * beginIndex;
	        }
	        newLevel -= SHIFT;
	        newRoot = newRoot.array[beginIndex];
	      }

	      // Trim the new sides of the new root.
	      if (newRoot && newOrigin > oldOrigin) {
	        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
	      }
	      if (newRoot && newTailOffset < oldTailOffset) {
	        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
	      }
	      if (offsetShift) {
	        newOrigin -= offsetShift;
	        newCapacity -= offsetShift;
	      }
	    }

	    if (list.__ownerID) {
	      list.size = newCapacity - newOrigin;
	      list._origin = newOrigin;
	      list._capacity = newCapacity;
	      list._level = newLevel;
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
	  }

	  function mergeIntoListWith(list, merger, iterables) {
	    var iters = [];
	    var maxSize = 0;
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = IndexedIterable(value);
	      if (iter.size > maxSize) {
	        maxSize = iter.size;
	      }
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    if (maxSize > list.size) {
	      list = list.setSize(maxSize);
	    }
	    return mergeIntoCollectionWith(list, merger, iters);
	  }

	  function getTailOffset(size) {
	    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
	  }

	  createClass(OrderedMap, Map);

	    // @pragma Construction

	    function OrderedMap(value) {
	      return value === null || value === undefined ? emptyOrderedMap() :
	        isOrderedMap(value) ? value :
	        emptyOrderedMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    OrderedMap.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedMap.prototype.toString = function() {
	      return this.__toString('OrderedMap {', '}');
	    };

	    // @pragma Access

	    OrderedMap.prototype.get = function(k, notSetValue) {
	      var index = this._map.get(k);
	      return index !== undefined ? this._list.get(index)[1] : notSetValue;
	    };

	    // @pragma Modification

	    OrderedMap.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._map.clear();
	        this._list.clear();
	        return this;
	      }
	      return emptyOrderedMap();
	    };

	    OrderedMap.prototype.set = function(k, v) {
	      return updateOrderedMap(this, k, v);
	    };

	    OrderedMap.prototype.remove = function(k) {
	      return updateOrderedMap(this, k, NOT_SET);
	    };

	    OrderedMap.prototype.wasAltered = function() {
	      return this._map.wasAltered() || this._list.wasAltered();
	    };

	    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._list.__iterate(
	        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
	        reverse
	      );
	    };

	    OrderedMap.prototype.__iterator = function(type, reverse) {
	      return this._list.fromEntrySeq().__iterator(type, reverse);
	    };

	    OrderedMap.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      var newList = this._list.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        this._list = newList;
	        return this;
	      }
	      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
	    };


	  function isOrderedMap(maybeOrderedMap) {
	    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
	  }

	  OrderedMap.isOrderedMap = isOrderedMap;

	  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
	  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



	  function makeOrderedMap(map, list, ownerID, hash) {
	    var omap = Object.create(OrderedMap.prototype);
	    omap.size = map ? map.size : 0;
	    omap._map = map;
	    omap._list = list;
	    omap.__ownerID = ownerID;
	    omap.__hash = hash;
	    return omap;
	  }

	  var EMPTY_ORDERED_MAP;
	  function emptyOrderedMap() {
	    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
	  }

	  function updateOrderedMap(omap, k, v) {
	    var map = omap._map;
	    var list = omap._list;
	    var i = map.get(k);
	    var has = i !== undefined;
	    var newMap;
	    var newList;
	    if (v === NOT_SET) { // removed
	      if (!has) {
	        return omap;
	      }
	      if (list.size >= SIZE && list.size >= map.size * 2) {
	        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
	        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
	        if (omap.__ownerID) {
	          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
	        }
	      } else {
	        newMap = map.remove(k);
	        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
	      }
	    } else {
	      if (has) {
	        if (v === list.get(i)[1]) {
	          return omap;
	        }
	        newMap = map;
	        newList = list.set(i, [k, v]);
	      } else {
	        newMap = map.set(k, list.size);
	        newList = list.set(list.size, [k, v]);
	      }
	    }
	    if (omap.__ownerID) {
	      omap.size = newMap.size;
	      omap._map = newMap;
	      omap._list = newList;
	      omap.__hash = undefined;
	      return omap;
	    }
	    return makeOrderedMap(newMap, newList);
	  }

	  createClass(ToKeyedSequence, KeyedSeq);
	    function ToKeyedSequence(indexed, useKeys) {
	      this._iter = indexed;
	      this._useKeys = useKeys;
	      this.size = indexed.size;
	    }

	    ToKeyedSequence.prototype.get = function(key, notSetValue) {
	      return this._iter.get(key, notSetValue);
	    };

	    ToKeyedSequence.prototype.has = function(key) {
	      return this._iter.has(key);
	    };

	    ToKeyedSequence.prototype.valueSeq = function() {
	      return this._iter.valueSeq();
	    };

	    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
	      var reversedSequence = reverseFactory(this, true);
	      if (!this._useKeys) {
	        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
	      }
	      return reversedSequence;
	    };

	    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
	      var mappedSequence = mapFactory(this, mapper, context);
	      if (!this._useKeys) {
	        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
	      }
	      return mappedSequence;
	    };

	    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var ii;
	      return this._iter.__iterate(
	        this._useKeys ?
	          function(v, k)  {return fn(v, k, this$0)} :
	          ((ii = reverse ? resolveSize(this) : 0),
	            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
	        reverse
	      );
	    };

	    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
	      if (this._useKeys) {
	        return this._iter.__iterator(type, reverse);
	      }
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var ii = reverse ? resolveSize(this) : 0;
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
	      });
	    };

	  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(ToIndexedSequence, IndexedSeq);
	    function ToIndexedSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToIndexedSequence.prototype.includes = function(value) {
	      return this._iter.includes(value);
	    };

	    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
	    };

	    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, iterations++, step.value, step)
	      });
	    };



	  createClass(ToSetSequence, SetSeq);
	    function ToSetSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToSetSequence.prototype.has = function(key) {
	      return this._iter.includes(key);
	    };

	    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
	    };

	    ToSetSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, step.value, step.value, step);
	      });
	    };



	  createClass(FromEntriesSequence, KeyedSeq);
	    function FromEntriesSequence(entries) {
	      this._iter = entries;
	      this.size = entries.size;
	    }

	    FromEntriesSequence.prototype.entrySeq = function() {
	      return this._iter.toSeq();
	    };

	    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(entry ) {
	        // Check if entry exists first so array access doesn't throw for holes
	        // in the parent iteration.
	        if (entry) {
	          validateEntry(entry);
	          var indexedIterable = isIterable(entry);
	          return fn(
	            indexedIterable ? entry.get(1) : entry[1],
	            indexedIterable ? entry.get(0) : entry[0],
	            this$0
	          );
	        }
	      }, reverse);
	    };

	    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          // Check if entry exists first so array access doesn't throw for holes
	          // in the parent iteration.
	          if (entry) {
	            validateEntry(entry);
	            var indexedIterable = isIterable(entry);
	            return iteratorValue(
	              type,
	              indexedIterable ? entry.get(0) : entry[0],
	              indexedIterable ? entry.get(1) : entry[1],
	              step
	            );
	          }
	        }
	      });
	    };


	  ToIndexedSequence.prototype.cacheResult =
	  ToKeyedSequence.prototype.cacheResult =
	  ToSetSequence.prototype.cacheResult =
	  FromEntriesSequence.prototype.cacheResult =
	    cacheResultThrough;


	  function flipFactory(iterable) {
	    var flipSequence = makeSequence(iterable);
	    flipSequence._iter = iterable;
	    flipSequence.size = iterable.size;
	    flipSequence.flip = function()  {return iterable};
	    flipSequence.reverse = function () {
	      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
	      reversedSequence.flip = function()  {return iterable.reverse()};
	      return reversedSequence;
	    };
	    flipSequence.has = function(key ) {return iterable.includes(key)};
	    flipSequence.includes = function(key ) {return iterable.has(key)};
	    flipSequence.cacheResult = cacheResultThrough;
	    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
	    }
	    flipSequence.__iteratorUncached = function(type, reverse) {
	      if (type === ITERATE_ENTRIES) {
	        var iterator = iterable.__iterator(type, reverse);
	        return new Iterator(function()  {
	          var step = iterator.next();
	          if (!step.done) {
	            var k = step.value[0];
	            step.value[0] = step.value[1];
	            step.value[1] = k;
	          }
	          return step;
	        });
	      }
	      return iterable.__iterator(
	        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
	        reverse
	      );
	    }
	    return flipSequence;
	  }


	  function mapFactory(iterable, mapper, context) {
	    var mappedSequence = makeSequence(iterable);
	    mappedSequence.size = iterable.size;
	    mappedSequence.has = function(key ) {return iterable.has(key)};
	    mappedSequence.get = function(key, notSetValue)  {
	      var v = iterable.get(key, NOT_SET);
	      return v === NOT_SET ?
	        notSetValue :
	        mapper.call(context, v, key, iterable);
	    };
	    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(
	        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
	        reverse
	      );
	    }
	    mappedSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      return new Iterator(function()  {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var key = entry[0];
	        return iteratorValue(
	          type,
	          key,
	          mapper.call(context, entry[1], key, iterable),
	          step
	        );
	      });
	    }
	    return mappedSequence;
	  }


	  function reverseFactory(iterable, useKeys) {
	    var reversedSequence = makeSequence(iterable);
	    reversedSequence._iter = iterable;
	    reversedSequence.size = iterable.size;
	    reversedSequence.reverse = function()  {return iterable};
	    if (iterable.flip) {
	      reversedSequence.flip = function () {
	        var flipSequence = flipFactory(iterable);
	        flipSequence.reverse = function()  {return iterable.flip()};
	        return flipSequence;
	      };
	    }
	    reversedSequence.get = function(key, notSetValue) 
	      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
	    reversedSequence.has = function(key )
	      {return iterable.has(useKeys ? key : -1 - key)};
	    reversedSequence.includes = function(value ) {return iterable.includes(value)};
	    reversedSequence.cacheResult = cacheResultThrough;
	    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
	    };
	    reversedSequence.__iterator =
	      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
	    return reversedSequence;
	  }


	  function filterFactory(iterable, predicate, context, useKeys) {
	    var filterSequence = makeSequence(iterable);
	    if (useKeys) {
	      filterSequence.has = function(key ) {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
	      };
	      filterSequence.get = function(key, notSetValue)  {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
	          v : notSetValue;
	      };
	    }
	    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      }, reverse);
	      return iterations;
	    };
	    filterSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterations = 0;
	      return new Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          var key = entry[0];
	          var value = entry[1];
	          if (predicate.call(context, value, key, iterable)) {
	            return iteratorValue(type, useKeys ? key : iterations++, value, step);
	          }
	        }
	      });
	    }
	    return filterSequence;
	  }


	  function countByFactory(iterable, grouper, context) {
	    var groups = Map().asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        0,
	        function(a ) {return a + 1}
	      );
	    });
	    return groups.asImmutable();
	  }


	  function groupByFactory(iterable, grouper, context) {
	    var isKeyedIter = isKeyed(iterable);
	    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
	      );
	    });
	    var coerce = iterableClass(iterable);
	    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
	  }


	  function sliceFactory(iterable, begin, end, useKeys) {
	    var originalSize = iterable.size;

	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      if (end === Infinity) {
	        end = originalSize;
	      } else {
	        end = end | 0;
	      }
	    }

	    if (wholeSlice(begin, end, originalSize)) {
	      return iterable;
	    }

	    var resolvedBegin = resolveBegin(begin, originalSize);
	    var resolvedEnd = resolveEnd(end, originalSize);

	    // begin or end will be NaN if they were provided as negative numbers and
	    // this iterable's size is unknown. In that case, cache first so there is
	    // a known size and these do not resolve to NaN.
	    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
	      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
	    }

	    // Note: resolvedEnd is undefined when the original sequence's length is
	    // unknown and this slice did not supply an end and should contain all
	    // elements after resolvedBegin.
	    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
	    var resolvedSize = resolvedEnd - resolvedBegin;
	    var sliceSize;
	    if (resolvedSize === resolvedSize) {
	      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
	    }

	    var sliceSeq = makeSequence(iterable);

	    // If iterable.size is undefined, the size of the realized sliceSeq is
	    // unknown at this point unless the number of items to slice is 0
	    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

	    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
	      sliceSeq.get = function (index, notSetValue) {
	        index = wrapIndex(this, index);
	        return index >= 0 && index < sliceSize ?
	          iterable.get(index + resolvedBegin, notSetValue) :
	          notSetValue;
	      }
	    }

	    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (sliceSize === 0) {
	        return 0;
	      }
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var skipped = 0;
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k)  {
	        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
	                 iterations !== sliceSize;
	        }
	      });
	      return iterations;
	    };

	    sliceSeq.__iteratorUncached = function(type, reverse) {
	      if (sliceSize !== 0 && reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      // Don't bother instantiating parent iterator if taking 0.
	      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
	      var skipped = 0;
	      var iterations = 0;
	      return new Iterator(function()  {
	        while (skipped++ < resolvedBegin) {
	          iterator.next();
	        }
	        if (++iterations > sliceSize) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (useKeys || type === ITERATE_VALUES) {
	          return step;
	        } else if (type === ITERATE_KEYS) {
	          return iteratorValue(type, iterations - 1, undefined, step);
	        } else {
	          return iteratorValue(type, iterations - 1, step.value[1], step);
	        }
	      });
	    }

	    return sliceSeq;
	  }


	  function takeWhileFactory(iterable, predicate, context) {
	    var takeSequence = makeSequence(iterable);
	    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c) 
	        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
	      );
	      return iterations;
	    };
	    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterating = true;
	      return new Iterator(function()  {
	        if (!iterating) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var k = entry[0];
	        var v = entry[1];
	        if (!predicate.call(context, v, k, this$0)) {
	          iterating = false;
	          return iteratorDone();
	        }
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return takeSequence;
	  }


	  function skipWhileFactory(iterable, predicate, context, useKeys) {
	    var skipSequence = makeSequence(iterable);
	    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      });
	      return iterations;
	    };
	    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var skipping = true;
	      var iterations = 0;
	      return new Iterator(function()  {
	        var step, k, v;
	        do {
	          step = iterator.next();
	          if (step.done) {
	            if (useKeys || type === ITERATE_VALUES) {
	              return step;
	            } else if (type === ITERATE_KEYS) {
	              return iteratorValue(type, iterations++, undefined, step);
	            } else {
	              return iteratorValue(type, iterations++, step.value[1], step);
	            }
	          }
	          var entry = step.value;
	          k = entry[0];
	          v = entry[1];
	          skipping && (skipping = predicate.call(context, v, k, this$0));
	        } while (skipping);
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return skipSequence;
	  }


	  function concatFactory(iterable, values) {
	    var isKeyedIterable = isKeyed(iterable);
	    var iters = [iterable].concat(values).map(function(v ) {
	      if (!isIterable(v)) {
	        v = isKeyedIterable ?
	          keyedSeqFromValue(v) :
	          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
	      } else if (isKeyedIterable) {
	        v = KeyedIterable(v);
	      }
	      return v;
	    }).filter(function(v ) {return v.size !== 0});

	    if (iters.length === 0) {
	      return iterable;
	    }

	    if (iters.length === 1) {
	      var singleton = iters[0];
	      if (singleton === iterable ||
	          isKeyedIterable && isKeyed(singleton) ||
	          isIndexed(iterable) && isIndexed(singleton)) {
	        return singleton;
	      }
	    }

	    var concatSeq = new ArraySeq(iters);
	    if (isKeyedIterable) {
	      concatSeq = concatSeq.toKeyedSeq();
	    } else if (!isIndexed(iterable)) {
	      concatSeq = concatSeq.toSetSeq();
	    }
	    concatSeq = concatSeq.flatten(true);
	    concatSeq.size = iters.reduce(
	      function(sum, seq)  {
	        if (sum !== undefined) {
	          var size = seq.size;
	          if (size !== undefined) {
	            return sum + size;
	          }
	        }
	      },
	      0
	    );
	    return concatSeq;
	  }


	  function flattenFactory(iterable, depth, useKeys) {
	    var flatSequence = makeSequence(iterable);
	    flatSequence.__iterateUncached = function(fn, reverse) {
	      var iterations = 0;
	      var stopped = false;
	      function flatDeep(iter, currentDepth) {var this$0 = this;
	        iter.__iterate(function(v, k)  {
	          if ((!depth || currentDepth < depth) && isIterable(v)) {
	            flatDeep(v, currentDepth + 1);
	          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
	            stopped = true;
	          }
	          return !stopped;
	        }, reverse);
	      }
	      flatDeep(iterable, 0);
	      return iterations;
	    }
	    flatSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(type, reverse);
	      var stack = [];
	      var iterations = 0;
	      return new Iterator(function()  {
	        while (iterator) {
	          var step = iterator.next();
	          if (step.done !== false) {
	            iterator = stack.pop();
	            continue;
	          }
	          var v = step.value;
	          if (type === ITERATE_ENTRIES) {
	            v = v[1];
	          }
	          if ((!depth || stack.length < depth) && isIterable(v)) {
	            stack.push(iterator);
	            iterator = v.__iterator(type, reverse);
	          } else {
	            return useKeys ? step : iteratorValue(type, iterations++, v, step);
	          }
	        }
	        return iteratorDone();
	      });
	    }
	    return flatSequence;
	  }


	  function flatMapFactory(iterable, mapper, context) {
	    var coerce = iterableClass(iterable);
	    return iterable.toSeq().map(
	      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
	    ).flatten(true);
	  }


	  function interposeFactory(iterable, separator) {
	    var interposedSequence = makeSequence(iterable);
	    interposedSequence.size = iterable.size && iterable.size * 2 -1;
	    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k) 
	        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
	        fn(v, iterations++, this$0) !== false},
	        reverse
	      );
	      return iterations;
	    };
	    interposedSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      var step;
	      return new Iterator(function()  {
	        if (!step || iterations % 2) {
	          step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	        }
	        return iterations % 2 ?
	          iteratorValue(type, iterations++, separator) :
	          iteratorValue(type, iterations++, step.value, step);
	      });
	    };
	    return interposedSequence;
	  }


	  function sortFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    var isKeyedIterable = isKeyed(iterable);
	    var index = 0;
	    var entries = iterable.toSeq().map(
	      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
	    ).toArray();
	    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
	      isKeyedIterable ?
	      function(v, i)  { entries[i].length = 2; } :
	      function(v, i)  { entries[i] = v[1]; }
	    );
	    return isKeyedIterable ? KeyedSeq(entries) :
	      isIndexed(iterable) ? IndexedSeq(entries) :
	      SetSeq(entries);
	  }


	  function maxFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    if (mapper) {
	      var entry = iterable.toSeq()
	        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
	        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
	      return entry && entry[0];
	    } else {
	      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
	    }
	  }

	  function maxCompare(comparator, a, b) {
	    var comp = comparator(b, a);
	    // b is considered the new max if the comparator declares them equal, but
	    // they are not equal and b is in fact a nullish value.
	    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
	  }


	  function zipWithFactory(keyIter, zipper, iters) {
	    var zipSequence = makeSequence(keyIter);
	    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
	    // Note: this a generic base implementation of __iterate in terms of
	    // __iterator which may be more generically useful in the future.
	    zipSequence.__iterate = function(fn, reverse) {
	      /* generic:
	      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        iterations++;
	        if (fn(step.value[1], step.value[0], this) === false) {
	          break;
	        }
	      }
	      return iterations;
	      */
	      // indexed:
	      var iterator = this.__iterator(ITERATE_VALUES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        if (fn(step.value, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };
	    zipSequence.__iteratorUncached = function(type, reverse) {
	      var iterators = iters.map(function(i )
	        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
	      );
	      var iterations = 0;
	      var isDone = false;
	      return new Iterator(function()  {
	        var steps;
	        if (!isDone) {
	          steps = iterators.map(function(i ) {return i.next()});
	          isDone = steps.some(function(s ) {return s.done});
	        }
	        if (isDone) {
	          return iteratorDone();
	        }
	        return iteratorValue(
	          type,
	          iterations++,
	          zipper.apply(null, steps.map(function(s ) {return s.value}))
	        );
	      });
	    };
	    return zipSequence
	  }


	  // #pragma Helper Functions

	  function reify(iter, seq) {
	    return isSeq(iter) ? seq : iter.constructor(seq);
	  }

	  function validateEntry(entry) {
	    if (entry !== Object(entry)) {
	      throw new TypeError('Expected [K, V] tuple: ' + entry);
	    }
	  }

	  function resolveSize(iter) {
	    assertNotInfinite(iter.size);
	    return ensureSize(iter);
	  }

	  function iterableClass(iterable) {
	    return isKeyed(iterable) ? KeyedIterable :
	      isIndexed(iterable) ? IndexedIterable :
	      SetIterable;
	  }

	  function makeSequence(iterable) {
	    return Object.create(
	      (
	        isKeyed(iterable) ? KeyedSeq :
	        isIndexed(iterable) ? IndexedSeq :
	        SetSeq
	      ).prototype
	    );
	  }

	  function cacheResultThrough() {
	    if (this._iter.cacheResult) {
	      this._iter.cacheResult();
	      this.size = this._iter.size;
	      return this;
	    } else {
	      return Seq.prototype.cacheResult.call(this);
	    }
	  }

	  function defaultComparator(a, b) {
	    return a > b ? 1 : a < b ? -1 : 0;
	  }

	  function forceIterator(keyPath) {
	    var iter = getIterator(keyPath);
	    if (!iter) {
	      // Array might not be iterable in this environment, so we need a fallback
	      // to our wrapped type.
	      if (!isArrayLike(keyPath)) {
	        throw new TypeError('Expected iterable or array-like: ' + keyPath);
	      }
	      iter = getIterator(Iterable(keyPath));
	    }
	    return iter;
	  }

	  createClass(Record, KeyedCollection);

	    function Record(defaultValues, name) {
	      var hasInitialized;

	      var RecordType = function Record(values) {
	        if (values instanceof RecordType) {
	          return values;
	        }
	        if (!(this instanceof RecordType)) {
	          return new RecordType(values);
	        }
	        if (!hasInitialized) {
	          hasInitialized = true;
	          var keys = Object.keys(defaultValues);
	          setProps(RecordTypePrototype, keys);
	          RecordTypePrototype.size = keys.length;
	          RecordTypePrototype._name = name;
	          RecordTypePrototype._keys = keys;
	          RecordTypePrototype._defaultValues = defaultValues;
	        }
	        this._map = Map(values);
	      };

	      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
	      RecordTypePrototype.constructor = RecordType;

	      return RecordType;
	    }

	    Record.prototype.toString = function() {
	      return this.__toString(recordName(this) + ' {', '}');
	    };

	    // @pragma Access

	    Record.prototype.has = function(k) {
	      return this._defaultValues.hasOwnProperty(k);
	    };

	    Record.prototype.get = function(k, notSetValue) {
	      if (!this.has(k)) {
	        return notSetValue;
	      }
	      var defaultVal = this._defaultValues[k];
	      return this._map ? this._map.get(k, defaultVal) : defaultVal;
	    };

	    // @pragma Modification

	    Record.prototype.clear = function() {
	      if (this.__ownerID) {
	        this._map && this._map.clear();
	        return this;
	      }
	      var RecordType = this.constructor;
	      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
	    };

	    Record.prototype.set = function(k, v) {
	      if (!this.has(k)) {
	        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
	      }
	      if (this._map && !this._map.has(k)) {
	        var defaultVal = this._defaultValues[k];
	        if (v === defaultVal) {
	          return this;
	        }
	      }
	      var newMap = this._map && this._map.set(k, v);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.remove = function(k) {
	      if (!this.has(k)) {
	        return this;
	      }
	      var newMap = this._map && this._map.remove(k);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
	    };

	    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
	    };

	    Record.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map && this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return makeRecord(this, newMap, ownerID);
	    };


	  var RecordPrototype = Record.prototype;
	  RecordPrototype[DELETE] = RecordPrototype.remove;
	  RecordPrototype.deleteIn =
	  RecordPrototype.removeIn = MapPrototype.removeIn;
	  RecordPrototype.merge = MapPrototype.merge;
	  RecordPrototype.mergeWith = MapPrototype.mergeWith;
	  RecordPrototype.mergeIn = MapPrototype.mergeIn;
	  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
	  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
	  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  RecordPrototype.setIn = MapPrototype.setIn;
	  RecordPrototype.update = MapPrototype.update;
	  RecordPrototype.updateIn = MapPrototype.updateIn;
	  RecordPrototype.withMutations = MapPrototype.withMutations;
	  RecordPrototype.asMutable = MapPrototype.asMutable;
	  RecordPrototype.asImmutable = MapPrototype.asImmutable;


	  function makeRecord(likeRecord, map, ownerID) {
	    var record = Object.create(Object.getPrototypeOf(likeRecord));
	    record._map = map;
	    record.__ownerID = ownerID;
	    return record;
	  }

	  function recordName(record) {
	    return record._name || record.constructor.name || 'Record';
	  }

	  function setProps(prototype, names) {
	    try {
	      names.forEach(setProp.bind(undefined, prototype));
	    } catch (error) {
	      // Object.defineProperty failed. Probably IE8.
	    }
	  }

	  function setProp(prototype, name) {
	    Object.defineProperty(prototype, name, {
	      get: function() {
	        return this.get(name);
	      },
	      set: function(value) {
	        invariant(this.__ownerID, 'Cannot set on an immutable record.');
	        this.set(name, value);
	      }
	    });
	  }

	  createClass(Set, SetCollection);

	    // @pragma Construction

	    function Set(value) {
	      return value === null || value === undefined ? emptySet() :
	        isSet(value) && !isOrdered(value) ? value :
	        emptySet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    Set.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    Set.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    Set.prototype.toString = function() {
	      return this.__toString('Set {', '}');
	    };

	    // @pragma Access

	    Set.prototype.has = function(value) {
	      return this._map.has(value);
	    };

	    // @pragma Modification

	    Set.prototype.add = function(value) {
	      return updateSet(this, this._map.set(value, true));
	    };

	    Set.prototype.remove = function(value) {
	      return updateSet(this, this._map.remove(value));
	    };

	    Set.prototype.clear = function() {
	      return updateSet(this, this._map.clear());
	    };

	    // @pragma Composition

	    Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
	      iters = iters.filter(function(x ) {return x.size !== 0});
	      if (iters.length === 0) {
	        return this;
	      }
	      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
	        return this.constructor(iters[0]);
	      }
	      return this.withMutations(function(set ) {
	        for (var ii = 0; ii < iters.length; ii++) {
	          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
	        }
	      });
	    };

	    Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (!iters.every(function(iter ) {return iter.includes(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (iters.some(function(iter ) {return iter.includes(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    Set.prototype.merge = function() {
	      return this.union.apply(this, arguments);
	    };

	    Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return this.union.apply(this, iters);
	    };

	    Set.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator));
	    };

	    Set.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator, mapper));
	    };

	    Set.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
	    };

	    Set.prototype.__iterator = function(type, reverse) {
	      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
	    };

	    Set.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return this.__make(newMap, ownerID);
	    };


	  function isSet(maybeSet) {
	    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
	  }

	  Set.isSet = isSet;

	  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

	  var SetPrototype = Set.prototype;
	  SetPrototype[IS_SET_SENTINEL] = true;
	  SetPrototype[DELETE] = SetPrototype.remove;
	  SetPrototype.mergeDeep = SetPrototype.merge;
	  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
	  SetPrototype.withMutations = MapPrototype.withMutations;
	  SetPrototype.asMutable = MapPrototype.asMutable;
	  SetPrototype.asImmutable = MapPrototype.asImmutable;

	  SetPrototype.__empty = emptySet;
	  SetPrototype.__make = makeSet;

	  function updateSet(set, newMap) {
	    if (set.__ownerID) {
	      set.size = newMap.size;
	      set._map = newMap;
	      return set;
	    }
	    return newMap === set._map ? set :
	      newMap.size === 0 ? set.__empty() :
	      set.__make(newMap);
	  }

	  function makeSet(map, ownerID) {
	    var set = Object.create(SetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_SET;
	  function emptySet() {
	    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
	  }

	  createClass(OrderedSet, Set);

	    // @pragma Construction

	    function OrderedSet(value) {
	      return value === null || value === undefined ? emptyOrderedSet() :
	        isOrderedSet(value) ? value :
	        emptyOrderedSet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    OrderedSet.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedSet.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    OrderedSet.prototype.toString = function() {
	      return this.__toString('OrderedSet {', '}');
	    };


	  function isOrderedSet(maybeOrderedSet) {
	    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
	  }

	  OrderedSet.isOrderedSet = isOrderedSet;

	  var OrderedSetPrototype = OrderedSet.prototype;
	  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

	  OrderedSetPrototype.__empty = emptyOrderedSet;
	  OrderedSetPrototype.__make = makeOrderedSet;

	  function makeOrderedSet(map, ownerID) {
	    var set = Object.create(OrderedSetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_ORDERED_SET;
	  function emptyOrderedSet() {
	    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
	  }

	  createClass(Stack, IndexedCollection);

	    // @pragma Construction

	    function Stack(value) {
	      return value === null || value === undefined ? emptyStack() :
	        isStack(value) ? value :
	        emptyStack().unshiftAll(value);
	    }

	    Stack.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    Stack.prototype.toString = function() {
	      return this.__toString('Stack [', ']');
	    };

	    // @pragma Access

	    Stack.prototype.get = function(index, notSetValue) {
	      var head = this._head;
	      index = wrapIndex(this, index);
	      while (head && index--) {
	        head = head.next;
	      }
	      return head ? head.value : notSetValue;
	    };

	    Stack.prototype.peek = function() {
	      return this._head && this._head.value;
	    };

	    // @pragma Modification

	    Stack.prototype.push = function(/*...values*/) {
	      if (arguments.length === 0) {
	        return this;
	      }
	      var newSize = this.size + arguments.length;
	      var head = this._head;
	      for (var ii = arguments.length - 1; ii >= 0; ii--) {
	        head = {
	          value: arguments[ii],
	          next: head
	        };
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pushAll = function(iter) {
	      iter = IndexedIterable(iter);
	      if (iter.size === 0) {
	        return this;
	      }
	      assertNotInfinite(iter.size);
	      var newSize = this.size;
	      var head = this._head;
	      iter.reverse().forEach(function(value ) {
	        newSize++;
	        head = {
	          value: value,
	          next: head
	        };
	      });
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pop = function() {
	      return this.slice(1);
	    };

	    Stack.prototype.unshift = function(/*...values*/) {
	      return this.push.apply(this, arguments);
	    };

	    Stack.prototype.unshiftAll = function(iter) {
	      return this.pushAll(iter);
	    };

	    Stack.prototype.shift = function() {
	      return this.pop.apply(this, arguments);
	    };

	    Stack.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._head = undefined;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyStack();
	    };

	    Stack.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      var resolvedBegin = resolveBegin(begin, this.size);
	      var resolvedEnd = resolveEnd(end, this.size);
	      if (resolvedEnd !== this.size) {
	        // super.slice(begin, end);
	        return IndexedCollection.prototype.slice.call(this, begin, end);
	      }
	      var newSize = this.size - resolvedBegin;
	      var head = this._head;
	      while (resolvedBegin--) {
	        head = head.next;
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    // @pragma Mutability

	    Stack.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeStack(this.size, this._head, ownerID, this.__hash);
	    };

	    // @pragma Iteration

	    Stack.prototype.__iterate = function(fn, reverse) {
	      if (reverse) {
	        return this.reverse().__iterate(fn);
	      }
	      var iterations = 0;
	      var node = this._head;
	      while (node) {
	        if (fn(node.value, iterations++, this) === false) {
	          break;
	        }
	        node = node.next;
	      }
	      return iterations;
	    };

	    Stack.prototype.__iterator = function(type, reverse) {
	      if (reverse) {
	        return this.reverse().__iterator(type);
	      }
	      var iterations = 0;
	      var node = this._head;
	      return new Iterator(function()  {
	        if (node) {
	          var value = node.value;
	          node = node.next;
	          return iteratorValue(type, iterations++, value);
	        }
	        return iteratorDone();
	      });
	    };


	  function isStack(maybeStack) {
	    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
	  }

	  Stack.isStack = isStack;

	  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

	  var StackPrototype = Stack.prototype;
	  StackPrototype[IS_STACK_SENTINEL] = true;
	  StackPrototype.withMutations = MapPrototype.withMutations;
	  StackPrototype.asMutable = MapPrototype.asMutable;
	  StackPrototype.asImmutable = MapPrototype.asImmutable;
	  StackPrototype.wasAltered = MapPrototype.wasAltered;


	  function makeStack(size, head, ownerID, hash) {
	    var map = Object.create(StackPrototype);
	    map.size = size;
	    map._head = head;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_STACK;
	  function emptyStack() {
	    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
	  }

	  /**
	   * Contributes additional methods to a constructor
	   */
	  function mixin(ctor, methods) {
	    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
	    Object.keys(methods).forEach(keyCopier);
	    Object.getOwnPropertySymbols &&
	      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
	    return ctor;
	  }

	  Iterable.Iterator = Iterator;

	  mixin(Iterable, {

	    // ### Conversion to other types

	    toArray: function() {
	      assertNotInfinite(this.size);
	      var array = new Array(this.size || 0);
	      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
	      return array;
	    },

	    toIndexedSeq: function() {
	      return new ToIndexedSequence(this);
	    },

	    toJS: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
	      ).__toJS();
	    },

	    toJSON: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
	      ).__toJS();
	    },

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, true);
	    },

	    toMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Map(this.toKeyedSeq());
	    },

	    toObject: function() {
	      assertNotInfinite(this.size);
	      var object = {};
	      this.__iterate(function(v, k)  { object[k] = v; });
	      return object;
	    },

	    toOrderedMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedMap(this.toKeyedSeq());
	    },

	    toOrderedSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Set(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSetSeq: function() {
	      return new ToSetSequence(this);
	    },

	    toSeq: function() {
	      return isIndexed(this) ? this.toIndexedSeq() :
	        isKeyed(this) ? this.toKeyedSeq() :
	        this.toSetSeq();
	    },

	    toStack: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Stack(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toList: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return List(isKeyed(this) ? this.valueSeq() : this);
	    },


	    // ### Common JavaScript methods and properties

	    toString: function() {
	      return '[Iterable]';
	    },

	    __toString: function(head, tail) {
	      if (this.size === 0) {
	        return head + tail;
	      }
	      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    concat: function() {var values = SLICE$0.call(arguments, 0);
	      return reify(this, concatFactory(this, values));
	    },

	    includes: function(searchValue) {
	      return this.some(function(value ) {return is(value, searchValue)});
	    },

	    entries: function() {
	      return this.__iterator(ITERATE_ENTRIES);
	    },

	    every: function(predicate, context) {
	      assertNotInfinite(this.size);
	      var returnValue = true;
	      this.__iterate(function(v, k, c)  {
	        if (!predicate.call(context, v, k, c)) {
	          returnValue = false;
	          return false;
	        }
	      });
	      return returnValue;
	    },

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, true));
	    },

	    find: function(predicate, context, notSetValue) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[1] : notSetValue;
	    },

	    forEach: function(sideEffect, context) {
	      assertNotInfinite(this.size);
	      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
	    },

	    join: function(separator) {
	      assertNotInfinite(this.size);
	      separator = separator !== undefined ? '' + separator : ',';
	      var joined = '';
	      var isFirst = true;
	      this.__iterate(function(v ) {
	        isFirst ? (isFirst = false) : (joined += separator);
	        joined += v !== null && v !== undefined ? v.toString() : '';
	      });
	      return joined;
	    },

	    keys: function() {
	      return this.__iterator(ITERATE_KEYS);
	    },

	    map: function(mapper, context) {
	      return reify(this, mapFactory(this, mapper, context));
	    },

	    reduce: function(reducer, initialReduction, context) {
	      assertNotInfinite(this.size);
	      var reduction;
	      var useFirst;
	      if (arguments.length < 2) {
	        useFirst = true;
	      } else {
	        reduction = initialReduction;
	      }
	      this.__iterate(function(v, k, c)  {
	        if (useFirst) {
	          useFirst = false;
	          reduction = v;
	        } else {
	          reduction = reducer.call(context, reduction, v, k, c);
	        }
	      });
	      return reduction;
	    },

	    reduceRight: function(reducer, initialReduction, context) {
	      var reversed = this.toKeyedSeq().reverse();
	      return reversed.reduce.apply(reversed, arguments);
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, true));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, true));
	    },

	    some: function(predicate, context) {
	      return !this.every(not(predicate), context);
	    },

	    sort: function(comparator) {
	      return reify(this, sortFactory(this, comparator));
	    },

	    values: function() {
	      return this.__iterator(ITERATE_VALUES);
	    },


	    // ### More sequential methods

	    butLast: function() {
	      return this.slice(0, -1);
	    },

	    isEmpty: function() {
	      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
	    },

	    count: function(predicate, context) {
	      return ensureSize(
	        predicate ? this.toSeq().filter(predicate, context) : this
	      );
	    },

	    countBy: function(grouper, context) {
	      return countByFactory(this, grouper, context);
	    },

	    equals: function(other) {
	      return deepEqual(this, other);
	    },

	    entrySeq: function() {
	      var iterable = this;
	      if (iterable._cache) {
	        // We cache as an entries array, so we can just return the cache!
	        return new ArraySeq(iterable._cache);
	      }
	      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
	      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
	      return entriesSequence;
	    },

	    filterNot: function(predicate, context) {
	      return this.filter(not(predicate), context);
	    },

	    findEntry: function(predicate, context, notSetValue) {
	      var found = notSetValue;
	      this.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          found = [k, v];
	          return false;
	        }
	      });
	      return found;
	    },

	    findKey: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry && entry[0];
	    },

	    findLast: function(predicate, context, notSetValue) {
	      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
	    },

	    findLastEntry: function(predicate, context, notSetValue) {
	      return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
	    },

	    findLastKey: function(predicate, context) {
	      return this.toKeyedSeq().reverse().findKey(predicate, context);
	    },

	    first: function() {
	      return this.find(returnTrue);
	    },

	    flatMap: function(mapper, context) {
	      return reify(this, flatMapFactory(this, mapper, context));
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, true));
	    },

	    fromEntrySeq: function() {
	      return new FromEntriesSequence(this);
	    },

	    get: function(searchKey, notSetValue) {
	      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
	    },

	    getIn: function(searchKeyPath, notSetValue) {
	      var nested = this;
	      // Note: in an ES6 environment, we would prefer:
	      // for (var key of searchKeyPath) {
	      var iter = forceIterator(searchKeyPath);
	      var step;
	      while (!(step = iter.next()).done) {
	        var key = step.value;
	        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
	        if (nested === NOT_SET) {
	          return notSetValue;
	        }
	      }
	      return nested;
	    },

	    groupBy: function(grouper, context) {
	      return groupByFactory(this, grouper, context);
	    },

	    has: function(searchKey) {
	      return this.get(searchKey, NOT_SET) !== NOT_SET;
	    },

	    hasIn: function(searchKeyPath) {
	      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
	    },

	    isSubset: function(iter) {
	      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
	      return this.every(function(value ) {return iter.includes(value)});
	    },

	    isSuperset: function(iter) {
	      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
	      return iter.isSubset(this);
	    },

	    keyOf: function(searchValue) {
	      return this.findKey(function(value ) {return is(value, searchValue)});
	    },

	    keySeq: function() {
	      return this.toSeq().map(keyMapper).toIndexedSeq();
	    },

	    last: function() {
	      return this.toSeq().reverse().first();
	    },

	    lastKeyOf: function(searchValue) {
	      return this.toKeyedSeq().reverse().keyOf(searchValue);
	    },

	    max: function(comparator) {
	      return maxFactory(this, comparator);
	    },

	    maxBy: function(mapper, comparator) {
	      return maxFactory(this, comparator, mapper);
	    },

	    min: function(comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
	    },

	    minBy: function(mapper, comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
	    },

	    rest: function() {
	      return this.slice(1);
	    },

	    skip: function(amount) {
	      return this.slice(Math.max(0, amount));
	    },

	    skipLast: function(amount) {
	      return reify(this, this.toSeq().reverse().skip(amount).reverse());
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, true));
	    },

	    skipUntil: function(predicate, context) {
	      return this.skipWhile(not(predicate), context);
	    },

	    sortBy: function(mapper, comparator) {
	      return reify(this, sortFactory(this, comparator, mapper));
	    },

	    take: function(amount) {
	      return this.slice(0, Math.max(0, amount));
	    },

	    takeLast: function(amount) {
	      return reify(this, this.toSeq().reverse().take(amount).reverse());
	    },

	    takeWhile: function(predicate, context) {
	      return reify(this, takeWhileFactory(this, predicate, context));
	    },

	    takeUntil: function(predicate, context) {
	      return this.takeWhile(not(predicate), context);
	    },

	    valueSeq: function() {
	      return this.toIndexedSeq();
	    },


	    // ### Hashable Object

	    hashCode: function() {
	      return this.__hash || (this.__hash = hashIterable(this));
	    }


	    // ### Internal

	    // abstract __iterate(fn, reverse)

	    // abstract __iterator(type, reverse)
	  });

	  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  var IterablePrototype = Iterable.prototype;
	  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
	  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
	  IterablePrototype.__toJS = IterablePrototype.toArray;
	  IterablePrototype.__toStringMapper = quoteString;
	  IterablePrototype.inspect =
	  IterablePrototype.toSource = function() { return this.toString(); };
	  IterablePrototype.chain = IterablePrototype.flatMap;
	  IterablePrototype.contains = IterablePrototype.includes;

	  mixin(KeyedIterable, {

	    // ### More sequential methods

	    flip: function() {
	      return reify(this, flipFactory(this));
	    },

	    mapEntries: function(mapper, context) {var this$0 = this;
	      var iterations = 0;
	      return reify(this,
	        this.toSeq().map(
	          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
	        ).fromEntrySeq()
	      );
	    },

	    mapKeys: function(mapper, context) {var this$0 = this;
	      return reify(this,
	        this.toSeq().flip().map(
	          function(k, v)  {return mapper.call(context, k, v, this$0)}
	        ).flip()
	      );
	    }

	  });

	  var KeyedIterablePrototype = KeyedIterable.prototype;
	  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
	  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
	  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
	  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



	  mixin(IndexedIterable, {

	    // ### Conversion to other types

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, false);
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, false));
	    },

	    findIndex: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[0] : -1;
	    },

	    indexOf: function(searchValue) {
	      var key = this.keyOf(searchValue);
	      return key === undefined ? -1 : key;
	    },

	    lastIndexOf: function(searchValue) {
	      var key = this.lastKeyOf(searchValue);
	      return key === undefined ? -1 : key;
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, false));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, false));
	    },

	    splice: function(index, removeNum /*, ...values*/) {
	      var numArgs = arguments.length;
	      removeNum = Math.max(removeNum | 0, 0);
	      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
	        return this;
	      }
	      // If index is negative, it should resolve relative to the size of the
	      // collection. However size may be expensive to compute if not cached, so
	      // only call count() if the number is in fact negative.
	      index = resolveBegin(index, index < 0 ? this.count() : this.size);
	      var spliced = this.slice(0, index);
	      return reify(
	        this,
	        numArgs === 1 ?
	          spliced :
	          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
	      );
	    },


	    // ### More collection methods

	    findLastIndex: function(predicate, context) {
	      var entry = this.findLastEntry(predicate, context);
	      return entry ? entry[0] : -1;
	    },

	    first: function() {
	      return this.get(0);
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, false));
	    },

	    get: function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      return (index < 0 || (this.size === Infinity ||
	          (this.size !== undefined && index > this.size))) ?
	        notSetValue :
	        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
	    },

	    has: function(index) {
	      index = wrapIndex(this, index);
	      return index >= 0 && (this.size !== undefined ?
	        this.size === Infinity || index < this.size :
	        this.indexOf(index) !== -1
	      );
	    },

	    interpose: function(separator) {
	      return reify(this, interposeFactory(this, separator));
	    },

	    interleave: function(/*...iterables*/) {
	      var iterables = [this].concat(arrCopy(arguments));
	      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
	      var interleaved = zipped.flatten(true);
	      if (zipped.size) {
	        interleaved.size = zipped.size * iterables.length;
	      }
	      return reify(this, interleaved);
	    },

	    keySeq: function() {
	      return Range(0, this.size);
	    },

	    last: function() {
	      return this.get(-1);
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, false));
	    },

	    zip: function(/*, ...iterables */) {
	      var iterables = [this].concat(arrCopy(arguments));
	      return reify(this, zipWithFactory(this, defaultZipper, iterables));
	    },

	    zipWith: function(zipper/*, ...iterables */) {
	      var iterables = arrCopy(arguments);
	      iterables[0] = this;
	      return reify(this, zipWithFactory(this, zipper, iterables));
	    }

	  });

	  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
	  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



	  mixin(SetIterable, {

	    // ### ES6 Collection methods (ES6 Array and Map)

	    get: function(value, notSetValue) {
	      return this.has(value) ? value : notSetValue;
	    },

	    includes: function(value) {
	      return this.has(value);
	    },


	    // ### More sequential methods

	    keySeq: function() {
	      return this.valueSeq();
	    }

	  });

	  SetIterable.prototype.has = IterablePrototype.includes;
	  SetIterable.prototype.contains = SetIterable.prototype.includes;


	  // Mixin subclasses

	  mixin(KeyedSeq, KeyedIterable.prototype);
	  mixin(IndexedSeq, IndexedIterable.prototype);
	  mixin(SetSeq, SetIterable.prototype);

	  mixin(KeyedCollection, KeyedIterable.prototype);
	  mixin(IndexedCollection, IndexedIterable.prototype);
	  mixin(SetCollection, SetIterable.prototype);


	  // #pragma Helper functions

	  function keyMapper(v, k) {
	    return k;
	  }

	  function entryMapper(v, k) {
	    return [k, v];
	  }

	  function not(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    }
	  }

	  function neg(predicate) {
	    return function() {
	      return -predicate.apply(this, arguments);
	    }
	  }

	  function quoteString(value) {
	    return typeof value === 'string' ? JSON.stringify(value) : String(value);
	  }

	  function defaultZipper() {
	    return arrCopy(arguments);
	  }

	  function defaultNegComparator(a, b) {
	    return a < b ? 1 : a > b ? -1 : 0;
	  }

	  function hashIterable(iterable) {
	    if (iterable.size === Infinity) {
	      return 0;
	    }
	    var ordered = isOrdered(iterable);
	    var keyed = isKeyed(iterable);
	    var h = ordered ? 1 : 0;
	    var size = iterable.__iterate(
	      keyed ?
	        ordered ?
	          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
	          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
	        ordered ?
	          function(v ) { h = 31 * h + hash(v) | 0; } :
	          function(v ) { h = h + hash(v) | 0; }
	    );
	    return murmurHashOfSize(size, h);
	  }

	  function murmurHashOfSize(size, h) {
	    h = imul(h, 0xCC9E2D51);
	    h = imul(h << 15 | h >>> -15, 0x1B873593);
	    h = imul(h << 13 | h >>> -13, 5);
	    h = (h + 0xE6546B64 | 0) ^ size;
	    h = imul(h ^ h >>> 16, 0x85EBCA6B);
	    h = imul(h ^ h >>> 13, 0xC2B2AE35);
	    h = smi(h ^ h >>> 16);
	    return h;
	  }

	  function hashMerge(a, b) {
	    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
	  }

	  var Immutable = {

	    Iterable: Iterable,

	    Seq: Seq,
	    Collection: Collection,
	    Map: Map,
	    OrderedMap: OrderedMap,
	    List: List,
	    Stack: Stack,
	    Set: Set,
	    OrderedSet: OrderedSet,

	    Record: Record,
	    Range: Range,
	    Repeat: Repeat,

	    is: is,
	    fromJS: fromJS

	  };

	  return Immutable;

	}));

/***/ },
/* 118 */
/***/ function(module, exports) {

	/**
	 * The code was extracted from:
	 * https://github.com/davidchambers/Base64.js
	 */

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function InvalidCharacterError(message) {
	  this.message = message;
	}

	InvalidCharacterError.prototype = new Error();
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	function polyfill (input) {
	  var str = String(input).replace(/=+$/, '');
	  if (str.length % 4 == 1) {
	    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
	  }
	  for (
	    // initialize result and counters
	    var bc = 0, bs, buffer, idx = 0, output = '';
	    // get next character
	    buffer = str.charAt(idx++);
	    // character found in table? initialize bit storage and add its ascii value;
	    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
	      // and if not first of each 4 characters,
	      // convert the first 8 bits to one ascii character
	      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
	  ) {
	    // try to find character in table (0-63, not found => -1)
	    buffer = chars.indexOf(buffer);
	  }
	  return output;
	}


	module.exports = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var atob = __webpack_require__(118);

	function b64DecodeUnicode(str) {
	  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
	    var code = p.charCodeAt(0).toString(16).toUpperCase();
	    if (code.length < 2) {
	      code = '0' + code;
	    }
	    return '%' + code;
	  }));
	}

	module.exports = function(str) {
	  var output = str.replace(/-/g, "+").replace(/_/g, "/");
	  switch (output.length % 4) {
	    case 0:
	      break;
	    case 2:
	      output += "==";
	      break;
	    case 3:
	      output += "=";
	      break;
	    default:
	      throw "Illegal base64url string!";
	  }

	  try{
	    return b64DecodeUnicode(output);
	  } catch (err) {
	    return atob(output);
	  }
	};


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var base64_url_decode = __webpack_require__(119);

	module.exports = function (token,options) {
	  if (typeof token !== 'string') {
	    throw new Error('Invalid token specified');
	  }

	  options = options || {};
	  var pos = options.header === true ? 0 : 1;
	  return JSON.parse(base64_url_decode(token.split('.')[pos]));
	};


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(7),
	    root = __webpack_require__(3);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(180),
	    hashDelete = __webpack_require__(181),
	    hashGet = __webpack_require__(182),
	    hashHas = __webpack_require__(183),
	    hashSet = __webpack_require__(184);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(7),
	    root = __webpack_require__(3);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(7),
	    root = __webpack_require__(3);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(37),
	    setCacheAdd = __webpack_require__(206),
	    setCacheHas = __webpack_require__(207);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values == null ? 0 : values.length;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(7),
	    root = __webpack_require__(3);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 127 */
/***/ function(module, exports) {

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  // Don't return `map.set` because it's not chainable in IE 11.
	  map.set(pair[0], pair[1]);
	  return map;
	}

	module.exports = addMapEntry;


/***/ },
/* 128 */
/***/ function(module, exports) {

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  // Don't return `set.add` because it's not chainable in IE 11.
	  set.add(value);
	  return set;
	}

	module.exports = addSetEntry;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(73);

	/**
	 * Gets the size of an ASCII `string`.
	 *
	 * @private
	 * @param {string} string The string inspect.
	 * @returns {number} Returns the string size.
	 */
	var asciiSize = baseProperty('length');

	module.exports = asciiSize;


/***/ },
/* 130 */
/***/ function(module, exports) {

	/**
	 * Converts an ASCII `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function asciiToArray(string) {
	  return string.split('');
	}

	module.exports = asciiToArray;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(12),
	    keys = __webpack_require__(20);

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(12),
	    keysIn = __webpack_require__(34);

	/**
	 * The base implementation of `_.assignIn` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssignIn(object, source) {
	  return object && copyObject(source, keysIn(source), object);
	}

	module.exports = baseAssignIn;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(24),
	    arrayEach = __webpack_require__(62),
	    assignValue = __webpack_require__(41),
	    baseAssign = __webpack_require__(131),
	    baseAssignIn = __webpack_require__(132),
	    cloneBuffer = __webpack_require__(76),
	    copyArray = __webpack_require__(78),
	    copySymbols = __webpack_require__(165),
	    copySymbolsIn = __webpack_require__(166),
	    getAllKeys = __webpack_require__(82),
	    getAllKeysIn = __webpack_require__(83),
	    getTag = __webpack_require__(47),
	    initCloneArray = __webpack_require__(185),
	    initCloneByTag = __webpack_require__(186),
	    initCloneObject = __webpack_require__(86),
	    isArray = __webpack_require__(1),
	    isBuffer = __webpack_require__(32),
	    isObject = __webpack_require__(2),
	    keys = __webpack_require__(20);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG = 4;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
	cloneableTags[boolTag] = cloneableTags[dateTag] =
	cloneableTags[float32Tag] = cloneableTags[float64Tag] =
	cloneableTags[int8Tag] = cloneableTags[int16Tag] =
	cloneableTags[int32Tag] = cloneableTags[mapTag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[setTag] =
	cloneableTags[stringTag] = cloneableTags[symbolTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Deep clone
	 *  2 - Flatten inherited properties
	 *  4 - Clone symbols
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, bitmask, customizer, key, object, stack) {
	  var result,
	      isDeep = bitmask & CLONE_DEEP_FLAG,
	      isFlat = bitmask & CLONE_FLAT_FLAG,
	      isFull = bitmask & CLONE_SYMBOLS_FLAG;

	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      result = (isFlat || isFunc) ? {} : initCloneObject(value);
	      if (!isDeep) {
	        return isFlat
	          ? copySymbolsIn(value, baseAssignIn(result, value))
	          : copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, baseClone, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  var keysFunc = isFull
	    ? (isFlat ? getAllKeysIn : getAllKeys)
	    : (isFlat ? keysIn : keys);

	  var props = isArr ? undefined : keysFunc(value);
	  arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	  });
	  return result;
	}

	module.exports = baseClone;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	module.exports = baseCreate;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(16);

	/**
	 * The base implementation of `_.filter` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function baseFilter(collection, predicate) {
	  var result = [];
	  baseEach(collection, function(value, index, collection) {
	    if (predicate(value, index, collection)) {
	      result.push(value);
	    }
	  });
	  return result;
	}

	module.exports = baseFilter;


/***/ },
/* 136 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  return object != null && hasOwnProperty.call(object, key);
	}

	module.exports = baseHas;


/***/ },
/* 137 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	module.exports = baseHasIn;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(6),
	    isObjectLike = __webpack_require__(5);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	module.exports = baseIsArguments;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(24),
	    equalArrays = __webpack_require__(80),
	    equalByTag = __webpack_require__(174),
	    equalObjects = __webpack_require__(175),
	    getTag = __webpack_require__(47),
	    isArray = __webpack_require__(1),
	    isBuffer = __webpack_require__(32),
	    isTypedArray = __webpack_require__(54);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = objIsArr ? arrayTag : getTag(object),
	      othTag = othIsArr ? arrayTag : getTag(other);

	  objTag = objTag == argsTag ? objectTag : objTag;
	  othTag = othTag == argsTag ? objectTag : othTag;

	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && isBuffer(object)) {
	    if (!isBuffer(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
	      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(24),
	    baseIsEqual = __webpack_require__(43);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(9),
	    isMasked = __webpack_require__(189),
	    isObject = __webpack_require__(2),
	    toSource = __webpack_require__(95);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(6),
	    isLength = __webpack_require__(53),
	    isObjectLike = __webpack_require__(5);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	module.exports = baseIsTypedArray;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2),
	    isPrototype = __webpack_require__(50),
	    nativeKeysIn = __webpack_require__(202);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeysIn;


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(16),
	    isArrayLike = __webpack_require__(8);

	/**
	 * The base implementation of `_.map` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function baseMap(collection, iteratee) {
	  var index = -1,
	      result = isArrayLike(collection) ? Array(collection.length) : [];

	  baseEach(collection, function(value, key, collection) {
	    result[++index] = iteratee(value, key, collection);
	  });
	  return result;
	}

	module.exports = baseMap;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(140),
	    getMatchData = __webpack_require__(177),
	    matchesStrictComparable = __webpack_require__(90);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(43),
	    get = __webpack_require__(52),
	    hasIn = __webpack_require__(229),
	    isKey = __webpack_require__(49),
	    isStrictComparable = __webpack_require__(88),
	    matchesStrictComparable = __webpack_require__(90),
	    toKey = __webpack_require__(13);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var assignMergeValue = __webpack_require__(66),
	    cloneBuffer = __webpack_require__(76),
	    cloneTypedArray = __webpack_require__(77),
	    copyArray = __webpack_require__(78),
	    initCloneObject = __webpack_require__(86),
	    isArguments = __webpack_require__(31),
	    isArray = __webpack_require__(1),
	    isArrayLikeObject = __webpack_require__(231),
	    isBuffer = __webpack_require__(32),
	    isFunction = __webpack_require__(9),
	    isObject = __webpack_require__(2),
	    isPlainObject = __webpack_require__(96),
	    isTypedArray = __webpack_require__(54),
	    toPlainObject = __webpack_require__(245);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = object[key],
	      srcValue = source[key],
	      stacked = stack.get(srcValue);

	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;

	  var isCommon = newValue === undefined;

	  if (isCommon) {
	    var isArr = isArray(srcValue),
	        isBuff = !isArr && isBuffer(srcValue),
	        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

	    newValue = srcValue;
	    if (isArr || isBuff || isTyped) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else if (isBuff) {
	        isCommon = false;
	        newValue = cloneBuffer(srcValue, true);
	      }
	      else if (isTyped) {
	        isCommon = false;
	        newValue = cloneTypedArray(srcValue, true);
	      }
	      else {
	        newValue = [];
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      newValue = objValue;
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
	        newValue = initCloneObject(srcValue);
	      }
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, newValue);
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	    stack['delete'](srcValue);
	  }
	  assignMergeValue(object, key, newValue);
	}

	module.exports = baseMergeDeep;


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(42);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var baseUnset = __webpack_require__(75),
	    isIndex = __webpack_require__(18);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * The base implementation of `_.pullAt` without support for individual
	 * indexes or capturing the removed elements.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {number[]} indexes The indexes of elements to remove.
	 * @returns {Array} Returns `array`.
	 */
	function basePullAt(array, indexes) {
	  var length = array ? indexes.length : 0,
	      lastIndex = length - 1;

	  while (length--) {
	    var index = indexes[length];
	    if (length == lastIndex || index !== previous) {
	      var previous = index;
	      if (isIndex(index)) {
	        splice.call(array, index, 1);
	      } else {
	        baseUnset(array, index);
	      }
	    }
	  }
	  return array;
	}

	module.exports = basePullAt;


/***/ },
/* 150 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.reduce` and `_.reduceRight`, without support
	 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} accumulator The initial value.
	 * @param {boolean} initAccum Specify using the first or last element of
	 *  `collection` as the initial value.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @returns {*} Returns the accumulated value.
	 */
	function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
	  eachFunc(collection, function(value, index, collection) {
	    accumulator = initAccum
	      ? (initAccum = false, value)
	      : iteratee(accumulator, value, index, collection);
	  });
	  return accumulator;
	}

	module.exports = baseReduce;


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(41),
	    castPath = __webpack_require__(17),
	    isIndex = __webpack_require__(18),
	    isObject = __webpack_require__(2),
	    toKey = __webpack_require__(13);

	/**
	 * The base implementation of `_.set`.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {Array|string} path The path of the property to set.
	 * @param {*} value The value to set.
	 * @param {Function} [customizer] The function to customize path creation.
	 * @returns {Object} Returns `object`.
	 */
	function baseSet(object, path, value, customizer) {
	  if (!isObject(object)) {
	    return object;
	  }
	  path = castPath(path, object);

	  var index = -1,
	      length = path.length,
	      lastIndex = length - 1,
	      nested = object;

	  while (nested != null && ++index < length) {
	    var key = toKey(path[index]),
	        newValue = value;

	    if (index != lastIndex) {
	      var objValue = nested[key];
	      newValue = customizer ? customizer(objValue, key, nested) : undefined;
	      if (newValue === undefined) {
	        newValue = isObject(objValue)
	          ? objValue
	          : (isIndex(path[index + 1]) ? [] : {});
	      }
	    }
	    assignValue(nested, key, newValue);
	    nested = nested[key];
	  }
	  return object;
	}

	module.exports = baseSet;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(220),
	    defineProperty = __webpack_require__(79),
	    identity = __webpack_require__(30);

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	module.exports = baseSetToString;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(16);

	/**
	 * The base implementation of `_.some` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function baseSome(collection, predicate) {
	  var result;

	  baseEach(collection, function(value, index, collection) {
	    result = predicate(value, index, collection);
	    return !result;
	  });
	  return !!result;
	}

	module.exports = baseSome;


/***/ },
/* 154 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(10),
	    arrayMap = __webpack_require__(38),
	    isArray = __webpack_require__(1),
	    isSymbol = __webpack_require__(33);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ },
/* 156 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 157 */
/***/ function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	module.exports = cacheHas;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(30);

	/**
	 * Casts `value` to `identity` if it's not a function.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Function} Returns cast function.
	 */
	function castFunction(value) {
	  return typeof value == 'function' ? value : identity;
	}

	module.exports = castFunction;


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(27);

	/**
	 * Casts `array` to a slice if it's needed.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {number} start The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the cast slice.
	 */
	function castSlice(array, start, end) {
	  var length = array.length;
	  end = end === undefined ? length : end;
	  return (!start && end >= length) ? array : baseSlice(array, start, end);
	}

	module.exports = castSlice;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(44);

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	module.exports = cloneDataView;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var addMapEntry = __webpack_require__(127),
	    arrayReduce = __webpack_require__(40),
	    mapToArray = __webpack_require__(89);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1;

	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
	  return arrayReduce(array, addMapEntry, new map.constructor);
	}

	module.exports = cloneMap;


/***/ },
/* 162 */
/***/ function(module, exports) {

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	module.exports = cloneRegExp;


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var addSetEntry = __webpack_require__(128),
	    arrayReduce = __webpack_require__(40),
	    setToArray = __webpack_require__(93);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1;

	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
	  return arrayReduce(array, addSetEntry, new set.constructor);
	}

	module.exports = cloneSet;


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(10);

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	module.exports = cloneSymbol;


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(12),
	    getSymbols = __webpack_require__(46);

	/**
	 * Copies own symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	module.exports = copySymbols;


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(12),
	    getSymbolsIn = __webpack_require__(84);

	/**
	 * Copies own and inherited symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbolsIn(source, object) {
	  return copyObject(source, getSymbolsIn(source), object);
	}

	module.exports = copySymbolsIn;


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(3);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(74),
	    isIterateeCall = __webpack_require__(87);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(8);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 170 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var castSlice = __webpack_require__(159),
	    hasUnicode = __webpack_require__(48),
	    stringToArray = __webpack_require__(215),
	    toString = __webpack_require__(55);

	/**
	 * Creates a function like `_.lowerFirst`.
	 *
	 * @private
	 * @param {string} methodName The name of the `String` case method to use.
	 * @returns {Function} Returns the new case function.
	 */
	function createCaseFirst(methodName) {
	  return function(string) {
	    string = toString(string);

	    var strSymbols = hasUnicode(string)
	      ? stringToArray(string)
	      : undefined;

	    var chr = strSymbols
	      ? strSymbols[0]
	      : string.charAt(0);

	    var trailing = strSymbols
	      ? castSlice(strSymbols, 1).join('')
	      : string.slice(1);

	    return chr[methodName]() + trailing;
	  };
	}

	module.exports = createCaseFirst;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(72),
	    isObject = __webpack_require__(2);

	/**
	 * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
	 * objects into destination objects that are passed thru.
	 *
	 * @private
	 * @param {*} objValue The destination value.
	 * @param {*} srcValue The source value.
	 * @param {string} key The key of the property to merge.
	 * @param {Object} object The parent object of `objValue`.
	 * @param {Object} source The parent object of `srcValue`.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 * @returns {*} Returns the value to assign.
	 */
	function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
	  if (isObject(objValue) && isObject(srcValue)) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, objValue);
	    baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
	    stack['delete'](srcValue);
	  }
	  return objValue;
	}

	module.exports = customDefaultsMerge;


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var isPlainObject = __webpack_require__(96);

	/**
	 * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
	 * objects.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {string} key The key of the property to inspect.
	 * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
	 */
	function customOmitClone(value) {
	  return isPlainObject(value) ? undefined : value;
	}

	module.exports = customOmitClone;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(10),
	    Uint8Array = __webpack_require__(60),
	    eq = __webpack_require__(19),
	    equalArrays = __webpack_require__(80),
	    mapToArray = __webpack_require__(89),
	    setToArray = __webpack_require__(93);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= COMPARE_UNORDERED_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var getAllKeys = __webpack_require__(82);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      objProps = getAllKeys(object),
	      objLength = objProps.length,
	      othProps = getAllKeys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var flatten = __webpack_require__(227),
	    overRest = __webpack_require__(92),
	    setToString = __webpack_require__(94);

	/**
	 * A specialized version of `baseRest` which flattens the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @returns {Function} Returns the new function.
	 */
	function flatRest(func) {
	  return setToString(overRest(func, undefined, flatten), func + '');
	}

	module.exports = flatRest;


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(88),
	    keys = __webpack_require__(20);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;

	  while (length--) {
	    var key = result[length],
	        value = object[key];

	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(10);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },
/* 179 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(29);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;


/***/ },
/* 181 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(29);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(29);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(29);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ },
/* 185 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	module.exports = initCloneArray;


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(44),
	    cloneDataView = __webpack_require__(160),
	    cloneMap = __webpack_require__(161),
	    cloneRegExp = __webpack_require__(162),
	    cloneSet = __webpack_require__(163),
	    cloneSymbol = __webpack_require__(164),
	    cloneTypedArray = __webpack_require__(77);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, cloneFunc, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case dataViewTag:
	      return cloneDataView(object, isDeep);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);

	    case mapTag:
	      return cloneMap(object, isDeep, cloneFunc);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      return cloneRegExp(object);

	    case setTag:
	      return cloneSet(object, isDeep, cloneFunc);

	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}

	module.exports = initCloneByTag;


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(10),
	    isArguments = __webpack_require__(31),
	    isArray = __webpack_require__(1);

	/** Built-in value references. */
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value) ||
	    !!(spreadableSymbol && value && value[spreadableSymbol]);
	}

	module.exports = isFlattenable;


/***/ },
/* 188 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(167);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 190 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(25);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(25);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(25);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(25);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(122),
	    ListCache = __webpack_require__(23),
	    Map = __webpack_require__(36);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(28);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(28);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(28);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(28);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;


/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(235);

	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;

	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });

	  var cache = result.cache;
	  return result;
	}

	module.exports = memoizeCapped;


/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(91);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 202 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(81);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(56)(module)))

/***/ },
/* 204 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(42),
	    baseSlice = __webpack_require__(27);

	/**
	 * Gets the parent value at `path` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path to get the parent value of.
	 * @returns {*} Returns the parent value.
	 */
	function parent(object, path) {
	  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
	}

	module.exports = parent;


/***/ },
/* 206 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;


/***/ },
/* 207 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;


/***/ },
/* 208 */
/***/ function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	module.exports = shortOut;


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(23);

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	module.exports = stackClear;


/***/ },
/* 210 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	module.exports = stackDelete;


/***/ },
/* 211 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 212 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(23),
	    Map = __webpack_require__(36),
	    MapCache = __webpack_require__(37);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	var asciiSize = __webpack_require__(129),
	    hasUnicode = __webpack_require__(48),
	    unicodeSize = __webpack_require__(217);

	/**
	 * Gets the number of symbols in `string`.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {number} Returns the string size.
	 */
	function stringSize(string) {
	  return hasUnicode(string)
	    ? unicodeSize(string)
	    : asciiSize(string);
	}

	module.exports = stringSize;


/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	var asciiToArray = __webpack_require__(130),
	    hasUnicode = __webpack_require__(48),
	    unicodeToArray = __webpack_require__(218);

	/**
	 * Converts `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function stringToArray(string) {
	  return hasUnicode(string)
	    ? unicodeToArray(string)
	    : asciiToArray(string);
	}

	module.exports = stringToArray;


/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(200);

	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ },
/* 217 */
/***/ function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	    rsVarRange = '\\ufe0e\\ufe0f';

	/** Used to compose unicode capture groups. */
	var rsAstral = '[' + rsAstralRange + ']',
	    rsCombo = '[' + rsComboRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsZWJ = '\\u200d';

	/** Used to compose unicode regexes. */
	var reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

	/**
	 * Gets the size of a Unicode `string`.
	 *
	 * @private
	 * @param {string} string The string inspect.
	 * @returns {number} Returns the string size.
	 */
	function unicodeSize(string) {
	  var result = reUnicode.lastIndex = 0;
	  while (reUnicode.test(string)) {
	    ++result;
	  }
	  return result;
	}

	module.exports = unicodeSize;


/***/ },
/* 218 */
/***/ function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f',
	    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
	    rsComboSymbolsRange = '\\u20d0-\\u20ff',
	    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
	    rsVarRange = '\\ufe0e\\ufe0f';

	/** Used to compose unicode capture groups. */
	var rsAstral = '[' + rsAstralRange + ']',
	    rsCombo = '[' + rsComboRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsZWJ = '\\u200d';

	/** Used to compose unicode regexes. */
	var reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

	/**
	 * Converts a Unicode `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function unicodeToArray(string) {
	  return string.match(reUnicode) || [];
	}

	module.exports = unicodeToArray;


/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(55),
	    upperFirst = __webpack_require__(246);

	/**
	 * Converts the first character of `string` to upper case and the remaining
	 * to lower case.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to capitalize.
	 * @returns {string} Returns the capitalized string.
	 * @example
	 *
	 * _.capitalize('FRED');
	 * // => 'Fred'
	 */
	function capitalize(string) {
	  return upperFirst(toString(string).toLowerCase());
	}

	module.exports = capitalize;


/***/ },
/* 220 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(61),
	    baseRest = __webpack_require__(74),
	    customDefaultsMerge = __webpack_require__(172),
	    mergeWith = __webpack_require__(236);

	/**
	 * This method is like `_.defaults` except that it recursively assigns
	 * default properties.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.defaults
	 * @example
	 *
	 * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
	 * // => { 'a': { 'b': 2, 'c': 3 } }
	 */
	var defaultsDeep = baseRest(function(args) {
	  args.push(undefined, customDefaultsMerge);
	  return apply(mergeWith, undefined, args);
	});

	module.exports = defaultsDeep;


/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(27),
	    toInteger = __webpack_require__(100);

	/**
	 * Creates a slice of `array` with `n` elements dropped from the beginning.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.5.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @param {number} [n=1] The number of elements to drop.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Array} Returns the slice of `array`.
	 * @example
	 *
	 * _.drop([1, 2, 3]);
	 * // => [2, 3]
	 *
	 * _.drop([1, 2, 3], 2);
	 * // => [3]
	 *
	 * _.drop([1, 2, 3], 5);
	 * // => []
	 *
	 * _.drop([1, 2, 3], 0);
	 * // => [1, 2, 3]
	 */
	function drop(array, n, guard) {
	  var length = array == null ? 0 : array.length;
	  if (!length) {
	    return [];
	  }
	  n = (guard || n === undefined) ? 1 : toInteger(n);
	  return baseSlice(array, n < 0 ? 0 : n, length);
	}

	module.exports = drop;


/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(27),
	    toInteger = __webpack_require__(100);

	/**
	 * Creates a slice of `array` with `n` elements dropped from the end.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @param {number} [n=1] The number of elements to drop.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Array} Returns the slice of `array`.
	 * @example
	 *
	 * _.dropRight([1, 2, 3]);
	 * // => [1, 2]
	 *
	 * _.dropRight([1, 2, 3], 2);
	 * // => [1]
	 *
	 * _.dropRight([1, 2, 3], 5);
	 * // => []
	 *
	 * _.dropRight([1, 2, 3], 0);
	 * // => [1, 2, 3]
	 */
	function dropRight(array, n, guard) {
	  var length = array == null ? 0 : array.length;
	  if (!length) {
	    return [];
	  }
	  n = (guard || n === undefined) ? 1 : toInteger(n);
	  n = length - n;
	  return baseSlice(array, 0, n < 0 ? 0 : n);
	}

	module.exports = dropRight;


/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(63),
	    baseFilter = __webpack_require__(135),
	    baseIteratee = __webpack_require__(11),
	    isArray = __webpack_require__(1);

	/**
	 * Iterates over elements of `collection`, returning an array of all elements
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * **Note:** Unlike `_.remove`, this method returns a new array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 * @see _.reject
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': true },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * _.filter(users, function(o) { return !o.active; });
	 * // => objects for ['fred']
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.filter(users, { 'age': 36, 'active': true });
	 * // => objects for ['barney']
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.filter(users, ['active', false]);
	 * // => objects for ['fred']
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.filter(users, 'active');
	 * // => objects for ['barney']
	 */
	function filter(collection, predicate) {
	  var func = isArray(collection) ? arrayFilter : baseFilter;
	  return func(collection, baseIteratee(predicate, 3));
	}

	module.exports = filter;


/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(230);


/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(67),
	    map = __webpack_require__(35);

	/**
	 * Creates a flattened array of values by running each element in `collection`
	 * thru `iteratee` and flattening the mapped results. The iteratee is invoked
	 * with three arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * function duplicate(n) {
	 *   return [n, n];
	 * }
	 *
	 * _.flatMap([1, 2], duplicate);
	 * // => [1, 1, 2, 2]
	 */
	function flatMap(collection, iteratee) {
	  return baseFlatten(map(collection, iteratee), 1);
	}

	module.exports = flatMap;


/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(67);

	/**
	 * Flattens `array` a single level deep.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flatten([1, [2, [3, [4]], 5]]);
	 * // => [1, 2, [3, [4]], 5]
	 */
	function flatten(array) {
	  var length = array == null ? 0 : array.length;
	  return length ? baseFlatten(array, 1) : [];
	}

	module.exports = flatten;


/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(136),
	    hasPath = __webpack_require__(85);

	/**
	 * Checks if `path` is a direct property of `object`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = { 'a': { 'b': 2 } };
	 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.has(object, 'a');
	 * // => true
	 *
	 * _.has(object, 'a.b');
	 * // => true
	 *
	 * _.has(object, ['a', 'b']);
	 * // => true
	 *
	 * _.has(other, 'a');
	 * // => false
	 */
	function has(object, path) {
	  return object != null && hasPath(object, path, baseHas);
	}

	module.exports = has;


/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(137),
	    hasPath = __webpack_require__(85);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ },
/* 230 */
/***/ function(module, exports) {

	/**
	 * Gets the first element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias first
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the first element of `array`.
	 * @example
	 *
	 * _.head([1, 2, 3]);
	 * // => 1
	 *
	 * _.head([]);
	 * // => undefined
	 */
	function head(array) {
	  return (array && array.length) ? array[0] : undefined;
	}

	module.exports = head;


/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(8),
	    isObjectLike = __webpack_require__(5);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(43);

	/**
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent.
	 *
	 * **Note:** This method supports comparing arrays, array buffers, booleans,
	 * date objects, error objects, maps, numbers, `Object` objects, regexes,
	 * sets, strings, symbols, and typed arrays. `Object` objects are compared
	 * by their own, not inherited, enumerable properties. Functions and DOM
	 * nodes are compared by strict equality, i.e. `===`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.isEqual(object, other);
	 * // => true
	 *
	 * object === other;
	 * // => false
	 */
	function isEqual(value, other) {
	  return baseIsEqual(value, other);
	}

	module.exports = isEqual;


/***/ },
/* 233 */
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array == null ? 0 : array.length;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;


/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(26),
	    baseForOwn = __webpack_require__(69),
	    baseIteratee = __webpack_require__(11);

	/**
	 * Creates an object with the same keys as `object` and values generated
	 * by running each own enumerable string keyed property of `object` thru
	 * `iteratee`. The iteratee is invoked with three arguments:
	 * (value, key, object).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Object} Returns the new mapped object.
	 * @see _.mapKeys
	 * @example
	 *
	 * var users = {
	 *   'fred':    { 'user': 'fred',    'age': 40 },
	 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
	 * };
	 *
	 * _.mapValues(users, function(o) { return o.age; });
	 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.mapValues(users, 'age');
	 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	 */
	function mapValues(object, iteratee) {
	  var result = {};
	  iteratee = baseIteratee(iteratee, 3);

	  baseForOwn(object, function(value, key, object) {
	    baseAssignValue(result, key, iteratee(value, key, object));
	  });
	  return result;
	}

	module.exports = mapValues;


/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(37);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(72),
	    createAssigner = __webpack_require__(168);

	/**
	 * This method is like `_.merge` except that it accepts `customizer` which
	 * is invoked to produce the merged values of the destination and source
	 * properties. If `customizer` returns `undefined`, merging is handled by the
	 * method instead. The `customizer` is invoked with six arguments:
	 * (objValue, srcValue, key, object, source, stack).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} customizer The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function customizer(objValue, srcValue) {
	 *   if (_.isArray(objValue)) {
	 *     return objValue.concat(srcValue);
	 *   }
	 * }
	 *
	 * var object = { 'a': [1], 'b': [2] };
	 * var other = { 'a': [3], 'b': [4] };
	 *
	 * _.mergeWith(object, other, customizer);
	 * // => { 'a': [1, 3], 'b': [2, 4] }
	 */
	var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
	  baseMerge(object, source, srcIndex, customizer);
	});

	module.exports = mergeWith;


/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(38),
	    baseClone = __webpack_require__(133),
	    baseUnset = __webpack_require__(75),
	    castPath = __webpack_require__(17),
	    copyObject = __webpack_require__(12),
	    customOmitClone = __webpack_require__(173),
	    flatRest = __webpack_require__(176),
	    getAllKeysIn = __webpack_require__(83);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG = 4;

	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable property paths of `object` that are not omitted.
	 *
	 * **Note:** This method is considerably slower than `_.pick`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [paths] The property paths to omit.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.omit(object, ['a', 'c']);
	 * // => { 'b': '2' }
	 */
	var omit = flatRest(function(object, paths) {
	  var result = {};
	  if (object == null) {
	    return result;
	  }
	  var isDeep = false;
	  paths = arrayMap(paths, function(path) {
	    path = castPath(path, object);
	    isDeep || (isDeep = path.length > 1);
	    return path;
	  });
	  copyObject(object, getAllKeysIn(object), result);
	  if (isDeep) {
	    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
	  }
	  var length = paths.length;
	  while (length--) {
	    baseUnset(result, paths[length]);
	  }
	  return result;
	});

	module.exports = omit;


/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(73),
	    basePropertyDeep = __webpack_require__(148),
	    isKey = __webpack_require__(49),
	    toKey = __webpack_require__(13);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(40),
	    baseEach = __webpack_require__(16),
	    baseIteratee = __webpack_require__(11),
	    baseReduce = __webpack_require__(150),
	    isArray = __webpack_require__(1);

	/**
	 * Reduces `collection` to a value which is the accumulated result of running
	 * each element in `collection` thru `iteratee`, where each successive
	 * invocation is supplied the return value of the previous. If `accumulator`
	 * is not given, the first element of `collection` is used as the initial
	 * value. The iteratee is invoked with four arguments:
	 * (accumulator, value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.reduce`, `_.reduceRight`, and `_.transform`.
	 *
	 * The guarded methods are:
	 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
	 * and `sortBy`
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @returns {*} Returns the accumulated value.
	 * @see _.reduceRight
	 * @example
	 *
	 * _.reduce([1, 2], function(sum, n) {
	 *   return sum + n;
	 * }, 0);
	 * // => 3
	 *
	 * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	 *   (result[value] || (result[value] = [])).push(key);
	 *   return result;
	 * }, {});
	 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
	 */
	function reduce(collection, iteratee, accumulator) {
	  var func = isArray(collection) ? arrayReduce : baseReduce,
	      initAccum = arguments.length < 3;

	  return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEach);
	}

	module.exports = reduce;


/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(11),
	    basePullAt = __webpack_require__(149);

	/**
	 * Removes all elements from `array` that `predicate` returns truthy for
	 * and returns an array of the removed elements. The predicate is invoked
	 * with three arguments: (value, index, array).
	 *
	 * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
	 * to pull elements from an array by value.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.0.0
	 * @category Array
	 * @param {Array} array The array to modify.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new array of removed elements.
	 * @example
	 *
	 * var array = [1, 2, 3, 4];
	 * var evens = _.remove(array, function(n) {
	 *   return n % 2 == 0;
	 * });
	 *
	 * console.log(array);
	 * // => [1, 3]
	 *
	 * console.log(evens);
	 * // => [2, 4]
	 */
	function remove(array, predicate) {
	  var result = [];
	  if (!(array && array.length)) {
	    return result;
	  }
	  var index = -1,
	      indexes = [],
	      length = array.length;

	  predicate = baseIteratee(predicate, 3);
	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result.push(value);
	      indexes.push(index);
	    }
	  }
	  basePullAt(array, indexes);
	  return result;
	}

	module.exports = remove;


/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(65),
	    baseIteratee = __webpack_require__(11),
	    baseSome = __webpack_require__(153),
	    isArray = __webpack_require__(1),
	    isIterateeCall = __webpack_require__(87);

	/**
	 * Checks if `predicate` returns truthy for **any** element of `collection`.
	 * Iteration is stopped once `predicate` returns truthy. The predicate is
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 * @example
	 *
	 * _.some([null, 0, 'yes', false], Boolean);
	 * // => true
	 *
	 * var users = [
	 *   { 'user': 'barney', 'active': true },
	 *   { 'user': 'fred',   'active': false }
	 * ];
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.some(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.some(users, ['active', false]);
	 * // => true
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.some(users, 'active');
	 * // => true
	 */
	function some(collection, predicate, guard) {
	  var func = isArray(collection) ? arraySome : baseSome;
	  if (guard && isIterateeCall(collection, predicate, guard)) {
	    predicate = undefined;
	  }
	  return func(collection, baseIteratee(predicate, 3));
	}

	module.exports = some;


/***/ },
/* 242 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(244);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	module.exports = toFinite;


/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2),
	    isSymbol = __webpack_require__(33);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(12),
	    keysIn = __webpack_require__(34);

	/**
	 * Converts `value` to a plain object flattening inherited enumerable string
	 * keyed properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return copyObject(value, keysIn(value));
	}

	module.exports = toPlainObject;


/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	var createCaseFirst = __webpack_require__(171);

	/**
	 * Converts the first character of `string` to upper case.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.upperFirst('fred');
	 * // => 'Fred'
	 *
	 * _.upperFirst('FRED');
	 * // => 'FRED'
	 */
	var upperFirst = createCaseFirst('toUpperCase');

	module.exports = upperFirst;


/***/ },
/* 247 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 248 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_248__;

/***/ },
/* 249 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ }
/******/ ])
});
;