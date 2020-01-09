# Auth Recipes

## Wait For Auth To Load {#loading}

It is common for applications to want to display a loading/splash screen while auth is loaded. This can be done by making a wrapper component like so:

```js
import React from 'react'
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>splash screen...</div>;
  return children
}

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <AuthIsLoaded>
            <div>Auth is Loaded</div> { /* Rest of App Components */}
          </AuthIsLoaded>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
```

## Private Route

```js
import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
function PrivateRoute({ children, ...rest }) {
  const auth = useSelector(state => state.firebase.auth)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoaded(auth) && !isEmpty(auth) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              {/* Component containing a login which redirects
              to /protected. NOTE: Not included in example */}
              <LoginPage />
            </Route>
            <PrivateRoute path="/protected">
              <div>Protected content</div>
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
```

## Google Login

Here is an example of a component that shows a Google login button if the user is not logged in, and a welcome message if they are. The initial loading state is handled with a simple "Loading..." message:

```js
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
// import GoogleButton from 'react-google-button' // optional

function LoginPage () {
  const firebase = useFirebase()
  const auth = useSelector(state => state.firebase.auth)

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

export default LoginPage
```

## List of Online Users (Presence)

Presence keeps a list of which users are currently online as well as a history of all user sessions.

The logic that runs this is partially based on:
* [blog post by Firebase](https://firebase.googleblog.com/2013/06/how-to-build-presence-system.html)
* [Firebase's Sample Presence App](https://firebase.google.com/docs/database/web/offline-capabilities#section-sample)

Include the `presense` parameter your rrfConfig:

```js	
const rrfConfig = {
  userProfile: 'users', // where profiles are stored in database
  presence: 'presence', // where list of online users is stored in database
  sessions: 'sessions' // where list of user sessions is stored in database (presence must be enabled)
}
```

Now when logging in through `login` method, user will be listed as online until they logout or end the session (close the tab or window).	

**NOTE:** Currently this is not triggered on logout, but that is a [planned feature for the upcoming v3.0.0 version](https://github.com/prescottprue/react-redux-firebase/wiki/v3.0.0-Roadmap). Currently, the presense status will only change when the user becomes disconnected from the Database (i.e. closes the tab).

## Firebase UI React

Here is an example of a component that shows a usage of [Firebase UI](https://firebase.google.com/docs/auth/web/firebaseui), especially their [react component](https://github.com/firebase/firebaseui-web-react) and integrate the flow with this library:

```js
import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import { useHistory } from 'react-router-dom'; // if you use react-router
// import GoogleButton from 'react-google-button' // optional

function LoginPage() {
  const firebase = useFirebase()
  const auth = useSelector(state => state.firebase.auth)

  return (
  <div className={classes.container}>
    <StyledFirebaseAuth
      uiConfig={{
        signInFlow: 'popup',
        signInSuccessUrl: '/signedIn',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
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
}

export default LoginPage
```
