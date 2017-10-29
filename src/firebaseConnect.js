import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash'
import hoistStatics from 'hoist-non-react-statics'
import { getDisplayName } from 'recompose'
import { watchEvents, unWatchEvents } from './actions/query'
import { getEventsFromInput, createCallable } from './utils'

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
export const createFirebaseConnect = (storeKey = 'store') =>
  (dataOrFn = []) =>
    WrappedComponent => {
      class FirebaseConnect extends Component {
        static displayName = `FirebaseConnect(${getDisplayName(WrappedComponent)})`
        static wrappedComponent = WrappedComponent
        static contextTypes = {
          [storeKey]: PropTypes.object.isRequired
        }

        firebaseEvents = []
        firebase = null
        prevData = null
        store = this.context[storeKey]

        componentWillMount () {
          const { firebase, dispatch } = this.store

          // Allow function to be passed
          const inputAsFunc = createCallable(dataOrFn)
          this.prevData = inputAsFunc(this.props, this.store)

          const { ref, helpers, storage, database, auth } = firebase
          this.firebase = { ref, storage, database, auth, ...helpers }

          this._firebaseEvents = getEventsFromInput(this.prevData)

          watchEvents(firebase, dispatch, this._firebaseEvents)
        }

        componentWillUnmount () {
          const { firebase, dispatch } = this.store
          unWatchEvents(firebase, dispatch, this._firebaseEvents)
        }

        componentWillReceiveProps (np) {
          const { firebase, dispatch } = this.store
          const inputAsFunc = createCallable(dataOrFn)
          const data = inputAsFunc(np, firebase)

          // Handle a data parameter having changed
          if (!isEqual(data, this.prevData)) {
            this.prevData = data
            // UnWatch all current events
            unWatchEvents(firebase, dispatch, this._firebaseEvents)
            // Get watch events from new data
            this._firebaseEvents = getEventsFromInput(data)
            // Watch new events
            watchEvents(firebase, dispatch, this._firebaseEvents)
          }
        }

        render () {
          return (
            <WrappedComponent
              {...this.props}
              {...this.state}
              firebase={this.firebase}
            />
          )
        }
      }

      return hoistStatics(FirebaseConnect, WrappedComponent)
    }

/**
 * @name firebaseConnect
 * @extends React.Component
 * @description Higher Order Component that automatically listens/unListens
 * to provided firebase paths using React's Lifecycle hooks.
 * @param {Array} watchArray - Array of objects or strings for paths to sync from Firebase. Can also be a function that returns the array. The function is passed the current props and the firebase object.
 * @return {Function} - that accepts a component to wrap and returns the wrapped component
 * @example <caption>Basic</caption>
 * // this.props.firebase set on App component as firebase object with helpers
 * import { firebaseConnect } from 'react-redux-firebase'
 * export default firebaseConnect()(App)
 * @example <caption>Data</caption>
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
 * // use enhnace to pass todos list as props.todos
 * const Todos = enhance(({ todos })) =>
 *   <div>
 *     {JSON.stringify(todos, null, 2)}
 *   </div>
 * )
 * @example <caption>Data that depends on props</caption>
 * import { compose } from 'redux'
 * import { connect } from 'react-redux'
 * import { firebaseConnect } from 'react-redux-firebase'
 *
 * const enhance = compose(
 *   firebaseConnect((props) => ([
 *     `posts/${props.postId}` // sync /posts/postId from firebase into redux
 *   ]),
 *   connect(({ firebase: { data } }, props) => ({
 *     todo: data.posts && data.todos[postId],
 *   })
 * )
 *
 * const Posts = ({ done, text, author }) => (
 *   <article>
 *     <h1>{title}</h1>
 *     <h2>By {author.name}</h2>
 *     <div>{content}</div>
 *   </article>
 * )
 *
 * export default enhance(Posts)
 * @example <caption>Data that depends on state</caption>
 * import { compose } from 'redux'
 * import { connect } from 'react-redux'
 * import { firebaseConnect } from 'react-redux-firebase'
 *
 * export default compose(
 *   firebaseConnect((props, store) => ([
 *     `todos/${store.getState().firebase.auth.uid}`
 *   ]),
 *   connect(({ firebase: { data, auth } }) => ({
 *     todosList: data.todos && data.todos[auth.uid],
 *   }))
 * )(SomeComponent)
 */
export default createFirebaseConnect()
