# API Reference

Just like [redux](http://redux.js.org/docs/api/index.html), the react-redux-firebase API surface is intentionally as small as possible.

## Top-Level Exports
* [firebaseConnect](/docs/api/firebaseConnect.md#firebaseconnect)
* [firestoreConnect](/docs/api/firestoreConnect.md#firebaseconnect)
* [withFirebase](/docs/api/withFirebase.md)
* [withFirestore](/docs/api/withFirestore.md)
* [useFirebase](/docs/api/useFirebase.md#usefirebase)
* [useFirebaseConnect](/docs/api/useFirebaseConnect.md#usefirebaseconnect)
* [useFirestore](/docs/api/useFirestore.md#usefirestore)
* [useFirestoreConnect](/docs/api/useFirestoreConnect.md#usefirebaseconnect)
* [reducer](/docs/api/reducer.md) (also exported as `firebaseReducer`)
* [constants](/docs/api/constants.md)
* [actionTypes](/docs/api/constants.md)
* [helpers](/docs/api/helpers.md)
* [isLoaded](/docs/api/helpers.md#isLoaded)
* [isEmpty](/docs/api/helpers.md#isEmpty)
* [populate](/docs/api/helpers.md#populate)

## Importing

Every function described above is a top-level export. You can import any of them like this:

### ES6
```js
import { firebaseConnect } from 'react-redux-firebase'
```

### ES5 (CommonJS)
```js
var firebaseConnect = require('react-redux-firebase').firebaseConnect
```
