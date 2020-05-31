import React from 'react'
import { Link } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import Paper from '@material-ui/core/Paper'
import { useFirebase } from 'react-redux-firebase'
import { makeStyles } from '@material-ui/core/styles'
import { LOGIN_PATH } from 'constants/paths'
import { useNotifications } from 'modules/notification'
import SignupForm from '../SignupForm'
import styles from './SignupPage.styles'

const useStyles = makeStyles(styles)

function SignupPage() {
  const classes = useStyles()
  const firebase = useFirebase()
  const { showError } = useNotifications()

  const onSubmitFail = (formErrs, dispatch, err) =>
    showError(formErrs ? 'Form Invalid' : err.message || 'Error')
  const googleLogin = () =>
    firebase
      .login({ provider: 'google', type: 'popup' })
      .catch(err => showError(err.message))
  const emailSignup = creds =>
    firebase
      .createUser(creds, {
        email: creds.email,
        username: creds.username
      })
      .catch(err => showError(err.message))

  return (
    <div className={classes.root}>
      <Paper className={classes.panel}>
        <SignupForm onSubmit={emailSignup} onSubmitFail={onSubmitFail} />
      </Paper>
      <div className={classes.orLabel}>or</div>
      <div className={classes.providers}>
        <GoogleButton onClick={googleLogin} data-test="google-auth-button" />
      </div>
      <div className={classes.login}>
        <span className={classes.loginLabel}>Already have an account?</span>
        <Link className={classes.loginLink} to={LOGIN_PATH}>
          Login
        </Link>
      </div>
    </div>
  )
}

export default SignupPage
