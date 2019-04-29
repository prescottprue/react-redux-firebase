# Thunks

### redux-thunk integration

In order to get the most out of writing your thunks, make sure to set up your thunk middleware using its redux-thunk's `withExtraArgument` method like so:

```javascript
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase } from 'react-redux-firebase';
import makeRootReducer from './reducers';

const fbConfig = {} // your firebase config

const store = createStore(
  makeRootReducer(),
  initialState,
  compose(
    applyMiddleware(thunk),
    reactReduxFirebase(fbConfig, { userProfile: 'users', enableLogging: false })
  )
);

```

## Example Thunk

```javascript
const sendNotification = (payload) => ({
  type: NOTIFICATION,
  payload
})

export const addTodo = (newTodo) =>
  (dispatch, getState) => {
    return firebase
      .ref('todos')
      .push(newTodo)
      .then(() => {
        dispatch(sendNotification('Todo Added'))
      })
  };

```
