import React from 'react'
import PropTypes from 'prop-types'
import classes from './Project.scss'

export const Project = ({ projects, params: { projectname } }) => (
  <div className={classes.container}>
    {
      projects[projectname]
        ? <div>
          <h2>Project Container</h2>
          <pre>{JSON.stringify(projects[projectname], null, 2)}</pre>
        </div>
        : <div className={classes.empty}>
          <span>Project Not Found</span>
        </div>
    }
  </div>
)

Project.propTypes = {
  projects: PropTypes.object,
  params: PropTypes.object.isRequired
}

export default Project
