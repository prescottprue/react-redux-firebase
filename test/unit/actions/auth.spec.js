import {
  init,
  unWatchUserProfile,
  watchUserProfile,
  createUserProfile,
  handleProfileWatchResponse,
  login,
  logout,
  createUser,
  updateProfile,
  reloadAuth,
  linkWithCredential,
  linkWithPopup,
  linkAndRetrieveDataWithCredential,
  linkWithRedirect,
  signInWithPhoneNumber,
  updateAuth,
  updateEmail,
  resetPassword,
  confirmPasswordReset,
  verifyPasswordResetCode
} from 'actions/auth'
import { cloneDeep } from 'lodash'
import { actionTypes } from 'constants' // eslint-disable-line node/no-deprecated-api
import {
  fakeFirebase,
  createFirebaseStub,
  createSuccessStub,
  onAuthStateChangedSpy,
  firebaseWithConfig,
  createFailureStub,
  sleep
} from '../../utils'
// import { promisesForPopulate } from 'utils/populate'

let functionSpy
let dispatchSpy
let res
let profile
let profileSnap
let dispatch
let firebaseStub

const addSpyToCurrentUser = (methodName, spyFunc) => ({
  ...fakeFirebase,
  auth: () => ({
    get currentUser() {
      return {
        [methodName]: spyFunc
      }
    }
  })
})
const addSpyWithArgsToAuthMethod = (methodName, spyFunc, args = []) => ({
  ...fakeFirebase,
  auth: () => ({
    [methodName]: () => spyFunc(args)
  })
})
const fakeLogin = {
  email: 'test@tst.com',
  password: 'asdfasdf',
  role: 'admin'
}

