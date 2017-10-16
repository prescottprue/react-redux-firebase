import { isFunction } from 'lodash'
export { getEventsFromInput } from './events'

/**
 * @private
 * @description Create a function if not already one
 * @param {Function|Object|Array|String} Callable function or value of return for new function
 */
export const createCallable = f => isFunction(f) ? f : () => f

/**
 * Get the display name of a component.
 * @param  {Object|Element|String} Item from which to get display name
 * @return {String} Name of input component/element/string
 * @private
 */
export const getDisplayName = Component => (
  Component.displayName ||
  Component.name ||
  (typeof Component === 'string' ? Component : 'Component')
)
