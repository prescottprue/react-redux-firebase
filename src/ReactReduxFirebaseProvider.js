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
    initializeAuth,
    createFirestoreInstance
  } = props
  const extendedFirebaseInstance = createFirebaseInstance(
    firebase,
    config,
    dispatch
  )
  // Initialize auth if not disabled
  if (initializeAuth) {
    extendedFirebaseInstance.initializeAuth()
  }
  if (createFirestoreInstance) {
    return (
      <ReactReduxFirebaseContext.Provider value={extendedFirebaseInstance}>
        <ReduxFirestoreProvider {...props} initializeAuth={false}>
          {children}
        </ReduxFirestoreProvider>
      </ReactReduxFirebaseContext.Provider>
    )
  }
  return (
    <ReactReduxFirebaseContext.Provider value={extendedFirebaseInstance}>
      {children}
    </ReactReduxFirebaseContext.Provider>
  )
}

ReactReduxFirebaseProvider.defaultProps = {
  initalizeAuth: true
}

ReactReduxFirebaseProvider.propTypes = {
  children: PropTypes.node,
  config: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  firebase: PropTypes.object.isRequired,
  initializeAuth: PropTypes.bool,
  createFirestoreInstance: PropTypes.func
}

export default ReactReduxFirebaseProvider
