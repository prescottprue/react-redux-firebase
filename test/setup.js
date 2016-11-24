/* eslint-disable no-unused-vars */
process.env.NODE_ENV = 'test'

var chai = global.chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
var sinonChai = require('sinon-chai')
chai.use(chaiAsPromised)
chai.use(sinonChai)
var expect = global.expect = chai.expect
global.sinon = require('sinon')
var jsdom = require('jsdom').jsdom
global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = global.window.navigator

// Firebase
var Firebase = global.Firebase = require('firebase')
var fbConfig = global.fbConfig = {
  apiKey: 'AIzaSyCTUERDM-Pchn_UDTsfhVPiwM4TtNIxots',
  authDomain: 'redux-firebasev3.firebaseapp.com',
  databaseURL: 'https://redux-firebasev3.firebaseio.com',
  storageBucket: 'redux-firebasev3.appspot.com',
  messagingSenderId: '823357791673'
}
// Swallow firebase reinitialize error (useful when using watch)
try {
  Firebase.initializeApp(fbConfig)
} catch (err) {}

global.firebase = Object.defineProperty(Firebase, '_', {
  value: {
    watchers: {},
    authUid: null,
    config: Object.assign({}, fbConfig, { userProfile: 'users' })
  },
  writable: true,
  enumerable: true,
  configurable: true
})
