import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  populatedDataToJS,
  pathToJS,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import { LIST_PATH } from 'constants'
import LoadingSpinner from 'components/LoadingSpinner'
import ProjectTile from '../components/ProjectTile'
import NewProjectTile from '../components/NewProjectTile'
import NewProjectDialog from '../components/NewProjectDialog'
import classes from './ProjectsContainer.scss'

const populates = [{ child: 'createdBy', root: 'users' }]

@firebaseConnect(({ params, auth }) => [
  {
    path: 'projects',
    populates
  }
])
@connect(({ firebase }, { params }) => ({
  projects: populatedDataToJS(firebase, 'projects', populates),
  auth: pathToJS(firebase, 'auth')
}))
export default class Projects extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    children: PropTypes.object,
    projects: PropTypes.object,
    firebase: PropTypes.object
  }

  state = {
    newProjectModal: false
  }

  newSubmit = newProject => {
    const { firebase: { pushWithMeta } } = this.props
    // push new project with createdBy and createdAt
    return pushWithMeta('projects', newProject)
      .then(() => this.setState({ newProjectModal: false }))
      .catch(err => {
        // TODO: Show Snackbar
        console.error("error creating new project", err) // eslint-disable-line
      })
  }

  deleteProject = ({ name }) => this.props.firebase.remove(`projects/${name}`)

  toggleModal = (name, project) => {
    let newState = {}
    newState[`${name}Modal`] = !this.state[`${name}Modal`]
    this.setState(newState)
  }

  render() {
    // Project Route is being loaded
    if (this.props.children) return this.props.children

    const { projects } = this.props
    const { newProjectModal } = this.state

    if (!isLoaded(projects)) {
      return <LoadingSpinner />
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
                onDelete={this.deleteProject}
              />
            ))}
        </div>
      </div>
    )
  }
}
