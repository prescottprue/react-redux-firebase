import { actionTypes } from '../constants'
import { promisesForPopulate } from './populate'
import { isNaN, forEach } from 'lodash'
import { isString } from './index'

/**
 * @private
 * @param {string|number} value - Item to attempt to parse to a number
 * @returns {any} Number if parse to number was successful, otherwise,
 * original value
 */
function tryParseToNumber(value) {
  const result = Number(value)
  if (isNaN(result)) {
    return value
  }
  return result
}

/**
 * @private
 * @param {string} event - Type of event to watch for
 * @param {string} path - Path to watch with watcher
 * @returns {string} watchPath
 */
export function getWatchPath(event, path) {
  if (!event || event === '' || !path) {
    throw new Error('Event and path are required')
  }
  return `${event}:${path.substring(0, 1) === '/' ? '' : '/'}${path}`
}

/**
 * @private
 * @param {string} path - Path from which to get query id
 * @param {string} event - Type of query event
 * @returns {string} Query id
 */
export function getQueryIdFromPath(path, event) {
  if (!isString(path)) {
    throw new Error('Query path must be a string')
  }
  const origPath = path
  const pathSplitted = path.split('#')
  path = pathSplitted[0]

  const isQuery = pathSplitted.length > 1
  const queryParams = isQuery ? pathSplitted[1].split('&') : []
  const queryId = isQuery
    ? queryParams
        .map((param) => {
          const splittedParam = param.split('=')
          // Handle query id in path
          if (splittedParam[0] === 'queryId') {
            return splittedParam[1]
          }
        })
        .filter((q) => q)
    : undefined
  return queryId && queryId.length > 0
    ? event
      ? `${event}:/${queryId}`
      : queryId[0]
    : isQuery
    ? origPath
    : undefined
}

/**
 * @private
 * @param {object} firebase - Internal firebase object
 * @param {Function} dispatch - Redux dispatch function
 * @param {string} event - Type of event to watch for
 * @param {string} path - Path to watch with watcher
 * @param {string} queryId - Id of query
 * @returns {number} watcherCount - count
 */
export function setWatcher(firebase, dispatch, event, path, queryId) {
  const id =
    queryId || getQueryIdFromPath(path, event) || getWatchPath(event, path)

  if (firebase._.watchers[id]) {
    firebase._.watchers[id]++
  } else {
    firebase._.watchers[id] = 1
  }

  dispatch({ type: actionTypes.SET_LISTENER, path, payload: { id } })

  return firebase._.watchers[id]
}

/**
 * @private
 * @param {object} firebase - Internal firebase object
 * @param {string} event - Type of event to watch for
 * @param {string} path - Path to watch with watcher
 * @param {string} queryId - Id of query
 * @returns {number} watcherCount
 */
export function getWatcherCount(firebase, event, path, queryId) {
  const id =
    queryId || getQueryIdFromPath(path, event) || getWatchPath(event, path)
  return firebase._.watchers[id]
}

/**
 * @private
 * @param {object} firebase - Internal firebase object
 * @param {Function} dispatch - Redux's dispatch function
 * @param {string} event - Type of event to watch for
 * @param {string} path - Path to watch with watcher
 * @param {string} queryId - Id of query
 */
export function unsetWatcher(firebase, dispatch, event, path, queryId) {
  const id =
    queryId || getQueryIdFromPath(path, event) || getWatchPath(event, path)
  path = path.split('#')[0]
  const { watchers } = firebase._
  if (watchers[id] <= 1) {
    delete watchers[id]
    if (event !== 'first_child' && event !== 'once') {
      firebase.database().ref().child(path).off(event)
    }
  } else if (watchers[id]) {
    watchers[id]--
  }

  dispatch({ type: actionTypes.UNSET_LISTENER, path, payload: { id } })
}

/**
 * Modify query to include methods based on query parameters (such
 * as orderByChild).
 * @param {Array} queryParams - Array of query parameters to apply to query
 * @param {object} query - Query object on which to apply query parameters
 * @returns {firebase.database.Query} Query with query params applied
 */
export function applyParamsToQuery(queryParams, query) {
  let doNotParse = false
  if (queryParams) {
    queryParams.forEach((param) => {
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
        case 'parsed':
          // support disabling internal number parsing (number strings)
          doNotParse = false
          break
        case 'equalTo':
          let equalToParam = !doNotParse ? tryParseToNumber(param[1]) : param[1] // eslint-disable-line no-case-declarations
          equalToParam = equalToParam === 'null' ? null : equalToParam
          equalToParam = equalToParam === 'false' ? false : equalToParam
          equalToParam = equalToParam === 'true' ? true : equalToParam
          query =
            param.length === 3
              ? query.equalTo(equalToParam, param[2])
              : query.equalTo(equalToParam)
          break
        case 'startAt':
          let startAtParam = !doNotParse ? tryParseToNumber(param[1]) : param[1] // eslint-disable-line no-case-declarations
          startAtParam = startAtParam === 'null' ? null : startAtParam
          query =
            param.length === 3
              ? query.startAt(startAtParam, param[2])
              : query.startAt(startAtParam)
          break
        case 'endAt':
          let endAtParam = !doNotParse ? tryParseToNumber(param[1]) : param[1] // eslint-disable-line no-case-declarations
          endAtParam = endAtParam === 'null' ? null : endAtParam
          query =
            param.length === 3
              ? query.endAt(endAtParam, param[2])
              : query.endAt(endAtParam)
          break
      }
    })
  }

  return query
}

/**
 * Get ordered array from snapshot
 * @param {firebase.database.DataSnapshot} snap - Data for which to create
 * an ordered array.
 * @returns {Array|null} Ordered list of children from snapshot or null
 */
export function orderedFromSnapshot(snap) {
  if (snap.hasChildren && !snap.hasChildren()) {
    return null
  }
  const ordered = []
  if (snap.forEach) {
    snap.forEach((child) => {
      ordered.push({ key: child.key, value: child.val() })
    })
  }
  return ordered.length ? ordered : null
}

/**
 * Get data associated with populate settings, and dispatch
 *
 * @param {object} firebase - Internal firebase object
 * @param {Function} dispatch - Redux's dispatch function
 * @param {object} config - Config object
 * @param {any} config.data - Original query data result
 * @param {Array} config.populates - List of populate settings
 * @param {string} config.path - Base query path
 * @param {string} config.storeAs - Location within redux in which to
 * query results will be stored (path is used as default if not provided).
 * @returns {Promise} Promise that resolves after data for populates has been
 * loaded and associated actions have been dispatched
 * @private
 */
export function populateAndDispatch(firebase, dispatch, config) {
  const { data, populates, snapshot, path, storeAs } = config
  // TODO: Allow setting of unpopulated data before starting population through config
  return promisesForPopulate(firebase, snapshot.key, data, populates)
    .then((results) => {
      // dispatch child sets first so isLoaded is only set to true for
      // populatedDataToJS after all data is in redux (Issue #121)
      // TODO: Allow config to toggle Combining into one SET action
      // TODO: Set ordered for populate queries
      forEach(results, (result, path) => {
        dispatch({
          type: actionTypes.MERGE,
          path,
          data: result
        })
      })
      dispatch({
        type: actionTypes.SET,
        path: storeAs || path,
        data,
        ordered: orderedFromSnapshot(snapshot)
      })
      return results
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.ERROR,
        payload: err
      })
      return Promise.reject(err)
    })
}
