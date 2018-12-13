import React from 'react'
import PropTypes from 'prop-types'
import ReduxFirestoreContext from './ReduxFirestoreContext'

const ReduxFirestoreProvider = (props = {}) => {
  const {
    children,
    config,
    dispatch,
    firebase,
    createFirestoreInstance
  } = props
  const extendedFirestoreInstance = createFirestoreInstance(
    firebase,
    config,
    dispatch
  )
  return (
    <ReduxFirestoreContext.Provider value={extendedFirestoreInstance}>
      {children}
    </ReduxFirestoreContext.Provider>
  )
}

ReduxFirestoreProvider.propTypes = {
  children: PropTypes.node,
  config: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  createFirestoreInstance: PropTypes.func.isRequired,
  firebase: PropTypes.object.isRequired
}

export default ReduxFirestoreProvider
