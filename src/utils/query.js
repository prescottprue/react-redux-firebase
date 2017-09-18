import { actionTypes } from '../constants'
import { isNaN, isFunction } from 'lodash'

const { UNSET_LISTENER } = actionTypes

const tryParseToNumber = (value) => {
  const result = Number(value)
  if (isNaN(result)) {
    return value
  }
  return result
}

/**
 * @private
 * @description Get path to watch
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @return {String} watchPath
 */
export const getWatchPath = (event, path) => {
  if (!event || event === '' || !path) {
    throw new Error('Event and path are required')
  }
  return `${event}:${((path.substring(0, 1) === '/') ? '' : '/')}${path}`
}

/**
 * @private
 * @description Get query id from query path
 * @param {String} path - Path from which to get query id
 * @param {String} event - Type of query event
 */
export const getQueryIdFromPath = (path, event = undefined) => {
  const origPath = path
  let pathSplitted = path.split('#')
  path = pathSplitted[0]

  const isQuery = pathSplitted.length > 1
  const queryParams = isQuery ? pathSplitted[1].split('&') : []
  const queryId = isQuery ? queryParams.map((param) => {
    let splittedParam = param.split('=')
    // Handle query id in path
    if (splittedParam[0] === 'queryId') {
      return splittedParam[1]
    }
  }).filter(q => q) : undefined
  return (queryId && queryId.length > 0)
      ? (event ? `${event}:/${queryId}` : queryId[0])
      : ((isQuery) ? origPath : undefined)
}

/**
 * @private
 * @description Update the number of watchers for a query
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} queryId - Id of query
 * @return {Integer} watcherCount - count
 */
export const setWatcher = (firebase, event, path, queryId = undefined) => {
  const id = queryId || getQueryIdFromPath(path, event) || getWatchPath(event, path)

  if (firebase._.watchers[id]) {
    firebase._.watchers[id]++
  } else {
    firebase._.watchers[id] = 1
  }

  return firebase._.watchers[id]
}

/**
 * @private
 * @description Get count of currently attached watchers
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} queryId - Id of query
 * @return {Number} watcherCount
 */
export const getWatcherCount = (firebase, event, path, queryId = undefined) => {
  const id = queryId || getQueryIdFromPath(path, event) || getWatchPath(event, path)
  return firebase._.watchers[id]
}

/**
 * @private
 * @description Remove/Unset a watcher
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} queryId - Id of query
 */
export const unsetWatcher = (firebase, dispatch, event, path, queryId = undefined) => {
  let id = queryId || getQueryIdFromPath(path, event) || getWatchPath(event, path)
  path = path.split('#')[0]
  const { watchers, config } = firebase._
  if (watchers[id] <= 1) {
    delete watchers[id]
    if (event !== 'first_child' && event !== 'once') {
      firebase.database().ref().child(path).off(event)
      // TODO: Remove config.distpatchOnUnsetListener
      if (config.dispatchOnUnsetListener || config.distpatchOnUnsetListener) {
        if (config.distpatchOnUnsetListener && isFunction(console.warn)) {  // eslint-disable-line no-console
          console.warn('config.distpatchOnUnsetListener is Depreceated and will be removed in future versions. Please use config.dispatchOnUnsetListener (dispatch spelled correctly).') // eslint-disable-line no-console
        }
        dispatch({ type: UNSET_LISTENER, path })
      }
    }
  } else if (watchers[id]) {
    watchers[id]--
  }
}

/**
 * @description Modify query to include methods based on query parameters (such as orderByChild)
 * @param {Array} queryParams - Array of query parameters to apply to query
 * @param {Object} query - Query object on which to apply query parameters
 * @return {FirebaseQuery}
 */
export const applyParamsToQuery = (queryParams, query) => {
  let doNotParse = false
  if (queryParams) {
    queryParams.forEach(param => {
      param = param.split('=')
      switch (param[0]) {
        case 'orderByValue':
          query = query.orderByValue()
          doNotParse = true
          break
        case 'orderByPriority':
          query = query.orderByPriority()
          doNotParse = true
          break
        case 'orderByKey':
          query = query.orderByKey()
          doNotParse = true
          break
        case 'orderByChild':
          query = query.orderByChild(param[1])
          break
        case 'limitToFirst':
          // TODO: Handle number not being passed as param
          query = query.limitToFirst(parseInt(param[1], 10))
          break
        case 'limitToLast':
          // TODO: Handle number not being passed as param
          query = query.limitToLast(parseInt(param[1], 10))
          break
        case 'notParsed':
          // support disabling internal number parsing (number strings)
          doNotParse = true
          break
        case 'equalTo':
          let equalToParam = !doNotParse ? tryParseToNumber(param[1]) : param[1]
          equalToParam = equalToParam === 'null' ? null : equalToParam
          equalToParam = equalToParam === 'false' ? false : equalToParam
          equalToParam = equalToParam === 'true' ? true : equalToParam
          query = param.length === 3
            ? query.equalTo(equalToParam, param[2])
            : query.equalTo(equalToParam)
          break
        case 'startAt':
          let startAtParam = !doNotParse ? tryParseToNumber(param[1]) : param[1]
          startAtParam = startAtParam === 'null' ? null : startAtParam
          query = param.length === 3
            ? query.startAt(startAtParam, param[2])
            : query.startAt(startAtParam)
          break
        case 'endAt':
          let endAtParam = !doNotParse ? tryParseToNumber(param[1]) : param[1]
          endAtParam = endAtParam === 'null' ? null : endAtParam
          query = param.length === 3
            ? query.endAt(endAtParam, param[2])
            : query.endAt(endAtParam)
          break
      }
    })
  }

  return query
}
