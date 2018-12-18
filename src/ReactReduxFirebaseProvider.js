import React from 'react'
import PropTypes from 'prop-types'
import createFirebaseInstance from './createFirebaseInstance'
import ReactReduxFirebaseContext from './ReactReduxFirebaseContext'
import ReduxFirestoreProvider from './ReduxFirestoreProvider'

function ReactReduxFirebaseProvider(props = {}) {
  const {
    children,
    config,
    dispatch,
    firebase,
    createFirestoreInstance
  } = props
  const extendedFirebaseInstance = createFirebaseInstance(
    firebase,
    config,
    dispatch
  )
  if (createFirestoreInstance) {
    return (
      <ReactReduxFirebaseContext.Provider value={extendedFirebaseInstance}>
        <ReduxFirestoreProvider {...props}>{children}</ReduxFirestoreProvider>
      </ReactReduxFirebaseContext.Provider>
    )
  }
  return (
    <ReactReduxFirebaseContext.Provider value={extendedFirebaseInstance}>
      {children}
    </ReactReduxFirebaseContext.Provider>
  )
}

ReactReduxFirebaseProvider.propTypes = {
  children: PropTypes.node,
  config: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  firebase: PropTypes.object.isRequired,
  createFirestoreInstance: PropTypes.func
}

export default ReactReduxFirebaseProvider
