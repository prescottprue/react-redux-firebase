import { filter, isString } from 'lodash'

export const getQueryObject = (str) => {
  let pathArray = str.split('#')
  const path = pathArray[0]
  const params = pathArray[1].split('&')
  console.log('path, params', { path, params })
  // Get list of populates
  const populates = filter(params, param =>
    param.indexOf('populate') !== -1
  ).map(p => p.split('=')[1])
  console.log('populates', { path, populates })
  return { path, populates }
  // pattern to make:
  // { path: '', populates: [ { child: '', root: '' } ] }
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

export default { getQueryObject, promisesForPopulate }
