import { isFunction } from 'lodash'
export { getEventsFromInput } from './events'

/**
 * @private
 * @description Create a function if not already one
 * @param {Function|Object|Array|String} Callable function or value of return for new function
 */
export const createCallable = f => isFunction(f) ? f : () => f

/**
 * @private
 * @description Validate config input
 * @param {Object} Config object containing all combined configs
 */
export const validateConfig = (config) => {
  // require needed Firebase config
  const requiredProps = [
    'databaseURL',
    'authDomain',
    'apiKey'
  ]
  requiredProps.forEach((p) => {
    if (!config[p]) {
      throw new Error(`${p} is a required config parameter for react-redux-firebase.`)
    }
  })

  // Check that some certain config are functions if they exist
  const functionProps = [
    'fileMetadataFactory',
    'profileDecorator',
    'onAuthStateChange'
  ]

  functionProps.forEach((p) => {
    if (!!config[p] && !isFunction(config[p])) {
      throw new Error(`${p} parameter in react-redux-firebase config must be a function. check your compose function.`)
    }
  })
}
