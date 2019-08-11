import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isEqual, differenceWith } from 'lodash'
import hoistStatics from 'hoist-non-react-statics'
import { watchEvents, unWatchEvents } from './actions/query'
import { getEventsFromInput, createCallable, wrapDisplayName } from './utils'
import ReactReduxFirebaseContext from './ReactReduxFirebaseContext'

/**
 * Function that creates a Higher Order Component which
 * automatically listens/unListens to provided firebase paths using
 * React's Lifecycle hooks.
 * **WARNING!!** This is an advanced feature, and should only be used when
 * needing to access a firebase instance created under a different store key.
 * @return {Function} - HOC that accepts a watchArray and wraps a component
 * @example <caption>Basic</caption>
 * // props.firebase set on App component as firebase object with helpers
 * import { createFirebaseConnect } from 'react-redux-firebase'
 * // create firebase connect that uses another redux store
 * const firebaseConnect = createFirebaseConnect('anotherStore')
 * // use the firebaseConnect to wrap a component
 * export default firebaseConnect()(SomeComponent)
 */
export const createFirebaseConnect = () => (
  dataOrFn = []
) => WrappedComponent => {
  class FirebaseConnectWrapped extends Component {
    static displayName = wrapDisplayName(
      WrappedComponent,
      'FirebaseConnectWrapped'
    )
    static wrappedComponent = WrappedComponent

    firebaseEvents = []
    firebase = null
    prevData = null

    componentDidMount() {
      const { firebase, dispatch } = this.props

      // Allow function to be passed
      const inputAsFunc = createCallable(dataOrFn)
      this.prevData = inputAsFunc(this.props, this.props)

      const { ref, helpers, storage, database, auth } = firebase
      this.firebase = { ref, storage, database, auth, ...helpers }

      this._firebaseEvents = getEventsFromInput(this.prevData)

      watchEvents(firebase, dispatch, this._firebaseEvents)
    }

    componentWillUnmount() {
      const { firebase, dispatch } = this.props
      unWatchEvents(firebase, dispatch, this._firebaseEvents)
    }

    componentWillReceiveProps(np) {
      const { firebase, dispatch } = this.props
      const inputAsFunc = createCallable(dataOrFn)
      const data = inputAsFunc(np, this.store)

      // Handle a data parameter having changed
      if (!isEqual(data, this.prevData)) {
        const itemsToSubscribe = differenceWith(data, this.prevData, isEqual)
        const itemsToUnsubscribe = differenceWith(this.prevData, data, isEqual)

        this.prevData = data
        // UnWatch all current events
        unWatchEvents(
          firebase,
          dispatch,
          getEventsFromInput(itemsToUnsubscribe)
        )
        // Get watch events from new data
        this._firebaseEvents = getEventsFromInput(data)

        // Watch new events
        watchEvents(firebase, dispatch, getEventsFromInput(itemsToSubscribe))
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  FirebaseConnectWrapped.propTypes = {
    dispatch: PropTypes.func.isRequired,
    firebase: PropTypes.object.isRequired
  }

  const FirebaseConnect = props => {
    return (
      <ReactReduxFirebaseContext.Consumer>
        {_internalFirebase => (
          <FirebaseConnectWrapped
            {...props}
            dispatch={_internalFirebase.dispatch}
            firebase={_internalFirebase}
          />
        )}
      </ReactReduxFirebaseContext.Consumer>
    )
  }

  FirebaseConnect.displayName = wrapDisplayName(
    WrappedComponent,
    'FirebaseConnect'
  )

  FirebaseConnect.wrappedComponent = WrappedComponent

  return hoistStatics(FirebaseConnect, WrappedComponent)
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
 * import React from 'react'
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
 * function Todos({ todos }) {
 *   return (
 *     <div>
 *       {JSON.stringify(todos, null, 2)}
 *     </div>
 *   )
 * }
 * 
 * export default enhance(Todos)
 * @example <caption>Data that depends on props</caption>
 * import React from 'react'
 * import { compose } from 'redux'
 * import { connect } from 'react-redux'
 * import { get } from 'lodash'
 * import { firebaseConnect } from 'react-redux-firebase'
 *
 * const enhance = compose(
 *   firebaseConnect((props) => ([
 *     `posts/${props.postId}` // sync /posts/postId from firebase into redux
 *   ])),
 *   connect((state, props) => ({
 *     post: get(state.firebase.data, `posts.${props.postId}`),
 *   })
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
