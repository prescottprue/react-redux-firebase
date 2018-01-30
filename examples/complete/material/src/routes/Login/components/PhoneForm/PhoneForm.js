import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import { PHONE_FORM_NAME } from 'constants'
import classes from './PhoneForm.scss'

export const PhoneForm = ({ pristine, submitting, handleSubmit }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <Field name="code" component={TextField} floatingLabelText="Code" />
    <div className={classes.submit}>
      <RaisedButton
        label={submitting ? 'Loading' : 'Login By Phone'}
        primary
        type="submit"
        disabled={pristine || submitting}
      />
    </div>
  </form>
)

PhoneForm.propTypes = {
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form
}

export default reduxForm({
  form: PHONE_FORM_NAME
})(PhoneForm)
