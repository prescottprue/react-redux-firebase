# Actions

react-redux-firebase comes with built in async action creators for all parts of Firebase including storage, auth, Real Time Database, and Firestore (firestore requires extra setup). These action creators dispatch actions which are then handled by the reducers. The examples below show using action creators as promises, but it is also possible to use redux state.

For more on what [an async action creator is](http://redux.js.org/docs/advanced/AsyncActions.html#async-action-creators), please visit the [section on it in the redux-docs](http://redux.js.org/docs/advanced/AsyncActions.html#async-action-creators).

## Components
Firebase actions can be accessed within a component by using either the [`withFirebase`](/docs/api/withFirebase) wrapper or the [`firebaseConnect` wrapper](/docs/api/firebaseConnect) like so:

#### Functional Component
```js
import React from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect, withFirebase } from 'react-redux-firebase'

const SimpleComponent = (props) => (
  <button onClick={() => props.firebase.push('todos', { some: 'data' })}>
    Test Push
  </button>
)

SimpleComponent.propTypes = {
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default withFirebase(SimpleComponent)
// firebaseConnect can also be used (helpful for creating listeners at the same time)
// export default firebaseConnect()(SimpleComponent)
```

When using functional components, [recompose](https://github.com/acdlite/recompose/blob/master/docs/API.md) is a nice utility (think of it like lodash for Functional React Components):

```js
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withFirebase } from 'react-redux-firebase'

const SimpleComponent = ({ createTodo }) => (
  <button onClick={createTodo}>
    Test Push
  </button>
)

SimpleComponent.propTypes = {
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default compose(
  withFirebase,
  withHandlers({
    createTodo: props => event => {
      return props.firebase.push('todos', { some: 'data' })
    }
  })
)(SimpleComponent)
// firebaseConnect can also be used (helpful for creating listeners at the same time)
// export default firebaseConnect()(SimpleComponent)
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
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers, withHandlers } from 'recompose'
import { withFirebase } from 'react-redux-firebase'

const SimpleComponent = ({ createTodo, wasSent }) => (
  <div>
    <span>Was sent: {wasSent}</span>
    <button onClick={createTodo}>
      Test Push
    </button>
  </div>
)

SimpleComponent.propTypes = {
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  createTodo: PropTypes.func, // from enhancer (withHandlers)
  wasSent: PropTypes.bool, // from enhancer (withStateHandlers)
}

const enhance = compose(
  withFirebase,
  withStateHandlers(
    ({ initialWasSent = false }) => ({
      wasSent: initialWasSent,
    }),
    {
      toggleSent: ({ wasSent }) => () => ({
        wasSent: !wasSent
      })
    }
  }),
  withHandlers({
    createTodo: ({ wasSent, toggleSent }) => event => {
      return props.firebase
        .push('todos', { some: 'data' })
        .then(() => {
          toggleSent()
        })
    }
  })
)

// Export enhanced component
export default enhance(SimpleComponent)
// firebaseConnect can also be used (helpful for creating listeners at the same time)
// export default firebaseConnect()(SimpleComponent)
```

Fun Fact: This is actually what happens internally with both `withFirebase` and `firebaseConnect`.

## Advanced Actions

If you are looking to write advanced actions (i.e. multiple steps contained within one action), look at the [thunks section](/docs/integrations/thunks.md)
