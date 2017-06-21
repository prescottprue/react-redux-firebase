# Getting Started

## Before Use

## Install
```bash
npm install --save react-redux-firebase
```

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
```json
{
    "plugins": ["transform-decorators-legacy"]
}
```


## Install
```bash
npm install --save react-redux-firebase
```

## Add Reducer

Include `firebase` in your combine reducers function:


```js
import { combineReducers } from 'redux'
import { firebaseStateReducer } from 'react-redux-firebase'

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseStateReducer
})
```

## Compose Function

```js
import { compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'

// Firebase config
const firebaseConfig = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: '<your-storage-bucket>'
}
// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
}

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig, config)
)(createStore)

// Create store with reducers and initial state
const store = createStoreWithFirebase(rootReducer, initialState)
```

View the [config section](/config.html) for full list of configuration options.

## Use in Components

```javascript
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty, dataToJS } from 'react-redux-firebase'

@firebaseConnect([
  'todos' // corresponds to 'todos' root on firebase
])
@connect(
  ({ firebase: { data: { todos } } }) => ({ // state.firebase.data.todos
    // todos prop set to firebase data in redux under '/todos'
    todos,
  })
)
export default class Todos extends Component {
  static propTypes = {
    todos: PropTypes.object,
    firebase: PropTypes.object
  }

  handleAdd = () => {
    const {newTodo} = this.refs
    const { firebase } = this.props
    // Add a new todo to firebase
    firebase.push('/todos', { text: newTodo.value, done: false })
    newTodo.value = ''
  }

  render() {
    const { todos } = this.props;

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
}
```

Alternatively, if you choose not to use decorators, your connect function will look like so:

```javascript
const wrappedTodos = firebaseConnect([
  '/todos'
])(Todos)

export default connect(
  ({firebase}) => ({
    todos: dataToJS(firebase, 'todos'),
  })
)(wrappedTodos)

```
