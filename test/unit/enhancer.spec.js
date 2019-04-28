import { createStore, compose } from 'redux'
import enhancer, { getFirebase } from '../../src/enhancer'

const reducer = sinon.spy()
const valAtPath = path =>
  Firebase.ref(path)
    .once('value')
    .then(snap => snap.val())

const generateCreateStore = params =>
  compose(
    enhancer(Firebase, {
      userProfile: 'users',
      enableLogging: params && params.enableLogging,
      enableRedirectHandling: false
    })
  )(createStore)

const store = generateCreateStore()(reducer)
let path

describe('enhancer', () => {
  it('is a function', () => {
    expect(enhancer).to.be.a.function
  })

  it('returns an function', () => {
    expect(enhancer(Firebase)).to.be.a.function
  })

  it('throws for first argument not being a valid Firebase library instance', () => {
    expect(() => enhancer({})(() => ({}))()).to.Throw(
      'v2.0.0-beta and higher require passing a firebase app instance or a firebase library instance. View the migration guide for details.'
    )
  })

  it('throws for first argument not being a Firebase app instance', () => {
    expect(() => enhancer({ SDK_VERSION: '' })(() => ({}))()).to.Throw(
      'v2.0.0-beta and higher require passing a firebase app instance or a firebase library instance. View the migration guide for details.'
    )
  })

  it('throws for first argument not being a Firebase app instance', () => {
    expect(() => enhancer({ SDK_VERSION: '' })(() => ({}))()).to.Throw(
      'v2.0.0-beta and higher require passing a firebase app instance or a firebase library instance. View the migration guide for details.'
    )
  })

  it('sets store.firebaseAuthIsReady when config.attachAuthIsReady it true', () => {
    const store = enhancer(
      { SDK_VERSION: '', firebase_: {} },
      { attachAuthIsReady: true }
    )(() => ({}))()
    expect(store).to.have.property('firebaseAuthIsReady')
    expect(store.firebaseAuthIsReady).to.be.a.function
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
      it('accepts object', () => {
        expect(
          store.firebase.set('test', { some: 'asdf' })
        ).to.eventually.become(undefined)
      })
    })

    describe('setWithMeta', () => {
      describe('accepts object', () => {
        it('accepts object', () => {
          expect(
            store.firebase.setWithMeta('test', { some: 'asdf' })
          ).to.eventually.become(undefined)
        })
      })

      describe('does not attach meta to string', () => {
        // TODO: confirm that data set actually does not include meta
        it('accepts object', () => {
          expect(
            store.firebase.setWithMeta('test', 'asdd')
          ).to.eventually.equal({})
        })
      })
    })

    describe('push', () => {
      it('accepts object', () => {
        expect(
          store.firebase.push('test', { some: 'asdf' })
        ).to.eventually.have.property('key')
      })
    })

    describe('pushWithMeta', () => {
      it('accepts object', () => {
        expect(
          store.firebase.pushWithMeta('test', { some: 'asdf' })
        ).to.eventually.have.property('key')
      })
    })

    describe('update', () => {
      it('accepts object', async () => {
        // undefined represents snapshot
        const res = await store.firebase.update('test', { some: 'asdf' })
        expect(res).to.be.undefined
      })
    })

    describe('updateWithMeta', () => {
      it('sets updatedAt', async () => {
        const updateRes = await store.firebase.updateWithMeta('test', {
          some: 'asdddf'
        })
        const after = await valAtPath('test')
        expect(after.updatedAt).to.exist
        expect(updateRes).to.be.undefined
      })
    })

    describe('uniqueSet', () => {
      beforeEach(() => {
        path = 'test/unique'
      })
      // remove test root after test are complete
      afterEach(() => {
        if (store.firebase.remove) {
          return store.firebase.remove(path)
        }
      })
      // Skipped due to issue with mocked transaction not returning committed
      it('sets if unique', async () => {
        const setRes = await store.firebase.uniqueSet(path, { some: 'asdf' })
        expect(setRes).to.respondTo('val') // resolves with snapshot
      })

      it('throws if not unique', async () => {
        try {
          await store.firebase.uniqueSet('test', { some: 'other' })
        } catch (err) {
          expect(err.toString()).to.equal('Error: Path already exists.')
        }
      })

      it('calls onComplete on success', async () => {
        const func = sinon.spy()
        await store.firebase.uniqueSet(path, { some: 'asdf' }, func)
        expect(func).to.have.been.calledOnce
      })

      it('calls onComplete on error', async () => {
        const func = sinon.spy()
        try {
          await store.firebase.set('test', { some: 'other' })
          await store.firebase.uniqueSet('test', { some: 'other' }, func)
        } catch (err) {
          expect(func).to.have.been.calledOnce
          expect(err).to.exist
        }
      })
    })

    describe('remove', () => {
      it('removes the value from Firebase', async () => {
        // add data to be removed
        await store.firebase.update('test', { some: 'asdf' })
        // remove data
        await store.firebase.remove('test')
        const afterSnap = await store.firebase.ref('test').once('value')
        // confirm data was removed
        expect(afterSnap.val()).to.be.null
      })

      it('calls onComplete on success', async () => {
        const func = sinon.spy()
        await store.firebase.remove(path, func)
        expect(func).to.have.been.calledOnce
      })

      it('calls onComplete on error', async () => {
        const func = sinon.spy()
        try {
          await store.firebase.remove(path, func)
        } catch (err) {
          expect(func).to.have.been.calledOnce
          expect(err).to.exist
        }
      })
    })

    describe('promiseEvents', () => {
      it('starts promiseEvents', async () => {
        await store.firebase.promiseEvents(['test'])
        expect(store.firebase.ref('test')).to.be.an.object
      })
    })

    describe('uploadFile', () => {
      it('calls uploadFile Firebase method', () => {
        expect(store.firebase.uploadFile('some/path.pdf', {}, null, {})).to.be
          .rejected
      })
    })

    describe('uploadFiles', () => {
      it('calls uploadFiles Firebase method', () => {
        expect(store.firebase.uploadFiles('test', [{ name: 'file1' }])).to.be
          .rejected
      })
    })

    describe('deleteFile', () => {
      it('calls deleteFile Firebase method', () => {
        expect(store.firebase.deleteFile('new@email.com')).to.be.rejected
      })
    })

    describe('watchEvent', () => {
      it('starts watcher', async () => {
        await store.firebase.watchEvent('value', 'test')
        expect(store.firebase.ref('test')).to.be.an.object
      })
    })

    describe('unWatchEvent', () => {
      it('unWatchesEvent', () => store.firebase.unWatchEvent('value', 'test'))
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
        expect(store.firebase.createUser({ email: 'test' }, { email: 'test' }))
          .to.eventually.be.an.object
      })
    })
    describe('resetPassword', () => {
      it('calls resetPassword Firebase method', () => {
        expect(store.firebase.resetPassword('testCode')).to.be.rejected
      })
    })

    describe('confirmPasswordReset', () => {
      it('calls confirmPasswordReset Firebase method', () => {
        expect(store.firebase.confirmPasswordReset('testCode', 'testCode')).to
          .be.rejected
      })
    })

    describe('verifyPasswordResetCode', () => {
      it('calls verifyPasswordResetCode Firebase method', () => {
        // message associated with calling verifyPasswordResetCode on fake db
        // TODO: Bring back once single error appears all the time (firebase-server issue causes this to change wordingonly on 6.11.1 builds?)
        // .to.be.rejectedWith('Your API key is invalid, please check you have copied it correctly.')
        expect(store.firebase.verifyPasswordResetCode('testCode')).to.be
          .rejected
      })
    })

    describe('updateProfile', () => {
      it('calls updateProfile Firebase method', () => {
        expect(store.firebase.updateProfile({ new: 'thing' })).to.be.rejected
      })
    })

    describe('updateAuth', () => {
      it('calls updateAuth Firebase method', () => {
        expect(store.firebase.updateAuth({ new: 'thing' })).to.be.rejected
      })
    })

    describe('updateEmail', () => {
      it('calls updateEmail Firebase method', () => {
        expect(store.firebase.updateEmail('new@email.com')).to.be.rejected
      })
    })

    describe('reloadAuth', () => {
      it('calls reloadAuth Firebase method', () => {
        expect(store.firebase.reloadAuth())
          // message associated with calling reloadAuth on fake db
          .to.be.rejectedWith('Must be logged in to reload auth')
      })
    })

    describe('linkWithCredential', () => {
      it('calls reloadAuth Firebase method', () => {
        expect(store.firebase.linkWithCredential())
          // message associated with calling reloadAuth on fake db
          .to.be.rejectedWith('Must be logged in to reload auth')
      })
    })

    describe('storage', () => {
      it('is undefined if storage does not exist', () => {
        const original = Firebase.storage
        Firebase.storage = null
        expect(() => store.firebase.storage()).to.Throw(
          'store.firebase.storage is not a function'
        )
        // Reset to original
        Firebase.storage = original
      })

      it('is exported if it exists', () => {
        Firebase.storage = () => ({})
        expect(store.firebase.storage()).to.be.an.object
        Firebase.storage = undefined
      })
    })

    describe('messaging', () => {
      it('is undefined if messaging does not exist', () => {
        expect(() => store.firebase.messaging()).to.Throw(
          'store.firebase.messaging is not a function'
        )
      })

      it('is exported if it exists', () => {
        Firebase.messaging = () => ({})
        expect(store.firebase.messaging()).to.be.an.object
        Firebase.messaging = undefined
      })
    })
  })

  describe('getFirebase', () => {
    it('exports firebase instance', () => {
      expect(getFirebase()).to.be.an.object
    })
  })
})
