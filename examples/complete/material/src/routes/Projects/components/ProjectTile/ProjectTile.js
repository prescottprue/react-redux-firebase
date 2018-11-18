import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'

export const ProjectTile = ({
  name,
  onSelect,
  onDelete,
  showDelete,
  classes
}) => (
  <Paper className={classes.root}>
    <div className={classes.top}>
      <span className={classes.name} onClick={onSelect}>
        {name || 'No Name'}
      </span>
      {showDelete && onDelete ? (
        <Tooltip title="delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </div>
  </Paper>
)

ProjectTile.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  name: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  showDelete: PropTypes.bool
}

ProjectTile.defaultProps = {
  showDelete: true
}

export default ProjectTile
