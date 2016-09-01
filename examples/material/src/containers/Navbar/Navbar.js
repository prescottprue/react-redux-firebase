import React, { Component, PropTypes } from 'react'
import './Navbar.css'
import { Link } from 'react-router'
// Components
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'

const stockPhotoUrl = 'https://s3.amazonaws.com/kyper-cdn/img/User.png'
const originSettings = { horizontal: 'right', vertical: 'bottom' }
const buttonStyle = { color: 'white' }
const avatarSize = 50

// redux/firebase
import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-firebasev3'
const { pathToJS } = helpers

@firebase()
@connect(
  // Map state to props
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Navbar extends Component {

  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object
  }


  render () {
    const { account, router } = this.props

    const iconButton = (
      <Avatar
        className='Navbar-Avatar'
        src={account && account.avatar_url ? account.avatar_url : stockPhotoUrl}
        size={avatarSize}
      />
    )

    const mainMenu = (
      <div className='Navbar-Main-Menu'>
        <FlatButton
          label='Sign Up'
          style={buttonStyle}
          onClick={() => router.push('/signup')}
        />
        <FlatButton
          label='Login'
          style={buttonStyle}
          onClick={() => router.push('/login')}
        />
      </div>
    )

    const rightMenu = account && account.username ? (
      <IconMenu
        iconButtonElement={iconButton}
        targetOrigin={originSettings}
        anchorOrigin={originSettings}
      >
        <MenuItem
          primaryText='Account'
          value='account'
          onClick={() => router.push('/signup')}
        />
        <MenuItem
          primaryText='Sign out'
          value='logout'
        />
      </IconMenu>
    ) : mainMenu

    return (
      <AppBar
        title={
          <Link to='/' style={buttonStyle}>
            redux-firebasev3
          </Link>
        }
        className='Navbar'
        showMenuIconButton={false}
        iconElementRight={rightMenu}
      />
    )
  }
}
