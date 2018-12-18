import { isObject, isArray } from 'lodash'
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
 * @description Watch a path in Firebase Real Time Database
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
export function watchEvent(
  firebase,
  dispatch,
  type = 'value',
  path,
  storeAs,
  options = {}
) {
  if (
    !firebase ||
    !firebase.database ||
    typeof firebase.database !== 'function'
  ) {
    throw new Error('Firebase database is required to create watchers')
  }
  const { populates, queryParams, queryId, isQuery } = options
  const { config: { logErrors } } = firebase._

  const watchPath = !storeAs ? path : `${path}@${storeAs}`
  const id = queryId || getQueryIdFromPath(path)
  const counter = getWatcherCount(firebase, type, watchPath, id)

  if (counter > 0) {
    if (id) {
      unsetWatcher(firebase, dispatch, type, path, id)
    }
  }

  setWatcher(firebase, dispatch, type, watchPath, id)

  if (type === 'first_child') {
    return firebase
      .database()
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
        return Promise.reject(err)
      })
  }

  let query = firebase
    .database()
    .ref()
    .child(path)

  if (isQuery) {
    query = applyParamsToQuery(queryParams, query)
  }

  dispatch({ type: actionTypes.START, path: storeAs || path })

  // Handle once queries
  if (type === 'once') {
    return query
      .once('value')
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
  query.on(
    type,
    snapshot => {
      let data = type === 'child_removed' ? undefined : snapshot.val()
      const resultPath =
        storeAs || type === 'value' ? path : `${path}/${snapshot.key}`

      // Dispatch standard event if no populates exists
      if (!populates) {
        // create an array for preserving order of children under ordered
        const ordered =
          type === 'child_added'
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
    },
    err => {
      if (logErrors) {
        // eslint-disable-next-line no-console
        console.log(
          `Error retrieving data for path: ${path}, storeAs: ${storeAs}. Firebase:`,
          err
        )
      }
      dispatch({
        type: actionTypes.ERROR,
        storeAs,
        path,
        payload: err
      })
    }
  )
}

/**
 * @description Remove watcher from an event
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} config - Config object
 * @param {String} config.type - Type for which to remove the watcher (
 * value, once, first_child etc.)
 * @param {String} config.path - Path of watcher to remove
 * @param {String} config.storeAs - Path which to store results within in
 * redux store
 * @param {String} config.queryId - Id of the query (used for idendifying)
 * in internal watchers list
 */
export function unWatchEvent(
  firebase,
  dispatch,
  type,
  path,
  queryId,
  options = {}
) {
  const { storeAs } = options
  const watchPath = !storeAs && !queryId ? path : `${path}@${storeAs}`
  unsetWatcher(firebase, dispatch, type, watchPath, queryId)
}

/**
 * @description Add watchers to a list of events
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {Array} events - List of events for which to add watchers
 */
export function watchEvents(firebase, dispatch, events) {
  if (!isArray(events)) {
    throw new Error('Events config must be an Array')
  }
  return events.map(event => {
    const { path, type, storeAs, ...other } = event
    const args = [firebase, dispatch, type, path, storeAs]
    if (Object.keys(other).length) {
      args.concat([...other])
    }
    watchEvent(...args)
  })
}

/**
 * @description Remove watchers from a list of events
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {Array} events - List of events for which to remove watchers
 */
export function unWatchEvents(firebase, dispatch, events) {
  events.forEach(event => {
    const { path, type, storeAs, ...other } = event
    const args = [firebase, dispatch, type, path, storeAs]
    if (Object.keys(other).length) {
      args.concat([...other])
    }
    console.log('here are the args:', ...args)
    unWatchEvent(...args)
  })
}

/**
 * @private
 * @description Calls a method and attaches meta to value object
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {String} method - Method to run with meta attached
 * @param {String} path - Path to location on Firebase which to set
 * @param {Object|String|Boolean|Number} value - Value to write to Firebase
 * @param {Function} onComplete - Function to run on complete
 * @return {Promise} Containing reference snapshot
 */
function withMeta(firebase, dispatch, method, path, value, onComplete) {
  if (isObject(value)) {
    const prefix = method === 'update' ? 'updated' : 'created'
    const dataWithMeta = {
      ...value,
      [`${prefix}At`]: firebase.database.ServerValue.TIMESTAMP
    }
    if (firebase.auth().currentUser) {
      dataWithMeta[`${prefix}By`] = firebase.auth().currentUser.uid
    }
    return firebase
      .database()
      .ref(path)
      [method](dataWithMeta, onComplete)
  }
  return firebase
    .database()
    .ref(path)
    [method](value, onComplete)
}

/**
 * @description Sets data to Firebase.
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {String} path - Path to location on Firebase which to set
 * @param {Object|String|Boolean|Number} value - Value to write to Firebase
 * @param {Function} onComplete - Function to run on complete (`not required`)
 * @return {Promise} Containing reference snapshot
 * @example <caption>Basic</caption>
 * import React, { Component } from 'react'
 * import PropTypes from 'prop-types'
 * import { firebaseConnect } from 'react-redux-firebase'
 * const Example = ({ firebase: { set } }) => (
 *   <button onClick={() => set('some/path', { here: 'is a value' })}>
 *     Set To Firebase
 *   </button>
 * )
 * export default firebaseConnect()(Example)
 */
export function set(firebase, dispatch, path, value, onComplete) {
  return firebase
    .database()
    .ref(path)
    .set(value, onComplete)
}

/**
 * @description Sets data to Firebase along with meta data. Currently,
 * this includes createdAt and createdBy. *Warning* using this function
 * may have unintented consequences (setting createdAt even if data already
 * exists).
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {String} path - Path to location on Firebase which to set
 * @param {Object|String|Boolean|Number} value - Value to write to Firebase
 * @param {Function} onComplete - Function to run on complete (`not required`)
 * @return {Promise} Containing reference snapshot
 */
export function setWithMeta(firebase, dispatch, path, value, onComplete) {
  return withMeta(firebase, dispatch, 'set', path, value, onComplete)
}

/**
 * @description Pushes data to Firebase.
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {String} path - Path to location on Firebase which to push
 * @param {Object|String|Boolean|Number} value - Value to push to Firebase
 * @param {Function} onComplete - Function to run on complete (`not required`)
 * @return {Promise} Containing reference snapshot
 * @example <caption>Basic</caption>
 * import React, { Component } from 'react'
 * import PropTypes from 'prop-types'
 * import { firebaseConnect } from 'react-redux-firebase'
 * const Example = ({ firebase: { push } }) => (
 *   <button onClick={() => push('some/path', true)}>
 *     Push To Firebase
 *   </button>
 * )
 * export default firebaseConnect()(Example)
 */
export function push(firebase, dispatch, path, value, onComplete) {
  return firebase
    .database()
    .ref(path)
    .push(value, onComplete)
}

/**
 * @description Pushes data to Firebase along with meta data. Currently,
 * this includes createdAt and createdBy.
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {String} path - Path to location on Firebase which to set
 * @param {Object|String|Boolean|Number} value - Value to write to Firebase
 * @param {Function} onComplete - Function to run on complete (`not required`)
 * @return {Promise} Containing reference snapshot
 */
export function pushWithMeta(firebase, dispatch, path, value, onComplete) {
  return withMeta('push', path, value, onComplete)
}

/**
 * @description Updates data on Firebase and sends new data.
 * @param {String} path - Path to location on Firebase which to update
 * @param {Object|String|Boolean|Number} value - Value to update to Firebase
 * @param {Function} onComplete - Function to run on complete (`not required`)
 * @return {Promise} Containing reference snapshot
 * @example <caption>Basic</caption>
 * import React, { Component } from 'react'
 * import PropTypes from 'prop-types'
 * import { firebaseConnect } from 'react-redux-firebase'
 * const Example = ({ firebase: { update } }) => (
 *   <button onClick={() => update('some/path', { here: 'is a value' })}>
 *     Update To Firebase
 *   </button>
 * )
 * export default firebaseConnect()(Example)
 */
export function update(firebase, dispatch, path, value, onComplete) {
  return firebase
    .database()
    .ref(path)
    .update(value, onComplete)
}

/**
 * @description Updates data on Firebase along with meta. *Warning*
 * using this function may have unintented consequences (setting
 * createdAt even if data already exists)
 * @param {String} path - Path to location on Firebase which to update
 * @param {Object|String|Boolean|Number} value - Value to update to Firebase
 * @param {Function} onComplete - Function to run on complete (`not required`)
 * @return {Promise} Containing reference snapshot
 */
export function updateWithMeta(firebase, dispatch, path, value, onComplete) {
  return withMeta(firebase, dispatch, 'update', path, value, onComplete)
}

/**
 * @description Removes data from Firebase at a given path. **NOTE** A
 * seperate action is not dispatched unless `dispatchRemoveAction: true` is
 * provided to config on store creation. That means that a listener must
 * be attached in order for state to be updated when calling remove.
 * @param {Object} firebase - Internal firebase object
 * @param {Function} dispatch - Action dispatch function
 * @param {String} path - Path of ref to be removed
 * @param {Object} [options={}] - Configuration for removal
 * @param {Boolean} [options.dispatchAction=true] - Whether or not to dispatch
 * REMOVE action
 * @return {Promise} Resolves with path
 * @example <caption>Basic</caption>
 * import React, { Component } from 'react'
 * import PropTypes from 'prop-types'
 * import { firebaseConnect } from 'react-redux-firebase'
 * const Example = ({ firebase: { remove } }) => (
 *   <button onClick={() => remove('some/path')}>
 *     Remove From Firebase
 *   </button>
 * )
 * export default firebaseConnect()(Example)
 */
export function remove(firebase, dispatch, path, onComplete, options = {}) {
  const { dispatchAction = true } = options
  const { dispatchRemoveAction } = firebase._.config
  return firebase
    .database()
    .ref(path)
    .remove()
    .then(() => {
      if (dispatchRemoveAction && dispatchAction) {
        dispatch({ type: actionTypes.REMOVE, path })
      }
      if (typeof onComplete === 'function') onComplete()
      return path
    })
    .catch(err => {
      dispatch({ type: actionTypes.ERROR, payload: err })
      if (typeof onComplete === 'function') onComplete(err)
      return Promise.reject(err)
    })
}

/**
 * @description Sets data to Firebase only if the path does not already
 * exist, otherwise it rejects. Internally uses a Firebase transaction to
 * prevent a race condition between seperate clients calling uniqueSet.
 * @param {String} path - Path to location on Firebase which to set
 * @param {Object|String|Boolean|Number} value - Value to write to Firebase
 * @param {Function} onComplete - Function to run on complete (`not required`)
 * @return {Promise} Containing reference snapshot
 * @example <caption>Basic</caption>
 * import React, { Component } from 'react'
 * import PropTypes from 'prop-types'
 * import { firebaseConnect } from 'react-redux-firebase'
 * const Example = ({ firebase: { uniqueSet } }) => (
 *   <button onClick={() => uniqueSet('some/unique/path', true)}>
 *     Unique Set To Firebase
 *   </button>
 * )
 * export default firebaseConnect()(Example)
 */
export function uniqueSet(firebase, dispatch, path, value, onComplete) {
  return firebase
    .database()
    .ref(path)
    .transaction(d => (d === null ? value : undefined))
    .then(({ committed, snapshot }) => {
      if (!committed) {
        const newError = new Error('Path already exists.')
        if (onComplete) onComplete(newError)
        return Promise.reject(newError)
      }
      if (onComplete) onComplete(snapshot)
      return snapshot
    })
}
