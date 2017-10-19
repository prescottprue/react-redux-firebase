import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import {
  firebaseStateReducer as firebase /*,
  firestoreReducer */
} from 'react-redux-firebase'
import locationReducer from './location'

export const makeRootReducer = asyncReducers => {
  return combineReducers({
    // Add sync reducers here
    firebase,
    // firestore: firestoreReducer,
    form,
    location: locationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
