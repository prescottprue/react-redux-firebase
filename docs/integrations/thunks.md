# redux-thunk Integration

## getFirebase As Extra Argument

In order to get the most out of writing your thunks, make sure to set up your thunk middleware using its redux-thunk's `withExtraArgument` method like so:

**createStore.js**

```javascript
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { getFirebase } from 'react-redux-firebase'
import makeRootReducer from './reducers';

const fbConfig = {} // your firebase config
const middlewares = [
  thunk.withExtraArgument(getFirebase)
]
const store = createStore(
  makeRootReducer(),
  initialState,
  compose(
    applyMiddleware(...middlewares),
  )
);
```

**App.js**
```js
import React from 'react'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // make sure you add this for firestore
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import Home from './Home'
import createStore from './createStore'
import { firebase as fbConfig, reduxFirebase as rfConfig } from './config'
import './App.css'

// Initialize Firebase instance
firebase.initializeApp(fbConfig)

const initialState = window && window.__INITIAL_STATE__ // set initial state here
const store = createStore(initialState)

export default () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={rfConfig}
      dispatch={store.dispatch}
      createFirestoreInstance={createFirestoreInstance}>
      <Home />
    </ReactReduxFirebaseProvider>
  </Provider>
)
```

## Example Thunk

```javascript
function sendNotification(payload) {
  return {
    type: NOTIFICATION,
    payload
  }
}

export function addTodo(newTodo) {
  return (dispatch, getState, getFirebase) => {
    return getFirebase()
      .ref('todos')
      .push(newTodo)
      .then(() => {
        dispatch(sendNotification('Todo Added'))
      })
}
```
