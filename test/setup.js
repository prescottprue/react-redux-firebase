/* eslint-disable no-unused-vars */
process.env.NODE_ENV = 'test'

const chai = require('chai')
const sinon = require('sinon')
const chaiAsPromised = require('chai-as-promised')
const sinonChai = require('sinon-chai')
const Firebase = require('firebase')
require('firebase/firestore')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const WebSocket = require('ws')
const Enzyme = require('enzyme')
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17')

Enzyme.configure({ adapter: new Adapter() })

// Firebase Instance Setup (fake instance connected to firebase-server)
const fbConfig = {
  apiKey: 'AIzaSyCTUERDM-Pchn_UDTsfhVPiwM4TtNIxots', // placeholder
  authDomain: 'asdf', // placeholder
  projectId: 'asdf',
  databaseURL: 'ws://127.0.1:5000',
  storageBucket: 'asdf', // placeholder
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
// needed to fix "Error: The XMLHttpRequest compatibility library was not found." from Firebase auth
global.XMLHttpRequest = XMLHttpRequest
// needed to fix: "FIREBASE WARNING: wss:// URL used, but browser isn't known to support websockets.  Trying anyway."
global.WebSocket = WebSocket
global.fbConfig = fbConfig
global.uid = uid
global.existingProfile = {
  existing: 'profileVal'
}
// Swallow firebase reinitialize error (useful when using watch)
try {
  Firebase.initializeApp(fbConfig)
} catch (err) {}

// Mock Other Firebase services not included in firebase-server
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
