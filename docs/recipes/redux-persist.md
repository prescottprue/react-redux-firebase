# Redux Persist

In order to use `redux-persist`, you must use `redux-persist-transform-immutable` to transform state since `react-redux-firebase` uses immutable.

**Note**: The immutable transform will no longer be necessary in `v2.0.0` as immutable will no longer be used. There are some small known issues with `v1.*.*`. Please share your feelings and input on [gitter](https://gitter.im/redux-firebase/Lobby).

```js
import { applyMiddleware, compose, createStore } from 'redux'
import { browserHistory } from 'react-router'
import { reactReduxFirebase } from 'react-redux-firebase'
import { persistStore, autoRehydrate } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import { firebase as fbConfig, reduxFirebase as reduxConfig } from '../config'
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

  // ======================================================
  // Store Instantiation
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      reactReduxFirebase(fbConfig, reduxConfig),
      autoRehydrate(),
      ...enhancers
    )
  )

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  // begin periodically persisting the store with a transform for the immutable state
  persistStore(store, {
    transforms: [immutableTransform()]
  })

  return store
}

```
