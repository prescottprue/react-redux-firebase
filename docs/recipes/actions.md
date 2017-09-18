# Actions
react-redux-firebase comes with built in actions including `set`, `push`, and `update`

## Components
Firebase actions can be accessed within a component by using the `firebaseConnect` wrapper like so:

#### Pure Component
```js
import React from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'

const SimpleComponent = () => (
  <button onClick={() => this.props.firebase.push({ some: 'data' })}>
    Test Push
  </button>
)

SimpleComponent.propTypes = {
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default firebaseConnect()(SimpleComponent)
```
#### Stateful Component

```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'

@firebaseConnect()
export default class SimpleComponent extends Component {
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
      .push({ some: 'data' })
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

## Advanced Actions

If you are looking to write advanced actions (i.e. multiple steps contained within one action), look at the [thunks section](/docs/recipes/thunks)
