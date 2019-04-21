# Auth Recipes

## Google Login

Here is an example of a component that shows a Google login button if the user is not logged in, and a welcome message if they are. The initial loading state is handled with a simple "Loading..." message:

```js
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
// import GoogleButton from 'react-google-button' // optional

function LoginPage ({ firebase, auth }) {
  function loginWithGoogle() {
    return firebase.login({ provider: 'google', type: 'popup' })
  }
  return (
    <div className={classes.container}>
      <div>
        <h2>Auth</h2>
        {
          !isLoaded(auth)
          ? <span>Loading...</span>
          : isEmpty(auth)
            // <GoogleButton/> button can be used instead
            ? <button onClick={loginWithGoogle}>Login With Google</button>
            : <pre>{JSON.stringify(auth, null, 2)}</pre>
        }
      </div>
    </div>
  )
}

LoginPage.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

export default compose(
  withFirebase,
  connect(({ firebase: { auth } }) => ({ auth }))
)(LoginPage)
```

## Wait For Auth To Load
Waiting for auth to load is done similarly to [how waiting for data is done](/docs/queries.html#loading):

```js
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

function AuthPage ({ firebase, auth }) {
  if (!isLoaded(auth)) {
    return <span>Loading...</span>
  }
  if (isEmpty(auth)) {
    return <span>Not Authed, Please Login</span>
  }
  return (
    <div>
      <h3>Auth Data</h3>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </div>
  )
}

LoginPage.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

function mapStateToProps(state) {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(LoginPage)
```

### Using HOCs
HOCs can be used to make functional wrappers for this logic. More info is covered [the recompose example in the queries section](/docs/queries.html#loadingHOCs), but for auth it would look like:

```js
const enhance = compose(
  connect(mapStateToProps),
  // show loading spinner while auth is loading
  spinnerWhileLoading(['auth']),
  // render empty message if auth is not found
  renderIfEmpty(['auth'], NotAuthedComponent) // NotAuthedComponent is a react component
)

export default enhance(LoginPage)
```

## List of Online Users (Presence)

Presence keeps a list of which users are currently online as well as a history of all user sessions.

The logic that runs this is partially based on:
* [blog post by Firebase](https://firebase.googleblog.com/2013/06/how-to-build-presence-system.html)/
* [Firebase's Sample Presence App](https://firebase.google.com/docs/database/web/offline-capabilities#section-sample)

Include the `presense` parameter your rrfConfig:

```js
const rrfConfig = {
  userProfile: 'users', // where profiles are stored in database
  presence: 'presence', // where list of online users is stored in database
  sessions: 'sessions' // where list of user sessions is stored in database (presence must be enabled)
}
reactReduxFirebase(fbConfig, rrfConfig)
```

Now when logging in through `login` method, user will be listed as online until they logout or end the session (close the tab or window).

**NOTE:** Currently this is not triggered on logout, but that is a [planned feature for the upcoming v3.0.0 version](https://github.com/prescottprue/react-redux-firebase/wiki/v3.0.0-Roadmap). Currently, the presense status will only change when the user becomes disconnected from the Database (i.e. closes the tab).

## Wait For Auth To Be Ready (SSR)

Waiting for auth to be ready is usually only required in an SSR environment.

**NOTE:** This should only be used to prevent loading in a server side environment - if this is done directly on a client it can cause long application bootup times.

```js
import firebase from 'firebase'
import { compose, createStore, applyMiddleware } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'

// Firebase config
const fbConfig = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: '<your-storage-bucket>'
}
// react-redux-firebase options
const rrfConfig = {
  userProfile: 'users', // firebase root where user profiles are stored
  attachAuthIsReady: true, // attaches auth is ready promise to store
  firebaseStateName: 'firebase' // should match the reducer name ('firebase' is default)
}

const createStore = (initialState = {}) => {
  // Initialize Firebase instance
  firebase.initializeApp(fbConfig)

  // Add redux Firebase to compose
  const createStoreWithFirebase = createStore(
    rootReducer,
    initialState,
    compose(
      reactReduxFirebase(firebase, rrfConfig)
    )
  )

  // Create store with reducers and initial state
  const store = createStoreWithFirebase(rootReducer, initialState)

  // Listen for auth ready (promise available on store thanks to attachAuthIsReady: true config option)
  store.firebaseAuthIsReady.then(() => {
    console.log('Auth has loaded') // eslint-disable-line no-console
  })
  return store;
}
```

In order for this to work, the promise must know the name of the location within redux that the state is being stored, which is the function of the `firebaseStateName` config option. By default the `firebaseStateName` parameter is `'firebase'` to match the getting started guide. If you are storing your firebase state under a different place within redux (i.e. the name given to the `firebaseStateReducer`) such as `'firebaseState'` you must pass that name as `firebaseStateName` in your config.

#### Custom Auth Ready Logic

If you want to write your own custom logic for the promise that actually confirms that auth is ready, you can pass a promise as the `authIsReady` config option.

**NOTE:** This should only be used to prevent loading in a server side environment - if this is done directly on a client it can cause long application bootup times.

Here is an example showing the default logic:

```js
import { get } from 'lodash'

const config = {
  authIsReady: (store, firebaseStateName) => new Promise((resolve) => {
    const firebaseAuthState =  && state[firebaseStateName].auth
    if (get(store.getState(), `${firebaseStateName}.auth.isLoaded`)) {
      resolve()
    } else {
      const unsubscribe = store.subscribe(() => {
        if (get(store.getState(), `${firebaseStateName}.auth.isLoaded`)) {
          unsubscribe()
          resolve()
        }
      })
    }
  })
}
```
