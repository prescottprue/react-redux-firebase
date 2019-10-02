import { compose } from 'redux'
import { withStateHandlers, setDisplayName } from 'recompose'
import { withRouter } from 'react-router-dom'
import { withNotifications } from 'modules/notification'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  // Set component display name (more clear in dev/error tools)
  setDisplayName('EnhancedProjectsPage'),
  // redirect to /login if user is not logged in
  UserIsAuthenticated,
  // Add props.router
  withRouter,
  // Add props.showError and props.showSuccess
  withNotifications,
  // Add state and state handlers as props
  withStateHandlers(
    // Setup initial state
    ({ initialDialogOpen = false }) => ({
      newDialogOpen: initialDialogOpen
    }),
    // Add state handlers as props
    {
      toggleDialog: ({ newDialogOpen }) => () => ({
        newDialogOpen: !newDialogOpen
      })
    }
  )
)
