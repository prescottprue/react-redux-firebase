import PropTypes from 'prop-types'
import { compose, setPropTypes } from 'recompose'
import { reduxForm } from 'redux-form'
import { LOGIN_FORM_NAME } from 'constants/formNames'
import { withStyles } from '@material-ui/core/styles'
import styles from './LoginForm.styles'

export default compose(
  // set proptypes used in HOCs
  setPropTypes({
    onSubmit: PropTypes.func.isRequired // eslint-disable-line react/no-unused-prop-types
  }),
  reduxForm({
    form: LOGIN_FORM_NAME
  }),
  withStyles(styles)
)
