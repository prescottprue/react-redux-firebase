import { fakeFirebase, createFirebaseStub } from '../utils'
import createFirebaseInstance, {
  getFirebase
} from '../../src/createFirebaseInstance'

describe('createFirebaseInstance', () => {
  it('Adds _ to firebase', () => {
    const dispatchSpy = sinon.spy(() => {})
    const firebaseInstance = createFirebaseInstance(
      fakeFirebase,
      {},
      dispatchSpy
    )

    expect(firebaseInstance).to.have.deep.property('_.watchers')
    expect(firebaseInstance).to.have.deep.property('_.listeners')
    expect(firebaseInstance).to.have.deep.property('_.callbacks')
    expect(firebaseInstance).to.have.deep.property('_.queries')
    expect(firebaseInstance).to.have.deep.property('_.authUid')
  })

  describe('set method', () => {
    it('calls firebase set at with data provided path', () => {
      const dispatchSpy = sinon.spy(() => {})
      const setSpy = sinon.spy(() => Promise.resolve())
      const firebaseStub = createFirebaseStub({}, { database: { set: setSpy } })
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.set).to.be.a.function
      const writePath = 'test/test/test'
      const writeData = {
        some: 'value'
      }
      const setPromise = firebaseInstance.set(writePath, writeData)
      expect(setPromise).to.have.property('then')
      expect(firebaseStub.database().ref).to.have.been.calledWith(writePath)
      expect(setSpy).to.have.been.calledWith(writeData)
    })
  })

  describe('push method', () => {
    it('calls firebase push with data at provided path', () => {
      const dispatchSpy = sinon.spy(() => {})
      const pushSpy = sinon.spy(() => Promise.resolve())
      const firebaseStub = createFirebaseStub(
        {},
        { database: { push: pushSpy } }
      )
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.push).to.be.a.function
      const writePath = 'test/test/test'
      const writeData = {
        some: 'value'
      }
      const pushPromise = firebaseInstance.push(writePath, writeData)
      expect(pushPromise).to.have.property('then')
      expect(firebaseStub.database().ref).to.have.been.calledWith(writePath)
      expect(pushSpy).to.have.been.calledWith(writeData)
    })
  })

  describe('update method', () => {
    it('calls firebase update with data at provided path', () => {
      const dispatchSpy = sinon.spy(() => {})
      const updateSpy = sinon.spy(() => Promise.resolve())
      const firebaseStub = createFirebaseStub(
        {},
        { database: { update: updateSpy } }
      )
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.update).to.be.a.function
      const writePath = 'test/test/test'
      const writeData = {
        some: 'value'
      }
      const updatePromise = firebaseInstance.update(writePath, writeData)
      expect(updatePromise).to.have.property('then')
      expect(firebaseStub.database().ref).to.have.been.calledWith(writePath)
      expect(updateSpy).to.have.been.calledWith(writeData)
    })
  })

  describe('remove method', () => {
    it('calls firebase remove at provided path', () => {
      const dispatchSpy = sinon.spy(() => {})
      const removeSpy = sinon.spy(() => Promise.resolve())
      const firebaseStub = createFirebaseStub(
        {},
        { database: { remove: removeSpy } }
      )
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.remove).to.be.a.function
      const writePath = 'test/test/test'
      const removePromise = firebaseInstance.remove(writePath)
      expect(removePromise).to.have.property('then')
      expect(firebaseStub.database().ref).to.have.been.calledWith(writePath)
    })
  })
})

describe('getFirebase', () => {
  it('returns firebae instance', () => {
    const firebaseInstance = getFirebase()
    expect(firebaseInstance).to.be.an('object')
  })
})
