# Redux Saga Recipes

### Example

```javascript
import { applyMiddleware, compose, createStore } from 'redux'
import { browserHistory } from 'react-router'
import makeRootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {} // firebase configuration including databaseURL
const reduxFirebase = {
  userProfile: 'users'
}

firebase.initializeApp(firebaseConfig)

function* helloSaga() {
  try {
    yield firebase.ref('/some/path').push({ nice: 'work!' })
  } catch (err) {
    console.log('Error in saga!:', err)
  }
}

export default (initialState = {}, history) => {
  const sagaMiddleware = createSagaMiddleware() // create middleware

  const middleware = [sagaMiddleware]

  const store = createStore(
    makeRootReducer(),
    {}, // initial state
    compose(applyMiddleware(...middleware))
  )

  return store
}

// when calling saga
sagaMiddleware.run(helloSaga)
```
