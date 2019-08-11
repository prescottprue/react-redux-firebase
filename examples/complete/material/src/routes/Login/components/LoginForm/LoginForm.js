import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import TextField from 'components/FormTextField'
import Button from '@material-ui/core/Button'
import { required, validateEmail } from 'utils/form'

function LoginForm({ pristine, submitting, handleSubmit, classes }) {
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Field
        name="email"
        component={TextField}
        autoComplete="email"
        label="Email"
        validate={[required, validateEmail]}
      />
      <Field
        name="password"
        component={TextField}
        autoComplete="current-password"
        label="Password"
        type="password"
        validate={required}
      />
      <div className={classes.submit}>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          disabled={pristine || submitting}>
          {submitting ? 'Loading' : 'Login'}
        </Button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  pristine: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  submitting: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  handleSubmit: PropTypes.func.isRequired // from enhancer (reduxForm - calls onSubmit)
}

export default LoginForm
