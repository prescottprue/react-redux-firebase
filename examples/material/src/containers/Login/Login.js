import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// Components
import LoginForm from '../../components/LoginForm/LoginForm'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'

import './Login.css'

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
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }

  state = {
    snackCanOpen: false
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.account.username) {
      this.context.router.push(`/${nextProps.account.username}`)
    }
  }

  handleRequestClose = () =>
    this.setState({
      snackCanOpen: false
    })

  handleLogin = loginData => {
    this.setState({
      snackCanOpen: true
    })
    this.props.firebase.login(loginData)
  }

  render () {
    const { account, authError } = this.props

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
        <div className='Login-Signup'>
          <span className='Login-Signup-Label'>
            Need an account?
          </span>
          <Link className='Login-Signup-Link' to='/signup'>
            Sign Up
          </Link>
        </div>
        <Snackbar
          open={typeof authError !== 'undefined' && this.state.snackCanOpen}
          message={authError || 'Error'}
          action='close'
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}
