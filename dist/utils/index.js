'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEventsFromInput = exports.createCallable = undefined;

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _events = require('./events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Create a function if not already one
 * @param {Function|Object|Array|String} Callable function or value of return for new function
 */
var createCallable = exports.createCallable = function createCallable(f) {
  return (0, _isFunction3.default)(f) ? f : function () {
    return f;
  };
};

exports.getEventsFromInput = _events.getEventsFromInput;
exports.default = {
  createCallable: createCallable,
  getEventsFromInput: _events.getEventsFromInput
};