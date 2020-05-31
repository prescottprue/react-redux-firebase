import { flatMap, isObject, remove } from 'lodash'
import { getPopulates } from './populate'
import { getQueryIdFromPath } from './query'

/**
 * @description Convert path string to object with queryParams, path, and populates
 * @param {string} path - Path that can contain query parameters and populates
 * @returns {object} watchEvents - Array of watch events
 */
export function pathStrToObj(path) {
  let pathObj = { path, type: 'value', isQuery: false }
  const queryId = getQueryIdFromPath(path)
  // If Query id exists split params from path
  if (queryId) {
    const pathArray = path.split('#')
    pathObj = Object.assign({}, pathObj, {
      queryId,
      isQuery: true,
      path: pathArray[0],
      queryParams: pathArray[1].split('&')
    })
    if (getPopulates(pathArray[1].split('&'))) {
      pathObj.populates = getPopulates(pathArray[1].split('&'))
      pathObj.queryParams = remove(
        pathArray[1].split('&'),
        (p) => p.indexOf('populate') === -1
      )
    }
  }
  // if queryId does not exist, return original pathObj
  return pathObj
}

/**
 * @description Convert watch path definition array to watch events
 * @param {Array} paths - Array of path strings, objects, and arrays to watch
 * @returns {Array} watchEvents - Array of watch events
 */
export function getEventsFromInput(paths) {
  return flatMap(paths, (path) => {
    // If path is a string - convert to obj and place within new array
    if (typeof path === 'string' || path instanceof String) {
      return [pathStrToObj(path)]
    }

    if (Array.isArray(path)) {
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
      let strPath = path.path

      if (path.storeAs) {
        // append storeAs to query path
        strPath += `@${path.storeAs}`
      }

      if (path.queryParams) {
        // append query params to path for queryId added in pathStrToObj
        strPath += `#${path.queryParams.join('&')}`
      }

      // Add all parameters that are missing (ones that exist will remain)
      path = Object.assign({}, pathStrToObj(strPath), path)
      return [path]
    }

    throw new Error(
      `Invalid Path Definition: ${path}. Only strings, objects, and arrays accepted.`
    )
  })
}

export default { getEventsFromInput }
