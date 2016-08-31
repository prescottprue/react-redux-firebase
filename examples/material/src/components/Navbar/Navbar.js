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
const originSettings = { horizontal: 'right', vertical: 'top' }
const buttonStyle = { color: 'white' }
const avatarSize = 50

export default class Navbar extends Component {

  static propTypes = {
    account: PropTypes.object,
    onMenuClick: PropTypes.func,
    onLogoutClick: PropTypes.func
  }

  selectItem = (item) => {
    if (item === 'logout' && this.props.onLogoutClick) {
      return this.props.onLogoutClick()
    }
    if (this.props.onMenuClick) {
      this.props.onMenuClick(item)
    }
  }

  render () {
    const { account } = this.props

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
          onClick={() => this.selectItem('signup')}
        />
        <FlatButton
          label='Login'
          style={buttonStyle}
          onClick={() => this.selectItem('login')}
        />
      </div>
    )

    const rightMenu = account && account.username ? (
      <IconMenu
        iconButtonElement={iconButton}
        targetOrigin={originSettings}
        anchorOrigin={originSettings}
        onChange={this.selectItem}
      >
        <MenuItem primaryText='Account' value='account' />
        <MenuItem primaryText='About' value='about' />
        <MenuItem primaryText='Sign out' value='logout' />
      </IconMenu>
    ) : mainMenu

    return (
      <AppBar
        title={
          <Link to='/' style={{color: 'white'}}>
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
