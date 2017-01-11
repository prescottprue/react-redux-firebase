/* global describe expect it */
import { omit } from 'lodash'
import { createStore, combineReducers, compose } from 'redux'
import composeFunc, { getFirebase } from '../../src/compose'
const exampleData = { data: { some: 'data' } }
const reducer = sinon.spy()
const generateCreateStore = (params) =>
  compose(composeFunc(
    params ? omit(fbConfig, params) : fbConfig,
    { userProfile: 'users', enableLogging: true }
  ))(createStore)
const helpers = generateCreateStore()(reducer).firebase.helpers

describe('Compose', () => {
  it('is a function', () => {
    expect(composeFunc).to.be.a.function
  })
  it('returns an object', () => {
    expect(composeFunc(fbConfig)).to.be.a.function
  })
  it('allows enabling of Firebase database logging', () => {
    expect(generateCreateStore()(reducer))
      .to.be.an.object
  })

  describe('helpers', () => {
    describe('ref', () => {
      it('exists', () => {
        expect(helpers.ref('test')).to.be.an.object
      })
      it('has child', () => {
        expect(helpers.ref('test').child('asdf')).to.be.an.object
      })
    })

    describe('set', () =>
      helpers.set('test', {some: 'asdf'})
    )

    describe('push', () =>
      helpers.push('test', {some: 'asdf'})
    )

    describe('update', () =>
      helpers.update('test', {some: 'asdf'})
    )

    describe('uniqueSet', () =>{
      // remove test root after test are complete
      after(() =>
        helpers.remove('test')
      )
      it('sets if unique', () =>
        helpers.uniqueSet('test/unique', {some: 'asdf'})
      )
      it('throws if not unique', () =>
        helpers.uniqueSet('test', {some: 'asdf'})
          .catch((err) => {
            expect(err.toString()).to.equal('Error: Path already exists.')
          })
      )
      it('has on err onComplete', () => {
        const func = sinon.spy()
        helpers.uniqueSet('test', {some: 'asdf'}, func)
          .catch((err) => {
            expect(func).to.have.been.calledOnce
          })
      })
    })

    describe('remove', () =>
      helpers.remove('test')
    )

    describe('watchEvent', () =>
      helpers.watchEvent('value', 'test')
    )

    describe('unWatchEvent', () =>
      helpers.unWatchEvent('value', 'test')
    )

    describe('login', () => {
      try {
        helpers.login({ email: 'test' })
      } catch (err) {
        expect(err).to.be.an.object
      }
    })

    describe('logout', () =>
      helpers.logout()
    )

    describe('createUser', () =>
      helpers.createUser({ email: 'test' }, { email: 'test' })
    )

    describe('resetPassword', () => {
      try {
        helpers.resetPassword({ email: 'test' })
      } catch (err) {
        expect(err).to.be.an.object
      }
    })
    describe('storage', () => {
      try {
        helpers.storage()
      } catch(err) {
        expect(err).to.be.an.object
      }
    })
  })

  describe('throws for missing fbConfig parameters', () => {
    it('databaseURL', () => {
      expect(() => generateCreateStore('databaseURL')(reducer))
        .to.throw('Firebase databaseURL is required')
    })
    it('authDomain', () => {
      expect(() => generateCreateStore('authDomain')(reducer))
        .to.throw('Firebase authDomain is required')
    })
    it('apiKey', () => {
      expect(() => generateCreateStore('apiKey')(reducer))
        .to.throw('Firebase apiKey is required')
    })
  })

  describe('getFirebase', () => {
    it('exports firebase instance', () => {
      expect(getFirebase()).to.be.an.object
    })
  })
})
