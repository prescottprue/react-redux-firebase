import { omit } from 'lodash'
import { createStore, compose } from 'redux'
import composeFunc, { getFirebase } from '../../src/compose'

const reducer = sinon.spy()
const generateCreateStore = (params) =>
  compose(composeFunc(
    params ? omit(fbConfig, params) : fbConfig,
    {
      userProfile: 'users',
      enableLogging: params && params.enableLogging,
      enableRedirectHandling: false
    }
  ))(createStore)
const helpers = generateCreateStore()(reducer).firebase.helpers
const profileData = { displayName: 'test', email: 'test@test.com' }

describe('Store Enhancer', () => {
  it('is a function', () => {
    expect(composeFunc).to.be.a.function
  })

  it('returns an object', () => {
    expect(composeFunc(fbConfig)).to.be.a.function
  })

  // skipped because it causes logging to be turned on during tests
  it.skip('allows enabling of Firebase database logging', () => {
    expect(generateCreateStore({ enableLogging: true })(reducer))
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

    describe('set', () => {
      it('accepts object', () =>
        expect(helpers.set('test', {some: 'asdf'})).to.eventually.become(undefined)
      )
    })

    describe('setWithMeta', () => {
      describe('accepts object', () => {
        it('accepts object', () =>
          expect(helpers.setWithMeta('test', {some: 'asdf'})).to.eventually.become(undefined)
        )
      })

      describe('does not attach meta to string', () => {
        // TODO: confirm that data set actually does not include meta
        it('accepts object', () =>
          expect(helpers.setWithMeta('test', 'asdd')).to.eventually.become(undefined)
        )
      })
    })

    describe('push', () => {
      it('accepts object', () =>
        expect(helpers.push('test', {some: 'asdf'})).to.eventually.have.property('key')
      )
    })

    describe('pushWithMeta', () => {
      it('accepts object', () =>
        expect(helpers.pushWithMeta('test', {some: 'asdf'})).to.eventually.have.property('key')
      )
    })

    describe('update', () => {
      it('accepts object', () =>
        // undefined represents snapshot
        expect(helpers.update('test', {some: 'asdf'})).to.eventually.become(undefined)
      )
    })

    describe('updateWithMeta', () => {
      it('accepts object', () =>
        expect(helpers.updateWithMeta('test', {some: 'asdf'})).to.eventually.become(undefined)
      )
    })

    describe('uniqueSet', () => {
      // remove test root after test are complete
      afterEach(() => {
        if (helpers.remove) {
          return helpers.remove('test/unique')
        }
      })

      it('sets if unique', () =>
        helpers.uniqueSet('test/unique', {some: 'asdf'})
      )

      it('throws if not unique', () =>
        helpers.uniqueSet('test', {some: 'asdf'})
          .catch((err) => {
            expect(err.toString()).to.equal('Error: Path already exists.')
          })
      )

      it('calls onComplete on error', () => {
        const func = sinon.spy()
        return helpers.uniqueSet('test', {some: 'asdf'}, func)
          .catch((err) => {
            expect(func).to.have.been.calledOnce
            expect(err).to.exist
          })
      })

      it('calls onComplete on success', () => {
        const func = sinon.spy()
        return helpers.uniqueSet('test/unique', {some: 'asdf'}, func)
          .then((snap) => {
            expect(func).to.have.been.calledOnce
            expect(snap).to.exist
          })
      })
    })

    describe('remove', () => {
      it('removes data', () =>
        helpers.remove('test')
      )
    })

    describe.skip('watchEvent', () => {
      it('starts watcher', () => {
        helpers.watchEvent('value', 'test')
      })
    })

    describe.skip('unWatchEvent', () => {
      it.skip('unWatchesEvent', () =>
        helpers.unWatchEvent('value', 'test')
      )
    })

    describe('login', () => {
      try {
        helpers.login({ email: 'test' })
      } catch (err) {
        expect(err).to.be.an.object
      }
    })

    describe('logout', () => {
      // TODO: Confirm that user is logged out and Firebase logout method is called
      it('logs user out', () =>
        helpers.logout()
      )
    })

    describe('createUser', () => {
      it('creates a user in Firebase auth', () =>
        expect(helpers.createUser({ email: 'test@test.com', password: 'test' }, profileData))
          // seeing this message indicates that createUser was called internally (since api key is fake)
          .to.be.rejectedWith('Your API key is invalid, please check you have copied it correctly.')
      )

      it('throws for incorrectly formatted email', () => {
        expect(helpers.createUser({ email: 'test', password: 'test' }, { email: 'test' }))
          .to.be.rejectedWith('The email address is badly formatted.')
      })
    })

    describe('resetPassword', () => {
      // TODO: Confirm Firebase method is called
      it('throws for non-existant email', () => {
        try {
          helpers.resetPassword({ email: 'test' })
        } catch (err) {
          expect(err).to.be.an.object
        }
      })
    })

    describe('confirmPasswordReset', () => {
      // TODO: Confirm Firebase method is called
      it('throws for non-existant email', () => {
        try {
          helpers.confirmPasswordReset({ code: 'test', password: 'test' })
        } catch (err) {
          expect(err).to.be.an.object
        }
      })
    })

    describe('verifyPasswordResetCode', () => {
      // TODO: Confirm Firebase method is called
      it('throws for non-existant email', () => {
        try {
          helpers.verifyPasswordResetCode({ code: 'test', password: 'test' })
        } catch (err) {
          expect(err).to.be.an.object
        }
      })
    })

    describe('updateProfile', () => {
      it('acccepts an object', () => {
        expect(helpers.updateProfile(profileData))
          .to.eventually.become(profileData)
      })
    })

    describe('updateAuth', () => {
      it('rejects when not authenticated', () => {
        expect(helpers.updateAuth())
          .to.be.rejectedWith('User must be logged in to update auth.')
      })

      // TODO: test that update auth when authenticated
      it.skip('updates auth object if authenticated', () =>
        expect(helpers.updateAuth()).to.eventually.become(undefined)
      )

      // TODO: test that updateProfile is called if updateInProfile is true
      it.skip('calls update profile if updateInProfile is true', () =>
        expect(helpers.updateAuth({}, true)).to.eventually.become(undefined)
      )
    })

    describe('updateEmail', () => {
      it('rejects when not authenticated', () =>
        expect(helpers.updateEmail()).to.be.rejectedWith('User must be logged in to update email.')
      )

      // TODO: test that update auth when authenticated
      it.skip('updates auth object if authenticated', () =>
        expect(helpers.updateEmail()).to.eventually.become(undefined)
      )

      // TODO: test that updateProfile is called if updateInProfile is true
      it.skip('calls update profile if updateInProfile is true', () =>
        expect(helpers.updateEmail({}, true)).to.eventually.become(undefined)
      )
    })

    describe('verifyPasswordResetCode', () => {
      it('exists', () => {
        try {
          helpers.verifyPasswordResetCode({ code: 'test', password: 'test' })
        } catch (err) {
          expect(err).to.be.an.object
        }
      })
    })

    describe('storage', () => {
      it('exists', () => {
        try {
          helpers.storage()
        } catch (err) {
          expect(err).to.be.an.object
        }
      })
    })

    describe('messaging', () => {
      it('exists', () => {
        try {
          helpers.messaging()
        } catch (err) {
          expect(err).to.be.an.object
        }
      })
    })
  })

  describe('throws for missing fbConfig parameters', () => {
    const errorSuffix = 'is a required config parameter for react-redux-firebase.'
    it('databaseURL', () => {
      expect(() => generateCreateStore('databaseURL')(reducer))
        .to.throw(`databaseURL ${errorSuffix}`)
    })
    it('authDomain', () => {
      expect(() => generateCreateStore('authDomain')(reducer))
        .to.throw(`authDomain ${errorSuffix}`)
    })
    it('apiKey', () => {
      expect(() => generateCreateStore('apiKey')(reducer))
        .to.throw(`apiKey ${errorSuffix}`)
    })
  })

  describe('getFirebase', () => {
    it('exports firebase instance', () => {
      expect(getFirebase()).to.be.an.object
    })
  })
})
