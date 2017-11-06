# Profile

Profile object is used to store data associated with a user. Using profile is in no way required, and will only be enabled if the `userProfile` config option is provided.

## Basic
It is common to store the list of user profiles under a collection called "users" or "profiles". For this example we will use "users".

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

// grab profile from redux with connect
connect(
  (state) => ({
    profile: state.firebase.profile // profile passed as props.profile
  })
)(SomeComponent) // pass component to be wrapped

// or with some shorthand:
connect(({ firebase: { profile } }) => ({
  profile  // profile passed as props.profile
}))(SomeComponent) // pass component to be wrapped
```

## Update Profile

The current users profile can be updated by using the `updateProfile` method:

```js
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase, isLoaded } from 'react-redux-firebase'

const UpdateProfilePage = ({ profile, firebase }) => (
  <div>
    <h2>Update User Profile</h2>
    <span>
      Click the button to update profile to include role parameter
    </span>
    <button onClick={() => firebase.updateProfile({ role: 'admin' })}>
      Add Role To User
    </button>
    <div>
      {
        isLoaded(profile)
          ? JSON.stringify(profile, null, 2)
          : 'Loading...'
      }
    </div>
  </div>
)

UpdateProfilePage.propTypes = {
 profile: PropTypes.object,
}

export default compose(
  withFirebase, // firebaseConnect() can also be used
  connect(
    ({ firebase: { profile } }) => ({
      profile,
    })
  )
)(UpdateProfilePage)
```

## Change How Profiles Are Stored
The way user profiles are written to the database can be modified by passing the `profileFactory` parameter .

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

To list online users and/or track sessions, view the [presence recipe](/docs/recipes/auth.md#presence)

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
  email: 'rick@sanchez.com',
  contacts: [
    {
      email: 'morty@ohboyrick.com',
      displayName: 'Morty Smith'
    },
     {
      email: 'bird@person.com',
      displayName: 'Bird Person'
    }
  ]
}
```
