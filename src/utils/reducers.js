import { get, replace, size } from 'lodash'
import { unset } from 'lodash/fp'

/**
 * Create a path array from path string
 * @param  {String} path - Path seperated with slashes
 * @return {Array} Path as Array
 * @private
 */
export function pathToArr (path) {
  return path ? path.split(/\//).filter(p => !!p) : []
}

/**
 * Trim leading slash from path for use with state
 * @param  {String} path - Path seperated with slashes
 * @return {String} Path seperated with slashes
 * @private
 */
export function getSlashStrPath (path) {
  return pathToArr(path).join('/')
}

/**
 * Convert path with slashes to dot seperated path (for use with lodash get/set)
 * @param  {String} path - Path seperated with slashes
 * @return {String} Path seperated with dots
 * @private
 */
export function getDotStrPath (path) {
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
export const combineReducers = reducers =>
  (state = {}, action) =>
    Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key]( // eslint-disable-line no-param-reassign
          state[key],
          action
        )
        return nextState
      },
      {}
    )

/**
 * Get path from meta data. Path is used with lodash's setWith to set deep
 * data within reducers.
 * @param  {Object} meta - Action meta data object
 * @param  {String} meta.collection - Name of Collection for which the action
 * is to be handled.
 * @param  {String} meta.doc - Name of Document for which the action is to be
 * handled.
 * @param  {Array} meta.subcollections - Subcollections of data
 * @param  {String} meta.storeAs - Another key within redux store that the
 * action associates with (used for storing data under a path different
 * from its collection/document)
 * @return {String} String path to be used within reducer
 */
export function pathFromMeta (meta) {
  if (!meta) {
    throw new Error('Action meta is required to build path for reducers.')
  }
  const { collection, doc, subcollections, storeAs } = meta
  if (storeAs) {
    return storeAs
  }
  if (!collection) {
    throw new Error('Collection is required to construct reducer path.')
  }
  let basePath = collection
  if (doc) {
    basePath += `.${doc}`
  }
  if (!subcollections) {
    return basePath
  }
  const mappedCollections = subcollections.map(pathFromMeta)
  return basePath.concat(`.${mappedCollections.join('.')}`)
}

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

/**
 * Update a single item within an array
 * @param  {Array} array - Array within which to update item
 * @param  {String} itemId - Id of item to update
 * @param  {Function} updateItemCallback - Callback dictacting how the item
 * is updated
 * @return {Array} Array with item updated
 */
export function updateItemInArray (array, itemId, updateItemCallback) {
  const updatedItems = array.map((item) => {
    if (item.id !== itemId) {
      // Since we only want to update one item, preserve all others as they are now
      return item
    }

    // Use the provided callback to create an updated item
    const updatedItem = updateItemCallback(item)
    return updatedItem
  })

  return updatedItems
}
