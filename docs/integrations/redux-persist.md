# Redux Persist

Usage with [redux-persist](https://github.com/rt2zz/redux-persist) depends on which redux-persist major version you are using.

## v5

*createStore.js*

```js
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { persistStore, persistReducer, autoRehydrate } from 'redux-persist'
import localStorage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import {
  firebase as firebaseConfig, // firebase config
  reduxFirebase as reduxConfig // redux-persist config
} from '../config'

const persistConfig = {
  key: 'root',
  storage,
}

export default (initialState = {}, history) => {
  // Initialize firebase instance
  firebase.initializeApp(firebaseConfig)

  // Add reactReduxFirebase store enhancer when making store creator
  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  )(createStore)

  // Add firebase to reducers (uses persistReducer and hardSet)
  const rootReducer = combineReducers({
    firebase: persistReducer(
      { key: 'firepersist', storage: localStorage, stateReconciler: hardSet },
      firebaseReducer
    ),
    anotherReducer
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = createStoreWithFirebase(persistedReducer, initialState)
  const persistor = persistStore(store)

  return { store, persistor }
}
```

*App.js*

```js
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { browserHistory } from 'react-router'
import createStore from './createStore'

const initialState = {}

const { store, persistor } = createStore(initialState, browserHistory)

// Setup react-redux so that connect HOC can be used
const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RootComponent />
    </PersistGate>
  </Provider>
);

render(<App/>, document.getElementById('root'));
```

## v4

redux-persist `v4.*.*` is supported out of the box, meaning no transforms are required:

```js
import { applyMiddleware, compose, createStore } from 'redux'
import { browserHistory } from 'react-router'
import firebase from 'firebase'
import { reactReduxFirebase } from 'react-redux-firebase'
import { persistStore, autoRehydrate } from 'redux-persist'
import {
  firebase as firebaseConfig,
  reduxFirebase as reduxConfig
} from '../config'
import makeRootReducer from './reducers'
import { updateLocation } from './location'

export default (initialState = {}, history) => {
  const middleware = []
  const enhancers = []

  firebase.initializeApp(firebaseConfig)

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
