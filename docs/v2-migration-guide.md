# `v1.*.*` to `v2.*.*` Migration Guide

### What Changed
* No more immutable JS which means:
  * no need for `pathToJS` and `dataToJS`
  * simplified population (can easily be done manually following common redux patterns)
  * [`redux-persist`](https://github.com/rt2zz/redux-persist) is supported out of the box
* Simplified population through `populate` (instead of `populatedDataToJS`)
* Firebase instance can be passed as first argument instead of config vars:
  * removes platform specific code while improving platform support
  * allows any version of Firebase to be used
  * allows [`react-native-firebase`](https://github.com/invertase/react-native-firebase) to be passed (for using native modules instead of JS within `react-native`)

#### `v1.*.*`

```js
import { connect } from 'react-redux'
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';

@firebaseConnect(['todos'])
@connect(
  ({ firebase }) => ({
    todos: dataToJS(firebase, 'todos', populates),
    auth: pathToJS(firebase, 'auth'),
  })
)
```

#### `v2.*.*`
```js
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase';

@firebaseConnect(['todos'])
@connect(
  ({ firebase: { auth, data: { todos }} }) => ({
    todos, // mapping state.firebase.data.todos to props.todos
    auth,
  })
)
```

### population

##### `v1.*.*`
```js
import { connect } from 'react-redux'
import {
  firebaseConnect,
  populatedDataToJS,
  pathToJS
} from 'react-redux-firebase';

@firebaseConnect([
  { path: '/todos', populates }
  // '/todos#populate=owner:displayNames', // equivalent string notation
])
@connect(
  ({ firebase }) => ({
    todos: populatedDataToJS(firebase, 'todos', populates),
    auth: pathToJS(firebase, 'auth')
  })
)
```

##### `v2.*.*`
```js
import { connect } from 'react-redux'
import { firebaseConnect, populate } from 'react-redux-firebase'

const populates = [
  { child: 'owner', root: 'users' }
]

@firebaseConnect([
  { path: 'todos', populates }
  // '/todos#populate=owner:users', // equivalent string notation
])
@connect(
  ({ firebase }) => ({
    todos: populate(firebase, 'todos', populates),
  })
)
```

### Pass In Firebase instance

If you would like to instantiate a Firebase instance outside of `react-redux-firebase`, you can pass it in as the first argument like so:

```js
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const fbConfig = {} // object containing Firebase config
firebase.initializeApp(fbConfig) // initialize firebase instance

const store = createStore(
 makeRootReducer(),
 initialState,
 compose(
   reactReduxFirebase(firebase, reduxConfig), // pass in firebase instance instead of config
   applyMiddleware(...middleware)
 )
)
```

#### [react-native-firebase](https://github.com/invertase/react-native-firebase)

Passing in an instance also allows for libraries with similar APIs (such as [`react-native-firebase`](https://github.com/invertase/react-native-firebase)) to be used instead:

```js
import RNFirebase from 'react-native-firebase';

const configurationOptions = {
  debug: true
};

const firebase = RNFirebase.initializeApp(configurationOptions);

const store = createStore(
  reducer,
  undefined,
  compose(
   reactReduxFirebase(RNFirebase, reduxConfig), // pass in react-native-firebase instance instead of config
   applyMiddleware(...middleware)
 )
)
```
