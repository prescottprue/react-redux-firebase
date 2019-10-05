import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase/lib/helpers'
import { LIST_PATH, LOGIN_PATH } from 'constants/paths'
import AccountMenu from './AccountMenu'
import styles from './Navbar.styles'

const useStyles = makeStyles(styles)

function Navbar() {
  const classes = useStyles()

  // Get auth from redux state
  const auth = useSelector(state => state.firebase.auth)
  const authExists = isLoaded(auth) && !isEmpty(auth)

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography
          color="inherit"
          variant="h6"
          component={Link}
          to={authExists ? LIST_PATH : '/'}
          className={classes.brand}
          data-test="brand">
          material example
        </Typography>
        <div className={classes.flex} />
        {authExists ? (
          <AccountMenu />
        ) : (
          <Button
            className={classes.signIn}
            component={Link}
            to={LOGIN_PATH}
            data-test="sign-in">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
