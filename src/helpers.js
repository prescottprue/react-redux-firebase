import { size, map, forEach, set, omit, some, first, drop } from 'lodash'
import { getPopulateObj } from './utils/populate'
import { metaParams, paramSplitChar } from './constants'

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
export const isLoaded = function () {
  if (!arguments || !arguments.length) {
    return true
  }

  return map(arguments, a => a !== undefined).reduce((a, b) => a && b)
}

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
export const isEmpty = data => !(data && size(data))

/**
 * @description Fix path by adding "/" to path if needed
 * @param {String} path - Path string to fix
 * @return {String} - Fixed path
 * @private
 */
export const fixPath = path =>
  ((path.substring(0, 1) === '/') ? '' : '/') + path

/**
 * @description Convert Immutable Map to a Javascript object
 * @param {Object} data - Immutable Map to be converted to JS object (state.firebase)
 * @return {Object} data - Javascript version of Immutable Map
 * @return {Object} Data located at path within Immutable Map
 */
export const toJS = data =>
  data && data.toJS
    ? data.toJS()
    : data

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
export const pathToJS = (data, path, notSetValue) => {
  if (!data) {
    return notSetValue
  }
  const pathArr = fixPath(path).split(/\//).slice(1)

  if (data.getIn) {
    // Handle meta params (stored by string key)
    if (some(metaParams, (v) => pathArr.indexOf(v) !== -1)) {
      return toJS(
        data.getIn([
          first(pathArr),
          drop(pathArr).join(paramSplitChar)
        ], notSetValue)
      )
    }
    return toJS(data.getIn(pathArr, notSetValue))
  }

  return data
}

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
export const dataToJS = (data, path, notSetValue) => {
  if (!data) {
    return notSetValue
  }

  const pathArr = `/data${fixPath(path)}`.split(/\//).slice(1)

  if (data.getIn) {
    return toJS(data.getIn(pathArr, notSetValue))
  }

  return data
}
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
 *
 * const fbWrapped = firebaseConnect(['/todos'])(App)
 *
 * export default connect(({ firebase }) => ({
 *   // this.props.todos loaded from state.firebase.data.todos
 *   // each todo has child 'owner' populated from matching uid in 'users' root
 *   todos: populatedDataToJS(firebase, 'todos', [{ child: 'owner', root: 'users' }])
 * }))(fbWrapped)
 */
export const populatedDataToJS = (data, path, populates, notSetValue) => {
  if (!data) {
    return notSetValue
  }

  const pathArr = `/data${fixPath(path)}`.split(/\//).slice(1)

  if (data.getIn) {
    const unpopulated = toJS(data.getIn(pathArr, notSetValue))
    if (!unpopulated) {
      return undefined
    }
    const populateObjs = map(populates, p => getPopulateObj(p))
    const populated = {}
    // TODO: Look into using mapValues
    forEach(populateObjs, p => {
      forEach(unpopulated, (child, i) => { // iterate over list
        set(populated, `${i}`, omit(child, [p.child])) // set child without parameter
        // TODO: Handle single populates
        forEach(child[p.child], (val, key) => { // iterate of child list
          // Handle key: true lists
          if (val === true) {
            val = key
          }
          // Set to child under key if populate child exists
          if (toJS(data.getIn(['data', p.root, val]))) {
            set(
              populated,
              `${i}.${p.child}.${val}`,
              toJS(data.getIn(['data', p.root, val]))
            )
          }
        })
      })
    })
    return populated
  }

  return data
}

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
export const customToJS = (data, path, custom, notSetValue) => {
  if (!(data && data.getIn)) {
    return notSetValue
  }

  const pathArr = `/${custom}${fixPath(path)}`.split(/\//).slice(1)

  if (data.getIn) {
    return toJS(data.getIn(pathArr, notSetValue))
  }

  return data
}

export default {
  toJS,
  pathToJS,
  dataToJS,
  customToJS,
  isLoaded,
  isEmpty
}
