import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, submit } from 'redux-form'
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import TextField from 'components/TextField'
import { List, ListItem } from 'material-ui/List'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import { RECOVER_CODE_FORM_NAME } from 'constants/formNames'
import classes from './RecoverForm.scss'

const required = value => value ? undefined : 'Required'

export const RecoverForm = ({ account, handleSubmit, onRecoverClick, submitting, pristine, valid }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>Recover Using Code From Email</h4>
    <div>
      <Subheader>
        <strong>Note:</strong> Not used for OAuth
      </Subheader>
    </div>
    <Field
      name='code'
      component={TextField}
      label='Recover Code'
      validate={[required]}
    />
    <Field
      name='password'
      component={TextField}
      label='New Password'
      validate={[required]}
    />
    <div className={classes.submit}>
      <RaisedButton
        label='Recover'
        primary
        type='submit'
        disabled={submitting}
      />
    </div>
  </form>
)

RecoverForm.propTypes = {
  account: PropTypes.shape({
    providerData: PropTypes.array
  }),
  handleSubmit: PropTypes.func,
  onRecoverClick: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: RECOVER_CODE_FORM_NAME
})(RecoverForm)
