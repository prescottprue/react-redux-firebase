import { withHandlers, pure, compose } from 'recompose'
import { firebaseConnect } from 'react-redux-firebase'
import { withNotifications } from 'modules/notification'
import { UserIsNotAuthenticated } from 'utils/router'

export default compose(
  UserIsNotAuthenticated, // redirect to /projects if user is already authed
  withNotifications, // add props.showError
  firebaseConnect(), // add props.firebase
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
  pure // shallow equals comparison on props (prevent unessesary re-renders)
)
