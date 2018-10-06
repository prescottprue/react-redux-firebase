# Firestore

The Firestore integration is build on [`redux-firestore`](https://github.com/prescottprue/redux-firestore). Auth, Storage, and RTDB interactions still go on within `react-redux-firebase`, while `redux-firestore` handles attaching listeners and updating state for Firestore.

To begin using Firestore with `react-redux-firebase`, make sure you have the following:
* `v2.0.0` or higher of `react-redux-firebase`
* Install `redux-firestore` in your project using `npm i --save redux-firestore@latest`
* `firestore` imported with `import 'firebase/firestore'`
* `firestore` initialize with `firebase.firestore()`
* `reduxFirestore` enhancer added to store creator
* `firestoreReducer` added to your reducers

Should look something similar to:

```js
import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // make sure you add this for firestore
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// initialize firebase instance with config from console
const firebaseConfig = {
  // your firebase config here
}

firebase.initializeApp(firebaseConfig)

// Initialize Firestore with timeshot settings
firebase.firestore().settings({ timestampsInSnapshots: true })

// Add BOTH store enhancers when making store creator
const createStoreWithFirebase = compose(
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, rrfConfig)
)(createStore)

// Add firebase and firestore to reducers
const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  firestore: firestoreReducer
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)
```

## Profile

If you would like to have your users profiles go to Firestore instead of Real Time Database, you can enable the
`useFirestoreForProfile` option when making store creator like so:

```js
// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}
```

## Queries

Firestore queries can be created in two ways:

* [Automatically](#firestoreConnect) - Using `firestoreConnect` HOC (manages mounting/unmounting)
* [Manually](#manual) - Using `get`, or by setting listeners with `setListeners`/`setListener` (requires managing of listeners)

### Automatic {#firestoreConnect}

`firestoreConnect` is a React Higher Order component that manages attaching and detaching listeners for you as the component mounts and unmounts. It is possible to roll a similar solution yourself, but can get complex when dealing with advanced situations (queries based on props, props changing, etc.)

#### Examples
1. Basic query that will attach/detach as the component passed mounts/unmounts. In this case we are setting a listener for the `'todos'` collection:

  ```js
  import { compose } from 'redux'
  import { connect } from 'react-redux'
  import { firestoreConnect } from 'react-redux-firebase'

  export default compose(
    firestoreConnect(['todos']), // or { collection: 'todos' }
    connect((state, props) => ({
      todos: state.firestore.ordered.todos
    }))
  )(SomeComponent)
  ```

2. Create a query based on props by passing a function. In this case we will get a specific todo:

  ```js
  import { compose } from 'redux'
  import { connect } from 'react-redux'
  import { firestoreConnect } from 'react-redux-firebase'

  export default compose(
    firestoreConnect((props) => [
      { collection: 'todos', doc: props.todoId } // or `todos/${props.todoId}`
    ]),
    connect(({ firestore: { ordered } }, props) => ({
      todos: ordered.todos && ordered.todos[todoId]
    }))
  )(SomeComponent)
  ```

## Manual {#manual}

If you want to trigger a query based on a click or mange listeners yourself, you can use `setListener` or `setListeners`. When doing this, make sure you call `unsetLister` for each listener you set.

##### Component Class

```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Todos extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentDidMount () {
    const { firebase } = this.context.store
    firebase.setListener('todos')
    // firebase.setListener({ collection: 'todos' }) // or object notation
  }

  componentWillUnmount() {
    const { firebase } = this.context.store
    firebase.unsetListener('todos')
    // firebase.unsetListener({ collection: 'todos' }) // or object notation
  }

  render () {
    return (
      <div>
        {
          todos.map(todo => (
            <div key={todo.id}>
              {JSON.stringify(todo)}
            </div>
          ))
        }
      </div>
    )
  }
}

export default connect((state) => ({
  todos: state.firestore.ordered.todos
}))(Todos)
```

##### Functional Components

It is common to make react components "stateless" meaning that the component is just a function.

```js
import { compose } from 'redux'
import { withFirestore, isLoaded, isEmpty } from 'react-redux-firebase'

const Todos = ({ firestore, todos }) => (
  <div>
    <button onClick={() => firestore.get('todos')}>Get Todos</button>
    {
      !isLoaded(todos)
        ? 'Loading'
        : isEmpty(todos)
          ? 'Todo list is empty'
          : todos.map((todo) =>
              <TodoItem key={todo.id} todo={todo} />
            )
    }
  <div>
)

export default compose(
  withFirestore,
  connect((state) => ({
    todos: state.firestore.ordered.todos
  }))
)(Todos)
```

This can be useful, but then can limit usage of lifecycle hooks and other features of Component Classes.


[`recompose` helps solve this](https://github.com/acdlite/recompose/blob/master/docs/API.md) by providing Higher Order Component functions such as `lifecycle`, and `withHandlers`.

```js
import { connect } from 'react-redux'
import { withFirestore } from 'react-redux-firebase'
import { compose, withHandlers, lifecycle } from 'recompose'

const enhance = compose(
  withFirestore, // add firestore to props
  withHandlers({
    loadData: props => path => props.firestore.get(path)
  }),
  lifecycle({
    componentDidMount() {
      this.props.loadData('todos')
      // this.props.firestore.get('todos') // equivalent without withHandlers
    }
  }),
  connect((state) => ({
    todos: state.firestore.ordered.todos,
  }))
)

export default enhance(SomeComponent)
```


For more information [on using recompose visit the docs](https://github.com/acdlite/recompose/blob/master/docs/API.md)

### storeAs {#storeAs}

By default the results of queries are stored in redux under the path of the query. If you would like to change where the query results are stored in redux, use `storeAs`.

#### Examples
1. Querying the same path with different query parameters

```js
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
const myProjectsReduxName = 'myProjects'

compose(
  firestoreConnect(props => [
    { collection: 'projects' },
    {
      collection: 'projects',
      where: [
        ['uid', '==', '123']
      ],
      storeAs: myProjectsReduxName
    }
  ]),
  connect((state, props) => ({
    projects: state.firestore.data.projects,
    myProjects: state.firestore.data[myProjectsReduxName], // use storeAs path to gather from redux
  }))
)
```

## Populate {#populate}

Populate is not yet supported for the Firestore integration, but will be coming soon. Progress can be tracked [within issue #48](https://github.com/prescottprue/redux-firestore/issues/48).
