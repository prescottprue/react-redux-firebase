import { createStore, compose } from 'redux'
import composeFunc, { getFirebase } from '../../src/compose'

const reducer = sinon.spy()
const valAtPath = (path) => {
  return Firebase.ref(path).once('value').then((snap) => snap.val())
}

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
let path
describe('Compose', () => {
  it('is a function', () => {
    expect(composeFunc).to.be.a.function
  })

  it('returns an object', () => {
    expect(composeFunc(Firebase)).to.be.a.function
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
        expect(store.firebase.set('test', {some: 'asdf'}))
          .to.eventually.become(undefined)
      })
    })

    describe('setWithMeta', () => {
      describe('accepts object', () => {
        it('accepts object', () => {
          expect(store.firebase.setWithMeta('test', {some: 'asdf'}))
            .to.eventually.become(undefined)
        })
      })

      describe('does not attach meta to string', () => {
        // TODO: confirm that data set actually does not include meta
        it('accepts object', () => {
          expect(store.firebase.setWithMeta('test', 'asdd'))
            .to.eventually.equal({})
        })
      })
    })

    describe('push', () => {
      it('accepts object', () => {
        expect(store.firebase.push('test', {some: 'asdf'}))
          .to.eventually.have.property('key')
      })
    })

    describe('pushWithMeta', () => {
      it('accepts object', () => {
        expect(store.firebase.pushWithMeta('test', {some: 'asdf'}))
          .to.eventually.have.property('key')
      })
    })

    describe('update', () => {
      it('accepts object', async () => {
        // undefined represents snapshot
        const res = await store.firebase.update('test', {some: 'asdf'})
        expect(res).to.equal(undefined)
      })
    })

    describe('updateWithMeta', () => {
      it('sets updatedAt', async () => {
        const updateRes = await store.firebase.updateWithMeta('test', {some: 'asdddf'})
        const after = await valAtPath('test')
        expect(after.updatedAt).to.exist
        expect(updateRes).to.equal(undefined)
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
        const setRes = await store.firebase.uniqueSet(path, {some: 'asdf'})
        expect(setRes).to.respondTo('val') // resolves with snapshot
      })

      it('throws if not unique', async () => {
        try {
          await store.firebase.uniqueSet('test', {some: 'other'})
        } catch (err) {
          expect(err.toString()).to.equal('Error: Path already exists.')
        }
      })

      it('calls onComplete on success', async () => {
        const func = sinon.spy()
        await store.firebase.uniqueSet(path, {some: 'asdf'}, func)
        expect(func).to.have.been.calledOnce
      })

      it('calls onComplete on error', async () => {
        const func = sinon.spy()
        try {
          await store.firebase.uniqueSet(path, {some: 'asdf'}, func)
        } catch (err) {
          expect(func).to.have.been.calledOnce
          expect(err).to.exist
        }
      })
    })

    describe('remove', () => {
      it.skip('runs', async () => {
        const res = await store.firebase.remove('test')
        expect(res).to.equal({})
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
        expect(store.firebase.createUser({ email: 'test' }, { email: 'test' }))
          .to.eventually.be.an.object
      })
    })

    describe('verifyPasswordResetCode', () => {
      it('calls verifyPasswordResetCode Firebase method', () => {
        expect(store.firebase.verifyPasswordResetCode('testCode'))
           // message associated with calling verifyPasswordResetCode on fake db
          .to.be.rejectedWith('Your API key is invalid, please check you have copied it correctly.')
      })
    })

    describe('storage', () => {
      it('is undefined if storage does not exist', () => {
        expect(() => store.firebase.storage())
          .to.Throw('store.firebase.storage is not a function')
      })

      it('is exported if it exists', () => {
        Firebase.storage = () => ({})
        expect(store.firebase.storage()).to.be.an.object
        Firebase.storage = undefined
      })
    })

    describe('messaging', () => {
      it('is undefined if messaging does not exist', () => {
        expect(() => store.firebase.messaging())
          .to.Throw('store.firebase.messaging is not a function')
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
