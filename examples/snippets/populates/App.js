import React, { PropTypes, Component } from 'react'
import { map } from 'lodash'
import TodoItem from './TodoItem'

// redux/firebase
import { connect } from 'react-redux'
import { firebaseConnect, helpers } from 'react-redux-firebase'
const { populatedDataToJS, isLoaded, pathToJS, dataToJS } = helpers
const populates = [
  { child: 'owner', root: 'users' },
  // or if you want a param of the populate child such as user's display name
  // { child: 'owner', root: 'users', childParam: 'displayName' }
]

@firebaseConnect([
  { path: '/projects', populates },
])
@connect(
  ({firebase}) => ({
    projects: populatedDataToJS(firebase, '/projects', populates),
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
                          : map(projects, (todo, id) => (
                              <div>
                                Name: {project.name}
                                Owner: { owner.displayName || owner }
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
