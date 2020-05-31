import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from 'components/FormTextField'
import { required, validateEmail } from 'utils/form'
import styles from './SignupForm.styles'

const useStyles = makeStyles(styles)

function SignupForm({ pristine, submitting, handleSubmit }) {
  const classes = useStyles()

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Field
        name="username"
        component={TextField}
        autoComplete="username"
        label="Username"
        validate={required}
      />
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
          {submitting ? 'Loading' : 'Sign Up'}
        </Button>
      </div>
    </form>
  )
}

SignupForm.propTypes = {
  pristine: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  submitting: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  handleSubmit: PropTypes.func.isRequired // from enhancer (reduxForm - calls onSubmit)
}

export default SignupForm
