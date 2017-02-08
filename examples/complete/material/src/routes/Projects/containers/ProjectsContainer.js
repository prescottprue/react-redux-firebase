import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'
import { connect } from 'react-redux'
import { firebaseConnect, helpers } from 'react-redux-firebase'
import { LIST_PATH } from 'constants/paths'
import ProjectTile from '../components/ProjectTile/ProjectTile'
import NewProjectTile from '../components/NewProjectTile/NewProjectTile'
import NewProjectDialog from '../components/NewProjectDialog/NewProjectDialog'
import LoadingSpinner from 'components/LoadingSpinner'
import classes from './ProjectsContainer.scss'

const { populatedDataToJS, pathToJS, isLoaded, isEmpty } = helpers
const populates = [
  { child: 'owner', root: 'users' }
]

@firebaseConnect([
  {
    path: 'projects',
    populates
  }
  // 'projects#populate=owner:users' // string equivalent
])
@connect(
  ({ firebase }, { params }) => ({
    projects: populatedDataToJS(firebase, '/projects', populates),
    auth: pathToJS(firebase, 'auth')
  })
)
export default class Projects extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  state = {
    newProjectModal: false,
    addProjectModal: false
  }

  static propTypes = {
    projects: PropTypes.object,
    firebase: PropTypes.object,
    auth: PropTypes.object,
    children: PropTypes.object,
    params: PropTypes.object
  }

  newSubmit = (newProject) => {
    const { auth } = this.props
    if (auth.uid) {
      newProject.owner = auth.uid
    }
    this.props.firebase.push('projects', newProject)
      .then(() => this.setState({ newProjectModal: false }))
      .catch(err => {
        // TODO: Show Snackbar
        console.error('error creating new project', err) // eslint-disable-line
      })
  }

  deleteProject = ({ name }) =>
    this.props.firebase.remove(`projects/${name}`)

  toggleModal = (name, project) => {
    let newState = {}
    newState[`${name}Modal`] = !this.state[`${name}Modal`]
    this.setState(newState)
  }

  render () {
    // Project Route is being loaded
    if (this.props.children) return this.props.children

    const { projects } = this.props
    const { newProjectModal } = this.state

    if (!isLoaded(projects)) {
      return <LoadingSpinner />
    }

    return (
      <div className={classes.container}>
        {
          newProjectModal && isLoaded(projects)
            ?
              <NewProjectDialog
                open={newProjectModal}
                onSubmit={this.newSubmit}
                onRequestClose={() => this.toggleModal('newProject')}
              />
            : null
        }
        <div className={classes.tiles}>
          <NewProjectTile
            onClick={() => this.toggleModal('newProject')}
          />
          {
            !isEmpty(projects)
              ?
                 map(projects, (project, key) => (
                   <ProjectTile
                     key={`Project-${key}`}
                     project={project}
                     onCollabClick={this.collabClick}
                     onSelect={() => this.context.router.push(`${LIST_PATH}/${key}`)}
                     onDelete={this.deleteProject}
                   />
                ))
              : <span>No Projects Found</span>
          }
        </div>
      </div>
    )
  }
}
