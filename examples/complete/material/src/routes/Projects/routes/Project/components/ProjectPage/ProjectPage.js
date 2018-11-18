import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const ProjectPage = ({ project, projectId, classes }) => (
  <div className={classes.container}>
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

ProjectPage.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  project: PropTypes.object.isRequired, // from enhancer (connect)
  projectId: PropTypes.string.isRequired // from enhancer (withProps)
}

export default ProjectPage
