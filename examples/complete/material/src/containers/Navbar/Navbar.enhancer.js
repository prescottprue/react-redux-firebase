import { connect } from 'react-redux'
import { compose } from 'redux'
import { setDisplayName } from 'recompose'
import { withRouter } from 'react-router-dom'
import withFirebase from 'react-redux-firebase/lib/withFirebase'

export default compose(
  // Map redux state to props
  connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })),
  // Add props.router (used in handlers)
  withRouter,
  // Add props.firebase (used in handlers)
  withFirebase,
  // Set component display name (more clear in dev/error tools)
  setDisplayName('EnhancedNavbar')
)
