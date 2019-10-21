import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import styles from './NotFoundPage.styles'

const useStyles = makeStyles(styles)

function NotFoundPage() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h2">Whoops! 404!</Typography>
      <p>This page was not found.</p>
    </div>
  )
}

export default NotFoundPage
