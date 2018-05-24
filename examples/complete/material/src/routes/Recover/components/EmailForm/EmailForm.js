import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Button from '@material-ui/core/Button'
import { required, email } from 'utils/forms'
import { RECOVER_EMAIL_FORM_NAME } from 'constants'
import classes from './EmailForm.scss'

export const EmailForm = ({
  account,
  handleSubmit,
  submitting,
  pristine,
  valid
}) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>Send Recovery Code To Email</h4>
    <Field
      name="email"
      component={TextField}
      label="Email"
      validate={[required, email]}
    />
    <div className={classes.submit}>
      <Button color="primary" type="submit" disabled={submitting}>
        {submitting ? 'Loading...' : 'Send'}
      </Button>
    </div>
  </form>
)

EmailForm.propTypes = {
  account: PropTypes.shape({
    providerData: PropTypes.array
  }),
  pristine: PropTypes.bool, // added by redux-form
  valid: PropTypes.bool, // added by redux-form
  handleSubmit: PropTypes.func.isRequired, // added by redux-form
  submitting: PropTypes.bool // added by redux-form
}

export default reduxForm({
  form: RECOVER_EMAIL_FORM_NAME
})(EmailForm)
