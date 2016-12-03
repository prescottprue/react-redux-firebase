# Authentication Methods

Authentication data is attached to `auth`, and errors are attached to `authError`. You can get them within components like so:

```js
import { connect } from 'react-redux'
import { helpers } from 'redux-firebasev3'
const { pathToJS } = helpers
@connect(
  // Map state to props
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
    auth: pathToJS(firebase, 'auth'),
    profile: pathToJS(firebase, 'profile')
  })
)
```

**NOTE**
All examples below assume you have placed the following at the beginning of your component:
```js
import { connect } from 'react-redux'
import { firebase } from 'redux-firebasev3'
@firebase()
class SomeComponent extends Component {

}
```
## `login(credentials)`

##### Arguments

- `credentials` (*String or Object*) If String then `ref.authWithCustomToken(credentials)` is used . If object then following cases:
- with provider `ref.authWithOAuthPopup(provider)` or `ref.authWithOAuthRedirect(provider)`
```js
{
    provider: "facebook | google | twitter",
    type: "popup | redirect", // redirect is default
}
```
- with provider and token `ref.authWithOAuthToken(provider, token)`
```js
{
    provider: "facebook | google | twitter",
    token : String
}
```
- with email and password `ref.authWithPassword(credentials)`
```js
{
    email: String
    password: String
}
```

##### Return

Return a promise with authData in case of success or the error otherwise.

##### Example

  ```js
  // Call with info
  this.props.firebase.login({
    email: 'test@test'com,
    password: 'testest1'
  })
  ```


## `createUser(credentials, profile)`
Similar to Firebase's `ref.createUser(credentials)` but with support for automatic profile setup (based on your userProfile config). 

##### Arguments

- `credentials` (Object*)

```js
{
    email: String
    password: String
}
```

- `profile` (Object*) 

```js
{
    username: String,
    anyKey: String,
    orValue: Boolean
}
```

##### Example
```js
const createNewUser = ({email, password, username }) => {
  this.props.firebase.createUser({ email, password }, { username, email })
}

// Call with info
createNewUser({
  email: 'test@test.com',
  password: 'testest1',
  username: 'tester'
})
```


## `logout()`
Logout from Firebase and delete all data from the store (`store.state.firebase.data`).

`store.state.firebase.auth` is set to `null`

##### Example
```js
firebase.logout()
```

## `resetPassword(credentials)`
Short for `ref.resetPassword(credentials)` and set the output in `store.state.firebase.authError`

##### Example
```js
firebase.resetPassword({email: 'test@test'com, password: 'testest1', username: 'tester'})
```
##### Arguments
- `credentials` same as firebase docs
- `profile` if initialized with userProfile support then profile will be saved into `${userProfile}/${auth.uid}`

##### Return
Return a promise with user's uid in case of success or the error otherwise.
Always authenticate the new user in case of success

