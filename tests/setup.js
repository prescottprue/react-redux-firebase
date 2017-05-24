/* eslint-disable no-unused-vars */
process.env.NODE_ENV = 'test'

var chai = require('chai')
var sinon = require('sinon')
var chaiAsPromised = require('chai-as-promised')
var sinonChai = require('sinon-chai')
var jsdom = require('jsdom').jsdom
var FirebaseServer = require('firebase-server')

new FirebaseServer(5000, 'localhost.firebaseio.test', { // eslint-disable-line no-new
  users: {
    Iq5b0qK2NtgggT6U3bU6iZRGyma2: {
      displayName: 'Tester'
    }
  }
})

// Chai Plugins
chai.use(chaiAsPromised)
chai.use(sinonChai)

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
  apiKey: 'asdf', // placeholder
  authDomain: 'asdf', // placeholder
  databaseURL: 'ws://127.0.1:5000',
  storageBucket: 'asdf', // placeholder
  messagingSenderId: 'asdf' // placeholder
}

// Swallow firebase reinitialize error (useful when using watch)
try {
  Firebase.initializeApp(fbConfig)
} catch (err) {}

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
