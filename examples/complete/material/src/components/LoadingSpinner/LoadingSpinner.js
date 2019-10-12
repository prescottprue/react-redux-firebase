import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import styles from './LoadingSpinner.styles'

const useStyles = makeStyles(styles)

function LoadingSpinner({ size }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.progress}>
        <CircularProgress mode="indeterminate" size={size || 80} />
      </div>
    </div>
  )
}

LoadingSpinner.propTypes = {
  size: PropTypes.number
}

export default LoadingSpinner
