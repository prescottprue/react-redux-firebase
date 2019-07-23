import { isEqual, differenceWith } from 'lodash'
import { useMemo, useEffect, useRef } from 'react'
import { watchEvents, unWatchEvents } from './actions/query'
import { getEventsFromInput, invokeArrayQuery } from './utils'
import useFirebase from './useFirebase'

/**
 * @name createUseFirebaseConnect
 * @description Function that creates a hook that
 * automatically listens/unListens to provided firebase paths using
 * React's useEffect hooks.
 * **WARNING!!** This is an advanced feature, and should only be used when
 * needing to access a firebase instance created under a different store key.
 * @return {Function} - HOC that accepts a watchArray and wraps a component
 * @example <caption>Basic</caption>
 * // this.props.firebase set on App component as firebase object with helpers
 * import { createUseFirebaseConnect } from 'react-redux-firebase'
 * // create firebase connect that uses another redux store
 * const useFirebaseConnect = createUseFirebaseConnect()
 */
export const createUseFirebaseConnect = () => (dataOrFn, deps) => {
  const firebase = useFirebase()
  const eventRef = useRef()
  const dataRef = useRef()

  const data = useMemo(() => invokeArrayQuery(dataOrFn), deps)

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

/**
/**
 * @name useFirebaseConnect
 * @description Hook that automatically listens/unListens
 * to provided firebase paths using React's useEffect hook.
 * @param {Object|String|Function|Array} queriesConfigs - Object, string, or
 * array contains object or string for path to sync from Firebase or null if
 * hook doesn't need to sync. Can also be a function that returns an object,
 * a path string, or array of an object or a path string.
 * @param {Array} deps - Dependency for memoizing query object. It's recommend
 * to include deps if using object, array or function as a query.
 * @example <caption>Ordered Data</caption>
 * import { compose } from 'redux'
 * import { connect } from 'react-redux'
 * import { firebaseUseConnect } from 'react-redux-firebase'
 *
 * const enhance = compose(
 *   connect((state) => ({
 *     todos: state.firebase.ordered.todos
 *   })
 * )
 * 
 * // use enhnace to pass todos list as props.todos
 * const Todos = enhance(({ todos })) => {
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
 * import { connect } from 'react-redux'
 * import { firebaseUseConnect, getVal } from 'react-redux-firebase'
 *
 * const enhance = compose(
 *   connect((state, props) => ({
 *     post: getVal(state.firebase.data, `posts/${props.postId}`),
 *   })
 * )
 *
 * const Post = ({ post, postId }) => {
 *   useFirebaseConnect(`posts/${postId}`) // sync /posts/postId from firebase into redux
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
 * import { connect } from 'react-redux'
 * import { firebaseUseConnect, getVal } from 'react-redux-firebase'
 *
 * const enhance = compose(
 *   connect((state, props) => ({
 *     post: getVal(state.firebase.data, `posts/${props.postId}`),
 *   })
 * )
 *
 * const Post = ({ post, postId }) => {
 *   useFirebaseConnect([`posts/${postId}`], [postId]) // sync /posts/postId from firebase into redux
 *   return (
 *     <div>
 *       {JSON.stringify(post, null, 2)}
 *     </div>
 *   )
 * }
 *
 * export default enhance(Post)
 */
export default createUseFirebaseConnect()
