import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'
import Paper from 'material-ui/Paper'
import { firebaseConnect } from 'react-redux-firebase'
import { withHandlers, pure, compose } from 'recompose'
import { withNotifications } from 'modules/notification'
import { withRouter } from 'utils/components'
import { SIGNUP_PATH, LIST_PATH } from 'constants'
import LoginForm from '../LoginForm'

import classes from './LoginPage.scss'

export const LoginPage = ({ emailLogin, googleLogin, onSubmitFail }) => (
  <div className={classes.container}>
    <Paper className={classes.panel}>
      <LoginForm onSubmit={emailLogin} onSubmitFail={onSubmitFail} />
    </Paper>
    <div className={classes.or}>or</div>
    <div className={classes.providers}>
      <GoogleButton onClick={googleLogin} />
    </div>
    <div className={classes.signup}>
      <span className={classes.signupLabel}>Need an account?</span>
      <Link className={classes.signupLink} to={SIGNUP_PATH}>
        Sign Up
      </Link>
    </div>
  </div>
)

LoginPage.propTypes = {
  firebase: PropTypes.shape({ // eslint-disable-line
    login: PropTypes.func.isRequired
  }),
  emailLogin: PropTypes.func,
  onSubmitFail: PropTypes.func,
  googleLogin: PropTypes.func
}

export default compose(
  pure,
  withRouter,
  withNotifications, // add props.showError
  firebaseConnect(), // add props.firebase
  withHandlers({
    onSubmitFail: props => (formErrs, dispatch, err) =>
      props.showError(formErrs ? 'Form Invalid' : err.message || 'Error'),
    googleLogin: ({ firebase, showError, router }) => e =>
      firebase
        .login({ provider: 'google', type: 'popup' })
        .then(() => router.push(LIST_PATH))
        .catch(err => showError(err.message)),
    emailLogin: ({ firebase, router }) => creds =>
      firebase.login(creds).then(() => router.push(LIST_PATH))
  })
)(LoginPage)
