import connect from './connect'
import compose from './compose'
import reducer from './reducer'
import * as helpers from './helpers'

module.exports = {
  firebase: connect,
  firebaseConnect: connect,
  firebaseStateReducer: reducer,
  reduxReactFirebase: compose,
  reduxFirebase: compose,
  helpers
}
