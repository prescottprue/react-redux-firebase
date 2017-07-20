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

## List of Online Users (Presence)

Presence keeps a list of which users are currently online as well as a history of all user sessions.

The logic that runs this is partially based on:
* [blog post by Firebase](https://firebase.googleblog.com/2013/06/how-to-build-presence-system.html)/
* [Firebase's Sample Presence App](https://firebase.google.com/docs/database/web/offline-capabilities#section-sample)

## Basic
Include the `userProfile` parameter in config when setting up store middleware:

```js
const config = {
  userProfile: 'users', // where profiles are stored in database
  presence: 'presence', // where list of online users is stored in database
  sessions: 'sessions' // where list of user sessions is stored in database (presence must be enabled)
}
reactReduxFirebase(fbConfig, config)
```

Now when logging in through `login` method, user will be listed as online until they logout or end the session (close the tab or window).
