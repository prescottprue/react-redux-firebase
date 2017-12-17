/* eslint-disable no-unused-vars */
process.env.NODE_ENV = 'test'

const chai = require('chai')
const sinon = require('sinon')
const chaiAsPromised = require('chai-as-promised')
const sinonChai = require('sinon-chai')
const jsdom = require('jsdom').jsdom
const chaiEnzyme = require('chai-enzyme')
const FirebaseServer = require('firebase-server')
const uid = global.uid = 'Iq5b0qK2NtgggT6U3bU6iZRGyma2'

new FirebaseServer(5000, 'localhost.firebaseio.test', { // eslint-disable-line no-new
  users: {
    [uid]: {
      displayName: 'Tester'
    }
  }
})

// Chai Plugins
chai.use(chaiAsPromised)
chai.use(sinonChai)
chai.use(chaiEnzyme())

// globals
global.expect = chai.expect
global.sinon = sinon
global.chai = chai
global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = global.window.navigator

// needed to fix "Error: The XMLHttpRequest compatibility library was not found." from Firebase auth
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
// needed to fix: "FIREBASE WARNING: wss:// URL used, but browser isn't known to support websockets.  Trying anyway."
global.WebSocket = require('ws')

var Firebase = global.Firebase = require('firebase')

var fbConfig = global.fbConfig = {
  apiKey: 'AIzaSyCTUERDM-Pchn_UDTsfhVPiwM4TtNIxots', // placeholder
  authDomain: 'asdf', // placeholder
  databaseURL: 'ws://127.0.1:5000',
  storageBucket: 'asdf', // placeholder
  messagingSenderId: 'asdf' // placeholder
}

// Swallow firebase reinitialize error (useful when using watch)
try {
  Firebase.initializeApp(fbConfig)
} catch (err) {}

// Mock Other Firebase services not included in firebase-server
// Firebase.storage = () => ({})
// Firebase.messaging = () => ({})

global.firebase = Object.defineProperty(Firebase, '_', {
  value: {
    watchers: {},
    authUid: null,
    config: Object.assign(
      {},
      fbConfig,
      {
        userProfile: 'users',
        enableRedirectHandling: false // disabled due to lack of http/https
      }
    )
  },
  writable: true,
  enumerable: true,
  configurable: true
})
