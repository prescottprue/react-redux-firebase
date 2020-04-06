import {
  size,
  set,
  get,
  has,
  map,
  mapValues,
  reduce,
  defaultsDeep,
  some
} from 'lodash'
import { topLevelPaths } from './constants'
import { getPopulateObjs } from './utils/populate'
import { getDotStrPath } from './utils/reducers'

/**
 * **Deprecated** - This helper will be removed in future versions. Please
 * use object destructuring or utilities from other libraries such as
 * [lodash's get](https://lodash.com/docs/4.17.15#get).
 * Get a value from firebase using slash notation. This enables an easy
 * migration from v1's dataToJS/pathToJS/populatedDataToJS functions to v2 syntax
 * **NOTE:** Setting a default value will cause `isLoaded` to always return true
 * @param {object} firebase - Firebase instance (state.firebase)
 * @param {string} path - Path of parameter to load
 * @param {any} notSetValue - Value to return if value is not
 * found in redux. This will cause `isLoaded` to always return true (since
 * value is set from the start).
 * @returns {any} Data located at path within firebase.
 * @example <caption>Basic</caption>
 * import { compose } from 'redux'
 * import { connect } from 'react-redux'
 * import { firebaseConnect, getVal } from 'react-redux-firebase'
 *
 * const enhance = compose(
 *   firebaseConnect(['todos/user1']),
 *   connect(({ firebase }) => ({
 *     // this.props.todos loaded from state.firebase.data.todos
 *     todos: getVal(firebase, 'data/todos/user1')
 *   }))
 * )
 * export default enhance(SomeComponent)
 * @example <caption>Base Paths</caption>
 * import { connect } from 'react-redux'
 * import { firebaseConnect, getVal } from 'react-redux-firebase'
 *
 * export default connect(({ firebase }) => ({
 *   // this.props.auth loaded from state.firebase.auth
 *   auth: getVal(firebase, 'auth'),
 *   profile: getVal(firebase, 'profile')
 * })(SomeComponent)
 * @example <caption>Default Value</caption>
 * import { compose } from 'redux'
 * import { connect } from 'react-redux'
 * import { firebaseConnect, getVal } from 'react-redux-firebase'
 *
 * const defaultValue = {
 *  1: {
 *    text: 'Example Todo'
 *  }
 * }
 *
 * const enhance = compose(
 *   firebaseConnect(['todos/user1']),
 *   connect(({ firebase }) => ({
 *     // this.props.todos loaded from state.firebase.data.todos
 *     todos: getVal(firebase, 'data/todos/user1', defaultValue)
 *   }))
 * )
 *
 * export default enhance(SomeComponent)
 */
export function getVal(firebase, path, notSetValue) {
  if (!firebase) {
    return notSetValue
  }

  const dotPath = getDotStrPath(path)
  const valueAtPath = get(firebase, dotPath, notSetValue)

  return valueAtPath
}

/**
 * Detect whether data from redux state is loaded yet or not
 * @param {...object} args - Items to check loaded status of. A comma separated
 * list is also acceptable.
 * @returns {boolean} Whether or not item is loaded
 * @example
 * import React from 'react'
 * import PropTypes from 'prop-types'
 * import { compose } from 'redux'
 * import { connect } from 'react-redux'
 * import firebaseConnect from 'react-redux-firebase/lib/firebaseConnect'
 * import { isLoaded, isEmpty } from 'react-redux-firebase/lib/utils'
 *
 * const enhance = compose(
 *   firebaseConnect(['todos']),
 *   connect(({ firebase: { data: { todos } } }) => ({
 *     todos // state.firebase.data.todos from redux passed as todos prop
 *   }))
 * )
 *
 * function Todos({ todos }) {
 *   // Message for if todos are loading
 *   if (!isLoaded(todos)) {
 *     return <span>Loading...</span>
 *   }
 *
 *   // Message if todos are empty
 *   if (isEmpty(todos)) {
 *     return <span>No Todos Found</span>
 *   }
 *
 *   return <div><pre>{JSON.stringify(todos, null, 2)}</pre></div>
 * }
 *
 * Todos.propTypes = {
 *   todos: PropTypes.object
 * }
 *
 * export default enhance(Todos)
 */
