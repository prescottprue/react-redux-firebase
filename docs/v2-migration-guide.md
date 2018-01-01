# `v1.*.*` to `v2.*.*` Migration Guide

### What Changed
* No more immutable JS which means:
  * no need for `pathToJS` and `dataToJS` ([`getVal` added](#getval) for easy transition)
  * simplified population (can easily be done manually following common redux patterns)
  * [`redux-persist`](https://github.com/rt2zz/redux-persist) is supported out of the box
* Simplified population through `populate` (instead of `populatedDataToJS`)
* Firebase instance must be passed as first argument instead of config vars:
  * removes platform specific code while improving platform support
  * allows any version of Firebase to be used
  * allows [`react-native-firebase`](https://github.com/invertase/react-native-firebase) to be passed (for using native modules instead of JS within `react-native`)
  * firebase is no longer a dependency (shrinks umd bundle size)
* Auth state works differently - `{ isLoaded: false, isEmpty: false }` is the initialState instead of `undefined` - means updates to routing HOCs and other code using auth state (see [Routing Section below](#routing))
* `firebaseConnect` now passes `state` as second argument if function is passed. `store.firebase` is now third argument instead of second (see [state based query secont](#stateBasedQueries) below)
* `profileParamsToPopulate` does not automatically populate profile, populated version can be loaded with `populate` (there will most likely be an option to enable auto populating before `v2.0.0` is out of pre-release)
* Firestore is supported (setup shown below)
* `LOGOUT` is no longer dispatched on empty auth state changes (`enableEmptyAuthChanges: true` can be passed to dispatch `AUTH_EMPTY_CHANGE` action in its place)
* `enableEmptyAuthChanges` is no longer an option, it has been replaced by `preserveOnEmptyAuthChange` (see [empty auth](#emptyAuth) below)

### Pass In Firebase instance

If you would like to instantiate a Firebase instance outside of `react-redux-firebase`, you can pass it in as the first argument like so:

**`v1.*.*`**

```js
import { compose, createStore } from 'redux'
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

**`v2.*.*`**

* Pass Firebase Instance in place of
* `firebaseReducer` is now available to use in place of `firebaseStateReducer` (which is still available)

```js
import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase'
// import 'firebase/firestore' // <- needed if using firestore

const fbConfig = {} // object containing Firebase config
const rrfConfig = { userProfile: 'users' } // react-redux-firebase config

// initialize firebase instance
firebase.initializeApp(config) // <- new to v2.*.*
// firebase.firestore() // <- needed if using firestore

// Add Firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  // firestore: firestoreReducer // <- needed if using firestore
})

const store = createStore(
 rootReducer,
 initialState,
 compose(
   reactReduxFirebase(firebase, rrfConfig), // pass in firebase instance instead of config
   // reduxFirestore(firebase) // <- needed if using firestore
  //  applyMiddleware(...middleware) // to add other middleware
 )
)
```

### Loading Data and Paths {#data}

**`v1.*.*`**

```js
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';

const enhance = compose(
  firebaseConnect(['todos']),
  connect(
    ({ firebase }) => ({
      todos: dataToJS(firebase, 'todos'),
      auth: pathToJS(firebase, 'auth')
    })
  )
)

export default enhance(SomeComponent)
```

**`v2.*.*`**

```js
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase';

const enhance = compose(
  firebaseConnect(['todos']),
  connect(
    ({ firebase: { auth, data: { todos }} }) => ({
      todos,
      auth
    })
  )
)
export default enhance(SomeComponent)
```

#### getVal {#getval}

`getVal` has been added to replace `dataToJS` and `pathToJS` in an attempt to ease the transition from `v1.*.*` to `v2.*.*`.

**Note** usage of `getVal` is not required by any means, and [lodash's `get`](https://lodash.com/docs/4.17.4#get) can just as easily be used if dot notation is preferred.

```js
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, getVal } from 'react-redux-firebase'

const enhance = compose(
  firebaseConnect(['/todos/user1']),
  connect(({ firebase }) => ({
    // this.props.todos loaded from state.firebase.data.todos
    todos: getVal(firebase, 'data/todos/user1', defaultValue)
  })
)
```

### Routing {#routing}

Routing logic, including HOCs made with `redux-auth-wrapper` must be updated. The update can be shown with `redux-auth-wrapper` v1 HOCs as an example:

**`v1.*.*`**

```javascript
import { browserHistory } from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { pathToJS } from 'react-redux-firebase'

export const UserIsAuthenticated = UserAuthWrapper({
  wrapperDisplayName: 'UserIsAuthenticated',
  authSelector: ({ firebase }) => pathToJS(firebase, 'auth'),
  authenticatingSelector: ({ firebase }) =>
    pathToJS(firebase, 'isInitializing') === true ||
    pathToJS(firebase, 'auth') === undefined,
  predicate: auth => auth !== null,
  redirectAction: (newLoc) => (dispatch) => {
    browserHistory.replace(newLoc)
    // routerActions.replace // if using react-router-redux
    dispatch({
      type: 'UNAUTHED_REDIRECT',
      payload: { message: 'You must be authenticated.' },
    })
  },
})
```

**`v2.*.*`**

```javascript
import { browserHistory } from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'

export const UserIsAuthenticated = UserAuthWrapper({
  wrapperDisplayName: 'UserIsAuthenticated',
  authSelector: ({ firebase: { auth } }) => auth,
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  predicate: auth => !auth.isEmpty,
  redirectAction: (newLoc) => (dispatch) => {
    browserHistory.replace(newLoc)
    // routerActions.replace // if using react-router-redux
    dispatch({
      type: 'UNAUTHED_REDIRECT',
      payload: { message: 'You must be authenticated.' },
    })
  },
})
```

See [the routing recipes](/docs/recipes/routing) for more details and examples with `redux-auth-wrapper@v2.*.*`.

### Use Firestore {#firestore}

If you would like to instantiate a Firebase instance outside of `react-redux-firebase`, you can pass it in as the first argument like so:

**`v1.*.*`**

v1 does not support Firestore usage

**`v2.*.*`**


1. Install `redux-firestore` using `npm i --save redux-firestore`
1. Include firestore initialization and pass the `reduxFirestore` store enhancer like so:

  ```js
  import { createStore, combineReducers, compose } from 'redux'
  import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
  import { reduxFirestore, firestoreReducer } from 'redux-firestore'
  import firebase from 'firebase'
  import 'firebase/firestore' // <- needed if using firestore

  const fbConfig = {} // object containing Firebase config
  const rrfConfig = { userProfile: 'users' } // react-redux-firebase config

  // initialize firebase instance
  firebase.initializeApp(config) // <- new to v2.*.*
  firebase.firestore() // <- needed if using firestore

  // Add Firebase to reducers
  const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
  })

  const store = createStore(
   rootReducer,
   initialState,
   compose(
     reactReduxFirebase(firebase, rrfConfig), // pass in firebase instance instead of config
     reduxFirestore(firebase) // <- needed if using firestore
    //  applyMiddleware(...middleware) // to add other middleware
   )
  )
  ```

For examples of usage, please visit the [Firestore section](/docs/firestore)

### Population

**`v1.*.*`**

```js
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  populatedDataToJS,
  pathToJS
} from 'react-redux-firebase';

const populates = [{ child: 'owner', root: 'users' }]

const enhance = compose(
  firebaseConnect([
    { path: '/todos', populates }
    // '/todos#populate=owner:displayNames', // equivalent string notation
  ]),
  connect(
    ({ firebase }) => ({
      todos: populatedDataToJS(firebase, 'todos', populates),
      auth: pathToJS(firebase, 'auth')
    })
  )
)

export default enhance(SomeComponent)
```

**`v2.*.*`**

```js
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, populate } from 'react-redux-firebase'

const populates = [{ child: 'owner', root: 'users' }]

const enhance = compose(
  firebaseConnect([
    { path: 'todos', populates }
    // '/todos#populate=owner:users', // equivalent string notation
  ]),
  connect(
    ({ firebase }) => ({
      todos: populate(firebase, 'todos', populates),
    })
  )
)
export default enhance(SomeComponent)
```

### State Based Queries {#stateBasedQueries}

`store` is now the second argument instead of `firebaseInstance` (`store.firebase`). That means that anything in state can be accessed using `store.getState`. This can help simplify state based queries:

**`v1.*.*`**

```js
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  populatedDataToJS,
  pathToJS
} from 'react-redux-firebase';

const populates = [{ child: 'owner', root: 'users' }]

const enhance = compose(
  connect(
    (state) => ({
      auth: pathToJS(state.firebase, 'auth')
    })
  )
  firebaseConnect(
    (props, firebaseInstance) => [
      { path: `todos/${props.auth.uid}` }
    ]
  ),
  connect(
    (state, props) => ({
      todos: dataToJS(state.firebase, `todos/${props.auth.uid}`)
    })
  )
)
```

**`v2.*.*`**


```js
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase';

const enhance = compose(
  firebaseConnect(
    (props, store) => [
      { path: `todos/${store.getState().firebase.auth.uid}` }
    ]
  ),
  connect(
    ({ firebase: { data, auth } }) => ({
      todos: data.todos && data.todos[auth.uid]
    })
  )
)
```

### Empty Auth {#emptyAuth}

`enableEmptyAuthChanges`, which was created for [#137](https://github.com/prescottprue/react-redux-firebase/issues/137) no longer exists. It has been replaced by `preserveOnEmptyAuthChange` so that an action is still dispatched, and configuration can control what is preserved:

**`v1.*.*`**

```js
const config = {
  userProfile: 'users'
  enableEmptyAuthChanges: false // disable all empty auth changes (no action dispatch)
}
```

**`v2.*.*`**

```js
const config = {
  userProfile: 'users'
  preserveOnEmptyAuthChange: { // action still dispatched
    profile: ['displayName'] // preserve just firebase.profile.displayName
  }
}
```

### Integrations

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
