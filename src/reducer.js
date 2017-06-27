import { combineReducers } from 'redux'
import { set, get, has } from 'lodash'
import { actionTypes } from './constants'

const {
  START,
  SET,
  SET_ORDERED,
  SET_PROFILE,
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  NO_VALUE,
  // UNSET_LISTENER,
  AUTHENTICATION_INIT_STARTED,
  AUTHENTICATION_INIT_FINISHED,
  UNAUTHORIZED_ERROR,
  AUTH_UPDATE_SUCCESS
} = actionTypes

const pathToArr = path => path ? path.split(/\//).filter(p => !!p) : []
const getSlashStrPath = path => pathToArr(path).join('/')
const getDotStrPath = path => pathToArr(path).join('.')

/**
 * Reducer for requesting state. Changed by `START` and `SET` actions.
 * @param  {Object} state - Current requesting redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @return {Object} Profile state after reduction
 */
const requestingReducer = (state = {}, { type, path }) => {
  switch (type) {
    case START:
      return {
        ...state,
        [getSlashStrPath(path)]: true
      }
    case NO_VALUE:
    case SET:
      return {
        ...state,
        [getSlashStrPath(path)]: false
      }
    default:
      return state
  }
}

/**
 * Reducer for requested state. Changed by `START` `NO_VALUE`, and `SET` actions.
 * @param  {Object} state - Current requesting redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @return {Object} Profile state after reduction
 */
const requestedReducer = (state = {}, { type, path }) => {
  switch (type) {
    case START:
      return {
        ...state,
        [getSlashStrPath(path)]: false
      }
    case NO_VALUE:
    case SET:
      return {
        ...state,
        [getSlashStrPath(path)]: true
      }
    default:
      return state
  }
}

/**
 * Reducer for timestamps state. Changed by `START` and `SET` actions.
 * @param  {Object} state - Current requesting redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @return {Object} Profile state after reduction
 */
const timestampsReducer = (state = {}, { type, path }) => {
  switch (type) {
    case START:
    case NO_VALUE:
    case SET:
      return {
        ...state,
        [getSlashStrPath(path)]: Date.now()
      }
    default:
      return state
  }
}

/**
 * Reducer for data state. Changed by `LOGIN`, `LOGOUT`, and `LOGIN_ERROR`
 * actions.
 * @param  {Object} state - Current data redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @return {Object} Profile state after reduction
 */
const dataReducer = (state = {}, { type, path, data, ordered }) => {
  switch (type) {
    case SET:
      if (!state) {
        return set({}, getDotStrPath(path), data)
      }
      return {
        ...state,
        ...set({}, getDotStrPath(path), data)
      }
    // case SET_ORDERED:
    //   if (!state) {
    //     return set({}, getDotStrPath(path), ordered)
    //   }
    //   return {
    //     ...state,
    //     ...set({}, getDotStrPath(path), ordered)
    //   }
    case NO_VALUE:
      if (!state || !get(state, getDotStrPath(path))) {
        return set({}, getDotStrPath(path), {})
      }
      return {
        ...state,
        ...set({}, getDotStrPath(path), {})
      }
    default:
      return state
  }
}

/**
 * Reducer for auth state. Changed by `LOGIN`, `LOGOUT`, and `LOGIN_ERROR`
 * actions.
 * @param  {Object} state - Current auth redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @return {Object} Profile state after reduction
 */
const authReducer = (state = { isLoaded: false }, { type, auth }) => {
  switch (type) {
    case LOGIN:
    case AUTH_UPDATE_SUCCESS:
      return auth || state
    case LOGOUT:
    case LOGIN_ERROR:
      return { isLoaded: true }
    default:
      return state
  }
}

/**
 * Reducer for profile state. Changed by `SET_PROFILE`, `LOGOUT`, and
 * `LOGIN_ERROR` actions.
 * @param  {Object} state - Current profile redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @return {Object} Profile state after reduction
 */
const profileReducer = (state = { isLoaded: false }, { type, profile }) => {
  switch (type) {
    case SET_PROFILE:
      return {
        ...state,
        ...profile,
        isLoaded: true
      }
    case LOGOUT:
    case LOGIN_ERROR:
      return { isLoaded: true }
    default:
      return state
  }
}

/**
 * Reducer for isInitializing state. Changed by `AUTHENTICATION_INIT_STARTED`
 * and `AUTHENTICATION_INIT_FINISHED` actions.
 * @param  {Object} state - Current isInitializing redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @return {Object} Profile state after reduction
 */
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

/**
 * Reducer for errors state. Changed by `UNAUTHORIZED_ERROR`
 * and `LOGOUT` actions.
 * @param  {Object} state - Current authError redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @return {Object} Profile state after reduction
 */
const errorsReducer = (state = [], action) => {
  switch (action.type) {
    case UNAUTHORIZED_ERROR:
      if (!state) {
        return [action.authError]
      }
      return [...state, action.authError]
    case LOGOUT:
      return []
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
 * @param {Object} state - Current Redux State
 * @param {Object} action - Action which will modify state
 * @param {String} action.type - Type of Action being called
 * @param {String} action.data - Type of Action which will modify state
 * @return {Object} State
 */
export default combineReducers({
  requesting: requestingReducer,
  requested: requestedReducer,
  timestamps: timestampsReducer,
  data: dataReducer,
  auth: authReducer,
  profile: profileReducer,
  isInitializing: isInitializingReducer,
  errors: errorsReducer
})
