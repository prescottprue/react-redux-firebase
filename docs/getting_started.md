# Getting Started

## Before Use

### Peer Dependencies

Install peer dependencies: `npm i --save redux react-redux`

## Install
```bash
npm install --save react-redux-firebase
```

## Add Reducer

Include `firebase` in your combine reducers function:

```js
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer
})
```

## Setting Up App With Store

```javascript
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
// import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers, compose } from 'redux'
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
// import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

const fbConfig = {}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
// firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  // firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState)

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

render(<App/>, document.getElementById('root'));
```
