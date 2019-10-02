/**
 * Log a message and return data passed. Useful for logging
 * messages within functional programming flows.
 * @param message - Message to log along with data.
 * @example Basic
 * import { flow, map as fpMap } from 'lodash'
 * const original = []
 * flow(
 *   fpLog('Before Map'),
 *   fpMap('name')
 *   fpLog('After Map'),
 * )(original)
 * // => 'Before Map' [{ name: 'test' }]
 * // => 'After Map' ['test']
 */
export function fpLog(message) {
  return existing => {
    console.log(message, existing) // eslint-disable-line no-console
    return existing
  }
}

/**
 * Initialize global scripts including analytics and error handling
 */
export function initScripts() {
  // Initialize global scripts here
}
