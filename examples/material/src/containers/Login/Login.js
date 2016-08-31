import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

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
    account: PropTypes.object
  }

  state = {
    snackCanOpen: false
  }

  componentWillReceiveProps ({ account }) {
    if (account && account.username) {
      this.context.router.push(`/${account.username}`)
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
        {
          authError && authError.message
          ? <Snackbar
              open={authError && this.state.snackCanOpen}
              message={authError.message || 'Error'}
              action='close'
              autoHideDuration={3000}
              onRequestClose={this.handleRequestClose}
            />
          : null
        }
      </div>
    )
  }
}
