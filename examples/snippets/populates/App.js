import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, populate, isLoaded } from 'react-redux-firebase'

// NOTE: In real application don't forget to use Provider from react-redux
// or firebaseConnect/withFirebase will not work
const Projects = ({ projects }) => (
  <div>
    <h2>react-redux-firebase populate snippet</h2>
    <div>
      <h4>Projects List</h4>
      {
        !isLoaded(projects)
          ? 'Loading'
          : isEmpty(projects)
            ? 'Todo list is empty'
            : map(projects, (project, id) => (
                <div>
                  Name: {project.name}
                  Owner: { project.owner.displayName }
                </div>
              ))
      }
    </div>
  </div>
)

const populates = [
  { child: 'owner', root: 'users' },
  // or if you want a param of the populate child such as user's display name
  // { child: 'owner', root: 'users', childParam: 'displayName' }
]

export default compose(
  // gather projects and matching owners from firebase and place into redux
  firebaseConnect([
    { path: 'projects', populates },
  ]),
  // projects with owner populated from redux into component props
  connect(
    ({ firebase }) => ({
      projects: populate(firebase, 'projects', populates),
    })
  )
)(Projects)
