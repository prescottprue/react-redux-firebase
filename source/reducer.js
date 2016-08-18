import {fromJS} from 'immutable'
import {
  START,
  SET,
  SET_PROFILE,
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  NO_VALUE,
  INIT_BY_PATH
} from './constants'

const initialState = fromJS({
  auth: undefined,
  authError: undefined,
  profile: undefined,
  data: {},
  snapshot: {}
})

const pathToArr = path => path.split(/\//).filter(p => !!p)

export default (state = initialState, action = {}) => {
  const { path } = action
  var { requesting, requested, timestamp } = action
  let pathArr
  let retVal

  switch (action.type) {

    case START:
      pathArr = pathToArr(path)

      retVal = (requesting !== undefined)
          ? state.setIn(['requesting', ...pathArr], fromJS(requesting))
          : state.deleteIn(['requesting', ...pathArr])

      retVal = (requested !== undefined)
          ? retVal.setIn(['requested', ...pathArr], fromJS(requested))
          : retVal.deleteIn(['requested', ...pathArr])

      return retVal

    case SET:
      var { data, snapshot, rootPath } = action
      pathArr = pathToArr(path)
      let rootPathArr = pathToArr(rootPath)

      retVal = (data !== undefined)
          ? state.setIn(['data', ...pathArr], fromJS(data))
          : state.deleteIn(['data', ...pathArr])

      retVal = (snapshot !== undefined)
          ? retVal.setIn(['snapshot', ...pathArr], fromJS(snapshot))
          : retVal.deleteIn(['snapshot', ...pathArr])

      retVal = (timestamp !== undefined)
          ? retVal.setIn(['timestamp', ...rootPathArr], fromJS(timestamp))
          : retVal.deleteIn(['timestamp', ...rootPathArr])

      retVal = (requesting !== undefined)
          ? retVal.setIn(['requesting', ...rootPathArr], fromJS(requesting))
          : retVal.deleteIn(['requesting', ...rootPathArr])

      retVal = (requested !== undefined)
          ? retVal.setIn(['requested', ...rootPathArr], fromJS(requested))
          : retVal.deleteIn(['requested', ...rootPathArr])

      return retVal

    case NO_VALUE:
      pathArr = pathToArr(path)
      retVal = state.setIn(['data', ...pathArr], fromJS({}))
      retVal = retVal.setIn(['snapshot', ...pathArr], fromJS({}))

      retVal = (timestamp !== undefined)
          ? retVal.setIn(['timestamp', ...pathArr], fromJS(timestamp))
          : retVal.deleteIn(['timestamp', ...pathArr])

      retVal = (requesting !== undefined)
          ? retVal.setIn(['requesting', ...pathArr], fromJS(requesting))
          : retVal.deleteIn(['requesting', ...pathArr])

      retVal = (requested !== undefined)
          ? retVal.setIn(['requested', ...pathArr], fromJS(requested))
          : retVal.deleteIn(['requested', ...pathArr])

      return retVal

    case INIT_BY_PATH:
      pathArr = pathToArr(path)
      retVal = state.deleteIn(['data', ...pathArr])
      // keep the prev snapshot until it will override by the new one
      // retVal = retVal.deleteIn(['snapshot', ...pathArr])
      retVal = retVal.deleteIn(['timestamp', ...pathArr])
      retVal = retVal.deleteIn(['requesting', ...pathArr])
      retVal = retVal.deleteIn(['requested', ...pathArr])

      return retVal

    case SET_PROFILE:
      const { profile } = action
      return (profile !== undefined)
        ? state.setIn(['profile'], fromJS(profile))
        : state.deleteIn(['profile'])

    case LOGOUT:
      return fromJS({
        auth: null,
        authError: null,
        profile: null,
        data: {},
        timestamp: {},
        requesting: false,
        requested: false,
        snapshot: {}
      })

    case LOGIN:
      return state.setIn(['auth'], fromJS(action.auth))
                  .setIn(['authError'], null)

    case LOGIN_ERROR:
      return state
              .setIn(['authError'], action.authError)
              .setIn(['auth'], null)
              .setIn(['profile'], null)

    default:
      return state

  }
}
