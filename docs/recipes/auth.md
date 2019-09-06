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

function LoginPage({ firebase, auth }) {
  return (
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
