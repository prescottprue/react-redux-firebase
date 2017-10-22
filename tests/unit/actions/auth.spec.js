import {
  dispatchLoginError,
  dispatchUnauthorizedError,
  dispatchLogin,
  init,
  unWatchUserProfile,
  watchUserProfile,
  createUserProfile,
  login,
  logout,
  createUser,
  resetPassword,
  confirmPasswordReset,
  verifyPasswordResetCode
} from '../../../src/actions/auth'
import { promisesForPopulate } from '../../../src/utils/populate'

let functionSpy
let dispatchSpy
let res
const dispatch = sinon.spy()
const fakeLogin = { email: 'test@tst.com', password: 'asdfasdf', role: 'admin' }
const firebaseWithConfig = (config = {}) => ({
  ...Firebase,
  _: {
    ...Firebase._,
    config: { ...Firebase._.config, ...config }
  }
})
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
      child: () => ({
        on: () => ({ val: () => ({ some: 'obj' }) }),
        off: () => Promise.resolve({ val: () => ({ some: 'obj' }) }),
        once: () => Promise.resolve({ val: () => ({ some: 'obj' }) })
      })
    })
  }),
  auth: () => ({
    onAuthStateChanged: (f) => {
      f({uid: 'asdfasdf'})
    },
    getRedirectResult: (f) => {
      return Promise.resolve({uid: 'asdfasdf'})
    },
    signOut: () =>
      Promise.resolve({}),
    createUserWithEmailAndPassword: (email, password) =>
      email === 'error'
        ? Promise.reject({ code: 'asdfasdf' }) // eslint-disable-line prefer-promise-reject-errors
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
        ? Promise.reject({ code: 'asdfasdf' }) // eslint-disable-line prefer-promise-reject-errors
        : email === 'error3'
          ? Promise.reject({ code: 'auth/user-not-found' }) // eslint-disable-line prefer-promise-reject-errors
          : Promise.resolve({ uid: '123', email: 'test@test.com', providerData: [{}] }),
    sendPasswordResetEmail: (email) =>
      email === 'error'
        ? Promise.reject({code: 'auth/user-not-found'}) // eslint-disable-line prefer-promise-reject-errors
        : email === 'error2'
          ? Promise.reject({code: 'asdfasdf'}) // eslint-disable-line prefer-promise-reject-errors
          : Promise.resolve({some: 'val'}),
    confirmPasswordReset: (code, password) =>
      password === 'error'
        ? Promise.reject({code: code}) // eslint-disable-line prefer-promise-reject-errors
        : Promise.resolve(),
    verifyPasswordResetCode: (code) => code === 'error'
      ? Promise.reject({ code: 'some' }) // eslint-disable-line prefer-promise-reject-errors
      : Promise.resolve('success')
  })
}

