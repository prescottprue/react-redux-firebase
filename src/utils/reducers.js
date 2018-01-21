import { get, replace, size } from 'lodash'
import { unset } from 'lodash/fp'

/**
 * Create a path array from path string
 * @param  {String} path - Path seperated with slashes
 * @return {Array} Path as Array
 * @private
 */
export function pathToArr(path) {
  return path ? path.split(/\//).filter(p => !!p) : []
}

/**
 * Trim leading slash from path for use with state
 * @param  {String} path - Path seperated with slashes
 * @return {String} Path seperated with slashes
 * @private
 */
export function getSlashStrPath(path) {
  return pathToArr(path).join('/')
}

/**
 * Convert path with slashes to dot seperated path (for use with lodash get/set)
 * @param  {String} path - Path seperated with slashes
 * @return {String} Path seperated with dots
 * @private
 */
export function getDotStrPath(path) {
  return pathToArr(path).join('.')
}

/**
 * Combine reducers utility (abreveated version of redux's combineReducer).
 * Turns an object whose values are different reducer functions, into a single
 * reducer function.
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one.
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 * @private
 */
export const combineReducers = reducers => (state = {}, action) =>
  Object.keys(reducers).reduce((nextState, key) => {
    nextState[key] = reducers[key](
      // eslint-disable-line no-param-reassign
      state[key],
      action
    )
    return nextState
  }, {})

/**
 * Recursively unset a property starting at the deep path, and unsetting the parent
 * property if there are no other enumerable properties at that level.
 * @param  {String} path - Deep dot path of the property to unset
 * @param {Boolean} [isRecursiveCall=false] - Used internally to ensure that
 * the object size check is only performed after one iteration.
 * @return {Object} The object with the property deeply unset
 * @private
 */
export const recursiveUnset = (path, obj, isRecursiveCall = false) => {
  if (!path) {
    return obj
  }

  if (size(get(obj, path)) > 0 && isRecursiveCall) {
    return obj
  }
  // The object does not have any other properties at this level.  Remove the
  // property.
  const objectWithRemovedKey = unset(path, obj)
  const newPath = path.match(/\./) ? replace(path, /\.[^.]*$/, '') : ''
  return recursiveUnset(newPath, objectWithRemovedKey, true)
}
