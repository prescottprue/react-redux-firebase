import React from 'react'
import PropTypes from 'prop-types'
import ReduxFirestoreContext from './ReduxFirestoreContext'
import createFirebaseInstance from './createFirebaseInstance'

/**
 * @description Provider for context containing extended firestore instance created
 * by react-redux-firebase
 * @param {object} props - Component props
 * @param {object} props.config - react-redux-firebase config
 * @param {Function} props.dispatch - Redux's dispatch function
 * @param {object} props.firebase - Firebase library
 * @param {boolean} props.initializeAuth - Whether or not to initialize auth
 * @param {Function} props.createFirestoreInstance - Function for creating
 * extended firestore instance
 * @returns {React.Context.Provider} Provider for redux-firestore context
 * @see https://react-redux-firebase.com/docs/api/ReduxFirestoreProvider.html
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
