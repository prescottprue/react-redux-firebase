import React from 'react'
import PropTypes from 'prop-types'
import ContentAddCircle from '@material-ui/icons/AddCircle'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import styles from './NewProjectTile.styles'

const useStyles = makeStyles(styles)

function NewProjectTile({ onClick }) {
  const classes = useStyles()

  return (
    <Paper className={classes.root} onClick={onClick}>
      <ContentAddCircle className={classes.newIcon} />
    </Paper>
  )
}

NewProjectTile.propTypes = {
  onClick: PropTypes.func
}

export default NewProjectTile
