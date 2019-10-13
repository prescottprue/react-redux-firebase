import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isEqual, differenceWith } from 'lodash'
import hoistStatics from 'hoist-non-react-statics'
import { watchEvents, unWatchEvents } from './actions/query'
import { getEventsFromInput, createCallable, wrapDisplayName } from './utils'
import ReactReduxFirebaseContext from './ReactReduxFirebaseContext'

/**
 * @augments React.Component
 * @description React Higher Order Component that automatically listens/unListens to
 * Firebase Real Time Database on mount/unmount of the component. This uses
 * React's Component Lifecycle hooks.
 * @param {Array|Function} queriesConfig - Array of objects or strings for paths to sync
 * from Firebase. Can also be a function that returns the array. The function
 * is passed the current props and the firebase object.
 * @returns {Function} - that accepts a component to wrap and returns the wrapped component
 * @see https://react-redux-firebase.com/docs/api/firebaseConnect.html
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
 *   }))
 * )
 *
 * function Post({ post }) {
 *   return (
 *     <div>
 *      {JSON.stringify(post, null, 2)}
 *     </div>
 *   )
 * }
 *
 * export default enhance(Post)
 */
export default function firebaseConnect(queriesConfig = []) {
  return WrappedComponent => {
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
        const inputAsFunc = createCallable(queriesConfig)
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

      /* eslint-disable camelcase */
      UNSAFE_componentWillReceiveProps(np) {
        /* eslint-enable camelcase */
        const { firebase, dispatch } = this.props
        const inputAsFunc = createCallable(queriesConfig)
        const data = inputAsFunc(np, this.store)

        // Handle a data parameter having changed
        if (!isEqual(data, this.prevData)) {
          const itemsToSubscribe = differenceWith(data, this.prevData, isEqual)
          const itemsToUnsubscribe = differenceWith(
            this.prevData,
            data,
            isEqual
          )

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

    /**
     * Render component wrapped in context
     * @param {object} props - Component props
     * @returns {React.Component} Component wrapped in context
     */
    function FirebaseConnectWithContext(props) {
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

    FirebaseConnectWithContext.displayName = wrapDisplayName(
      WrappedComponent,
      'FirebaseConnect'
    )

    FirebaseConnectWithContext.wrappedComponent = WrappedComponent

    return hoistStatics(FirebaseConnectWithContext, WrappedComponent)
  }
}
