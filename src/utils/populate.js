import {
  filter,
  isString,
  isArray,
  isObject,
  map,
  get,
  forEach,
  reduce,
  set
} from 'lodash'

/**
 * @description Create standardized populate object from strings or objects
 * @param {String|Object} str - String or Object to standardize into populate object
 */
export const getPopulateObj = (str) => {
  const strArray = str.split(':')
  return { child: strArray[0], root: strArray[1] }
}

/**
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
     snap.val() || id
   )

/**
 * @description Create an array of promises for population of an object or list
 * @param {Object} firebase - Internal firebase object
 * @param {Object} originalObj - Object to have parameter populated
 * @param {Object} populateString - String containg population data
 */
export const promisesForPopulate = (firebase, originalData, populates) => {
  // TODO: Handle selecting of parameter to populate with (i.e. displayName of users/user)
  let promisesArray = []
  // Loop over all populates
  forEach(populates, (p) =>
    // Loop over each object in list
    forEach(originalData, (d, key) => {
      // Handle input of [] within child (notating parameter for whole list)
      const mainChild = p.child.split('[]')[0]
      const childParam = p.child.split('[]')[1]

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
            .then((v) =>
              // replace parameter with loaded object
              set(originalData, `${key}.${p.child}`, v)
            )
        )
      }

      // Parameter is a list of ids
      if (isArray(idOrList) || isObject(idOrList)) {
        // Create single promise that includes a promise for each child
        return promisesArray.push(
          Promise.all(
            map(idOrList, (id, childKey) =>
              getPopulateChild(
                firebase,
                p,
                childParam
                  ? get(id, childParam) // get child parameter if [] notation
                  : id === true // handle list of keys
                    ? childKey
                    : id
              )
              .then(pc =>
                !childParam
                  ? pc
                  : ({
                    [childKey]: set(
                      id,
                      childParam,
                      Object.assign(pc, { key: get(id, childParam) })
                    )
                  })
              )
            )
          )
          // replace parameter with populated list
          .then((v) => {
            // reduce array of arrays if childParam exists
            const vObj = childParam
              ? reduce(v, (a, b) => Object.assign(a, b), {})
              : v

            return set(originalData, `${key}.${mainChild}`, vObj)
          })
        )
      }
    })
  )

  // Return original data after population promises run
  return Promise.all(promisesArray).then(d => originalData)
}

export default { promisesForPopulate }
