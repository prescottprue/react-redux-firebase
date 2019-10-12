/**
 * Returns error message if value does not exist, otherwise returns
 * undefined
 * @param {string} value - Email to validate
 * @returns {string|undefined} Required string if value is undefined
 * @example <caption>Required Field</caption>
 * <Field
 *   name="password"
 *   component={TextField}
 *   label="Password"
 *   type="password"
 *   validate={required}
 * />
 */
export function required(value) {
  return value ? undefined : 'Required'
}

/**
 * Returns error message if value is not a valid email, otherwise returns
 * undefined
 * @param {string} value - Email to validate
 * @returns {string|undefined} Required string if value is undefined
 * @example <caption>Basic</caption>
 * <Field
 *   name="email"
 *   component={TextField}
 *   label="Email"
 *   validate={validateEmail}
 * />
 */
export function validateEmail(value) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
}
