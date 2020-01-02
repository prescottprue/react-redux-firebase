import { combineReducers } from 'redux'
import { without, omit } from 'lodash'
import { NOTIFICATION_SHOW, NOTIFICATION_DISMISS } from './actionTypes'

function notification(state = {}, action) {
  switch (action.type) {
    case NOTIFICATION_SHOW:
      return action.payload
    case NOTIFICATION_DISMISS:
      return undefined
    default:
      return state
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case NOTIFICATION_SHOW:
      return [...state, action.payload.id]
    case NOTIFICATION_DISMISS:
      return without(state, action.payload)
    default:
      return state
  }
}

function byId(state = {}, action) {
  switch (action.type) {
    case NOTIFICATION_SHOW:
      return {
        ...state,
        [action.payload.id]: notification(state[action.payload.id], action)
      }
    case NOTIFICATION_DISMISS:
      return omit(state, action.payload)
    default:
      return state
  }
}

export const notifications = combineReducers({ byId, allIds })

export default notifications
