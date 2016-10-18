import { createStore, compose } from 'redux'
import rootReducer from '../reducers'
import { firebase as fbConfig } from '../config'
import { reduxReactFirebase } from 'react-redux-firebase' // >= v0.1.0
// import { reduxFirebase } from 'redux-firebase' // >= v0.1.1

export default function configureStore (initialState, history) {
  const createStoreWithMiddleware = compose(
    reduxReactFirebase(fbConfig, { userProfile: 'users' }) // >= v0.1.0
    // reduxFirebase(fbConfig, { userProfile: 'users' })  // >= v0.1.1
  )(createStore)
  const store = createStoreWithMiddleware(rootReducer, initialState)

  return store
}
