import createFirebaseInstance from './createFirebaseInstance'
import ReactReduxFirebaseProvider from './ReactReduxFirebaseProvider'
import ReactReduxFirebaseContext from './ReactReduxFirebaseContext'
import ReduxFirestoreProvider from './ReduxFirestoreProvider'
import ReduxFirestoreContext from './ReduxFirestoreContext'
import firebaseConnect, { createFirebaseConnect } from './firebaseConnect'
import firestoreConnect, { createFirestoreConnect } from './firestoreConnect'
import withFirebase, { createWithFirebase } from './withFirebase'
import withFirestore, { createWithFirestore } from './withFirestore'
import reducer from './reducer'
import constants, { actionTypes } from './constants'
import { authIsReady } from './utils/auth'
import * as helpers from './helpers'

export default {
  ReactReduxFirebaseProvider,
  ReactReduxFirebaseConsumer: ReactReduxFirebaseContext.Consumer,
  ReactReduxFirebaseContext,
  ReduxFirestoreContext,
  ReduxFirestoreProvider,
  ReduxFirestoreConsumer: ReduxFirestoreContext.Consumer,
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
  constants,
  actionTypes,
  authIsReady,
  helpers,
  ...helpers
}
