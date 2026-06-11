/* eslint-disable no-unused-vars */
process.env.NODE_ENV = 'test'

const chai = require('chai')
const sinon = require('sinon')
const chaiAsPromised = require('chai-as-promised')
const sinonChai = require('sinon-chai')
const Firebase = require('firebase/compat/app').default
require('firebase/compat/database')
require('firebase/compat/firestore')
require('firebase/compat/auth')

// Tell React that act() is supported in this environment
globalThis.IS_REACT_ACT_ENVIRONMENT = true

// Firebase instance connected to the local emulator suite (see firebase.json).
// npm test wraps vitest in `firebase emulators:exec`, which boots the
// database + auth emulators and tears them down afterwards.
const fbConfig = {
  apiKey: 'fake-api-key', // placeholder (auth emulator accepts any key)
  authDomain: 'localhost',
  projectId: 'rrf-test',
  databaseURL: 'http://127.0.0.1:9000?ns=rrf-test',
  storageBucket: 'rrf-test.appspot.com', // placeholder
  messagingSenderId: 'asdf' // placeholder
}

// UID for fake user profile
const uid = 'Iq5b0qK2NtgggT6U3bU6iZRGyma2'

// Chai Plugins
chai.use(chaiAsPromised)
chai.use(sinonChai)

// globals (window/document/navigator come from the vitest jsdom environment)
global.Firebase = Firebase
global.expect = chai.expect
global.sinon = sinon
global.chai = chai
global.fbConfig = fbConfig
global.uid = uid
global.existingProfile = {
  existing: 'profileVal'
}
// Swallow firebase reinitialize error (useful when using watch)
try {
  Firebase.initializeApp(fbConfig)
} catch {}
// Initialize auth explicitly without a popup/redirect resolver: the compat
// layer's environment detection sees jsdom's window and would otherwise wire
// browser-only popup support that doesn't exist in this environment. The
// compat Firebase.auth() wraps this already-initialized instance.
const {
  initializeAuth,
  connectAuthEmulator,
  inMemoryPersistence
} = require('firebase/auth')
const modernAuth = initializeAuth(Firebase.app(), {
  persistence: inMemoryPersistence
})
// Point auth at the emulator (database is targeted via databaseURL above)
connectAuthEmulator(modernAuth, 'http://127.0.0.1:9099', {
  disableWarnings: true
})
// Point firestore at the emulator so nothing reaches production
// biome-ignore lint/correctness/useHookAtTopLevel: useEmulator is a Firebase API, not a React hook
Firebase.firestore().useEmulator('127.0.0.1', 8080)

// Mock Other Firebase services not covered by the emulators
Firebase.storage = () => ({
  ref: () => ({
    delete: sinon.spy(() => Promise.resolve()),
    put: sinon.spy(() => Promise.resolve())
  })
})
// Firebase.messaging = () => ({})

global.firebase = Object.defineProperty(Firebase, '_', {
  value: {
    watchers: {},
    authUid: null,
    config: Object.assign({}, fbConfig, {
      userProfile: 'users',
      enableRedirectHandling: false // disabled due to lack of http/https
    })
  },
  writable: true,
  enumerable: true,
  configurable: true
})
