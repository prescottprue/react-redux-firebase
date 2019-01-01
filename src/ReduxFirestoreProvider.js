import React from 'react'
import PropTypes from 'prop-types'
import ReduxFirestoreContext from './ReduxFirestoreContext'
import createFirebaseInstance from './createFirebaseInstance'

function ReduxFirestoreProvider(props = {}) {
  const {
    children,
    config,
    dispatch,
    firebase,
    createFirestoreInstance,
    initalizeAuth
  } = props
  const extendedFirebaseInstance = createFirebaseInstance(
    firebase,
    config,
    dispatch
  )
  const extendedFirestoreInstance = createFirestoreInstance(
    firebase,
    config,
    dispatch
  )
  // Initialize auth if not disabled
  if (initalizeAuth) {
    extendedFirebaseInstance.initializeAuth()
  }
  return (
    <ReduxFirestoreContext.Provider value={extendedFirestoreInstance}>
      {children}
    </ReduxFirestoreContext.Provider>
  )
}

ReduxFirestoreProvider.defaultProps = {
  initalizeAuth: true
}

ReduxFirestoreProvider.propTypes = {
  children: PropTypes.node,
  config: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  createFirestoreInstance: PropTypes.func.isRequired,
  initalizeAuth: PropTypes.bool,
  firebase: PropTypes.object.isRequired
}

export default ReduxFirestoreProvider
