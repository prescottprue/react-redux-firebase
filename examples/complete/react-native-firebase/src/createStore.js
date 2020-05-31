import { compose, createStore } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import RNFirebase from 'react-native-firebase'
import makeRootReducer from './reducers'

const reactNativeFirebaseConfig = {
  debug: true
}
// for more config options, visit http://docs.react-redux-firebase.com/history/v2.0.0/docs/api/compose.html
const reduxFirebaseConfig = {
  userProfile: 'users' // save users profiles to 'users' collection
}

export default (initialState = { firebase: {} }) => {
  // initialize firebase
  const firebase = RNFirebase.initializeApp(reactNativeFirebaseConfig)

  const store = createStore(
    makeRootReducer(),
    initialState, // initial state
    compose(
      reactReduxFirebase(firebase, reduxFirebaseConfig) // pass initialized react-native-firebase app instance
    )
  )
  return store
}
