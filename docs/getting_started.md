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

## Add Reducer using Typescript:

We provide optional `Profile` and `Schema` types for additional type checking.

You can add the `Profile` type if you use the [Profile option](https://react-redux-firebase.com/docs/recipes/profile.html).

You can define a `Schema` that corresponds to your Firebase Redux store for `state.firebase.data` and `state.firebase.ordered`. That could be a map of your Realtime Database collections, or anything else if you use `storeAs` to name custom stores.

```typescript
import { combineReducers } from 'redux'
import { firebaseReducer, FirebaseReducer } from 'react-redux-firebase'

// Optional: If you use the user profile option
interface Profile {
  name: string
  email: string
}

// If you have a todos collection, you might have this type
interface Todo {
  text: string
  completed: boolean
}

// Optional: You can define the schema of your Firebase Redux store.
// This will give you type-checking for state.firebase.data.todos and state.firebase.ordered.todos
interface Schema {
  todos: Todo
}

// with both reducer types
interface RootState {
  firebase: FirebaseReducer.Reducer<Profile, Schema>
}

// with only Profile type
interface RootState {
  firebase: FirebaseReducer.Reducer<Profile>
}

// with only Schema type
interface RootState {
  firebase: FirebaseReducer.Reducer<{}, Schema>
}

// without reducer types
interface RootState {
  firebase: FirebaseReducer.Reducer
}


const rootReducer = combineReducers<RootState>({
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
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'
// import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

const fbConfig = {}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
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
  firebase: firebaseReducer
  // firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
}

// Setup react-redux so that connect HOC can be used
function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Todos />
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}

render(<App />, document.getElementById('root'))
```
