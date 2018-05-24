import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AccountMenu from './AccountMenu'
import LoginMenu from './LoginMenu'
import { LIST_PATH } from 'constants'
import classes from './Navbar.scss'

export const Navbar = ({
  avatarUrl,
  displayName,
  authExists,
  goToAccount,
  handleLogout,
  closeAccountMenu,
  anchorEl,
  handleMenu
}) => (
  <AppBar position="static">
    <Toolbar>
      <Typography
        type="title"
        color="inherit"
        className={classes.flex}
        component={Link}
        to={authExists ? LIST_PATH : '/'}>
        material
      </Typography>
      {authExists ? (
        <AccountMenu
          avatarUrl={avatarUrl}
          displayName={displayName}
          onLogoutClick={handleLogout}
          goToAccount={goToAccount}
          closeAccountMenu={closeAccountMenu}
          handleMenu={handleMenu}
          anchorEl={anchorEl}
        />
      ) : (
        <LoginMenu />
      )}
    </Toolbar>
  </AppBar>
)

Navbar.propTypes = {
  displayName: PropTypes.string, // from enhancer (flattenProps - profile)
  avatarUrl: PropTypes.string, // from enhancer (flattenProps - profile)
  authExists: PropTypes.bool, // from enhancer (withProps - auth)
  goToAccount: PropTypes.func.isRequired, // from enhancer (withHandlers - router)
  handleLogout: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  closeAccountMenu: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  handleMenu: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  anchorEl: PropTypes.object // from enhancer (withStateHandlers - handleMenu)
}

export default Navbar
