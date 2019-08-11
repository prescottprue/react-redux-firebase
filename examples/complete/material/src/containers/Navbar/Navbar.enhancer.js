import { connect } from 'react-redux'
import {
  withHandlers,
  compose,
  withProps,
  flattenProp,
  withStateHandlers,
  setDisplayName
} from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import withFirebase from 'react-redux-firebase/lib/withFirebase'
import { isEmpty, isLoaded } from 'react-redux-firebase/lib/helpers'
import { ACCOUNT_PATH } from 'constants/paths'
import styles from './Navbar.styles'

export default compose(
  // Set component display name (more clear in dev/error tools)
  setDisplayName('EnhancedNavbar'),
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
      closeAccountMenu: () => () => ({
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
  withProps(({ auth }) => ({
    authExists: isLoaded(auth) && !isEmpty(auth)
  })),
  // Flatten profile so that avatarUrl and displayName are props
  flattenProp('profile'),
  // Add styles as classes prop
  withStyles(styles)
)
