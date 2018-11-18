import { connect } from 'react-redux'
import {
  withHandlers,
  compose,
  withProps,
  flattenProp,
  withStateHandlers
} from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { withFirebase, isEmpty, isLoaded } from 'react-redux-firebase'
import { ACCOUNT_PATH } from 'constants/paths'
import styles from './Navbar.styles'

export default compose(
  // Map redux state to props
  connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })),
  // State handlers as props
  withStateHandlers(
    ({ accountMenuOpenInitially = false }) => ({
      accountMenuOpen: accountMenuOpenInitially,
      anchorEl: null
    }),
    {
      closeAccountMenu: ({ accountMenuOpen }) => () => ({
        anchorEl: null
      }),
      handleMenu: () => event => ({
        anchorEl: event.target
      })
    }
  ),
  // Add props.router (used in handlers)
  withRouter,
  // Add props.firebase (used in handlers)
  withFirebase,
  // Handlers as props
  withHandlers({
    handleLogout: props => () => {
      props.firebase.logout()
      props.history.push('/')
      props.closeAccountMenu()
    },
    goToAccount: props => () => {
      props.history.push(ACCOUNT_PATH)
      props.closeAccountMenu()
    }
  }),
  // Add custom props
  withProps(({ auth, profile }) => ({
    authExists: isLoaded(auth) && !isEmpty(auth)
  })),
  // Flatten profile so that avatarUrl and displayName are props
  flattenProp('profile'),
  // Add styles as classes prop
  withStyles(styles)
)
