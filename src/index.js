import { reducer as firestoreReducer } from 'redux-firestore'
import { createFirebaseInstance } from './createFirebaseInstance'
import firebaseConnect, { createFirebaseConnect } from './firebaseConnect'
import firestoreConnect, { createFirestoreConnect } from './firestoreConnect'
import withFirebase, { createWithFirebase } from './withFirebase'
import enhancer, { getFirebase } from './enhancer'
import reducer from './reducer'
import constants, { actionTypes } from './constants'
import { authIsReady } from './utils/auth'
import * as helpers from './helpers'

export default {
  firebase: firebaseConnect,
  createFirebaseInstance,
  firebaseConnect,
  createFirebaseConnect,
  firestoreConnect,
  createFirestoreConnect,
  withFirebase,
  createWithFirebase,
  firestoreReducer,
  firebaseReducer: reducer,
  firebaseStateReducer: reducer,
  reduxReactFirebase: enhancer,
  reactReduxFirebase: enhancer,
  reduxFirebase: enhancer,
  constants,
  actionTypes,
  getFirebase,
  authIsReady,
  helpers,
  ...helpers
}
