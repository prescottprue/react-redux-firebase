import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import ContentAdd from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import { NEW_TODO_FORM_NAME } from 'constants'
import { required } from 'utils/form'
import classes from './NewTodoPanel.scss'

const NewTodoPanel = ({ submitting, handleSubmit, disabled }) => (
  <Paper className={classes.container}>
    <Typography>New Todo</Typography>
    <form className={classes.inputSection} onSubmit={handleSubmit}>
      <Field
        name="text"
        component={TextField}
        floatingLabelText="New Todo Text"
        validate={[required]}
      />
      <IconButton
        type="submit"
        disabled={submitting}
        tooltip={disabled ? 'Login To Add Todo' : 'Add Todo'}>
        <ContentAdd />
      </IconButton>
    </form>
  </Paper>
)

NewTodoPanel.propTypes = {
  handleSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: NEW_TODO_FORM_NAME
})(NewTodoPanel)
