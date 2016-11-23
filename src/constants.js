const prefix = '@@reactReduxFirebase/'

export const defaultJWTKeys = [
  'aud',
  'auth_time',
  'exp',
  'firebase',
  'iat',
  'iss',
  'sub',
  'user_id'
]

export const actionTypes = {
  START: `${prefix}START`,
  SET: `${prefix}SET`,
  SET_PROFILE: `${prefix}SET_PROFILE`,
  LOGIN: `${prefix}LOGIN`,
  LOGOUT: `${prefix}LOGOUT`,
  LOGIN_ERROR: `${prefix}LOGIN_ERROR`,
  NO_VALUE: `${prefix}NO_VALUE`,
  UNAUTHORIZED_ERROR: `${prefix}UNAUTHORIZED_ERROR`,
  ERROR: `${prefix}ERROR`,
  INIT_BY_PATH: `${prefix}INIT_BY_PATH`,
  AUTHENTICATION_INIT_STARTED: `${prefix}AUTHENTICATION_INIT_STARTED`,
  AUTHENTICATION_INIT_FINISHED: `${prefix}AUTHENTICATION_INIT_FINISHED`
}

// List of all external auth providers that are supported (firebase's email/anonymous included by default)
export const supportedAuthProviders = [
  'google',
  'github',
  'twitter',
  'facebook'
]

export default {
  defaultJWTKeys,
  actionTypes,
  supportedAuthProviders
}

module.exports = {
  defaultJWTKeys,
  actionTypes,
  supportedAuthProviders
}
