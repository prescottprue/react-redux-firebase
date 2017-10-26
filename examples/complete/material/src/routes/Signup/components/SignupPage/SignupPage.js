import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'
import Paper from 'material-ui/Paper'
import { withFirebase } from 'react-redux-firebase'
import { withHandlers, pure, compose } from 'recompose'
// import { UserIsNotAuthenticated } from 'utils/router'
import { withNotifications } from 'modules/notification'
import { LOGIN_PATH } from 'constants'
import SignupForm from '../SignupForm'

import classes from './SignupPage.scss'

export const SignupPage = ({ emailSignup, googleLogin, onSubmitFail }) => (
  <div className={classes.container}>
    <Paper className={classes.panel}>
      <SignupForm onSubmit={emailSignup} onSubmitFail={onSubmitFail} />
    </Paper>
    <div className={classes.or}>or</div>
    <div className={classes.providers}>
      <GoogleButton onClick={googleLogin} />
    </div>
    <div className={classes.login}>
      <span className={classes.loginLabel}>Already have an account?</span>
      <Link className={classes.loginLink} to={LOGIN_PATH}>
        Login
      </Link>
    </div>
  </div>
)

SignupPage.propTypes = {
  emailSignup: PropTypes.func,
  onSubmitFail: PropTypes.func,
  googleLogin: PropTypes.func
}

export default compose(
  // UserIsNotAuthenticated, // redirect to list page if logged in
  pure,
  withNotifications, // add props.showError
  withFirebase, // add props.firebase (firebaseConnect() can also be used)
  withHandlers({
    onSubmitFail: props => (formErrs, dispatch, err) =>
      props.showError(formErrs ? 'Form Invalid' : err.message || 'Error'),
    googleLogin: ({ firebase, showError }) => e =>
      firebase
        .login({ provider: 'google', type: 'popup' })
        .catch(err => showError(err.message)),
    emailSignup: ({ firebase, showError }) => creds =>
      firebase
        .createUser(creds, {
          email: creds.email,
          username: creds.username
        })
        .catch(err => showError(err.message))
  })
)(SignupPage)
