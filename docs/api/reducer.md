# firebaseStateReducer

Reducer for react redux firebase. This function is called
automatically by redux every time an action is fired. Based on which action
is called and its payload, the reducer will update redux state with relevant
changes.

**Parameters**

-   `state` **[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)** Current Redux State
-   `action` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Action which will modify state
    -   `action.type` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of Action being called
    -   `action.data` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of Action which will modify state

Returns **[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)** Redux State.
