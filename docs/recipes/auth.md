# Auth Recipes

## Wait For Auth To Load
One of the most common patterns with authentication, is showing a loading spinner until

```js
import React, { Component, PropTypes } from 'react'
import { isLoaded, isEmpty, pathToJS, dataToJS } from 'react-redux-firebase'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    const { auth } = this.props

    if (!isLoaded(auth) || isEmpty(auth)) {
      return (<p>you need to login</p>)
    }

    return (
      <div>
        Todos For User with id: { auth.uid }
        <TodoComponent
          todos={this.props.todos}
        />
      </div>
    )
  }
}

const fbWrappedComponent = firebaseConnect([
  '/todos'
])(App)

export default connect(
  ({ firebase }) => ({
    todos: dataToJS(firebase, 'todos'),
    auth: pathToJS(firebase, 'auth')
  })
)(fbWrappedComponent)
```

## Google Login

Here is an example of a component that shows a Google login button if the user is not logged in, and a welcome message if they are. The initial loading state is handled with a simple "loading" message

```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GoogleButton from 'react-google-button'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS
} from 'react-redux-firebase'

@firebaseConnect() // add this.props.firebase
@connect( // map redux state to props
  ({ firebase }) => ({
    authError: pathToJS(firebase, 'authError')
  })
)
export default class Login extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    })
  }

  state = {
    isLoading: false
  }

  googleLogin = loginData => {
    this.setState({ isLoading: true })
    return this.props.firebase
      .login({ provider: 'google' })
      .then(() => {
        this.setState({ isLoading: false })
        // this is where you can redirect to another route
      })
      .catch((error) => {
        console.log('there was an error', error)
        console.log('error prop:', this.props.authError) // thanks to connect
      })
  }

  render () {
    const { authError } = this.props
    const { snackCanOpen } = this.state

    if (!isLoaded(auth)) {
      return (
        <div>
          <span>Loading</span>
        </div>
      )
    }

    if (isEmpty(auth)) {
      return (
        <div>
          <span>Login page</span>
          <GoogleButton onClick={this.googleLogin} />
        </div>
      )
    }

    return (
      <p>Welcome!</p>
    )

  }
}
```
