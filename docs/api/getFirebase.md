# getFirebase

Expose [extended Firebase instance](/docs/api/firebaseInstance.md) created internally. Useful for
integrations into external libraries such as redux-thunk and redux-observable.

The methods which are available are documented in [firebaseInstance](/docs/api/firebaseInstance.md)

**Examples**

_redux-thunk integration_

```javascript
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { getFirebase } from 'react-redux-firebase';
import makeRootReducer from './reducers';

const store = createStore(
  makeRootReducer(),
  initialState,
  compose(
    applyMiddleware([
      // Pass getFirebase function as extra argument
      thunk.withExtraArgument(getFirebase)
    ])
  )
);

// then later
export function addTodo(newTodo) {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()
    firebase
      .push('todos', newTodo)
      .then(() => {
        dispatch({ type: 'SOME_ACTION' })
      })
  }
}
```
