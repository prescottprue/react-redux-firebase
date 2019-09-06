import { constant, isEqual, some, filter } from 'lodash'
export { getEventsFromInput } from './events'

/**
 * Check to see if a variable is a string
 * @param {Any} varToCheck - Variable to check for type string
 */
export function isString(varToCheck) {
  return typeof varToCheck === 'string' || varToCheck instanceof String
}

/**
 * @private
 * @description Create a function if not already one
 * @param {Function|Object|Array|String} Callable function or value of return for new function
 */
export function createCallable(f) {
  return typeof f === 'function' ? f : constant(f)
}

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
 * @returns {String} Display name of component
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
 * @param {String} hocName - Name of wrapping hoc
 */
export function wrapDisplayName(BaseComponent, hocName) {
  return `${hocName}(${getDisplayName(BaseComponent)})`
}

export function getChanges(data = [], prevData = []) {
  const result = {}
  result.added = filter(data, d => !some(prevData, p => isEqual(d, p)))
  result.removed = filter(prevData, p => !some(data, d => isEqual(p, d)))
  return result
}
