import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'

import { connect } from 'react-redux'
import { UserIsNotAuthenticated } from 'utils/router'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS
} from 'react-redux-firebase'

import { SIGNUP_PATH } from 'constants'
import LoginForm from '../components/LoginForm'

import classes from './LoginContainer.scss'

@UserIsNotAuthenticated // redirect to list page if logged in
@firebaseConnect()
@connect(({ firebase }) => ({
  authError: pathToJS(firebase, 'authError')
}))
export default class Login extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    }),
    authError: PropTypes.shape({
      message: PropTypes.string // eslint-disable-line react/no-unused-prop-types
    })
  }

  state = {
    snackCanOpen: false
  }

  handleLogin = loginData => {
    this.setState({
      snackCanOpen: true
    })

    return this.props.firebase.login(loginData)
  }

  providerLogin = provider => this.handleLogin({ provider, type: 'popup' })

  render() {
    const { authError } = this.props
    const { snackCanOpen } = this.state

    return (
      <div className={classes.container}>
        <Paper className={classes.panel}>
          <LoginForm onSubmit={this.handleLogin} />
        </Paper>
        <div className={classes.or}>or</div>
        <div className={classes.providers}>
          <GoogleButton onClick={() => this.providerLogin('google')} />
        </div>
        <div className={classes.signup}>
          <span className={classes.signupLabel}>Need an account?</span>
          <Link className={classes.signupLink} to={SIGNUP_PATH}>
            Sign Up
          </Link>
        </div>
        {isLoaded(authError) &&
        !isEmpty(authError) &&
        snackCanOpen && (
          <Snackbar
            open={isLoaded(authError) && !isEmpty(authError) && snackCanOpen}
            message={authError ? authError.message : 'Signup error'}
            action="close"
            autoHideDuration={3000}
          />
        )}
      </div>
    )
  }
}
