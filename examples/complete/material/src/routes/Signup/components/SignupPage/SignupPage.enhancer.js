import { withFirebase } from 'react-redux-firebase'
import { withHandlers, compose } from 'recompose'
import { UserIsNotAuthenticated } from 'utils/router'
import { withNotifications } from 'modules/notification'
import { withStyles } from '@material-ui/core/styles'
import styles from './SignupPage.styles'

export default compose(
  // Redirect to list page if logged in
  UserIsNotAuthenticated,
  // Add props.showError
  withNotifications,
  // Add props.firebase (used in handlers)
  withFirebase,
  // Add handlers as props
  withHandlers({
    onSubmitFail: props => (formErrs, dispatch, err) =>
      props.showError(formErrs ? 'Form Invalid' : err.message || 'Error'),
    googleLogin: ({ firebase, showError }) => e =>
      firebase
        .login({ provider: 'google', type: 'popup' })
        .catch(err => showError(err.message)),
    emailSignup: ({ firebase, showError }) => creds =>
      firebase
        .createUser(creds, {
          email: creds.email,
          username: creds.username
        })
        .catch(err => showError(err.message))
  }),
  // Add styles as props.classes
  withStyles(styles)
)
