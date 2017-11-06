# Routing Recipes

These recipes assume that you are using [`react-router`](https://github.com/ReactTraining/react-router), but the principles should apply to any routing solution.

## Basic

Routing can be changed based on data by using react lifecycle hooks such as `componentWillMount`, and `componentWillReceiveProps` to route users. This can be particularly useful when doing things such as route protection (only allowing a user to view a route if they are logged in):

```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'

class ProtectedPage extends Component {
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

export default connect(
  ({ firebase: { auth } }) => ({ auth }) // state.firebase.auth -> props.auth
)(ProtectedPage)
```

## Advanced

Using [`redux-auth-wrapper`](https://github.com/mjrussell/redux-auth-wrapper) you can easily create a Higher Order Component (wrapper) that can be used to redirect users based on Firebase state (including auth).

### Auth Required ("Route Protection")

In order to only allow authenticated users to view a page, a `UserIsAuthenticated` Higher Order Component can be created:

**redux-auth-wrapper v1**

```javascript
import { browserHistory } from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'

export const UserIsAuthenticated = UserAuthWrapper({
  wrapperDisplayName: 'UserIsAuthenticated',
  authSelector: ({ firebase: { auth } }) => auth,
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  predicate: auth => !auth.isEmpty,
  redirectAction: (newLoc) => (dispatch) => {
    browserHistory.replace(newLoc)
    // routerActions.replace // if using react-router-redux
    dispatch({
      type: 'UNAUTHED_REDIRECT',
      payload: { message: 'You must be authenticated.' },
    })
  }
})
```

**react-router v4 + redux-auth-wrapper v2**

```javascript
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper'
import LoadingScreen from '../components/LoadingScreen'; // change it to your custom component

const locationHelper = locationHelperBuilder({});

export const UserIsAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsAuthenticated',
  AuthenticatingComponent: LoadingScreen,
  allowRedirectBack: true,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/login',
  authenticatingSelector: ({ firebase: { auth, profile, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && !auth.isEmpty,
  redirectAction: newLoc => (dispatch) => {
    browserHistory.replace(newLoc); // or routerActions.replace
    dispatch({ type: 'UNAUTHED_REDIRECT' });
  },
});

export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsNotAuthenticated',
  AuthenticatingComponent: LoadingScreen,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && auth.isEmpty,
  redirectAction: newLoc => (dispatch) => {
    browserHistory.replace(newLoc); // or routerActions.replace
    dispatch({ type: 'UNAUTHED_REDIRECT' });
  },
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
import LoadingScreen from '../components/LoadingScreen'; // change it to your custom component

export const UserIsNotAuthenticated = UserAuthWrapper({
  failureRedirectPath: '/',
  authSelector: ({ firebase: { auth } }) => auth,
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  predicate: auth => auth.isEmpty,
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
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper'

import LoadingScreen from '../components/LoadingScreen'; // change it to your custom component

export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsNotAuthenticated',
  AuthenticatingComponent: LoadingScreen,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && auth.isEmpty,
  redirectAction: newLoc => (dispatch) => {
    // routerActions.replace or other redirect
    dispatch({ type: 'UNAUTHED_REDIRECT' });
  },
});
```

Can then be used on a Login route component:

```javascript
import React from 'react'
import { compose } from 'redux'
import { withFirebase } from 'react-redux-firebase'

const Login = ({ firebase }) => (
  <div>
    <button onClick={() => firebase.login({ provider: 'google' })}>
      Google Login
    </button>
  </div>
)

export default compose(
  UserIsNotAuthenticated, // redirects to '/' if user is logged in
  withFirebase // adds this.props.firebase
)
```
