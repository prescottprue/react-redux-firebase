import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded
  // populate
} from 'react-redux-firebase'
// import { reduxFirebase as rfConfig } from 'config'
// import { UserIsAuthenticated } from 'utils/router'
import { fbReduxSettings } from 'config'
import defaultUserImageUrl from 'static/User.png'
import LoadingSpinner from 'components/LoadingSpinner'
import AccountForm from '../components/AccountForm/AccountForm'
import classes from './AccountContainer.scss'

// @UserIsAuthenticated // redirect to /login if user is not authenticated
@firebaseConnect()
@connect(({ firebase: { profile, auth } }) => ({
  profile,
  authUid: auth.uid
  // profile: populate(firebase, 'profile', rfConfig.profileParamsToPopulate) // if populating profile
}))
export default class Account extends Component {
  static propTypes = {
    profile: PropTypes.object,
    authUid: PropTypes.string,
    firebase: PropTypes.shape({
      updateProfile: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired
    })
  }

  updateAccount = newAccount => {
    const { firebase: { update }, authUid } = this.props
    // corresponds to /users/${uid}
    return update(`${fbReduxSettings.userProfile}/${authUid}`, newAccount)
  }

  updateAccount = newData =>
    this.props.firebase.updateProfile(newData).catch(err => {
      console.error('Error updating account', err) // eslint-disable-line no-console
      // TODO: Display error to user
    })

  render() {
    const { profile } = this.props

    if (!isLoaded(profile)) {
      return <LoadingSpinner />
    }

    return (
      <div className={classes.container}>
        <Paper className={classes.pane}>
          <div className={classes.settings}>
            <div className={classes.avatar}>
              <img
                className={classes.avatarCurrent}
                src={(profile && profile.avatarUrl) || defaultUserImageUrl}
                onClick={this.toggleModal}
              />
            </div>
            <div className={classes.meta}>
              <AccountForm
                initialValues={profile}
                account={profile}
                onSubmit={this.updateAccount}
              />
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}
