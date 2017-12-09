# react-redux-firebase

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Quality][quality-image]][quality-url]
[![Code Coverage][coverage-image]][coverage-url]
[![Code Style][code-style-image]][code-style-url]
[![License][license-image]][license-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Backers on Open Collective][backers]](#backers)

[![Gitter][gitter-image]][gitter-url]


> Redux bindings for Firebase. Includes Higher Order Component (HOC) for use with React.

## [Demo](https://demo.react-redux-firebase.com)

The [Material Example](https://github.com/prescottprue/react-redux-firebase/tree/master/examples/complete/material) is deployed to [demo.react-redux-firebase.com](https://demo.react-redux-firebase.com).

## Features
- Integrated into redux
- Out of the box support for authentication (with auto load user profile)
- Full Firebase Platform Support Including Real Time Database, Firestore, and Storage
- Automatic binding/unbinding of listeners using `firebaseConnect` Higher Order Component
- [Population capability](http://react-redux-firebase.com/docs/populate) (similar to mongoose's `populate` or SQL's `JOIN`)
- Support small data ( using `value` ) or large datasets ( using `child_added`, `child_removed`, `child_changed` )
- queries support ( `orderByChild`, `orderByKey`, `orderByValue`, `orderByPriority`, `limitToLast`, `limitToFirst`, `startAt`, `endAt`, `equalTo` right now )
- Tons of examples of integrations including [`redux-thunk`](https://github.com/gaearon/redux-thunk) and [`redux-observable`](https://redux-observable.js.org/)
- Server Side Rendering Support
- [`react-native` support](/docs/recipes/react-native.md) using [native modules](http://docs.react-redux-firebase.com/history/v2.0.0/docs/recipes/react-native.html#native-modules) or [web sdk](/docs/recipes/react-native.md#jsweb)

## Install

```bash
npm install --save react-redux-firebase
```

#### Other Versions

The above install command will install the `@latest` tag. You may also use the following tags when installing to get different versions:

* `@next` - Most possible up to date code. Currently, points to active progress with `v2.0.0-*` pre-releases. *Warning:* Syntax is different than current stable version.

Be aware of changes when using a version that is not tagged `@latest`. Please report any issues you encounter, and try to keep an eye on the [releases page](https://github.com/prescottprue/react-redux-firebase/releases) for updates.

**Current Progress**
Pending a few more small things v2.0.0 is now ready for the release Candidate stage (PRs in the coming days)! That means that in intended target for v2.0.0 to reach `@latest` before the end of the year!

## Use

**Note:** If you are just starting a new project, you may want to use [`v2.0.0`](http://docs.react-redux-firebase.com/history/v2.0.0/#use) since it has an even easier syntax. For clarity on the transition, view the [`v1` -> `v2` migration guide](http://docs.react-redux-firebase.com/history/v2.0.0/docs/v2-migration-guide.html)

Include `reactReduxFirebase` in your store compose function and  `firebaseStateReducer` in your reducers:

```javascript
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase'
import Todos from './Todos' // find code below

const firebaseConfig = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: '<your-storage-bucket>'
}

const reduxFirebaseConfig = { userProfile: 'users' }

// Add reactReduxFirebase store enhancer
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig, reduxFirebaseConfig),
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseStateReducer
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

Todos component (`./Todos`):

```javascript
import React from 'react'
import PropTypes from 'prop-types' // can also come from react if react <= 15.4.0
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty, toJS } from 'react-redux-firebase'

const Todos = ({ todos }) => (
  <div>
    <h1>Todos</h1>
    <ul>
      {
        !isLoaded(todos)
          ? 'Loading'
          : isEmpty(todos)
            ? 'Todo list is empty'
            : toJS(todos).map(
                (key, id) => (
                  <TodoItem key={key} id={id} todo={todos[key]}/>
                )
              )
      }
    </ul>
  </div>
)

Todos.propTypes = {
  todos: PropTypes.object,
  firebase: PropTypes.object // comes from firebaseConnect
}

export default compose(
  firebaseConnect([
    'todos' // { path: 'todos' } // object notation
  ]),
  connect((state) => ({
    todos: state.firebase.getIn(['todos']), // in v2 todos: state.firebase.data.todos
  }))
)(Todos)
```

Alternatively, if you choose to use decorators:

```javascript
@firebaseConnect([
  'todos' // { path: 'todos' } // object notation
])
@connect(
  ({ firebase }) => ({
    todos: state.firebase.getIn(['todos']) // in v2 todos: firebase.data.todos
  })
)
export default class Todos extends Component {
}
```

## [Docs](http://react-redux-firebase.com)
See full documentation at [react-redux-firebase.com](http://react-redux-firebase.com)

* [Getting Started](http://react-redux-firebase.com/docs/getting_started)
* [Auth](http://react-redux-firebase.com/docs/auth)
* [Queries](http://react-redux-firebase.com/docs/queries)
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

* [redux-thunk](/docs/recipes/thunks.md)
* [redux-observable](/docs/recipes/epics.md)
* [redux-saga](/docs/recipes/redux-saga.md)
* [redux-form](/docs/recipes/redux-form.md)
* [redux-auth-wrapper](/docs/recipes/routing.md#advanced)
* [redux-persist](/docs/recipes/redux-persist.md) - [improved integration with `v2.0.0`](http://docs.react-redux-firebase.com/history/v2.0.0/docs/recipes/redux-persist.html)
* [react-native](/docs/recipes/react-native.md)
* [react-native-firebase](http://docs.react-redux-firebase.com/history/v2.0.0/docs/recipes/react-native.html#native-modules) - requires `v2.0.0`

## Firestore

If you plan to use Firestore, you should checkout [`redux-firestore`][redux-firestore]. It integrates nicely with `react-redux-firebase` (v2 only) and it allows you to run Real Time Database and Firestore along side each other.

`react-redux-firebase` provides the `firestoreConnect` HOC (similar to `firebaseConnect`) for easy setting/unsetting of listeners.

Currently `react-redux-firebase` still handles auth when using [`redux-firestore`][redux-firestore] - The future plan is to also have auth standalone auth library that will allow the developer to choose which pieces they do/do not want.

## Starting A Project

### Generator

[generator-react-firebase](https://github.com/prescottprue/generator-react-firebase) is a yeoman generator uses react-redux-firebase when opting to include redux.

### Complete Examples

The [examples folder](/examples) contains full applications that can be copied/adapted and used as a new project.

## FAQ

1. How is this different than [`redux-react-firebase`](https://github.com/tiberiuc/redux-react-firebase)?

    This library was actually originally forked from redux-react-firebase, but adds extended functionality such as:
    * [populate functionality](http://react-redux-firebase.com/docs/populate) (similar to mongoose's `populate` or SQL's `JOIN`)
    * `react-native` support ([web/js](http://react-redux-firebase.com/docs/recipes/react-native.html) or native modules through [`react-native-firebase`](http://docs.react-redux-firebase.com/history/v2.0.0/docs/recipes/react-native.html#native-modules))
    * tons of [integrations](#integrations)
    * [`profileFactory`](http://react-redux-firebase.com/docs/config) - change format of profile stored on Firebase
    * [`getFirebase`](http://react-redux-firebase.com/docs/thunks) - access to firebase instance that fires actions when methods are called
    * [access to firebase's `storage`](http://react-redux-firebase.com/docs/storage) and `messaging` services
    * `uniqueSet` method helper for only setting if location doesn't already exist
    * Object or String notation for paths (`[{ path: '/todos' }]` equivalent to `['/todos']`)
    * Action Types and other Constants are exposed for external usage (such as with `redux-observable`)
    * Server Side Rendering Support
    * [Complete Firebase Auth Integration](http://react-redux-firebase.com/docs/auth.html#examples) including `signInWithRedirect` compatibility for OAuth Providers

    #### Well why not combine?
    I have been talking to the author of [redux-react-firebase](https://github.com/tiberiuc/redux-react-firebase) about combining, but we are not sure that the users of both want that at this point. Join us on the [redux-firebase gitter](https://gitter.im/redux-firebase/Lobby) if you haven't already since a ton of this type of discussion goes on there.

    #### What about [redux-firebase](https://github.com/colbyr/redux-firebase)?
    The author of [redux-firebase](https://github.com/colbyr/redux-firebase) has agreed to share the npm namespace! Currently the plan is to take the framework agnostic redux core logic of `react-redux-firebase` and [place it into `redux-firebase`](https://github.com/prescottprue/redux-firebase)). Eventually `react-redux-firebase` and potentially other framework libraries can depend on that core (the new `redux-firebase`).

2. Why use redux if I have Firebase to store state?

    This isn't a super quick answer, so I wrote up [a medium article to explain](https://medium.com/@prescottprue/firebase-with-redux-82d04f8675b9)

3. Where can I find some examples?

    * [Recipes Section](http://react-redux-firebase.com/docs/recipes/) of [the docs](http://react-redux-firebase.com/docs/recipes/)
    * [examples folder](/examples) contains [complete example apps](/examples/complete) as well as [useful snippets](/examples/snippets)

4. How does `connect` relate to `firebaseConnect`?

    ![data flow](/docs/static/dataFlow.png)

5. How do I help?

  * Join the conversion on [gitter][gitter-url]
  * Post Issues
  * Create Pull Requests

## Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/prescottprue/react-redux-firebase/graphs/contributors"><img src="https://opencollective.com/react-redux-firebase/contributors.svg?width=890" /></a>

## Backers

Thank you to all our backers! 🙏

* [Reside Network Inc.](https://github.com/reside-eng)

<a href="https://opencollective.com/react-redux-firebase#backers" target="_blank"><img src="https://opencollective.com/react-redux-firebase/backers.svg?width=890"></a>

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
