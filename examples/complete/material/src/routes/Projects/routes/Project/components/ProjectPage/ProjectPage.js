import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import styles from './ProjectPage.styles'

const useStyles = makeStyles(styles)

function ProjectPage({ project, projectId }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} component="h2">
            {project.name || 'Project'}
          </Typography>
          <Typography className={classes.subtitle}>{projectId}</Typography>
          <div style={{ marginTop: '10rem' }}>
            <pre>{JSON.stringify(project, null, 2)}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

ProjectPage.propTypes = {
  project: PropTypes.object.isRequired, // from enhancer (connect)
  projectId: PropTypes.string.isRequired // from enhancer (withProps)
}

export default ProjectPage
