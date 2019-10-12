import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import AccountCircle from '@material-ui/icons/AccountCircle'

function ProviderData({ providerData }) {
  return (
    <List subheader={<ListSubheader>Accounts</ListSubheader>}>
      {providerData.map(providerAccount => (
        <ListItem key={`Provider-${providerAccount.providerId}`}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={providerAccount.providerId} />
        </ListItem>
      ))}
    </List>
  )
}

ProviderData.propTypes = {
  providerData: PropTypes.array.isRequired
}

export default ProviderData
