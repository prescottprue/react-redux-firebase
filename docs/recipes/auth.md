# Auth Recipes

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
  isEmpty
} from 'react-redux-firebase'

@firebaseConnect() // add this.props.firebase
@connect( // map redux state to props
  ({ firebase: { authError } }) => ({
    authError
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
        this.setState({ isLoading: false })
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
