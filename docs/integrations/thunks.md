# Thunks

### redux-thunk integration

In order to get the most out of writing your thunks, make sure to set up your thunk middleware using its redux-thunk's `withExtraArgument` method like so:

```javascript
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import makeRootReducer from './reducers';

const fbConfig = {} // your firebase config

const store = createStore(
  makeRootReducer(),
  initialState,
  compose(
    applyMiddleware([
      thunk.withExtraArgument(getFirebase) // Pass getFirebase function as extra argument
    ]),
    reactReduxFirebase(fbConfig, { userProfile: 'users', enableLogging: false })
  )
);

```

## Example Thunk

After following the setup above, `getFirebase` function becomes available within your thunks as the third argument:

```javascript
const sendNotification = (payload) => {
  type: NOTIFICATION,
  payload
}
export const addTodo = (newTodo) =>
  (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()
    firebase
      .push('todos', newTodo)
      .then(() => {
        dispatch(sendNotification('Todo Added'))
      })
  };

```
