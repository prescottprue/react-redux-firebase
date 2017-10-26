import {
  init,
  unWatchUserProfile,
  watchUserProfile,
  createUserProfile,
  handleProfileWatchResponse,
  login,
  logout,
  createUser,
  resetPassword,
  confirmPasswordReset,
  verifyPasswordResetCode
} from '../../../src/actions/auth'
import { actionTypes } from '../../../src/constants'
// import { promisesForPopulate } from '../../../src/utils/populate'

let functionSpy
let dispatchSpy
let res
let profile
let profileSnap
const dispatch = sinon.spy()
const onAuthStateChangedSpy = sinon.spy((f) => {
  f({uid: 'asdfasdf'})
})
const fakeLogin = { email: 'test@tst.com', password: 'asdfasdf', role: 'admin' }
const fakeFirebase = {
  _: {
    authUid: '123',
    config: {
      userProfile: 'users',
      disableRedirectHandling: true
    }
  },
  database: () => ({
    ref: () => ({
      val: () => ({ some: 'obj' }),
      child: () => ({
        on: () => ({ val: () => ({ some: 'obj' }) }),
        off: () => Promise.resolve({ val: () => ({ some: 'obj' }) }),
        once: () => Promise.resolve({ val: () => ({ some: 'obj' }) })
      })
    }),
    update: () => Promise.resolve({
      val: () => ({ some: 'obj' })
    })
  }),
  auth: () => ({
    onAuthStateChanged: onAuthStateChangedSpy,
    getRedirectResult: (f) => {
      return Promise.resolve({uid: 'asdfasdf'})
    },
    signOut: () =>
      Promise.resolve({}),
    createUserWithEmailAndPassword: (email, password) =>
      email.indexOf('error') !== -1
        ? Promise.reject(new Error('auth/user-not-found'))
        : email === 'error'
          ? Promise.reject(new Error('asdfasdf'))
          : Promise.resolve({ uid: '123', email: 'test@test.com', providerData: [{}] }),
    signInWithCustomToken: () => {
      return Promise.resolve({
        toJSON: () => ({
          stsTokenManager: {
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJjbGFpbXMiOnsiZGlzcGxheU5hbWUiOiJFZHdhcmQgV3UiLCJlbWFpbCI6ImVkZGlld3U4MEBnbWFpbC5jb20iLCJvcmlnaW5hbElkIjoiSlFYQ2dRTkxEU1lSMFEzdjlwY3FjTDZJeGRUMiIsInByb3ZpZGVyRGF0YSI6W3siZGlzcGxheU5hbWUiOiJFZHdhcmQgV3UiLCJlbWFpbCI6ImVkZGlld3U4MEBnbWFpbC5jb20ifV19LCJ1aWQiOiJqaTh3c1BDVW5PYUhvUGZBalNCS2ZReU1pTmkxIiwiaWF0IjoxNDc1NDM3MDMyLCJleHAiOjE0NzU0NDA2MzIsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaXNzIjoicmVzaWRlLXByb2RAcmVzaWRlLXByb2QuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJyZXNpZGUtcHJvZEByZXNpZGUtcHJvZC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSJ9.aOXOCCAL-lI5AVnd8MVlc86exvCGNySq8X7DM4Gr7PG0ek5mh_8qnFfLuzw2gfv6mHNVgY2UngUmG0qETaBdox7l3wBo1GdP9hB1bM8NltCYffXwxyw7sN36BFWD3l-cz4rlxfmfzosCLj3XtDK8ARDQ76pAXxsK-rRBvMG6N-wgE_ZLf17FVvwB95e1DAmL39fp6dRVxoPflG--m4QEKVk8xIeDx4ol9HJw512gMGtTkRDMEPWVJEdaEAp6L6Lo2-Bk-TxBCHs8gpb7b7eidWMUEXObk0UPQIz2DRh-3olbruimzL_SgPNg4Pz0uUYSn11-Mx_HxxiVtyQj1ufoLA'
          },
          uid: 'asdfasdfsdf'
        })
      })
    },
    signInWithEmailAndPassword: (email, password) =>
      email.indexOf('error2') !== -1
        ? Promise.reject(new Error('asdfasdf'))
        : email === 'error3'
          ? Promise.reject(new Error('auth/user-not-found'))
          : Promise.resolve({ uid: '123', email: 'test@test.com', providerData: [{}] }),
    sendPasswordResetEmail: (email) =>
      email === 'error'
        ? Promise.reject({ code: 'auth/user-not-found' }) // eslint-disable-line prefer-promise-reject-errors
        : email === 'error2'
          ? Promise.reject(new Error('asdfasdf'))
          : Promise.resolve({ some: 'val' }),
    confirmPasswordReset: (code, password) =>
      password === 'error'
        ? Promise.reject({ code: code }) // eslint-disable-line prefer-promise-reject-errors
        : Promise.resolve(),
    verifyPasswordResetCode: (code) => code === 'error'
      ? Promise.reject(new Error('some'))
        ? Promise.reject({ code: 'asdfasdf' }) // eslint-disable-line prefer-promise-reject-errors
        : Promise.resolve({ uid: '123', email: 'test@test.com', providerData: [{}] })
      : Promise.resolve('success')
  })
}

