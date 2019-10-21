# Firestore

The Firestore integration is build on [`redux-firestore`](https://github.com/prescottprue/redux-firestore). Auth, Storage, and RTDB interactions still go on within `react-redux-firebase`, while `redux-firestore` handles attaching listeners and updating state for Firestore.

To begin using Firestore with `react-redux-firebase`, make sure you have the following:
* `v2.0.0` or higher of `react-redux-firebase`
* Install `redux-firestore` in your project using `npm i --save redux-firestore@latest`
* `firestore` imported with `import 'firebase/firestore'`
* `firestore` initialize with `firebase.firestore()`
* `ReactReduxFirebaseProvider` or `ReduxFirestoreProvider` used to make instance available to HOCs
* `firestoreReducer` added to your reducers

Should look something similar to:

```js
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
import { createStore, combineReducers, compose } from 'redux'
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

const firebaseConfig = {}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

// Setup react-redux so that connect HOC can be used
function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Todos />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

render(<App/>, document.getElementById('root'));
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

* [Automatically with Hook](#useFirestoreConnect) - Using `useFirestoreConnect` hook (manages mounting/unmounting)
* [Automatically with HOC](#firestoreConnect) - Using `firestoreConnect` HOC (manages mounting/unmounting)
* [Manually](#manual) - Using `get`, or by setting listeners with `setListeners`/`setListener` (requires managing of listeners)

### Automatically with Hook {#useFirestoreConnect}

`useFirestoreConnect` is a React hook that manages attaching and detaching listeners for you as the component mounts and unmounts.

#### Examples
1. Basic query that will attach/detach as the component passed mounts/unmounts. In this case we are setting a listener for the `'todos'` collection:

  ```js
  import React from 'react'
  import { useSelector } from 'react-redux'
  import { useFirestoreConnect } from 'react-redux-firebase'

  export default function SomeComponent() {
    useFirestoreConnect([
      { collection: 'todos' } // or 'todos'
    ])
    const todos = useSelector(state => state.firestore.ordered.todos)
  }
  ```

2. Props can be used as part of queries. In this case we will get a specific todo:

  ```js
  import React from 'react'
  import { useSelector } from 'react-redux'
  import { useFirestoreConnect } from 'react-redux-firebase'

  export default function SomeComponent({ todoId }) {
    useFirestoreConnect(() => [
      { collection: 'todos', doc: todoId } // or `todos/${props.todoId}`
    ])
    const todos = useSelector(({ firestore: { ordered } }) => ordered.todos && ordered.todos[todoId])
  }
  ```

### Automatically with HOC {#firestoreConnect}

`firestoreConnect` is a React Higher Order component that manages attaching and detaching listeners for you as the component mounts and unmounts. It is possible to roll a similar solution yourself, but can get complex when dealing with advanced situations (queries based on props, props changing, etc.)

#### Examples
1. Basic query that will attach/detach as the component passed mounts/unmounts. In this case we are setting a listener for the `'todos'` collection:

  ```js
  import { compose } from 'redux'
  import { connect } from 'react-redux'
  import { firestoreConnect } from 'react-redux-firebase'

  export default compose(
    firestoreConnect(() => ['todos']), // or { collection: 'todos' }
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
    connect(({ firestore: { data } }, props) => ({
      todos: data.todos && data.todos[todoId]
    }))
  )(SomeComponent)
  ```

## Manual {#manual}

If you want to trigger a query based on a click or mange listeners yourself, you can use `setListener` or `setListeners`. When doing this, make sure you call `unsetListener` for each listener you set.

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

  componentDidUnmount() {
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
