# Roles (Access Management) Recipe

Control/management of access through setting and assigning user roles and permissions are an important part of most production applications.

Though there are many patterns, we are going to use the following terminology:

**Role** - job function or title which defines authority level (i.e. admin or manager). A user has a role, a role as permissions.

**Permissions** - approval of a mode of access (i.e. todos) . Multiple permissions can assigned to a single role.

## Data Setup

Add the Roles collection in Firebase. It should be a sibling of the `users` collection. For example:

_Tip: you can import below JSON directly into Firebase. Alternatively you can populate it in the start of your application or when you deploy to Firebase._

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

In order for us to check our role for permissions, we will want to populate the role on profile. This will turn the role string (i.e. admin) into the object representing that role from the roles collection.

Make sure you have the following config when creating your store:

```js
reactReduxFirebase(
  fbConfig,
  {
    userProfile: 'users',
    profileParamsToPopulate: [
      { child: 'role', root: 'roles' }, // populates user's role with matching role object from roles
    ]
  }
)
```

You can also use string notation for the profileParamsToPopulate, like so:

```js
reactReduxFirebase(
  fbConfig,
  {
    userProfile: 'users',
    profileParamsToPopulate: [
      ['role:roles'], // populates user's role with matching role object from roles
    ]
  }
)
```

**Note:** beware that the `role` parameter on each user will remain a string, and won't actually be "converted" into a object. Something that may be apparant to some developers, but not to others ;-)

## Automatically assign role when user signs up

If you want to assign a role by default when users sign up, you can add a profileFactory to your config:+

```js
reactReduxFirebase(
  fbConfig,
  {
    userProfile: 'users',
    profileParamsToPopulate: [
      { child: 'role', root: 'roles' }, // populates user's role with matching role object from roles
    ],
    profileFactory: user => ({
      email: user.email || user.providerData[0].email,
      role: 'user',
      providerData: user.providerData
    })
  }
)
```

## The higher order component (where the actual verification happens)

Using redux-auth-wrapper you can create higher order components that will make it easy to verify a user has a specific role or permission before rendering a page or component.

Here is an example of an HOC that checks to make sure the user is an admin:

```js
import { get } from 'lodash';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { pathToJS } from 'react-redux-firebase';
import CircularProgress from 'material-ui/CircularProgress';

/**
 * @description Higher Order Component that redirects to the homepage if
 * the user does not have the required permission. This HOC requires that the user
 * profile be loaded and the role property populated
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserIsAdmin = UserAuthWrapper({
  authSelector: ({ firebase }) => {
    const user = pathToJS(firebase, 'profile');
    if (user) {
      return { ...pathToJS(firebase, 'auth'), user }; // attach profile for use in predicate
    }
    return pathToJS(firebase, 'auth');
  },
  authenticatingSelector: ({ firebase }) =>
      (pathToJS(firebase, 'auth') === undefined)
      || (pathToJS(firebase, 'profile') === undefined)
      || (pathToJS(firebase, 'isInitializing') === true),
  redirectAction: newLoc => (dispatch) => {
    browserHistory.replace(newLoc);
    dispatch({ type: UNAUTHED_REDIRECT });
  },
  failureRedirectPath: '/login',
  wrapperDisplayName: 'UserIsAdmin',
  predicate: auth => get(auth, `user.role.name`) === 'admin',
  LoadingComponent: <CircularProgress mode="indeterminate" size={80} />,
});
```

Here is an example of a UserHasPermission HOC that allows us to pass in a string permission (such as todos):

_Tip: you can place the below HOC in `router.js` together with `UserIsNotAuthenticated` and `UserIsAuthenticated`._

```js
import { get } from 'lodash';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { pathToJS } from 'react-redux-firebase';
import CircularProgress from 'material-ui/CircularProgress';

/**
 * @description Higher Order Component that redirects to the homepage if
 * the user does not have the required permission. This HOC requires that the user
 * profile be loaded and the role property populated
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserHasPermission = permission => UserAuthWrapper({
  authSelector: ({ firebase }) => {
    const user = pathToJS(firebase, 'profile');
    if (user) {
      // attach profile for use in predicate
      return { ...pathToJS(firebase, 'auth'), user };
    }
    return pathToJS(firebase, 'auth');
  },
  authenticatingSelector: ({ firebase }) =>
      (pathToJS(firebase, 'auth') === undefined)
      || (pathToJS(firebase, 'profile') === undefined)
      || (pathToJS(firebase, 'isInitializing') === true),
  redirectAction: newLoc => (dispatch) => {
    browserHistory.replace(newLoc);
    dispatch({ type: UNAUTHED_REDIRECT });
  },
  failureRedirectPath: '/login',
  wrapperDisplayName: 'UserHasPermission',
  predicate: auth => get(auth, `user.role.${permission}`, false),
  allowRedirectBack: false,
  LoadingComponent: <CircularProgress mode="indeterminate" size={80} />,
});
```


## Checking for roles on pages/components

The Higher Order Component above can then be applied like so:

```js
export default UserHasPermission('todo')(SomeComponent)
```

or using es7 decorator syntax:

```js
@UserHasPermission('todos')
export default class SomePage extends Component {
  render() {
    // only rendered if user has role which matches this permission
  }
}
```
