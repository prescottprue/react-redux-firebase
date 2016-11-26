import { capitalize, isArray, isString } from 'lodash'
import { supportedAuthProviders } from '../constants'

/**
 * @description Get correct login method and params order based on provided credentials
 * @param {Object} firebase - Internal firebase object
 * @param {String} providerName - Name of Auth Provider (i.e. google, github, facebook, twitter)
 * @param {Array|String} scopes - List of scopes to add to auth provider
 */
export const createAuthProvider = (firebase, providerName, scopes) => {
  // TODO: Verify scopes are valid before adding
  // Verify providerName is valid
  if (supportedAuthProviders.indexOf(providerName.toLowerCase()) === -1) {
    throw new Error(`${providerName} is not a valid Auth Provider`)
  }
  const provider = new firebase.auth[`${capitalize(providerName)}AuthProvider`]()
  provider.addScope('email')
  if (scopes) {
    if (isArray(scopes)) {
      scopes.forEach(scope => {
        provider.addScope(scope)
      })
    }
    if (isString(scopes)) {
      provider.addScope(scopes)
    }
  }
  return provider
}

/**
 * @description Get correct login method and params order based on provided credentials
 * @param {Object} firebase - Internal firebase object
 * @param {Object} credentials - Login credentials
 * @param {String} credentials.email - Email to login with (only needed for email login)
 * @param {String} credentials.password - Password to login with (only needed for email login)
 * @param {String} credentials.provider - Provider name such as google, twitter (only needed for 3rd party provider login)
 * @param {String} credentials.type - Popup or redirect (only needed for 3rd party provider login)
 * @param {String} credentials.token - Custom or provider token
 * @param {String} credentials.scopes - Scopes to add to provider (i.e. email)
 */
export const getLoginMethodAndParams = (firebase, {email, password, provider, type, token, scopes}) => {
  if (provider) {
    if (token) {
      return {
        method: 'signInWithCredential',
        params: [ provider, token ]
      }
    }
    const authProvider = createAuthProvider(firebase, provider, scopes)
    if (type === 'popup') {
      return {
        method: 'signInWithPopup',
        params: [ authProvider ]
      }
    }
    return {
      method: 'signInWithRedirect',
      params: [ authProvider ]
    }
  }
  if (token) {
    return {
      method: 'signInWithCustomToken',
      params: [ token ]
    }
  }
  return {
    method: 'signInWithEmailAndPassword',
    params: [ email, password ]
  }
}

export default { getLoginMethodAndParams }
