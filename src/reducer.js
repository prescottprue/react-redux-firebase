import { combineReducers } from 'redux'
import { set } from 'lodash'
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

/**
 * Reducer for requesting state. Changed by `START` and `SET` actions.
 * @param  {Object} state - Current requesting redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @return {Object} Profile state after reduction
 */
const requestingReducer = (state = {}, action) => {
  const { path, requesting } = action
  switch (action.type) {
    case START:
    case SET:
      return {
        ...state,
        [pathToArr(path).join('/')]: requesting
      }
    // TODO: Handle NO_VALUE case
    // case NO_VALUE:
    default:
      return state
  }
}

const getPathStr = (path) => path ? path.replace('/', '.') : ''

/**
 * Reducer for data state. Changed by `LOGIN`, `LOGOUT`, and `LOGIN_ERROR`
 * actions.
 * @param  {Object} state - Current data redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @return {Object} Profile state after reduction
 */
const dataReducer = (state = {}, action) => {
  const { path, data, ordered } = action
  switch (action.type) {
    case SET:
      return {
        ...state,
        ...set({}, getPathStr(path), data)
      }
    case SET_ORDERED:
      return {
        ...state,
        ...set({}, getPathStr(path), ordered)
      }
    case NO_VALUE:
      return {
        ...state,
        ...set({}, getPathStr(path), {})
      }
    default:
      return state
  }
}

/**
 * Reducer for auth state. Changed by `LOGIN`, `LOGOUT`, and `LOGIN_ERROR`
 * actions.
 * @param  {Object} state - Current auth redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @return {Object} Profile state after reduction
 */
const authReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
    case AUTH_UPDATE_SUCCESS:
      return action.auth || undefined
    case LOGOUT:
    case LOGIN_ERROR:
      return null
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
const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        ...action.profile
      }
    case LOGOUT:
    case LOGIN_ERROR:
      return null
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
      return [...state, action.payload]
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
  errors: errorsReducer
})
