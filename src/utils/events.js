import { filter, flatMap } from 'lodash'
import { defaultEvent } from '../constants'

/**
 * @description Create an array of promises for population
 * @param {Object} firebase - Internal firebase object
 * @param {Object} originalObj - Object to have parameter populated
 * @param {Object} populateString - String containg population data
 */
export const getQueryObject = (str) => {
  let pathArray = str.split('#')
  const path = pathArray[0]
  const params = pathArray[1].split('&')
  console.log('path, params', { path, params })
  // Get list of populates
  const populates = filter(params, param =>
    param.indexOf('populate') !== -1
  ).map(p => p.split('=')[1])
  console.log('populates', { path, populates })
  return { path, populates }
}

const transformEvent = event => Object.assign({}, defaultEvent, event)

const createEvents = ({type, path}) => {
  switch (type) {
    case 'once':
      return [{name: 'once', path}]

    case 'value':
      return [{name: 'value', path}]

    case 'all':
      return [
        {name: 'first_child', path},
        {name: 'child_added', path},
        {name: 'child_removed', path},
        {name: 'child_moved', path},
        {name: 'child_changed', path}
      ]

    default:
      return []
  }
}

export const getEventsFromDefinition = def =>
  flatMap(def.map(path => {
    if (typeof path === 'string' || path instanceof String) {
      return createEvents(transformEvent({ path }))
    }

    if (typeof path === 'array' || path instanceof Array) { // eslint-disable-line
      return createEvents(transformEvent({ type: 'all', path: path[0] }))
    }

    if (typeof path === 'object' || path instanceof Object) {
      const type = path.type || 'value'
      switch (type) {
        case 'value':
          return createEvents(transformEvent({ path: path.path }))

        case 'once':
          return createEvents(transformEvent({ type: 'once', path: path.path }))

        case 'array':
          return createEvents(transformEvent({ type: 'all', path: path.path }))
      }
    }

    return []
  })
)

export default { getEventsFromDefinition }
