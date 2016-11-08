import { isString } from 'lodash'

/**
 * @description Watch user profile
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 */
export const promisesForPopulate = (firebase, profile, populateString) => {
  const paramToPopulate = populateString.split(':')[0]
  const populateRoot = populateString.split(':')[1]
  let idList = profile[paramToPopulate]
  if (isString(profile[paramToPopulate])) {
    idList = profile[paramToPopulate].split(',')
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
