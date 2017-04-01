import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase'
import { submit } from 'redux-form'
import { reduxFirebase as rfConfig } from 'config'
import { ACCOUNT_FORM_NAME } from 'constants/formNames'
import { UserIsAuthenticated } from 'utils/router'
import defaultUserImageUrl from 'static/User.png'
import LoadingSpinner from 'components/LoadingSpinner'
import AccountForm from '../components/AccountForm/AccountForm'
import classes from './AccountContainer.scss'

@UserIsAuthenticated // redirect to /login if user is not authenticated
@firebaseConnect() // add this.props.firebase
@connect(
  // Map redux state to props
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile'),
  }),
  {
    // action for submitting redux-form
    submitForm: () => (dispatch) => dispatch(submit(ACCOUNT_FORM_NAME))
  }
)
export default class Account extends Component {
  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.shape({
      update: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
      uploadAvatar: PropTypes.func
    })
  }

  state = { modalOpen: false }

  handleLogout = () => {
    this.props.firebase.logout()
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  updateAccount = (newData) => {
    return this.props.firebase
      .update(`${rfConfig.userProfile}/${this.props.auth.uid}`, newData)
      .catch((err) => {
        console.error('Error updating account', err)
        // TODO: Display error to user
      })
  }

  render () {
    const { account, submitForm } = this.props

    if (!isLoaded(account)) {
      return <LoadingSpinner />
    }

    return (
      <div className={classes.container}>
        <Paper className={classes.pane}>
          <div className={classes.settings}>
            <div className={classes.avatar}>
              <img
                className={classes['avatar-current']}
                src={account && account.avatarUrl || defaultUserImageUrl}
                onClick={this.toggleModal}
              />
            </div>
            <div className={classes.meta}>
              <AccountForm
                account={account}
                submitForm={submitForm}
                onSubmit={this.updateAccount}
              />
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}
0
