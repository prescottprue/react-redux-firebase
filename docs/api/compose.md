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
