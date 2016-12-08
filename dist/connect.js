'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _query = require('./actions/query');

var _utils = require('./utils');

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
 * @example <caption>Paths</caption>
 * import { connect } from 'react-redux'
 * import { firebaseConnect, helpers } from 'react-redux-firebase'
 * const { pathToJS } = helpers
 *
 * // pass todos list from redux as this.props.todosList
 * export default connect(({ firebase }) => ({
 *   profile: pathToJS(firebase, 'profile'),
 *   auth: pathToJS(firebase, 'auth')
 * }))(App)
 * @example <caption>Data</caption>
 * import { connect } from 'react-redux'
 * import { firebaseConnect, helpers } from 'react-redux-firebase'
 * const { dataToJS } = helpers
 *
 * // sync /todos from firebase into redux
 * const fbWrapped = firebaseConnect([
 *   'todos'
 * ])(App)
 *
 * // pass todos list from redux as this.props.todosList
 * export default connect(({ firebase }) => ({
 *   todosList: dataToJS(firebase, 'todos')
 * }))(fbWrapped)
 */
exports.default = function () {
  var dataOrFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return function (WrappedComponent) {
    var _class, _temp;

    var FirebaseConnect = (_temp = _class = function (_Component) {
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
          this.originalData = inputAsFunc(this.props, firebase);

          var ref = firebase.ref,
              helpers = firebase.helpers,
              storage = firebase.storage,
              database = firebase.database,
              auth = firebase.auth;

          this.firebase = _extends({ ref: ref, storage: storage, database: database, auth: auth }, helpers);

          this._firebaseEvents = (0, _utils.getEventsFromInput)(this.originalData);

          (0, _query.watchEvents)(firebase, dispatch, this._firebaseEvents);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          var firebase = this.context.store.firebase;

          (0, _query.unWatchEvents)(firebase, this._firebaseEvents);
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(np) {
          var _context$store2 = this.context.store,
              firebase = _context$store2.firebase,
              dispatch = _context$store2.dispatch;

          var inputAsFunc = (0, _utils.createCallable)(dataOrFn);
          var data = inputAsFunc(np, firebase);

          // Handle a data parameter having changed
          if (!(0, _isEqual3.default)(data, this.originalData)) {
            // UnWatch all current events
            (0, _query.unWatchEvents)(firebase, this._firebaseEvents);
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
    }(_react.Component), _class.contextTypes = {
      store: _react.PropTypes.object.isRequired
    }, _temp);


    return FirebaseConnect;
  };
};

module.exports = exports['default'];