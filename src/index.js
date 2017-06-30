import { createFirebaseInstance } from './createFirebaseInstance'
import firebaseConnect, { createFirebaseConnect } from './connect'
import compose, { getFirebase } from './compose'
import reducer from './reducer'
import constants, { actionTypes } from './constants'
import * as helpers from './helpers'

export default {
  firebase: firebaseConnect,
  firebaseConnect,
  createFirebaseConnect,
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
