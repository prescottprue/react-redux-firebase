import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import { RECOVER_PATH, LOGIN_FORM_NAME } from 'constants'
import { validateEmail } from 'utils/form'
import classes from './LoginForm.scss'

export const LoginForm = ({
  pristine,
  reset,
  submitting,
  handleSubmit,
  loginDisabled
}) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <Field
      name="email"
      component={TextField}
      floatingLabelText="Email"
      validate={[validateEmail]}
    />
    <Field
      name="password"
      component={TextField}
      floatingLabelText="Password"
      type="password"
    />
    <div>
      <strong>OR</strong>
    </div>
    <Field
      name="phoneNumber"
      component={TextField}
      disabled={loginDisabled}
      floatingLabelText="Phone"
    />
    <div className={classes.submit}>
      <RaisedButton
        label={submitting ? 'Loading' : 'Clear'}
        secondary
        onTouchTap={reset}
        type="reset"
        disabled={pristine || submitting}
        style={{ marginRight: '2rem' }}
      />
      <RaisedButton
        label={submitting ? 'Loading' : 'Login'}
        primary
        type="submit"
        disabled={loginDisabled || pristine || submitting}
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
  loginDisabled: PropTypes.bool,
  pristine: PropTypes.bool.isRequired, // added by redux-form
  reset: PropTypes.func.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form
}

export default reduxForm({
  form: LOGIN_FORM_NAME
})(LoginForm)
