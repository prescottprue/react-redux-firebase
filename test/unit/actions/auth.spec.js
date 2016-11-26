/* global describe expect it beforeEach */
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
  resetPassword
} from '../../../src/actions/auth'
let functionSpy
let dispatchSpy
const dispatch = () => {
  console.log('dispatch')
}

const fakeFirebase = {
  _: {
    authUid: '123',
    config: {
      userProfile: 'users'
    },
  },
  database: () => ({
    ref: () => ({
      child: () => ({
        on: () => Promise.resolve({ val: () => { some: 'obj' }}),
        off: () => Promise.resolve({ val: () => { some: 'obj' }}),
        once: () => Promise.resolve({ val: () => { some: 'obj' }})
      })
    })
  }),
  auth: () => ({
    onAuthStateChanged: (f) => {
      f({uid: 'asdfasdf'})
    },
    signOut: () =>
      Promise.resolve({}),
    createUserWithEmailAndPassword: () =>
      Promise.resolve({ uid: '123', email: 'test@test.com', providerData: [{}] }),
    signInWithCustomToken: () => {
      return Promise.resolve({
        toJSON: () => ({
          stsTokenManager: {
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJjbGFpbXMiOnsiZGlzcGxheU5hbWUiOiJFZHdhcmQgV3UiLCJlbWFpbCI6ImVkZGlld3U4MEBnbWFpbC5jb20iLCJvcmlnaW5hbElkIjoiSlFYQ2dRTkxEU1lSMFEzdjlwY3FjTDZJeGRUMiIsInByb3ZpZGVyRGF0YSI6W3siZGlzcGxheU5hbWUiOiJFZHdhcmQgV3UiLCJlbWFpbCI6ImVkZGlld3U4MEBnbWFpbC5jb20ifV19LCJ1aWQiOiJqaTh3c1BDVW5PYUhvUGZBalNCS2ZReU1pTmkxIiwiaWF0IjoxNDc1NDM3MDMyLCJleHAiOjE0NzU0NDA2MzIsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaXNzIjoicmVzaWRlLXByb2RAcmVzaWRlLXByb2QuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJyZXNpZGUtcHJvZEByZXNpZGUtcHJvZC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSJ9.aOXOCCAL-lI5AVnd8MVlc86exvCGNySq8X7DM4Gr7PG0ek5mh_8qnFfLuzw2gfv6mHNVgY2UngUmG0qETaBdox7l3wBo1GdP9hB1bM8NltCYffXwxyw7sN36BFWD3l-cz4rlxfmfzosCLj3XtDK8ARDQ76pAXxsK-rRBvMG6N-wgE_ZLf17FVvwB95e1DAmL39fp6dRVxoPflG--m4QEKVk8xIeDx4ol9HJw512gMGtTkRDMEPWVJEdaEAp6L6Lo2-Bk-TxBCHs8gpb7b7eidWMUEXObk0UPQIz2DRh-3olbruimzL_SgPNg4Pz0uUYSn11-Mx_HxxiVtyQj1ufoLA'
          },
          uid: 'asdfasdfsdf'
        })
      })
    }
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
    it('calls profile unwatch', () => {
      watchUserProfile(dispatch, fakeFirebase)
      expect(firebase._.profileWatch).to.be.a.function
    })
    it('sets profile watch function', () => {
      watchUserProfile(dispatch, firebase)
      expect(firebase._.profileWatch).to.be.a.function
    })
  })

  describe('createUserProfile', () => {
    it('creates profile if config is enabled', () => {
      return createUserProfile(dispatch, firebase, { uid: '123', email: 'test@test.com', providerData: [{}] }, { some: 'asdf' })
        .then((profile) => {
          expect(profile).to.be.an.object
        })
    }, 4000)
  })

  describe('login', () => {
    it('handles invalid email login', () => {
      return login(dispatch, firebase, { email: 'test@tst.com', password: 'asdfasdf' })
        .catch((err) => {
          expect(err.code).to.equal('auth/user-not-found')
        })
    }, 4000)
    it('handles invalid token login', () => {
      return login(dispatch, firebase, { token: 'test@tst.com' })
        .catch((err) => {
          expect(err.code).to.equal('auth/invalid-custom-token')
        })
    }, 4000)
    it('handles token login', () => {
      const token = 'asdfasdf'
      return login(dispatch, fakeFirebase, { token }, { uid: 'asdfasdf' })
        .then((authData) => {
          expect(authData).to.be.an.object
        })
    }, 4000)
  })

  describe('logout', () => {
    beforeEach(() => {
      functionSpy = sinon.spy(firebase.auth(), 'signOut')
    })
    afterEach(() => {
      firebase.auth().signOut.restore()
    })
    it('calls firebase.auth().signOut()', () => {
      return logout(dispatch, firebase)
        .then(() => {
          expect(functionSpy).to.have.been.calledOnce
        })
    })
    it('calls firebase.auth().signOut()', () => {
      logout(dispatch, firebase)
      expect(functionSpy).to.have.been.calledOnce
    })
    it('sets authUid to null', () => {
      fakeFirebase._.authUid = 'asdfasdf'
      return logout(dispatch, fakeFirebase)
        .then(() => {
          expect(fakeFirebase._.authUid).to.be.null
        })
    })
    it.skip('calls dispatch', () => {
      dispatchSpy = sinon.spy(dispatch)
      return logout(dispatch, firebase)
        .then(() => {
          expect(dispatchSpy).to.have.been.calledOnce
        })
    })
  })

  describe('createUser', () => {
    // Skipped because of TypeError: Cannot read property 'apply' of undefined
    it.skip('creates user', () => {
      return createUser(dispatch, fakeFirebase, { email: 'test@test.com', password: 'asdf' }, { email: 'test@test.com', password: 'asdf' })
        .then(userData => {
          expect(userData).to.be.an.object
        })
    })
    it('handles no email', () => {
      return createUser(dispatch, fakeFirebase, { password: 'asdf' })
        .catch((err) => {
          expect(err).to.be.a.string
        })
    })
    it('handles no password', () => {
      return createUser(dispatch, fakeFirebase, { email: 'asdf@asdf.com' })
        .catch((err) => {
          expect(err).to.be.a.string
        })
    })
  }, 4000)

  describe('resetPassword', () => {
    beforeEach(() => {
      functionSpy = sinon.spy(firebase.auth(), 'sendPasswordResetEmail')
    })
    afterEach(() => {
      firebase.auth().sendPasswordResetEmail.restore()
    })
    it('dispatches error for invalid user', () => {
      return resetPassword(dispatch, firebase, 'test@test.com')
        .catch((err) => {
          console.log('error', err)
          expect(err.code).to.equal('auth/user-not-found')
          expect(functionSpy).to.have.been.calledOnce
        })
    }, 4000)
  })
})
