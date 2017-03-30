import React, { PropTypes } from 'react'
import { Field, reduxForm, submit } from 'redux-form'
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'components/TextField'
import { ACCOUNT_FORM_NAME } from 'constants/formNames'
import { connect } from 'react-redux'
import ProviderDataForm from '../ProviderDataForm/ProviderDataForm'
import classes from './AccountForm.scss'

export const AccountForm = ({ account, handleSubmit, submitForm, submitting }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>Account</h4>
    <Field
      name='displayName'
      component={TextField}
      label='Name'
    />
    <Field
      name='email'
      component={TextField}
      label='Email'
    />
    <div>
      <h4>Linked Accounts</h4>
      {
        account.providerData &&
          <ProviderDataForm providerData={account.providerData} />
      }
    </div>
    <div>
      <RaisedButton
        label='Save'
        primary
        type='submit'
        onTouchTap={submitForm}
        disabled={submitting}
      />
    </div>
  </form>
)

AccountForm.propTypes = {
  account: PropTypes.shape({
    providerData: PropTypes.array
  }),
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

const form = reduxForm({
  form: ACCOUNT_FORM_NAME,
  enableReinitialization: true
})(AccountForm)

export default connect(
  ({ firebase }) => ({
    initialValues: pathToJS(firebase, 'profile')
  }),
)(form)
