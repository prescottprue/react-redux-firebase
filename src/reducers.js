import { pick, omit, get, isObject } from 'lodash'
import { setWith, assign } from 'lodash/fp'
import { actionTypes } from './constants'
import {
  getSlashStrPath,
  getDotStrPath,
  recursiveUnset,
  combineReducers,
  preserveValuesFromState
} from './utils/reducers'

const {
  START,
  SET,
  SET_PROFILE,
  MERGE,
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  CLEAR_ERRORS,
  REMOVE,
  NO_VALUE,
  SET_LISTENER,
  UNSET_LISTENER,
  AUTHENTICATION_INIT_STARTED,
  AUTHENTICATION_INIT_FINISHED,
  AUTH_EMPTY_CHANGE,
  AUTH_LINK_SUCCESS,
  UNAUTHORIZED_ERROR,
  AUTH_UPDATE_SUCCESS,
  AUTH_RELOAD_SUCCESS,
  PROFILE_UPDATE_SUCCESS
} = actionTypes

/**
 * Reducer for isInitializing state. Changed by `AUTHENTICATION_INIT_STARTED`
 * and `AUTHENTICATION_INIT_FINISHED` actions.
 * @param  {object} [state=false] - Current isInitializing redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @param  {string} action.type - Type of action that was dispatched
 * @returns {object} Profile state after reduction
 */
