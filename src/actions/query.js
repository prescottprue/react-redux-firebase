import { actionTypes } from '../constants'
import { promisesForPopulate } from '../utils/populate'
import { forEach } from 'lodash'
import {
  applyParamsToQuery,
  getWatcherCount,
  setWatcher,
  unsetWatcher,
  getQueryIdFromPath
} from '../utils/query'

const { START, SET, NO_VALUE, UNAUTHORIZED_ERROR } = actionTypes

/**
 * @description Watch a specific event type
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {String} event - Type of event to watch for (defaults to value)
 * @param {String} path - Path to watch with watcher
 * @param {String} dest
 */
export const watchEvent = (firebase, dispatch, { type, path, populates, queryParams, queryId, isQuery }, dest) => {
  const watchPath = !dest ? path : `${path}@${dest}`
  const counter = getWatcherCount(firebase, type, watchPath, queryId)
  queryId = queryId || getQueryIdFromPath(path)

  if (counter > 0) {
    if (queryId) {
      unsetWatcher(firebase, dispatch, type, path, queryId)
    } else {
      return
    }
  }

  setWatcher(firebase, type, watchPath, queryId)

  if (type === 'first_child') {
    return firebase.database()
      .ref()
      .child(path)
      .orderByKey()
      .limitToFirst(1)
      .once('value', snapshot => {
        if (snapshot.val() === null) {
          dispatch({
            type: NO_VALUE,
            timestamp: Date.now(),
            requesting: false,
            requested: true,
            path
          })
        }
        return snapshot
      }, (err) => {
        dispatch({
          type: UNAUTHORIZED_ERROR,
          payload: err
        })
      })
  }

  let query = firebase.database().ref().child(path)

  if (isQuery) {
    query = applyParamsToQuery(queryParams, query)
  }

  const runQuery = (q, e, p, params) => {
    dispatch({
      type: START,
      timestamp: Date.now(),
      requesting: true,
      requested: false,
      path
    })

    // Handle once queries
    if (e === 'once') {
      return q.once('value')
        .then(snapshot => {
          if (snapshot.val() !== null) {
            dispatch({
              type: SET,
              path,
              data: snapshot.val()
            })
          }
          return snapshot
        }, (err) => {
          dispatch({
            type: UNAUTHORIZED_ERROR,
            payload: err
          })
        })
    }
    // Handle all other queries

    /* istanbul ignore next: is run by tests but doesn't show in coverage */
    q.on(e, snapshot => {
      let data = (e === 'child_removed') ? undefined : snapshot.val()
      const resultPath = dest || (e === 'value') ? p : `${p}/${snapshot.key}`
      const rootPath = dest || path

      if (dest && e !== 'child_removed') {
        data = {
          _id: snapshot.key,
          val: snapshot.val()
        }
      }

      // Dispatch standard event if no populates exists
      if (!populates) {
        return dispatch({
          type: SET,
          path: resultPath,
          rootPath,
          data,
          timestamp: Date.now(),
          requesting: false,
          requested: true
        })
      }

      // TODO: Allow setting of unpopulated data before starting population through config
      promisesForPopulate(firebase, data, populates)
        .then((results) => {
          dispatch({
            type: SET,
            path: resultPath,
            rootPath,
            data,
            timestamp: Date.now(),
            requesting: false,
            requested: true
          })
          forEach(results, (result, path) => {
            dispatch({
              type: SET,
              path,
              rootPath,
              data: result,
              timestamp: Date.now(),
              requesting: false,
              requested: true
            })
          })
        })
    }, (err) => {
      dispatch({
        type: UNAUTHORIZED_ERROR,
        payload: err
      })
    })
  }

  return runQuery(query, type, path, queryParams)
}

/**
 * @description Remove watcher from an event
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Event for which to remove the watcher
 * @param {String} path - Path of watcher to remove
 */
export const unWatchEvent = (firebase, dispatch, event, path, queryId = undefined) =>
    unsetWatcher(firebase, dispatch, event, path, queryId)

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
      unWatchEvent(firebase, dispatch, event.type, event.path)
    )

export default { watchEvents, unWatchEvents }
