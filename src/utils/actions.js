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
    type: types[0]
  })
  return method(...args)
    .then((val) => {
      dispatch({
        type: types[1],
        payload: val
      })
    })
    .catch((err) => {
      dispatch({
        type: types[2],
        payload: err
      })
    })
}
