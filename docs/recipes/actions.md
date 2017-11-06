# Actions
react-redux-firebase comes with built in async action creators for all parts of Firebase including storage, auth, Real Time Database, and Firestore (firestore requires extra setup).

For more on what [an async action creator is](http://redux.js.org/docs/advanced/AsyncActions.html#async-action-creators), please visit the [section on it in the redux-docs](http://redux.js.org/docs/advanced/AsyncActions.html#async-action-creators)

## Components
Firebase actions can be accessed within a component by using either the [`withFirebase`](/docs/api/withFirebase) wrapper or the [`firebaseConnect` wrapper](/docs/api/firebaseConnect) like so:

#### Pure Component
```js
import React from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect, withFirebase } from 'react-redux-firebase'

const SimpleComponent = () => (
  <button onClick={() => this.props.firebase.push('todos', { some: 'data' })}>
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

#### Stateful Component

**Wrapping A Component**

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
      <button onClick={this.testPush}>
        Test Push
      </button>
    )
  }
}
```

**Decorator**

Or if you are using decorators, you can accomplish the same thing with
```js
@firebaseConnect()
export default class SimpleComponent extends Component {
  // same component code from above
}
```

**Context Types**

`react-redux` passes store through `context` using `<Provider>`, so you can grab `store.firebase`:

```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'

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
      <button onClick={this.testPush}>
        Test Push
      </button>
    )
  }
}
```

Fun Fact: This is actually what happens internally with both `withFirebase` and `firebaseConnect`.

## Advanced Actions

If you are looking to write advanced actions (i.e. multiple steps contained within one action), look at the [thunks section](/docs/recipes/thunks)
