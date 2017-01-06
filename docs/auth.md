# Authentication Methods

Authentication data is attached to `auth`, and errors are attached to `authError`. You can get them within components like so:

```js
import { connect } from 'react-redux'
import { helpers } from 'react-redux-firebase'
const { pathToJS } = helpers
@connect(
  // Map state to props
  ({ firebase }) => ({
    authError: pathToJS(firebase, 'authError'),
    auth: pathToJS(firebase, 'auth'),
    profile: pathToJS(firebase, 'profile')
  })
)
```

#### NOTE
All examples below assume you have wrapped your component using `firebaseConnect`. This will make `this.props.firebase` available within your component:

###### Decorators

```js
import React, { Component, PropTypes } from 'react'
import { firebaseConnect } from 'react-redux-firebase'

@firebaseConnect()
export default class SomeComponent extends Component {
  render() {
    // this.props.firebase contains API
  }
}
```

###### No Decorators

```js
import React, { Component, PropTypes } from 'react'
import { firebaseConnect } from 'react-redux-firebase'

class SomeComponent extends Component {
  render() {
    // this.props.firebase contains API
  }
}
export default firebaseConnect()(SomeComponent)
```


## `login(credentials)`

##### Parameters

  * `credentials` ([**String**]() | [**Object**]())
    * [**String**]() - `ref.authWithCustomToken(credentials)` is used
    * [**Object**]() - cases:
      * email and password (runs `ref.authWithPassword(credentials)`) :
        ```js
        {
            email: String
            password: String
        }
        ```
      * provider (runs `ref.authWithOAuthPopup(provider)` or `ref.authWithOAuthRedirect(provider)`) :
        ```js
        {
            provider: "facebook | google | twitter",
            type: "popup | redirect", // redirect is default
        }
        ```
      * provider and token (runs `ref.authWithOAuthToken(provider, token)`) :
        ```js
        {
            provider: "facebook | google | twitter",
            token : String
        }
        ```


##### Returns
[**Promise**]() with authData in case of success or the error otherwise.

##### Examples

   *Email*
```js
// Call with info
this.props.firebase.login({
  email: 'test@test.com',
  password: 'testest1'
})
```

  *OAuth Provider Redirect*
```js
 // Call with info
 this.props.firebase.login({
   provider: 'google',
   type: 'redirect'
 })
 ```

   *OAuth Provider Popup*
```js
// Call with info
this.props.firebase.login({
  provider: 'google',
  type: 'popup'
})
```

  *Token*
```js
// Call with info
this.props.firebase.login('someJWTAuthToken')
```

## `createUser(credentials, profile)`

Similar to Firebase's `ref.createUser(credentials)` but with support for automatic profile setup (based on your userProfile config).

##### Parameters

* `credentials` [**Object**]()
  * `credentials.email` [**String**]() - User's email
  * `credentials.password` [**String**]() - User's password

* `profile` [**Object**]()
  * `profile.username` [**String**]()

##### Examples
```js
const createNewUser = ({ email, password, username }) => {
  this.props.firebase.createUser(
    { email, password },
    { username, email }
  )
}

// Call with info
createNewUser({
  email: 'test@test.com',
  password: 'testest1',
  username: 'tester'
})
```

##### Returns
[**Promise**]() with `userData`

## `logout()`
Logout from Firebase and delete all data from the store (`state.firebase.data` and `state.firebase.auth` are set to `null`).

##### Examples

```js
// logout and remove profile and auth from state
firebase.logout()
```

## `resetPassword(credentials)`
Calls Firebase's `ref.resetPassword(credentials)` then adds the output into redux state under `state.firebase.authError`

##### Examples

```js
firebase.resetPassword({
  email: 'test@test.com',
  password: 'testest1',
  username: 'tester'
})
```

##### Parameters
  * `credentials` [**Object**]() - Credentials same as described in firebase docs
  * `profile` [**Object**]() - if initialized with userProfile support then profile will be saved into `${userProfile}/${auth.uid}`

##### Returns
  [**Promise**]() with user's UID in case of success or the error otherwise.
  Always authenticate the new user in case of success
