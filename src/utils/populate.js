import {
  filter,
  isString,
  isArray,
  isFunction,
  isObject,
  map,
  get,
  forEach,
  set,
  has,
  every
} from 'lodash'

/**
 * @private
 * @description Create standardized populate object from strings or objects
 * @param {String|Object} str - String or Object to standardize into populate object
 */
export const getPopulateObj = (str) => {
  if (!isString(str)) {
    return str
  }
  const strArray = str.split(':')
  // TODO: Handle childParam
  return { child: strArray[0], root: strArray[1] }
}
/**
 * @private
 * @description Determine the structure of the child parameter to populate onto
 * @param {String|Object} child - Value at child parameter
 */
export const getChildType = (child) => {
  if (isString(child)) {
    return 'string'
  }
  if (isArray(child)) {
    return 'array'
  }
  if (isObject(child)) {
    return 'object'
  }
  return 'other'
}

/**
 * @private
 * @description Create standardized populate object from strings or objects
 * @param {String|Object} str - String or Object to standardize into populate object
 */
export const getPopulateObjs = (arr) => {
  if (!isArray(arr)) {
    return arr
  }
  return arr.map((o) => isObject(o) ? o : getPopulateObj(o))
}

/**
 * @private
 * @description Get array of populates from list of query params
 * @param {Array} queryParams - Query parameters from which to get populates
 */
export const getPopulates = (params) => {
  const populates = filter(params, param =>
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
 * @description Create an array of promises for population of an object or list
 * @param {Object} firebase - Internal firebase object
 * @param {Object} populate - Object containing root to be populate
 * @param {Object} populate.root - Firebase root path from which to load populate item
 * @param {String} id - String id
 */
export const getPopulateChild = (firebase, populate, id) =>
  firebase.database()
   .ref()
   .child(`${populate.root}/${id}`)
   .once('value')
   .then(snap =>
     // Return id if population value does not exist
     snap.val()
   )

/**
 * @private
 * @description Populate list of data
 * @param {Object} firebase - Internal firebase object
 * @param {Object} originalObj - Object to have parameter populated
 * @param {Object} populate - Object containing populate information
 * @param {Object} results - Object containing results of population from other populates
 */
export const populateList = (firebase, list, p, results) => {
  // Handle root not being defined
  if (!results[p.root]) {
    set(results, p.root, {})
  }
  return Promise.all(
    map(list, (id, childKey) => {
      // handle list of keys
      const populateKey = id === true ? childKey : id
      return getPopulateChild(firebase, p, populateKey)
        .then(pc => {
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
 * @description Create an array of promises for population of an object or list
 * @param {Object} firebase - Internal firebase object
 * @param {Object} originalObj - Object to have parameter populated
 * @param {Object} populateString - String containg population data
 */
export const promisesForPopulate = (firebase, dataKey, originalData, populatesIn) => {
  // TODO: Handle selecting of parameter to populate with (i.e. displayName of users/user)
  let promisesArray = []
  let results = {}

  // test if data is a single object, try generating populates and looking for the child
  const populatesForData = getPopulateObjs(
    isFunction(populatesIn)
      ? populatesIn(dataKey, originalData)
      : populatesIn
  )

  const dataHasPopulateChilds = every(populatesForData, (populate) => (
    has(originalData, populate.child)
  ))

  if (dataHasPopulateChilds) {
    // Data is a single object, resolve populates directly
    forEach(populatesForData, (p) => {
      if (isString(get(originalData, p.child))) {
        return promisesArray.push(
          getPopulateChild(firebase, p, get(originalData, p.child))
            .then((v) => {
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
    // Data is a map of objects, each value has parameters to be populated
    forEach(originalData, (d, key) => {
      // generate populates for this data item if a fn was passed
      const populatesForDataItem = getPopulateObj(isFunction(populatesIn)
        ? populatesIn(key, d)
        : populatesIn)

      // resolve each populate for this data item
      forEach(populatesForDataItem, (p) => {
        // get value of parameter to be populated (key or list of keys)
        const idOrList = get(d, p.child)

        // Parameter/child of list item does not exist
        if (!idOrList) {
          return
        }

        // Parameter of each list item is single ID
        if (isString(idOrList)) {
          return promisesArray.push(
            getPopulateChild(firebase, p, idOrList)
              .then((v) => {
                // write child to result object under root name if it is found
                if (v) {
                  set(results, `${p.root}.${idOrList}`, v)
                }
                return results
              })
          )
        }

        // Parameter of each list item is a list of ids
        if (isArray(idOrList) || isObject(idOrList)) {
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

export default { promisesForPopulate }
