import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, submit } from 'redux-form'
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'components/TextField'
import { List, ListItem } from 'material-ui/List'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import { RECOVER_EMAIL_FORM_NAME } from 'constants'
import classes from './EmailForm.scss'

const required = value => value ? undefined : 'Required'
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined

export const EmailForm = ({ account, handleSubmit, submitting, pristine, valid }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>Send Recovery Code To Email</h4>
    <Field
      name='email'
      component={TextField}
      label='Email'
      validate={[required, email]}
    />
    <div className={classes.submit}>
      <RaisedButton
        label='Send'
        primary
        type='submit'
        disabled={submitting}
      />
    </div>
  </form>
)

EmailForm.propTypes = {
  account: PropTypes.shape({
    providerData: PropTypes.array
  }),
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: RECOVER_EMAIL_FORM_NAME
})(EmailForm)
