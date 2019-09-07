import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash'
import hoistStatics from 'hoist-non-react-statics'
import { createCallable, wrapDisplayName, getChanges } from './utils'
import ReduxFirestoreContext from './ReduxFirestoreContext'
import ReactReduxFirebaseContext from './ReactReduxFirebaseContext'

/**
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
 *   firestoreConnect(() => ['todos']), // sync todos collection from Firestore into redux
 *   connect((state) => ({
 *     todosList: state.firestore.data.todos
 *   })
 * )(SomeComponent)
 */
export default function firestoreConnect(dataOrFn = []) {
  return WrappedComponent => {
    class FirestoreConnectWrapped extends Component {
      static wrappedComponent = WrappedComponent
      static displayName = wrapDisplayName(
        WrappedComponent,
        'FirestoreConnectWrapped'
      )

      prevData = null

      get firestoreIsEnabled() {
        return !!this.props.firestore
      }

      componentDidMount() {
        if (this.firestoreIsEnabled) {
          // Listener configs as object (handling function being passed)
          const inputAsFunc = createCallable(dataOrFn)
          this.prevData = inputAsFunc(this.props, this.props)
          // Attach listeners based on listener config
          this.props.firestore.setListeners(this.prevData)
        }
      }

      componentWillUnmount() {
        if (this.firestoreIsEnabled && this.prevData) {
          this.props.firestore.unsetListeners(this.prevData)
        }
      }

      /* eslint-disable camelcase */
      UNSAFE_componentWillReceiveProps(np) {
        /* eslint-enable camelcase */
        const { firestore } = this.props
        const inputAsFunc = createCallable(dataOrFn)
        const data = inputAsFunc(np, this.props)

        // Check for changes in the listener configs
        if (this.firestoreIsEnabled && !isEqual(data, this.prevData)) {
          const changes = getChanges(data, this.prevData)

          this.prevData = data

          // Remove listeners for inactive subscriptions
          firestore.unsetListeners(changes.removed)

          // Add listeners for new subscriptions
          firestore.setListeners(changes.added)
        }
      }

      render() {
        return <WrappedComponent {...this.props} />
      }
    }

    FirestoreConnectWrapped.propTypes = {
      dispatch: PropTypes.func.isRequired,
      firebase: PropTypes.object,
      firestore: PropTypes.object
    }

    function FirestoreConnectWithContext(props) {
      return (
        <ReactReduxFirebaseContext.Consumer>
          {_internalFirebase => (
            <ReduxFirestoreContext.Consumer>
              {_internalFirestore => (
                <FirestoreConnectWrapped
                  {...props}
                  dispatch={_internalFirebase.dispatch}
                  firestore={_internalFirestore}
                  firebase={_internalFirebase}
                />
              )}
            </ReduxFirestoreContext.Consumer>
          )}
        </ReactReduxFirebaseContext.Consumer>
      )
    }

    FirestoreConnectWithContext.displayName = wrapDisplayName(
      WrappedComponent,
      'FirestoreConnect'
    )

    FirestoreConnectWithContext.wrappedComponent = WrappedComponent

    return hoistStatics(FirestoreConnectWithContext, WrappedComponent)
  }
}
