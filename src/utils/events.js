import { flatMap, isArray, isObject, isString, remove } from 'lodash'
import { getPopulates } from './populate'
import { getQueryIdFromPath, addQueryIdToObject } from './query'

/**
 * @description Convert path string to object with queryParams, path, and populates
 * @param {String} path - Path that can contain query parameters and populates
 * @return {Object} watchEvents - Array of watch events
 */
export const pathStrToObj = (path) => {
  let pathObj = { path, type: 'value', isQuery: false }
  const queryId = getQueryIdFromPath(path)
  // If Query id exists split params from path
  if (queryId) {
    const pathArray = path.split('#')
    pathObj = Object.assign(
      {},
      pathObj,
      {
        queryId,
        isQuery: true,
        path: pathArray[0],
        queryParams: pathArray[1].split('&')
      }
    )
    if (getPopulates(pathArray[1].split('&'))) {
      pathObj.populates = getPopulates(pathArray[1].split('&'))
      pathObj.queryParams = remove(pathArray[1].split('&'), (p) => p.indexOf('populate') === -1)
    }
  }
  // if queryId does not exist, return original pathObj
  return pathObj
}

/**
 * @description Convert watch path definition array to watch events
 * @param {Array} paths - Array of path strings, objects, and arrays to watch
 * @return {Array} watchEvents - Array of watch events
 */
export const getEventsFromInput = paths =>
  flatMap(paths, (path) => {
    if (isString(path)) {
      return [ pathStrToObj(path) ]
    }

    if (isArray(path)) {
      // TODO: Handle input other than array with string
      // TODO: Handle populates within array
      return [
        { type: 'first_child', path: path[0] },
        { type: 'child_added', path: path[0] },
        { type: 'child_removed', path: path[0] },
        { type: 'child_moved', path: path[0] },
        { type: 'child_changed', path: path[0] }
      ]
    }

    if (isObject(path)) {
      if (!path.path) {
        throw new Error('Path is a required parameter within definition object')
      }

      return [ addQueryIdToObject(path) ]
    }

    throw new Error(`Invalid Path Definition: ${path}. Only strings, objects, and arrays accepted.`)
  })

export default { getEventsFromInput }
