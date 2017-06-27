import firebaseConnect, { createFirebaseInstance } from './createFirebaseInstance'
import compose, { getFirebase } from './compose'
import reducer from './reducer'
import constants, { actionTypes } from './constants'
import * as helpers from './helpers'

export default {
  firebase: firebaseConnect,
  firebaseConnect,
  createFirebaseInstance,
  firebaseStateReducer: reducer,
  reduxReactFirebase: compose,
  reactReduxFirebase: compose,
  reduxFirebase: compose,
  constants,
  actionTypes,
  getFirebase,
  helpers,
  ...helpers
}
