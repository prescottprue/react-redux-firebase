import react, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, dataToJS } from 'react-redux-firebase'
import LoadingSpinner from 'components/LoadingSpinner'
import classes from './Project.scss'

export const Project = ({ projects, params: { projectname } }) => (
  <div className={classes.container}>
    {
      projects[projectname]
        ?
          <div>
            <h2>Project Container</h2>
            <pre>{JSON.stringify(projects[projectname], null, 2)}</pre>
          </div>
        :
          <div className={classes.empty}>
            <span>Project Not Found</span>
          </div>
    }
  </div>
)

Project.propTypes = {
  projects: PropTypes.object,
  params: PropTypes.object.isRequired,
  children: PropTypes.object
}

export default Project
