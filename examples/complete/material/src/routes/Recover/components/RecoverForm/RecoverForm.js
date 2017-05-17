import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import TextField from 'components/TextField'
import { required } from 'utils/forms'
import { RECOVER_CODE_FORM_NAME } from 'constants'
import classes from './RecoverForm.scss'

export const RecoverForm = ({ account, handleSubmit, onRecoverClick, submitting, pristine, valid }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>Recover Using Code From Email</h4>
    <div>
      <Subheader>
        <strong>Note:</strong> Not used for OAuth
      </Subheader>
    </div>
    <Field
      name='code'
      component={TextField}
      label='Recover Code'
      validate={[required]}
    />
    <Field
      name='password'
      component={TextField}
      label='New Password'
      validate={[required]}
    />
    <div className={classes.submit}>
      <RaisedButton
        label='Recover'
        primary
        type='submit'
        disabled={submitting}
      />
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
