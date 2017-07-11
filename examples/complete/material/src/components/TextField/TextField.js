import React, { PropTypes } from 'react'
import MaterialTextField from 'material-ui/TextField'

export const TextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) =>
  <MaterialTextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />

TextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object
}

export default TextField
