import { createStore, compose } from 'redux'
import rootReducer from './reducer'
import { firebase as fbConfig } from './config'
import { reduxReactFirebase } from 'react-redux-firebase'
// import { reduxFirebase } from 'redux-firebase' // >= v0.1.1

export default function configureStore (initialState, history) {
  const createStoreWithMiddleware = compose(
    reduxReactFirebase(fbConfig, { userProfile: 'users', enableLogging: false }),
    // reduxFirebase(fbConfig, { userProfile: 'users', enableLogging: false })  // >= v0.1.1
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore)
  const store = createStoreWithMiddleware(rootReducer)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
