# Redux Form Recipes

In order to use `react-redux-firebase` instance within sagas, pass it as the second argument of the run function `sagaMiddleware.run(helloSaga, getFirebase)`.

### Example

```javascript
import { applyMiddleware, compose, createStore } from 'redux'
import { browserHistory } from 'react-router'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import makeRootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'

const firebaseConfig = {} // firebase configuration including databaseURL
const reduxFirebase = {
  userProfile: 'users',
  enableLogging: 'false'
}

function* helloSaga(getFirebase) {
  try {
    yield getFirebase().push('/some/path', { nice: 'work!' })
  } catch(err) {
    console.log('Error in saga!:', err)
  }
}

export default (initialState = {}, history) => {

  const sagaMiddleware = createSagaMiddleware() // create middleware

  const middleware = [ sagaMiddleware ]

  const store = createStore(
    makeRootReducer(),
    {}, // initial state
    compose(
      reactReduxFirebase(fbConfig, reduxConfig),
      applyMiddleware(...middleware)
    )
  )

  return store
}

// when calling saga, pass getFirebase
sagaMiddleware.run(helloSaga, getFirebase)

```
