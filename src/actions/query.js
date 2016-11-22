import { actionTypes } from '../constants'
import { promisesForPopulate } from '../utils/populate'
import { getQueryIdFromPath, applyParamsToQuery } from '../utils/query'

const { SET, NO_VALUE } = actionTypes

const getWatchPath = (event, path) =>
  `${event}:${((path.substring(0, 1) === '/') ? '' : '/')}${path}`

/**
 * @description Set a new watcher
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} queryId - Id of query
 */
const setWatcher = (firebase, event, path, queryId = undefined) => {
  const id = queryId ? `${event}:/${queryId}` : getWatchPath(event, path)

  if (firebase._.watchers[id]) {
    firebase._.watchers[id]++
  } else {
    firebase._.watchers[id] = 1
  }

  return firebase._.watchers[id]
}

/**
 * @description Get count of currently attached watchers
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} queryId - Id of query
 */
const getWatcherCount = (firebase, event, path, queryId = undefined) => {
  const id = queryId ? `${event}:/${queryId}` : getWatchPath(event, path)
  return firebase._.watchers[id]
}

/**
 * @description Remove/Unset a watcher
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Type of event to watch for
 * @param {String} path - Path to watch with watcher
 * @param {String} queryId - Id of query
 */
const unsetWatcher = (firebase, event, path, queryId = undefined) => {
  let id = queryId || getQueryIdFromPath(path)
  path = path.split('#')[0]

  if (!id) {
    id = getWatchPath(event, path)
  }

  if (firebase._.watchers[id] <= 1) {
    delete firebase._.watchers[id]
    if (event !== 'first_child') {
      firebase.database().ref().child(path).off(event)
    }
  } else if (firebase._.watchers[id]) {
    firebase._.watchers[id]--
  }
}

/**
 * @description Watch a specific event type
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {String} event - Type of event to watch for (defaults to value)
 * @param {String} path - Path to watch with watcher
 * @param {String} dest
 * @param {Boolean} onlyLastEvent - Whether or not to listen to only the last event
 */
export const watchEvent = (firebase, dispatch, { type, path, populates, queryParams, queryId, isQuery }, dest, onlyLastEvent = false) => {
  const watchPath = !dest ? path : `${path}@${dest}`
  const counter = getWatcherCount(firebase, type, watchPath, queryId)

  if (counter > 0) {
    if (onlyLastEvent) {
      // listen only to last query on same path
      if (queryId) {
        unsetWatcher(firebase, type, path, queryId)
      } else {
        return
      }
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
            path
          })
        }
      })
  }

  let query = firebase.database().ref().child(path)

  if (isQuery) {
    query = applyParamsToQuery(queryParams, query)
  }

  const runQuery = (q, e, p, params) => {
    // Handle once queries
    if (e === 'once') {
      return q.once('value')
        .then(snapshot =>
          dispatch({
            type: SET,
            path,
            data: snapshot.val()
          })
        )
    }
    // Handle all other queries
    // TODO: Handle onError of query (i.e. security errors)
    q.on(e, snapshot => {
      let data = (e === 'child_removed') ? undefined : snapshot.val()
      const resultPath = dest || (e === 'value') ? p : `${p}/${snapshot.key}`

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
          data,
          snapshot
        })
      }

      // TODO: Allow setting of unpopulated data before starting population through config

      promisesForPopulate(firebase, data, populates)
        .then((list) => {
          dispatch({
            type: SET,
            path: resultPath,
            data: list
          })
        })
    })
  }

  runQuery(query, type, path, queryParams)
}

/**
 * @description Remove watcher from an event
 * @param {Object} firebase - Internal firebase object
 * @param {String} event - Event for which to remove the watcher
 * @param {String} path - Path of watcher to remove
 */
export const unWatchEvent = (firebase, event, path, queryId = undefined) =>
    unsetWatcher(firebase, event, path, queryId)

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
export const unWatchEvents = (firebase, events) =>
    events.forEach(event =>
      unWatchEvent(firebase, event.type, event.path)
    )

export default { watchEvents, unWatchEvents }
