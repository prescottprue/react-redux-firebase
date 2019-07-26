import React from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import { invokeArrayQuery, wrapDisplayName } from './utils'
import useFirebaseConnect from './useFirebaseConnect'
import useFirebase from './useFirebase'

/**
 * Function that creates a Higher Order Component which
 * automatically listens/unListens to provided firebase paths using
 * React's Lifecycle hooks.
 * **WARNING!!** This is an advanced feature, and should only be used when
 * needing to access a firebase instance created under a different store key.
 * @param {String} [storeKey='store'] - Name of redux store which contains
 * Firebase state (state.firebase)
 * @return {Function} - HOC that accepts a watchArray and wraps a component
 * @example <caption>Basic</caption>
 * // this.props.firebase set on App component as firebase object with helpers
 * import { createFirebaseConnect } from 'react-redux-firebase'
 * // create firebase connect that uses another redux store
 * const firebaseConnect = createFirebaseConnect('anotherStore')
 * // use the firebaseConnect to wrap a component
 * export default firebaseConnect()(SomeComponent)
 */
export const createFirebaseConnect = (storeKey = 'store') => (
  dataOrFn = []
) => WrappedComponent => {
  const FirebaseConnect = function FirebaseConnect(props) {
    const contextFirebase = useFirebase()
    const firebase = props.firebase || contextFirebase
    const data = invokeArrayQuery(dataOrFn, props)

    useFirebaseConnect(data)

    return (
      <WrappedComponent
        firebase={firebase}
        dispatch={firebase.dispatch}
        {...props}
      />
    )
  }

  hoistStatics(FirebaseConnect, WrappedComponent)

  FirebaseConnect.propTypes = {
    ...(WrappedComponent.propTypes || {}),
    firebase: PropTypes.object
  }

  FirebaseConnect.displayName = wrapDisplayName(
    WrappedComponent,
    'FirebaseConnect'
  )

  FirebaseConnect.wrappedComponent = WrappedComponent

  return FirebaseConnect
}

/**
/**
 * @name firebaseConnect
 * @extends React.Component
 * @description Higher Order Component that automatically listens/unListens
 * to provided firebase paths using React's Lifecycle hooks.
 * @param {Array} watchArray - Array of objects or strings for paths to sync
 * from Firebase. Can also be a function that returns the array. The function
 * is passed the current props and the firebase object.
 * @return {Function} - that accepts a component to wrap and returns the wrapped component
 * @example <caption>Basic</caption>
 * // props.firebase set on App component as firebase object with helpers
 * import { firebaseConnect } from 'react-redux-firebase'
 * export default firebaseConnect()(App)
 * @example <caption>Ordered Data</caption>
 * import { compose } from 'redux'
 * import { connect } from 'react-redux'
 * import { firebaseConnect } from 'react-redux-firebase'
 *
 * const enhance = compose(
 *   firebaseConnect([
 *     'todos' // sync /todos from firebase into redux
 *   ]),
 *   connect((state) => ({
 *     todos: state.firebase.ordered.todos
 *   }))
 * )
 * 
 * // use enhnace to pass todos list as props.todos
 * const Todos = enhance(({ todos })) =>
 *   <div>
 *     {JSON.stringify(todos, null, 2)}
 *   </div>
 * )
 * 
 * export default enhance(Todos)
 * @example <caption>Data that depends on props</caption>
 * import { compose } from 'redux'
 * import { connect } from 'react-redux'
 * import { firebaseConnect, getVal } from 'react-redux-firebase'
 *
 * const enhance = compose(
 *   firebaseConnect((props) => ([
 *     `posts/${props.postId}` // sync /posts/postId from firebase into redux
 *   ])),
 *   connect((state, props) => ({
 *     post: getVal(state.firebase.data, `posts/${props.postId}`),
 *   }))
 * )
 *
 * function Post({ post }) {
 *   return (
 *     <div>
 *       {JSON.stringify(post, null, 2)}
 *     </div>
 *   )
 * }
 *
 * export default enhance(Post)
 */
export default createFirebaseConnect()
