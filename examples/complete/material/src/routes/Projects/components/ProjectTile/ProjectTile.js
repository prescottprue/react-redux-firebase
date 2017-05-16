import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import { isObject } from 'lodash'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

import classes from './ProjectTile.scss'

export const ProjectTile = ({ project, onSelect, onDelete, showDelete }) => (
  <Paper className={classes.container}>
    <div className={classes.top}>
      <span className={classes.name} onClick={() => onSelect(project)}>
        {project.name}
      </span>
      {
        showDelete && onDelete
          ? <IconButton
            tooltip='delete'
            onClick={onDelete}
            >
            <DeleteIcon />
          </IconButton>
          : null
      }

    </div>
    <span className={classes.owner}>
      {
        isObject(project.createdBy)
          ? project.createdBy.displayName
          : project.createdBy || 'No Owner'
      }
    </span>
  </Paper>
)

ProjectTile.propTypes = {
  project: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showDelete: PropTypes.bool
}

export default ProjectTile
