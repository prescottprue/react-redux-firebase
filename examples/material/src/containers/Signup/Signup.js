import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// Components
import SignupForm from '../../components/SignupForm/SignupForm'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'

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

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  state = {
    errors: { username: null, password: null },
    snackCanOpen: false
  }

  handleSnackClose = () => {
    this.setState({
      snackCanOpen: false
    })
  }

  reset = () =>
    this.setState({
      errors: {},
      username: null,
      email: null,
      name: null,
      snackCanOpen: false
    })

  handleSignup = (signupData) => {
    console.log('handle signup:', signupData, this.props.firebase)
    const {email, password, username} = signupData
    this.props.firebase.createUser({ email, password }, { username })
  }

  providerSignup = provider => {
    this.setState({ snackCanOpen: true })
    this.props.signup(provider)
    event({ category: 'User', action: 'Provider Signup', value: provider })
  }

  render () {
    const { account, authError } = this.props

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
        <div className='Signup-Login'>
          <span className='Signup-Login-Label'>
            Already have an account?
          </span>
          <Link className='Signup-Login-Link' to='/login'>Login</Link>
        </div>
        {
          authError ?
            <Snackbar
              open={authError !== null && this.state.snackCanOpen}
              message={authError || 'Signup error'}
              action='close'
              autoHideDuration={3000}
              onRequestClose={this.handleSnackClose}
            /> : null
        }
      </div>
    )
  }
}
