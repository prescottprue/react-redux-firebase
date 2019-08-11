import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'

function LoadingSpinner({ size, classes }) {
  return (
    <div className={classes.root}>
      <div className={classes.progress}>
        <CircularProgress mode="indeterminate" size={size || 80} />
      </div>
    </div>
  )
}

LoadingSpinner.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.number
}

export default LoadingSpinner
