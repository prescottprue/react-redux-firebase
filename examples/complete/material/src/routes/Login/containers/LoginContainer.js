import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS
} from 'react-redux-firebase'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
import { UserIsNotAuthenticated } from 'utils/router'
import { SIGNUP_PATH } from 'constants'
import LoginForm from '../components/LoginForm'
import classes from './LoginContainer.scss'

@UserIsNotAuthenticated
@firebaseConnect()
@connect(
  // map redux state to props
  ({ firebase }) => ({
    authError: pathToJS(firebase, 'authError')
  })
)
export default // redirect to list page if logged in
// add this.props.firebase
class Login extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    }),
    authError: PropTypes.shape({
      message: PropTypes.string
    })
  }

  state = {
    // state of snackbar so it can be closed
    snackCanOpen: false
  }

  handleLogin = loginData => {
    this.setState({ snackCanOpen: true })
    return this.props.firebase.login(loginData)
  }

  providerLogin = provider => this.handleLogin({ provider })

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
          snackCanOpen &&
          <Snackbar
            open={isLoaded(authError) && !isEmpty(authError) && snackCanOpen}
            message={authError ? authError.message : 'Signup error'}
            action="close"
            autoHideDuration={3000}
          />}
      </div>
    )
  }
}
