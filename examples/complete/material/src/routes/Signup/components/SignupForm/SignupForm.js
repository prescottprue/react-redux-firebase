import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm } from 'redux-form'
import { SIGNUP_FORM_NAME } from 'constants/formNames'
import TextField from 'components/TextField'
import classes from './SignupForm.scss'
const buttonStyle = { width: '100%' }

const required = value => value ? undefined : 'Required'
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined

const SignupForm = ({ handleSubmit, submitting }) => {
  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <Field
        name='username'
        component={TextField}
        label='Username'
        validate={[required]}
      />
      <Field
        name='email'
        component={TextField}
        label='Email'
        validate={[required, email]}
      />
      <Field
        name='password'
        component={TextField}
        label='Password'
        type='password'
        validate={[required]}
      />
      <div className={classes.submit}>
        <RaisedButton
          label='Signup'
          primary
          type='submit'
          disabled={submitting}
          style={buttonStyle}
        />
      </div>
    </form>
  )
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: SIGNUP_FORM_NAME
})(SignupForm)
