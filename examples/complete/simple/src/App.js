import React from 'react'
import { Provider } from 'react-redux'
import Home from './Home'
import configureStore from './store'
import './App.css'
import { firebase as fbConfig, reduxFirebase as rfConfig } from './config'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // make sure you add this for firestore
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

const initialState = window.__INITIAL_STATE__ // set initial state here
const store = configureStore(initialState)
// Initialize Firebase instance
firebase.initializeApp(fbConfig)

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
