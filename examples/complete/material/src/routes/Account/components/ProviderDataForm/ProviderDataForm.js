import React, { PropTypes } from 'react'
import { List, ListItem } from 'material-ui/List'
import classes from './ProviderDataForm.scss'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'

export const ProviderData = ({ providerData }) => (
  <div className={classes.container}>
    <List>
      {
        providerData.map((providerAccount, i) =>
          <ListItem
            key={i}
            primaryText={providerAccount.providerId}
            leftIcon={<AccountCircle />}
            nestedItems={[
              <ListItem
                key={'display_name'}
                primaryText={providerAccount.displayName}
              />,
              <ListItem
                key={'email'}
                label='email'
                primaryText={providerAccount.email}
                disabled
              />
            ]}
          />
        )
      }
    </List>
  </div>
)

ProviderData.propTypes = {
  providerData: PropTypes.array
}

export default ProviderData
