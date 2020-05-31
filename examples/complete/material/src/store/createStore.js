import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { getFirebase } from 'react-redux-firebase'
import makeRootReducer from './reducers'

export default (initialState = {}) => {
  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []

  if (window && window.location && window.location.hostname === 'localhost') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    thunk.withExtraArgument(getFirebase)
    // This is where you add other middleware like redux-observable
  ]

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default // eslint-disable-line global-require
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
