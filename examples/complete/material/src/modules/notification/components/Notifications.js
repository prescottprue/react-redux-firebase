import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import * as actions from '../actions'

const useStyles = makeStyles(() => ({
  buttonRoot: {
    color: 'white'
  }
}))

function Notifications({ allIds, byId, dismissNotification }) {
  const classes = useStyles()

  // Only render if notifications exist
  if (!allIds || !Object.keys(allIds).length) {
    return null
  }

  return (
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
}

Notifications.propTypes = {
  allIds: PropTypes.array.isRequired,
  byId: PropTypes.object.isRequired,
  dismissNotification: PropTypes.func.isRequired
}

export default connect(
  ({ notifications: { allIds, byId } }) => ({ allIds, byId }),
  actions
)(Notifications)