export function isLoaded(...args) {
  return !args || !args.length
    ? true
    : args.every((arg) => arg !== undefined && get(arg, 'isLoaded') !== false)
}

/**
 * Detect whether items are empty or not
 * @param {object} args - Item to check loaded status of. A comma seperated list
 * is also acceptable.
 * @returns {boolean} Whether or not item is empty
 * @example
 * import React from 'react'
 * import PropTypes from 'prop-types'
 * import { compose } from 'redux'
 * import { connect } from 'react-redux'
 * import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase'
 *
 * const enhance = compose(
 *   firebaseConnect(['todos']),
 *   connect(({ firebase: { data: { todos } } }) => ({
 *     todos // state.firebase.data.todos from redux passed as todos prop
 *   }))
 * )
 *
 * function Todos({ todos }) {
 *   // Message for if todos are loading
 *   if (!isLoaded(todos)) {
 *     return <span>Loading...</span>
 *   }
 *
 *   // Message if todos are empty
 *   if (isEmpty(todos)) {
 *     return <span>No Todos Found</span>
 *   }
 *
 *   return <todos>{JSON.stringify(todos)}</todos>
 * }
 *
 * Todos.propTypes = {
 *   todos: PropTypes.object
 * }
 *
 * export default enhance(Todos)
 */
export function isEmpty(...args) {
  return !args || !args.length
    ? true
    : args.some((arg) => !(arg && size(arg)) || arg.isEmpty === true)
}

/**
 * @description Fix path by adding "/" to path if needed
 * @param {string} path - Path string to fix
 * @returns {string} - Fixed path
 * @private
 */
export function fixPath(path) {
  return (path.substring(0, 1) === '/' ? '' : '/') + path
}

/**
 * @private
 * @param {object} state - Firebase state object
 * @param {object} list - Path of parameter to load
 * @param {object} p - Object with population settings
 * @returns {object} List of child objects
 */
function buildChildList(state, list, p) {
  const mapFn = Array.isArray(list) ? map : mapValues
  return mapFn(list, (val, key) => {
    let getKey = val
    // Handle key: true lists
    if (val === true || p.populateByKey) {
      getKey = key
    }
    // Allow for aliasing populated data see #126 for more details
    const dotRoot = getDotStrPath(p.root)
    const pathArr = [dotRoot, getKey]

    // Handle child param
    if (p.childParam) {
      pathArr.push(p.childParam)
    }

    const pathString = pathArr.join('.')

    // Set to child under key if populate child exists
    if (get(state.data, pathString)) {
      return p.keyProp
        ? { [p.keyProp]: getKey, ...get(state.data, pathString) }
        : get(state.data, pathString)
    }
    // Populate child does not exist
    return val === true || p.populateByKey ? val : getKey
  })
}

/**
 * @private
 * @param {object} state - Firebase state object
 * @param {object} child - Path of parameter to load
 * @param {object} p - Object with population settings
 * @returns {object} Populated child object
 */
function populateChild(state, child, p) {
  // no matching child parameter
  const childVal = get(child, p.child)
  if (!child || !childVal) {
    return null
  }
  // populate child is key
  if (typeof childVal === 'string' || childVal instanceof String) {
    // attach child paramter if it exists
    const dotRoot = p.root
      .split('/')
      .filter(Boolean) // Drop falsey values (compact)
      .join('.')
    const pathArr = [dotRoot, childVal]

    // Handle child param
    if (p.childParam) {
      pathArr.push(p.childParam)
    }

    const pathString = pathArr.join('.')

    const populateVal = get(state.data, pathString)
    if (populateVal) {
      return set(
        {},
        p.childAlias || p.child,
        p.keyProp ? { [p.keyProp]: childVal, ...populateVal } : populateVal
      )
    }
    // matching child does not exist
    return child
  }
  // populate child list
  return set({}, p.childAlias || p.child, buildChildList(state, childVal, p))
}

