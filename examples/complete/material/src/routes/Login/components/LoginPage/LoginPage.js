import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'
import Paper from 'material-ui/Paper'
import { withFirebase } from 'react-redux-firebase'
import {
  withHandlers,
  withStateHandlers,
  pure,
  compose,
  lifecycle
} from 'recompose'
import { withNotifications } from 'modules/notification'
import { UserIsNotAuthenticated } from 'utils/router'
import { SIGNUP_PATH } from 'constants'
import LoginForm from '../LoginForm'
import PhoneForm from '../PhoneForm'

import classes from './LoginPage.scss'

let applicationVerifier

export const LoginPage = ({
  userInputLogin,
  verifyCode,
  googleLogin,
  confirmer,
  onSubmitFail
}) => (
  <div className={classes.container}>
    <Paper className={classes.panel}>
      <LoginForm
        onSubmit={userInputLogin}
        onSubmitFail={onSubmitFail}
        loginDisabled={!!confirmer}
      />
      {confirmer && (
        <PhoneForm onSubmit={verifyCode} onSubmitFail={onSubmitFail} />
      )}
    </Paper>
    <div className={classes.or}>or</div>
    <div id="recaptcha-container" />
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
  confirmer: PropTypes.object,
  userInputLogin: PropTypes.func.isRequired, // from enhancer
  verifyCode: PropTypes.func.isRequired, // from enhancer
  onSubmitFail: PropTypes.func.isRequired, // from enhancer
  googleLogin: PropTypes.func.isRequired // from enhancer
}

export default compose(
  UserIsNotAuthenticated, // redirect to projects page if already authenticated
  withNotifications, // add props.showError
  withFirebase, // add props.firebase
  lifecycle({
    componentDidMount() {
      applicationVerifier = new this.props.firebase.auth
        .RecaptchaVerifier('recaptcha-container', {
        // size: 'normal', // for visible reCAPTCHA
        size: 'invisible', // for a not visible reCAPTCHA
        callback: response => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        'expired-callback': () => {
          this.props.showError('Error with recapture, please reverify')
        }
      })
    }
  }),
  withStateHandlers(
    ({ initialExpanded = true }) => ({
      confirmer: null
    }),
    {
      setConfirmer: ({ templateEditExpanded }) => confirmer => ({
        confirmer
      })
    }
  ),
  withHandlers({
    onSubmitFail: props => (formErrs, dispatch, err) =>
      props.showError(formErrs ? 'Form Invalid' : err.message || 'Error'),
    googleLogin: ({ firebase, showError }) => event =>
      firebase
        .login({ provider: 'google', type: 'popup' })
        .catch(err => showError(err.message)),
    // Handles both emal and phone login
    userInputLogin: ({
      firebase,
      showError,
      showSuccess,
      setConfirmer
    }) => creds => {
      if (creds.email && creds.phoneNumber) {
        showError('Enter phone or email, not both')
        return Promise.reject(new Error('Enter phone or email, not both'))
      }
      // Creds contains email/password OR phoneNumber
      return firebase
        .login({ ...creds, applicationVerifier })
        .then(res => {
          if (creds.phoneNumber) {
            showSuccess('Code Sent To Phone')
            setConfirmer(res)
          }
        })
        .catch(err => showError(err.message))
    },
    verifyCode: ({ showError, showSuccess, confirmer }) => creds =>
      confirmer
        .confirm(creds.code)
        .then(() => showSuccess('Login Successful'))
        .catch(err => showError(err.message))
  }),
  pure
)(LoginPage)
