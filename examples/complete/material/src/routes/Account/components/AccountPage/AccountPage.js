import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import defaultUserImageUrl from 'static/User.png'
import AccountForm from '../AccountForm'
import styles from './AccountPage.styles'

const useStyles = makeStyles(styles)

function AccountPage({ avatarUrl, updateAccount, profile }) {
  const classes = useStyles()

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
  updateAccount: PropTypes.func.isRequired, // from enhancer (withHandlers)
  avatarUrl: PropTypes.string,
  profile: PropTypes.object
}

export default AccountPage
