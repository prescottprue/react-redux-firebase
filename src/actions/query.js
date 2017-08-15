import { forEach, size } from 'lodash'
import { actionTypes } from '../constants'
import { promisesForPopulate } from '../utils/populate'
import {
  applyParamsToQuery,
  getWatcherCount,
  setWatcher,
  unsetWatcher,
  getQueryIdFromPath
} from '../utils/query'

const { START, SET, NO_VALUE, UNAUTHORIZED_ERROR, ERROR } = actionTypes

/**
 * @description Watch a specific event type
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} options - Event options object
 * @param {String} options.event - Type of event to watch for (defaults to value)
 * @param {String} options.path - Path to watch with watcher
 * @param {String} options.storeAs - Location within redux to store value
 */
export const watchEvent = (firebase, dispatch, { type, path, populates, queryParams, queryId, isQuery, storeAs }) => {
  const watchPath = !storeAs ? path : `${path}@${storeAs}`
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
            path: storeAs || path
          })
        }
        return snapshot
      }, (err) => {
        // TODO: Handle catching unauthorized error
        // dispatch({
        //   type: UNAUTHORIZED_ERROR,
        //   payload: err
        // })
        dispatch({
          type: ERROR,
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
      path: storeAs || path
    })

    // Handle once queries
    if (e === 'once') {
      return q.once('value')
        .then(snapshot => {
          if (snapshot.val() !== null) {
            dispatch({
              type: SET,
              path: storeAs || path,
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
      const resultPath = storeAs || (e === 'value') ? p : `${p}/${snapshot.key}`

      // Dispatch standard event if no populates exists
      if (!populates) {
        const ordered = []
        // preserve order of children under ordered
        if (e === 'child_added') {
          ordered.push({ key: snapshot.key, ...snapshot.val() })
        } else {
          snapshot.forEach((child) => {
            ordered.push({ key: child.key, ...child.val() })
          })
        }

        return dispatch({
          type: SET,
          path: storeAs || resultPath,
          ordered: size(ordered) ? ordered : undefined,
          data,
          timestamp: Date.now(),
          requesting: false,
          requested: true
        })
      }

      // TODO: Allow setting of unpopulated data before starting population through config
      // TODO: Set ordered for populate queries
      // TODO: Allow config to toggle Combining into one SET action
      promisesForPopulate(firebase, data, populates)
        .then((results) => {
          // dispatch child sets first so isLoaded is only set to true for
          // populatedDataToJS after all data is in redux (Issue #121)
          forEach(results, (result, path) => {
            dispatch({
              type: SET,
              path,
              data: result,
              timestamp: Date.now(),
              requesting: false,
              requested: true
            })
          })
          dispatch({
            type: SET,
            path: storeAs || resultPath,
            data,
            timestamp: Date.now(),
            requesting: false,
            requested: true
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
      unWatchEvent(firebase, dispatch, event.type, event.path, event.queryId)
    )

export default { watchEvents, unWatchEvents }
