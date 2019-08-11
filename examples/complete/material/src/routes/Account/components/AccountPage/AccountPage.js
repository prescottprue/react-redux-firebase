import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import defaultUserImageUrl from 'static/User.png'
import AccountForm from '../AccountForm'

function AccountPage({ avatarUrl, updateAccount, profile, classes }) {
  return (
    <div className={classes.root}>
      <Paper className={classes.pane}>
        <div className={classes.settings}>
          <div>
            <img
              className={classes.avatarCurrent}
              src={avatarUrl || defaultUserImageUrl}
              alt=""
            />
          </div>
          <div className={classes.meta}>
            <AccountForm
              onSubmit={updateAccount}
              account={profile}
              initialValues={profile}
            />
          </div>
        </div>
      </Paper>
    </div>
  )
}

AccountPage.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  updateAccount: PropTypes.func.isRequired, // from enhancer (withHandlers)
  avatarUrl: PropTypes.string,
  profile: PropTypes.object
}

export default AccountPage
