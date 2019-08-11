import PropTypes from 'prop-types'
import { compose, setPropTypes } from 'recompose'
import { reduxForm } from 'redux-form'
import { LOGIN_FORM_NAME } from 'constants/formNames'
import { withStyles } from '@material-ui/core/styles'
import styles from './LoginForm.styles'

export default compose(
  // Set proptypes used in HOCs
  setPropTypes({
    onSubmit: PropTypes.func.isRequired // called by handleSubmit
  }),
  // Add Form Capabilities
  reduxForm({
    form: LOGIN_FORM_NAME
  }),
  // Add styles as props.classes
  withStyles(styles)
)
