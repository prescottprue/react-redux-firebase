# isInitializingReducer

Reducer for isInitializing state. Changed by `AUTHENTICATION_INIT_STARTED`
and `AUTHENTICATION_INIT_FINISHED` actions.

**Parameters**

-   `state` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** Current isInitializing redux state (optional, default `false`)
-   `action` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing the action that was dispatched
    -   `action.type` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of action that was dispatched

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Profile state after reduction

# requestingReducer

Reducer for requesting state.Changed by `START`, `NO_VALUE`, and `SET` actions.

**Parameters**

-   `state` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** Current requesting redux state (optional, default `{}`)
-   `action` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing the action that was dispatched
    -   `action.type` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of action that was dispatched
    -   `action.path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path of action that was dispatched
-   `$1` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `$1.type`  
    -   `$1.path`  

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Profile state after reduction

# requestedReducer

Reducer for requested state. Changed by `START`, `NO_VALUE`, and `SET` actions.

**Parameters**

-   `state` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** Current requested redux state (optional, default `{}`)
-   `action` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing the action that was dispatched
    -   `action.type` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of action that was dispatched
    -   `action.path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path of action that was dispatched
-   `$1` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `$1.type`  
    -   `$1.path`  

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Profile state after reduction

# timestampsReducer

Reducer for timestamps state. Changed by `START`, `NO_VALUE`, and `SET` actions.

**Parameters**

-   `state` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** Current timestamps redux state (optional, default `{}`)
-   `action` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing the action that was dispatched
    -   `action.type` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of action that was dispatched
    -   `action.path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path of action that was dispatched
-   `$1` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `$1.type`  
    -   `$1.path`  

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Profile state after reduction

# authReducer

Reducer for auth state. Changed by `LOGIN`, `LOGOUT`, and `LOGIN_ERROR` actions.

**Parameters**

-   `state` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** Current auth redux state (optional, default `{isLoaded:false}`)
-   `action` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing the action that was dispatched
    -   `action.type` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of action that was dispatched

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Profile state after reduction

# profileReducer

Reducer for profile state. Changed by `SET_PROFILE`, `LOGOUT`, and
`LOGIN_ERROR` actions.

**Parameters**

-   `state` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** Current profile redux state (optional, default `{isLoaded:false}`)
-   `action` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing the action that was dispatched
    -   `action.type` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of action that was dispatched

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Profile state after reduction

# errorsReducer

Reducer for errors state. Changed by `UNAUTHORIZED_ERROR`
and `LOGOUT` actions.

**Parameters**

-   `state` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** Current authError redux state (optional, default `[]`)
-   `action` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing the action that was dispatched
    -   `action.type` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of action that was dispatched

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Profile state after reduction

# listenersReducer

Reducer for listeners state. Changed by `UNAUTHORIZED_ERROR`
and `LOGOUT` actions.

**Parameters**

-   `state` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** Current authError redux state (optional, default `[]`)
-   `action` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing the action that was dispatched
    -   `action.type` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of action that was dispatched

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Profile state after reduction

# dataReducer

Reducer for data state. Changed by `SET`, `SET_ORDERED`,`NO_VALUE`, and
`LOGOUT` actions.

**Parameters**

-   `state` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** Current data redux state (optional, default `{}`)
-   `action` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing the action that was dispatched
    -   `action.type` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of action that was dispatched
    -   `action.path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path of action that was dispatched

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Data state after reduction

# orderedReducer

Reducer for ordered state. Changed by `SET`, `SET_ORDERED`,`NO_VALUE`, and
`LOGOUT` actions.

**Parameters**

-   `state` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** Current data redux state (optional, default `{}`)
-   `action` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing the action that was dispatched
    -   `action.type` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of action that was dispatched
    -   `action.path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path of action that was dispatched

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Data state after reduction

# firebaseStateReducer

Reducer for react redux firebase. This function is called
automatically by redux every time an action is fired. Based on which action
is called and its payload, the reducer will update redux state with relevant
changes.

**Parameters**

-   `state` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Current Redux State
-   `action` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Action which will modify state
    -   `action.type` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of Action being called
    -   `action.path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path of action that was dispatched
    -   `action.data` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Data associated with action

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Firebase redux state
