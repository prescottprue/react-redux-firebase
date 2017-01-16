import { fromJS } from 'immutable'
import { combineReducers } from 'redux'
import { dropRight } from 'lodash'
import { actionTypes } from './constants'

const {
  SET,
  SET_PROFILE,
  START,
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

const requestingReducer = (state, action) => {
  const { path, requesting } = action
  let pathArr

  switch (action.type) {
    case START:
      pathArr = pathToArr(path)
      try {
        return (requesting !== undefined)
            ? state.setIn([pathArr.join('/')], requesting)
            : state.deleteIn([pathArr.join('/')])
      } catch (err) {
        console.error('error in start:', { name: err.name, message: err.message, pathArr, data });
      }
      break
    case SET:
      return { [pathToArr(path).join('/')]: requesting, ...state }
    case NO_VALUE:
      pathArr = pathToArr(path)
      return (requesting !== undefined)
        ? state.setIn([pathArr.join('/')], fromJS(requesting))
        : state.deleteIn([pathArr.join('/')])

    default:
      return state
  }
}

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET:
      const { data } = action
      pathArr = pathToArr(path)
      const dataPath = ['data', ...pathArr]
      console.log('set called ', { pathArr, data, getFromPath: state.getIn(dataPath) })
      // // Handle invalid keyPath error caused by deep setting to a null value
      if (data !== undefined && state.getIn(dataPath) === null) {
        console.log('shit is nulllllll', state.getIn(dataPath))
        retVal = state.deleteIn(dataPath)
      } else {
        retVal = state // start with state
      }

      try {
        return (data !== undefined)
          ? retVal.setIn(dataPath, fromJS(data))
          : retVal.deleteIn(dataPath)
      } catch (err) {
        console.error('error', { name: err.name, message: err.message, pathArr, data });
      }

    case NO_VALUE:
      pathArr = pathToArr(path)
      return state.setIn(pathArr, fromJS({}))
    default:
      return state
  }

}
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return action.auth
    case LOGOUT:
    case LOGIN_ERROR:
      return null
    default:
      return state
  }
}

const profileReducer = (state, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return action.profile
    case LOGOUT:
    case LOGIN_ERROR:
      return null
    default:
      return state
  }
}

const isInitializingReducer = (state = false, action) => {
  switch (action.type) {
    case AUTHENTICATION_INIT_STARTED:
      return true
    case AUTHENTICATION_INIT_FINISHED:
      return false
    default:
      return state
  }
}

const authErrorReducer = (state, action) => {
  switch (action.type) {
    case UNAUTHORIZED_ERROR:
      return action.authError
    case LOGOUT:
      return null
    default:
      return state
  }
}

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
export default combineReducers({
  requesting: requestingReducer,
  data: dataReducer,
  auth: authReducer,
  profile: profileReducer,
  isInitializing: isInitializingReducer,
  authError: authErrorReducer
})

// export default (state = initialState, action = {}) => {
//   const { path } = action
//   let pathArr
//   let retVal
//
//   switch (action.type) {
//
//     case START:
//       pathArr = pathToArr(path)
//
//       try {
//         retVal = (requesting !== undefined)
//             ? state.setIn(['requesting', pathArr.join('/')], fromJS(requesting))
//             : state.deleteIn(['requesting', pathArr.join('/')])
//
//         retVal = (requested !== undefined)
//             ? retVal.setIn(['requested', pathArr.join('/')], fromJS(requested))
//             : retVal.deleteIn(['requested', pathArr.join('/')])
//       } catch (err) {
//         console.error('error in start:', { name: err.name, message: err.message, pathArr, data });
//       }
//
//       return retVal
//
//     case SET:
//       const { data } = action
//       pathArr = pathToArr(path)
//       rootPathArr = pathToArr(rootPath)
//       const dataPath = ['data', ...pathArr]
//       console.log('set called ', { pathArr, data, getFromPath: state.getIn(dataPath) })
//
//       // // Handle invalid keyPath error caused by deep setting to a null value
//       if (data !== undefined && state.getIn(dataPath) === null) {
//         console.log('shit is nulllllll', state.getIn(dataPath))
//         retVal = state.deleteIn(dataPath)
//       } else {
//         retVal = state // start with state
//       }
//
//       try {
//         retVal = (data !== undefined)
//           ? retVal.setIn(dataPath, fromJS(data))
//           : retVal.deleteIn(dataPath)
//       } catch (err) {
//         console.error('error', { name: err.name, message: err.message, pathArr, data });
//       }
//
//       return retVal
//
//     case NO_VALUE:
//       pathArr = pathToArr(path)
//       retVal = state.setIn(['data', ...pathArr], fromJS({}))
//
//       retVal = (timestamp !== undefined)
//         ? retVal.setIn(['timestamp', ...pathArr], fromJS(timestamp))
//         : retVal.deleteIn(['timestamp', ...pathArr])
//
//       retVal = (requesting !== undefined)
//         ? retVal.setIn(['requesting', ...pathArr], fromJS(requesting))
//         : retVal.deleteIn(['requesting', ...pathArr])
//
//       retVal = (requested !== undefined)
//         ? retVal.setIn(['requested', ...pathArr], fromJS(requested))
//         : retVal.deleteIn(['requested', ...pathArr])
//
//       return retVal
//
//     case SET_PROFILE:
//       const { profile } = action
//       return (profile !== undefined)
//         ? state.setIn(['profile'], fromJS(profile))
//         : state.deleteIn(['profile'])
//
//     case LOGOUT:
//       return fromJS({
//         auth: null,
//         authError: null,
//         profile: null,
//         isLoading: false,
//         data: {}
//       })
//
//     case LOGIN:
//       return state.setIn(['auth'], fromJS(action.auth))
//                   .setIn(['authError'], null)
//
//     case LOGIN_ERROR:
//       return state
//               .setIn(['authError'], action.authError)
//               .setIn(['auth'], null)
//               .setIn(['profile'], null)
//
//     case AUTHENTICATION_INIT_STARTED:
//       return initialState.setIn(['isInitializing'], true)
//     // return state.setIn(['isInitializing'], true) // throws state.setIn not a function error
//
//     case AUTHENTICATION_INIT_FINISHED:
//       return state.setIn(['isInitializing'], false)
//
//     case UNAUTHORIZED_ERROR:
//       return state.setIn(['authError'], action.authError)
//
//     default:
//       return state
//
//   }
// }
