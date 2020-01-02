import { reduxForm } from 'redux-form'
import { LOGIN_FORM_NAME } from 'constants/formNames'

// Add Form Capabilities
export default reduxForm({ form: LOGIN_FORM_NAME })
