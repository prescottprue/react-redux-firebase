import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import { isObject } from 'lodash'

import classes from './ProjectTile.scss'

export const ProjectTile = ({ project, onSelect }) => (
  <Paper key={`Project-${project.name}`} className={classes['container']}>
    <div className={classes['top']}>
      <span className={classes['name']} onClick={() => onSelect(project)}>
        {project.name}
      </span>
    </div>
    <span className={classes['owner']}>
      {
        isObject(project.owner)
          ? project.owner.displayName
          : project.owner || 'No Owner'
      }
    </span>
  </Paper>
)

ProjectTile.propTypes = {
  project: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default ProjectTile
