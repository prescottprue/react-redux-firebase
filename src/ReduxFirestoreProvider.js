import React from 'react'
import PropTypes from 'prop-types'
import ReduxFirestoreContext from './ReduxFirestoreContext'
import createFirebaseInstance from './createFirebaseInstance'

/**
 * Provider for context containing extended firestore instance created
 * by react-redux-firebase
 * @param {Object} props
 * @param {Object} props.config - react-redux-firebase config
 * @param {Function} props.dispatch - Redux's dispatch function
 * @param {Object} props.firebase - Firebase library
 * @param {Boolean} props.initializeAuth - Whether or not to initialize auth
 * @param {Function} props.createFirestoreInstance - Function for creating
 * extended firestore instance
 */
function ReduxFirestoreProvider(props = {}) {
  const {
    children,
    config,
    dispatch,
    firebase,
    createFirestoreInstance,
    initializeAuth
  } = props
  const extendedFirestoreInstance = React.useMemo(
    () => {
      const extendedFirebaseInstance = firebase._reactReduxFirebaseExtended
        ? firebase
        : createFirebaseInstance(firebase, config, dispatch)
      const extendedFirestoreInstance = createFirestoreInstance(
        firebase,
        config,
        dispatch
      )
      // Initialize auth if not disabled
      if (initializeAuth) {
        extendedFirebaseInstance.initializeAuth()
      }

      return extendedFirestoreInstance
    },
    [firebase, config, dispatch, createFirestoreInstance, initializeAuth]
  )
  return (
    <ReduxFirestoreContext.Provider value={extendedFirestoreInstance}>
      {children}
    </ReduxFirestoreContext.Provider>
  )
}

ReduxFirestoreProvider.defaultProps = {
  initializeAuth: true
}

ReduxFirestoreProvider.propTypes = {
  children: PropTypes.node,
  config: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  createFirestoreInstance: PropTypes.func.isRequired,
  initializeAuth: PropTypes.bool,
  firebase: PropTypes.object.isRequired
}

export default ReduxFirestoreProvider
