import React from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { isLoaded, useFirebase } from 'react-redux-firebase'
import LoadingSpinner from 'components/LoadingSpinner'
import { useNotifications } from 'modules/notification'
import defaultUserImageUrl from 'static/User.png'
import AccountForm from '../AccountForm'
import styles from './AccountPage.styles'

const useStyles = makeStyles(styles)

function AccountPage() {
  const classes = useStyles()
  const firebase = useFirebase()
  const { showSuccess, showError } = useNotifications()
  
  // Get profile from redux state
  const profile = useSelector(state => state.firebase.profile)

  if (!isLoaded(profile)) {
    return <LoadingSpinner />
  }

  function updateAccount(newAccount) {
    return firebase
      .updateProfile(newAccount)
      .then(() => showSuccess('Profile updated successfully'))
      .catch(error => {
        console.error('Error updating profile', error.message || error) // eslint-disable-line no-console
        showError('Error updating profile: ', error.message || error)
        return Promise.reject(error)
      })
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.pane}>
        <div className={classes.settings}>
          <div>
            <img
              className={classes.avatarCurrent}
              src={profile.avatarUrl || defaultUserImageUrl}
              alt=""
            />
          </div>
          <div className={classes.meta}>
            <AccountForm
              onSubmit={updateAccount}
              account={profile}
              initialValues={profile}
            />
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default AccountPage
