# Firestore

Firestore queries can be created in two ways:

* Automatically - Using `firestoreConnect` HOC (manages mounting/unmounting)
* Manually - Using `setListeners` or `setListener` (requires managing of listeners)

## Automatic

`firestoreConnect` is a React Higher Order component that manages attaching and detaching listeners for you as the component mounts and unmounts. It is possible to roll a similar solution yourself, but can get complex when dealing with advanced situations (queries based on props, props changing, etc.)

## ordered {#ordered}

In order to get ordered data, use `orderedToJS`

#### Examples
1. Get the `'todos'` collection

```js
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

compose(
  firestoreConnect(['todos']), // or { collection: 'todos' }
  connect((state, props) => ({
    todos: state.firestore.ordered.todos
  }))
)(SomeComponent)
```

2. Create a query based on props to get a specific todo

```js
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

compose(
  firestoreConnect((props) => [
    { collection: 'todos', doc: props.todoId } // or `todos/${props.todoId}`
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    todos: ordered.todos && ordered.todos[todoId]
  }))
)(SomeComponent)
```

## Manual

Query listeners can be attached by using the `firestoreConnect` higher order component. `firebaseConnect` accepts an array of paths for which to create queries. When listening to paths, it is possible to modify the query with any of [Firebase's included query methods](https://firebase.google.com/docs/reference/js/firebase.database.Query).

##### Component Class

```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'
import { watchEvents, unWatchEvents } from './actions/query'
import { getEventsFromInput, createCallable } from './utils'

class Todos extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount () {
    const { firebase } = this.context.store
    firestore.get('todos')
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

It is common to make react components "stateless" meaning that the component is just a function. This can be useful, but then can limit usage of lifecycle hooks and other features of Component Classes. [`recompose` helps solve this](https://github.com/acdlite/recompose/blob/master/docs/API.md) by providing Higher Order Component functions such as `withContext`, `lifecycle`, and `withHandlers`.

```js
import { compose, withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux'

const withStore = compose(
  withContext({ store: PropTypes.object }, () => {}),
  getContext({ store: PropTypes.object }),
)

const enhance = compose(
  withStore,
  withHandlers({
    onDoneClick: props => (key, done = false) =>
      props.store.firestore.update('todos', key, { done }),
    onNewSubmit: props => newTodo =>
      props.store.firestore.add('todos', { ...newTodo, owner: 'Anonymous' }),
  }),
  lifecycle({
    componentWillMount(props) {
      props.store.firestore.get('todos')
    }
  }),
  connect(({ firebase }) => ({ // state.firebase
    todos: firebase.ordered.todos,
  }))
)

export default enhance(SomeComponent)
```

For more information [on using recompose visit the docs](https://github.com/acdlite/recompose/blob/master/docs/API.md)

## storeAs {#populate}

`storeAs` is not yet supported for the Firestore integration, but will be coming soon.

## Populate {#populate}

Populate is not yet supported for the Firestore integration, but will be coming soon.

## More Info {#more}

The Firestore integration is build on [`redux-firestore`](https://github.com/prescottprue/redux-firestore).
