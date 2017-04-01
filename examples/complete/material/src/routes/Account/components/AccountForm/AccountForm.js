import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, submit } from 'redux-form'
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'components/TextField'
import { List, ListItem } from 'material-ui/List'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import { ACCOUNT_FORM_NAME } from 'constants/formNames'
import classes from './AccountForm.scss'

export const AccountForm = ({ account, handleSubmit, submitForm, submitting }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>Account</h4>
    <Field
      name='displayName'
      component={TextField}
      label='Name'
    />
    <Field
      name='email'
      component={TextField}
      label='Email'
    />
    <div>
      <h4>Linked Accounts</h4>
      {
        account.providerData
          ?
            <List>
              {
                account.providerData.map((providerAccount, i) =>
                  <ListItem
                    key={i}
                    primaryText={providerAccount.providerId}
                    leftIcon={<AccountCircle />}
                    nestedItems={[
                      <ListItem
                        key='display_name'
                        primaryText={providerAccount.displayName}
                      />,
                      <ListItem
                        key='email'
                        label='email'
                        primaryText={providerAccount.email}
                        disabled
                      />
                    ]}
                  />
                )
              }
            </List>
          :
          null
      }
    </div>
    <div>
      <RaisedButton
        label='Save'
        primary
        type='submit'
        onTouchTap={submitForm}
        disabled={submitting}
      />
    </div>
  </form>
)

AccountForm.propTypes = {
  account: PropTypes.shape({
    providerData: PropTypes.array
  }),
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

const form = reduxForm({
  form: ACCOUNT_FORM_NAME,
  enableReinitialization: true
})(AccountForm)

export default connect(
  ({ firebase }) => ({
    initialValues: pathToJS(firebase, 'profile')
  }),
)(form)
