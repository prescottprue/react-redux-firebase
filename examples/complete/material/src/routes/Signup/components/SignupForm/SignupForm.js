import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import classes from './SignupForm.scss'
const buttonStyle = { width: '100%' }

 // redux-form
import { Field, reduxForm } from 'redux-form'
import TextField from '../../../../components/TextField'

const validate = values => {
  const errors = {}
  if (!values.email) errors.email = 'Required'
  if (!values.password) errors.password = 'Required'
  return errors
}

const SignupForm = ({ handleSubmit, submitting }) => {
  return (
    <form className={classes['container']} onSubmit={handleSubmit}>
      <div>
        <Field name='username' component={TextField} label='Username' />
      </div>
      <div>
        <Field name='email' component={TextField} label='Email' />
      </div>
      <div>
        <Field name='password' component={TextField} label='Password' type='password' />
      </div>
      <div className={classes['submit']}>
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
  form: 'Signup',
  validate
})(SignupForm)
