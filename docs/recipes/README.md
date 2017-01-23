# Recipes

This section includes some recipes for using react-redux-firebase within real applications.

## [Profile](/docs/recipes/profile.md)
Recipes for using/modifying built in profile handling.

#### Examples
* Enable User profiles
* Change Profile Format


## [Upload](/docs/recipes/upload.md)
Actions for uploading files with Firebase storage including `uploadFiles` and `uploadFile` as well as direct access to `Firebase.storage()`.

#### Examples
* Upload Files
* Upload a String as a file

## [Actions](/docs/recipes/actions.md)

Standard actions for interacting with Firebase including `push`, `set`, `uniqueSet`, `update`, and `remove`.

#### Examples
* Write data
* Remove Data
* Writing key from a push to another location
* Writing to multiple locations

## [Thunks](/docs/recipes/thunks.md)

Actions that dispatch other actions and have access to redux state

#### Examples
* Async API Calls (`REST` or Javascript API)
* Actions based on state (including browser history)
* Displaying error after invalid write attempt

## [Epics](/docs/recipes/epics.md)

Middleware that listens for Actions and dispatches other, often async, actions.

#### Examples
* Debounced persisting of user input: Listen for typing actions from `redux-form` -> call `firebase.update()`
* Throttled/Debounced API calls
* Displaying a system wide error: Listen for error actions -> display error message
