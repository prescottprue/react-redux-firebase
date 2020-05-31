import { get, size, pick } from 'lodash'
import { unset } from 'lodash/fp'

/**
 * Create a path array from path string
 * @param {string} path - Path seperated with slashes
 * @returns {Array} Path as Array
 * @private
 */
export function pathToArr(path) {
  return path ? path.split(/\//).filter((p) => !!p) : []
}

/**
 * Trim leading slash from path for use with state
 * @param {string} path - Path seperated with slashes
 * @returns {string} Path seperated with slashes
 * @private
 */
export function getSlashStrPath(path) {
  return pathToArr(path).join('/')
}

/**
 * Convert path with slashes to dot seperated path (for use with lodash get/set)
 * @param {string} path - Path seperated with slashes
 * @returns {string} Path seperated with dots
 * @private
 */
export function getDotStrPath(path) {
  return pathToArr(path).join('.')
}

/**
 * Combine reducers utility (abreveated version of redux's combineReducer).
 * Turns an object whose values are different reducer functions, into a single
 * reducer function.
 * @param {object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one.
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 * @private
 */
export function combineReducers(reducers) {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](
        // eslint-disable-line no-param-reassign
        state[key],
        action
      )
      return nextState
    }, {})
  }
}

/**
 * Preserve values from redux state change
 * @param {object} state - Redux state
 * @param {Function|boolean|Array} preserveSetting - Setting for which values to preserve
 * from redux state
 * @param {object} nextState - Next redux state
 * @returns {object} State with values preserved
 */
export function preserveValuesFromState(state, preserveSetting, nextState) {
  // Return result of function if preserve is a function
  if (typeof preserveSetting === 'function') {
    return preserveSetting(state, nextState)
  }

  // Return original state if preserve is true
  if (preserveSetting === true) {
    return nextState ? { ...state, ...nextState } : state
  }

  if (Array.isArray(preserveSetting)) {
    return pick(state, preserveSetting) // pick returns a new object
  }

  throw new Error(
    'Invalid preserve parameter. It must be an Object or an Array'
  )
}

/**
 * Recursively unset a property starting at the deep path, and unsetting the parent
 * property if there are no other enumerable properties at that level.
 * @param {string} path - Deep dot path of the property to unset
 * @param {object} obj - Object from which path should be recursivley unset
 * @param {boolean} [isRecursiveCall=false] - Used internally to ensure that
 * the object size check is only performed after one iteration.
 * @returns {object} The object with the property deeply unset
 * @private
 */
export function recursiveUnset(path, obj, isRecursiveCall = false) {
  if (!path) {
    return obj
  }

  if (size(get(obj, path)) > 0 && isRecursiveCall) {
    return obj
  }
  // The object does not have any other properties at this level.  Remove the
  // property.
  const objectWithRemovedKey = unset(path, obj)
  const newPath = path.match(/\./) ? path.replace(/\.[^.]*$/, '') : ''
  return recursiveUnset(newPath, objectWithRemovedKey, true)
}