describe('Actions: Auth', () => {
  describe('dispatchLoginError', () => {
    it('calls dispatch with error', () => {
      expect(dispatchLoginError(dispatch, { some: 'error' }))
    })
  })

  describe('dispatchUnauthorizedError', () => {
    it('calls dispatch with error', () => {
      expect(dispatchUnauthorizedError(dispatch, { some: 'error' }))
    })
  })

  describe('dispatchLogin', () => {
    it('calls dispatch', () => {
      expect(dispatchLogin(dispatch, { some: 'error' }))
    })
  })

  describe('init', () => {
    it('calls firebases onAuthStateChanged', () => {
      init(dispatch, fakeFirebase)
    })
  })

  describe('unWatchUserProfile', () => {
    it('calls profile unwatch', () => {
      expect(unWatchUserProfile(firebase))
    })
  })

  describe('watchUserProfile', () => {
    beforeEach(() => {
      functionSpy = sinon.spy(dispatch)
    })

    afterEach(() => {
      firebase._.config.profileParamsToPopulate = undefined
    })

    it('calls profile unwatch', () => {
      watchUserProfile(dispatch, fakeFirebase)
      expect(firebase._.profileWatch).to.be.a.function
    })

    it('sets profile watch function', () => {
      watchUserProfile(dispatch, firebase)
      expect(firebase._.profileWatch).to.be.a.function
    })

    it('sets populates using array', () => {
      firebase._.config.profileParamsToPopulate = ['asdfasdf']
      watchUserProfile(dispatch, firebase)
      expect(firebase._.profileWatch).to.be.a.function
    })

    it('sets populates using string', () => {
      firebase._.config.profileParamsToPopulate = 'asdfasdf'
      firebase._.config.setProfile = 'asdfasdf'
      watchUserProfile(dispatch, firebase)
      expect(firebase._.profileWatch).to.be.a.function
    })

    it('sets populates to profile by default', () => {
      firebase._.config.profileParamsToPopulate = 'role:roles'
      watchUserProfile(dispatch, firebase)
      expect(firebase._.profileWatch).to.be.a.function
    })

    it('skips populating data into profile if autoPopulateProfile is false', () => {
      firebase._.config.profileParamsToPopulate = 'role:roles'
      firebase._.config.autoPopulateProfile = false
      watchUserProfile(dispatch, firebase)
      expect(firebase._.profileWatch).to.be.a.function
    })

    // TODO: Find a way to test promisesForPopulate within watchUserProfile
    it.skip('calls set actions for populate data if setProfilePopulateResults is true', () => {
      firebase._.config.profileParamsToPopulate = 'role:roles'
      sinon.stub(promisesForPopulate)
      firebase._.config.setProfilePopulateResults = true
      watchUserProfile(dispatch, firebase)
      promisesForPopulate.restore()
      expect(functionSpy).to.be.calledOnce
    })
  })

  describe('createUserProfile', () => {
    it('creates profile if config is enabled', async () => {
      const userData = { uid: '123', email: 'test@test.com', providerData: [{}] }
      const profile = await createUserProfile(dispatch, Firebase, userData, { some: 'asdf' })
      expect(profile).to.be.an.object
    })

    it('resolves with userData if userProfile config option is not enabled', async () => {
      const userData = { uid: '123', email: 'test@test.com', providerData: [{}] }
      const fb = firebaseWithConfig({ userProfile: null })
      const profile = await createUserProfile(dispatch, fb, userData, { some: 'asdf' })
      expect(profile).to.equal(userData)
    })

    it('calls profileFactory if it exists', async () => {
      const userData = { uid: '123', email: 'test@test.com', providerData: [{}] }
      const profileFactory = sinon.spy()
      const profile = await createUserProfile(dispatch, firebaseWithConfig({ profileFactory }), userData, { some: 'asdf' })
      expect(profile).to.be.an.object
      expect(profileFactory).to.have.been.calledOnce
    })

    it('calls profileDecorator if it exists and shows deprecation message', async () => {
      const profileDecorator = sinon.spy(() => ({}))
      const profile = await createUserProfile(dispatch, firebaseWithConfig({ profileDecorator }), {}, {})
      expect(profile).to.be.an.object
      expect(profileDecorator).to.have.been.calledOnce
    })

    it('rejects for error in profileFactory function', async () => {
      const profileFactory = () => { throw new Error('test') }
      try {
        await createUserProfile(dispatch, firebaseWithConfig({ profileFactory }), {}, {})
      } catch (err) {
        expect(err).to.have.property('message', 'test')
      }
    })
  })

  describe('login', () => {
    it('handles invalid email login', async () => {
      try {
        await login(dispatch, fakeFirebase, fakeLogin)
      } catch (err) {
        expect(err.code).to.equal('auth/user-not-found')
      }
    })

    it('handles invalid token login', async () => {
      try {
        await login(dispatch, fakeFirebase, { token: 'test@tst.com' })
      } catch (err) {
        expect(err.code).to.equal('auth/invalid-custom-token')
      }
    })

    it('handles token login', async () => {
      res = await login(dispatch, fakeFirebase, { token: 'asdfasdf' }, { uid: 'asdfasdf' })
      expect(res).to.be.an.object
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
        expect(err.code).to.equal('auth/user-not-found')
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
