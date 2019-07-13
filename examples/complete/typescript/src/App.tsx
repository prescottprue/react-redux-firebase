import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore"; // make sure you add this for firestore
import React from "react";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { firebase as fbConfig, reduxFirebase as rfConfig } from "./config";
import Home from "./Home";
import configureStore from "./store";

const initialState = {};
const store = configureStore(initialState);
// Initialize Firebase instance
firebase.initializeApp(fbConfig);

export default () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={rfConfig}
      dispatch={store.dispatch}>
      <Home />
    </ReactReduxFirebaseProvider>
  </Provider>
);

