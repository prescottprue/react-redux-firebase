import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isEqual, some, filter } from 'lodash'
import hoistStatics from 'hoist-non-react-statics'
import { createCallable, wrapDisplayName } from './utils'
import { v3ErrorMessage } from './constants'

/**
 * @name createFirestoreConnect
 * @description Function that creates a Higher Order Component that
 * automatically listens/unListens to provided firebase paths using
 * React's Lifecycle hooks.
 * **WARNING!!** This is an advanced feature, and should only be used when
 * needing to access a firebase instance created under a different store key.
 * @param {String} [storeKey='store'] - Name of redux store which contains
 * Firebase state (state.firebase)
 * @return {Function} - HOC that accepts a watchArray and wraps a component
 * @example <caption>Basic</caption>
 * // props.firebase set on App component as firebase object with helpers
 * import { createFirestoreConnect } from 'react-redux-firebase'
 * // create firebase connect that uses another redux store
 * const firestoreConnect = createFirestoreConnect('anotherStore')
 * // use the firebaseConnect to wrap a component
 * export default firestoreConnect()(SomeComponent)
 */
export const createFirestoreConnect = (storeKey = 'store') => (
  dataOrFn = []
) => WrappedComponent => {
  class FirestoreConnect extends Component {
    static wrappedComponent = WrappedComponent
    static displayName = wrapDisplayName(WrappedComponent, 'FirestoreConnect')
    static contextTypes = {
      [storeKey]: PropTypes.object.isRequired
    }

    prevData = null
    store = this.context[storeKey]

    get firestoreIsEnabled() {
      return !!this.store.firestore
    }

    componentWillMount() {
      // Throw if using with react-redux@^6
      if (!this.context || !this.context[storeKey]) {
        // Use react-redux-firebase@^3 for react-redux@^6 support. More info available in the migration guide: http://bit.ly/2SRNdiO'
        throw new Error(v3ErrorMessage)
      }
      const { firestore } = this.store
      if (this.firestoreIsEnabled) {
        // Allow function to be passed
        const inputAsFunc = createCallable(dataOrFn)
        this.prevData = inputAsFunc(this.props, this.store)

        firestore.setListeners(this.prevData)
      }
    }

    componentWillUnmount() {
      const { firestore } = this.store
      if (this.firestoreIsEnabled && this.prevData) {
        firestore.unsetListeners(this.prevData)
      }
    }

    /* eslint-disable camelcase */
    UNSAFE_componentWillReceiveProps(np) {
      /* eslint-enable camelcase */
      const { firestore } = this.store
      const inputAsFunc = createCallable(dataOrFn)
      const data = inputAsFunc(np, this.store)

      // Handle changes to data
      if (this.firestoreIsEnabled && !isEqual(data, this.prevData)) {
        const changes = this.getChanges(data, this.prevData)

        this.prevData = data

        // Remove listeners for inactive subscriptions
        firestore.unsetListeners(changes.removed)

        // Add listeners for new subscriptions
        firestore.setListeners(changes.added)
      }
    }

    getChanges(data = [], prevData = []) {
      const result = {}
      result.added = filter(data, d => !some(prevData, p => isEqual(d, p)))
      result.removed = filter(prevData, p => !some(data, d => isEqual(p, d)))
      return result
    }

    render() {
      const { firebase, firestore } = this.store
      const newProps = { ...this.props, firestore }
      if (firebase) {
        newProps.firebase = { ...firebase, ...firebase.helpers }
      }
      return <WrappedComponent {...newProps} />
    }
  }

  return hoistStatics(FirestoreConnect, WrappedComponent)
}

/**
 * @name firestoreConnect
 * @extends React.Component
 * @description Higher Order Component that automatically listens/unListens
 * to provided Cloud Firestore paths using React's Lifecycle hooks. Make sure you
 * have required/imported Cloud Firestore, including it's reducer, before
 * attempting to use. **Note** Populate is not yet supported.
 * @param {Array} queriesConfig - Array of objects or strings for paths to sync
 * from Firebase. Can also be a function that returns the array. The function
 * is passed the current props and the firebase object.
 * @return {Function} - that accepts a component to wrap and returns the wrapped component
 * @example <caption>Basic</caption>
 * // props.firebase set on App component as firebase object with helpers
 * import { firestoreConnect } from 'react-redux-firebase'
 * export default firestoreConnect()(SomeComponent)
 * @example <caption>Basic</caption>
 * import { connect } from 'react-redux'
 * import { firestoreConnect } from 'react-redux-firebase'
 *
 * // pass todos list from redux as props.todosList
 * export default compose(
 *   firestoreConnect(['todos']), // sync todos collection from Firestore into redux
 *   connect((state) => ({
 *     todosList: state.firestore.data.todos,
 *     profile: state.firestore.profile, // pass profile data as props.profile
 *     auth: state.firestore.auth // pass auth data as props.auth
 *   })
 * )(SomeComponent)
 */
export default createFirestoreConnect()
