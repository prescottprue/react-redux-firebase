# requestingReducer

Reducer for requesting state. Changed by `START` and `SET` actions.

**Parameters**

-   `state` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)](default {})** Current requesting redux state
-   `action` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing the action that was dispatched

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Profile state after reduction

# dataReducer

Reducer for data state. Changed by `LOGIN`, `LOGOUT`, and `LOGIN_ERROR`
actions.

**Parameters**

-   `state` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)](default {})** Current data redux state
-   `action` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing the action that was dispatched

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Profile state after reduction

# authReducer

Reducer for auth state. Changed by `LOGIN`, `LOGOUT`, and `LOGIN_ERROR`
actions.

**Parameters**

-   `state` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)](default {})** Current auth redux state
-   `action` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing the action that was dispatched

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Profile state after reduction

# profileReducer

Reducer for profile state. Changed by `SET_PROFILE`, `LOGOUT`, and
`LOGIN_ERROR` actions.

**Parameters**

-   `state` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)](default null)** Current profile redux state
-   `action` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing the action that was dispatched

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Profile state after reduction

# isInitializingReducer

Reducer for isInitializing state. Changed by `AUTHENTICATION_INIT_STARTED`
and `AUTHENTICATION_INIT_FINISHED` actions.

**Parameters**

-   `state` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)](default false)** Current isInitializing redux state
-   `action` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing the action that was dispatched

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Profile state after reduction

# errorsReducer

Reducer for errors state. Changed by `UNAUTHORIZED_ERROR`
and `LOGOUT` actions.

**Parameters**

-   `state` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)](default \[])** Current authError redux state
-   `action` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing the action that was dispatched

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Profile state after reduction

# firebaseStateReducer

Reducer for react redux firebase. This function is called
automatically by redux every time an action is fired. Based on which action
is called and its payload, the reducer will update redux state with relevant
changes.

**Parameters**

-   `state` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Current Redux State
-   `action` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Action which will modify state
    -   `action.type` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of Action being called
    -   `action.data` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of Action which will modify state

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** State
