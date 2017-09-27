import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import { SIGNUP_FORM_NAME } from 'constants'
import { required, validateEmail } from 'utils/form'
import classes from './SignupForm.scss'

const SignupForm = ({ pristine, submitting, handleSubmit }) =>
  <form className={classes.container} onSubmit={handleSubmit}>
    <Field
      name="username"
      component={TextField}
      floatingLabelText="Username"
      validate={required}
    />
    <Field
      name="email"
      component={TextField}
      floatingLabelText="Email"
      validate={[required, validateEmail]}
    />
    <Field
      name="password"
      component={TextField}
      floatingLabelText="Password"
      type="password"
      validate={required}
    />
    <div className={classes.submit}>
      <RaisedButton
        label="Signup"
        primary
        type="submit"
        disabled={pristine || submitting}
      />
    </div>
  </form>
)

SignupForm.propTypes = {
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form
}

export default reduxForm({
  form: SIGNUP_FORM_NAME
})(SignupForm)
