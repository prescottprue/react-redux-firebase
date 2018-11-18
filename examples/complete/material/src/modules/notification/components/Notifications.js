import React from 'react'
import PropTypes from 'prop-types'
import { size } from 'lodash'
import { connect } from 'react-redux'
import { compose, renderNothing, branch } from 'recompose'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import * as actions from '../actions'

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

const enhance = compose(
  connect(
    ({ notifications: { allIds, byId } }) => ({ allIds, byId }),
    actions
  ),
  branch(props => !size(props.allIds), renderNothing), // only render if notifications exist
  withStyles(styles)
)

export default enhance(Notifications)
