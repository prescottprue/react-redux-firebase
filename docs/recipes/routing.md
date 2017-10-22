# Routing Recipes

These recipes assume that you are using [`react-router`](https://github.com/ReactTraining/react-router), but the principles should apply to any routing solution.

## Basic

Routing can be changed based on data by using react lifecycle hooks such as `componentWillMount`, and `componentWillReceiveProps` to route users. This can be particularly useful when doing things such as route protection (only allowing a user to view a route if they are logged in):

```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

export class ProtectedPage extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  static propTypes = {
    authExists: PropTypes.bool,
  }

  componentWillReceiveProps({ authExists }) {
    if (authExists) {
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

// Used to provide data to ProtectedPage component
const enhance = compose(
  firebaseConnect()
  connect(
    (state) => {
      return {
        authExists: !!state.firebase.get('auth'),
      }
    }
  )
)

export enhance(ProtectedPage)
```

## Advanced

Using [`redux-auth-wrapper`](https://github.com/mjrussell/redux-auth-wrapper) you can easily create a Higher Order Component (wrapper) that can be used to redirect users based on Firebase state (including auth).

### Auth Required ("Route Protection")

In order to only allow authenticated users to view a page, a `UserIsAuthenticated` Higher Order Component can be created:

**react-router v3 and earlier**

```javascript
import { browserHistory } from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { pathToJS } from 'react-redux-firebase'

export const UserIsAuthenticated = UserAuthWrapper({
  wrapperDisplayName: 'UserIsAuthenticated',
  authSelector: ({ firebase }) => pathToJS(firebase, 'auth'),
  authenticatingSelector: ({ firebase }) =>
    pathToJS(firebase, 'isInitializing') === true ||
    pathToJS(firebase, 'auth') === undefined,
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

**react-router v4 + redux-auth-wrapper v2**

```javascript
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { browserHistory } from 'react-router';
import LoadingScreen from '../components/LoadingScreen'; // change it to your custom component

const locationHelper = locationHelperBuilder({});

export const UserIsAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/login',
  allowRedirectBack: true,
  authenticatedSelector: ({ firebase }) => pathToJS(firebase, 'auth') !== null,
  authenticatingSelector: ({ firebase: { auth } }) =>
    pathToJS(firebase, 'isInitializing') === true ||
    pathToJS(firebase, 'auth') === undefined,
  AuthenticatingComponent: LoadingScreen,
  wrapperDisplayName: 'UserIsAuthenticated',
});
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

**react-router v3 and earlier**

```javascript
import { browserHistory } from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { pathToJS } from 'react-redux-firebase'
import LoadingScreen from '../components/LoadingScreen'; // change it to your custom component

export const UserIsNotAuthenticated = UserAuthWrapper({
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

**react-router v4 + redux-auth-wrapper v2**

```js
import { browserHistory } from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { pathToJS } from 'react-redux-firebase'
import LoadingScreen from '../components/LoadingScreen'; // change it to your custom component

export const UserIsNotAuthenticated = UserAuthWrapper({
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false,
  AuthenticatingComponent: LoadingScreen,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  authenticatedSelector: ({ firebase }) => pathToJS(firebase, 'auth') === null,
  authenticatingSelector: ({ firebase }) =>
    pathToJS(firebase, 'isInitializing') === true ||
    pathToJS(firebase, 'auth') === undefined
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
