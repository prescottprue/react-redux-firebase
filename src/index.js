import '@babel/polyfill'
import { createFirebaseInstance } from './createFirebaseInstance'
import firebaseConnect, { createFirebaseConnect } from './firebaseConnect'
import firestoreConnect, { createFirestoreConnect } from './firestoreConnect'
import withFirebase, { createWithFirebase } from './withFirebase'
import withFirestore, { createWithFirestore } from './withFirestore'
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
  withFirestore,
  createWithFirestore,
  reducer,
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
