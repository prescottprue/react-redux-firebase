import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'
import Paper from '@material-ui/core/Paper'
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
  emailSignup: PropTypes.func, // from enhancer (withHandlers - firebase)
  googleLogin: PropTypes.func, // from enhancer (withHandlers - firebase)
  onSubmitFail: PropTypes.func // from enhancer (reduxForm)
}

export default SignupPage
