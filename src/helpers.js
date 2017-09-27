import {
  size,
  set,
  get,
  has,
  last,
  map,
  mapValues,
  every,
  reduce,
  defaultsDeep,
  isString,
  compact,
  some,
  isFunction
} from 'lodash'
import { topLevelPaths } from './constants'
import { getPopulateObjs } from './utils/populate'

/**
 * @description Detect whether items are loaded yet or not
 * @param {Object} item - Item to check loaded status of. A comma separated list is also acceptable.
 * @return {Boolean} Whether or not item is loaded
 * @example
 * import React, { Component } from 'react'
 * import PropTypes from 'prop-types'
 * import { connect } from 'react-redux'
 * import { firebaseConnect, isLoaded } from 'react-redux-firebase'
 *
 * @firebaseConnect(['/todos'])
 * @connect(
 *   ({ firebase: { data: { todos } } }) => ({
 *     todos,
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
export const isLoaded = (...args) =>
  !args || !args.length
    ? true
    : every(args, arg => arg !== undefined && get(arg, 'isLoaded') !== false)

/**
 * @description Detect whether items are empty or not
 * @param {Object} item - Item to check loaded status of. A comma seperated list is also acceptable.
 * @return {Boolean} Whether or not item is empty
 * @example
 * import React, { Component } from 'react'
 * import PropTypes from 'prop-types'
 * import { connect } from 'react-redux'
 * import { firebaseConnect, isEmpty } from 'react-redux-firebase'
 *
 * @firebaseConnect(['/todos'])
 * @connect(
 *   ({ firebase: { data: { todos } } }) => ({
 *     todos // state.firebase.data.todos from redux passed as todos prop
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
export const isEmpty = (...args) =>
  some(args, arg => !(arg && size(arg)) || arg.isEmpty === true)

/**
 * @description Fix path by adding "/" to path if needed
 * @param {String} path - Path string to fix
 * @return {String} - Fixed path
 * @private
 */
export const fixPath = path =>
  ((path.substring(0, 1) === '/') ? '' : '/') + path

/**
 * @private
 * @description Build child list based on populate
 * @param {Object} data - Immutable Object to be converted to JS object (state.firebase)
 * @param {Object} list - Path of parameter to load
 * @param {Object} populate - Object with population settings
 */
export const buildChildList = (state, list, p) =>
  mapValues(list, (val, key) => {
    let getKey = val
     // Handle key: true lists
    if (val === true) {
      getKey = key
    }
    const dotRoot = compact(p.root.split('/')).join('.')
    const pathString = p.childParam
      ? `${dotRoot}.${getKey}.${p.childParam}`
      : `${dotRoot}.${getKey}`
    // Set to child under key if populate child exists
    if (get(state.data, pathString)) {
      return p.keyProp
        ? { [p.keyProp]: getKey, ...get(state.data, pathString) }
        : get(state.data, pathString)
    }
    // Populate child does not exist
    return val === true ? val : getKey
  })

const populateChild = (state, child, p) => {
  // no matching child parameter
  const childVal = get(child, p.child)
  if (!child || !childVal) {
    return child
  }
  // populate child is key
  if (isString(childVal)) {
    // attach child paramter if it exists
    const dotRoot = compact(p.root.split('/')).join('.')
    const pathString = p.childParam
      ? `${dotRoot}.${childVal}.${p.childParam}`
      : `${dotRoot}.${childVal}`
    const populateVal = get(state.data, pathString)
    if (populateVal) {
      return set({}, p.child, (p.keyProp
        ? { [p.keyProp]: childVal, ...populateVal }
        : populateVal
      ))
    }
    // matching child does not exist
    return child
  }
  // populate child list
  return set({}, p.child, buildChildList(state, childVal, p))
}

/**
 * @description Convert parameter under "data" path of Immutable Object to a
 * Javascript object with parameters populated based on populates array
 * @param {Object} firebase - Immutable Object to be converted to JS object (state.firebase)
 * @param {String} path - Path of parameter to load
 * @param {Array} populates - Array of populate objects
 * @param {Object|String|Boolean} notSetValue - Value to return if value is not found
 * @return {Object} Data located at path within Immutable Object
 * @example <caption>Basic</caption>
 * import { connect } from 'react-redux'
 * import { firebaseConnect } from 'react-redux-firebase'
 * const populates = [{ child: 'owner', root: 'users' }]
 *
 * const fbWrapped = firebaseConnect([
 *   { path: '/todos', populates } // load "todos" and matching "users" to redux
 * ])(App)
 *
 * export default connect((state) => ({
 *   // this.props.todos loaded from state.firebase.data.todos
 *   // each todo has child 'owner' populated from matching uid in 'users' root
 *   // for loading un-populated todos use state.firebase.data.todos
 *   todos: populate(state.firebase, 'todos', populates),
 * }))(fbWrapped)
 */
export const populate = (state, path, populates, notSetValue) => {
  const splitPath = compact(path.split('/'))
  // append 'data' prefix to path if it is not a top level path
  const pathArr = topLevelPaths.indexOf(splitPath[0]) === -1
    ? ['data', ...splitPath]
    : splitPath
  const dotPath = pathArr.join('.')
  // Gather data from top level if path is profile (handles populating profile)
  const data = get(state, dotPath, notSetValue)

  // Return notSetValue for undefined child
  if (!state || data === notSetValue) {
    return notSetValue
  }
  // Return null for null child
  if (data === null) {
    return null
  }

  // check for if data is single object or a list of objects
  const populatesForData = getPopulateObjs(
    isFunction(populates)
      ? populates(last(pathArr), data)
      : populates
  )
  // check each populate child parameter for existence
  const dataHasPopluateChilds = every(populatesForData, p => has(data, p.child))
  if (dataHasPopluateChilds) {
    // Data is a single object, resolve populates directly
    return reduce(
      map(populatesForData, (p, obj) => populateChild(state, data, p)),
      // combine data from all populates to one object starting with original data
      (obj, v) => defaultsDeep(v, obj),
      // accumulator starts as original data
      data
    )
  }

  // TODO: Improve this logic
  // Handle non-existant profile populate child
  if (pathArr.indexOf('profile') !== -1) {
    return data
  }

  // Data is a map of objects, each value has parameters to be populated
  return mapValues(data, (child, childKey) => {
    // use child's key if doing ordered populate
    const key = pathArr[0] === 'ordered' ? child.key : childKey
    // get populate settings on item level (passes child if populates is a function)
    const populatesForDataItem = getPopulateObjs(
      isFunction(populates)
        ? populates(key, child)
        : populates
    )
    // combine data from all populates to one object starting with original data
    return reduce(
      map(populatesForDataItem, p => populateChild(state, child, p)),
      (obj, v) => defaultsDeep(v, obj),
      child
    )
  })
}
