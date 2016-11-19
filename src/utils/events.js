import { filter, flatMap } from 'lodash'
import { defaultEvent } from '../constants'

export const getPopulateObj = (str) => {
  // console.log('getPopulateObj', str)
  const strArray = str.split(':')
  // TODO: Handle already object
  return { child: strArray[0], root: strArray[1] }
}

/**
 * @description Create an array of promises for population
 * @param {Object} firebase - Internal firebase object
 * @param {Object} originalObj - Object to have parameter populated
 * @param {Object} populateString - String containg population data
 */
export const getPopulates = (str) => {
  const pathArray = str.split('#')
  if (!pathArray[1]) {
    return {}
  }
  const params = pathArray[1].split('&')
  // Get list of populates
  const populates = filter(params, param =>
    param.indexOf('populate') !== -1
  ).map(p => p.split('=')[1])
  return populates.map(getPopulateObj)
}

const transformEvent = event => Object.assign({}, defaultEvent, event)

const createEvents = ({type, path, populates}) => {
  if (!populates) {
    populates = getPopulates(path)
  }
  // console.log('create events:', { type, path, populates })
  switch (type) {
    case 'once':
      return [{name: 'once', path, populates}]

    case 'value':
      return [{name: 'value', path, populates}]

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
