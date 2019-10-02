import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import withFirebase from 'react-redux-firebase/lib/withFirebase'
import { withHandlers, compose, setPropTypes } from 'recompose'
import { spinnerWhileLoading } from 'utils/components'
import { withNotifications } from 'modules/notification'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  UserIsAuthenticated, // redirect to /login if user is not authenticated
  withFirebase, // add props.firebase
  withNotifications,
  connect(({ firebase: { profile } }) => ({
    profile
  })),
  spinnerWhileLoading(['profile']), // spinner until profile loads
  setPropTypes({
    showSuccess: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    firebase: PropTypes.shape({
      updateProfile: PropTypes.func.isRequired
    })
  }),
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