describe('Actions: Auth -', () => {
  beforeEach(() => {
    dispatch = sinon.spy()
    firebaseStub = createFirebaseStub()
  })
  describe('init -', () => {
    it("calls firebase's onAuthStateChanged", () => {
      init(dispatch, fakeFirebase)
      expect(onAuthStateChangedSpy).to.have.been.calledOnce
    })
    it('Errors if Firebase instance is not passed', () => {
      expect(init(dispatch, {})).to.Throw
    })
  })

  describe('unWatchUserProfile -', () => {
    it('calls profile unwatch', () => {
      fakeFirebase._.profileWatch = () => {}
      unWatchUserProfile(fakeFirebase)
      expect(fakeFirebase._.profileWatch).to.be.null
    })

    it('calls profile watch then sets to null when useFirestoreForProfile: true', () => {
      let profileCalled
      let currentFake = cloneDeep(fakeFirebase)
      currentFake._.profileWatch = () => {
        profileCalled = true
      }
      currentFake._.config.useFirestoreForProfile = true
      currentFake.firestore = {}
      unWatchUserProfile(currentFake)
      expect(currentFake._.profileWatch).to.be.null
      expect(profileCalled).to.be.true
    })
  })

  describe('handleProfileWatchResponse -', () => {
    beforeEach(() => {
      dispatchSpy = sinon.spy()
      firebase._.config.profileParamsToPopulate = undefined
      firebase._.profileWatch = undefined
      profile = { email: 'test@test.com' }
      profileSnap = { val: () => profile }
    })

    describe('dispatches SET_PROFILE with profile', () => {
      it('from RTDB data', () => {
        firebase._.config.profileParamsToPopulate = undefined
        handleProfileWatchResponse(dispatchSpy, firebase, profileSnap)
        expect(dispatchSpy).to.be.calledWith({
          type: actionTypes.SET_PROFILE,
          profile
        })
      })

      it('from Firestore data', () => {
        firebase._.config.profileParamsToPopulate = undefined
        const firestoreProfileSnap = { data: () => profile, exists: true }
        handleProfileWatchResponse(dispatchSpy, firebase, firestoreProfileSnap)
        expect(dispatchSpy).to.be.calledWith({
          type: actionTypes.SET_PROFILE,
          profile
        })
      })

      it('that is an empty object (sets profile to null)', () => {
        firebase._.config.profileParamsToPopulate = undefined
        handleProfileWatchResponse(dispatchSpy, firebase, {})
        expect(dispatchSpy).to.be.calledWith({
          type: actionTypes.SET_PROFILE,
          profile: null
        })
      })
    })

    describe('profileParamsToPopulate setting -', () => {
      let consoleWarnSpy

      beforeEach(() => {
        consoleWarnSpy = sinon.spy(console, 'warn')
      })
      afterEach(() => {
        consoleWarnSpy.restore()
      })
      it('undefined - dispatches SET_PROFILE with profile', () => {
        firebase._.config.profileParamsToPopulate = undefined
        handleProfileWatchResponse(dispatchSpy, firebase, profileSnap)
        expect(dispatchSpy).to.be.calledWith({
          type: actionTypes.SET_PROFILE,
          profile
        })
      })

      it('{} - dispatches SET_PROFILE with profile (not supported)', () => {
        firebase._.config.profileParamsToPopulate = {}
        handleProfileWatchResponse(dispatchSpy, firebase, profileSnap)
        expect(dispatchSpy).to.be.calledWith({
          type: actionTypes.SET_PROFILE,
          profile
        })
      })

      it('Array - dispatches SET_PROFILE with populated profile', () => {
        firebase._.config.profileParamsToPopulate = []
        handleProfileWatchResponse(dispatchSpy, firebase, profileSnap)
        // TODO: Come up with better way to test populate is called other than that dispatch is not
        expect(dispatchSpy).to.have.callCount(0)
        // expect(dispatchSpy)
        //   .to.be.calledWith({ type: actionTypes.SET_PROFILE })
      })

      it('Any when useFirestoreForProfile: true - calls console.warn', () => {
        let currentFake = cloneDeep(fakeFirebase)
        currentFake._.profileWatch = () => {}
        currentFake._.config.useFirestoreForProfile = true
        currentFake._.config.profileParamsToPopulate = ['some']
        currentFake.firestore = {}
        handleProfileWatchResponse(dispatchSpy, currentFake)
        expect(consoleWarnSpy).to.be.calledWith(
          'Profile population is not yet supported for Firestore'
        )
      })
    })
  })

  describe('watchUserProfile -', () => {
    beforeEach(() => {
      functionSpy = sinon.spy(dispatch)
      firebase._.config.profileWatch = null
    })

    afterEach(() => {
      firebase._.config.profileParamsToPopulate = undefined
    })

    it('sets profile watch function', () => {
      watchUserProfile(dispatch, firebase)
      expect(firebase._.profileWatch).to.be.a.function
    })

    describe('populates -', () => {
      it('skips populating data into profile by default', () => {
        firebase._.config.profileParamsToPopulate = 'role:roles'
        watchUserProfile(dispatch, firebase)
        expect(firebase._.profileWatch).to.be.a.function
      })

      it('sets populates to profile autoPopulateProfile is true', () => {
        firebase._.config.profileParamsToPopulate = 'role:roles'
        firebase._.config.autoPopulateProfile = true
        watchUserProfile(functionSpy, firebase)
        expect(firebase._.profileWatch).to.be.a.function
        // TODO: Find a better way to confirm population is happening other than that dispatch is not being called
        expect(functionSpy).to.have.callCount(0)
      })

      it('skips populating data into profile if autoPopulateProfile is false', () => {
        firebase._.config.profileParamsToPopulate = 'role:roles'
        firebase._.config.autoPopulateProfile = false
        watchUserProfile(functionSpy, firebase)
        // TODO: Find a better way to confirm population is happening other than that dispatch is not being called
        expect(functionSpy).to.have.callCount(0)
      })

      // TODO: Find a way to test promisesForPopulate within watchUserProfile
      it.skip('calls set actions for populate data if setProfilePopulateResults is true', () => {
        firebase._.config.profileParamsToPopulate = 'role:roles'
        firebase._.config.setProfilePopulateResults = true
        watchUserProfile(dispatch, firebase)
        expect(functionSpy).to.be.calledOnce
      })
    })
  })

  describe('createUserProfile', () => {
    it('creates profile if config is enabled', async () => {
      const userData = {
        uid: '123',
        email: 'test@test.com',
        providerData: [{}]
      }
      const profile = await createUserProfile(dispatch, Firebase, userData, {
        some: 'asdf'
      })
      expect(profile).to.be.an.object
    })

    it('resolves with userData if userProfile config option is not enabled', async () => {
      const userData = {
        uid: '123',
        email: 'test@test.com',
        providerData: [{}]
      }
      const fb = firebaseWithConfig({ userProfile: null })
      const profile = await createUserProfile(dispatch, fb, userData, {
        some: 'asdf'
      })
      expect(profile).to.equal(userData)
    })

    it('creates profile using profileFactory sync function if it exists', async () => {
      const userData = {
        uid: '123',
        email: 'test@test.com',
        providerData: [{}]
      }
      const profileObj = { some: 'asdf' }
      const profileFactory = sinon.spy(() => profileObj)
      const profile = await createUserProfile(
        dispatch,
        firebaseWithConfig({ profileFactory }),
        userData
      )
      expect(profile).to.have.property('some', profileObj.some)
      expect(profileFactory).to.have.been.calledOnce
    })

    it('creates profile using profileFactory promise function if it exists', async () => {
      const userData = {
        uid: '123',
        email: 'test@test.com',
        providerData: [{}]
      }
      const profileObj = { some: 'asdf' }
      /* eslint-disable jsdoc/require-jsdoc */
      async function profileFactoryPromise() {
        await sleep(500)
        return profileObj
      }
      const profileFactory = sinon.spy(profileFactoryPromise)
      const profile = await createUserProfile(
        dispatch,
        firebaseWithConfig({ profileFactory }),
        userData
      )
      expect(profile).to.have.property('some', profileObj.some)
      expect(profileFactory).to.have.been.calledOnce
    })

    it('rejects for error in profileFactory function', async () => {
      const profileFactory = () => {
        throw new Error('test')
      }
      try {
        await createUserProfile(
          dispatch,
          firebaseWithConfig({ profileFactory }),
          {},
          {}
        )
      } catch (err) {
        expect(err).to.have.property('message', 'test')
      }
    })
  })

  describe('login', function() {
    // Extend default timeout to prevent test fail on slow connection
    this.timeout(8000)

    it('handles invalid email login', async () => {
      try {
        await login(dispatch, firebase, fakeLogin)
      } catch (err) {
        expect(err.code).to.equal('auth/user-not-found')
      }
    })

    it('handles invalid token login', async () => {
      try {
        await login(dispatch, firebase, { token: 'test@tst.com' })
      } catch (err) {
        expect(err.code).to.equal('auth/invalid-custom-token')
      }
    })

    it('handles token login', async () => {
      try {
        await login(
          dispatch,
          firebase,
          { token: 'asdfasdf' },
          { uid: 'asdfasdf' }
        )
      } catch (err) {
        expect(err.message)
          // message indicates firebase's internal auth method called
          // invalid key is intentionally provided
          .to.equal(
            'Invalid assertion format. 3 dot separated segments required.'
          )
      }
    })
  })

  describe('logout', () => {
    it('calls firebase.auth().signOut()', async () => {
      await logout(dispatch, firebaseStub)
      expect(firebaseStub.auth().signOut).to.have.been.calledOnce
    })

    it('sets authUid to null', async () => {
      firebaseStub._.authUid = 'asdfasdf'
      await logout(dispatch, firebaseStub)
      expect(firebaseStub._.authUid).to.be.null
    })

    it('calls dispatch', async () => {
      await logout(dispatch, firebaseStub)
      expect(dispatch).to.have.been.calledWith({
        type: actionTypes.LOGOUT
      })
    })

    it('calls dispatch with preserve setting if provided', async () => {
      const preserveSetting = ['some']
      await logout(
        dispatch,
        createFirebaseStub({ preserveOnLogout: preserveSetting })
      )
      expect(dispatch).to.have.been.calledWith({
        type: actionTypes.LOGOUT,
        preserve: preserveSetting
      })
    })
  })

  describe('createUser', () => {
    it('creates user', async () => {
      res = await createUser(dispatch, fakeFirebase, fakeLogin, fakeLogin)
      expect(res).to.be.an.object
    })

    it('creates user without profile', async () => {
      res = await createUser(dispatch, fakeFirebase, fakeLogin)
      expect(res).to.be.an.object
    })

    it('handles no email', async () => {
      try {
        await createUser(dispatch, fakeFirebase, {
          password: fakeLogin.password
        })
      } catch (err) {
        expect(err).to.be.an.object
      }
    })

    it('handles no password', async () => {
      try {
        await createUser(dispatch, fakeFirebase, { email: fakeLogin.email })
      } catch (err) {
        expect(err).to.be.an.object
      }
    })

    it('handles error with createUserWithEmailAndPassword', async () => {
      try {
        await createUser(dispatch, fakeFirebase, {
          email: 'error',
          password: 'error'
        })
      } catch (err) {
        expect(err).to.be.an.object
      }
    })

    it('handles error with login', async () => {
      try {
        await createUser(dispatch, fakeFirebase, {
          email: 'error2',
          password: 'error2'
        })
      } catch (err) {
        expect(err).to.be.an.object
      }
    })

    it('handles user-not-found error', async () => {
      try {
        res = await createUser(dispatch, fakeFirebase, {
          email: 'error3',
          password: 'error2'
        })
      } catch (err) {
        expect(err.message).to.equal('auth/user-not-found')
      }
    })
  })

  describe('resetPassword', () => {
    it('resets password for real user', async () => {
      try {
        res = await resetPassword(dispatch, fakeFirebase, 'test@test.com')
      } catch (err) {
        expect(err.code).to.equal('auth/user-not-found')
      }
    })

    it('dispatches error for invalid user', async () => {
      try {
        res = await resetPassword(dispatch, fakeFirebase, 'error')
      } catch (err) {
        expect(err.code).to.equal('auth/user-not-found')
      }
    })

    it('dispatches for all other errors', async () => {
      try {
        res = await resetPassword(dispatch, fakeFirebase, 'error2')
      } catch (err) {
        expect(err.code).to.be.a.string
      }
    })
  })

  describe('confirmPasswordReset', () => {
    it('resets password for real user', () => {
      return confirmPasswordReset(dispatch, fakeFirebase, 'test', 'test').then(
        err => {
          expect(err).to.be.undefined
        }
      )
    })

    describe('handles error code: ', () => {
      it('auth/expired-action-code', async () => {
        try {
          res = await confirmPasswordReset(
            dispatch,
            fakeFirebase,
            'auth/expired-action-code',
            'error'
          )
        } catch (err) {
          expect(err.code).to.be.a.string
        }
      })

      it('auth/invalid-action-code', async () => {
        try {
          res = await confirmPasswordReset(
            dispatch,
            fakeFirebase,
            'auth/invalid-action-code',
            'error'
          )
        } catch (err) {
          expect(err.code).to.be.a.string
        }
      })

      it('auth/user-disabled', async () => {
        try {
          res = await confirmPasswordReset(
            dispatch,
            fakeFirebase,
            'auth/user-disabled',
            'error'
          )
        } catch (err) {
          expect(err.code).to.be.a.string
        }
      })

      it('auth/user-not-found', async () => {
        try {
          res = await confirmPasswordReset(
            dispatch,
            fakeFirebase,
            'auth/user-not-found',
            'error'
          )
        } catch (err) {
          expect(err.code).to.be.a.string
        }
      })

      it('auth/weak-password', async () => {
        try {
          res = await confirmPasswordReset(
            dispatch,
            fakeFirebase,
            'auth/weak-password',
            'error'
          )
        } catch (err) {
          expect(err.code).to.be.a.string
        }
      })

      it('other', async () => {
        try {
          res = await confirmPasswordReset(
            dispatch,
            fakeFirebase,
            'asdfasdf',
            'error'
          )
        } catch (err) {
          expect(err.code).to.be.a.string
        }
      })
    })
  })

  describe('verifyPasswordResetCode', () => {
    it('resolves for valid code', async () => {
      res = await verifyPasswordResetCode(dispatch, fakeFirebase, 'test')
      // "success" indicates successful pas through of stub function
      expect(res).to.equal('success')
    })

    it('throws for invalid reset code', async () => {
      try {
        res = await verifyPasswordResetCode(dispatch, fakeFirebase, 'error')
      } catch (err) {
        expect(err.code).to.be.a.string
      }
    })
  })

  describe('updateProfile', () => {
    it('dispatches PROFILE_UPDATE_START with profile', async () => {
      const payload = null
      await updateProfile(dispatch, firebaseStub, payload)
      expect(dispatch).to.have.been.calledWith({
        type: actionTypes.PROFILE_UPDATE_START,
        payload
      })
    })

    it('dispatches PROFILE_UPDATE_SUCCESS with profile if successful', async () => {
      const profileUpdate = { some: 'value' }
      await updateProfile(dispatch, firebaseStub, profileUpdate)
      expect(dispatch).to.have.been.calledWith({
        type: actionTypes.PROFILE_UPDATE_SUCCESS,
        payload: { ...profileUpdate, ...existingProfile }
      })
    })

    it('returns the user profile snap on success when using RTDB', async () => {
      const profileUpdate = { some: 'value' }
      const res = await updateProfile(dispatch, firebaseStub, profileUpdate)
      expect(res).to.have.property('val')
      expect(res.val).to.be.a.function
      expect(res.val()).to.have.property('some', profileUpdate.some)
      expect(res.val()).to.have.property('existing', existingProfile.existing)
    })

    it('returns the user profile snap on success when using Firestore', async () => {
      const profileUpdate = { some: 'value' }
      const newStubbed = firebaseStub
      newStubbed._ = {
        ...newStubbed._,
        config: { userProfile: 'users', useFirestoreForProfile: true }
      }
      res = await updateProfile(dispatch, newStubbed, profileUpdate)
      expect(dispatch).to.have.been.calledWith({
        type: actionTypes.PROFILE_UPDATE_START,
        payload: profileUpdate
      })
      expect(dispatch).to.have.been.calledWith({
        type: actionTypes.PROFILE_UPDATE_SUCCESS,
        payload: { ...profileUpdate, ...existingProfile }
      })
      expect(res).to.have.property('data')
      expect(res.data).to.be.a.function
      expect(res.data()).to.have.property('some', profileUpdate.some)
      expect(res.data()).to.have.property('existing', existingProfile.existing)
    })

    it('updates profile when using RTDB', async () => {
      const profileUpdate = { some: 'value' }
      await updateProfile(dispatch, firebaseStub, profileUpdate)
      expect(firebaseStub.database().ref().update).to.have.been.calledWith(
        profileUpdate
      )
    })

    it('updates profile when using Firestore', async () => {
      const profileUpdate = { some: 'value' }
      const newStubbed = firebaseStub
      newStubbed._ = {
        ...newStubbed._,
        config: { userProfile: 'users', useFirestoreForProfile: true }
      }
      res = await updateProfile(dispatch, newStubbed, profileUpdate)
      expect(firebaseStub.firestore().doc().set).to.have.been.calledWith(
        profileUpdate,
        { merge: true }
      )
    })

    it('rejects if profile update fails', async () => {
      try {
        res = await updateProfile(dispatch, firebaseStub, 'fail')
      } catch (err) {
        expect(err).to.have.property('message', 'test')
      }
    })

    it('rejects with internal firebase error if profile is not an object', async () => {
      try {
        res = await updateProfile(dispatch, firebaseStub, 'asdf')
      } catch (err) {
        expect(err).to.have.property(
          'message',
          'Reference.update failed: First argument  must be an object containing the children to replace.'
        )
      }
    })
  })

  describe('updateAuth', () => {
    it('returns a promise', () => {
      expect(updateAuth(dispatch, fakeFirebase, 'test')).to.respondTo('then')
    })

    it('rejects if user is not logged in', async () => {
      try {
        res = await updateAuth(dispatch, fakeFirebase, 'test')
      } catch (err) {
        expect(err).to.have.property(
          'message',
          'User must be logged in to update auth.'
        )
      }
    })

    it('calls firebase updateProfile method', async () => {
      const updateAuthSpy = createSuccessStub()
      const newFakeFirebase = addSpyToCurrentUser(
        'updateProfile',
        updateAuthSpy
      )
      await updateAuth(dispatch, newFakeFirebase, 'test')
      expect(updateAuthSpy).to.have.been.calledOnce
    })

    it('calls update profile if updateInProfile is true', async () => {
      const updateAuthSpy = createSuccessStub()
      const newFakeFirebase = addSpyToCurrentUser(
        'updateProfile',
        updateAuthSpy
      )
      try {
        await updateAuth(dispatch, newFakeFirebase, 'test', true)
      } catch (err) {
        // internal updateAuth function is called
        expect(updateAuthSpy).to.have.been.calledOnce
        // all dispatch calls (one for start, one for error)
        expect(dispatch).to.have.been.called.exactly(4)
        // stubbed updateProfile function was called
        expect(err.message).to.contain('.update is not a function')
      }
    })

    it('rejects and dispatches on failure', async () => {
      const updateAuthSpy = createFailureStub()
      const newFakeFirebase = addSpyToCurrentUser(
        'updateProfile',
        updateAuthSpy
      )
      try {
        await updateAuth(dispatch, newFakeFirebase, 'test')
      } catch (err) {
        // both dispatch calls (one for start, one for error)
        expect(dispatch).to.have.been.calledTwice
        expect(updateAuthSpy).to.have.been.calledOnce
        expect(err.message).to.equal('test')
      }
    })
  })

  describe('updateEmail', () => {
    it('returns a promise', () => {
      expect(updateEmail(dispatch, fakeFirebase, 'test')).to.respondTo('then')
    })

    it('rejects if user is not logged in', async () => {
      try {
        res = await updateEmail(dispatch, fakeFirebase, 'test')
      } catch (err) {
        expect(err).to.have.property(
          'message',
          'User must be logged in to update email.'
        )
      }
    })

    it('calls firebase updateEmail method', async () => {
      const updateEmailSpy = createSuccessStub()
      const newFakeFirebase = addSpyToCurrentUser('updateEmail', updateEmailSpy)
      await updateEmail(dispatch, newFakeFirebase, 'test')
      expect(updateEmailSpy).to.have.been.calledOnce
    })

    it('rejects and dispatches on failure', async () => {
      const updateEmailSpy = createFailureStub()
      const newFakeFirebase = addSpyToCurrentUser('updateEmail', updateEmailSpy)
      try {
        await updateEmail(dispatch, newFakeFirebase, 'test')
      } catch (err) {
        // both dispatch calls (one for start, one for error)
        expect(dispatch).to.have.been.calledTwice
        expect(updateEmailSpy).to.have.been.calledOnce
        expect(err.message).to.equal('test')
      }
    })

    it('calls update profile if updateInProfile is true', async () => {
      const updateEmailSpy = createSuccessStub()
      const newFakeFirebase = addSpyToCurrentUser('updateEmail', updateEmailSpy)
      try {
        await updateEmail(dispatch, newFakeFirebase, 'test', true)
      } catch (err) {
        // all dispatch calls (one for start, one for error)
        expect(dispatch).to.have.been.called.exactly(4)
        // internal updateEmail function is called
        expect(updateEmailSpy).to.have.been.calledOnce
        // stubbed updateProfile function was called
        expect(err.message).to.contain('.update is not a function')
      }
    })
  })

  describe('reloadAuth', () => {
    it('rejects if not logged in', async () => {
      try {
        res = await reloadAuth(dispatch, firebase)
      } catch (err) {
        expect(err).to.have.property(
          'message',
          'User must be logged in to reload auth.'
        )
      }
    })

    it('calls firebase reloadAuth method', async () => {
      const reloadAuthSpy = createSuccessStub()
      const newFakeFirebase = addSpyToCurrentUser('reload', reloadAuthSpy)
      await reloadAuth(dispatch, newFakeFirebase)
      expect(reloadAuthSpy).to.have.been.calledOnce
    })

    it('rejects and dispatches on failure', async () => {
      const reloadAuthSpy = createFailureStub()
      const newFakeFirebase = addSpyToCurrentUser('reload', reloadAuthSpy)
      try {
        await reloadAuth(dispatch, newFakeFirebase)
      } catch (err) {
        // both dispatch calls (one for start, one for error)
        expect(dispatch).to.have.been.calledTwice
        expect(reloadAuthSpy).to.have.been.calledOnce
        expect(err.message).to.equal('test')
      }
    })
  })

  describe('linkWithCredential', () => {
    it('rejects if not logged in', async () => {
      try {
        res = await linkWithCredential(dispatch, firebase, '1234567891', {})
      } catch (err) {
        expect(err).to.have.property(
          'message',
          'User must be logged in to link with credential.'
        )
      }
    })

    it('calls firebase linkWithCredential method', async () => {
      const linkWithCredentialSpy = createSuccessStub(() => Promise.resolve())
      const newFakeFirebase = addSpyToCurrentUser(
        'linkWithCredential',
        linkWithCredentialSpy
      )
      await linkWithCredential(dispatch, newFakeFirebase, '1234567891', {})
      expect(linkWithCredentialSpy).to.have.been.calledOnce
    })

    it('attaches confirm method on successful resolve', async () => {
      const linkWithCredentialSpy = createSuccessStub({
        confirm: () => Promise.resolve({})
      })
      const newFakeFirebase = addSpyToCurrentUser(
        'linkWithCredential',
        linkWithCredentialSpy
      )
      const res = await linkWithCredential(
        dispatch,
        newFakeFirebase,
        '1234567891',
        {}
      )
      expect(linkWithCredentialSpy).to.have.been.calledOnce
      expect(res).to.respondTo('confirm')
      res.confirm()
    })

    it('rejects and dispatches on failure', async () => {
      const linkWithCredentialSpy = createFailureStub()
      const newFakeFirebase = addSpyToCurrentUser(
        'linkWithCredential',
        linkWithCredentialSpy
      )
      try {
        await linkWithCredential(dispatch, newFakeFirebase, '1234567891', {})
      } catch (err) {
        // both dispatch calls (one for start, one for error)
        expect(dispatch).to.have.been.calledTwice
        expect(linkWithCredentialSpy).to.have.been.calledOnce
        expect(err.message).to.equal('test')
      }
    })
  })

  describe('linkWithPopup', () => {
    it.skip('rejects if not logged in', async () => {
      try {
        res = await linkWithPopup(dispatch, firebase, '1234567891', {})
      } catch (err) {
        expect(err).to.have.property(
          'message',
          'User must be logged in to link with credential.'
        )
      }
    })

    it('calls firebase linkWithPopup method', async () => {
      const linkWithPopupSpy = createSuccessStub(() => Promise.resolve())
      const newFakeFirebase = addSpyToCurrentUser(
        'linkWithPopup',
        linkWithPopupSpy
      )
      await linkWithPopup(dispatch, newFakeFirebase, '1234567891', {})
      expect(linkWithPopupSpy).to.have.been.calledOnce
    })

    it('attaches confirm method on successful resolve', async () => {
      const linkWithPopupSpy = createSuccessStub({
        confirm: () => Promise.resolve({})
      })
      const newFakeFirebase = addSpyToCurrentUser(
        'linkWithPopup',
        linkWithPopupSpy
      )
      const res = await linkWithPopup(
        dispatch,
        newFakeFirebase,
        '1234567891',
        {}
      )
      expect(linkWithPopupSpy).to.have.been.calledOnce
      expect(res).to.respondTo('confirm')
      res.confirm()
    })

    it('rejects and dispatches on failure', async () => {
      const linkWithPopupSpy = createFailureStub()
      const newFakeFirebase = addSpyToCurrentUser(
        'linkWithPopup',
        linkWithPopupSpy
      )
      try {
        await linkWithPopup(dispatch, newFakeFirebase, '1234567891', {})
      } catch (err) {
        // both dispatch calls (one for start, one for error)
        expect(dispatch).to.have.been.calledTwice
        expect(linkWithPopupSpy).to.have.been.calledOnce
        expect(err.message).to.equal('test')
      }
    })
  })

  describe('linkAndRetrieveDataWithCredential', () => {
    it.skip('rejects if not logged in', async () => {
      try {
        res = await linkAndRetrieveDataWithCredential(
          dispatch,
          firebase,
          '1234567891',
          {}
        )
      } catch (err) {
        expect(err).to.have.property(
          'message',
          'User must be logged in to link with credential.'
        )
      }
    })

    it('calls firebase linkAndRetrieveDataWithCredential method', async () => {
      const linkAndRetrieveDataWithCredentialSpy = createSuccessStub(() =>
        Promise.resolve()
      )
      const newFakeFirebase = addSpyToCurrentUser(
        'linkAndRetrieveDataWithCredential',
        linkAndRetrieveDataWithCredentialSpy
      )
      await linkAndRetrieveDataWithCredential(
        dispatch,
        newFakeFirebase,
        '1234567891',
        {}
      )
      expect(linkAndRetrieveDataWithCredentialSpy).to.have.been.calledOnce
    })

    it('attaches confirm method on successful resolve', async () => {
      const linkAndRetrieveDataWithCredentialSpy = createSuccessStub({
        confirm: () => Promise.resolve({})
      })
      const newFakeFirebase = addSpyToCurrentUser(
        'linkAndRetrieveDataWithCredential',
        linkAndRetrieveDataWithCredentialSpy
      )
      const res = await linkAndRetrieveDataWithCredential(
        dispatch,
        newFakeFirebase,
        '1234567891',
        {}
      )
      expect(linkAndRetrieveDataWithCredentialSpy).to.have.been.calledOnce
      expect(res).to.respondTo('confirm')
      res.confirm()
    })

    it('rejects and dispatches on failure', async () => {
      const linkAndRetrieveDataWithCredentialSpy = createFailureStub()
      const newFakeFirebase = addSpyToCurrentUser(
        'linkAndRetrieveDataWithCredential',
        linkAndRetrieveDataWithCredentialSpy
      )
      try {
        await linkAndRetrieveDataWithCredential(
          dispatch,
          newFakeFirebase,
          '1234567891',
          {}
        )
      } catch (err) {
        // both dispatch calls (one for start, one for error)
        expect(dispatch).to.have.been.calledTwice
        expect(linkAndRetrieveDataWithCredentialSpy).to.have.been.calledOnce
        expect(err.message).to.equal('test')
      }
    })
  })

  describe('linkWithRedirect', () => {
    it.skip('rejects if not logged in', async () => {
      try {
        res = await linkWithRedirect(dispatch, firebase, '1234567891', {})
      } catch (err) {
        expect(err).to.have.property(
          'message',
          'User must be logged in to link with credential.'
        )
      }
    })

    it('calls firebase linkWithRedirect method', async () => {
      const linkWithRedirectSpy = createSuccessStub(() => Promise.resolve())
      const newFakeFirebase = addSpyToCurrentUser(
        'linkWithRedirect',
        linkWithRedirectSpy
      )
      await linkWithRedirect(dispatch, newFakeFirebase, '1234567891', {})
      expect(linkWithRedirectSpy).to.have.been.calledOnce
    })

    it('attaches confirm method on successful resolve', async () => {
      const linkWithRedirectSpy = createSuccessStub({
        confirm: () => Promise.resolve({})
      })
      const newFakeFirebase = addSpyToCurrentUser(
        'linkWithRedirect',
        linkWithRedirectSpy
      )
      const res = await linkWithRedirect(
        dispatch,
        newFakeFirebase,
        '1234567891',
        {}
      )
      expect(linkWithRedirectSpy).to.have.been.calledOnce
      expect(res).to.respondTo('confirm')
      res.confirm()
    })

    it('rejects and dispatches on failure', async () => {
      const linkWithRedirectSpy = createFailureStub()
      const newFakeFirebase = addSpyToCurrentUser(
        'linkWithRedirect',
        linkWithRedirectSpy
      )
      try {
        await linkWithRedirect(dispatch, newFakeFirebase, '1234567891', {})
      } catch (err) {
        // both dispatch calls (one for start, one for error)
        expect(dispatch).to.have.been.calledTwice
        expect(linkWithRedirectSpy).to.have.been.calledOnce
        expect(err.message).to.equal('test')
      }
    })
  })

  describe('signInWithPhoneNumber', () => {
    it('throws if second argument is not an applicationVerifier', async () => {
      try {
        res = await signInWithPhoneNumber(firebase, dispatch, '1234567891', {})
      } catch (err) {
        expect(err).to.have.property(
          'message',
          'signInWithPhoneNumber failed: Second argument "applicationVerifier" must be an implementation of firebase.auth.ApplicationVerifier.'
        )
      }
    })

    it('calls firebase signInWithPhoneNumber method', async () => {
      const signInWithPhoneNumberSpy = createSuccessStub(() =>
        Promise.resolve()
      )
      const newFakeFirebase = addSpyWithArgsToAuthMethod(
        'signInWithPhoneNumber',
        signInWithPhoneNumberSpy,
        ['1234567891', {}]
      )
      await signInWithPhoneNumber(newFakeFirebase, dispatch, '1234567891', {})
      expect(signInWithPhoneNumberSpy).to.have.been.calledOnce
    })

    it('attaches confirm method on successful resolve', async () => {
      const signInWithPhoneNumberSpy = createSuccessStub({
        confirm: () => Promise.resolve({})
      })
      const newFakeFirebase = addSpyWithArgsToAuthMethod(
        'signInWithPhoneNumber',
        signInWithPhoneNumberSpy,
        ['1234567891', {}]
      )
      const res = await signInWithPhoneNumber(
        newFakeFirebase,
        dispatch,
        '1234567891',
        {}
      )
      expect(signInWithPhoneNumberSpy).to.have.been.calledOnce
      expect(res).to.respondTo('confirm')
      res.confirm()
    })

    it('rejects and dispatches on failure', async () => {
      const signInWithPhoneNumberSpy = createFailureStub()
      const newFakeFirebase = addSpyWithArgsToAuthMethod(
        'signInWithPhoneNumber',
        signInWithPhoneNumberSpy,
        ['1234567891', {}]
      )
      try {
        await signInWithPhoneNumber(newFakeFirebase, dispatch, '1234567891', {})
      } catch (err) {
        // both dispatch calls (one for start, one for error)
        expect(dispatch).to.have.been.calledOnce
        expect(signInWithPhoneNumberSpy).to.have.been.calledOnce
        expect(err.message).to.equal('test')
      }
    })
  })
})
