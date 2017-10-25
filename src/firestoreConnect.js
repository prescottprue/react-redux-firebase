import React, { Component } from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import { wrapDisplayName } from 'recompose'
import { createCallable } from './utils'

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
 * // this.props.firebase set on App component as firebase object with helpers
 * import { createFirestoreConnect } from 'react-redux-firebase'
 * // create firebase connect that uses another redux store
 * const firestoreConnect = createFirestoreConnect('anotherStore')
 * // use the firebaseConnect to wrap a component
 * export default firestoreConnect()(SomeComponent)
 */
export const createFirestoreConnect = (storeKey = 'store') =>
  (dataOrFn = []) =>
    WrappedComponent => {
      class FirestoreConnect extends Component {
        prevData = null

        static contextTypes = {
          [storeKey]: PropTypes.object.isRequired
        }

        static wrappedComponent = WrappedComponent

        static displayName = wrapDisplayName(WrappedComponent, 'FirestoreConnect')

        componentWillMount () {
          const { firebase, firestore } = this.context[storeKey]
          if (firebase.firestore && firestore) {
            // Allow function to be passed
            const inputAsFunc = createCallable(dataOrFn)
            this.prevData = inputAsFunc(this.props, this.context[storeKey])

            firestore.setListeners(this.prevData)
          }
        }

        componentWillUnmount () {
          const { firebase, firestore } = this.context[storeKey]
          if (firebase.firestore && this.prevData) {
            firestore.unsetListeners(this.prevData)
          }
        }

        // TODO: Re-attach listeners on query path change
        // componentWillReceiveProps (np) {
        //   const { firebase, dispatch } = this.context.store
        //   const inputAsFunc = createCallable(dataOrFn)
        //   const data = inputAsFunc(np, firebase)
        //
        //   // Handle a data parameter having changed
        //   if (!isEqual(data, this.prevData)) {
        //     this.prevData = data
        //     // UnWatch all current events
        //     unWatchEvents(firebase, dispatch, this._firebaseEvents)
        //     // Get watch events from new data
        //     this._firebaseEvents = getEventsFromInput(data)
        //     // Watch new events
        //     watchEvents(firebase, dispatch, this._firebaseEvents)
        //   }
        // }

        render () {
          const { firebase, firestore } = this.context[storeKey]
          return (
            <WrappedComponent
              {...this.props}
              {...this.state}
              firebase={{ ...firebase, ...firebase.helpers }}
              firestore={firestore}
            />
          )
        }
      }

      return hoistStatics(FirestoreConnect, WrappedComponent)
    }

/**
 * @name firestoreConnect
 * @extends React.Component
 * @description Higher Order Component that automatically listens/unListens
 * to provided Cloud Firestore paths using React's Lifecycle hooks. Make sure you
 * have required/imported Cloud Firestore before attempting to use. **Note** Populate
 * is not yet supported.
 * @param {Array} watchArray - Array of objects or strings for paths to sync from
 * Firebase. Can also be a function that returns the array. The function is passed
 * the current props and the firebase object.
 * @return {Function} - that accepts a component to wrap and returns the wrapped component
 * @example <caption>Basic</caption>
 * // this.props.firebase set on App component as firebase object with helpers
 * import { firestoreConnect } from 'react-redux-firebase'
 * export default firestoreConnect()(App)
 * @example <caption>Basic</caption>
 * import { connect } from 'react-redux'
 * import { firestoreConnect } from 'react-redux-firebase'
 *
 * // pass todos list from redux as this.props.todosList
 * export default compose(
 *   firestoreConnect(['todos']), // sync todos collection from Firestore into redux
 *   connect((state) => ({
 *     todosList: state.firebase.data.todos,
 *     profile: state.firebase.profile, // pass profile data as this.props.profile
 *     auth: state.firebase.auth // pass auth data as this.props.auth
 *   })
 * )(fbWrapped)
 */
export default createFirestoreConnect()
