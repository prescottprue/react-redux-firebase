/* eslint-disable no-unused-vars */

process.env.NODE_ENV = 'test'

var chai = global.chai = require('chai')
var expect = global.expect = chai.expect

import { jsdom } from 'jsdom'

global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = global.window.navigator
