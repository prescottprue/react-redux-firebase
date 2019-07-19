import { isFunction, constant, isEqual, some, filter } from 'lodash'
export { getEventsFromInput } from './events'

/**
 * @private
 * @description Create a function if not already one
 * @param {Function|Object|Array|String} Callable function or value of return for new function
 */
export function createCallable(f) {
  return isFunction(f) ? f : constant(f)
}

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

export function stringToDate(strInput) {
  try {
    return new Date(JSON.parse(strInput))
  } catch (err) {
    console.error('Error parsing string to date:', err.message || err) // eslint-disable-line no-console
    return strInput
  }
}

export function getChanges(data = [], prevData = []) {
  const result = {}
  result.added = filter(data, d => !some(prevData, p => isEqual(d, p)))
  result.removed = filter(prevData, p => !some(data, d => isEqual(p, d)))
  return result
}
