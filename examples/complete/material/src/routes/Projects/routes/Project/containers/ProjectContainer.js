import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isEmpty } from 'react-redux-firebase'
import { spinnerWhileLoading } from 'utils/components'
import classes from './ProjectContainer.scss'

const enhance = compose(
  // Get project path from firebase based on params prop (route params from react-router)
  firebaseConnect(({ params: { projectname } }) => [
    { path: `projects/${projectname}` }
  ]),
  // Map state to props
  connect(({ firebase: { data } }, { params: { projectname } }) => ({
    project: data.projects && data.projects[projectname]
    // project: get(data, `projects.${projectname}`) // lodash's get can be used for convience
  })),
  spinnerWhileLoading(['project']) // handle loading data
)

const Project = ({ project, params }) => {
  if (isEmpty(project)) {
    return <div>Project not found</div>
  }

  return (
    <div className={classes.container}>
      <h2>Project Container</h2>
      <pre>Project Key: {params.projectname}</pre>
      <pre>{JSON.stringify(project, null, 2)}</pre>
    </div>
  )
}

Project.propTypes = {
  project: PropTypes.object,
  params: PropTypes.object.isRequired
}

export default enhance(Project)