/**
 * Populate with data from multiple locations of redux state.
 * @param {object} state - Firebase state object (state.firebase in redux store)
 * @param {string} path - Path of parameter to load
 * @param {Array} populates - Array of populate config objects
 * @param {object|string|boolean} notSetValue - Value to return if value is not found
 * @returns {object} Data located at path within Immutable Object
 * @example <caption>Basic</caption>
 * import { compose } from 'redux'
 * import { connect } from 'react-redux'
 * import { firebaseConnect } from 'react-redux-firebase'
 * const populates = [{ child: 'owner', root: 'users' }]
 *
 * const enhance = compose(
 *   firebaseConnect([
 *     { path: 'todos', populates } // load "todos" and matching "users" to redux
 *   ]),
 *   connect((state) => ({
 *     // this.props.todos loaded from state.firebase.data.todos
 *     // each todo has child 'owner' populated from matching uid in 'users' root
 *     // for loading un-populated todos use state.firebase.data.todos
 *     todos: populate(state.firebase, 'todos', populates),
 *   }))
 * )
 *
 * export default enhance(SomeComponent)
 */
export function populate(state, path, populates, notSetValue) {
  const splitPath = path.split('/').filter(Boolean) // Drop falsey values (compact)
  // append 'data' prefix to path if it is not a top level path
  const pathArr =
    topLevelPaths.indexOf(splitPath[0]) === -1
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
    typeof populates === 'function'
      ? populates(pathArr.slice(-1)[0], data) // pass last slice in path
      : populates
  )

  if (Array.isArray(data)) {
    // When using a path in ordered, data will be an array instead of an object
    // and data is located at the `value` prop
    const someArrayItemHasKey = (array) => (key) =>
      some(array, (item) => has(item, key))

    // Check items within the list to see if value exists for some populate parameters
    const dataHasPopulateChilds = some(populatesForData, (populate) =>
      someArrayItemHasKey(data)(['value', populate.child])
    )

    // Populate if populate children exist
    if (dataHasPopulateChilds) {
      return data.map(({ key, value: dataValue }) => {
        const populatedValue = populatesForData
          .map((p) => populateChild(state, dataValue, p))
          .reduce((acc, v) => defaultsDeep(v, acc), dataValue)

        return {
          key,
          value: populatedValue
        }
      })
    }

    // return unpopulated data if no populates have values
    return data
  }

  // check each populate child parameter for existence
  const dataHasPopulateChilds = some(populatesForData, (p) =>
    has(data, p.child)
  )

  // Single object that contains at least one child parameter
  if (dataHasPopulateChilds) {
    return populatesForData
      .map((p) => populateChild(state, data, p))
      .reduce((acc, v) => defaultsDeep(v, acc), data)
  }

  // Return for profile since it is a single object (following is for a list of objects)
  // TODO: Improve this logic to allow for other paths containing profile
  if (pathArr.indexOf('profile') !== -1) {
    return data
  }

  // Data is a map of objects, each value has parameters to be populated
  return mapValues(data, (child, childKey) => {
    // use child's key if doing ordered populate
    const key = pathArr[0] === 'ordered' ? child.key : childKey
    // get populate settings on item level (passes child if populates is a function)
    const populatesForDataItem = getPopulateObjs(
      typeof populates === 'function' ? populates(key, child) : populates
    )
    // confirm at least one populate value exists on child
    const dataHasPopulateChilds = some(populatesForDataItem, (p) =>
      has(child, p.child)
    )
    // return unmodified child if no populate params exist on child
    if (!dataHasPopulateChilds) {
      return child
    }
    // combine data from all populates to one object starting with original data
    return reduce(
      map(populatesForDataItem, (p) => populateChild(state, child, p)),
      (obj, v) => defaultsDeep(v, obj),
      child
    )
  })
}
