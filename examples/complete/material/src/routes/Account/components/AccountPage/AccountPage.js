import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import AccountForm from '../AccountForm'
import defaultUserImageUrl from 'static/User.png'
import classes from './AccountPage.scss'

export const AccountPage = ({ avatarUrl, updateAccount, profile }) => (
  <div className={classes.container}>
    <Paper className={classes.pane}>
      <div className={classes.settings}>
        <div className={classes.avatar}>
          <img
            className={classes.avatarCurrent}
            src={avatarUrl || defaultUserImageUrl}
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

AccountPage.propTypes = {
  avatarUrl: PropTypes.string,
  profile: PropTypes.object,
  updateAccount: PropTypes.func
}

export default AccountPage
