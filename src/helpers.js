import {
  size,
  set,
  get,
  has,
  last,
  split,
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
    : every(args, arg => arg !== undefined && (get(arg, 'isLoaded') !== false))

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
  some(args, (arg) => !(arg && size(arg)) || arg.isEmpty === true)

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
  // TODO: Handle slash and lodash notation
  // TODO: Handle populating profile
  const pathArr = compact(path.split('/'))
  const dotPath = pathArr.join('.')
  const data = pathArr.indexOf('profile') === -1 ? get(state, 'data') : state
  // Handle undefined child
  if (!state || !get(data, dotPath)) {
    return notSetValue
  }
  // test if data is a single object vs a list of objects, try generating
  // populates and testing for key existence
  const populatesForData = getPopulateObjs(
    isFunction(populates)
      ? populates(last(split(path, '/')), get(data, dotPath))
      : populates
  )
  const dataHasPopluateChilds = every(populatesForData, (populate) => (
    has(get(data, dotPath), populate.child)
  ))
  if (dataHasPopluateChilds) {
    // Data is a single object, resolve populates directly
    return reduce(
      map(populatesForData, (p, obj) => {
        // populate child is key
        if (isString(get(get(data, dotPath), p.child))) {
          const key = get(get(data, dotPath), p.child)
          const dotRoot = compact(p.root.split('/')).join('.')
          const pathString = p.childParam
            ? `${dotRoot}.${key}.${p.childParam}`
            : `${dotRoot}.${key}`

          if (get(data, pathString)) {
            return set({}, p.child, p.keyProp
              ? { [p.keyProp]: key, ...get(data, pathString) }
              : get(data, pathString)
            )
          }
          // matching child does not exist
          return get(data, dotPath)
        }
        return set({}, p.child, buildChildList(state, get(get(data, dotPath), p.child), p))
      }),
      // combine data from all populates to one object starting with original data
      (obj, v) => defaultsDeep(v, obj), get(data, dotPath)
    )
  } else {
    // TODO: Improve this logic
    // Handle non-existant profile populate child
    if (pathArr.indexOf('profile') !== -1) {
      return get(data, dotPath)
    }
    // Data is a map of objects, each value has parameters to be populated
    return mapValues(get(data, dotPath), (child, childKey) => {
      const populatesForDataItem = getPopulateObjs(
        isFunction(populates)
          ? populates(childKey, child)
          : populates
      )
      const resolvedPopulates = map(populatesForDataItem, (p, obj) => {
        // no matching child parameter
        if (!child || !get(child, p.child)) {
          return child
        }
        // populate child is key
        if (isString(get(child, p.child))) {
          const key = get(child, p.child)
          // attach child paramter if it exists
          const dotRoot = compact(p.root.split('/')).join('.')
          const pathString = p.childParam
            ? `${dotRoot}.${key}.${p.childParam}`
            : `${dotRoot}.${key}`
          if (get(data, pathString)) {
            return set({}, p.child, (p.keyProp
              ? { [p.keyProp]: key, ...get(data, pathString) }
              : get(state.data, pathString)
            ))
          }
          // matching child does not exist
          return child
        }
        // populate child list
        return set({}, p.child, buildChildList(state, get(child, p.child), p))
      })
      // combine data from all populates to one object starting with original data
      return reduce(
        resolvedPopulates,
        (obj, v) => defaultsDeep(v, obj),
        child
      )
    })
  }
}
