import PropTypes from 'prop-types'
import { compose, setPropTypes } from 'recompose'
import { reduxForm } from 'redux-form'
import { ACCOUNT_FORM_NAME } from 'constants/formNames'

export default compose(
  // set proptypes used in HOCs
  setPropTypes({
    onSubmit: PropTypes.func.isRequired // used by reduxForm
  }),
  // Add form capabilities
  reduxForm({ form: ACCOUNT_FORM_NAME })
)
