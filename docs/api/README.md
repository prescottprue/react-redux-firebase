# API Reference

Just like [redux](http://redux.js.org/docs/api/index.html), the react-redux-firebase API surface is small.

## Top-Level Exports
* [firebaseConnect](/docs/api/connect.md)
* [firebaseStateReducer](/docs/api/reducer.md)
* [reactReduxFirebase](/docs/api/compose.md)
* [constants](/docs/api/constants.md)
* [actionTypes](/docs/api/constants.md)
* [helpers](/docs/api/helpers.md)

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
