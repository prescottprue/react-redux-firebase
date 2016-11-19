import { fromJS } from 'immutable'
import { actionTypes } from './constants'
const {
  SET,
  SET_PROFILE,
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  NO_VALUE,
  AUTHENTICATION_INIT_STARTED,
  AUTHENTICATION_INIT_FINISHED,
  UNAUTHORIZED_ERROR
} = actionTypes

const emptyState = {
  auth: undefined,
  authError: undefined,
  profile: undefined,
  isInitializing: undefined,
  data: {}
}

const initialState = fromJS(emptyState)

const pathToArr = path => path.split(/\//).filter(p => !!p)

export default (state = initialState, action = {}) => {
  const { path } = action
  let pathArr
  let retVal

  switch (action.type) {

    case SET:
      const { data } = action
      pathArr = pathToArr(path)
      retVal = (data !== undefined)
        ? state.setIn(['data', ...pathArr], fromJS(data))
        : state.deleteIn(['data', ...pathArr])

      return retVal

    case NO_VALUE:
      pathArr = pathToArr(path)
      retVal = state.setIn(['data', ...pathArr], fromJS({}))
      return retVal

    case SET_PROFILE:
      const {profile} = action
      return (profile !== undefined)
        ? state.setIn(['profile'], fromJS(profile))
        : state.deleteIn(['profile'])

    case LOGOUT:
      return fromJS({
        auth: null,
        authError: null,
        profile: null,
        isLoading: false,
        data: {}
      })

    case LOGIN:
      return state.setIn(['auth'], fromJS(action.auth))
                  .setIn(['authError'], null)

    case LOGIN_ERROR:
      return state
              .setIn(['authError'], action.authError)
              .setIn(['auth'], null)
              .setIn(['profile'], null)

    case AUTHENTICATION_INIT_STARTED:
      return initialState.setIn(['isInitializing'], true)
    // return state.setIn(['isInitializing'], true) // throws state.setIn not a function error

    case AUTHENTICATION_INIT_FINISHED:
      return state.setIn(['isInitializing'], false)

    case UNAUTHORIZED_ERROR:
      return state.setIn(['authError'], action.authError)

    default:
      return state

  }
}
