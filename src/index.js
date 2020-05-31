import createFirebaseInstance, { getFirebase } from './createFirebaseInstance'
import ReactReduxFirebaseProvider from './ReactReduxFirebaseProvider'
import ReactReduxFirebaseContext from './ReactReduxFirebaseContext'
import ReduxFirestoreProvider from './ReduxFirestoreProvider'
import ReduxFirestoreContext from './ReduxFirestoreContext'
import firebaseConnect from './firebaseConnect'
import firestoreConnect from './firestoreConnect'
import withFirebase from './withFirebase'
import withFirestore from './withFirestore'
import useFirebaseConnect from './useFirebaseConnect'
import useFirestoreConnect from './useFirestoreConnect'
import useFirebase from './useFirebase'
import useFirestore from './useFirestore'
import reducer from './reducer'
import constants, { actionTypes } from './constants'
import { authIsReady } from './utils/auth'
import * as helpers from './helpers'

export default {
  ReactReduxFirebaseProvider,
  ReactReduxFirebaseContext,
  ReduxFirestoreContext,
  ReduxFirestoreProvider,
  createFirebaseInstance,
  firebaseConnect,
  firestoreConnect,
  withFirebase,
  withFirestore,
  useFirebase,
  useFirebaseConnect,
  useFirestore,
  useFirestoreConnect,
  reducer,
  firebaseReducer: reducer,
  constants,
  actionTypes,
  getFirebase,
  authIsReady,
  ...helpers
}
