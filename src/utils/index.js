import { constant, isEqual, some, filter } from 'lodash'
export { getEventsFromInput } from './events'

/**
 * Check to see if a variable is a string
 * @param {any} varToCheck - Variable to check for type string
 * @returns {boolean} Whether or not the provided value is a string
 */
export function isString(varToCheck) {
  return typeof varToCheck === 'string' || varToCheck instanceof String
}

/**
 * @private
 * @param {Function|object|Array|string} f function or value of return for new function
 * @returns {any} Callable
 */
export function createCallable(f) {
  return typeof f === 'function' ? f : constant(f)
}

/**
 * Invoke function or handle existing array to create array
 * query settings
 * @param {any} f - Function or array of queries
 * @param {object} props - Component props
 * @returns {Array|null} Array of query settings
 */
export function invokeArrayQuery(f, props) {
  const result = createCallable(f)(props)
  if (Array.isArray(result)) {
    return result
  }
  if (!result) {
    return null
  }
  return [result]
}

/**
 * Get the displayName field of a component falling
 * back to name field then finally to "component".
 * @param {React.Component} Component - Component from
 * which to get displayName
 * @returns {string} Display name of component
 */
function getDisplayName(Component) {
  if (typeof Component === 'string') {
    return Component
  }

  if (!Component) {
    return undefined
  }

  return Component.displayName || Component.name || 'Component'
}

/**
 * Get provided react component's display name and wrap with with a passed name.
 * @param {React.Component} BaseComponent - Component from which to get name to wrap
 * @param {string} hocName - Name of wrapping hoc
 * @returns {string} Wrapped display name for component
 */
export function wrapDisplayName(BaseComponent, hocName) {
  return `${hocName}(${getDisplayName(BaseComponent)})`
}

/**
 * Get changes between two query settings arrays
 * @param {Array} data - Query settings array
 * @param {Array} prevData - Previous query settings array
 * @returns {object} Object containing added and removed value changes
 */
export function getChanges(data = [], prevData = []) {
  const result = {}
  result.added = filter(data, (d) => !some(prevData, (p) => isEqual(d, p)))
  result.removed = filter(prevData, (p) => !some(data, (d) => isEqual(p, d)))
  return result
}
