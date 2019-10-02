import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty, isLoaded } from 'react-redux-firebase/lib/helpers'
import { Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase'
import ProjectRoute from 'routes/Projects/routes/Project'
import ProjectTile from '../ProjectTile'
import NewProjectTile from '../NewProjectTile'
import NewProjectDialog from '../NewProjectDialog'
import { renderChildren } from 'utils/router'
import styles from './ProjectsPage.styles'
import LoadingSpinner from 'components/LoadingSpinner'
import { LIST_PATH } from 'constants/paths'

const useStyles = makeStyles(styles)

function useProjects({ showError, showSuccess, toggleDialog }) {
  const history = useHistory()
  // TODO: Switch history to use router
  // Get projects from redux state
  const auth = useSelector(state => state.firebase.auth)
  const { uid } = auth
  // Attach todos listener
  useFirebaseConnect(() => [
    {
      path: 'projects',
      queryParams: ['limitToLast=10']
      // queryParams: ['orderByChild=createdBy', `equalTo=${auth.uid}`]
    }
  ])

  const firebase = useFirebase()

  function addProject(newInstance) {
    if (!uid) {
      return showError('You must be logged in to create a project')
    }
    return firebase
      .push('projects', {
        ...newInstance,
        createdBy: uid,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        toggleDialog()
        showSuccess('Project added successfully')
      })
      .catch(err => {
        console.error('Error:', err) // eslint-disable-line no-console
        showError(err.message || 'Could not add project')
        return Promise.reject(err)
      })
  }

  function deleteProject(projectId) {
    return firebase
      .remove(`projects/${projectId}`)
      .then(() => showSuccess('Project deleted successfully'))
      .catch(err => {
        console.error('Error:', err) // eslint-disable-line no-console
        showError(err.message || 'Could not delete project')
        return Promise.reject(err)
      })
  }

  function goToProject(projectId) {
    history.push(`${LIST_PATH}/${projectId}`)
  }

  return { addProject, deleteProject, goToProject }
}

function ProjectsPage({
  collabProjects,
  newDialogOpen,
  toggleDialog,
  showError,
  showSuccess,
  match
}) {
  const classes = useStyles()

  // Get projects from redux state
  const projects = useSelector(state => state.firebase.ordered.projects)

  const { addProject, deleteProject, goToProject, auth } = useProjects({
    showError,
    showSuccess,
    toggleDialog
  })

  if (!isLoaded(projects)) {
    return <LoadingSpinner />
  }

  return (
    <Switch>
      {/* Child routes */}
      {renderChildren([ProjectRoute], match, { auth })}
      {/* Main Route */}
      <Route
        exact
        path={match.path}
        render={() => (
          <div className={classes.root}>
            <NewProjectDialog
              onSubmit={addProject}
              open={newDialogOpen}
              onRequestClose={toggleDialog}
            />
            <div className={classes.tiles}>
              <NewProjectTile onClick={toggleDialog} />
              {!isEmpty(projects) &&
                projects.map((project, ind) => (
                  <ProjectTile
                    key={`Project-${project.key}-${ind}`}
                    name={project.value.name}
                    onSelect={() => goToProject(project.key)}
                    onDelete={() => deleteProject(project.key)}
                  />
                ))}
            </div>
          </div>
        )}
      />
    </Switch>
  )
}

ProjectsPage.propTypes = {
  match: PropTypes.object.isRequired, // from enhancer (withRouter)
  newDialogOpen: PropTypes.bool, // from enhancer (withStateHandlers)
  toggleDialog: PropTypes.func.isRequired // from enhancer (withStateHandlers)
}

export default ProjectsPage
