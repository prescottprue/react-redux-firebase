# props.firebase
`props.firebase` can be accessed on a component by wrapping it with the `firebaseConnect` higher order component like so:

```js
import { firebaseConnect } from 'react-redux-firebase'

export default firebaseConnect()(SomeComponent)

// or with decorators

@firebaseConnect()
export default class SomeComponent extends Component {

}
```

## set

Sets data to Firebase.

**Parameters**

-   `path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to location on Firebase which to set
-   `value` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \| [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))** Value to write to Firebase
-   `onComplete` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to run on complete (`not required`)

**Examples**

_Basic_

```javascript
import React, { Component, PropTypes } from 'react'
import { firebaseConnect } from 'react-redux-firebase'
const Example = ({ firebase: { set } }) => (
  <button onClick={() => set('some/path', { here: 'is a value' })}>
    Set To Firebase
  </button>
)
export default firebaseConnect()(Example)
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing reference snapshot

## push

Pushes data to Firebase.

**Parameters**

-   `path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to location on Firebase which to push
-   `value` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \| [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))** Value to push to Firebase
-   `onComplete` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to run on complete (`not required`)

**Examples**

_Basic_

```javascript
import React, { Component, PropTypes } from 'react'
import { firebaseConnect } from 'react-redux-firebase'
const Example = ({ firebase: { push } }) => (
  <button onClick={() => push('some/path', true)}>
    Push To Firebase
  </button>
)
export default firebaseConnect()(Example)
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing reference snapshot

## update

Updates data on Firebase and sends new data.

**Parameters**

-   `path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to location on Firebase which to update
-   `value` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \| [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))** Value to update to Firebase
-   `onComplete` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to run on complete (`not required`)

**Examples**

_Basic_

```javascript
import React, { Component, PropTypes } from 'react'
import { firebaseConnect } from 'react-redux-firebase'
const Example = ({ firebase: { update } }) => (
  <button onClick={() => update('some/path', { here: 'is a value' })}>
    Update To Firebase
  </button>
)
export default firebaseConnect()(Example)
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing reference snapshot

## remove

Removes data from Firebase at a given path.

**Parameters**

-   `path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to location on Firebase which to remove
-   `onComplete` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to run on complete (`not required`)

**Examples**

_Basic_

```javascript
import React, { Component, PropTypes } from 'react'
import { firebaseConnect } from 'react-redux-firebase'
const Example = ({ firebase: { remove } }) => (
  <button onClick={() => remove('some/path')}>
    Remove From Firebase
  </button>
)
export default firebaseConnect()(Example)
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing reference snapshot

## uniqueSet

Sets data to Firebase only if the path does not already
exist, otherwise it rejects.

**Parameters**

-   `path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to location on Firebase which to set
-   `value` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \| [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))** Value to write to Firebase
-   `onComplete` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to run on complete (`not required`)

**Examples**

_Basic_

```javascript
import React, { Component, PropTypes } from 'react'
import { firebaseConnect } from 'react-redux-firebase'
const Example = ({ firebase: { uniqueSet } }) => (
  <button onClick={() => uniqueSet('some/unique/path', true)}>
    Unique Set To Firebase
  </button>
)
export default firebaseConnect()(Example)
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing reference snapshot

## uploadFile

Upload a file to Firebase Storage with the option to store
its metadata in Firebase Database

**Parameters**

-   `path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to location on Firebase which to set
-   `file` **File** File object to upload (usually first element from
    array output of select-file or a drag/drop `onDrop`)
-   `dbPath` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Database path to place uploaded file metadata

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing the File object

## uploadFiles

Upload multiple files to Firebase Storage with the option
to store their metadata in Firebase Database

**Parameters**

-   `path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to location on Firebase which to set
-   `files` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array of File objects to upload (usually from
    a select-file or a drag/drop `onDrop`)
-   `dbPath` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Database path to place uploaded files metadata.

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing an array of File objects

## deleteFile

Delete a file from Firebase Storage with the option to
remove its metadata in Firebase Database

**Parameters**

-   `path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to location on Firebase which to set
-   `dbPath` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Database path to place uploaded file metadata

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing the File object

## watchEvent

Watch event. **Note:** this method is used internally
so examples have not yet been created, and it may not work as expected.

**Parameters**

-   `type` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of watch event
-   `dbPath` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Database path on which to setup watch event
-   `path`  
-   `storeAs` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of listener results within redux store

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)**

## unWatchEvent

Unset a listener watch event. **Note:** this method is used
internally so examples have not yet been created, and it may not work
as expected.

**Parameters**

-   `eventName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of watch event
-   `eventPath` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Database path on which to setup watch event
-   `storeAs` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of listener results within redux store
-   `queryId`   (optional, default `undefined`)

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)**

## login

Logs user into Firebase. For examples, visit the [auth section](/docs/auth.md)

**Parameters**

-   `credentials` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Credentials for authenticating
    -   `credentials.provider` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** External provider (google | facebook | twitter)
    -   `credentials.type` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of external authentication (popup | redirect) (only used with provider)
    -   `credentials.email` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Credentials for authenticating
    -   `credentials.password` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Credentials for authenticating (only used with email)

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing user's auth data

## logout

Logs user out of Firebase and empties firebase state from
redux store

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)**

## createUser

Creates a new user in Firebase authentication. If
`userProfile` config option is set, user profiles will be set to this
location.

**Parameters**

-   `credentials` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Credentials for authenticating
    -   `credentials.email` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Credentials for authenticating
    -   `credentials.password` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Credentials for authenticating (only used with email)
-   `profile` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Data to include within new user profile

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing user's auth data

## resetPassword

Sends password reset email

**Parameters**

-   `credentials` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Credentials for authenticating
    -   `credentials.email` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Credentials for authenticating

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)**

## confirmPasswordReset

Confirm that a user's password has been reset

**Parameters**

-   `code` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Password reset code to verify
-   `password` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** New Password to confirm reset to

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)**

## verifyPasswordResetCode

Verify that a password reset code from a password reset
email is valid

**Parameters**

-   `code` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Password reset code to verify

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing user auth info

## ref

Firebase ref function

Returns [**database.Reference**](https://firebase.google.com/docs/reference/js/firebase.database.Reference) Firebase database reference

## database

Firebase database service instance including all Firebase storage methods

Returns [**Database**](https://firebase.google.com/docs/reference/js/firebase.database.Database) Firebase database service

## storage

Firebase storage service instance including all Firebase storage methods

Returns [**Storage**](https://firebase.google.com/docs/reference/js/firebase.storage.Storage) Firebase storage service

## auth

Firebase auth service instance including all Firebase auth methods

Returns [**Auth**](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
