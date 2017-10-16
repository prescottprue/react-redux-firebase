import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase, firestoreReducer as firestore } from 'react-redux-firebase'
import { reducer as form } from 'redux-form'
import locationReducer from './location'

export const makeRootReducer = asyncReducers => {
  return combineReducers({
    // Add sync reducers here
    firebase,
    firestore,
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
