import { isArray } from 'lodash'
import { useMemo, useEffect } from 'react'
import { watchEvents, unWatchEvents } from './actions/query'
import { getEventsFromInput, createCallable } from './utils'
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
export const createUseFirebaseConnect = () => (dataOrFn = []) => {
  const firebase = useFirebase()

  const inputAsFunc = createCallable(dataOrFn)

  const data = inputAsFunc()

  const firebaseEvents = useMemo(
    () => {
      if(!data) { 
        return null
      }
      if (isArray(data)) {
        if (data.length > 1) {
          throw new Error(
            "Array of multiple paths isn't allowed inside useFirebaseConnect hook."
          )
        }
        return getEventsFromInput(data)
      }
      return getEventsFromInput([data])
    },
    [data]
  )

  useEffect(
    () => {
      if (data !== null) {
        watchEvents(firebase, firebase.dispatch, firebaseEvents)
        return () => {
          unWatchEvents(firebase, firebase.dispatch, firebaseEvents)
        }
      }
    },
    [data]
  )
}

/**
/**
 * @name useFirebaseConnect
 * @description Hook that automatically listens/unListens
 * to provided firebase paths using React's useEffect hook.
 * **Note** Only single path is allowed per one hook
 * @param {Object|String} queriesConfig - Object or string for path to sync
 * from Firebase or null if hook doesn't need to sync.
 * Can also be a function that returns an object or a path string.
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
 */
export default createUseFirebaseConnect()
