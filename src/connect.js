import React, { Component } from 'react'
import PropTypes from 'prop-types'
import getDisplayName from 'react-display-name'
import { isEqual } from 'lodash'
import hoistStatics from 'hoist-non-react-statics'
import { watchEvents, unWatchEvents } from './actions/query'
import { getEventsFromInput, createCallable } from './utils'

/**
 * @name createFirebaseConnect
 * @description WARNING!! Advanced feature, and only be used when needing to
 * access a firebase instance created under a different store key
 * @param {String} storeKey - Name of key of store to connect to (store that contains state.firebase)
 * @return {Function} - that returns a firebaseConnect function, which is later used to wrap a component
 * @example <caption>Data</caption>
 * import { connect } from 'react-redux'
 * import { createFirebaseConnect } from 'react-redux-firebase'
 *
 * // sync /todos from firebase (in other store) into redux
 * const fbWrapped = createFirebaseConnect('someOtherName')(['todos'])
 *
 * // pass todos list from redux as this.props.todosList
 * export default connect(({ firebase: data: { todos }, auth, profile }) => ({
 *   todos,
 *   profile, // pass profile data as this.props.profile
 *   auth // pass auth data as this.props.auth
 * }))(fbWrapped)
 */
export const createFirebaseConnect = (storeKey = 'store') => (dataOrFn = []) => WrappedComponent => {
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
   * // this.props.firebase set on App component as firebase object with helpers
   * import { firebaseConnect } from 'react-redux-firebase'
   * export default firebaseConnect()(App)
   * @example <caption>Data</caption>
   * import { connect } from 'react-redux'
   * import { firebaseConnect } from 'react-redux-firebase'
   *
   * // sync /todos from firebase into redux
   * const fbWrapped = firebaseConnect([
   *   'todos'
   * ])(App)
   *
   * // pass todos list from redux as this.props.todosList
   * export default connect(({ firebase: data: { todos }, auth, profile }) => ({
   *   todos,
   *   profile, // pass profile data as this.props.profile
   *   auth // pass auth data as this.props.auth
   * }))(fbWrapped)
   */
  class FirebaseConnect extends Component {
    static contextTypes = {
      [storeKey]: PropTypes.object.isRequired
    };

    static displayName = `FirebaseConnect(${getDisplayName(WrappedComponent)}`

    static wrappedComponent = WrappedComponent
    _firebaseEvents = []

    firebase = null

    componentWillMount () {
      const { firebase, dispatch } = this.context[storeKey]

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

export default createFirebaseConnect()
