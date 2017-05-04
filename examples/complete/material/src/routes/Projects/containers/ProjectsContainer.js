import React, { Component, cloneElement } from 'react'
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
import ProjectTile from '../components/ProjectTile/ProjectTile'
import NewProjectTile from '../components/NewProjectTile/NewProjectTile'
import NewProjectDialog from '../components/NewProjectDialog/NewProjectDialog'
import LoadingSpinner from 'components/LoadingSpinner'
import classes from './ProjectsContainer.scss'

const populates = [
  { child: 'createdBy', root: 'users', keyProp: 'uid' }
]

@firebaseConnect([
  { path: 'projects', populates }
  // 'projects#populate=owner:users' // string equivalent
])
@connect(
  ({ firebase }, { params }) => ({
    auth: pathToJS(firebase, 'auth'),
    projects: populatedDataToJS(firebase, 'projects', populates)
  })
)
export default class Projects extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    projects: PropTypes.object,
    firebase: PropTypes.object,
    auth: PropTypes.object,
    children: PropTypes.object,
    params: PropTypes.object
  }

  state = {
    newProjectModal: false,
    addProjectModal: false
  }

  newSubmit = (newProject) => {
    const { auth, firebase: { push } } = this.props
    if (auth.uid) {
      newProject.owner = auth.uid
    }
    push('projects', newProject)
      .then(() => this.setState({ newProjectModal: false }))
      .catch(err => {
        // TODO: Show Snackbar
        console.error('error creating new project', err) // eslint-disable-line
      })
  }

  deleteProject = (key) => {
    this.props.firebase.remove(`projects/${key}`)
      .then(() => {
        // TODO: Show snackbar
      })
  }

  toggleModal = (name, project) => {
    this.setState({ [`${name}Modal`]: !this.state[`${name}Modal`] })
  }

  render () {
    if (!isLoaded(this.props.projects, this.props.auth)) {
      return <LoadingSpinner />
    }

    // Project Route is being loaded
    if (this.props.children) {
      // pass all props to children routes
      return cloneElement(this.props.children, this.props)
    }

    const { projects, auth } = this.props
    const { newProjectModal } = this.state


    return (
      <div className={classes.container}>
        {
          newProjectModal &&
            <NewProjectDialog
              open={newProjectModal}
              onSubmit={this.newSubmit}
              onRequestClose={() => this.toggleModal('newProject')}
            />
        }
        <div className={classes.tiles}>
          <NewProjectTile
            onClick={() => this.toggleModal('newProject')}
          />
          {
            !isEmpty(projects) &&
               map(projects, (project, key) => (
                 <ProjectTile
                   key={`Project-${key}`}
                   project={project}
                   onCollabClick={this.collabClick}
                   onSelect={() => this.context.router.push(`${LIST_PATH}/${key}`)}
                   onDelete={() => this.deleteProject(key)}
                   showDelete={auth && project.owner && project.owner.uid === auth.uid}
                 />
              ))
          }
        </div>
      </div>
    )
  }
}
