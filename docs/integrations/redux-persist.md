# Redux Persist

Redux persist is supported out of the box as of `v2.0.0`. That means you no longer need any transforms.

```js
import { applyMiddleware, compose, createStore } from 'redux'
import { browserHistory } from 'react-router'
import firebase from 'firebase'
import { reactReduxFirebase } from 'react-redux-firebase'
import { persistStore, autoRehydrate } from 'redux-persist'
import { reduxFirebase as reduxConfig } from '../config'
import makeRootReducer from './reducers'
import { updateLocation } from './location'

export default (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = []

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  firebase.initializeApp(firebaseConfig)

  // ======================================================
  // Store Instantiation
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      reactReduxFirebase(firebase, reduxConfig),
      applyMiddleware(...middleware),
      autoRehydrate(),
      ...enhancers
    )
  )

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  // begin periodically persisting the store with a transform for the immutable state
  persistStore(store)

  return store
}

```
