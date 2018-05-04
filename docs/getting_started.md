# Getting Started

## Before Use

### Peer Dependencies

Install peer dependencies: `npm i --save redux react-redux`

## Install
```bash
npm install --save react-redux-firebase
```

## Add Reducer

Include `firebase` in your combine reducers function:


```js
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer
})
```

## Setting Up Store With Store Enhancer

```js
import { compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase'

// Firebase config
const firebaseConfig = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: '<your-storage-bucket>'
}
firebase.initializeApp(config)

// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
}

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, config)
)(createStore)

// Create store with reducers and initial state
const store = createStoreWithFirebase(rootReducer)
```

View the [config section](/config.html) for full list of configuration options.

## Use in Components

**Queries Based On State**
`Todos` component from above examples

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'

export default compose(
  firebaseConnect((props) => {
    return [
      'todos'
    ]
  }),
  connect(
    (state) => ({
      todos: state.firebase.data.todos,
      // profile: state.firebase.profile // load profile
    })
  )
)(Todos)
```

### Decorators

They are completely optional, but ES7 Decorators can be used. [The Simple Example](examples/simple) shows implementation without decorators, while [the Decorators Example](examples/decorators) shows the same application with decorators implemented.

A side by side comparison using [react-redux](https://github.com/reactjs/react-redux)'s `connect` function/HOC is the best way to illustrate the difference:

```jsx
class SomeComponent extends Component {

}
export default connect()(SomeComponent)
```
vs.

```jsx
@connect()
export default class SomeComponent extends Component {

}
```

In order to enable this functionality, you will most likely need to install a plugin (depending on your build setup). For Webpack and Babel, you will need to make sure you have installed and enabled  [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) by doing the following:

1. run `npm i --save-dev babel-plugin-transform-decorators-legacy`
2. Add the following line to your `.babelrc`:
```json
{
  "plugins": ["transform-decorators-legacy"]
}
```
