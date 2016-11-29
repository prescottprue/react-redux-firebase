import { combineReducers } from 'redux'
import { routeReducer as router } from 'react-router-redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'

const rootReducer = combineReducers({
  firebase,
  router
})

export default rootReducer
