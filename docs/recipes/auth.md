# Auth Recipes

Auth recipes assume that you have passed the following config when creating your store:

```js
const rrfConfig = {
  userProfile: 'users', // can be any string path
}
```

## Google Login

Here is an example of a component that shows a Google login button if the user is not logged in, and a welcome message if they are. The initial loading state is handled with a simple "Loading..." message:

```js
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
// import GoogleButton from 'react-google-button' // optional

export const LoginPage = ({ firebase, auth }) => (
  <div className={classes.container}>
    <button // <GoogleButton/> button can be used instead
      onClick={() => firebase.login({ provider: 'google', type: 'popup' })}
    >Login With Google</button>
    <div>
      <h2>Auth</h2>
      {
        !isLoaded(auth)
        ? <span>Loading...</span>
        : isEmpty(auth)
          ? <span>Not Authed</span>
          : <pre>{JSON.stringify(auth, null, 2)}</pre>
      }
    </div>
  </div>
)

LoginPage.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(LoginPage)
```

## Firebase UI React

Here is an example of a component that shows a usage of [Firebase UI](https://firebase.google.com/docs/auth/web/firebaseui), especially their [react component](https://github.com/firebase/firebaseui-web-react) and integrate the flow with this library:

```js
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import { withRouter } from 'react-router-dom'; // if you use react-router
// import GoogleButton from 'react-google-button' // optional

export const LoginPage = ({
  firebase,
  auth,
  //history if you use react-router
  }) => (
  <div className={classes.container}>
    <StyledFirebaseAuth
      uiConfig={{
        signInFlow: 'popup',
        signInSuccessUrl: '/signedIn',
        signInOptions: [this.props.firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
          signInSuccessWithAuthResult: (authResult, redirectUrl) => {
            firebase.handleRedirectResult(authResult).then(() => {
              // history.push(redirectUrl); if you use react router to redirect
            });
            return false;
          },
        },
      }}
      firebaseAuth={firebase.auth()}
        />
    <div>
      <h2>Auth</h2>
      {
        !isLoaded(auth)
        ? <span>Loading...</span>
        : isEmpty(auth)
          ? <span>Not Authed</span>
          : <pre>{JSON.stringify(auth, null, 2)}</pre>
      }
    </div>
  </div>
)

LoginPage.propTypes = {
  firebase: PropTypes.shape({
    handleRedirectResult: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

export default compose(
  //withRouter, if you use react router to redirect
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(LoginPage)
```


## Wait For Auth To Be Ready

```js
import firebase from 'firebase'
import { compose, createStore, applyMiddleware } from 'redux'
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'

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
      reactReduxFirebase(firebase, rrfConfig),
      applyMiddleware(thunk.withExtraArgument(getFirebase))
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

## List of Online Users (Presence)

Presence keeps a list of which users are currently online as well as a history of all user sessions.

The logic that runs this is partially based on:
* [blog post by Firebase](https://firebase.googleblog.com/2013/06/how-to-build-presence-system.html)/
* [Firebase's Sample Presence App](https://firebase.google.com/docs/database/web/offline-capabilities#section-sample)

## Basic
Include the `userProfile` parameter in config when setting up store middleware:

```js
const rrfConfig = {
  userProfile: 'users', // where profiles are stored in database
  presence: 'presence', // where list of online users is stored in database
  sessions: 'sessions' // where list of user sessions is stored in database (presence must be enabled)
}
reactReduxFirebase(fbConfig, rrfConfig)
```

Now when logging in through `login` method, user will be listed as online until they logout or end the session (close the tab or window).
