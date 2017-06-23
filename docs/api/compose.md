# reactReduxFirebase

Middleware that handles configuration (placed in redux's
`compose` call)

**Properties**

-   `fbConfig` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing Firebase config including
    databaseURL or Firebase instance
    -   `fbConfig.apiKey` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Firebase apiKey
    -   `fbConfig.authDomain` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Firebase auth domain
    -   `fbConfig.databaseURL` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Firebase database url
    -   `fbConfig.storageBucket` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Firebase storage bucket
-   `config` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Containing react-redux-firebase specific config
    such as userProfile
    -   `config.userProfile` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Location on firebase to store user
        profiles
    -   `config.enableLogging` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether or not to enable Firebase
        database logging
    -   `config.updateProfileOnLogin` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether or not to update
        profile when logging in. (default: `false`)
    -   `config.enableRedirectHandling` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether or not to enable
        auth redirect handling listener. (default: `true`)
    -   `config.onAuthStateChanged` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function run when auth state
        changes. Argument Pattern: `(authData, firebase, dispatch)`
    -   `config.enableEmptyAuthChanges` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether or not to enable
        empty auth changes. When set to true, `onAuthStateChanged` will be fired with,
        empty auth changes such as undefined on initialization. See
        [#137](https://github.com/prescottprue/react-redux-firebase/issues/137) for
        more details. (default: `false`)
    -   `config.onRedirectResult` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function run when redirect
        result is returned. Argument Pattern: `(authData, firebase, dispatch)`
    -   `config.customAuthParameters` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object for setting which
        customAuthParameters are passed to external auth providers.
    -   `config.profileFactory` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Factory for modifying how user
        profile is saved.
    -   `config.uploadFileDataFactory` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Factory for modifying
        how file meta data is written during file uploads
    -   `config.profileParamsToPopulate` **([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** Parameters within
        profile object to populate
    -   `config.autoPopulateProfile` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether or not to
        automatically populate profile with data loaded through
        profileParamsToPopulate config. (default: `true`)
    -   `config.setProfilePopulateResults` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether or not to
        call SET actions for data that results from populating profile to redux under
        the data path. For example: role paramter on profile populated from 'roles'
        root. True will call SET_PROFILE as well as a SET action with the role that
        is loaded (places it in data/roles). (default: `false`)

**Examples**

_Setup_

```javascript
import { createStore, compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'

// React Redux Firebase Config
const config = {
  userProfile: 'users', // saves user profiles to '/users' on Firebase
  // here is where you place other config options
}

// Add react-redux-firebase to compose
// Note: In full projects this will often be within createStore.js or store.js
const createStoreWithFirebase = compose(
 reactReduxFirebase(fbConfig, config),
)(createStore)

// Use Function later to create store
const store = createStoreWithFirebase(rootReducer, initialState)
```

_Custom Auth Parameters_

```javascript
// Follow Setup example with the following config:
const config = {
  customAuthParameters: {
     google: {
       // prompts user to select account on every google login
       prompt: 'select_account'
     }
  }
}
```

Returns **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** That accepts a component a returns a wrapped version of component

# set

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

# setWithMeta

Sets data to Firebase along with meta data. Currently,
this includes createdAt and createdBy. _Warning_ using this function
may have unintented consequences (setting createdAt even if data already
exists)

**Parameters**

-   `path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to location on Firebase which to set
-   `value` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \| [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))** Value to write to Firebase
-   `onComplete` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to run on complete (`not required`)

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing reference snapshot

# push

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

# pushWithMeta

Pushes data to Firebase along with meta data. Currently,
this includes createdAt and createdBy.

**Parameters**

-   `path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to location on Firebase which to set
-   `value` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \| [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))** Value to write to Firebase
-   `onComplete` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to run on complete (`not required`)

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing reference snapshot

# update

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

# updateWithMeta

Updates data on Firebase along with meta. _Warning_
using this function may have unintented consequences (setting
createdAt even if data already exists)

**Parameters**

-   `path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to location on Firebase which to update
-   `value` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \| [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))** Value to update to Firebase
-   `onComplete` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to run on complete (`not required`)

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing reference snapshot

# remove

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

# uniqueSet

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

# uploadFile

Upload a file to Firebase Storage with the option to store
its metadata in Firebase Database

**Parameters**

-   `path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to location on Firebase which to set
-   `file` **File** File object to upload (usually first element from
    array output of select-file or a drag/drop `onDrop`)
-   `dbPath` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Database path to place uploaded file metadata

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing the File object

# uploadFiles

Upload multiple files to Firebase Storage with the option
to store their metadata in Firebase Database

**Parameters**

-   `path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to location on Firebase which to set
-   `files` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array of File objects to upload (usually from
    a select-file or a drag/drop `onDrop`)
-   `dbPath` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Database path to place uploaded files metadata.

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing an array of File objects

# deleteFile

Delete a file from Firebase Storage with the option to
remove its metadata in Firebase Database

**Parameters**

-   `path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path to location on Firebase which to set
-   `dbPath` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Database path to place uploaded file metadata

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing the File object

# watchEvent

Watch event. **Note:** this method is used internally
so examples have not yet been created, and it may not work as expected.

**Parameters**

-   `type` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of watch event
-   `dbPath` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Database path on which to setup watch event
-   `path`  
-   `storeAs` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of listener results within redux store

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

# unWatchEvent

Unset a listener watch event. **Note:** this method is used
internally so examples have not yet been created, and it may not work
as expected.

**Parameters**

-   `eventName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of watch event
-   `eventPath` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Database path on which to setup watch event
-   `storeAs` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of listener results within redux store
-   `queryId`   (optional, default `undefined`)

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

# login

Logs user into Firebase. For examples, visit the [auth section](/docs/auth.md)

**Parameters**

-   `credentials` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Credentials for authenticating
    -   `credentials.provider` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** External provider (google | facebook | twitter)
    -   `credentials.type` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of external authentication (popup | redirect) (only used with provider)
    -   `credentials.email` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Credentials for authenticating
    -   `credentials.password` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Credentials for authenticating (only used with email)

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing user's auth data

# logout

Logs user out of Firebase and empties firebase state from
redux store

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

# createUser

Creates a new user in Firebase authentication. If
`userProfile` config option is set, user profiles will be set to this
location.

**Parameters**

-   `credentials` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Credentials for authenticating
    -   `credentials.email` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Credentials for authenticating
    -   `credentials.password` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Credentials for authenticating (only used with email)
-   `profile` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Data to include within new user profile

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing user's auth data

# resetPassword

Sends password reset email

**Parameters**

-   `credentials` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Credentials for authenticating
    -   `credentials.email` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Credentials for authenticating

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

# confirmPasswordReset

Confirm that a user's password has been reset

**Parameters**

-   `code` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Password reset code to verify
-   `password` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** New Password to confirm reset to

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

# verifyPasswordResetCode

Verify that a password reset code from a password reset
email is valid

**Parameters**

-   `code` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Password reset code to verify

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Containing user auth info

# ref

Firebase ref function

Returns **database.Reference** 

# database

Firebase database service instance including all Firebase storage methods

Returns **Database** Firebase database service

# storage

Firebase storage service instance including all Firebase storage methods

Returns **Storage** Firebase storage service

# auth

Firebase auth service instance including all Firebase auth methods

Returns **Auth** 

# getFirebase

Expose Firebase instance created internally. Useful for
integrations into external libraries such as redux-thunk and redux-observable.

**Examples**

_redux-thunk integration_

```javascript
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase } from 'react-redux-firebase';
import makeRootReducer from './reducers';
import { getFirebase } from 'react-redux-firebase';

const fbConfig = {} // your firebase config

const store = createStore(
  makeRootReducer(),
  initialState,
  compose(
    applyMiddleware([
      // Pass getFirebase function as extra argument
      thunk.withExtraArgument(getFirebase)
    ]),
    reactReduxFirebase(fbConfig)
  )
);
// then later
export const addTodo = (newTodo) =>
 (dispatch, getState, getFirebase) => {
   const firebase = getFirebase()
   firebase
     .push('todos', newTodo)
     .then(() => {
       dispatch({ type: 'SOME_ACTION' })
     })
};
```