export function isInitializingReducer(state = false, action) {
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
 * @param  {object} [state={}] - Current requesting redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @param  {string} action.type - Type of action that was dispatched
 * @param  {string} action.path - Path of action that was dispatched
 * @returns {object} Profile state after reduction
 */
export function requestingReducer(state = {}, { type, path }) {
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
 * @param  {object} [state={}] - Current requested redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @param  {string} action.type - Type of action that was dispatched
 * @param  {string} action.path - Path of action that was dispatched
 * @returns {object} Profile state after reduction
 */
export function requestedReducer(state = {}, { type, path }) {
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
 * @param  {object} [state={}] - Current timestamps redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @param  {string} action.type - Type of action that was dispatched
 * @param  {string} action.path - Path of action that was dispatched
 * @returns {object} Profile state after reduction
 */
export function timestampsReducer(state = {}, { type, path }) {
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
 * Changed by `SET` or `SET_ORDERED` (if actionKey === 'ordered'), `MERGE`,
 * `NO_VALUE`, and `LOGOUT` actions.
 * @param {string} actionKey - Key of state for which to make reducer (data or ordered)
 * @returns {Function} Data reducer
 * @private
 */
function createDataReducer(actionKey = 'data') {
  /**
   * Creates reducer for data state. Used to create data and ordered reducers.
   * Changed by `SET` or `SET_ORDERED` (if actionKey === 'ordered'), `MERGE`,
   * `NO_VALUE`, and `LOGOUT` actions.
   * @param {object} [state={}] - Current data redux state
   * @param {object} action - Object containing the action that was dispatched
   * @param {string} action.type - Type of action that was dispatched
   * @param {string} action.path - Path of action that was dispatched
   * @returns {object} Data state after reduction
   * @private
   */
  return function dataReducer(state = {}, action) {
    switch (action.type) {
      case SET:
        return setWith(
          Object,
          getDotStrPath(action.path),
          action[actionKey],
          state
        )
      case MERGE:
        const previousData = get(state, getDotStrPath(action.path), {}) // eslint-disable-line no-case-declarations
        const mergedData = assign(previousData, action[actionKey]) // eslint-disable-line no-case-declarations
        return setWith(Object, getDotStrPath(action.path), mergedData, state)
      case NO_VALUE:
        return setWith(Object, getDotStrPath(action.path), null, state)
      case REMOVE:
        if (actionKey === 'data') {
          return recursiveUnset(getDotStrPath(action.path), state)
        }
        return state
      case LOGOUT:
        // support keeping data when logging out - #125
        if (action.preserve) {
          if (Array.isArray(action.preserve)) {
            return pick(state, action.preserve) // pick returns a new object
          } else if (isObject(action.preserve)) {
            return action.preserve[actionKey]
              ? preserveValuesFromState(state, action.preserve[actionKey], {})
              : {}
          }
          throw new Error(
            'Invalid preserve parameter. It must be an Object or an Array'
          )
        }
        return {}
      default:
        return state
    }
  }
}

/**
 * Reducer for auth state. Changed by `LOGIN`, `LOGOUT`, and `LOGIN_ERROR` actions.
 * @param  {object} [state={isLoaded: false}] - Current auth redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @param  {string} action.type - Type of action that was dispatched
 * @returns {object} Profile state after reduction
 */
export function authReducer(
  state = { isLoaded: false, isEmpty: true },
  action
) {
  switch (action.type) {
    case LOGIN:
    case AUTH_UPDATE_SUCCESS:
      if (!action.auth) {
        return {
          isEmpty: true,
          isLoaded: true
        }
      }
      const auth = action.auth.toJSON ? action.auth.toJSON() : action.auth // eslint-disable-line no-case-declarations
      // Support keeping data
      if (action.preserve && action.preserve.auth) {
        return preserveValuesFromState(state, action.preserve.auth, {
          ...auth,
          isEmpty: false,
          isLoaded: true
        })
      }
      return { ...auth, isEmpty: false, isLoaded: true }
    case AUTH_LINK_SUCCESS:
    case AUTH_RELOAD_SUCCESS:
      if (!action.payload) {
        return {
          isEmpty: true,
          isLoaded: true
        }
      }
      return {
        ...(action.payload.toJSON ? action.payload.toJSON() : action.payload),
        isEmpty: false,
        isLoaded: true
      }
    case LOGIN_ERROR:
    case AUTH_EMPTY_CHANGE:
    case LOGOUT:
      // If it's reauthenticate keep user datas
      if (action.reauthenticate) {
        return preserveValuesFromState(state, true, {})
      }
      // Support keeping data when logging out
      if (action.preserve && action.preserve.auth) {
        return preserveValuesFromState(state, action.preserve.auth, {
          isLoaded: true,
          isEmpty: true
        })
      }
      return { isLoaded: true, isEmpty: true }
    default:
      return state
  }
}

/**
 * Reducer for authError state. Changed by `LOGIN`, `LOGOUT`, `LOGIN_ERROR`, and
 * `UNAUTHORIZED_ERROR` actions.
 * @param  {object} [state={}] - Current authError redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @param  {string} action.type - Type of action that was dispatched
 * @returns {object} authError state after reduction
 */
export function authErrorReducer(state = null, action) {
  switch (action.type) {
    case LOGIN:
    case LOGOUT:
      return null
    case LOGIN_ERROR:
    case UNAUTHORIZED_ERROR:
      return action.authError
    default:
      return state
  }
}

/**
 * Reducer for profile state. Changed by `SET_PROFILE`, `LOGOUT`, and
 * `LOGIN_ERROR` actions.
 * @param  {object} [state={isLoaded: false}] - Current profile redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @param  {string} action.type - Type of action that was dispatched
 * @returns {object} Profile state after reduction
 */
export function profileReducer(
  state = { isLoaded: false, isEmpty: true },
  action
) {
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
        ...action.profile,
        isEmpty: false,
        isLoaded: true
      }
    case PROFILE_UPDATE_SUCCESS:
      return Object.assign({}, state, action.payload)
    case LOGIN:
      // Support keeping data when logging out
      if (action.preserve && action.preserve.profile) {
        return preserveValuesFromState(state, action.preserve.profile, {
          isLoaded: true,
          isEmpty: true
        })
      }
      return {
        isEmpty: true,
        isLoaded: false
      }
    case LOGOUT:
    case AUTH_EMPTY_CHANGE:
      // Support keeping data when logging out
      if (action.preserve && action.preserve.profile) {
        return preserveValuesFromState(state, action.preserve.profile, {
          isLoaded: true,
          isEmpty: true
        })
      }
      return { isLoaded: true, isEmpty: true }
    default:
      return state
  }
}

/**
 * Reducer for errors state. Changed by `UNAUTHORIZED_ERROR`, `CLEAR_ERRORS`,
 * and `LOGOUT` actions.
 * @param  {object} [state=[]] - Current errors redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @param  {string} action.type - Type of action that was dispatched
 * @param  {Function} action.preserve - `not required` Filter function for
 * preserving errors
 * @returns {object} Profile state after reduction
 */
export function errorsReducer(state = [], action) {
  switch (action.type) {
    case LOGIN_ERROR:
    case UNAUTHORIZED_ERROR:
      if (!Array.isArray(state)) {
        throw new Error('Errors state must be an array')
      }
      return [...state, action.authError]
    case LOGOUT:
    case CLEAR_ERRORS:
      // Support keeping errors through a filter function
      if (action.preserve && action.preserve.errors) {
        if (typeof action.preserve.errors !== 'function') {
          throw new Error(
            'Preserve for the errors state currently only supports functions'
          )
        }
        return state.filter(action.preserve.errors) // run filter function on state
      }
      return []
    default:
      return state
  }
}

/**
 * Reducer for listeners ids. Changed by `SET_LISTENER` and `UNSET_LISTENER`
 * actions.
 * @param  {object} [state={}] - Current listenersById redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @param  {string} action.type - Type of action that was dispatched
 * @returns {object} listenersById state after reduction (used in listeners)
 * @private
 */
function listenersById(state = {}, { type, path, payload }) {
  switch (type) {
    case SET_LISTENER:
      return {
        ...state,
        [payload.id]: {
          id: payload.id,
          path
        }
      }
    case UNSET_LISTENER:
      return omit(state, [payload.id])
    default:
      return state
  }
}

/**
 * Reducer for listeners state. Changed by `UNAUTHORIZED_ERROR`
 * and `LOGOUT` actions.
 * @param  {object} [state=[]] - Current allListeners redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @param  {string} action.type - Type of action that was dispatched
 * @returns {object} allListeners state after reduction (used in listeners)
 * @private
 */
function allListeners(state = [], { type, path, payload }) {
  switch (type) {
    case SET_LISTENER:
      return [...state, payload.id]
    case UNSET_LISTENER:
      return state.filter((lId) => lId !== payload.id)
    default:
      return state
  }
}

/**
 * Reducer for listeners state. Changed by `UNAUTHORIZED_ERROR`
 * and `LOGOUT` actions.
 * @param  {object} [state=[]] - Current listeners redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @param  {string} action.type - Type of action that was dispatched
 * @returns {object} Profile state after reduction
 */
export const listenersReducer = combineReducers({
  byId: listenersById,
  allIds: allListeners
})

/**
 * Reducer for data state. Changed by `SET`, `SET_ORDERED`,`NO_VALUE`, and
 * `LOGOUT` actions.
 * @param  {object} [state={}] - Current data redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @param  {string} action.type - Type of action that was dispatched
 * @param  {string} action.path - Path of action that was dispatched
 * @returns {object} Data state after reduction
 */
export const dataReducer = createDataReducer()

/**
 * Reducer for ordered state. Changed by `SET`, `SET_ORDERED`,`NO_VALUE`, and
 * `LOGOUT` actions.
 * @param  {object} [state={}] - Current data redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @param  {string} action.type - Type of action that was dispatched
 * @param  {string} action.path - Path of action that was dispatched
 * @returns {object} Data state after reduction
 */
export const orderedReducer = createDataReducer('ordered')
