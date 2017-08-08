# `v1.*.*` to `v2.*.*` Migration Guide

### What Changed
* No more immutable JS which means:
  * no need for `pathToJS` and `dataToJS`
  * simplified population (can easily be done manually following common redux patterns)
  * [`redux-persist`](https://github.com/rt2zz/redux-persist) is supported out of the box
* Simplified population through `populate` (instead of `populatedDataToJS`)
* Firebase instance must be passed as first argument instead of config vars:
  * removes platform specific code while improving platform support
  * allows any version of Firebase to be used
  * allows [`react-native-firebase`](https://github.com/invertase/react-native-firebase) to be passed (for using native modules instead of JS within `react-native`)
  * firebase is no longer a dependency (shrinks umd bundle size)
* `profileParamsToPopulate` does not automatically populate profile, populated version can be loaded with `populate` (there will most likely be an option to enable auto populating before `v2.0.0` is out of pre-release)

### Pass In Firebase instance

If you would like to instantiate a Firebase instance outside of `react-redux-firebase`, you can pass it in as the first argument like so:

#### `v1.*.*`

```js
import { reactReduxFirebase } from 'react-redux-firebase'
const fbConfig = {} // object containing Firebase config
const rrfConfig = { userProfile: 'users' } // react-redux-firebase config

const store = createStore(
 reducer,
 initialState,
 compose(
   reactReduxFirebase(fbConfig, rrfConfig), // pass in firebase instance instead of config
   applyMiddleware(...middleware)
 )
)
```

#### `v2.*.*`

```js
import { reactReduxFirebase } from 'react-redux-firebase'
import * as firebase from 'firebase'

const fbConfig = {} // object containing Firebase config
firebase.initializeApp(fbConfig) // initialize firebase instance
const rrfConfig = {
  userProfile: 'users',
  // enableRedirectHandling: false // include this if using react-native
} // react-redux-firebase config

const store = createStore(
 reducer,
 initialState,
 compose(
   reactReduxFirebase(firebase, rrfConfig), // pass in firebase instance instead of config
   applyMiddleware(...middleware)
 )
)
```

### Loading Data and Paths

#### `v1.*.*`

```js
import { connect } from 'react-redux'
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';

@firebaseConnect(['todos'])
@connect(
  ({ firebase }) => ({
    todos: dataToJS(firebase, 'todos'),
    auth: pathToJS(firebase, 'auth')
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
    todos,
    auth
  })
)
```

### Population

##### `v1.*.*`
```js
import { connect } from 'react-redux'
import {
  firebaseConnect,
  populatedDataToJS,
  pathToJS
} from 'react-redux-firebase';

const populates = [{ child: 'owner', root: 'users' }]

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

const populates = [{ child: 'owner', root: 'users' }]

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


#### [react-native-firebase](https://github.com/invertase/react-native-firebase)

Passing in an instance also allows for libraries with similar APIs (such as [`react-native-firebase`](https://github.com/invertase/react-native-firebase)) to be used instead:

```js
import RNFirebase from 'react-native-firebase';

const rnfConfig = { debug: true } // react-native-firebase config
const firebase = RNFirebase.initializeApp(rnfConfig);
const reduxConfig = {
  userProfile: 'users',
  enableRedirectHandling: false // since react-native does not support http
}

const store = createStore(
  reducer,
  initialState,
  compose(
   // pass in react-native-firebase instance instead of firebase instance
   reactReduxFirebase(RNFirebase, reduxConfig),
   applyMiddleware(...middleware)
 )
)
```

### [redux-persist](/docs/recipes/redux-persist)

View the [redux-persist](/docs/recipes/redux-persist) section for the full example

```js
import { compose, createStore } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import { persistStore, autoRehydrate } from 'redux-persist'
import * as firebase from 'firebase'

const fbConfig = {} // firebase config object
firebase.initializeApp(fbConfig)

const rrfConfig = {}

const store = createStore(
  reducer,
  initialState,
  compose(
    reactReduxFirebase(fbConfig, rrfConfig),
    autoRehydrate()
  )
)

// then later
persistStore()

```
