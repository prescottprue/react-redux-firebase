import { size, map } from 'lodash'

/**
 * @description Fix path by adding "/" to path if needed
 * @param {String} path - Path string to fix
 * @return {String} - Fixed path
 */
export const fixPath = path =>
  ((path.substring(0, 1) === '/') ? '' : '/') + path

/**
 * @description Convert Immutable Map to a Javascript object
 * @param {Object} data - Immutable Map to be converted to JS object (state.firebase)
 * @return {Object} data - Javascript version of Immutable Map
 * @return {Object} Data located at path within Immutable Map
 */
export const toJS = data => {
  if (data && data.toJS) {
    return data.toJS()
  }

  return data
}

/**
 * @description Convert parameter from Immutable Map to a Javascript object
 * @param {Map} firebase - Immutable Map to be converted to JS object (state.firebase)
 * @param {String} path - Path from state.firebase to convert to JS object
 * @param {Object|String|Boolean} notSetValue - Value to use if data is not available
 * @return {Object} Data located at path within Immutable Map
 * @example <caption>Basic</caption>
 * import { connect } from 'react-redux'
 * import { firebaseConnect, helpers } from 'react-redux-firebase'
 * const { pathToJS } = helpers
 * const fbWrapped = firebaseConnect()(App)
 * export default connect(({ firebase }) => ({
 *   profile: pathToJS(firebase, 'profile'),
 *   auth: pathToJS(firebase, 'auth')
 * }))(fbWrapped)
 */
export const pathToJS = (data, path, notSetValue) => {
  if (!data) {
    return notSetValue
  }

  const pathArr = fixPath(path).split(/\//).slice(1)

  if (data.getIn) {
    return toJS(data.getIn(pathArr, notSetValue))
  }

  return data
}

/**
 * @description Convert parameter under "data" path of Immutable Map to a Javascript object
 * @param {Map} firebase - Immutable Map to be converted to JS object (state.firebase)
 * @param {String} path - Path of parameter to load
 * @param {Object|String|Boolean} notSetValue - Value to return if value is not found
 * @return {Object} Data located at path within Immutable Map
 * @example <caption>Basic</caption>
 * import { connect } from 'react-redux'
 * import { firebaseConnect, helpers } from 'react-redux-firebase'
 * const { dataToJS } = helpers
 * const fbWrapped = firebaseConnect([
 *   'todos'
 * ])(App)
 * export default connect(({ firebase }) => ({
 *   dataToJS(firebase, 'todos')
 * }))(fbWrapped)
 */
export const dataToJS = (data, path, notSetValue) => {
  if (!data) {
    return notSetValue
  }

  const dataPath = '/data' + fixPath(path)

  const pathArr = dataPath.split(/\//).slice(1)

  if (data.getIn) {
    return toJS(data.getIn(pathArr, notSetValue))
  }

  return data
}

/**
 * @description Load custom object from within store
 * @param {Map} firebase - Immutable Map to be converted to JS object (state.firebase)
 * @param {String} path - Path of parameter to load
 * @param {String} customPath - Part of store from which to load
 * @param {Object|String|Boolean} notSetValue - Value to return if value is not found
 * @return {Object} Data located at path within Immutable Map
 */
export const customToJS = (data, path, custom, notSetValue) => {
  if (!(data && data.getIn)) {
    return notSetValue
  }

  const customPath = '/' + custom + fixPath(path)

  const pathArr = customPath.split(/\//).slice(1)

  if (data.getIn) {
    return toJS(data.getIn(pathArr, notSetValue))
  }

  return data
}

/**
 * @description Convert Immutable Map to a Javascript object
 * @param {Map} snapshot - Snapshot from store
 * @param {String} path - Path of snapshot to load
 * @param {Object|String|Boolean} notSetValue - Value to return if value is not found
 * @return {Object} Data located at path within Immutable Map
 */
export const snapshotToJS = (snapshot, path, notSetValue) => {
  if (!snapshot) {
    return notSetValue
  }

  const snapshotPath = '/snapshot' + fixPath(path)

  const pathArr = snapshotPath.split(/\//).slice(1)

  if (snapshot.getIn) {
    return toJS(snapshot.getIn(pathArr, notSetValue))
  }

  return snapshot
}

/**
 * @description Detect whether items are loaded yet or not
 * @param {Object} item - Item to check loaded status of. A comma seperated list is also acceptable.
 * @return {Boolean} Whether or not item is loaded
 */
export const isLoaded = function () {
  if (!arguments || !arguments.length) {
    return true
  }

  return map(arguments, a => a !== undefined).reduce((a, b) => a && b)
}

/**
 * @description Detect whether items are empty or not
 * @param {Object} item - Item to check loaded status of. A comma seperated list is also acceptable.
 * @return {Boolean} Whether or not item is empty
 */
export const isEmpty = data => !(data && size(data))

export default {
  toJS,
  pathToJS,
  dataToJS,
  snapshotToJS,
  customToJS,
  isLoaded,
  isEmpty
}
