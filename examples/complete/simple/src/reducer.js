import { combineReducers } from 'redux'
import { reducer as firebase } from 'react-redux-firebase'
// import { reducer as firestore } from 'react-redux-firebase'

const rootReducer = combineReducers({
  firebase,
  // firestore // add this for firestore
})

export default rootReducer
