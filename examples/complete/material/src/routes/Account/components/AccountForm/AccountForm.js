import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import Button from '@material-ui/core/Button'
import { TextField } from 'redux-form-material-ui'
import ProviderDataForm from '../ProviderDataForm'

export const AccountForm = ({
  account,
  handleSubmit,
  submitting,
  pristine,
  classes
}) => (
  <form className={classes.root} onSubmit={handleSubmit}>
    <h4>Account</h4>
    <div className={classes.fields}>
      <Field
        fullWidth
        name="displayName"
        component={TextField}
        label="Display Name"
      />
      <Field name="email" label="Email" component={TextField} fullWidth />
      <Field
        name="avatarUrl"
        label="Avatar Url"
        component={TextField}
        fullWidth
      />
    </div>
    {!!account && !!account.providerData && (
      <div>
        <h4>Linked Accounts</h4>
        <ProviderDataForm providerData={account.providerData} />
      </div>
    )}
    <Button color="primary" type="submit" disabled={pristine || submitting}>
      {submitting ? 'Saving' : 'Save'}
    </Button>
  </form>
)

AccountForm.propTypes = {
  account: PropTypes.object,
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  handleSubmit: PropTypes.func.isRequired, // from enhancer (reduxForm)
  pristine: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  submitting: PropTypes.bool.isRequired // from enhancer (reduxForm)
}

export default AccountForm
