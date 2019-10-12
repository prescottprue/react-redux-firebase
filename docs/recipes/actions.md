# Actions

react-redux-firebase comes with built in async action creators for all parts of Firebase including storage, auth, Real Time Database, and Firestore (firestore requires extra setup). These action creators dispatch actions which are then handled by the reducers. The examples below show using action creators as promises, but it is also possible to use redux state.

For more on what [an async action creator is](http://redux.js.org/docs/advanced/AsyncActions.html#async-action-creators), please visit the [section on it in the redux-docs](http://redux.js.org/docs/advanced/AsyncActions.html#async-action-creators).

## Components
Firebase actions can be accessed within a component by using either the [`withFirebase`](/docs/api/withFirebase) wrapper or the [`firebaseConnect` wrapper](/docs/api/firebaseConnect) like so:

#### Functional Component
```js
import React from 'react'
import PropTypes from 'prop-types'
import { useFirebase } from 'react-redux-firebase'

function SimpleComponent(props) {
  const firebase = useFirebase()
  return (
    <button onClick={() => firebase.push('todos', { some: 'data' })}>
      Test Push
    </button>
  )
}

SimpleComponent.propTypes = {
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default SimpleComponent
```

When using functional components, [recompose](https://github.com/acdlite/recompose/blob/master/docs/API.md) is a nice utility (think of it like lodash for Functional React Components):

```js
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { useFirebase } from 'react-redux-firebase'

function SimpleComponent() {
  const firebase = useFirebase()

  function createTodo() {
    return firebase.push('todos', { some: 'data' })
  }

  return (
    <button onClick={createTodo}>
      Test Push
    </button>
  )
}

export default SimpleComponent
```

#### Stateful Components

**Wrapping A Class Component**

```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'

class SimpleComponent extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }

  state = {
    wasSent: false
  }

  testPush = () => {
    this.props.firebase
      .push('todos', { some: 'data' })
      .then(() => {
        this.setState({ wasSent: true })
      })
  }

  render() {
    return (
      <div>
        <span>Was sent: {this.state.wasSent}</span>
        <button onClick={this.testPush}>
          Test Push
        </button>
      </div>
    )
  }
}
```

**Decorator**

Or if you are using decorators, you can accomplish the same thing with
```js
@firebaseConnect() // @withFirebase can also be used
export default class SimpleComponent extends Component {
  // same component code from above
}
```

**Directly From Context**

`react-redux` passes store through `context` using `<Provider>`, so you can grab `store.firebase`:

```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SimpleComponent extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  state = {
    wasSent: false
  }

  testPush = () => {
    this.context.store.firebase
      .push('todos', { some: 'data' })
      .then(() => {
        this.setState({ wasSent: true })
      })
  }

  render() {
    return (
      <div>
        <span>Was sent: {this.state.wasSent}</span>
        <button onClick={this.testPush}>
          Test Push
        </button>
      </div>
    )
  }
}
```

**Functional Stateful**

```js
import React, { useState } from 'react'
import { useFirebase } from 'react-redux-firebase'

export default function SimpleComponent() {
  const [wasSent, updateSentState] = useState(false)
  const firebase = useFirebase()

  function createTodo() {
    return firebase
        .push('todos', { some: 'data' })
        .then(() => {
          updateSentState(true)
        })
  }

  return (
    <div>
      <span>Was sent: {wasSent}</span>
      <button onClick={createTodo}>
        Test Push
      </button>
    </div>
  )
}
```

Fun Fact: This is actually what happens internally with both `withFirebase` and `firebaseConnect`.

## Advanced Actions

If you are looking to write advanced actions (i.e. multiple steps contained within one action), look at the [thunks section](/docs/integrations/thunks.md)
