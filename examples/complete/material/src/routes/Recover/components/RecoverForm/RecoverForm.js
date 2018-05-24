import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { required } from 'utils/forms'
import { RECOVER_CODE_FORM_NAME } from 'constants'
import classes from './RecoverForm.scss'

export const RecoverForm = ({
  account,
  handleSubmit,
  onRecoverClick,
  submitting,
  pristine,
  valid
}) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>Recover Using Code From Email</h4>
    <div>
      <Typography>
        <strong>Note:</strong> Not used for OAuth
      </Typography>
    </div>
    <div>
      <Field
        name="code"
        component={TextField}
        label="Recover Code"
        className={classes.field}
        validate={[required]}
      />
      <Field
        name="password"
        component={TextField}
        label="New Password"
        validate={[required]}
        className={classes.field}
      />
    </div>
    <div className={classes.submit}>
      <Button color="primary" type="submit" disabled={submitting}>
        {submitting ? 'Loading...' : 'Recover'}
      </Button>
    </div>
  </form>
)

RecoverForm.propTypes = {
  account: PropTypes.shape({
    providerData: PropTypes.array
  }),
  pristine: PropTypes.bool, // added by redux-form
  valid: PropTypes.bool, // added by redux-form
  handleSubmit: PropTypes.func, // added by redux-form
  submitting: PropTypes.bool, // added by redux-form
  onRecoverClick: PropTypes.func
}

export default reduxForm({
  form: RECOVER_CODE_FORM_NAME
})(RecoverForm)
