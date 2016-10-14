# react-redux-firebase

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Coverage][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]
[![Gitter][gitter-image]][gitter-url]

> React bindings for Firebase and Redux Higher Order Component (HOC) for using Firebase with React and Redux

## Demo

View deployed version of Material Example [here](https://redux-firebasev3.firebaseapp.com/)


## Features
- Integrated into redux
- Population capability (similar to JOIN)
- Support small data ( using `value` ) or large datasets ( using `child_added`, `child_removed`, `child_changed` )
- queries support ( `orderByChild`, `orderByKey`, `orderByValue`, `orderByPriority`, `limitToLast`, `limitToFirst`, `startAt`, `endAt`, `equalTo` right now )
- Automatic binding/unbinding
- Declarative decorator syntax for React components
- Firebase v3+ support
- Support for updating and nested props
- Out of the box support for authentication (with auto load user profile)
- Lots of helper functions

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
import { reduxFirebase, firebaseStateReducer } from 'react-redux-firebase'

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
  reduxFirebase(config, { userProfile: 'users' }),
)(createStore)

// Create store with reducers and initial state
const store = createStoreWithFirebase(rootReducer, initialState)
```

In components:
```javascript
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty, dataToJS } = helpers

// Can be used if firebase is used elsewhere
// import { firebaseConnect } from 'react-redux-firebase'
// @firebaseConnect( [
//   '/todos'
// ])

@firebase( [
  '/todos'
  // { type: 'once', path: '/todos' } // for loading once instead of binding
])
@connect(
  ({firebase}) => ({
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

const wrappedTodos = firebase([
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

#### [Simple Example](examples/simple)

A simple example that was created using [create-react-app](https://github.com/facebookincubator/create-react-app)'s. Shows a list of todo items and allows you to add to them.

#### [Decorators Example](examples/decorators)

The simple example implemented using decorators built from the output of [create-react-app](https://github.com/facebookincubator/create-react-app)'s eject command. Shows a list of todo items and allows you to add to them.

#### [Material Example](examples/material)

An example that user Material UI built on top of the output of [create-react-app](https://github.com/facebookincubator/create-react-app)'s eject command.  Shows a list of todo items and allows you to add to them. This is what is deployed to [react-redux-firebase.firebaseapp.com](https://react-redux-firebase.firebaseapp.com/).


## Generator

[generator-react-firebase](https://github.com/prescottprue/generator-react-firebase) uses react-redux-firebase when opting to include redux


## In the future
- Redux Form Example
- More Unit Tests/Coverage
- Ideas are welcome :)

## Contributors
- [Prescott Prue](https://github.com/prescottprue)
- [Tiberiu Craciun](https://github.com/tiberiuc)
- [Bojhan](https://github.com/Bojhan)
- [Rahav Lussto](https://github.com/RahavLussato)
- [Justin Handley](https://github.com/justinhandley)

## Thanks

Special thanks to [Tiberiu Craciun](https://github.com/tiberiuc) for creating [redux-react-firebase](https://github.com/tiberiuc/redux-react-firebase), which this project is heavily based on.

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
[gitter-image]: https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat-square
[gitter-url]: https://gitter.im/prescottprue/react-redux-firebase
