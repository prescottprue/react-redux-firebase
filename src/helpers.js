import { size, map } from 'lodash'

/**
 * @description Detect whether items are loaded yet or not
 * @param {Object} item - Item to check loaded status of. A comma seperated list is also acceptable.
 * @return {Boolean} Whether or not item is loaded
 * @example
 * import React, { Component } from 'react'
 * import PropTypes from 'prop-types'
 * import { connect } from 'react-redux'
 * import { firebaseConnect, isLoaded, dataToJS } from 'react-redux-firebase'
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
export const isLoaded = () => {
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
 * import React, { Component } from 'react'
 * import PropTypes from 'prop-types'
 * import { connect } from 'react-redux'
 * import { firebaseConnect, isEmpty, dataToJS } from 'react-redux-firebase'
 *
 * @firebaseConnect(['/todos'])
 * @connect(
 *   ({ firebase: { data: { todos } } }) => ({
 *     todos
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
 * @private
 * @description Build child list based on populate
 * @param {Map} data - Immutable Map to be converted to JS object (state.firebase)
 * @param {Object} list - Path of parameter to load
 * @param {Object} populate - Object with population settings
 */
// export const buildChildList = (data, list, p) =>
//   mapValues(list, (val, key) => {
//     let getKey = val
//      // Handle key: true lists
//     if (val === true) {
//       getKey = key
//     }
//     const pathString = p.childParam
//       ? `${p.root}/${getKey}/${p.childParam}`
//       : `${p.root}/${getKey}`
//     // Set to child under key if populate child exists
//     if (dataToJS(data, pathString)) {
//       return p.keyProp
//         ? { [p.keyProp]: getKey, ...dataToJS(data, pathString) }
//         : dataToJS(data, pathString)
//     }
//     // Populate child does not exist
//     return val === true ? val : getKey
//   })

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
// export const populatedDataToJS = (data, path, populates, notSetValue) => {
//   if (!data) {
//     return notSetValue
//   }
//   // Handle undefined child
//   if (!dataToJS(data, path, notSetValue)) {
//     return dataToJS(data, path, notSetValue)
//   }
//   // test if data is a single object vs a list of objects, try generating
//   // populates and testing for key presence
//   const populatesForData = getPopulateObjs(isFunction(populates)
//     ? populates(last(split(path, '/')), dataToJS(data, path))
//     : populates)
//   const dataHasPopluateChilds = every(populatesForData, (populate) => (
//     has(dataToJS(data, path), populate.child)
//   ))
//   if (dataHasPopluateChilds) {
//     // Data is a single object, resolve populates directly
//     return reduce(
//       map(populatesForData, (p, obj) => {
//         // populate child is key
//         if (isString(get(dataToJS(data, path), p.child))) {
//           const key = get(dataToJS(data, path), p.child)
//           const pathString = p.childParam
//             ? `${p.root}/${key}/${p.childParam}`
//             : `${p.root}/${key}`
//           if (dataToJS(data, pathString)) {
//             return set({}, p.child, p.keyProp
//               ? { [p.keyProp]: key, ...dataToJS(data, pathString) }
//               : dataToJS(data, pathString)
//             )
//           }
//
//           // matching child does not exist
//           return dataToJS(data, path)
//         }
//         return set({}, p.child, buildChildList(data, get(dataToJS(data, path), p.child), p))
//       }),
//       // combine data from all populates to one object starting with original data
//       (obj, v) => defaultsDeep(v, obj), dataToJS(data, path))
//   } else {
//     // Data is a map of objects, each value has parameters to be populated
//     return mapValues(dataToJS(data, path), (child, childKey) => {
//       const populatesForDataItem = getPopulateObjs(isFunction(populates)
//       ? populates(childKey, child)
//       : populates)
//       const resolvedPopulates = map(populatesForDataItem, (p, obj) => {
//         // no matching child parameter
//         if (!child || !get(child, p.child)) {
//           return child
//         }
//         // populate child is key
//         if (isString(get(child, p.child))) {
//           const key = get(child, p.child)
//           const pathString = p.childParam
//             ? `${p.root}/${key}/${p.childParam}`
//             : `${p.root}/${key}`
//           if (dataToJS(data, pathString)) {
//             return set({}, p.child, (p.keyProp
//               ? { [p.keyProp]: key, ...dataToJS(data, pathString) }
//               : dataToJS(data, pathString))
//             )
//           }
//           // matching child does not exist
//           return child
//         }
//         // populate child list
//         return set({}, p.child, buildChildList(data, get(child, p.child), p))
//       })
//
//       // combine data from all populates to one object starting with original data
//       return reduce(
//         resolvedPopulates,
//         (obj, v) => defaultsDeep(v, obj),
//         child
//       )
//     })
//   }
// }

export default {
  isLoaded,
  isEmpty
}
