import React, { Component, PropTypes } from 'react'

import classes from './ProjectContainer.scss'
import CircularProgress from 'material-ui/CircularProgress'

// redux/firebase
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, dataToJS } = helpers

@firebase(
  // Get paths from firebase
  ({ params }) => ([
    `projects/${params.projectname}`
  ])
)
@connect(
  // Map state to props
  ({ firebase }, { params }) => ({
    project: dataToJS(firebase, `projects/${params.projectname}`)
  })
)
export default class Project extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    project: PropTypes.object,
    params: PropTypes.object.isRequired,
    children: PropTypes.object
  }

  render () {
    const { project } = this.props

    if (!isLoaded(project)) {
      return (
        <div className={classes['progress']}>
          <CircularProgress />
        </div>
      )
    }

    return (
      <div className={classes['container']}>
        <h2>Project Container</h2>
        <pre>{JSON.stringify(project, null, 2)}</pre>
      </div>
    )
  }
}
