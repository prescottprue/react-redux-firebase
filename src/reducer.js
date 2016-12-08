import { fromJS } from 'immutable'
import { actionTypes } from './constants'

const {
  START,
  SET,
  SET_PROFILE,
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  NO_VALUE,
  INIT_BY_PATH,
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

/**
 * @name firebaseStateReducer
 * @description Reducer for react redux firebase. This function is called
 * automatically by redux every time an action is fired. Based on which action
 * is called and its payload, the reducer will update redux state with relevant
 * changes.
 * @param {Map} state - Current Redux State
 * @param {Object} action - Action which will modify state
 * @param {String} action.type - Type of Action being called
 * @param {String} action.data - Type of Action which will modify state
 * @return {Map} State
 */
export default (state = initialState, action = {}) => {
  const { path, timestamp, requesting, requested } = action
  let pathArr
  let rootPathArr
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

      return retVal;

    case SET:
      const { data, rootPath } = action
      pathArr = pathToArr(path)
      rootPathArr = pathToArr(rootPath)
      retVal = (data !== undefined)
        ? state.setIn(['data', ...pathArr], fromJS(data))
        : state.deleteIn(['data', ...pathArr])

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
      retVal = retVal.deleteIn(['timestamp', ...pathArr])
      retVal = retVal.deleteIn(['requesting', ...pathArr])
      retVal = retVal.deleteIn(['requested', ...pathArr])

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
        data: {},
        timestamp: {},
        requesting: {},
        requested: {}
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
