import connect from './connect'
import compose, { getFirebase } from './compose'
import reducer from './reducer'
import constants, { actionTypes } from './constants'
import * as helpers from './helpers'

export default {
  firebase: connect,
  firebaseConnect: connect,
  firebaseStateReducer: reducer,
  reduxReactFirebase: compose,
  reactReduxFirebase: compose,
  reduxFirebase: compose,
  constants,
  actionTypes,
  getFirebase,
  helpers
}
