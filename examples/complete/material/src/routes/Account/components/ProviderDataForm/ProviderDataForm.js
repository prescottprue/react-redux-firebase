import React, { PropTypes } from 'react'
import { List, ListItem } from 'material-ui/List'
import classes from './ProviderDataForm.scss'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'

export const ProviderData = ({ providerData }) => (
  <div className={classes.container}>
    <List>
      {
        providerData.map((providerAccount, i) => (
          <ListItem
            key={i}
            primaryText={providerAccount.providerId}
            leftIcon={<AccountCircle />}
            nestedItems={[
              <ListItem
                key={`Name-${i}`}
                primaryText={providerAccount.displayName}
              />,
              <ListItem
                label='email'
                key={`Email-${i}`}
                primaryText={providerAccount.email}
              />
            ]}
          />
        ))
      }
    </List>
  </div>
)

ProviderData.propTypes = {
  providerData: PropTypes.array.isRequired
}

export default ProviderData
