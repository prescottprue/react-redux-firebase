import { combineReducers } from 'redux'
import { set, pick, omit } from 'lodash'
import { actionTypes } from './constants'

const {
  START,
  SET,
  SET_PROFILE,
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  NO_VALUE,
  SET_LISTENER,
  UNSET_LISTENER,
  AUTHENTICATION_INIT_STARTED,
  AUTHENTICATION_INIT_FINISHED,
  UNAUTHORIZED_ERROR,
  AUTH_UPDATE_SUCCESS
} = actionTypes

/**
 * Create a path array from path string
 * @param  {String} path - Path seperated with slashes
 * @return {Array} Path as Array
 * @private
 */
const pathToArr = path => path ? path.split(/\//).filter(p => !!p) : []

/**
 * Trim leading slash from path for use with state
 * @param  {String} path - Path seperated with slashes
 * @return {String} Path seperated with slashes
 * @private
 */
const getSlashStrPath = path => pathToArr(path).join('/')

/**
 * Convert path with slashes to dot seperated path (for use with lodash get/set)
 * @param  {String} path - Path seperated with slashes
 * @return {String} Path seperated with dots
 * @private
 */
const getDotStrPath = path => pathToArr(path).join('.')

/**
 * Reducer for isInitializing state. Changed by `AUTHENTICATION_INIT_STARTED`
 * and `AUTHENTICATION_INIT_FINISHED` actions.
 * @param  {Object} [state=false] - Current isInitializing redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @return {Object} Profile state after reduction
 */
export const isInitializingReducer = (state = false, action) => {
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
 * Reducer for requesting state.Changed by `START`, `NO_VALUE`, and `SET` actions.
 * @param  {Object} [state={}] - Current requesting redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @param  {String} action.path - Path of action that was dispatched
 * @return {Object} Profile state after reduction
 */
export const requestingReducer = (state = {}, { type, path }) => {
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
 * Reducer for requested state. Changed by `START`, `NO_VALUE`, and `SET` actions.
 * @param  {Object} [state={}] - Current requested redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @param  {String} action.path - Path of action that was dispatched
 * @return {Object} Profile state after reduction
 */
export const requestedReducer = (state = {}, { type, path }) => {
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
 * Reducer for timestamps state. Changed by `START`, `NO_VALUE`, and `SET` actions.
 * @param  {Object} [state={}] - Current timestamps redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @param  {String} action.path - Path of action that was dispatched
 * @return {Object} Profile state after reduction
 */
export const timestampsReducer = (state = {}, { type, path }) => {
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
 * Creates reducer for data state. Used to create data and ordered reducers.
 * Changed by `SET` or `SET_ORDERED` (if actionKey === 'ordered'),`NO_VALUE`,
 * and `LOGOUT` actions.
 * @param  {Object} [state={}] - Current data redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @param  {String} action.path - Path of action that was dispatched
 * @return {Object} Data state after reduction
 * @private
 */
const createDataReducer = (actionKey = 'data') => (state = {}, action) => {
  switch (action.type) {
    case SET:
      return {
        ...state,
        ...set({}, getDotStrPath(action.path), action[actionKey])
      }
    case NO_VALUE:
      return {
        ...state,
        ...set({}, getDotStrPath(action.path), null)
      }
    case LOGOUT:
      // support keeping data when logging out - #125
      if (action.preserve) {
        return pick(state, action.preserve) // pick returns a new object
      }
      return {}
    default:
      return state
  }
}

/**
 * Reducer for auth state. Changed by `LOGIN`, `LOGOUT`, and `LOGIN_ERROR` actions.
 * @param  {Object} [state={isLoaded: false}] - Current auth redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @return {Object} Profile state after reduction
 */
export const authReducer = (state = { isLoaded: false, isEmpty: true }, action) => {
  switch (action.type) {
    case LOGIN:
    case AUTH_UPDATE_SUCCESS:
      if (!action.auth) {
        return {
          isEmpty: true,
          isLoaded: true
        }
      }
      const auth = action.auth.toJSON ? action.auth.toJSON() : action.auth
      return { ...auth, isEmpty: false, isLoaded: true }
    case LOGIN_ERROR:
      // TODO: Support keeping data when logging out
      return { isLoaded: true, isEmpty: true }
    case LOGOUT:
      return { isLoaded: true, isEmpty: true }
    default:
      return state
  }
}

/**
 * Reducer for profile state. Changed by `SET_PROFILE`, `LOGOUT`, and
 * `LOGIN_ERROR` actions.
 * @param  {Object} [state={isLoaded: false}] - Current profile redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @return {Object} Profile state after reduction
 */
export const profileReducer = (state = { isLoaded: false, isEmpty: true }, action) => {
  switch (action.type) {
    case SET_PROFILE:
      if (!action.profile) {
        return {
          ...state,
          isEmpty: true,
          isLoaded: true
        }
      }
      return {
        ...state,
        ...action.profile,
        isEmpty: false,
        isLoaded: true
      }
    case LOGOUT:
    case LOGIN_ERROR:
      return { isLoaded: true, isEmpty: true }
    default:
      return state
  }
}

/**
 * Reducer for errors state. Changed by `UNAUTHORIZED_ERROR`
 * and `LOGOUT` actions.
 * @param  {Object} [state=[]] - Current authError redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @return {Object} Profile state after reduction
 */
export const errorsReducer = (state = [], action) => {
  switch (action.type) {
    case UNAUTHORIZED_ERROR: return [...state, action.authError]
    case LOGOUT: return []
    default: return state
  }
}

/**
 * Reducer for listeners ids. Changed by `SET_LISTENER` and `UNSET_LISTENER`
 * actions.
 * @param  {Object} [state={}] - Current listenersById redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @return {Object} listenersById state after reduction (used in listeners)
 * @private
 */
const listenersById = (state = {}, { type, path, payload }) => {
  switch (type) {
    case SET_LISTENER:
      return {
        ...state,
        [payload.id]: {
          id: payload.id,
          path
        }
      }
    case UNSET_LISTENER: return omit(state, [payload.id])
    default: return state
  }
}

/**
 * Reducer for listeners state. Changed by `UNAUTHORIZED_ERROR`
 * and `LOGOUT` actions.
 * @param  {Object} [state=[]] - Current authError redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @return {Object} allListeners state after reduction (used in listeners)
 * @private
 */
const allListeners = (state = [], { type, path, payload }) => {
  switch (type) {
    case SET_LISTENER: return [...state, payload.id]
    case UNSET_LISTENER: return state.filter(lId => lId !== payload.id)
    default: return state
  }
}

/**
 * Reducer for listeners state. Changed by `UNAUTHORIZED_ERROR`
 * and `LOGOUT` actions.
 * @param  {Object} [state=[]] - Current authError redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @return {Object} Profile state after reduction
 */
export const listenersReducer = combineReducers({
  byId: listenersById,
  allIds: allListeners
})

/**
 * Reducer for data state. Changed by `SET`, `SET_ORDERED`,`NO_VALUE`, and
 * `LOGOUT` actions.
 * @param  {Object} [state={}] - Current data redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @param  {String} action.path - Path of action that was dispatched
 * @return {Object} Data state after reduction
 */
export const dataReducer = createDataReducer()

/**
 * Reducer for ordered state. Changed by `SET`, `SET_ORDERED`,`NO_VALUE`, and
 * `LOGOUT` actions.
 * @param  {Object} [state={}] - Current data redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @param  {String} action.path - Path of action that was dispatched
 * @return {Object} Data state after reduction
 */
export const orderedReducer = createDataReducer('ordered')

/**
 * @name firebaseStateReducer
 * @description Reducer for react redux firebase. This function is called
 * automatically by redux every time an action is fired. Based on which action
 * is called and its payload, the reducer will update redux state with relevant
 * changes.
 * @param {Object} state - Current Redux State
 * @param {Object} action - Action which will modify state
 * @param {String} action.type - Type of Action being called
 * @param  {String} action.path - Path of action that was dispatched
 * @param {String} action.data - Data associated with action
 * @return {Object} Firebase redux state
 */
export default combineReducers({
  requesting: requestingReducer,
  requested: requestedReducer,
  timestamps: timestampsReducer,
  data: dataReducer,
  ordered: orderedReducer,
  auth: authReducer,
  profile: profileReducer,
  listeners: listenersReducer,
  isInitializing: isInitializingReducer,
  errors: errorsReducer
})
