import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { map, get } from 'lodash'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  populate,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import { LIST_PATH } from 'constants'
// import { UserIsAuthenticated } from 'utils/router'
import LoadingSpinner from 'components/LoadingSpinner'
import ProjectTile from '../components/ProjectTile'
import NewProjectTile from '../components/NewProjectTile'
import NewProjectDialog from '../components/NewProjectDialog'
import classes from './ProjectsContainer.scss'

const populates = [{ child: 'createdBy', root: 'users' }]

// @UserIsAuthenticated
@firebaseConnect([
  // { path: 'projects', populates }
  // 'projects#populate=owner:users' // string equivalent
])
@connect(
  ({ firebase, firebase: { auth, data: { projects } } }, { params }) => ({
    auth,
    projects: populate(firebase, 'projects', populates)
  })
)
export default class Projects extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    children: PropTypes.object,
    firebase: PropTypes.object.isRequired,
    projects: PropTypes.object,
    unpopulatedProjects: PropTypes.object,
    auth: PropTypes.object
  }

  state = {
    newProjectModal: false
  }

  newSubmit = newProject => {
    return this.props.firebase
      .push('projects', newProject)
      .then(() => this.setState({ newProjectModal: false }))
      .catch(err => {
        // TODO: Show Snackbar
        console.error('error creating new project', err) // eslint-disable-line
      })
  }

  deleteProject = key => this.props.firebase.remove(`projects/${key}`)

  toggleModal = (name, project) => {
    let newState = {}
    newState[`${name}Modal`] = !this.state[`${name}Modal`]
    this.setState(newState)
  }

  getDeleteVisible = key => {
    const { auth, unpopulatedProjects } = this.props
    return (
      !isEmpty(this.props.auth) &&
      get(unpopulatedProjects, `${key}.createdBy`) === auth.uid
    )
  }

  render() {
    const { projects, auth } = this.props
    const { newProjectModal } = this.state

    if (!isLoaded(projects, auth)) {
      return <LoadingSpinner />
    }

    // Project Route is being loaded
    if (this.props.children) {
      // pass all props to children routes
      return cloneElement(this.props.children, this.props)
    }

    return (
      <div className={classes.container}>
        {newProjectModal && (
          <NewProjectDialog
            open={newProjectModal}
            onSubmit={this.newSubmit}
            onRequestClose={() => this.toggleModal('newProject')}
          />
        )}
        <div className={classes.tiles}>
          <NewProjectTile onClick={() => this.toggleModal('newProject')} />
          {!isEmpty(projects) &&
            map(projects, (project, key) => (
              <ProjectTile
                key={`${project.name}-Collab-${key}`}
                project={project}
                onCollabClick={this.collabClick}
                onSelect={() => this.context.router.push(`${LIST_PATH}/${key}`)}
                onDelete={() => this.deleteProject(key)}
                showDelete={this.getDeleteVisible(key)}
              />
            ))}
        </div>
      </div>
    )
  }
}
