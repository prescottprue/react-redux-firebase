# Roles (Access Management) Recipe

Control/management of access through setting and assigning user roles and permissions are an important part of most production applications.

Though there are many patterns, we are going to use the following terminology:

**Role** - job function or title which defines authority level (i.e. admin or manager). A user has a role, a role as permissions.

**Permissions** - approval of a mode of access (i.e. todos) . Multiple permissions can be assigned to a single role.

## Data Setup

Add the Roles collection in Firebase. It should be a sibling of the `users` collection. For example:

_Tip: you can import below JSON directly into Firebase. Alternatively, you can upload it in the start of your application or when you deploy to Firebase._

```js
{
  admin: {
    name: 'admin', // will not be necessary once profileParamsToPopulate supports keyProp
    todos: true,
    userManagement: true
  },
  user: {
    todos: true,
    name: 'user'// will not be necessary once profileParamsToPopulate supports keyProp
  }
}
{
  users: {
    ...
  }
}
```

## The role parameter on users

Each user should have a role parameter that correlates to a role. For example:

```js
{
  avatarUrl: 'http://some.url',
  displayName: 'Some User',
  email: 'some@user.com',
  role: 'admin'
}
```

## Config

In order for us to check our role for permissions, we will want to populate the role on a profile. This will turn the role string (i.e. admin) into the object representing that role from the roles collection.

```js
{
  userProfile: 'users',
  profileParamsToPopulate: [
    { child: 'role', root: 'roles' }, // populates user's role with matching role object from roles
  ]
}
```

You can also use string notation for the `profileParamsToPopulate`, like so:

```js
{
  userProfile: 'users',
  profileParamsToPopulate: [
    ['role:roles'], // populates user's role with matching role object from roles
  ]
}
```

**Note:** beware that the `role` parameter on each user will remain a string, and won't be "converted" into an object. Something that may be apparent to some developers, but not to others ;-)

## Automatically assign role when user signs up

### Client Side

If you want to assign a role by default when users sign up, you can add a profileFactory to your config:

```js
{
  userProfile: 'users',
  profileParamsToPopulate: [
    { child: 'role', root: 'roles' }, // populates user's role with matching role object from roles
  ],
  profileFactory: user => {
    const profile = {
      email: user.email || user.providerData[0].email,
      role: 'user',
    }
    if (user.providerData && user.providerData.length) {
      profile.providerData = user.providerData
    }
    return profile
  }
}
```

**NOTE**: Your security rules should be set to only allow for users to be setting their role to user. For more granular control of this, you can move role assigning to a cloud function that is trigger on user create

### Cloud Function

Having cloud function contain logic about which users get assigned certain roles means that you do not need any write access for clients on the role parameter.

```js
const adminEmails = ['your@email.com'] // list of emails to automatically assign admin role to

async function assignUserRole(user) {
  const { uid, email, displayName } = user // The email of the user.
  const newRole = adminEmails.includes(email) ? 'admin' : 'user'
  await admin
    .firestore()
    .collection('users')
    .doc(uid)
    .set({ role: 'user' }, { merge: true })
}

exports.assignUserRole = functions.auth.user().onCreate(assignUserRole)
```

More info is available about doing this in the [extend auth with functions section of the firebase docs](https://firebase.google.com/docs/auth/extend-with-functions).

## The higher order component (where the actual verification happens)

Using redux-auth-wrapper you can create higher order components that will make it easy to verify a user has a specific role or permission before rendering a page or component.

Here is an example of an HOC that checks to make sure the user is an admin:

**redux-auth-wrapper v1**

```js
import { get } from 'lodash';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import CircularProgress from 'material-ui/CircularProgress';

/**
 * @description Higher Order Component that redirects to the homepage if
 * the user does not have the required permission. This HOC requires that the user
 * profile be loaded and the role property populated
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserIsAdmin = UserAuthWrapper({ // eslint-disable-line new-cap
  authSelector: ({ firebase: { profile, auth } }) => ({ auth, profile })
  authenticatingSelector: ({ firebase: { profile, auth, isInitializing } }) =>
    auth === undefined || profile === undefined || isInitializing === true,
  redirectAction: newLoc => (dispatch) => {
    browserHistory.replace(newLoc);
    dispatch({ type: UNAUTHED_REDIRECT });
  },
  allowRedirectBack: false,
  failureRedirectPath: '/login',
  wrapperDisplayName: 'UserIsAdmin',
  predicate: auth => get(auth, `profile.role.name`) === 'admin',
  LoadingComponent: <CircularProgress mode="indeterminate" size={80} />,
});
```

**react-router v4 + redux-auth-wrapper v2**

```js
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import createHistory from 'history/createBrowserHistory'
import LoadingScreen from '../components/LoadingScreen' // change to your custom component

const locationHelper = locationHelperBuilder({})
const browserHistory = createHistory()

export const UserIsAdmin = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsAuthenticated',
  LoadingComponent: LoadingScreen,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  authenticatingSelector: ({ firebase: { auth, profile, isInitializing } }) =>
    !auth.isLoaded || !profile.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { profile } }) =>
    profile.role.name === 'admin',
  redirectAction: newLoc => dispatch => {
    browserHistory.replace(newLoc)
    dispatch({ type: UNAUTHED_REDIRECT })
  }
})
```

Here is an example of a UserHasPermission HOC that allows us to pass in a string permission (such as todos):

_Tip: you can place the below HOC in `router.js` together with `UserIsNotAuthenticated` and `UserIsAuthenticated`._

**redux-auth-wrapper v1**

```js
import { get } from 'lodash';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import CircularProgress from 'material-ui/CircularProgress';

/**
 * @description Higher Order Component that redirects to the homepage if
 * the user does not have the required permission. This HOC requires that the user
 * profile be loaded and the role property populated
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserHasPermission = permission => UserAuthWrapper({
  wrapperDisplayName: 'UserHasPermission',
  LoadingComponent: LoadingScreen,
  allowRedirectBack: false,
  failureRedirectPath: '/login',
  authSelector: ({ firebase: { profile, auth } }) => ({ auth, profile })
  authenticatingSelector: ({ firebase: { profile, auth, isInitializing } }) =>
    auth === undefined || profile === undefined || isInitializing === true,
  predicate: auth => get(auth, `profile.role.${permission}`, false),
  redirectAction: newLoc => (dispatch) => {
    browserHistory.replace(newLoc);
    dispatch({ type: UNAUTHED_REDIRECT });
  },
});
```

**react-router v4 + redux-auth-wrapper v2**

```javascript
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { browserHistory } from 'react-router'
import LoadingScreen from '../components/LoadingScreen' // change it to your custom component
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

const locationHelper = locationHelperBuilder({})

export const UserHasPermission = permission =>
  connectedRouterRedirect({
    wrapperDisplayName: 'UserHasPermission',
    AuthenticatingComponent: LoadingScreen,
    allowRedirectBack: false,
    redirectPath: (state, ownProps) =>
      locationHelper.getRedirectQueryParam(ownProps) || '/login',
    authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
      !auth.isLoaded || !profile.isLoaded || isInitializing === true,
    authenticatedSelector: ({ firebase: { auth } }) =>
      auth.isLoaded && !auth.isEmpty,
    redirectAction: newLoc => dispatch => {
      browserHistory.replace(newLoc) // or routerActions.replace
      dispatch({ type: UNAUTHED_REDIRECT })
    }
  })
```

## Checking for roles on pages/components

The Higher Order Component above can then be applied like so:

```js
export default UserHasPermission('todo')(SomeComponent)
```
