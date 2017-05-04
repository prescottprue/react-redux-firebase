import react, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, submit } from 'redux-form'
import { firebaseConnect } from 'react-redux-firebase'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Subheader from 'material-ui/Subheader'
import RecoverForm from '../components/RecoverForm'
import EmailForm from '../components/EmailForm'
import { RECOVER_FORM_NAME } from 'constants'

@firebaseConnect() // adds this.props.firebase
export default class RecoverContainer extends Component {
  state = {
    message: null,
    open: false
  }

  sendRecoveryEmail = ({ email }) => {
    return this.props.firebase
      .resetPassword(email)
      .then(() => {
        this.setState({
          message: 'Account Recovery Email Sent',
          open: true
        })
      })
      .catch((err) => {
        console.error('Error updating account', err)
        this.setState({ message: err.message || 'Error' }) // show error snackbar
        return Promise.reject(err)
      })
  }

  recoverAccount = ({ code, password }) => {
    const {
      verifyPasswordResetCode,
      confirmPasswordReset
    } = this.props.firebase

    return verifyPasswordResetCode(code)
      .then(() => confirmPasswordReset(code, password))
      .then((res) => {
        this.setState({
          message: 'Password Changed Successfully'
        })
      })
      .catch((err) => {
        console.error('Error updating account', err)
        this.setState({ message: err.message }) // show error snackbar
        return Promise.reject(err)
      })
  }

  render() {
    return (
      <div className="flex-column-center">
        <Paper style={{ marginTop: '3rem' }}>
          <EmailForm onSubmit={this.sendRecoveryEmail} />
        </Paper>
        <Paper style={{ marginTop: '3rem' }}>
          <RecoverForm onSubmit={this.recoverAccount} />
        </Paper>
        <Snackbar
          open={!!this.state.message}
          message={this.state.message || 'Error'}
          autoHideDuration={4000}
          onRequestClose={() => this.setState({ message: null})}
        />
      </div>
    )
  }
}
