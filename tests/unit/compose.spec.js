import { createStore, compose } from 'redux'
import composeFunc, { getFirebase } from '../../src/compose'

const reducer = sinon.spy()

const generateCreateStore = (params) =>
  compose(composeFunc(
    Firebase,
    {
      userProfile: 'users',
      enableLogging: params && params.enableLogging,
      enableRedirectHandling: false
    }
  ))(createStore)

const store = generateCreateStore()(reducer)

describe('Compose', () => {
  it('is a function', () => {
    expect(composeFunc).to.be.a.function
  })

  it('returns an object', () => {
    expect(composeFunc(Firebase)).to.be.a.function
  })

  it('allows enabling of Firebase database logging', () => {
    expect(generateCreateStore({ enableLogging: true })(reducer))
      .to.be.an.object
  })

  describe('helpers', () => {
    describe('ref', () => {
      it('exists', () => {
        expect(store.firebase.ref('test')).to.be.an.object
      })

      it('has child', () => {
        expect(store.firebase.ref('test').child('asdf')).to.be.an.object
      })
    })

    describe('set', () => {
      it('accepts object', () =>
        expect(store.firebase.set('test', {some: 'asdf'}))
          .to.eventually.become(undefined)
      )
    })

    describe('setWithMeta', () => {
      describe('accepts object', () => {
        it('accepts object', () =>
          expect(store.firebase.setWithMeta('test', {some: 'asdf'}))
            .to.eventually.become(undefined)
        )
      })

      describe('does not attach meta to string', () => {
        // TODO: confirm that data set actually does not include meta
        it('accepts object', () =>
          expect(store.firebase.setWithMeta('test', 'asdd'))
            .to.eventually.become(undefined)
        )
      })
    })

    describe('push', () => {
      it('accepts object', () =>
        expect(store.firebase.push('test', {some: 'asdf'}))
          .to.eventually.have.property('key')
      )
    })

    describe('pushWithMeta', () => {
      it('accepts object', () =>
        expect(store.firebase.pushWithMeta('test', {some: 'asdf'}))
          .to.eventually.have.property('key')
      )
    })

    describe('update', () => {
      it('accepts object', () =>
        // undefined represents snapshot
        expect(store.firebase.update('test', {some: 'asdf'}))
          .to.eventually.become(undefined)
      )
    })

    describe('updateWithMeta', () => {
      it('accepts object', () =>
        expect(store.firebase.updateWithMeta('test', {some: 'asdf'}))
          .to.eventually.become(undefined)
      )
    })

    describe('uniqueSet', () => {
      // remove test root after test are complete
      afterEach(() => {
        if (store.firebase.remove) {
          return store.firebase.remove('test/unique')
        }
      })
      // Skipped due to issue with mocked transaction not returning committed
      it('sets if unique', () =>
        store.firebase.uniqueSet('test/unique', {some: 'asdf'})
      )
      it('throws if not unique', () =>
        store.firebase.uniqueSet('test', {some: 'asdf'})
          .catch((err) => {
            expect(err.toString()).to.equal('Error: Path already exists.')
          })
      )
      it('calls onComplete on error', () => {
        const func = sinon.spy()
        return store.firebase.uniqueSet('test', {some: 'asdf'}, func)
          .catch((err) => {
            expect(func).to.have.been.calledOnce
            expect(err).to.exist
          })
      })

      it('calls onComplete on success', () => {
        const func = sinon.spy()
        return store.firebase.uniqueSet('test/unique', {some: 'asdf'}, func)
          .then((snap) => {
            expect(func).to.have.been.calledOnce
            expect(snap).to.exist
          })
      })
    })

    describe('remove', () => {
      it('runs', () => {
        return store.firebase.remove('test')
      })
    })

    describe('watchEvent', () => {
      it('starts watcher', () => {
        store.firebase.watchEvent('value', 'test')
      })
    })

    describe('unWatchEvent', () => {
      it('unWatchesEvent', () =>
        store.firebase.unWatchEvent('value', 'test')
      )
    })

    describe('login', () => {
      try {
        store.firebase.login({ email: 'test' })
      } catch (err) {
        expect(err).to.be.an.object
      }
    })

    describe('logout', () => {
      it('runs', () => {
        return store.firebase.logout()
      })
    })

    describe('createUser', () => {
      it('runs', () => {
        return expect(store.firebase.createUser({ email: 'test' }, { email: 'test' }))
          .to.eventually.be.an.object
      })
    })

    describe('resetPassword', () => {
      try {
        store.firebase.resetPassword({ email: 'test' })
      } catch (err) {
        expect(err).to.be.an.object
      }
    })

    describe('confirmPasswordReset', () => {
      try {
        store.firebase.confirmPasswordReset({ code: 'test', password: 'test' })
      } catch (err) {
        expect(err).to.be.an.object
      }
    })

    describe.skip('updateProfile', () => {
      it('acccepts an object', () =>
        expect(store.firebase.updateProfile({ displayName: 'test' }))
          .to.eventually.become(undefined)
      )
    })

    describe('updateAuth', () => {
      it('rejects when not authenticated', () =>
        expect(store.firebase.updateAuth()).to.be.rejectedWith('User must be logged in to update auth.')
      )

      // TODO: test that update auth when authenticated
      it.skip('updates auth object if authenticated', () =>
        expect(store.firebase.updateAuth()).to.eventually.become(undefined)
      )

      // TODO: test that updateProfile is called if updateInProfile is true
      it.skip('calls update profile if updateInProfile is true', () =>
        expect(store.firebase.updateAuth({}, true)).to.eventually.become(undefined)
      )
    })

    describe('updateEmail', () => {
      it('rejects when not authenticated', () =>
        expect(store.firebase.updateEmail()).to.be.rejectedWith('User must be logged in to update email.')
      )

      // TODO: test that update auth when authenticated
      it.skip('updates auth object if authenticated', () =>
        expect(store.firebase.updateEmail()).to.eventually.become(undefined)
      )

      // TODO: test that updateProfile is called if updateInProfile is true
      it.skip('calls update profile if updateInProfile is true', () =>
        expect(store.firebase.updateEmail({}, true)).to.eventually.become(undefined)
      )
    })

    describe('verifyPasswordResetCode', () => {
      try {
        store.firebase.verifyPasswordResetCode({ code: 'test', password: 'test' })
      } catch (err) {
        expect(err).to.be.an.object
      }
    })

    describe('storage', () => {
      try {
        store.firebase.storage()
      } catch (err) {
        expect(err).to.be.an.object
      }
    })

    describe('messaging', () => {
      try {
        store.firebase.messaging()
      } catch (err) {
        expect(err).to.be.an.object
      }
    })
  })

  describe.skip('throws for missing fbConfig parameters', () => {
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
