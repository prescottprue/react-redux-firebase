import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { get } from 'lodash'
import firebaseConnect from 'react-redux-firebase/lib/firebaseConnect'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { setPropTypes, setDisplayName, withProps } from 'recompose'
import { spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'
import styles from './ProjectPage.styles'

export default compose(
  // Set component display name (more clear in dev/error tools)
  setDisplayName('EnhancedProjectPage'),
  // Redirect to /login if user is not logged in
  UserIsAuthenticated,
  // Add props.match
  withRouter,
  // Set proptypes of props used in HOCs
  setPropTypes({
    // From react-router
    match: PropTypes.shape({
      params: PropTypes.shape({
        projectId: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }),
  // Map projectId from route params (projects/:projectId) into props.projectId
  withProps(({ match: { params: { projectId } } }) => ({
    projectId
  })),
  // Create listener for projects data within Firebase
  firebaseConnect(({ projectId }) => [{ path: `projects/${projectId}` }]),
  // Map projects data from redux state to props
  connect(({ firebase: { data } }, { projectId }) => ({
    project: get(data, `projects.${projectId}`)
  })),
  // Show loading spinner while project is loading
  spinnerWhileLoading(['project']),
  // Add styles as props.classes
  withStyles(styles)
)
