# Authentication Methods

Authentication data is attached to `state.firebase.auth`, profile is attached to `state.firebase.profile` if you provide a value to the `userProfile` config option. You can get them within components like so:

```js
import { connect } from 'react-redux'

const enhance = connect(
  // Map redux state to component props
  ({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })
)

enhance(SomeComponent)
```

If you need access to methods that are not available at the top level, you can access Firebase's Full Auth API using `props.firebase.auth()`

#### Custom Claims

 Firebase has a secure way of identifying and making claims about users with [custom claims](https://firebase.google.com/docs/auth/admin/custom-claims). This is a good way to provide roles for users.

 If `enableClaims` config option is used along with `userProfile` you will find custom claims in `state.firebase.profile.token.claims`. 

 **Note**: If a claim is added to a user who is already logged in those changes will not necessarily be propagated to the client. In order to assure the change is observed, use a `refreshToken` property in your `userProfile` collection and update it's value after the custom claim has been added. Because `react-redux-firebase` watches for profile changes, the custom claim will be fetched along with the `refreshToken` update.

For examples of how to use this API, checkout the [auth recipes section](/docs/recipes/auth.html).

## login(credentials) and reauthenticate(credentials)

##### Parameters for login

  * `credentials` ([**Object**][object-url])
    * [**Object**][object-url] - cases:
      * - email and password (runs `ref.authWithPassword(credentials)`) :
        ```js
        {
          email: String,
          password: String
        }
        ```
      * provider (runs `ref.authWithOAuthPopup(provider)` or `ref.authWithOAuthRedirect(provider)`) :
        ```js
        {
          provider: "facebook | google | twitter | microsoft.com",
          type: "popup | redirect", // popup is default
          scopes: Array // email is default
        }
        ```
      * credential (runs `ref.signInWithCredential(credential)`) :
        ```js
        {
          credential: firebase.auth.AuthCredential // created using specific provider
        }
        ```
        The credential parameter is a firebase.auth.AuthCredential specific to the provider (i.e. `firebase.auth.GoogleAuthProvider.credential(null, 'some accessToken')`). For more details [please view the Firebase API reference](https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider#methods)
      * provider and token (runs `ref.authWithOAuthToken(provider, token)`) **NOTE**: *Deprecated as of v1.5.0* :
        ```js
        {
          provider: "facebook | google | twitter | microsoft.com",
          token : String
        }
        ```
      * custom token (runs `ref.authWithCustomToken(credentials)`). `profile` is required if automatic profile creation is enabled (which it is by default if you are using `userProfile`). `config.updateProfileOnLogin` config option can be set to `false` in order to prevent this behavior.
        ```js
        {
          token : String,
          profile: Object // required (optional if updateProfileOnLogin: false config set)
        }
        ```
      * phone number (runs `ref.signInWithPhoneNumber(phoneNumber, applicationVerifier)`). Automatic profile creation is enabled by default if you are using the `userProfile` config option. `updateProfileOnLogin` config option can be set to `false` in order to prevent this behavior.
        ```js
        {
          phoneNumber: String,
          applicationVerifier: firebase.auth.ApplicationVerifier
        }
        ```

##### Parameters for reauthenticate

  * `credentials` ([**Object**][object-url])
    * [**Object**][object-url] - cases:
      * provider (runs `ref.reauthenticateWithPopup(provider)` or `ref.reauthenticateWithRedirect(provider)`) :
        ```js
        {
          provider: "facebook | google | twitter | microsoft.com",
          type: "popup | redirect", // popup is default
          scopes: Array // email is default
        }
        ```
      * credential (runs `ref.reauthenticateWithCredential(credential)`) :
        ```js
        {
          credential: firebase.auth.AuthCredential // created using specific provider
        }
        ```
        The credential parameter is a firebase.auth.AuthCredential specific to the provider (i.e. `firebase.auth.GoogleAuthProvider.credential(null)`). For more details [please view the Firebase API reference](https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider#methods)
      * phone number (runs `ref.reauthenticateWithPhoneNumber(phoneNumber, applicationVerifier)`). Automatic profile creation is enabled by default if you are using the `userProfile` config option. `updateProfileOnLogin` config option can be set to `false` in order to prevent this behavior.
        ```js
        {
          phoneNumber: String,
          applicationVerifier: firebase.auth.ApplicationVerifier
        }
        ```

##### Returns

[**Promise**][promise-url] that resolves with the response from firebase's login method (an [**Object**][object-url]). `credential` property is also included if using oAuth provider.

**NOTE**: For email authentication in `v1.4.*` and earlier - The user's UID (a [**String**][string-url]) is returned instead of an object. This has been changed in `v1.5.0` for consistency across all auth types.

##### Examples

  *Email*
```js
firebase.login({
  email: 'test@test.com',
  password: 'testest1'
})
```

  *OAuth Provider Redirect*
```js
firebase.login({
  provider: 'google',
  type: 'redirect'
})
 ```

  *OAuth Provider Popup*
```js
firebase.login({
  provider: 'google',
  type: 'popup',
  // scopes: ['email'] // not required
})
```

  *Credential*
```js
// `googleUser` from the onsuccess Google Sign In callback
firebase.login({
  credential: firebase.auth.GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token)
})
// or using an accessToken
firebase.login({
  credential: firebase.auth.GoogleAuthProvider.credential(null, 'some access token')
})
// or using reauthenticate
firebase.reauthenticate({
  credential: firebase.auth.GoogleAuthProvider.credential(null, 'some access token')
})
```

  *Token*
```js
firebase.login({
  token: 'someJWTAuthToken',
  profile: { email: 'rick@sanchez.com' }
})
```
  
  *Expo/react-native Facebook Login*
```js
async function loginWithFacebook() {
  const data = await Expo.Facebook.logInWithReadPermissionsAsync('FB_ID', { permissions: ['public_profile', 'email'] })

  if (data.type === 'success') {
    const credential = firebase.auth.FacebookAuthProvider.credential(data.token)
    await firebase.login({ credential })
  }
}
```

After logging in, profile and auth are available in redux state:

```js
import { connect } from 'react-redux'

connect((state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
}))(SomeComponent)
```

For more information on how best to use these methods, visit the [auth recipes](/docs/recipes/auth.md)

## createUser(credentials, profile)

Similar to Firebase's `ref.createUser(credentials)` but with support for automatic profile setup (based on your userProfile config).

**NOTE** This does not need to be used when using external authentication providers (Firebase creates the user automatically), and is meant to be used with email authentication only.

##### Parameters

* `credentials` [**Object**][object-url]
  * `credentials.email` [**String**][string-url] - User's email
  * `credentials.password` [**String**][string-url] - User's password

* `profile` [**Object**][object-url]
  * `profile.username` [**String**][string-url]

##### Examples
```js
const createNewUser = ({ email, password, username }) => {
  firebase.createUser(
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

[**Promise**][promise-url] with `userData`

## logout()
Logout from Firebase and delete all data from the store (`state.firebase.data` and `state.firebase.auth` are set to `null`).

Looking to preserve data on logout? [checkout the `preserve` config option](/docs/api/contants), which preserves data under the specified keys in state on logout.

##### Examples

```js
// logout and remove profile and auth from state
props.firebase.logout()
```

## resetPassword(email)
Calls Firebase's `firebase.auth().resetPassword()`. If there is an error, it is added into redux state under `state.firebase.authError`.

##### Examples

```js
props.firebase.resetPassword('test@test.com')
```

##### Parameters
  * `email` [**String**][string-url] - Email to send recovery email to

##### Returns
  [**Promise**][promise-url] with user's UID in case of success or the error otherwise.
  Always authenticate the new user in case of success

## confirmPasswordReset(code, newPassword)
Calls Firebase's `firebase.auth().confirmPasswordReset()`. If there is an error, it is added into redux state under `state.firebase.authError`.

##### Examples

```js
props.firebase.confirmPasswordReset('some reset code', 'myNewPassword')
```

##### Parameters
  * `code` [**String**][string-url] - Password reset code
  * `newPassword` [**String**][string-url] - New password to set for user

##### Returns
  [**Promise**][promise-url]

## verifyPasswordResetCode(code)
Verify a password reset code from password reset email.

Calls Firebase's `firebase.auth().verifyPasswordResetCode()`. If there is an error, it is added into redux state under `state.firebase.authError`.

##### Examples

```js
props.firebase.verifyPasswordResetCode('some reset code')
```

##### Parameters
  * `code` [**String**][string-url] - Password reset code

##### Returns
  [**Promise**][promise-url] - Email associated with reset code


## signInWithPhoneNumber(code)

Signs in using a phone number in an async pattern (i.e. requires calling a second method). Calls Firebase's [`firebase.auth().signInWithPhoneNumber()`](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithPhoneNumber). If there is an error, it is added into redux state under `state.firebase.authError`.

From Firebase's docs:

> Asynchronously signs in using a phone number. This method sends a code via SMS to the given phone number, and returns a [firebase.auth.ConfirmationResult](https://firebase.google.com/docs/reference/js/firebase.auth.ConfirmationResult.html). After the user provides the code sent to their phone, call [firebase.auth.ConfirmationResult#confirm](https://firebase.google.com/docs/reference/js/firebase.auth.ConfirmationResult.html#confirm) with the code to sign the user in.

For more info, check out the following:
* [Firebase's phone-auth guide](https://firebase.google.com/docs/auth/web/phone-auth)
* [Firebase's auth docs reference for signInWithPhoneNumber](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithPhoneNumber)

##### Examples

```js
const phoneNumber = "+11234567899" // for US number (123) 456-7899
const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
  'size': 'invisible',
});
firebase.signInWithPhoneNumber(phoneNumber, appVerifier)
  .then((confirmationResult) => {
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    const verificationCode = window.prompt('Please enter the verification ' +
        'code that was sent to your mobile device.');
    return confirmationResult.confirm(verificationCode);
  })
  .catch((error) => {
    // Error; SMS not sent
    // Handle Errors Here
    return Promise.reject(error)
  });
```

##### Parameters
  * `phoneNumber` [**String**][string-url] - The user's phone number in E.164 format (e.g. `+16505550101`).
  * `applicationVerifier` [**firebase.auth.ApplicationVerifier**][firebase-app-verifier] `required` - App verifier made with Firebase's `RecaptchaVerifier`

##### Returns
  [**Promise**][promise-url] - Resolves with [firebase.auth.ConfirmationResult](https://firebase.google.com/docs/reference/js/firebase.auth.ConfirmationResult.html)


[promise-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[string-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[object-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[firebase-app-verifier]: https://firebase.google.com/docs/reference/js/firebase.auth.ApplicationVerifier.html
