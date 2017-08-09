# Authentication Methods

Authentication data is attached to `auth`, and errors are attached to `authError`. You can get them within components like so:

```js
import { connect } from 'react-redux'
import { pathToJS } from 'react-redux-firebase'
@connect(
  // Map state to props
  ({ firebase }) => ({
    authError: pathToJS(firebase, 'authError'),
    auth: pathToJS(firebase, 'auth'),
    profile: pathToJS(firebase, 'profile')
  })
)
```
If you need access to methods that are not available at the top level, you can access Firebase's Full Auth API using `this.props.firebase.auth()` or `getFirebase().auth()`.

#### NOTE
All examples below assume you have wrapped your component using `firebaseConnect`. This will make `this.props.firebase` available within your component:

###### Decorators

```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'

class SomeComponent extends Component {
  render() {
    // this.props.firebase contains API
  }
}
export default firebaseConnect()(SomeComponent)
```


## login(credentials)

##### Parameters

  * `credentials` ([**String**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [**Object**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))
    * [**String**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) - `ref.authWithCustomToken(credentials)` is used
    * [**Object**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) - cases:
      * email and password (runs `ref.authWithPassword(credentials)`) :
        ```js
        {
          email: String,
          password: String
        }
        ```
      * provider (runs `ref.authWithOAuthPopup(provider)` or `ref.authWithOAuthRedirect(provider)`) :
        ```js
        {
          provider: "facebook | google | twitter",
          type: "popup | redirect" // popup is default
        }
        ```
      * credential (runs `ref.signInWithCredential(credential)`) :
        ```js
        {
          credential : firebase.auth.AuthCredential // created using specific provider
        }
        ```
        The credential parameter is a firebase.auth.AuthCredential specific to the provider (i.e. `firebase.auth.GoogleAuthProvider.credential(null, 'some accessToken')`). For more details [please view the Firebase API reference](https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider#methods)
      * provider and token (runs `ref.authWithOAuthToken(provider, token)`) **NOTE**: *Deprecated as of v1.5.0* :
        ```js
        {
          provider: "facebook | google | twitter",
          token : String
        }
        ```


##### Returns
[**Promise**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolve with the response from firebase's login method. `profile` parameter is also included if using oAuth provider.

##### Examples

  *Email*
```js
this.props.firebase.login({
  email: 'test@test.com',
  password: 'testest1'
})
```

  *OAuth Provider Redirect*
```js
this.props.firebase.login({
  provider: 'google',
  type: 'redirect'
})
 ```

  *OAuth Provider Popup*
```js
this.props.firebase.login({
  provider: 'google',
  type: 'popup'
})
```

  *Credential*
```js
// `googleUser` from the onsuccess Google Sign In callback.
this.props.firebase.login({
  credential: firebase.auth.GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token)
})
// or using an accessToken
this.props.firebase.login({
  credential: firebase.auth.GoogleAuthProvider.credential(null, 'some access token')
})
```

  *Token*
```js
this.props.firebase.login('someJWTAuthToken')
```

## createUser(credentials, profile)

Similar to Firebase's `ref.createUser(credentials)` but with support for automatic profile setup (based on your userProfile config).

**NOTE** This does not need to be used when using external authentication providers (Firebase creates the user automatically), and is meant to be used with email authentication only.

##### Parameters

* `credentials` [**Object**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `credentials.email` [**String**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) - User's email
  * `credentials.password` [**String**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) - User's password
  * `credentials.signIn` [**String**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) - Whether or not to sign in when user is signing up (defaults to `true`)

* `profile` [**Object**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * `profile.username` [**String**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

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
[**Promise**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) with `userData`

## logout()
Logout from Firebase and delete all data from the store (`state.firebase.data` and `state.firebase.auth` are set to `null`).


Looking to preserve data on logout? [`v2.0.0` supports the `preserve` config option](http://docs.react-redux-firebase.com/history/v2.0.0/docs/api/compose.html), which preserves data under the specified keys in state on logout.

##### Examples

```js
// logout and remove profile and auth from state
firebase.logout()
```

## resetPassword(credentials)
Calls Firebase's `firebase.auth().resetPassword()`. If there is an error, it is added into redux state under `state.firebase.authError`, which can be loaded using `pathToJS(state.firebase, 'authError')`.

##### Examples

```js
firebase.resetPassword({
  email: 'test@test.com',
  password: 'testest1',
  username: 'tester'
})
```

##### Parameters
  * `credentials` [**Object**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) - Credentials same as described in firebase docs
  * `profile` [**Object**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) - if initialized with userProfile support then profile will be saved into `${userProfile}/${auth.uid}`

##### Returns
  [**Promise**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) with user's UID in case of success or the error otherwise.
  Always authenticate the new user in case of success

## confirmPasswordReset(code, newPassword)
Calls Firebase's `firebase.auth().confirmPasswordReset()`. If there is an error, it is added into redux state under `state.firebase.authError`, which can be loaded using `pathToJS(state.firebase, 'authError')`.

##### Examples

```js
firebase.confirmPasswordReset('some reset code', 'myNewPassword')
```

##### Parameters
  * `code` [**String**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) - Password reset code
  * `newPassword` [**String**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) - New password to set for user

##### Returns
  [**Promise**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## verifyPasswordResetCode(code)
Verify a password reset code from password reset email.

Calls Firebase's `firebase.auth().verifyPasswordResetCode()`. If there is an error, it is added into redux state under `state.firebase.authError`, which can be loaded using `pathToJS(state.firebase, 'authError')`.

##### Examples

```js
firebase.verifyPasswordResetCode('some reset code')
```

##### Parameters
  * `code` [**String**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) - Password reset code

##### Returns
  [**Promise**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) - Email associated with reset code
