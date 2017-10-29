import { actionTypes } from './constants'
import { pick, omit, get, isArray, isObject, replace, size } from 'lodash'
import { setWith, assign, unset } from 'lodash/fp'

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
export const getDotStrPath = path => pathToArr(path).join('.')

/**
 * Recursively unset a property starting at the deep path, and unsetting the parent
 * property if there are no other enumerable properties at that level.
 * @param  {String} path - Deep dot path of the property to unset
 * @param {Boolean} [isRecursiveCall=false] - Used internally to ensure that
 * the object size check is only performed after one iteration.
 * @return {Object} The object with the property deeply unset
 * @private
 */
export const recursiveUnset = (path, obj, isRecursiveCall = false) => {
  if (!path) {
    return obj
  }

  if (size(get(obj, path)) > 0 && isRecursiveCall) {
    return obj
  }
  // The object does not have any other properties at this level.  Remove the
  // property.
  const objectWithRemovedKey = unset(path, obj)
  const newPath = path.match(/\./) ? replace(path, /\.[^.]*$/, '') : ''
  return recursiveUnset(newPath, objectWithRemovedKey, true)
}

/**
 * Combine reducers utility (abreveated version of redux's combineReducer).
 * Turns an object whose values are different reducer functions, into a single
 * reducer function.
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one.
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 * @private
 */
const combineReducers = (reducers) =>
  (state = {}, action) =>
    Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        )
        return nextState
      },
      {}
    )

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
 * Changed by `SET` or `SET_ORDERED` (if actionKey === 'ordered'), `MERGE`,
 * `NO_VALUE`, and `LOGOUT` actions.
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
      return setWith(Object, getDotStrPath(action.path), action[actionKey], state)
    case MERGE:
      const previousData = get(state, getDotStrPath(action.path), {})
      const mergedData = assign(previousData, action[actionKey])
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
        if (isArray(action.preserve)) {
          return pick(state, action.preserve) // pick returns a new object
        } else if (isObject(action.preserve)) {
          return action.preserve[actionKey]
            ? pick(state, action.preserve[actionKey])
            : {}
        }
        throw new Error('Invalid preserve parameter. It must be an Object or an Array')
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
    case AUTH_LINK_SUCCESS:
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
      // Support keeping data when logging out
      if (action.preserve && action.preserve.auth) {
        return pick(
          { ...state, isLoaded: true, isEmpty: true },
          action.preserve.auth
        ) // pick returns a new object
      }
      return { isLoaded: true, isEmpty: true }
    default:
      return state
  }
}

/**
 * Reducer for authError state. Changed by `LOGIN`, `LOGOUT`, `LOGIN_ERROR`, and
 * `UNAUTHORIZED_ERROR` actions.
 * @param  {Object} [state={}] - Current authError redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @return {Object} authError state after reduction
 */
export const authErrorReducer = (state = null, action) => {
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
    case AUTH_EMPTY_CHANGE:
      // Support keeping data when logging out
      if (action.preserve && action.preserve.profile) {
        return pick(
          { ...state, isLoaded: true, isEmpty: true },
          action.preserve.profile
        ) // pick returns a new object
      }
      return { isLoaded: true, isEmpty: true }
    default:
      return state
  }
}

/**
 * Reducer for errors state. Changed by `UNAUTHORIZED_ERROR`, `CLEAR_ERRORS`,
 * and `LOGOUT` actions.
 * @param  {Object} [state=[]] - Current errors redux state
 * @param  {Object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @param  {Function} action.preserve - `not required` Filter function for
 * preserving errors
 * @return {Object} Profile state after reduction
 */
export const errorsReducer = (state = [], action) => {
  switch (action.type) {
    case LOGIN_ERROR:
    case UNAUTHORIZED_ERROR:
      if (!isArray(state)) {
        throw new Error('Errors state must be an array')
      }
      return [...state, action.authError]
    case LOGOUT:
    case CLEAR_ERRORS:
      // Support keeping errors through a filter function
      if (action.preserve && action.preserve.errors) {
        if (typeof action.preserve.errors !== 'function') {
          throw new Error('Preserve for the errors state currently only supports functions')
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
 * @param  {Object} [state=[]] - Current allListeners redux state
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
 * @param  {Object} [state=[]] - Current listeners redux state
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
 * @name firebaseReducer
 * @description Main reducer for react-redux-firebase. This function is called
 * automatically by redux every time an action is fired. Based on which action
 * is called and its payload, the reducer will update redux state with relevant
 * changes.
 * @param {Object} state - Current Firebase Redux State (state.firebase)
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
  authError: authErrorReducer,
  profile: profileReducer,
  listeners: listenersReducer,
  isInitializing: isInitializingReducer,
  errors: errorsReducer
})
