# Routing Recipes

These recipes assume that you are using [`react-router`](https://github.com/ReactTraining/react-router), but the principles should be applicable to any routing solution.

## Basic

Routing can be changed based on data by using react lifecycle hooks such as `componentWillMount`, and `componentWillReceiveProps` to route users. This can be particularly useful when doing things such as route protection (only allowing user to view a route if they are logged in):

```javascript
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  helpers,
  pathToJS,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'

@firebaseConnect()
@connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
  })
)
export default class ProtectedPage extends Component {
  static propTypes = {
    auth: PropTypes.object,
  }

  componentWillReceiveProps({ auth }) {
    if (auth && !auth.uid) {
      this.context.router.push('/login') // redirect to /login if not authed
    }
  }

  render() {
    return (
      <div>
        You are authed!
      </div>
    )
  }
}
```

## Advanced

Using [`redux-auth-wrapper`](https://github.com/mjrussell/redux-auth-wrapper) you can easily create a Higher Order Component (wrapper) that can be used to redirect users based on Firebase state (including auth).

### Auth Required ("Route Protection")

In order to only allow authenticated users to view a page, a `UserIsAuthenticated` Higher Order Component can be created:

```javascript
import { browserHistory } from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { pathToJS } from 'react-redux-firebase'

export const UserIsAuthenticated = UserAuthWrapper({
  wrapperDisplayName: 'UserIsAuthenticated',
  authSelector: ({ firebase }) => pathToJS(firebase, 'auth'),
  authenticatingSelector: ({ firebase }) =>
    pathToJS(firebase, 'isInitializing') === true ||
    pathToJS(firebase, 'auth') === undefined
  predicate: auth => auth !== null,
  redirectAction: (newLoc) => (dispatch) => {
    browserHistory.replace(newLoc)
    // routerActions.replace // if using react-router-redux
    dispatch({
      type: 'UNAUTHED_REDIRECT',
      payload: { message: 'You must be authenticated.' },
    })
  },
})
```

Then it can be used as a Higher Order Component wrapper on a component:

*es7 decorators*

```javascript
@UserIsAuthenticated // redirects to '/login' if user not is logged in
export default class ProtectedThing extends Component {
  render() {
    return (
      <div>
        You are authed!
      </div>
    )
  }
}
```

*standard ES5/ES6*

```javascript
export default UserIsAuthenticated(ProtectedThing)
```

Or it can be used at the route level:

```javascript
<Route path="/" component={App}>
  <Route path="login" component={Login}/>
  <Route path="foo" component={UserIsAuthenticated(Foo)}/>
</Route>
```


### Redirect Authenticated
Just as easily as creating a wrapper for redirect if a user is not logged in, we can create one that redirects if a user *IS* authenticated. This can be useful for pages that you do not want a logged in user to see, such as the login page.

```javascript
import { browserHistory } from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { pathToJS } from 'react-redux-firebase'

export const UserIsNotAuthenticated = UserAuthWrapper({
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false,
  failureRedirectPath: '/',
  authSelector: ({ firebase }) => pathToJS(firebase, 'auth'),
  authenticatingSelector: ({ firebase }) => pathToJS(firebase, 'isInitializing') === true,
  predicate: auth => auth === null,
  redirectAction: (newLoc) => (dispatch) => {
    browserHistory.replace(newLoc)
    dispatch({
      type: 'AUTHED_REDIRECT',
      payload: { message: 'User is authenticated. Redirecting home...' }
    })
  }
})

```

Can then be used on a Login route component:

```javascript
import React, { Component } from 'react'
import { firebaseConnect } from 'react-redux-firebase'

@UserIsNotAuthenticated // redirects to '/' if user is logged in
@firebaseConnect() // adds this.props.firebase
export default class Login extends Component {
  googleLogin = () => {
    this.props.firebase.login({ provider: 'google' })
  }
  render() {
    return (
      <div>
        <button onClick={this.googleLogin}>
          Google Login
        </button>
      </div>
    )
  }
}
```
