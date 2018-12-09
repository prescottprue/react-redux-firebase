import React from 'react'
import { Provider } from 'react-redux'
import Home from './Home'
import configureStore from './store'
import './App.css'
import { firebase as fbConfig } from './config'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // make sure you add this for firestore
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

const initialState = window.__INITIAL_STATE__ // set initial state here
const store = configureStore(initialState)
// Initialize Firebase instance
firebase.initializeApp(fbConfig)

export default () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider firebase={firebase} config={fbConfig} dispatch={store.dispatch}>
      <Home />
    </ReactReduxFirebaseProvider>
  </Provider>
)
