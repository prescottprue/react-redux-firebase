import { combineReducers } from './utils/reducers'
import {
  requestingReducer,
  requestedReducer,
  timestampsReducer,
  dataReducer,
  orderedReducer,
  authReducer,
  authErrorReducer,
  profileReducer,
  listenersReducer,
  isInitializingReducer,
  errorsReducer
} from './reducers'

/**
 * @name firebaseReducer
 * Main reducer for react-redux-firebase. This function is called
 * automatically by redux every time an action is fired. Based on which action
 * is called and its payload, the reducer will update redux state with relevant
 * changes. `firebaseReducer` is made up of multiple "slice reducers"
 * ([outlined in reducers docs](/docs/recipes/reducers.md)) combined using
 * [`combineReducers`](https://redux.js.org/docs/api/combineReducers.html)
 * following the patterns outlined in
 * [the redux docs](https://redux.js.org/docs/recipes/StructuringReducers.html).
 * @param {object} state - Current Firebase Redux State (state.firebase)
 * @param {object} action - Action which will modify state
 * @param {string} action.type - Type of Action being called
 * @param  {string} action.path - Path of action that was dispatched
 * @param {string} action.data - Data associated with action
 * @returns {object} Firebase redux state
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
