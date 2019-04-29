# API Reference

Just like [redux](http://redux.js.org/docs/api/index.html), the react-redux-firebase API surface is intentionally as small as possible.

## Top-Level Exports
* [firebaseConnect](/docs/api/connect.md#firebaseconnect)
* [createFirebaseConnect](/docs/api/connect.md#createfirebaseconnect)
* [withFirebase](/docs/api/withFirebase.md)
* [firestoreConnect](/docs/api/firestoreConnect.md#firebaseconnect)
* [createFirestoreConnect](/docs/api/firestoreConnect.md#createfirestoreconnect)
* [withFirestore](/docs/api/withFirestore.md)
* [reducer](/docs/api/reducer.md) (also exported as `firebaseReducer`)
* [reactReduxFirebase](/docs/api/enhancer.md)
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
