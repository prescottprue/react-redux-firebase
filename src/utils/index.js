import { isFunction } from 'lodash'
import { getEventsFromInput } from './events'

/**
 * @description Create a function if not already one
 * @param {Function|Object|Array|String} Callable function or value of return for new function
 */
export const createCallable = f => isFunction(f) ? f : () => f

export {
  getEventsFromInput
}

export default {
  createCallable,
  getEventsFromInput
}
