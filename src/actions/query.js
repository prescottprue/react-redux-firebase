import { actionTypes } from '../constants'
import {
  orderedFromSnapshot,
  populateAndDispatch,
  applyParamsToQuery,
  getWatcherCount,
  setWatcher,
  unsetWatcher,
  getQueryIdFromPath
} from '../utils/query'

/**
 * @description Watch a specific event type
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} options - Event options object
 * @param {String} options.type - Type of event to watch for (defaults to value)
 * @param {String} options.path - Path to watch with watcher
 * @param {Array} options.queryParams - List of parameters for the query
 * @param {String} options.queryId - id of the query
 * @param {Boolean} options.isQuery - id of the query
 * @param {String} options.storeAs - Location within redux to store value
 */
export const watchEvent = (firebase, dispatch, options) => {
  if (!firebase.database || typeof firebase.database !== 'function') {
    throw new Error('Firebase database is required to create watchers')
  }
  const { type, path, populates, queryParams, queryId, isQuery, storeAs } = options
  const watchPath = !storeAs ? path : `${path}@${storeAs}`
  const id = queryId || getQueryIdFromPath(path)
  const counter = getWatcherCount(firebase, type, watchPath, id)

  if (counter > 0) {
    if (id) {
      unsetWatcher(firebase, dispatch, type, path, id)
    } else {
      return
    }
  }

  setWatcher(firebase, dispatch, type, watchPath, id)

  if (type === 'first_child') {
    return firebase.database()
      .ref()
      .child(path)
      .orderByKey()
      .limitToFirst(1)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() === null) {
          dispatch({
            type: actionTypes.NO_VALUE,
            path: storeAs || path
          })
        }
        return snapshot
      })
      .catch(err => {
        dispatch({
          type: actionTypes.ERROR,
          path: storeAs || path,
          payload: err
        })
      })
  }

  let query = firebase.database().ref().child(path)

  if (isQuery) {
    query = applyParamsToQuery(queryParams, query)
  }

  dispatch({ type: actionTypes.START, path: storeAs || path })

  // Handle once queries
  if (type === 'once') {
    return query.once('value')
      .then(snapshot => {
        if (snapshot.val() === null) {
          return dispatch({
            type: actionTypes.NO_VALUE,
            path: storeAs || path
          })
        }
        // dispatch normal event if no populates exist
        if (!populates) {
          // create an array for preserving order of children under ordered
          return dispatch({
            type: actionTypes.SET,
            path: storeAs || path,
            data: snapshot.val(),
            ordered: orderedFromSnapshot(snapshot)
          })
        }
        // populate and dispatch associated actions if populates exist
        return populateAndDispatch(firebase, dispatch, {
          path,
          storeAs,
          snapshot,
          data: snapshot.val(),
          populates
        })
      })
      .catch(err => {
        dispatch({
          type: actionTypes.UNAUTHORIZED_ERROR,
          payload: err
        })
        return Promise.reject(err)
      })
  }
  // Handle all other queries

  /* istanbul ignore next: is run by tests but doesn't show in coverage */
  query.on(type, (snapshot) => {
    let data = (type === 'child_removed') ? undefined : snapshot.val()
    const resultPath = storeAs || (type === 'value') ? path : `${path}/${snapshot.key}`

    // Dispatch standard event if no populates exists
    if (!populates) {
      // create an array for preserving order of children under ordered
      const ordered = type === 'child_added'
        ? [{ key: snapshot.key, value: snapshot.val() }]
        : orderedFromSnapshot(snapshot)
      return dispatch({
        type: actionTypes.SET,
        path: storeAs || resultPath,
        data,
        ordered
      })
    }
    // populate and dispatch associated actions if populates exist
    return populateAndDispatch(firebase, dispatch, {
      path,
      storeAs,
      snapshot,
      data: snapshot.val(),
      populates
    })
  }, (err) => {
    dispatch({ type: actionTypes.ERROR, payload: err })
  })
}

/**
 * @description Remove watcher from an event
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} options - Settings for watcher removal
 * @param {String} options.event - Event for which to remove the watcher
 * @param {String} options.path - Path of watcher to remove
 * @param {String} options.storeAs - storeAs path of watcher to remove
 * @param {String} options.queryId - id of query for which to unset watcher
 */
export const unWatchEvent = (firebase, dispatch, { type, path, storeAs, queryId }) => {
  const watchPath = !storeAs ? path : `${path}@${storeAs}`
  unsetWatcher(firebase, dispatch, type, watchPath, queryId)
}

/**
 * @description Add watchers to a list of events
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {Array} events - List of events for which to add watchers
 */
export const watchEvents = (firebase, dispatch, events) =>
  events.forEach(event =>
    watchEvent(firebase, dispatch, event)
  )

/**
 * @description Remove watchers from a list of events
 * @param {Object} firebase - Internal firebase object
 * @param {Array} events - List of events for which to remove watchers
 */
export const unWatchEvents = (firebase, dispatch, events) =>
  events.forEach(event =>
    unWatchEvent(firebase, dispatch, event)
  )

export default { watchEvents, unWatchEvents }
