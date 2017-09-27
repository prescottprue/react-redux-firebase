import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'
import LoadingSpinner from 'components/LoadingSpinner'
import classes from './ProjectContainer.scss'

// Get project path from firebase based on params prop (route params)
@firebaseConnect(({ params }) => [`projects/${params.projectname}`])
// Map state to props
@connect(({ firebase }, { params }) => ({
  project: dataToJS(firebase, `projects/${params.projectname}`)
}))
export default class Project extends Component {
  static propTypes = {
    project: PropTypes.object,
    params: PropTypes.object.isRequired
  }

  render() {
    const { project, params } = this.props

    if (isEmpty(project)) {
      return <div>Project not found</div>
    }

    if (!isLoaded(project)) {
      return <LoadingSpinner />
    }

    return (
      <div className={classes.container}>
        <h2>Project Container</h2>
        <pre>Project Key: {params.projectname}</pre>
        <pre>{JSON.stringify(project, null, 2)}</pre>
      </div>
    )
  }
}
