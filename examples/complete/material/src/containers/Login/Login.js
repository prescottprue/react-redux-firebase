import React, { Component, PropTypes } from 'react'
import GoogleButton from 'react-google-button'

// Components
import LoginForm from '../../components/LoginForm/LoginForm'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import RaisedButton from 'material-ui/RaisedButton'

// Styling
import './Login.css'

// redux/firebase
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { pathToJS } = helpers

@firebase()
@connect(
  // Map state to props
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
    profile: pathToJS(firebase, 'profile')
  })
)
export default class Login extends Component {

  static propTypes = {
    profile: PropTypes.object,
    authError: PropTypes.shape({
      message: PropTypes.string.isRequired
    }),
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    })
  }

  // Redirect when logged in
  // componentWillReceiveProps ({ profile, history }) {
  //   if (profile && profile.username) {
  //     history.push(`/cars`)
  //   }
  // }

  handleLogin = (loginData) => {
    this.setState({ snackCanOpen: true })
    this.props.firebase.login(loginData)
  }

  providerLogin = (provider) => {
    this.setState({ snackCanOpen: true })
    this.props.firebase.login({ provider, type: 'redirect' })
  }

  render () {
    const { profile, authError } = this.props

    // Loading spinner
    if (profile && profile.isFetching) {
      return (
        <div className='Login'>
          <div className='Login-Progress'>
            <CircularProgress mode='indeterminate' />
          </div>
        </div>
      )
    }

    return (
      <div className='Login'>
        <Paper className='Login-Panel'>
          <LoginForm onLogin={this.handleLogin} />
        </Paper>
        <div>
          <span>or</span>
        </div>
        <div className='Login-Providers'>
          <GoogleButton onClick={() => this.providerLogin('google')} />
        </div>
        <div className='Login-Providers'>
          <RaisedButton
            label="Sign in with Github"
            onClick={() => this.providerLogin('github')}
          />
        </div>
        {
          authError && authError.message
          ? <Snackbar
              open={authError && !!authError.message}
              message={authError.message || 'Error'}
              action='close'
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
          : null
        }
      </div>
    )
  }
}
