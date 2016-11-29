# react-redux-firebase

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Coverage][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]
[![Gitter][gitter-image]][gitter-url]

> Redux bindings for Firebase. Includes Higher Order Component (HOC) for use with React.

## Demo

View deployed version of [Material Example](https://github.com/prescottprue/react-redux-firebase/tree/master/examples/complete/material) [here](https://redux-firebasev3.firebaseapp.com/)


## Features
- Integrated into redux
- Support for updating and nested props
- [Population capability](https://prescottprue.gitbooks.io/react-redux-firebase/content/populate.html) (similar to mongoose's `populate` or SQL's `JOIN`)
- Out of the box support for authentication (with auto load user profile)
- Firebase Storage Support
- Support small data ( using `value` ) or large datasets ( using `child_added`, `child_removed`, `child_changed` )
- queries support ( `orderByChild`, `orderByKey`, `orderByValue`, `orderByPriority`, `limitToLast`, `limitToFirst`, `startAt`, `endAt`, `equalTo` right now )
- Automatic binding/unbinding
- Declarative decorator syntax for React components
- [`redux-thunk`](https://github.com/gaearon/redux-thunk) and [`redux-observable`](https://redux-observable.js.org/) integrations
- Action Types and other Constants exported for external use (such as in `redux-observable`)
- Firebase v3+ support

## Install
```bash
npm install --save react-redux-firebase
```

## Before Use

### Peer Dependencies

Install peer dependencies: `npm i --save redux react-redux`

### Decorators

Though they are optional, it is highly recommended that you used decorators with this library. [The Simple Example](examples/simple) shows implementation without decorators, while [the Decorators Example](examples/decorators) shows the same application with decorators implemented.

A side by side comparison using [react-redux](https://github.com/reactjs/react-redux)'s `connect` function/HOC is the best way to illustrate the difference:

```javascript
class SomeComponent extends Component {

}
export default connect()(SomeComponent)
```
vs.

```javascript
@connect()
export default class SomeComponent extends Component {

}
```

In order to enable this functionality, you will most likely need to install a plugin (depending on your build setup). For Webpack and Babel, you will need to make sure you have installed and enabled  [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) by doing the following:

1. run `npm i --save-dev babel-plugin-transform-decorators-legacy`
2. Add the following line to your `.babelrc`:
```
{
    "plugins": ["transform-decorators-legacy"]
}
```

## Use

Include reduxFirebase in your store compose function:


```javascript
import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase'

// Add Firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseStateReducer
})

// Firebase config
const config = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: '<your-storage-bucket>'
}

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(config, { userProfile: 'users' }),
)(createStore)

// Create store with reducers and initial state
const store = createStoreWithFirebase(rootReducer, initialState)
```

In components:
```javascript
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { firebaseConnect, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty, dataToJS } = helpers

@firebaseConnect( [
  '/todos'
  // { type: 'once', path: '/todos' } // for loading once instead of binding
])
@connect(
  ({ firebase }) => ({
    // Connect todos prop to firebase todos
    todos: dataToJS(firebase, '/todos'),
  })
)
class Todos extends Component {
  static propTypes = {
    todos: PropTypes.object,
    firebase: PropTypes.object
  }

  render() {
    const { firebase, todos } = this.props;

    // Add a new todo to firebase
    const handleAdd = () => {
      const {newTodo} = this.refs
      firebase.push('/todos', { text:newTodo.value, done:false })
      newTodo.value = ''
    }

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
        <button onClick={handleAdd}>
          Add
        </button>
      </div>
    )
  }
}
export default Todos
```

Alternatively, if you choose not to use decorators:

```javascript

const wrappedTodos = firebaseConnect([
  '/todos'
])(Todos)
export default connect(
  ({firebase}) => ({
    todos: dataToJS(firebase, '/todos'),
  })
)(wrappedTodos)

```

## [API](https://prescottprue.gitbooks.io/react-redux-firebase/content/)
See [API Docs](https://prescottprue.gitbooks.io/react-redux-firebase/content/)

## [Examples](examples)

Examples folder is broken into two categories [complete](https://github.com/prescottprue/react-redux-firebase/tree/master/examples/complete) and [snippets](https://github.com/prescottprue/react-redux-firebase/tree/master/examples/snippets). Complete contains full applications that can be run as is, where as snippets is small amounts of code to show functionality (dev tools and deps not included).

#### [State Based Query Snippet](examples/snippets/stateBasedQuery)

Snippet showing querying based on data in redux state. One of the most common examples of this is querying based on the current users auth UID.

#### [Decorators Snippet](examples/snippets/decorators)

Snippet showing how to use decorators to simplify connect functions (redux's `connect` and react-redux-firebase's `firebaseConnect`)

#### [Simple App Example](examples/complete/simple)

A simple example that was created using [create-react-app](https://github.com/facebookincubator/create-react-app)'s. Shows a list of todo items and allows you to add to them.

#### [Material App Example](examples/complete/material)

An example that user Material UI built on top of the output of [create-react-app](https://github.com/facebookincubator/create-react-app)'s eject command.  Shows a list of todo items and allows you to add to them. This is what is deployed to [react-redux-firebase.firebaseapp.com](https://react-redux-firebase.firebaseapp.com/).

## Using with `redux-thunk`
If you are using `redux-thunk`, make sure to set up your thunk middleware using it's redux-thunk's `withExtraArgument` method so that firebase is available within your actions. Here is an example `createStore` function that adds `getFirebase` as third argument along with a thunk that uses it:

createStore:

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
Action:

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

## Using with `redux-observable`
If you are using `redux-observable`, make sure to set up your redux-observable middleware so that firebase is available within your epics. Here is an example `combineEpics` function that adds `getFirebase` as third argument along with an epic that uses it:

```javascript
import { getFirebase } from 'react-redux-firebase'
import { combineEpics } from 'redux-observable'

const rootEpic = (...args) =>
  combineEpics(somethingEpic, epic2)(..args, getFirebase)

// then later in your epics
const somethingEpic = (action$, store, getFirebase) =>
  action$.ofType(SOMETHING)
    .map(() =>
      getFirebase().push('somePath/onFirebase', { some: 'data' })
    )
```

## Generator

[generator-react-firebase](https://github.com/prescottprue/generator-react-firebase) uses react-redux-firebase when opting to include redux

## FAQ

1. How is this different than [`redux-react-firebase`](https://github.com/tiberiuc/redux-react-firebase)?

  This library was actually originally forked from redux-react-firebase, but adds extended functionality such as:
  * [populate functionality](https://prescottprue.gitbooks.io/react-redux-firebase/content/populate.html) (similar to mongoDB or SQL JOIN)
  * [`profileDecorator`](https://prescottprue.gitbooks.io/react-redux-firebase/content/config.html) - change format of profile stored on Firebase
  * [`getFirebase`](https://prescottprue.gitbooks.io/react-redux-firebase/content/thunks.html) - access to firebase instance that fires actions when methods are called
  * [integrations](https://prescottprue.gitbooks.io/react-redux-firebase/content/thunks.html) for [`redux-thunk`](https://github.com/gaearon/redux-thunk) and [`redux-observable`](https://redux-observable.js.org) - using `getFirebase`
  * [access to firebase's `storage`](https://prescottprue.gitbooks.io/react-redux-firebase/content/storage.html) method`
  * `uniqueSet` method helper for only setting if location doesn't already exist
  * Object or String notation for paths (`[{ path: '/todos' }]` equivalent to `['/todos']`)
  * Action Types and other Constants are exposed for external usage (such as `redux-observable`)

  #### Well why not combine?
  I have been talking to the author of [redux-react-firebase]() about combining, but we are not sure that the users of both want that at this point. Join us on [the redux-firebase gitter](https://gitter.im/redux-firebase/Lobby) if you haven't already since a ton of this type of discussion goes on there.

  **Bottom line:** The author of redux-react-firebase was absent when functionality was needed by me and others, so this library was created.

2. Why use redux if I have Firebase to store state?

  This isn't a super quick answer, so I wrote up [a medium article to explain](https://medium.com/@prescottprue/firebase-with-redux-82d04f8675b9)

## Contributors
- [Prescott Prue](https://github.com/prescottprue)
- [Tiberiu Craciun](https://github.com/tiberiuc)
- [Bojhan](https://github.com/Bojhan)
- [Rahav Lussto](https://github.com/RahavLussato)
- [Justin Handley](https://github.com/justinhandley)

## Thanks

Special thanks to [Tiberiu Craciun](https://github.com/tiberiuc) for creating [redux-react-firebase](https://github.com/tiberiuc/redux-react-firebase), which this project was originally based on.

[npm-image]: https://img.shields.io/npm/v/react-redux-firebase.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-redux-firebase
[npm-downloads-image]: https://img.shields.io/npm/dm/react-redux-firebase.svg?style=flat-square
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
