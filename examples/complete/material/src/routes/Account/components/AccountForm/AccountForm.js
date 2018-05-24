import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import Button from '@material-ui/core/Button'
import { TextField } from 'redux-form-material-ui'
import ProviderDataForm from '../ProviderDataForm'
import classes from './AccountForm.scss'

export const AccountForm = ({
  account,
  handleSubmit,
  submitting,
  pristine
}) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>Account</h4>
    <div className={classes.fields}>
      <Field
        fullWidth
        name="displayName"
        component={TextField}
        className={classes.field}
        label="Display Name"
      />
      <Field
        name="email"
        label="Email"
        component={TextField}
        fullWidth
        className={classes.field}
      />
      <Field
        name="avatarUrl"
        label="Avatar Url"
        component={TextField}
        className={classes.field}
        fullWidth
      />
    </div>
    {!!account &&
      !!account.providerData && (
        <div>
          <h4>Linked Accounts</h4>
          <ProviderDataForm providerData={account.providerData} />
        </div>
      )}
    <div className={classes.submit}>
      <Button color="primary" type="submit" disabled={pristine || submitting}>
        {submitting ? 'Saving' : 'Save'}
      </Button>
    </div>
  </form>
)

AccountForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default AccountForm
