import {
  NOTIFICATION_SHOW,
  NOTIFICATION_DISMISS,
  NOTIFICATION_CLEAR
} from './actionTypes'

const defaultDismissTime = 2500 // 2.5 seconds

/**
 * @description Publish a notification. if `dismissAfter` is set,
 * the notification will be auto dismissed after the given period.
 * @param {Object} notif - Object containing
 * @param {Object} notif.kind - Kinda of notification (success, warning, failure)
 * @param {Object} notif.message - Notification message
 * @param {Object} notif.dismissAfter - Time after which to dismiss notification (default time set in constants)
 */
export const showNotification = notif => {
  const payload = Object.assign({}, notif)
  // Set default id to now if none provided
  if (!payload.id) {
    payload.id = Date.now()
  }
  return dispatch => {
    dispatch({ type: NOTIFICATION_SHOW, payload })

    setTimeout(() => {
      dispatch({
        type: NOTIFICATION_DISMISS,
        payload: payload.id
      })
    }, payload.dismissAfter || defaultDismissTime)
  }
}

export const showSuccess = message =>
  showNotification({ type: 'success', message })

export const showError = message =>
  showNotification({ type: 'success', message })

/**
 * @description Dismiss a notification by the given id.
 * @param {Number} id - notification id
 */
export const dismissNotification = payload => ({
  type: NOTIFICATION_DISMISS,
  payload
})

/**
 * @description Clear all notifications
 */
export const clearNotifications = () => ({ type: NOTIFICATION_CLEAR })
