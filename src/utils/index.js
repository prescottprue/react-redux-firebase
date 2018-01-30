import { isFunction } from 'lodash'
export { getEventsFromInput } from './events'

/**
 * @private
 * @description Create a function if not already one
 * @param {Function|Object|Array|String} Callable function or value of return for new function
 */
export const createCallable = f => (isFunction(f) ? f : () => f)

export const getDisplayName = Component => {
  if (typeof Component === 'string') {
    return Component
  }

  if (!Component) {
    return undefined
  }

  return Component.displayName || Component.name || 'Component'
}

export const wrapDisplayName = (BaseComponent, hocName) =>
  `${hocName}(${getDisplayName(BaseComponent)})`

export const stringToDate = strInput => {
  try {
    return new Date(JSON.parse(strInput))
  } catch (err) {
    console.error('Error parsing string to date:', err.message || err) // eslint-disable-line no-console
    return strInput
  }
}
