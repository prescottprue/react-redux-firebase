import { combineReducers } from 'redux'
import { firebaseReducer, firestoreReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})

export default rootReducer
