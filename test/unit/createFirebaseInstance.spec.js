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

  describe('ref method', () => {
    it('calls firebase ref at with data provided path', () => {
      const dispatchSpy = sinon.spy(() => {})
      const refSpy = sinon.spy(() => {})
      const firebaseStub = createFirebaseStub({}, { database: { ref: refSpy } })
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.ref).to.be.a.function
      const writePath = 'test/test/test'
      firebaseInstance.ref(writePath)
    })
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

  describe('setWithMeta method', () => {
    it('calls firebase set at with data provided path', () => {
      const dispatchSpy = sinon.spy(() => {})
      const setSpy = sinon.spy(() => Promise.resolve())
      const firebaseStub = createFirebaseStub({}, { database: { set: setSpy } })
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.setWithMeta).to.be.a.function
      const writePath = 'test/test/test'
      const writeData = {
        some: 'value'
      }
      const setPromise = firebaseInstance.setWithMeta(writePath, writeData)
      expect(setPromise).to.have.property('then')
      expect(firebaseStub.database().ref).to.have.been.calledWith(writePath)
      expect(setSpy).to.have.been.calledWith({
        ...writeData,
        createdAt: 'test'
      })
    })

    it('calls firebase set at with data provided path with non object value', () => {
      const dispatchSpy = sinon.spy(() => {})
      const setSpy = sinon.spy(() => Promise.resolve())
      const firebaseStub = createFirebaseStub({}, { database: { set: setSpy } })
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.setWithMeta).to.be.a.function
      const writePath = 'test/test/test'
      const writeData = 'some'
      const setPromise = firebaseInstance.setWithMeta(writePath, writeData)
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

  describe('pushWithMeta method', () => {
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
      const pushPromise = firebaseInstance.pushWithMeta(writePath, writeData)
      expect(pushPromise).to.have.property('then')
      expect(firebaseStub.database().ref).to.have.been.calledWith(writePath)
      expect(pushSpy).to.have.been.calledWith({
        ...writeData,
        createdAt: 'test'
      })
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

  describe('updateWithMeta method', () => {
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
      const updatePromise = firebaseInstance.updateWithMeta(
        writePath,
        writeData
      )
      expect(updatePromise).to.have.property('then')
      expect(firebaseStub.database().ref).to.have.been.calledWith(writePath)
      expect(updateSpy).to.have.been.calledWith({
        ...writeData,
        updatedAt: 'test'
      })
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

  describe('uniqueSet method', () => {
    it('calls firebase transaction at provided path and handles non commited case', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const transactionSpy = sinon.spy(() =>
        Promise.resolve({ committed: false })
      )
      const firebaseStub = createFirebaseStub(
        {},
        { database: { transaction: transactionSpy } }
      )
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.uniqueSet).to.be.a.function
      const writePath = 'test/test/test'
      expect(firebaseInstance.uniqueSet(writePath)).to.be.rejectedWith(
        'Path already exists.'
      )
    })

    it('calls firebase transaction at provided path', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const snapshot = {}
      const transactionSpy = sinon.spy(passedArg => {
        if (typeof passedArg === 'function') {
          passedArg()
        }
        return Promise.resolve({ committed: true, snapshot })
      })
      const firebaseStub = createFirebaseStub(
        {},
        { database: { transaction: transactionSpy } }
      )
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.uniqueSet).to.be.a.function
      const writePath = 'test/test/test'
      const returnedVal = await firebaseInstance.uniqueSet(writePath, {
        some: 'value'
      })
      expect(firebaseStub.database().ref).to.have.been.calledWith(writePath)
      expect(transactionSpy).to.have.been.calledOnce
      expect(returnedVal).to.equal(snapshot)
    })
  })

  describe('uploadFiles method', () => {
    it('calls firebase storage put at provided paths', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const putSpy = sinon.spy(() => Promise.resolve({}))
      const refSpy = sinon.stub().returns({ put: putSpy })
      const firebaseStub = {
        storage: () => ({ ref: refSpy }),
        _: firebase._
      }
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.uploadFiles).to.be.a.function
      const writePath = 'test/test/test'
      const fileName = 'somefile.png'
      await firebaseInstance.uploadFiles(writePath, [{ name: fileName }])
      expect(refSpy).to.have.been.calledWith(`${writePath}/${fileName}`)
      expect(putSpy).to.have.been.calledOnce
    })
  })

  describe('uploadFiles method', () => {
    it('calls firebase storage put at provided path', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const putSpy = sinon.spy(() => Promise.resolve({}))
      const refSpy = sinon.stub().returns({ put: putSpy })
      const firebaseStub = {
        storage: () => ({ ref: refSpy }),
        _: firebase._
      }
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.uploadFiles).to.be.a.function
      const writePath = 'test/test/test'
      const fileName = 'somefile.png'
      await firebaseInstance.uploadFile(writePath, { name: fileName })
      expect(refSpy).to.have.been.calledWith(`${writePath}/${fileName}`)
      expect(putSpy).to.have.been.calledOnce
    })
  })

  describe('deleteFile method', () => {
    it('calls firebase storage put at provided path', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const putSpy = sinon.spy(() => Promise.resolve({}))
      const refSpy = sinon.stub().returns({ delete: putSpy })
      const firebaseStub = {
        storage: () => ({ ref: refSpy }),
        _: firebase._
      }
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.deleteFile).to.be.a.function
      const writePath = 'test/test/test'
      await firebaseInstance.deleteFile(writePath)
      expect(refSpy).to.have.been.calledWith(writePath)
      expect(putSpy).to.have.been.calledOnce
    })
  })

  describe('watchEvent method', () => {
    it('calls firebase database child and once at provided path', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const onceSpy = sinon.spy(() => Promise.resolve({ val: () => {} }))
      const childSpy = sinon.spy(() => ({ once: onceSpy }))
      const refSpy = sinon.stub().returns({ child: childSpy })
      const firebaseStub = {
        database: () => ({ ref: refSpy }),
        _: firebase._
      }
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.watchEvent).to.be.a.function
      const writePath = 'test/test/test'
      await firebaseInstance.watchEvent('once', writePath)
      expect(childSpy).to.have.been.calledWith(writePath)
      expect(onceSpy).to.have.been.calledWith('value')
    })
  })

  describe('unWatchEvent method', () => {
    it('calls firebase database ref at provided path', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const offSpy = sinon.spy(() => Promise.resolve({ val: () => {} }))
      const childSpy = sinon.spy(() => ({ off: offSpy }))
      const refSpy = sinon.stub().returns({ child: childSpy })
      const writePath = 'test/test/test'
      const firebaseStub = {
        database: () => ({ ref: refSpy }),
        _: { ...firebase._, watchers: { [writePath]: 1 } }
      }
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.unWatchEvent).to.be.a.function
      await firebaseInstance.unWatchEvent('value', writePath)
    })
  })

  describe('promiseEvents method', () => {
    it('calls firebase database child at provided path', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const onSpy = sinon.spy(() => Promise.resolve({ val: () => {} }))
      const childSpy = sinon.spy(() => ({ on: onSpy }))
      const refSpy = sinon.stub().returns({ child: childSpy })
      const writePath = 'test/test/test'
      const firebaseStub = {
        database: () => ({ ref: refSpy }),
        _: firebase._
      }
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.promiseEvents).to.be.a.function
      await firebaseInstance.promiseEvents([writePath])
      expect(onSpy).to.have.been.calledOnce
    })
  })

  describe('login method', () => {
    it('calls firebase auth signInWithEmailAndPassword', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const loginSpy = sinon.spy(() => Promise.resolve({}))
      const firebaseStub = {
        auth: () => ({ signInWithEmailAndPassword: loginSpy }),
        _: firebase._
      }
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.login).to.be.a.function
      const email = 'test@test.com'
      const password = 'asdfasdf1'
      await firebaseInstance.login({
        email,
        password
      })
      // signInWithEmailAndPassword is called on login with email
      expect(loginSpy).to.have.been.calledOnce
    })
  })

  describe('handleRedirectResult method', () => {
    it('calls firebase auth handleRedirectResult', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const loginSpy = sinon.spy(() => Promise.resolve({}))
      const firebaseStub = {
        auth: () => ({ handleRedirectResult: loginSpy }),
        _: firebase._
      }
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.login).to.be.a.function
      const email = 'test@test.com'
      const password = 'asdfasdf1'
      await firebaseInstance.handleRedirectResult({
        email,
        password
      })
    })
  })

  describe('logout method', () => {
    it('calls firebase auth signOut', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const signoutSpy = sinon.spy(() => Promise.resolve({}))
      const firebaseStub = {
        auth: () => ({ signOut: signoutSpy }),
        database: () => ({
          ref: () => ({ child: sinon.stub().returns({ off: () => {} }) })
        }),
        _: firebase._
      }
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.logout).to.be.a.function
      await firebaseInstance.logout()
      // signInWithEmailAndPassword is called on login with email
      expect(signoutSpy).to.have.been.calledOnce
    })
  })

  describe('createUser method', () => {
    it('calls firebase auth createUserWithEmailAndPassword', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const createUserSpy = sinon.spy(() => Promise.resolve({}))
      const firebaseStub = {
        auth: () => ({ createUserWithEmailAndPassword: createUserSpy }),
        _: firebase._
      }
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.createUser).to.be.a.function
      const email = 'test@test.com'
      const password = 'asdfasdf1'
      await firebaseInstance.createUser({
        email,
        password
      })
      // signInWithEmailAndPassword is called on createUser with email
      expect(createUserSpy).to.have.been.calledOnce
    })
  })

  describe('resetPassword method', () => {
    it('calls firebase auth sendPasswordResetEmail', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const resetPasswordSpy = sinon.spy(() => Promise.resolve({}))
      const firebaseStub = {
        auth: () => ({ sendPasswordResetEmail: resetPasswordSpy }),
        _: firebase._
      }
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.resetPassword).to.be.a.function
      const email = 'test@test.com'
      const password = 'asdfasdf1'
      await firebaseInstance.resetPassword({
        email,
        password
      })
      // signInWithEmailAndPassword is called on resetPassword with email
      expect(resetPasswordSpy).to.have.been.calledOnce
    })
  })

  describe('confirmPasswordReset method', () => {
    it('calls firebase auth confirmPasswordReset', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const confirmPasswordResetSpy = sinon.spy(() => Promise.resolve({}))
      const firebaseStub = {
        auth: () => ({ confirmPasswordReset: confirmPasswordResetSpy }),
        _: firebase._
      }
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.confirmPasswordReset).to.be.a.function
      const email = 'test@test.com'
      const password = 'asdfasdf1'
      await firebaseInstance.confirmPasswordReset({
        email,
        password
      })
      expect(confirmPasswordResetSpy).to.have.been.calledOnce
    })
  })

  describe('verifyPasswordResetCode method', () => {
    it('calls firebase auth verifyPasswordResetCode', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const verifyPasswordResetCodeSpy = sinon.spy(() => Promise.resolve({}))
      const firebaseStub = {
        auth: () => ({ verifyPasswordResetCode: verifyPasswordResetCodeSpy }),
        _: firebase._
      }
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.verifyPasswordResetCode).to.be.a.function
      const email = 'test@test.com'
      const password = 'asdfasdf1'
      await firebaseInstance.verifyPasswordResetCode({
        email,
        password
      })
      expect(verifyPasswordResetCodeSpy).to.have.been.calledOnce
    })
  })

  describe('updateProfile method', () => {
    it('calls firebase database update', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const onceSpy = sinon.spy(() => Promise.resolve({ val: () => ({}) }))
      const updateSpy = sinon.spy(() => Promise.resolve({}))
      const refSpy = sinon.stub().returns({ once: onceSpy, update: updateSpy })
      // const writePath = 'test/test/test'
      const firebaseStub = {
        database: () => ({ ref: refSpy }),
        _: firebase._
      }
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )
      expect(firebaseInstance.updateProfile).to.be.a.function
      const email = 'test@test.com'
      const password = 'asdfasdf1'
      await firebaseInstance.updateProfile({
        email,
        password
      })
      // signInWithEmailAndPassword is called on updateProfile with email
      expect(onceSpy).to.have.been.calledOnce
    })
  })

  describe('updateAuth method', () => {
    it('calls firebase auth updateProfile', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const updateAuthSpy = sinon.spy(() => Promise.resolve({}))
      const firebaseStub = {
        auth: () => ({ updateProfile: updateAuthSpy }),
        _: firebase._
      }
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.updateAuth).to.be.a.function
      const email = 'test@test.com'
      const password = 'asdfasdf1'
      try {
        await firebaseInstance.updateAuth({
          email,
          password
        })
      } catch (err) {
        expect(err).to.have.property(
          'message',
          'User must be logged in to update auth.'
        )
      }
    })
  })

  describe('updateEmail method', () => {
    it('calls firebase auth updateEmail', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const updateEmailSpy = sinon.spy(() => Promise.resolve({}))
      const firebaseStub = {
        auth: () => ({ updateEmail: updateEmailSpy }),
        _: firebase._
      }
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.updateEmail).to.be.a.function
      const email = 'test@test.com'
      const password = 'asdfasdf1'
      try {
        await firebaseInstance.updateEmail({
          email,
          password
        })
      } catch (err) {
        expect(err).to.have.property(
          'message',
          'User must be logged in to update email.'
        )
      }
    })
  })

  describe('reloadAuth method', () => {
    it('calls firebase auth reloadAuth', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const reloadAuthSpy = sinon.spy(() => Promise.resolve({}))
      const firebaseStub = {
        auth: () => ({ reloadAuth: reloadAuthSpy }),
        _: firebase._
      }
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.reloadAuth).to.be.a.function
      const email = 'test@test.com'
      const password = 'asdfasdf1'
      try {
        await firebaseInstance.reloadAuth({
          email,
          password
        })
      } catch (err) {
        expect(err).to.have.property(
          'message',
          'User must be logged in to reload auth.'
        )
      }
    })
  })

  describe('linkWithCredential method', () => {
    it('calls firebase auth linkWithCredential', async () => {
      const dispatchSpy = sinon.spy(() => {})
      const linkWithCredentialSpy = sinon.spy(() => Promise.resolve({}))
      const firebaseStub = {
        auth: () => ({ linkWithCredential: linkWithCredentialSpy }),
        _: firebase._
      }
      const firebaseInstance = createFirebaseInstance(
        firebaseStub,
        {},
        dispatchSpy
      )

      expect(firebaseInstance.linkWithCredential).to.be.a.function
      const email = 'test@test.com'
      const password = 'asdfasdf1'
      try {
        await firebaseInstance.linkWithCredential({
          email,
          password
        })
      } catch (err) {
        expect(err).to.have.property(
          'message',
          'User must be logged in to link with credential.'
        )
      }
    })
  })
})

describe('getFirebase', () => {
  it('returns firebae instance', () => {
    const firebaseInstance = getFirebase()
    expect(firebaseInstance).to.be.an('object')
  })
})
