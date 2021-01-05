import { createStore, compose } from 'redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // make sure you add this for firestore
import { reactReduxFirebase } from 'react-redux-firebase'
import { firebase as fbConfig } from './config'
import rootReducer from './reducer'

export default function configureStore(initialState, history) {
  // Initialize Firebase instance
  firebase.initializeApp(fbConfig)

  const createStoreWithMiddleware = compose(
    reactReduxFirebase(firebase, {
      userProfile: 'users',
      useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
    })
  )(createStore)

  const store = createStoreWithMiddleware(rootReducer)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
