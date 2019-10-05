# Auth Recipes

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

export default LoginPage
```
