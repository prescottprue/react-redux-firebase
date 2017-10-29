# react-redux-firebase

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Quality][quality-image]][quality-url]
[![Code Coverage][coverage-image]][coverage-url]
[![Code Style][code-style-image]][code-style-url]
[![License][license-image]][license-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]

[![Gitter][gitter-image]][gitter-url]


> Redux bindings for Firebase. Includes Higher Order Component (HOC) for use with React.

## [Demo](https://demo.react-redux-firebase.com)

The [Material Example](https://github.com/prescottprue/react-redux-firebase/tree/master/examples/complete/material) is deployed to [demo.react-redux-firebase.com](https://demo.react-redux-firebase.com).

## Features
- Support for updating and nested props
- [Population capability](http://react-redux-firebase.com/docs/populate) (similar to mongoose's `populate` or SQL's `JOIN`)
- Out of the box support for authentication (with auto load user profile)
- Firebase Database, Firestore, Auth, Storage, and Messaging Support
- Support small data ( using `value` ) or large datasets ( using `child_added`, `child_removed`, `child_changed` )
- queries including `orderByChild`, `orderByKey`, `orderByValue`, `orderByPriority`, `limitToLast`, `limitToFirst`, `startAt`, `endAt`, `equalTo`
- Automatic binding/unbinding through `firestoreConnect` (manual through `watchEvent`)
- Declarative decorator syntax for React components
- Tons of integrations including [`redux-thunk`](https://github.com/gaearon/redux-thunk) and [`redux-observable`](https://redux-observable.js.org/)
- Action Types and other Constants exported for external use (such as in `redux-observable`)
- Firebase v3+ support
- Server Side Rendering Support
- [`react-native` support](/docs/recipes/react-native.md) using [native modules](http://docs.react-redux-firebase.com/history/v2.0.0/docs/recipes/react-native.html#native-modules) or [web sdk](/docs/recipes/react-native.md#jsweb)

## Install

```bash
npm install --save react-redux-firebase@next
```

## Use

Include `reactReduxFirebase` in your store compose function and  `firebaseReducer` in your reducers:

```javascript
import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase'
// import 'firebase/firestore' // <- needed if using firestore

const firebaseConfig = {}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// initialize firebase instance
firebase.initializeApp(config) // <- new to v2.*.*

// initialize firestore
// firebase.firestore() // <- needed if using firestore

// Add reduxReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  // reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

// Add Firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  // firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)
```

In components:

**Add Data**

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import { withFirebase } from 'react-redux-firebase'

const Todos = ({ firebase }) => {
  const sampleTodo = { text: 'Sample', done: false }
  const pushSample = () => firebase.push('todos', sampleTodo)
  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todosList}
      </ul>
      <input type="text" ref="newTodo" />
      <button onClick={pushSample}>
        Add
      </button>
    </div>
  )
}

export default withFirebase(Todos)
// or firebaseConnect()(Todos) if attaching listeners
```

**Load Data (listeners managed on mount/unmount)**

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

const Todos = ({ todos, firebase }) => {
  // Build Todos list if todos exist and are loaded
  const todosList = !isLoaded(todos)
    ? 'Loading'
    : isEmpty(todos)
      ? 'Todo list is empty'
      : Object.keys(todos).map(
          (key, id) => (
            <TodoItem key={key} id={id} todo={todos[key]}/>
          )
        )
  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todosList}
      </ul>
      <input type="text" ref="newTodo" />
      <button onClick={this.handleAdd}>
        Add
      </button>
    </div>
  )
}

export default compose(
  firebaseConnect([
    'todos' // { path: '/todos' } // object notation
  ]),
  connect(
    (state) => ({
      todos: state.firebase.data.todos,
      // profile: state.firebase.profile // load profile
    })
  )
)(Todos)
```

**Load Data On Click**

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

const Todos = ({ firebase }) => {
  // Build Todos list if todos exist and are loaded
  const todosList = !isLoaded(todos)
    ? 'Loading'
    : isEmpty(todos)
      ? 'Todo list is empty'
      : Object.keys(todos).map(
          (key, id) => <TodoItem key={key} id={id} todo={todos[key]}/>
        )
  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todosList}
      </ul>
      <button onClick={() => firebase.watchEvent('value', 'todos')}>
        Load Todos
      </button>
    </div>
  )
}

export default compose(
  withFirebase, // or firebaseConnect()
  connect(
    (state) => ({
      todos: state.firebase.data.todos,
      // profile: state.firebase.profile // load profile
    })
  )
)(Todos)
```

**Queries Based On State**
`Todos` component from above examples

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'

export default compose(
  firebaseConnect((props, store) => {
    const state = store.getState();
    // Get Todos stored by user UID
    return state.auth ? [`todos/${state.auth.uid}`] : []
  }),
  connect(
    (state) => ({
      todos: state.firebase.data.todos,
      // profile: state.firebase.profile // load profile
    })
  )
)(Todos)
```

