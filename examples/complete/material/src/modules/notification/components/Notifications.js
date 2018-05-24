import React from 'react'
import PropTypes from 'prop-types'
import { size } from 'lodash'
import { connect } from 'react-redux'
import { pure, compose, renderNothing, branch } from 'recompose'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import * as actions from '../actions'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  buttonRoot: {
    color: 'white'
  }
}

export const Notifications = ({
  allIds,
  byId,
  dismissNotification,
  classes
}) => (
  <div>
    {allIds.map(id => (
      <Snackbar
        key={id}
        open
        action={
          <IconButton
            onClick={() => dismissNotification(id)}
            classes={{ root: classes.buttonRoot }}>
            <CloseIcon />
          </IconButton>
        }
        message={byId[id].message}
      />
    ))}
  </div>
)

Notifications.propTypes = {
  allIds: PropTypes.array.isRequired,
  byId: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  dismissNotification: PropTypes.func.isRequired
}

export default compose(
  pure,
  withStyles(styles),
  connect(({ notifications: { allIds, byId } }) => ({ allIds, byId }), actions),
  branch(props => !size(props.allIds), renderNothing) // only render if notifications exist
)(Notifications)
