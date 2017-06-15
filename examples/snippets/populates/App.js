import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  populatedDataToJS,
  isLoaded,
  pathToJS,
  dataToJS
} from 'react-redux-firebase'

const populates = [
  { child: 'owner', root: 'users' },
  // or if you want a param of the populate child such as user's display name
  // { child: 'owner', root: 'users', childParam: 'displayName' }
]

// gather projects and matching owners from firebase and place into redux
@firebaseConnect([
  { path: 'projects', populates },
])
// projects with owner populated from redux into component props
@connect(
  ({ firebase }) => ({
    projects: populatedDataToJS(firebase, 'projects', populates),
  })
)
export default class App extends Component {
  static propTypes = {
    projects: PropTypes.shape({
      name: PropTypes.string,
      owner: PropTypes.object // string if using childParam: 'displayName'
    }),
    firebase: PropTypes.shape({
      set: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired
    })
  }
  render () {
    const { firebase, projects } = this.props

    const projectsList = (!isLoaded(projects))
                        ? 'Loading'
                        : (isEmpty(projects))
                          ? 'Todo list is empty'
                          : map(projects, (project, id) => (
                              <div>
                                Name: {project.name}
                                Owner: { project.owner.displayName }
                              </div>
                            ))
    return (
      <div>
        <h2>react-redux-firebase populate snippet</h2>
        <div>
          <h4>Projects List</h4>
          {projectsList}
        </div>
      </div>
    )
  }
}
