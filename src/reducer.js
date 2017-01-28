import { fromJS } from 'immutable'
import { dropRight } from 'lodash'
import { actionTypes, paramSplitChar } from './constants'

const {
  START,
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
  data: {},
  timestamp: {},
  requesting: {},
  requested: {}
}

const initialState = fromJS(emptyState)

const pathToArr = path => path ? path.split(/\//).filter(p => !!p) : []

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
 * @return {Map} Redux State.
 */
export default (state = initialState, action = {}) => {
  const { path, timestamp, requesting, requested } = action
  let pathArr
  let retVal

  switch (action.type) {

    case START:
      pathArr = pathToArr(path)
      retVal = (requesting !== undefined)
         ? state.setIn(['requesting', pathArr.join(paramSplitChar)], fromJS(requesting))
         : state.deleteIn(['requesting', pathArr.join(paramSplitChar)])

      retVal = (requested !== undefined)
         ? retVal.setIn(['requested', pathArr.join(paramSplitChar)], fromJS(requested))
         : retVal.deleteIn(['requested', pathArr.join(paramSplitChar)])

      return retVal

    case SET:
      const { data } = action

      pathArr = pathToArr(path)

      // Handle invalid keyPath error caused by deep setting to a null value
      if (data !== undefined && state.getIn(['data', ...pathArr]) === null) {
        retVal = state.deleteIn(['data', ...pathArr])
      } else if (state.getIn(dropRight(['data', ...pathArr])) === null) {
        retVal = state.deleteIn(dropRight(['data', ...pathArr]))
      } else {
        retVal = state // start with state
      }

      retVal = (data !== undefined)
        ? retVal.setIn(['data', ...pathArr], fromJS(data))
        : retVal.deleteIn(['data', ...pathArr])

      retVal = (timestamp !== undefined)
        ? retVal.setIn(['timestamp', pathArr.join(paramSplitChar)], fromJS(timestamp))
        : retVal.deleteIn(['timestamp', pathArr.join(paramSplitChar)])

      retVal = (requesting !== undefined)
        ? retVal.setIn(['requesting', pathArr.join(paramSplitChar)], fromJS(requesting))
        : retVal.deleteIn(['requesting', pathArr.join(paramSplitChar)])

      retVal = (requested !== undefined)
        ? retVal.setIn(['requested', pathArr.join(paramSplitChar)], fromJS(requested))
        : retVal.deleteIn(['requested', pathArr.join(paramSplitChar)])

      return retVal

    case NO_VALUE:
      pathArr = pathToArr(path)
      retVal = state.setIn(['data', ...pathArr], fromJS({}))

      retVal = (timestamp !== undefined)
        ? retVal.setIn(['timestamp', pathArr.join(paramSplitChar)], fromJS(timestamp))
        : retVal.deleteIn(['timestamp', pathArr.join(paramSplitChar)])

      retVal = (requesting !== undefined)
        ? retVal.setIn(['requesting', pathArr.join(paramSplitChar)], fromJS(requesting))
        : retVal.deleteIn(['requesting', pathArr.join(paramSplitChar)])

      retVal = (requested !== undefined)
        ? retVal.setIn(['requested', pathArr.join(paramSplitChar)], fromJS(requested))
        : retVal.deleteIn(['requested', pathArr.join(paramSplitChar)])

      return retVal

    case SET_PROFILE:
      return (action.profile !== undefined)
        ? state.setIn(['profile'], fromJS(action.profile))
        : state.deleteIn(['profile'])

    case LOGOUT:
      return fromJS({
        auth: null,
        authError: null,
        profile: null,
        isInitializing: false,
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
