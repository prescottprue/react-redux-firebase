import {
  filter,
  isString,
  isArray,
  isObject,
  map,
  keyBy
} from 'lodash'

/**
 * @description Create standardized populate object from strings or objects
 * @param {String|Object} str - String or Object to standardize into populate object
 */
export const getPopulateObj = (str) => {
  // TODO: Handle non-string
  const strArray = str.split(':')
  return { child: strArray[0], root: strArray[1] }
}

/**
 * @description Get array of populates query params
 * @param {String} pathString - Internal firebase object
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
export const promisesForPopulate = (firebase, originalData, params) => {
  const populates = getPopulates(params)
  // TODO: Handle multiple populates
  const firstPopulate = populates[0]
  // TODO: Handle single object based populates
  // Loop over each object in list
  const promisesArray = map(originalData, (d, key) => {
    // Get value of parameter to be populated (key or list of keys)
    const idOrList = d[firstPopulate.child]
    // Child to be populated does not exist
    if (!idOrList) {
      return Object.assign({}, d, { key })
    }
    // Parameter is single ID
    if (isString(idOrList)) {
      return getPopulateChild(firebase, firstPopulate, idOrList)
        .then((v) =>
          // return item with child parameter populated
          Object.assign({}, d, { [firstPopulate.child]: v, key })
        )
    }
    // Parameter is a list of ids
    if (isArray(idOrList)) {
      // Create single promise that includes a promise for each child
      return Promise.all(
        map(idOrList, (id) =>
          getPopulateChild(firebase, firstPopulate, id)
        )
      )
      // TODO: Handle selecting of parameter to populate with (i.e. displayName of users/user)
      // return item with child parameter replaced with populated list
      .then((v) =>
        Object.assign({}, d, { [firstPopulate.child]: v, key })
      )
    }
  })

  return Promise.all(promisesArray)
    // TODO: Look into returning originalData with values injected instead of using keyBy
    .then(d => keyBy(d, 'key'))
}

export default { promisesForPopulate }
