/* eslint-disable no-unused-vars */
process.env.NODE_ENV = 'test'

var chai = require('chai')
var sinon = require('sinon')
var chaiAsPromised = require('chai-as-promised')
var sinonChai = require('sinon-chai')
var jsdom = require('jsdom').jsdom

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

// Firebase
var Firebase = global.Firebase = require('firebase')
var fbConfig = global.fbConfig = {
  apiKey: 'AIzaSyA-4ZcRO93M3bl6SdUjTiqN7tNfNOjV6D4',
  authDomain: 'tester-2d4fa.firebaseapp.com',
  databaseURL: 'https://tester-2d4fa.firebaseio.com',
  storageBucket: 'tester-2d4fa.appspot.com',
  messagingSenderId: '553568276840'
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