## [Docs](http://react-redux-firebase.com)
See full documentation at [react-redux-firebase.com](http://react-redux-firebase.com)

* [Getting Started](http://react-redux-firebase.com/docs/getting_started)
* [Auth](http://react-redux-firebase.com/docs/auth)
* [Queries](http://react-redux-firebase.com/docs/queries)
* [Firestore](http://react-redux-firebase.com/docs/firestore)
* [Populate](http://react-redux-firebase.com/docs/populate)
* [API Reference](http://react-redux-firebase.com/docs/api)

## [Examples](examples)

Examples folder is broken into two categories [complete](https://github.com/prescottprue/react-redux-firebase/tree/master/examples/complete) and [snippets](https://github.com/prescottprue/react-redux-firebase/tree/master/examples/snippets). `/complete` contains full applications that can be run as is, while `/snippets` contains small amounts of code to show functionality (dev tools and deps not included).

#### [State Based Query Snippet](examples/snippets/stateBasedQuery)

Snippet showing querying based on data in redux state. One of the most common examples of this is querying based on the current users auth UID.

#### [Decorators Snippet](examples/snippets/decorators)

Snippet showing how to use decorators to simplify connect functions (redux's `connect` and react-redux-firebase's `firebaseConnect`)

#### [Simple App Example](examples/complete/simple)

A simple example that was created using [create-react-app](https://github.com/facebookincubator/create-react-app)'s. Shows a list of todo items and allows you to add to them.

#### [Material App Example](examples/complete/material)

An example that user Material UI built on top of the output of [create-react-app](https://github.com/facebookincubator/create-react-app)'s eject command.  Shows a list of todo items and allows you to add to them. This is what is deployed to [redux-firebasev3.firebaseapp.com](https://redux-firebasev3.firebaseapp.com/).

## Discussion

Join us on the [redux-firebase gitter](https://gitter.im/redux-firebase/Lobby).

## Integrations

View docs for recipes on integrations with:

* [redux-firestore](/docs/firestore.md)
* [redux-thunk](/docs/integrations/thunks.md)
* [redux-observable](/docs/integrations/epics.md)
* [redux-saga](/docs/integrations/redux-saga.md)
* [redux-form](/docs/integrations/redux-form.md)
* [redux-auth-wrapper](/docs/integrations/routing.md#advanced)
* [redux-persist](/docs/integrations/redux-persist.md) - [improved integration with `v2.0.0`](http://docs.react-redux-firebase.com/history/v2.0.0/docs/integrations/redux-persist.html)
* [react-native](/docs/integrations/react-native.md)
* [react-native-firebase](http://docs.react-redux-firebase.com/history/v2.0.0/docs/integrations/react-native.html#native-modules) - requires `v2.0.0`

## Starting A Project

### Generator

[generator-react-firebase](https://github.com/prescottprue/generator-react-firebase) is a yeoman generator uses react-redux-firebase when opting to include redux.

### Complete Examples

The [examples folder](/examples) contains full applications that can be copied/adapted and used as a new project.

### FAQ

Please visit the [FAQ section of the docs](http://docs.react-redux-firebase.com/history/v2.0.0/docs/FAQ.html)

## Contributors

This project exists thanks to all the people who contribute.

<a href="graphs/contributors"><img src="https://opencollective.com/react-redux-firebase/contributors.svg?width=890" /></a>

## Backers

Thank you to all our backers! 🙏

* [Reside Network Inc.](https://github.com/reside-eng)

[npm-image]: https://img.shields.io/npm/v/react-redux-firebase.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-redux-firebase
[npm-downloads-image]: https://img.shields.io/npm/dm/react-redux-firebase.svg?style=flat-square
[quality-image]: http://npm.packagequality.com/shield/react-redux-firebase.svg?style=flat-square
[quality-url]: https://packagequality.com/#?package=react-redux-firebase
[backers]:https://opencollective.com/react-redux-firebase/backers/badge.svg?style=flat-square&color=blue
[become-a-backer]:https://opencollective.com/react-redux-firebase#backer
[travis-image]: https://img.shields.io/travis/prescottprue/react-redux-firebase/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/prescottprue/react-redux-firebase
[daviddm-image]: https://img.shields.io/david/prescottprue/react-redux-firebase.svg?style=flat-square
[daviddm-url]: https://david-dm.org/prescottprue/react-redux-firebase
[climate-image]: https://img.shields.io/codeclimate/github/prescottprue/react-redux-firebase.svg?style=flat-square
[climate-url]: https://codeclimate.com/github/prescottprue/react-redux-firebase
[coverage-image]: https://img.shields.io/codecov/c/github/prescottprue/react-redux-firebase.svg?style=flat-square
[coverage-url]: https://codecov.io/gh/prescottprue/react-redux-firebase
[license-image]: https://img.shields.io/npm/l/react-redux-firebase.svg?style=flat-square
[license-url]: https://github.com/prescottprue/react-redux-firebase/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
[gitter-image]: https://img.shields.io/gitter/room/redux-firebase/gitter.svg?style=flat-square
[gitter-url]: https://gitter.im/redux-firebase/Lobby
