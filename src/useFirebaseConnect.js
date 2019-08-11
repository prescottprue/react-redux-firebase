import { isEqual, differenceWith } from 'lodash'
import { useMemo, useEffect, useRef } from 'react'
import { watchEvents, unWatchEvents } from './actions/query'
import { getEventsFromInput, invokeArrayQuery } from './utils'
import useFirebase from './useFirebase'

/**
 * @name useFirebaseConnect
 * @description Hook that automatically listens/unListens
 * to provided firebase paths using React's useEffect hook.
 * @param {Object|String|Function|Array} queriesConfigs - Object, string, or
 * array contains object or string for path to sync from Firebase or null if
 * hook doesn't need to sync. Can also be a function that returns an object,
 * a path string, or array of an object or a path string.
 * @example <caption>Ordered Data</caption>
 * import { compose } from 'redux'
 * import { connect } from 'react-redux'
 * import { firebaseUseConnect } from 'react-redux-firebase'
 *
 * const enhance = compose(
 *   connect((state) => ({
 *     todos: state.firebase.ordered.todos
 *   }))
 * )
 *
 * // use enhnace to pass todos list as props.todos
 * function Todos({ todos })) {
 *   useFirebaseConnect('todos') // sync /todos from firebase into redux
 *   return (
 *     <div>
 *       {JSON.stringify(todos, null, 2)}
 *     </div>
 *   )
 * }
 *
 * export default enhance(Todos)
 * @example <caption>Data that depends on props</caption>
 * import { compose } from 'redux'
 * import { useSelector } from 'react-redux'
 * import { firebaseUseConnect } from 'react-redux-firebase'
 *
 * function Post({ postId }) {
 *   useFirebaseConnect(`posts/${postId}`) // sync /posts/postId from firebase into redux
 *   const post = useSelector(({ firebase }) => state.firebase.ordered.posts && state.firebase.ordered.posts[postId])
 *   return (
 *     <div>
 *       {JSON.stringify(post, null, 2)}
 *     </div>
 *   )
 * }
 *
 * export default enhance(Post)
 * @example <caption>Data that depends on props, an array as a query</caption>
 * import { compose } from 'redux'
 * import { useSelector } from 'react-redux'
 * import { firebaseUseConnect, getVal } from 'react-redux-firebase'
 *
 * function Post({ post, postId }) {
 *   useFirebaseConnect([`posts/${postId}`], [postId]) // sync /posts/postId from firebase into redux
 *   const post = useSelector(state => {
 *     return state.firebase.ordered.posts && state.firebase.ordered.posts[postId]
 *   })
 *   return (
 *     <div>
 *       {JSON.stringify(post, null, 2)}
 *     </div>
 *   )
 * }
 *
 * export default Post
 */
export default function useFirebaseConnect(querySettings) {
  const firebase = useFirebase()
  const eventRef = useRef()
  const dataRef = useRef()

  const data = useMemo(() => invokeArrayQuery(querySettings), [querySettings])

  useEffect(
    () => {
      if (data !== null && !isEqual(data, dataRef.current)) {
        const itemsToSubscribe = differenceWith(data, dataRef.current, isEqual)
        const itemsToUnsubscribe = differenceWith(
          dataRef.current,
          data,
          isEqual
        )

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
    },
    [data]
  )

  // Emulate componentWillUnmount
  useEffect(() => {
    return () => {
      unWatchEvents(firebase, firebase.dispatch, eventRef.current)
    }
  }, [])
}
