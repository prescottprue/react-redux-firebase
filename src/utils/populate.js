import {
  filter,
  isString,
  isArray,
  isObject,
  map
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

/**
 * @description Create an array of promises for population of an object or list
 * @param {Object} firebase - Internal firebase object
 * @param {Object} originalObj - Object to have parameter populated
 * @param {Object} populateString - String containg population data
 */
export const promisesForPopulate = (firebase, originalData, params) => {
  const populates = getPopulates(params)
  // console.log('populates in promises for', { originalData, populates, params })
  // TODO: Handle multiple populates
  const firstPopulate = populates[0]
  // TODO: Handle single object based populates
  // Loop over each object in list
  const promisesArray = map(originalData, (d) => {
    // Get value of parameter to be populated (key or list of keys)
    const idOrList = d[firstPopulate.child]
    // console.log('id:', idOrList)
    // Parameter is single ID
    if (isString(idOrList)) {
      return firebase.database()
       .ref()
       .child(`${firstPopulate.root}/${idOrList}`)
       .once('value')
       .then(snap =>
         // Handle population value not existing
         snap.val() ? snap.val() : idOrList
       )
       .then((v) =>
          // return item with child parameter populated
          Object.assign({}, d, { [firstPopulate.child]: v })
        )
    }
    // Parameter is a list of ids
    if (isArray(idOrList)) {
      // TODO: Handle whole list population instead of just 0
      return firebase.database()
       .ref()
       .child(`${firstPopulate.root}/${idOrList[0]}`)
       .once('value')
       .then(snap =>
         // Handle population value not existing
         snap.val() ? snap.val() : idOrList[0]
       )
       // TODO: Handle selecting of parameter to populate with (i.e. displayName of users/user)
       .then((v) =>
          // return item with child parameter populated
          Object.assign({}, d, { [firstPopulate.child]: [v] })
        )
    }
  })

  return Promise.all(promisesArray)
    .then(data => {
      // console.log('data', data)
      // const populatedObj = Object.assign({}, originalObj)
      // idList.forEach(item => populatedObj)
      // populatedObj[paramToPopulate] = data
      return data
    })
}

export default { promisesForPopulate }
