# actionsPrefix

Prefix for all actions within library

**Examples**

```javascript
import { constants } from 'react-redux-firebase'
constants.actionsPrefix === '@@reactReduxFirebase' // true
```

# actionTypes

Object containing all action types

**Properties**

-   `START` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/START`
-   `SET` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/SET`
-   `SET_ORDERED` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/SET_ORDERED`
-   `SET_PROFILE` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/SET_PROFILE`
-   `LOGIN` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/LOGIN`
-   `LOGOUT` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/LOGOUT`
-   `LOGIN_ERROR` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/LOGIN_ERROR`
-   `NO_VALUE` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/NO_VALUE`
-   `UNAUTHORIZED_ERROR` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/UNAUTHORIZED_ERROR`
-   `UNSET_LISTENER` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/UNSET_LISTENER`
-   `AUTHENTICATION_INIT_STARTED` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/AUTHENTICATION_INIT_STARTED`
-   `AUTHENTICATION_INIT_FINISHED` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/AUTHENTICATION_INIT_FINISHED`
-   `FILE_UPLOAD_START` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/FILE_UPLOAD_START`
-   `FILE_UPLOAD_ERROR` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/FILE_UPLOAD_ERROR`
-   `FILE_UPLOAD_PROGRESS` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/FILE_UPLOAD_PROGRESS`
-   `FILE_UPLOAD_COMPLETE` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/FILE_UPLOAD_COMPLETE`
-   `FILE_DELETE_START` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/FILE_DELETE_START`
-   `FILE_DELETE_ERROR` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/FILE_DELETE_ERROR`
-   `FILE_DELETE_COMPLETE` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/FILE_DELETE_COMPLETE`
-   `AUTH_UPDATE_START` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/AUTH_UPDATE_START`
-   `AUTH_UPDATE_ERROR` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/AUTH_UPDATE_ERROR`
-   `AUTH_UPDATE_COMPLETE` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/AUTH_UPDATE_COMPLETE`
-   `PROFILE_UPDATE_START` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/PROFILE_UPDATE_START`
-   `PROFILE_UPDATE_ERROR` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/PROFILE_UPDATE_ERROR`
-   `PROFILE_UPDATE_COMPLETE` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/PROFILE_UPDATE_COMPLETE`
-   `EMAIL_UPDATE_START` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/EMAIL_UPDATE_START`
-   `EMAIL_UPDATE_ERROR` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/EMAIL_UPDATE_ERROR`
-   `EMAIL_UPDATE_COMPLETE` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `@@reactReduxFirebase/EMAIL_UPDATE_COMPLETE`

**Examples**

```javascript
import { actionTypes } from 'react-redux-firebase'
actionTypes.SET === '@@reactReduxFirebase/SET' // true
```

# defaultConfig

Default configuration options

**Properties**

-   `userProfile` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `null` Location on Firebase where user
    profiles are stored. Often set to `'users'`.
-   `enableLogging` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** `false` Whether or not firebase
    database logging is enabled.
-   `updateProfileOnLogin` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** `true` Whether or not to update
    user profile when logging in.
-   `enableRedirectHandling` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** `true` Whether or not to enable
    redirect handling. This must be disabled if environment is not http/https
    such as with react-native.
-   `enableEmptyAuthChanges` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** `false` Whether or not to enable
    empty auth changes. When set to true, `onAuthStateChanged` will be fired with,
    empty auth changes such as `undefined` on initialization
    (see [#137](https://github.com/prescottprue/react-redux-firebase/issues/137)).
    Requires `v1.5.0-alpha` or higher.
-   `autoPopulateProfile` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** `true` Whether or not to
    automatically populate profile with data loaded through
    profileParamsToPopulate config.
-   `setProfilePopulateResults` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** `true` Whether or not to
    call SET actions for data that results from populating profile to redux under
    the data path. For example: role paramter on profile populated from 'roles'
    root. True will call SET_PROFILE as well as a SET action with the role that
    is loaded (places it in data/roles).
-   `dispatchOnUnsetListener` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** `false` Whether or not to
    dispatch UNSET_LISTENER when disabling listeners for a specific path. USE WITH CAUTION
    Setting this to true allows an action to be called that removes data
    from redux (which might not always be expected).
