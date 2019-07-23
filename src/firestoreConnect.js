import React from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import { invokeArrayQuery, wrapDisplayName } from './utils'
import useFirestoreConnect from './useFirestoreConnect'
import useFirebase from './useFirebase'
import useFirestore from './useFirestore'

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
  const FirestoreConnect = function FirestoreConnect(props) {
    const contextFirebase = useFirebase()
    const contextFirestore = useFirestore()
    const firebase = props.firebase || contextFirebase
    const firestore = props.firestore || contextFirestore
    const data = invokeArrayQuery(dataOrFn, props)

    useFirestoreConnect(data, [data])

    return (
      <WrappedComponent
        firebase={firebase}
        firestore={firestore}
        dispatch={firebase.dispatch}
        {...props}
      />
    )
  }

  FirestoreConnect.propTypes = {
    dispatch: PropTypes.func,
    firebase: PropTypes.object,
    firestore: PropTypes.object
  }

  FirestoreConnect.displayName = wrapDisplayName(
    WrappedComponent,
    'FirestoreConnect'
  )

  FirestoreConnect.wrappedComponent = WrappedComponent

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
 *   firestoreConnect(() => ['todos']), // sync todos collection from Firestore into redux
 *   connect((state) => ({
 *     todosList: state.firestore.data.todos
 *   })
 * )(SomeComponent)
 */
export default createFirestoreConnect()
