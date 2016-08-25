import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'redux-firebasev3'

const rootReducer = combineReducers({
  firebase
})

export default rootReducer
