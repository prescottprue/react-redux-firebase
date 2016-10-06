import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'

// Components
import SignupForm from '../../components/SignupForm/SignupForm'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import RaisedButton from 'material-ui/RaisedButton'

// Styles
import './Signup.css'

// redux-firebasev3
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
export default class Signup extends Component {

  static propTypes = {
    account: PropTypes.object,
    authError: PropTypes.object
  }

  state = {
    snackCanOpen: false,
    errors: { username: null, password: null }
  }

  componentWillReceiveProps ({ account, history }) {
    if (account && account.username) {
      history.push(`/${account.username}`)
    }
  }

  reset = () =>
    this.setState({
      errors: {},
      username: null,
      email: null,
      name: null
    })

  handleSignup = ({ email, password, username }) => {
    this.setState({ snackCanOpen: true })
    this.props.firebase.createUser({ email, password }, { username, email })
  }

  providerLogin = (provider) => {
    this.setState({ snackCanOpen: true })
    // type: 'popup may also be used'
    this.props.firebase.login({ provider, type: 'redirect' })
  }

  render () {
    const { account, authError } = this.props
    const { snackCanOpen } = this.state

    if (account && account.isFetching) {
      return (
        <div className='Signup'>
          <div className='Signup-Progress'>
            <CircularProgress mode='indeterminate' />
          </div>
        </div>
      )
    }

    return (
      <div className='Signup'>
        <Paper className='Signup-Panel'>
          <SignupForm onSignup={this.handleSignup} />
        </Paper>
        <div className='Signup-Providers'>
          <GoogleButton onClick={() => this.providerLogin('google')} />
        </div>
        <div className='Signup-Providers'>
          <RaisedButton
            label="Sign in with Github"
            onClick={() => this.providerLogin('github')}
          />
        </div>
        <div className='Signup-Login'>
          <span className='Signup-Login-Label'>
            Already have an account?
          </span>
          <Link className='Signup-Login-Link' to='/login'>
            Login
          </Link>
        </div>
        {
          authError && authError.message && snackCanOpen ?
            <Snackbar
              open={authError && !!authError.message}
              message={authError ? authError.message : 'Signup error'}
              action='close'
              autoHideDuration={3000}
            /> : null
        }
      </div>
    )
  }
}
