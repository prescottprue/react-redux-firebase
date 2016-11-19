import { filter, isString, isObject } from 'lodash'

export const getPopulateObj = (str) => {
  // TODO: Handle already object
  // TODO: Handle non-string
  const strArray = str.split(':')
  return { child: strArray[0], root: strArray[1] }
}

/**
 * @description Get array of populates from path string
 * @param {String} pathString - Internal firebase object
 */
export const getPopulates = (str) => {
  if (isObject(str) && str.populates) {
    return str.populates
  }
  const pathArray = str.split('#')
  // No Param Values after #
  if (!pathArray[1]) {
    return null
  }
  // Params (after #) array
  const params = pathArray[1].split('&')
  // Get list of populates
  const populates = filter(params, param =>
    param.indexOf('populate') !== -1
  ).map(p => p.split('=')[1])
  // No Params are populates
  if (!populates.length) {
    return null
  }
  return populates.map(getPopulateObj)
}

/**
 * @description Create an array of promises for population
 * @param {Object} firebase - Internal firebase object
 * @param {Object} originalObj - Object to have parameter populated
 * @param {Object} populateString - String containg population data
 */
export const promisesForPopulate = (firebase, originalObj, populateString) => {
  const paramToPopulate = populateString.split(':')[0]
  const populateRoot = populateString.split(':')[1]
  let idList = originalObj[paramToPopulate]
  // Handle string list for population
  if (isString(originalObj[paramToPopulate])) {
    idList = originalObj[paramToPopulate].split(',')
  }
  return Promise.all(
    idList.map(itemId =>
      firebase.database()
       .ref()
       .child(populateRoot)
       .child(itemId)
       .once('value')
       .then(snap => snap.val() || itemId)
    )).then(data => {
      const populatedObj = {}
      idList.forEach(item => populatedObj)
      populatedObj[paramToPopulate] = data
      return populatedObj
    }
  )
}

export default { promisesForPopulate }
