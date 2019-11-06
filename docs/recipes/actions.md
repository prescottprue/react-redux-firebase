# Actions

react-redux-firebase comes with built in async action creators for all parts of Firebase including storage, auth, Real Time Database, and Firestore (firestore requires extra setup). These action creators dispatch actions which are then handled by the reducers. The examples below show using action creators as promises, but it is also possible to use redux state.

For more on what [an async action creator is](http://redux.js.org/docs/advanced/AsyncActions.html#async-action-creators), please visit the [section on it in the redux-docs](http://redux.js.org/docs/advanced/AsyncActions.html#async-action-creators).

## Components

Methods which dispatch actions can be accessed within a component by using one of the following:
  * [`useFirebase` Hook](/docs/api/useFirebase)
  * [`withFirebase` HOC](/docs/api/withFirebase)
  * [`firebaseConnect` HOC](/docs/api/firebaseConnect)

#### Functional Component

```js
import React from 'react'
import PropTypes from 'prop-types'
import { useFirebase } from 'react-redux-firebase'

function SimpleComponent() {
  const firebase = useFirebase()

  function createTodo() {
    return firebase.push('todos', { some: 'data' })
  }

  return (
    <button onClick={createTodo}>
      Create Example Todo
    </button>
  )
}

export default SimpleComponent
```

#### Stateful Components

```jsx
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

**Decorator**

Or if you are using decorators, you can accomplish the same thing with
```js
@firebaseConnect() // @withFirebase can also be used
export default class SimpleComponent extends Component {
  // same component code from above
}
```

## Advanced Actions

If you are looking to write advanced actions (i.e. multiple steps contained within one action), look at the [thunks section](/docs/integrations/thunks.md)
