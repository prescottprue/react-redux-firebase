import { filter, isObject, map, get, forEach, set, has, some } from 'lodash'
import { isString } from './index'

/**
 * @private
 * Create standardized populate object from strings or objects
 * @param {string|object} str - String or Object to standardize into populate object
 * @returns {object} Populate object
 */
export function getPopulateObj(str) {
  if (!isString(str)) {
    return str
  }
  const strArray = str.split(':')
  // TODO: Handle childParam
  return { child: strArray[0], root: strArray[1] }
}

/**
 * @private
 * Determine the structure of the child parameter to populate onto
 * @param {string|object} child - Value at child parameter
 * @returns {string} Type of child
 */
export function getChildType(child) {
  if (isString(child)) {
    return 'string'
  }
  if (Array.isArray(child)) {
    return 'array'
  }
  if (isObject(child)) {
    return 'object'
  }
  return 'other'
}

/**
 * @private
 * Create standardized populate object from strings or objects
 * @param {string|object} arr - String or Object to standardize into populate object
 * @returns {Array} List of populate objects
 */
export function getPopulateObjs(arr) {
  if (!Array.isArray(arr)) {
    return arr
  }
  return arr.map(o => (isObject(o) ? o : getPopulateObj(o)))
}

/**
 * @private
 * Get array of populates from list of query params
 * @param {Array} queryParams - Query parameters from which to get populates
 * @returns {Array} Array of populate settings
 */
export function getPopulates(queryParams) {
  const populates = filter(
    queryParams,
    param =>
      param.indexOf('populate') !== -1 || (isObject(param) && param.populates)
  ).map(p => p.split('=')[1])
  // No populates
  if (!populates.length) {
    return null
  }
  return populates.map(getPopulateObj)
}

/**
 * @private
 * Create an array of promises for population of an object or list
 * @param {object} firebase - Internal firebase object
 * @param {object} populate - Object containing root to be populate
 * @param {object} populate.root - Firebase root path from which to load populate item
 * @param {string} id - String id
 * @returns {Promise} Resolves with populate child
 */
export function getPopulateChild(firebase, populate, id) {
  return firebase
    .database()
    .ref()
    .child(`${populate.root}/${id}`)
    .once('value')
    .then(snap =>
      // Return id if population value does not exist
      snap.val()
    )
}

/**
 * @private
 * Populate list of data
 * @param {object} firebase - Internal firebase object
 * @param {object} list - Object to have parameter populated
 * @param {object} p - Object containing populate information
 * @param {object} results - Object containing results of population from other populates
 * @returns {Promise} Resovles with populated list
 */
export function populateList(firebase, list, p, results) {
  // Handle root not being defined
  if (!results[p.root]) {
    set(results, p.root, {})
  }
  return Promise.all(
    map(list, (id, childKey) => {
      // handle list of keys
      const populateKey = id === true || p.populateByKey ? childKey : id
      return getPopulateChild(firebase, p, populateKey).then(pc => {
        if (pc) {
          // write child to result object under root name if it is found
          return set(results, `${p.root}.${populateKey}`, pc)
        }
        return results
      })
    })
  )
}

/**
 * @private
 * Create an array of promises for population of an object or list
 * @param {object} firebase - Internal firebase object
 * @param {string} dataKey - Object to have parameter populated
 * @param {object} originalData - Data before population
 * @param {Function|object} populatesIn - Populate configs or function returning configs
 * @returns {Promise} Promise which resolves after populate data is loaded
 */
export function promisesForPopulate(
  firebase,
  dataKey,
  originalData,
  populatesIn
) {
  // TODO: Handle selecting of parameter to populate with (i.e. displayName of users/user)
  let promisesArray = []
  let results = {}

  // test if data is a single object, try generating populates and looking for the child
  const populatesForData = getPopulateObjs(
    typeof populatesIn === 'function'
      ? populatesIn(dataKey, originalData)
      : populatesIn
  )

  const dataHasPopulateChilds = some(populatesForData, populate =>
    has(originalData, populate.child)
  )

  if (dataHasPopulateChilds) {
    // Data is a single object, resolve populates directly
    forEach(populatesForData, p => {
      if (isString(get(originalData, p.child))) {
        return promisesArray.push(
          getPopulateChild(firebase, p, get(originalData, p.child)).then(v => {
            // write child to result object under root name if it is found
            if (v) {
              set(results, `${p.root}.${get(originalData, p.child)}`, v)
            }
          })
        )
      }

      // Single Parameter is list
      return promisesArray.push(
        populateList(firebase, get(originalData, p.child), p, results)
      )
    })
  } else {
    // Data is a list of objects, each value has parameters to be populated
    // { '1': {someobject}, '2': {someobject} }
    forEach(originalData, (d, key) => {
      // generate populates for this data item if a fn was passed
      const populatesForDataItem = getPopulateObj(
        typeof populatesIn === 'function' ? populatesIn(key, d) : populatesIn
      )

      // resolve each populate for this data item
      forEach(populatesForDataItem, p => {
        // get value of parameter to be populated (key or list of keys)
        const idOrList = get(d, p.child)

        // Parameter/child of list item does not exist
        if (!idOrList) {
          return
        }

        // Parameter of each list item is single ID
        if (isString(idOrList)) {
          return promisesArray.push(
            getPopulateChild(firebase, p, idOrList).then(v => {
              // write child to result object under root name if it is found
              if (v) {
                set(results, `${p.root}.${idOrList}`, v)
              }
              return results
            })
          )
        }

        // Parameter of each list item is a list of ids
        if (Array.isArray(idOrList) || isObject(idOrList)) {
          // Create single promise that includes a promise for each child
          return promisesArray.push(
            populateList(firebase, idOrList, p, results)
          )
        }
      })
    })
  }

  // Return original data after population promises run
  return Promise.all(promisesArray).then(() => results)
}
