import {createStore, combineReducers, compose} from 'redux'
import {reduxReactFirebase, firebaseStateReducer} from '../source'

const rootReducer = combineReducers({
  firebase: firebaseStateReducer
})

const fbConfig = {
  apiKey: '<your-api-key>',
  authDomain: '<your-instance-name>.firebaseapp.com',
  databaseURL: 'https://<your-instance-name>.firebaseio.com',
  storageBucket: '<your-instance-name>.appspot.com',
}

const createStoreWithFirebase = compose(
    reduxReactFirebase(fbConfig, { userProfile: 'users' }),
)(createStore)


export default initialState => createStoreWithFirebase(rootReducer, initialState)
