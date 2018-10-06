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
- Integrated into redux
- Out of the box support for authentication (with auto load user profile)
- Full Firebase Platform Support Including Real Time Database, Firestore, and Storage
- Automatic binding/unbinding of listeners through React Higher Order Components (`firebaseConnect`  and `firestoreConnect`)
- [Population capability](http://react-redux-firebase.com/docs/populate) (similar to mongoose's `populate` or SQL's `JOIN`)
- Support small data ( using `value` ) or large datasets ( using `child_added`, `child_removed`, `child_changed` )
- Multiple queries types supported including `orderByChild`, `orderByKey`, `orderByValue`, `orderByPriority`, `limitToLast`, `limitToFirst`, `startAt`, `endAt`, `equalTo`
- Tons of examples of integrations including [`redux-thunk`](https://github.com/gaearon/redux-thunk) and [`redux-observable`](https://redux-observable.js.org/)
- Server Side Rendering Support
- [`react-native` support](http://react-redux-firebase.com/docs/integrations/react-native.html) using [native modules](http://react-redux-firebase.com/docs/integrations/react-native.html#native-modules) or [web sdk](http://react-redux-firebase.com/docs/integrations/react-native.html#jsweb)

## Installation

```bash
npm install --save react-redux-firebase
```

This assumes you are using [npm](https://www.npmjs.com/) as your package manager.

If you're not, you can access the library on [unpkg](https://unpkg.com/redux-firestore@latest/dist/redux-firestore.min.js), download it, or point your package manager to it. Theres more on this in the [Builds section below](#builds).

## Use

Include `reactReduxFirebase` (store enhancer) and  `firebaseReducer` (reducer) while creating your redux store:

```javascript
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase'
// import { reduxFirestore, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
// import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable

const firebaseConfig = {}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)

// Initialize other services on firebase instance
// firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  // reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  // firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)

// Setup react-redux so that connect HOC can be used
const App = () => (
  <Provider store={store}>
    <Todos />
  </Provider>
);

render(<App/>, document.getElementById('root'));
```

The Firebase instance can then be grabbed from context within your components (`withFirebase` and `firebaseConnect` Higher Order Components provided to help):

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
// or firebaseConnect()(Todos)
```

**Load Data (listeners automatically managed on mount/unmount)**

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
  connect((state) => ({
    todos: state.firebase.data.todos,
    // profile: state.firebase.profile // load profile
  }))
)(Todos)
```

**Queries Based On Props**

It is common to make a detail page that loads a single item instead of a whole list of items. A query for a specific `Todos` can be created using

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, getVal } from 'react-redux-firebase'

// Component enhancer that loads todo into redux then into the todo prop
const enhance = compose(
  firebaseConnect((props) => {
    // Set listeners based on props (prop is route parameter from react-router in this case)
    return [
      { path: `todos/${props.params.todoId}` }, // create todo listener
      // `todos/${props.params.todoId}` // equivalent string notation
    ]
  }),
  connect(({ firebase }, props) => ({
    todo: getVal(firebase, `data/todos/${props.params.todoId}`), // lodash's get can also be used
  }))
)

const Todo = ({ todo, firebase, params }) =>
  <div>
    <input
      name="isDone"
      type="checkbox"
      checked={todo.isDone}
      onChange={() =>
        firebase.update(`todos/${params.todoId}`, { done: !todo.isDone })
      }
    />
    <span>{todo.label}</span>
  </div>

// Export enhanced component
export default enhance(Todo)
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

// Export enhanced component
export default compose(
  withFirebase, // or firebaseConnect()
  connect((state) => ({
    todos: state.firebase.data.todos,
    // profile: state.firebase.profile // load profile
  }))
)(Todos)
```

## Firestore

If you plan to use Firestore, you should checkout [`redux-firestore`][redux-firestore]. It integrates nicely with `react-redux-firebase` and it allows you to run Real Time Database and Firestore along side each other.

`react-redux-firebase` provides the `firestoreConnect` HOC (similar to `firebaseConnect`) for easy setting/unsetting of listeners.

Currently `react-redux-firebase` still handles auth when using [`redux-firestore`][redux-firestore] - The future plan is to also have auth standalone auth library that will allow the developer to choose which pieces they do/do not want.

## [Docs](http://react-redux-firebase.com)
See full documentation at [react-redux-firebase.com](http://react-redux-firebase.com)

* [Getting Started](http://react-redux-firebase.com/docs/getting_started)
* [Auth](http://react-redux-firebase.com/docs/auth)
* [Queries](http://react-redux-firebase.com/docs/queries)
* [Firestore](http://react-redux-firebase.com/docs/firestore)
* [Populate](http://react-redux-firebase.com/docs/populate)
* [API Reference](http://react-redux-firebase.com/docs/api)

## [Examples](examples)

### Real World Applications
* [fireadmin.io](http://fireadmin.io) - Firebase Instance Management Tool (source [available here](https://github.com/prescottprue/fireadmin))

If you would like a project added to this section please reach out [over gitter][gitter-url]

### [Examples Folder](examples)

Examples folder is broken into two categories [snippets](examples/snippets) and [complete](examples/complete). `/complete` contains full applications that can be run as is, where as `/snippets` contains small amounts of code to highlight specific functionality (dev tools and deps not included).

#### [State Based Query Snippet](examples/snippets/stateBasedQuery)

Snippet showing querying based on data in redux state. One of the more common examples is querying based on the current users auth UID.

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

* [redux-firestore](http://react-redux-firebase.com/docs/firestore.html)
* [redux-thunk](http://react-redux-firebase.com/docs/integrations/thunks.html)
* [redux-observable](http://react-redux-firebase.com/docs/integrations/redux-observable.html)
* [redux-saga](http://react-redux-firebase.com/docs/integrations/redux-saga.html)
* [redux-form](http://react-redux-firebase.com/docs/integrations/redux-form.html)
* [redux-auth-wrapper](http://react-redux-firebase.com/docs/recipes/routing.html#advanced)
* [redux-persist](http://react-redux-firebase.com/docs/integrations/redux-persist.html)
* [react-native](http://react-redux-firebase.com/docs/integrations/react-native.html)
* [react-native-firebase](http://react-redux-firebase.com/docs/integrations/react-native.html#native-modules)

## Starting A Project

### Generator

[generator-react-firebase](https://github.com/prescottprue/generator-react-firebase) is a yeoman generator uses react-redux-firebase when opting to include redux.

### Complete Examples

The [examples folder](/examples) contains full applications that can be copied/adapted and used as a new project.

## FAQ

Please visit the [FAQ section of the docs](http://docs.react-redux-firebase.com/history/v2.0.0/docs/FAQ.html)

## Builds

Most commonly people consume Redux Firestore as a [CommonJS module](http://webpack.github.io/docs/commonjs.html). This module is what you get when you import redux in a Webpack, Browserify, or a Node environment.

If you don't use a module bundler, it's also fine. The redux-firestore npm package includes precompiled production and development [UMD builds](https://github.com/umdjs/umd) in the [dist folder](https://unpkg.com/redux-firestore@latest/dist/). They can be used directly without a bundler and are thus compatible with many popular JavaScript module loaders and environments. For example, you can drop a UMD build as a `<script>` tag on the page. The UMD builds make Redux Firestore available as a `window.ReduxFirestore` global variable.

It can be imported like so:

```html
<script src="../node_modules/react-redux-firebase/dist/react-redux-firebase.min.js"></script>
<!-- or through cdn: <script src="https://unpkg.com/react-redux-firebase@latest/dist/react-redux-firebase.min.js"></script> -->
<script>console.log('react redux firebase:', window.ReactReduxFirebase)</script>
```

Note: In an effort to keep things simple, the wording from this explanation was modeled after [the installation section of the Redux Docs](https://redux.js.org/#installation).

## Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/prescottprue/react-redux-firebase/graphs/contributors"><img src="https://opencollective.com/react-redux-firebase/contributors.svg?width=890" /></a>

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
[redux-firestore]: https://github.com/prescottprue/redux-firestore
