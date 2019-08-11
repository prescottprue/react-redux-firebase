import PropTypes from 'prop-types'
import withFirebase from 'react-redux-firebase/lib/withFirebase'
import { withHandlers, compose, setPropTypes, setDisplayName } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { UserIsNotAuthenticated } from 'utils/router'
import { withNotifications } from 'modules/notification'
import styles from './SignupPage.styles'

export default compose(
  // Set component display name (more clear in dev/error tools)
  setDisplayName('EnhancedSignupPage'),
  // Redirect to list page if logged in
  UserIsNotAuthenticated,
  // Add props.showError
  withNotifications,
  // Add props.firebase (used in handlers)
  withFirebase,
  // Set proptypes used in HOCs
  setPropTypes({
    showError: PropTypes.func.isRequired, // used in handlers
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired, // used in handlers
      createUser: PropTypes.func.isRequired // used in handlers
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
