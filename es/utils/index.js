'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateConfig = exports.createCallable = exports.getEventsFromInput = undefined;

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _events = require('./events');

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