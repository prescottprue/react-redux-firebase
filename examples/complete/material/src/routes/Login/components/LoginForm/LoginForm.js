import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import { Field, reduxForm } from 'redux-form'
import { RECOVER_PATH } from 'constants/paths'
import { LOGIN_FORM_NAME } from 'constants/formNames'
import TextField from 'components/TextField'
import classes from './LoginForm.scss'

const required = value => value ? undefined : 'Required'
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined

export const LoginForm = ({ handleSubmit, submitting }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <Field
      name='email'
      component={TextField}
      label='Email'
      validate={[required, email]}
    />
    <Field
      name='password'
      component={TextField}
      validate={[required]}
      label='Password'
      type='password'
    />
    <div className={classes.submit}>
      <RaisedButton
        label='Login'
        primary
        type='submit'
        disabled={submitting}
      />
    </div>
    <div className={classes.options}>
      <div className={classes.remember}>
        <Checkbox
          name='remember'
          value='remember'
          label='Remember'
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
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: LOGIN_FORM_NAME
})(LoginForm)
