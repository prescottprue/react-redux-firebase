# Recipes

This section includes some recipes for using react-redux-firebase within real applications.

## Actions

Standard actions for interacting with Firebase including `push`, `set`, `uniqueSet`, `update`, and `remove`.

#### Examples
* Write data
* Remove Data
* Writing key from a push to another location
* Writing to multiple locations

## Thunks

Actions that dispatch other actions and have access to redux state

#### Examples
* Async API Calls (`REST` or Javascript API)
* Actions based on state (including browser history)
* Displaying error after invalid write attempt

## Epics

Middleware that listens for Actions and dispatches other, often async, actions.

#### Examples
* Debounced persisting of user input: Listen for typing actions from `redux-form` -> call `firebase.update()`
* Throttled/Debouced API calls
* Displaying a system wide error: Listen for error actions -> display error message
