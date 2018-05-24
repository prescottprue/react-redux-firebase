import { compose } from 'redux'
import { connect } from 'react-redux'
import { withHandlers } from 'recompose'
import { withFirebase } from 'react-redux-firebase'
import { spinnerWhileLoading } from 'utils/components'
import { withNotifications } from 'modules/notification'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  UserIsAuthenticated, // redirect to /login if user is not authenticated
  withFirebase,
  withNotifications,
  connect(({ firebase: { profile } }) => ({
    profile,
    avatarUrl: profile.avatarUrl
  })),
  spinnerWhileLoading(['profile']),
  withHandlers({
    updateAccount: ({ firebase, showSuccess, showError }) => newAccount =>
      firebase
        .updateProfile(newAccount)
        .then(() => showSuccess('Profile updated successfully'))
        .catch(error => {
          showError('Error updating profile: ', error.message || error)
          console.error('Error updating profile', error.message || error) // eslint-disable-line no-console
          return Promise.reject(error)
        })
  })
)
