# `v2.*.*` to `v3.*.*` Migration Guide

## What Changed

* Support `react-redux` v6 and new React Context API - [#581](https://github.com/prescottprue/react-redux-firebase/issues/581). This mean no more `reactReduxFirebase` and `reduxFirestore` store enhancers (instance is passed through the new React context API) - [#581](https://github.com/prescottprue/react-redux-firebase/issues/581)
* `componentDidMount` used in place of `componentWillMount` for data loading in `firebaseConnect` and `firestoreConnect`
* `getFirebase` no longer part of the API
* `createFirebaseConnect` and `createFirestoreConnect` are no longer part of the API

### Remove createFirebaseConnect and createFirestoreConnect

These are no longer needed since the extended firebase instance is now loaded through react context instead of through `store.firebase`.

```diff
-  const firebaseConnect = createFirebaseConnect('otherStoreKey')
-  const firestoreConnect = createFirestoreConnect('otherStoreKey')
```

### Remove Store Enhancer

Replace store enhancer with `ReactReduxFirebaseProvider`

#### Diff

_RTDB Diff_
```diff
+ import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
- import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'

const store = createStore(
  rootReducer,
  initialState,
-  compose(
-    reactReduxFirebase(firebase, rrfConfig), // pass in firebase instance instead of config
-    applyMiddleware([ thunk.withExtraArgument(getFirebase) ]) // to add other middleware
-  )
)

+ const rrfProps = {
+   firebase,
+   config: rrfConfig,
+   dispatch: store.dispatch
+ }
const App = () => (
  <Provider store={store}>
+   <ReactReduxFirebaseProvider {...rrfProps}>
      <Todos />
+   </ReactReduxFirebaseProvider>
  </Provider>
);
```

_Firestore Diff_
```diff
+ import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
+ import { createFirestoreInstance } from 'redux-firestore'
- import { reactReduxFirebase } from 'react-redux-firebase'
- import { reduxFirestore } from 'redux-firestore'

const store = createStore(
  rootReducer,
  initialState,
  compose(
-    reactReduxFirebase(firebase, rrfConfig), // pass in firebase instance instead of config
-    reduxFirestore(firebase)
    //  applyMiddleware(...middleware) // to add other middleware
  )
)

+ const rrfProps = {
+   firebase,
+   config: rrfConfig,
+   dispatch: store.dispatch,
+   createFirestoreInstance // <- needed if using firestore
+ }
const App = () => (
  <Provider store={store}>
+   <ReactReduxFirebaseProvider {...rrfProps}>
      <Todos />
+   </ReactReduxFirebaseProvider>
  </Provider>
);
```

#### Full Examples

**`v2.*.*`**

* Pass Firebase Instance in place of
* `firebaseReducer` is now available to use in place of `firebaseStateReducer` (which is still available)

`reducer.js`
```js
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
// import { firestoreReducer } from 'redux-firestore' // <- needed if using firestore

// Add firebase to reducers
export default combineReducers({
  firebase: firebaseReducer,
  // firestore: firestoreReducer // <- needed if using firestore
})
```

`createReduxStore.js`
```js
import { createStore } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
// import { reduxFirestore } from 'redux-firestore' // <- needed if using firestore
import reducer from './reducer'

const initialState = {}

const fbConfig = {} // object containing Firebase config
const rrfConfig = { userProfile: 'users' } // react-redux-firebase config

// Initialize firebase instance
firebase.initializeApp(fbConfig)

export default () => {
  return createStore(
    rootReducer,
    initialState,
    compose(
      reactReduxFirebase(firebase, rrfConfig), // pass in firebase instance instead of config
      // reduxFirestore(firebase) // <- needed if using firestore
      //  applyMiddleware(...middleware) // to add other middleware
    )
  )
}
```

`App.js`

```js
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import createReduxStore from './createReduxStore'

// Create store with reducers and initial state
const initialState = {}
const store = createReduxStore(rootReducer, initialState)

// Setup react-redux so that connect HOC can be used
const App = () => (
  <Provider store={store}>
    <Todos />
  </Provider>
);
```

**`v3.*.*`**
`reducer.js`
```js
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
// import { firestoreReducer } from 'redux-firestore' // <- needed if using firestore

// Add firebase to reducers
export default combineReducers({
  firebase: firebaseReducer,
  // firestore: firestoreReducer // <- needed if using firestore
})
```

`createReduxStore.js`
```js
import { createStore } from 'redux'
import reducer from './reducer'

const initialState = {}

export default () => {
  return createStore(
    reducer,
    initialState,
    // applyMiddleware(...middleware) // to add other middleware
  )
}
```

`App.js`

```js
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import createReduxStore from './createReduxStore'

const fbConfig = {} // object containing Firebase config
const rrfConfig = { userProfile: 'users' } // react-redux-firebase config

// Initialize firebase instance
firebase.initializeApp(fbConfig)

const store = createReduxStore()

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
}

// Setup react-redux so that connect HOC can be used
const App = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Todos />
    </ReactReduxFirebaseProvider>
  </Provider>
);
```
