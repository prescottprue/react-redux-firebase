# Profile

Profile object is used to store data associated with a user.

## Basic
Include the `userProfile` parameter in config when setting up store middleware:

```js
const config = {
  userProfile: 'users', // where profiles are stored in database
}
reactReduxFirebase(fbConfig, config)
```

Then later wrap a component with connect:

```js
import { connect } from 'react-redux'
import { pathToJS } from 'react-redux-firebase'

// grab profile from redux with connect
connect((state) => {
  return {
    profile: pathToJS(state.firebase, 'profile') // profile passed as props.profile
  }
}))(SomeComponent) // pass component to be wrapped

// or with some shorthand:
connect(({ firebase }) => ({
  profile: pathToJS(state.firebase, 'profile') // profile passed as props.profile
}))(SomeComponent) // pass component to be wrapped
```

## Update Profile

**NOTE:** This feature is only available in [`v1.5.*`](http://docs.react-redux-firebase.com/history/v1.5.0/docs/recipes/profile.html)

The current users profile can be updated by using the `updateProfile` method, which is [only available in `v1.5.*`](http://docs.react-redux-firebase.com/history/v1.5.0/docs/recipes/profile.html).

## Change How Profiles Are Stored
The way user profiles are written to the database can be modified by passing the `profileFactory` parameter.

```js
// within your createStore.js or store.js file include the following config
const config = {
  userProfile: 'users', // where profiles are stored in database
  profileFactory: (userData, profileData) => { // how profiles are stored in database
    const { user } = userData
    return {
      email: user.email
    }
  }
}
```

## List Online Users

**NOTE:** This feature is only available in [`v2.0.0-*`](http://docs.react-redux-firebase.com/history/v2.0.0/)

To list online users and/or track sessions, view the [presence recipe](http://docs.react-redux-firebase.com/history/v2.0.0/docs/recipes/auth.html#list-of-online-users-presence)

## Populate Parameters
If profile object contains an key or a list of keys as parameters, you can populate those parameters with the matching value from another location on firebase.

#### List
profile.contacts contains a list of user UIDs that should be populated from the users list like so:
```js
{
  displayName: 'Rick Sanchez',
  email: 'rick@rickandmorty.com',
  contacts: [
    'QvXyh688YNV29QuhCTXeOXnHt282',
    'T8Wh9CMHIxT1f9mA5oEETNrOOlt1'
  ]
}
```

Setting config like this:

```js
const config = {
  userProfile: 'users', // where profiles are stored in database
  profileParamsToPopulate: [
    'contacts:users'
  ]
}
```

Results in profile with populated contacts parameter:

```js
{
  displayName: 'Rick Sanchez',
  email: 'rick@rickandmorty.com',
  contacts: [
    {
      email: 'some@email.com',
      displayName: 'some one'
    },
     {
      email: 'adude@awebsite.com',
      displayName: 'A Dude'
    }
  ]
}
```
