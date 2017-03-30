import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, submit } from 'redux-form'
import { firebaseConnect } from 'react-redux-firebase'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Subheader from 'material-ui/Subheader'
import RecoverForm from '../components/RecoverForm'
import { RECOVER_FORM_NAME } from 'constants/formNames'

// Props decorators
@firebaseConnect()
@connect(
  null,
  {
    // action for submitting redux-form
    submitForm: () => (dispatch) => dispatch(submit(RECOVER_FORM_NAME))
  }
)
export default class RecoverContainer extends Component {
  state = {
    message: null,
    open: false
  }

  recoverAccount = ({ email }) => {
    return this.props.firebase
      .resetPassword(email)
      .then(() => {
        this.setState({ message: 'Account Recovery Email Sent', open: true })
      })
      .catch((err) => {
        console.error('Error updating account', { message: err.message, open: true })
        this.setState({ message: err.message, open: true })
        // TODO: Display error to user
        return Promise.reject(err)
      })
  }

  handleRequestClose = () => {
    this.setState({
      message: null,
      open: false
    });
  }

  render() {
    return (
      <div className="flex-row-center">
        <Paper style={{ marginTop: '3rem' }}>
          <RecoverForm
            onRecoverClick={this.props.submitForm}
            onSubmit={this.recoverAccount}
          />
        </Paper>
        <Snackbar
          open={this.state.open}
          message={this.state.message || 'Error'}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}
