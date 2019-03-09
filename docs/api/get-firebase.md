# getFirebase

Expose Firebase instance created internally, which is the same as [props.firebase](/docs/api/props-firebase.md). Useful for
integrations into external libraries such as redux-thunk and redux-observable.

The methods which are available are documented in [firebaseInstance](/docs/api/firebaseInstance.md)

**Examples**

_redux-thunk integration_

```javascript
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import firebase from 'firebase';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import makeRootReducer from './reducers';

const fbConfig = {} // your firebase config
firebase.initializeApp(fbConfig)

const store = createStore(
  makeRootReducer(),
  initialState,
  compose(
    applyMiddleware([
      // Pass getFirebase function as extra argument
      thunk.withExtraArgument(getFirebase)
    ]),
    reactReduxFirebase(firebase)
  )
);
// then later
export const addTodo = (newTodo) =>
 (dispatch, getState, getFirebase) => {
   const firebase = getFirebase()
   firebase
     .push('todos', newTodo)
     .then(() => {
       dispatch({ type: 'SOME_ACTION' })
     })
};
```
