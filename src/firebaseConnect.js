import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isEqual, differenceWith } from 'lodash'
import hoistStatics from 'hoist-non-react-statics'
import { watchEvents, unWatchEvents } from './actions/query'
import { getEventsFromInput, createCallable, wrapDisplayName } from './utils'
import ReactReduxFirebaseContext from './ReactReduxFirebaseContext'

// Reserved props that should not be passed into a firebaseConnect wrapped
// component. Will throw an error if they are.
const RESERVED_PROPS = ['firebase', 'dispatch']

/**
 * @name createFirebaseConnect
 * @description Function that creates a Higher Order Component that
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

  const HoistedComp = hoistStatics(FirebaseConnectWrapped, WrappedComponent)

  const FirebaseConnect = props => {
    // Check that reserved props are not supplied to a FirebaseConnected
    // component and if they are, throw an error so the developer can rectify
    // this issue.
    const clashes = Object.keys(props).filter(k => RESERVED_PROPS.includes(k))

    if (clashes.length > 0) {
      throw new Error(
        `Supplied prop/s "${clashes.join(
          '", "'
        )}" are reserved for internal firebaseConnect() usage.`
      )
    }

    return (
      <ReactReduxFirebaseContext.Consumer>
        {_internalFirebase => (
          <HoistedComp
            firebase={_internalFirebase}
            dispatch={_internalFirebase.dispatch}
            {...props}
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
 *   })
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
 *   ]),
 *   connect((state, props) => ({
 *     post: getVal(state.firebase.data, `posts/${props.postId}`),
 *   })
 * )
 *
 * const Post = ({ post }) => (
 *   <div>
 *     {JSON.stringify(post, null, 2)}
 *   </div>
 * )
 *
 * export default enhance(Post)
 */
export default createFirebaseConnect()
