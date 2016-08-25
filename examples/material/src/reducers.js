import { combineReducers } from 'redux'
import { routeReducer as router } from 'react-router-redux'
import { firebaseStateReducer as firebase } from 'redux-firebasev3'

const rootReducer = combineReducers({
  firebase,
  router
})

export default rootReducer
