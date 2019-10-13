import React from 'react'
import PropTypes from 'prop-types'
import createFirebaseInstance from './createFirebaseInstance'
import ReactReduxFirebaseContext from './ReactReduxFirebaseContext'
import ReduxFirestoreProvider from './ReduxFirestoreProvider'

/**
 * @description Provider for context containing extended firebase
 * instance created by react-redux-firebase.
 * @param {object} props - Component props
 * @param {object} props.config - react-redux-firebase config
 * @param {Function} props.dispatch - Redux's dispatch function
 * @param {object} props.firebase - Firebase library
 * @param {boolean} props.initializeAuth - Whether or not to initialize auth
 * @param {Function} props.createFirestoreInstance - Function for creating
 * extended firestore instance
 * @returns {React.Context.Provider} Provider for react-redux-firebase context
 * @see https://react-redux-firebase.com/api/docs/ReactReduxFirebaseProvider.html
 */
function ReactReduxFirebaseProvider(props = {}) {
  const {
    children,
    config,
    dispatch,
    firebase,
    initializeAuth,
    createFirestoreInstance
  } = props
  const extendedFirebaseInstance = React.useMemo(
    () => {
      const extendedFirebaseInstance = createFirebaseInstance(
        firebase,
        config,
        dispatch
      )
      if (initializeAuth) {
        extendedFirebaseInstance.initializeAuth()
      }
      return extendedFirebaseInstance
    },
    [firebase, config, dispatch]
  )
  // Initialize auth if not disabled
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
  initializeAuth: true
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
