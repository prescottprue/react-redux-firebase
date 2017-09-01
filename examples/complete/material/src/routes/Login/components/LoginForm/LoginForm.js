import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import { RECOVER_PATH, LOGIN_FORM_NAME } from 'constants'
import { required, validateEmail } from 'utils/form'
import classes from './LoginForm.scss'

export const LoginForm = ({ pristine, submitting, handleSubmit }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
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
        label={submitting ? 'Loading' : 'Login'}
        primary
        type="submit"
        disabled={pristine || submitting}
      />
    </div>
    <div className={classes.options}>
      <div className={classes.remember}>
        <Checkbox
          name="remember"
          value="remember"
          label="Remember"
          labelStyle={{ fontSize: '.8rem' }}
        />
      </div>
      <Link className={classes.recover} to={RECOVER_PATH}>
        Forgot Password?
      </Link>
    </div>
  </form>
)

LoginForm.propTypes = {
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form
}

export default reduxForm({
  form: LOGIN_FORM_NAME
})(LoginForm)
