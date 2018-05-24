import React from 'react'
import { Link } from 'react-router'
import Button from '@material-ui/core/Button'
import { LOGIN_PATH, SIGNUP_PATH } from 'constants'
import classes from './Navbar.scss'

const buttonStyle = {
  color: 'white',
  textDecoration: 'none',
  alignSelf: 'center'
}

export const LoginMenu = () => (
  <div className={classes.menu}>
    <Button style={buttonStyle} component={Link} to={SIGNUP_PATH}>
      Sign Up
    </Button>
    <Button style={buttonStyle} component={Link} to={LOGIN_PATH}>
      Login
    </Button>
  </div>
)

export default LoginMenu
