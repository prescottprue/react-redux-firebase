import { flatMap, isArray, isObject, isString } from 'lodash'
import { getPopulates } from './populate'

/**
 * @description Convert watch path definition array to watch events
 * @param {Array} paths - Array of path strings, objects, and arrays to watch
 * @return {Array} watchEvents - Array of watch events
 */
export const getEventsFromInput = paths =>
  flatMap(paths, (path) => {
    if (isString(path)) {
      const pathObj = { path, type: 'value' }
      if (getPopulates(path)) {
        pathObj.populates = getPopulates(path)
      }
      return [ pathObj ]
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
      // TODO: Check for type/name and path
      return [ path ]
    }

    throw new Error(`Invalid Path Definition: ${path}. Only strings, objects, and arrays accepted.`)
  })

export default { getEventsFromInput }
