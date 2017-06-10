import React, { Component, PropTypes } from 'react'
import { isEqual } from 'lodash'
import hoistStatics from 'hoist-non-react-statics'
import { watchEvents, unWatchEvents } from './actions/query'
import { getEventsFromInput, createCallable } from './utils'

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
 * import { connect } from 'react-redux'
 * import { firebaseConnect, dataToJS } from 'react-redux-firebase'
 *
 * // sync /todos from firebase into redux
 * const fbWrapped = firebaseConnect([
 *   'todos'
 * ])(App)
 *
 * // pass todos list from redux as this.props.todosList
 * export default connect(({ firebase }) => ({
 *   todosList: dataToJS(firebase, 'todos'),
 *   profile: pathToJS(firebase, 'profile'), // pass profile data as this.props.profile
 *   auth: pathToJS(firebase, 'auth') // pass auth data as this.props.auth
 * }))(fbWrapped)
 * @example <caption>Data that depends on props</caption>
 * import { connect } from 'react-redux'
 * import { firebaseConnect, dataToJS } from 'react-redux-firebase'
 *
 * // sync /todos from firebase into redux
 * const fbWrapped = firebaseConnect((props, firebase) => ([
 *   `todos/${firebase.database().currentUser.uid}/${props.type}`
 * ])(App)
 *
 * // pass todos list for the specified type of todos from redux as `this.props.todosList`
 * export default connect(({ firebase, type }) => ({
 *   todosList: dataToJS(firebase, `data/todos/${firebase.getIn(['auth', 'uid'])}/${type}`),
 *   profile: pathToJS(firebase, 'profile'), // pass profile data as this.props.profile
 *   auth: pathToJS(firebase, 'auth') // pass auth data as this.props.auth
 * }))(fbWrapped)
 */
export default (dataOrFn = []) => WrappedComponent => {
  class FirebaseConnect extends Component {
    constructor (props, context) {
      super(props, context)
      this._firebaseEvents = []
      this.firebase = null
    }

    static contextTypes = {
      store: PropTypes.object.isRequired
    };

    componentWillMount () {
      const { firebase, dispatch } = this.context.store

      // Allow function to be passed
      const inputAsFunc = createCallable(dataOrFn)
      this.prevData = inputAsFunc(this.props, firebase)

      const { ref, helpers, storage, database, auth } = firebase
      this.firebase = { ref, storage, database, auth, ...helpers }

      this._firebaseEvents = getEventsFromInput(this.prevData)

      watchEvents(firebase, dispatch, this._firebaseEvents)
    }

    componentWillUnmount () {
      const { firebase, dispatch } = this.context.store
      unWatchEvents(firebase, dispatch, this._firebaseEvents)
    }

    componentWillReceiveProps (np) {
      const { firebase, dispatch } = this.context.store
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
