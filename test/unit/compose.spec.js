/* global describe expect it */
import { omit } from 'lodash'
import { createStore, combineReducers, compose } from 'redux'
import composeFunc from '../../src/compose'
const exampleData = { data: { some: 'data' } }
const reducer = () => console.log('reducer', {})
const generateCreateStore = (params) =>
  compose(composeFunc(
    omit(fbConfig, params),
    { userProfile: 'users', enableLogging: true }
  ))(createStore)

describe('Compose', () => {
  it('is a function', () => {
    expect(composeFunc).to.be.a.function
  })
  it('returns an object', () => {
    expect(composeFunc(fbConfig)).to.be.a.function
  })
  it('allows enabling of Firebase database logging', () => {
    const createStoreWithFirebase = compose(composeFunc(
      fbConfig,
      { userProfile: 'users', enableLogging: true }
    ))(createStore)
    expect(createStoreWithFirebase(reducer)).to.be.an.object
  })
  describe('throws for missing fbConfig parameters', () => {

    it('databaseURL', () => {
      expect(() => generateCreateStore('databaseURL')(reducer)).to.throw('Firebase databaseURL is required')
    })
    it('authDomain', () => {
      expect(() => generateCreateStore('authDomain')(reducer)).to.throw('Firebase authDomain is required')
    })
    it('apiKey', () => {
      expect(() => generateCreateStore('apiKey')(reducer)).to.throw('Firebase apiKey is required')
    })
  })

})
