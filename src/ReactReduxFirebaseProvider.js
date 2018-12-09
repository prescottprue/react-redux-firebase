import React from 'react'
import PropTypes from 'prop-types'
import createFirebaseInstance from './createFirebaseInstance'
import ReactReduxFirebaseContext from './ReactReduxFirebaseContext'

const ReactReduxFirebaseProvider = (props = {}) => {
  const { children, config, dispatch, firebase } = props
  const extendedFirebaseInstance = createFirebaseInstance(
    firebase,
    config,
    dispatch
  )
  return (
    <ReactReduxFirebaseContext.Provider value={extendedFirebaseInstance}>
      {React.cloneElement(children, { dispatch })}
    </ReactReduxFirebaseContext.Provider>
  )
}

ReactReduxFirebaseProvider.propTypes = {
  children: PropTypes.node,
  config: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  firebase: PropTypes.object.isRequired
}

export default ReactReduxFirebaseProvider
