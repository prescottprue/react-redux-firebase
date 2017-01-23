import {
  filter,
  isString,
  isArray,
  isObject,
  map,
  get,
  forEach,
  set,
  has
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
export const populateList = (firebase, originalData, p, results) => {
  const mainChild = p.child.split('[]')[0]
  const childParam = p.child.split('[]')[1]
  return Promise.all(
    map(get(originalData, mainChild), (id, childKey) => {
      // handle list of keys
      const populateKey = id === true ? childKey : id
      return getPopulateChild(
        firebase,
        p,
        childParam
          ? get(id, childParam) // get child parameter if [] notation
          : populateKey
      )
      .then(pc => {
        if (pc) {
          // write child to result object under root name if it is found
          if (!childParam) {
            return set(results, `${p.root}.${populateKey}`, pc)
          }
          // handle child param
          return ({
            [childKey]: set(
              id,
              childParam,
              Object.assign(pc, { key: get(id, childParam) })
            )
          })
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
export const promisesForPopulate = (firebase, originalData, populatesIn) => {
  // TODO: Handle selecting of parameter to populate with (i.e. displayName of users/user)
  let promisesArray = []
  let results = {}
  const populates = getPopulateObjs(populatesIn)
  // Loop over all populates
  forEach(populates, (p) => {
    // Handle input of [] within child (notating parameter for whole list)
    const mainChild = p.child.split('[]')[0]

    // Single parameter with list
    if (has(originalData, mainChild)) {
      return promisesArray.push(populateList(firebase, originalData, p, results))
    }
    // Loop over each object in list
    forEach(originalData, (d, key) => {
      // Get value of parameter to be populated (key or list of keys)
      const idOrList = get(d, mainChild)

      // Parameter/child to be populated does not exist
      if (!idOrList) {
        return
      }

      // Parameter is single ID
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

      // Parameter is a list of ids
      if (isArray(idOrList) || isObject(idOrList)) {
        // Create single promise that includes a promise for each child
        return promisesArray.push(
          populateList(firebase, originalData, p, results)
        )
      }
    })
  })

  // Return original data after population promises run
  return Promise.all(promisesArray).then(d => results)
}

export default { promisesForPopulate }
