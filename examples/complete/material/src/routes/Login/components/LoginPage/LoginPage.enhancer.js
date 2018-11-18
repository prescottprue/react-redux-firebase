import PropTypes from 'prop-types'
import { withHandlers, compose, setPropTypes } from 'recompose'
import { withFirebase } from 'react-redux-firebase'
import { withStyles } from '@material-ui/core/styles'
import { withNotifications } from 'modules/notification'
import { UserIsNotAuthenticated } from 'utils/router'
import styles from './LoginPage.styles'

export default compose(
  // redirect to /projects if user is already authed
  UserIsNotAuthenticated,
  // add props.showError
  withNotifications,
  // add props.firebase
  withFirebase,
  // set proptypes used in HOCs
  setPropTypes({
    showError: PropTypes.func.isRequired, // used in handlers
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired // used in handlers
    })
  }),
  // Handlers as props
  withHandlers({
    onSubmitFail: props => (formErrs, dispatch, err) =>
      props.showError(formErrs ? 'Form Invalid' : err.message || 'Error'),
    googleLogin: ({ firebase, showError, router }) => event =>
      firebase
        .login({ provider: 'google', type: 'popup' })
        .catch(err => showError(err.message)),
    emailLogin: ({ firebase, router, showError }) => creds =>
      firebase.login(creds).catch(err => showError(err.message))
  }),
  // add props.classes
  withStyles(styles, { withTheme: true })
)
