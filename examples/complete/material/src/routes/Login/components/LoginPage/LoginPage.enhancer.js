import PropTypes from 'prop-types'
import { withFirebase } from 'react-redux-firebase'
import { withHandlers, compose, setPropTypes, setDisplayName } from 'recompose'
import { UserIsNotAuthenticated } from 'utils/router'
import { withNotifications } from 'modules/notification'

export default compose(
  // Set component display name (more clear in dev/error tools)
  setDisplayName('EnhancedLoginPage'),
  // redirect to /projects if user is already authed
  UserIsNotAuthenticated,
  // add props.showError
  withNotifications,
  // Add props.firebase (used in handlers)
  withFirebase,
  // Set proptypes used in HOCs
  setPropTypes({
    showError: PropTypes.func.isRequired, // used in handlers
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired // used in handlers
    })
  }),
  // Add handlers as props
  withHandlers({
    onSubmitFail: props => (formErrs, dispatch, err) =>
      props.showError(formErrs ? 'Form Invalid' : err.message || 'Error'),
    googleLogin: ({ firebase, showError }) => () =>
      firebase
        .login({ provider: 'google', type: 'popup' })
        .catch(err => showError(err.message)),
    emailLogin: ({ firebase, showError }) => creds =>
      firebase.login(creds).catch(err => showError(err.message))
  })
)
