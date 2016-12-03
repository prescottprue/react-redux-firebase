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
