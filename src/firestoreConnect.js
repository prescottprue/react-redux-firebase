import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isEqual, some, filter } from 'lodash'
import hoistStatics from 'hoist-non-react-statics'
import { createCallable, wrapDisplayName } from './utils'
import ReduxFirestoreContext from './ReduxFirestoreContext'
import ReactReduxFirebaseContext from './ReactReduxFirebaseContext'

// Reserved props that should not be passed into a firebaseConnect wrapped
// component. Will throw an error if they are.
const RESERVED_PROPS = ['firebase', 'firestore']

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

    componentWillReceiveProps(np) {
      const { firestore } = this.props
      const inputAsFunc = createCallable(dataOrFn)
      const data = inputAsFunc(np, this.props)

      // Check for changes in the listener configs
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
      return <WrappedComponent {...this.props} />
    }
  }

  FirestoreConnectWrapped.propTypes = {
    dispatch: PropTypes.func.isRequired,
    firebase: PropTypes.object,
    firestore: PropTypes.object
  }

  const HoistedComp = hoistStatics(FirestoreConnectWrapped, WrappedComponent)

  const FirestoreConnect = props => {
    // Check that reserved props are not supplied to a FirebaseConnected
    // component and if they are, throw an error so the developer can rectify
    // this issue.
    const clashes = Object.keys(props).filter(k => RESERVED_PROPS.includes(k))

    if (clashes.length > 0) {
      const moreThanOne = clashes.length > 1
      throw new Error(
        `Supplied prop${moreThanOne ? 's' : ''} "${clashes.join('", "')}" ${
          moreThanOne ? 'are' : 'is'
        } reserved for internal firestoreConnect() usage.`
      )
    }

    return (
      <ReactReduxFirebaseContext.Consumer>
        {firebase => (
          <ReduxFirestoreContext.Consumer>
            {firestore => (
              <HoistedComp
                {...props}
                dispatch={firebase.dispatch}
                firestore={firestore}
                firebase={firebase}
              />
            )}
          </ReduxFirestoreContext.Consumer>
        )}
      </ReactReduxFirebaseContext.Consumer>
    )
  }

  FirestoreConnect.displayName = wrapDisplayName(
    WrappedComponent,
    'FirestoreConnect'
  )

  return FirestoreConnect
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
 *   firestoreConnect(() => ['todos']), // sync todos collection from Firestore into redux
 *   connect((state) => ({
 *     todosList: state.firestore.data.todos
 *   })
 * )(SomeComponent)
 */
export default createFirestoreConnect()
