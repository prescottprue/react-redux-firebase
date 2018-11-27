import { capitalize, isArray, isString, isFunction } from 'lodash'
import { supportedAuthProviders, actionTypes } from '../constants'

/**
 * @description Get correct login method and params order based on provided credentials
 * @param {Object} firebase - Internal firebase object
 * @param {String} providerName - Name of Auth Provider (i.e. google, github, facebook, twitter)
 * @param {Array|String} scopes - List of scopes to add to auth provider
 * @return {firebase.auth.AuthCredential} provider - Auth Provider
 * @private
 */
const createAuthProvider = (firebase, providerName, scopes) => {
  const capitalProviderName = `${capitalize(providerName)}AuthProvider`

  // Throw if auth provider does not exist on Firebase instance
  if (!firebase.auth[capitalProviderName]) {
    throw new Error(
      `${providerName} is not a valid auth provider for your firebase instance. If using react-native, use a RN specific auth library.`
    )
  }

  const provider = new firebase.auth[capitalProviderName]()

  // Custom Auth Parameters
  // TODO: Validate parameter inputs
  const { customAuthParameters } = firebase._.config
  if (customAuthParameters && customAuthParameters[providerName]) {
    provider.setCustomParameters(customAuthParameters[providerName])
  }

  // Handle providers without scopes
  if (
    providerName.toLowerCase() === 'twitter' ||
    !isFunction(provider.addScope)
  ) {
    return provider
  }

  // TODO: Verify scopes are valid before adding
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
 * @description Get correct login method and params order based on provided
 * credentials
 * @param {Object} firebase - Internal firebase object
 * @param {Object} credentials - Login credentials
 * @param {String} credentials.email - Email to login with (only needed for
 * email login)
 * @param {String} credentials.password - Password to login with (only needed
 * for email login)
 * @param {String} credentials.provider - Provider name such as google, twitter
 * (only needed for 3rd party provider login)
 * @param {String} credentials.type - Popup or redirect (only needed for 3rd
 * party provider login)
 * @param {String} credentials.token - Custom or provider token
 * @param {firebase.auth.AuthCredential} credentials.credential - Custom or
 * provider token
 * @param {Array|String} credentials.scopes - Scopes to add to provider
 * (i.e. email)
 * @private
 */
export const getLoginMethodAndParams = (firebase, creds) => {
  const {
    email,
    password,
    provider,
    type,
    token,
    scopes,
    phoneNumber,
    applicationVerifier,
    credential
  } = creds
  // Credential Auth
  if (credential) {
    // Attempt to use signInAndRetrieveDataWithCredential if it exists (see #467 for more info)
    const credentialAuth = firebase.auth().signInAndRetrieveDataWithCredential

    if (credentialAuth) {
      return {
        method: 'signInAndRetrieveDataWithCredential',
        params: [credential]
      }
    }
    return { method: 'signInWithCredential', params: [credential] }
  }

  // Provider Auth
  if (provider) {
    // Verify providerName is valid
    if (supportedAuthProviders.indexOf(provider.toLowerCase()) === -1) {
      throw new Error(`${provider} is not a valid Auth Provider`)
    }
    if (token) {
      throw new Error(
        'provider with token no longer supported, use credential parameter instead'
      )
    }
    const authProvider = createAuthProvider(firebase, provider, scopes)
    if (type === 'popup') {
      return { method: 'signInWithPopup', params: [authProvider] }
    }
    return { method: 'signInWithRedirect', params: [authProvider] }
  }

  // Token Auth
  if (token) {
    // Check for new sign in method (see #484 for more info)
    const tokenAuth = firebase.auth().signInAndRetrieveDataWithCustomToken

    if (tokenAuth) {
      return { method: 'signInAndRetrieveDataWithCustomToken', params: [token] }
    }

    return { method: 'signInWithCustomToken', params: [token] }
  }

  // Phone Number Auth
  if (phoneNumber) {
    if (!applicationVerifier) {
      throw new Error(
        'Application verifier is required for phone authentication'
      )
    }
    return {
      method: 'signInWithPhoneNumber',
      params: [phoneNumber, applicationVerifier]
    }
  }

  // Check for new sign in method (see #484 for more info)
  // Note: usage of signInAndRetrieveDataWithEmailAndPassword is now a fallback since it is deprecated (see #484 for more info)
  if (!firebase.auth().signInWithEmailAndPassword) {
    return {
      method: 'signInAndRetrieveDataWithEmailAndPassword',
      params: [email, password]
    }
  }

  // Email/Password Auth
  return { method: 'signInWithEmailAndPassword', params: [email, password] }
}

/**
 * Returns a promise that completes when Firebase Auth is ready in the given
 * store using react-redux-firebase.
 * @param {Object} store - The Redux store on which we want to detect if
 * Firebase auth is ready.
 * @param {string} [stateName='firebase'] - The attribute name of the
 * react-redux-firebase reducer when using multiple combined reducers.
 * 'firebase' by default. Set this to `null` to indicate that the
 * react-redux-firebase reducer is not in a combined reducer.
 * @return {Promise} Resolves when Firebase auth is ready in the store.
 */
const isAuthReady = (store, stateName) => {
  const state = store.getState()
  const firebaseState = stateName ? state[stateName] : state
  const firebaseAuthState = firebaseState && firebaseState.auth
  if (!firebaseAuthState) {
    throw new Error(
      `The Firebase auth state could not be found in the store under the attribute '${
        stateName ? `${stateName}.` : ''
      }auth'. Make sure your react-redux-firebase reducer is correctly set in the store`
    )
  }
  return firebaseState.auth.isLoaded
}

/**
 * Returns a promise that completes when Firebase Auth is ready in the given
 * store using react-redux-firebase.
 * @param {Object} store - The Redux store on which we want to detect if
 * Firebase auth is ready.
 * @param {string} [stateName='firebase'] - The attribute name of the react-redux-firebase
 * reducer when using multiple combined reducers. 'firebase' by default. Set
 * this to `null` to indicate that the react-redux-firebase reducer is not in a
 * combined reducer.
 * @return {Promise} Resolve when Firebase auth is ready in the store.
 */
export const authIsReady = (store, stateName = 'firebase') =>
  new Promise(resolve => {
    if (isAuthReady(store, stateName)) {
      resolve()
    } else {
      const unsubscribe = store.subscribe(() => {
        if (isAuthReady(store, stateName)) {
          unsubscribe()
          resolve()
        }
      })
    }
  })

/**
 * Function that creates and authIsReady promise
 * @param {Object} store - The Redux store on which we want to detect if
 * Firebase auth is ready.
 * @param {Object} config - Config options for authIsReady
 * @param {string} config.authIsReady - Config options for authIsReady
 * @param {string} config.firebaseStateName - Config options for authIsReady
 * @return {Promise} Resolves when Firebase auth is ready in the store.
 */
export const createAuthIsReady = (store, config) => {
  return isFunction(config.authIsReady)
    ? config.authIsReady(store, config)
    : authIsReady(store, config.firebaseStateName)
}

/**
 * Update profile data on Firebase Real Time Database
 * @param  {Object} firebase - internal firebase object
 * @param  {Object} profileUpdate - Updates to profile object
 * @return {Promise} Resolves with results of profile get
 */
export const updateProfileOnRTDB = (firebase, profileUpdate) => {
  const { database, _: { config, authUid } } = firebase
  const profileRef = database().ref(`${config.userProfile}/${authUid}`)
  return profileRef.update(profileUpdate).then(() => profileRef.once('value'))
}

/**
 * Update profile data on Firestore by calling set (with merge: true) on
 * the profile.
 * @param  {Object} firebase - internal firebase object
 * @param  {Object} profileUpdate - Updates to profile object
 * @param  {Object} options - Options object for configuring how profile
 * update occurs
 * @param  {Boolean} [options.useSet=true] - Use set with merge instead of
 * update. Setting to `false` uses update (can cause issue of profile document
 * does not exist).
 * @param  {Boolean} [options.merge=true] - Whether or not to use merge when
 * setting profile
 * @return {Promise} Resolves with results of profile get
 */
export const updateProfileOnFirestore = (
  firebase,
  profileUpdate,
  options = {}
) => {
  const { useSet = true, merge = true } = options
  const { firestore, _: { config, authUid } } = firebase
  const profileRef = firestore().doc(`${config.userProfile}/${authUid}`)
  // Use set with merge (to prevent "No document to update") unless otherwise
  // specificed through options
  const profileUpdatePromise = useSet
    ? profileRef.set(profileUpdate, { merge })
    : profileRef.update(profileUpdate)
  return profileUpdatePromise.then(() => profileRef.get())
}

/**
 * @description Start presence management for a specificed user uid.
 * Presence collection contains a list of users that are online currently.
 * Sessions collection contains a record of all user sessions.
 * This function is called within login functions if enablePresence: true.
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @return {Promise}
 * @private
 */
export function setupPresence(dispatch, firebase) {
  // exit if database does not exist on firebase instance
  if (!firebase.database || !firebase.database.ServerValue) {
    return
  }
  const ref = firebase.database().ref()
  const { config: { presence, sessions }, authUid } = firebase._
  const amOnline = ref.child('.info/connected')
  const onlineRef = ref
    .child(
      isFunction(presence)
        ? presence(firebase.auth().currentUser, firebase)
        : presence
    )
    .child(authUid)
  let sessionsRef = isFunction(sessions)
    ? sessions(firebase.auth().currentUser, firebase)
    : sessions
  if (sessionsRef) {
    sessionsRef = ref.child(sessions)
  }
  amOnline.on('value', snapShot => {
    if (!snapShot.val()) return
    // user is online
    if (sessionsRef) {
      // add session and set disconnect
      dispatch({ type: actionTypes.SESSION_START, payload: authUid })
      // add new session to sessions collection
      const session = sessionsRef.push({
        startedAt: firebase.database.ServerValue.TIMESTAMP,
        user: authUid
      })
      // Support versions of react-native-firebase that do not have setPriority
      // on firebase.database.ThenableReference
      if (isFunction(session.setPriority)) {
        // set authUid as priority for easy sorting
        session.setPriority(authUid)
      }
      session
        .child('endedAt')
        .onDisconnect()
        .set(firebase.database.ServerValue.TIMESTAMP, () => {
          dispatch({ type: actionTypes.SESSION_END })
        })
    }
    // add correct session id to user
    // remove from presence list
    onlineRef.set(true)
    onlineRef.onDisconnect().remove()
  })
}
