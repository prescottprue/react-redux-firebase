import {
  size,
  map,
  some,
  first,
  drop,
  mapValues,
  reduce,
  isString,
  defaultsDeep
} from 'lodash'
import { getPopulateObjs } from './utils/populate'
import { metaParams, paramSplitChar } from './constants'

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
export const orderedToJS = (data, path, notSetValue) => {
  if (!data) {
    return notSetValue
  }

  const pathArr = `/ordered${fixPath(path)}`.split(/\//).slice(1)

  if (data.getIn) {
    return toJS(data.getIn(pathArr, notSetValue))
  }

  return data
}

/**
 * @private
 * @description Build child list based on populate
 * @param {Map} data - Immutable Map to be converted to JS object (state.firebase)
 * @param {Object} list - Path of parameter to load
 * @param {Object} populate - Object with population settings
 */
export const buildChildList = (data, list, p) =>
  mapValues(list, (val, key) => {
    let getKey = val
     // Handle key: true lists
    if (val === true) {
      getKey = key
    }
    const pathString = p.childParam
      ? `${p.root}/${getKey}/${p.childParam}`
      : `${p.root}/${getKey}`
    // Set to child under key if populate child exists
    if (dataToJS(data, pathString)) {
      return p.keyProp
        ? { [p.keyProp]: getKey, ...dataToJS(data, pathString) }
        : dataToJS(data, pathString)
    }
    // Populate child does not exist
    return val === true ? val : getKey
  })

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
export const populatedDataToJS = (data, path, populates, notSetValue) => {
  if (!data) {
    return notSetValue
  }
  // Handle undefined child
  if (!dataToJS(data, path, notSetValue)) {
    return dataToJS(data, path, notSetValue)
  }
  const populateObjs = getPopulateObjs(populates)
  // reduce array of populates to object of combined populated data
  return reduce(
    map(populateObjs, (p, obj) => {
      // single item with iterable child
      if (dataToJS(data, path)[p.child]) {
        // populate child is key
        if (isString(dataToJS(data, path)[p.child])) {
          const key = dataToJS(data, path)[p.child]
          const pathString = p.childParam
            ? `${p.root}/${key}/${p.childParam}`
            : `${p.root}/${key}`
          if (dataToJS(data, pathString)) {
            return {
              [p.child]: p.keyProp
                ? { [p.keyProp]: key, ...dataToJS(data, pathString) }
                : dataToJS(data, pathString)
            }
          }

          // matching child does not exist
          return dataToJS(data, path)
        }

        return {
          [p.child]: buildChildList(data, dataToJS(data, path)[p.child], p)
        }
      }
      // list with child param in each item
      return mapValues(dataToJS(data, path), (child, i) => {
        // no matching child parameter
        if (!child || !child[p.child]) {
          return child
        }
        // populate child is key
        if (isString(child[p.child])) {
          const key = child[p.child]
          const pathString = p.childParam
            ? `${p.root}/${key}/${p.childParam}`
            : `${p.root}/${key}`
          if (dataToJS(data, pathString)) {
            return {
              [p.child]: p.keyProp
                ? { [p.keyProp]: key, ...dataToJS(data, pathString) }
                : dataToJS(data, pathString)
            }
          }
          // matching child does not exist
          return child
        }
        // populate child list
        return {
          [p.child]: buildChildList(data, child[p.child], p)
        }
      })
    }),
  // combine data from all populates to one object starting with original data
  (obj, v) => defaultsDeep(v, obj), dataToJS(data, path))
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
  if (!data) {
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
  orderedToJS,
  populatedDataToJS,
  customToJS,
  isLoaded,
  isEmpty
}