describe('Actions: Auth -', () => {
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
      expect(fakeFirebase._.profileWatch).to.equal(null)
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
    describe('profileParamsToPopulate setting -', () => {
      it('undefined - dispatches SET_PROFILE with profile', () => {
        firebase._.config.profileParamsToPopulate = undefined
        handleProfileWatchResponse(dispatchSpy, firebase, profileSnap)
        expect(dispatchSpy)
          .to.be.calledWith({
            type: actionTypes.SET_PROFILE,
            profile
          })
      })

      it('{} - dispatches SET_PROFILE with profile (not supported)', () => {
        firebase._.config.profileParamsToPopulate = {}
        handleProfileWatchResponse(dispatchSpy, firebase, profileSnap)
        expect(dispatchSpy)
          .to.be.calledWith({
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
    it('creates profile if config is enabled', () => {
      const auth = { uid: '123', email: 'test@test.com', providerData: [{}] }
      profile = { some: 'asdf' }
      expect(createUserProfile(dispatch, Firebase, auth, profile))
        .to.eventually.be.an.object
    })
  })

  describe('login', () => {
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
        await login(dispatch, firebase, { token: 'asdfasdf' }, { uid: 'asdfasdf' })
      } catch (err) {
        expect(err.message)
          // message indicates firebase's internal auth method called
          // invalid key is intentionally provided
          .to.equal('The custom token format is incorrect. Please check the documentation.')
      }
    })
  })

  describe('logout', () => {
    beforeEach(() => {
      functionSpy = sinon.spy(firebase.auth(), 'signOut')
    })
    afterEach(() => {
      firebase.auth().signOut.restore()
    })

    it('calls firebase.auth().signOut()', async () => {
      await logout(dispatch, firebase)
      expect(functionSpy).to.have.been.calledOnce
    })

    it('sets authUid to null', async () => {
      fakeFirebase._.authUid = 'asdfasdf'
      await logout(dispatch, fakeFirebase)
      expect(fakeFirebase._.authUid).to.be.null
    })
    // TODO: dispatch spy not being called
    it.skip('calls dispatch', async () => {
      dispatchSpy = sinon.spy(dispatch)
      await logout(dispatch, fakeFirebase)
      expect(dispatchSpy).to.have.been.calledOnce
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
        await createUser(dispatch, fakeFirebase, { password: fakeLogin.password })
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
        await createUser(dispatch, fakeFirebase, { email: 'error', password: 'error' })
      } catch (err) {
        expect(err).to.be.an.object
      }
    })

    it('handles error with login', async () => {
      try {
        await createUser(dispatch, fakeFirebase, { email: 'error2', password: 'error2' })
      } catch (err) {
        expect(err).to.be.an.object
      }
    })

    it('handles user-not-found error', async () => {
      try {
        res = await createUser(dispatch, fakeFirebase, { email: 'error3', password: 'error2' })
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
      return confirmPasswordReset(dispatch, fakeFirebase, 'test', 'test')
        .then((err) => {
          expect(err).to.be.undefined
        })
    })

    describe('handles error code: ', () => {
      it('auth/expired-action-code', async () => {
        try {
          res = await confirmPasswordReset(dispatch, fakeFirebase, 'auth/expired-action-code', 'error')
        } catch (err) {
          expect(err.code).to.be.a.string
        }
      })

      it('auth/invalid-action-code', async () => {
        try {
          res = await confirmPasswordReset(dispatch, fakeFirebase, 'auth/invalid-action-code', 'error')
        } catch (err) {
          expect(err.code).to.be.a.string
        }
      })

      it('auth/user-disabled', async () => {
        try {
          res = await confirmPasswordReset(dispatch, fakeFirebase, 'auth/user-disabled', 'error')
        } catch (err) {
          expect(err.code).to.be.a.string
        }
      })

      it('auth/user-not-found', async () => {
        try {
          res = await confirmPasswordReset(dispatch, fakeFirebase, 'auth/user-not-found', 'error')
        } catch (err) {
          expect(err.code).to.be.a.string
        }
      })

      it('auth/weak-password', async () => {
        try {
          res = await confirmPasswordReset(dispatch, fakeFirebase, 'auth/weak-password', 'error')
        } catch (err) {
          expect(err.code).to.be.a.string
        }
      })

      it('other', async () => {
        try {
          res = await confirmPasswordReset(dispatch, fakeFirebase, 'asdfasdf', 'error')
        } catch (err) {
          expect(err.code).to.be.a.string
        }
      })
    })
  })

  describe('verifyPasswordResetCode', () => {
    it('resolves for valid code', async () => {
      res = await verifyPasswordResetCode(dispatch, fakeFirebase, 'test')
      expect(res).to.equal('success')
    })

    describe('handles error code: ', () => {
      it('other', async () => {
        try {
          res = await verifyPasswordResetCode(dispatch, fakeFirebase, 'error')
        } catch (err) {
          expect(err.code).to.be.a.string
        }
      })
    })
  })
})
