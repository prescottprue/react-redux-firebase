import React, { Component, PropTypes } from 'react'
import GoogleButton from 'react-google-button'

// Components
import LoginForm from '../../components/LoginForm/LoginForm'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'

// Styling
import './Login.css'

// redux/firebase
import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-firebasev3'
const { pathToJS } = helpers

@firebase()
@connect(
  // Map state to props
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Login extends Component {

  static propTypes = {
    account: PropTypes.object
  }

  componentWillReceiveProps ({ account, history }) {
    if (account && account.username) {
      history.push(`/${account.username}`)
    }
  }

  handleLogin = (loginData) => {
    this.setState({ snackCanOpen: true })
    this.props.firebase.login(loginData)
  }

  googleLogin = () => {
    this.setState({ snackCanOpen: true })
    this.props.firebase.login({ provider: 'google', type: 'popup' })
  }

  render () {
    const { account, authError } = this.props

    // Loading spinner
    if (account && account.isFetching) {
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
          <GoogleButton onClick={this.googleLogin} />
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
