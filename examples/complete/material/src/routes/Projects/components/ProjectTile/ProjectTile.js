import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { isObject } from 'lodash'
import classes from './ProjectTile.scss'

export const ProjectTile = ({ project, onSelect }) =>
  <Paper className={classes.container}>
    <div className={classes.top}>
      <span className={classes.name} onClick={() => onSelect(project)}>
        {project.name}
      </span>
    </div>
    <span className={classes.owner}>
      {isObject(project.createdBy)
        ? project.createdBy.displayName
        : project.createdBy || 'No Owner'}
    </span>
  </Paper>

ProjectTile.propTypes = {
  project: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default ProjectTile
