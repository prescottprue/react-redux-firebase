import firebaseConnect, { createFirebaseConnect } from './firebaseConnect'
import compose, { getFirebase } from './compose'
import reducer from './reducer'
import constants, { actionTypes } from './constants'
import * as helpers from './helpers'

export default {
  firebase: firebaseConnect,
  firebaseConnect,
  createFirebaseConnect,
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
