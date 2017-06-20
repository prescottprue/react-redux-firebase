import { isObject } from 'lodash'

/**
 * @description Wrap method call in dispatched actions
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} opts - Options object
 * @param {Function} opts.method - Method to call
 * @param {Array} opts.args - Arguments to call method with
 * @param {Array} opts.types - Action types array ([BEFORE, SUCCESS, FAILURE])
 * @private
 */
export const wrapInDispatch = (dispatch, { method, args, types }) => {
  dispatch({
    type: isObject(types[0]) ? types[0].type : types[0],
    payload: isObject(types[0]) ? types[0].payload : { args }
  })
  return method(...args)
    .then((val) => {
      dispatch({
        type: types[1],
        payload: val
      })
      return val
    })
    .catch((err) => {
      dispatch({
        type: types[2],
        payload: err
      })
      return Promise.reject(err)
    })
}
