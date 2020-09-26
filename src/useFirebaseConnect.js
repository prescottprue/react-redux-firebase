import { isEqual, differenceWith } from 'lodash'
import { useMemo, useEffect, useRef } from 'react'
import { watchEvents, unWatchEvents } from './actions/query'
import { getEventsFromInput, invokeArrayQuery } from './utils'
import useFirebase from './useFirebase'

/**
 * @description Hook that automatically listens/unListens to provided firebase paths
 * using React's useEffect hook.
 * @param {Function|Array} queriesConfig - Object, string, or
 * array contains object or string for path to sync from Firebase or null if
 * hook doesn't need to sync. Can also be a function that returns an object,
 * a path string, or array of an object or a path string.
 * @see https://react-redux-firebase.com/docs/api/useFirebaseConnect.html
 * @example <caption>Ordered Data</caption>
 * import React from 'react'
 * import { useSelector } from 'react-redux'
 * import { useFirebaseConnect } from 'react-redux-firebase'
 *
 * export default function Todos() {
 *   // sync /todos from firebase into redux
 *   useFirebaseConnect(['todos'])
 *   // Connect to redux state using selector hook
 *   const todos = useSelector(state => state.firebase.data.todos)
 *   return (
 *     <div>
 *       {JSON.stringify(todos, null, 2)}
 *     </div>
 *   )
 * }
 * @example <caption>Data that depends on props</caption>
 * import React from 'react'
 * import { compose } from 'redux'
 * import { useSelector } from 'react-redux'
 * import { useFirebaseConnect } from 'react-redux-firebase'
 *
 * export default function Post({ postId }) {
 *   useFirebaseConnect([`posts/${postId}`]) // sync /posts/postId from firebase into redux
 *   const post = useSelector(({ firebase: { ordered: { posts } } }) => posts && posts[postId])
 *   return (
 *     <div>
 *       {JSON.stringify(post, null, 2)}
 *     </div>
 *   )
 * }
 */
export default function useFirebaseConnect(queriesConfig) {
  const firebase = useFirebase()
  const eventRef = useRef()
  const dataRef = useRef()

  const data = useMemo(() => invokeArrayQuery(queriesConfig), [queriesConfig])

  useEffect(() => {
    if (data !== null && !isEqual(data, dataRef.current)) {
      const itemsToSubscribe = differenceWith(data, dataRef.current, isEqual)
      const itemsToUnsubscribe = differenceWith(dataRef.current, data, isEqual)

      dataRef.current = data
      // UnWatch all current events
      unWatchEvents(
        firebase,
        firebase.dispatch,
        getEventsFromInput(itemsToUnsubscribe)
      )
      // Get watch events from new data
      eventRef.current = getEventsFromInput(data)

      // Watch new events
      watchEvents(
        firebase,
        firebase.dispatch,
        getEventsFromInput(itemsToSubscribe)
      )
    }
  }, [data])

  // Emulate componentWillUnmount
  useEffect(() => {
    return () => {
      unWatchEvents(firebase, firebase.dispatch, eventRef.current)
    }
  }, [])
}
