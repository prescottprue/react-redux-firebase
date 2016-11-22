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

const dispatch = () => {
  console.log('dispatch')
}

const firebase = {
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
    onAuthStateChanged: () => {

    },
    signOut: () => Promise.resolve(),
    createUserWithEmailAndPassword: () => Promise.resolve(),
    sendPasswordResetEmail: () => Promise.resolve()
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
    it.skip('calls firebases onAuthStateChanged', () => {
      // TODO: Check that mock onAuthStateChanged function is called using spy
      expect(init(dispatch, firebase))
    })
  })
  describe('unWatchUserProfile', () => {
    it('calls profile unwatch', () => {
      expect(unWatchUserProfile(firebase))
    })
  })
  describe('watchUserProfile', () => {
    it('calls profile unwatch', () => {
      expect(watchUserProfile(dispatch, firebase))
    })
  })
  describe('login', () => {
    // skipped due to TypeError: Cannot read property 'apply' of undefined
    it.skip('logs user into Firebase', () => {
      expect(login(dispatch, firebase, { email: 'test@tst.com', password: 'asdfasdf' }))
    })
  })
  describe('logout', () => {
    it('logs user out of Firebase', () => {
      expect(logout(dispatch, firebase))
    })
  })
  describe('createUser', () => {
    it('creates user', () => {
      expect(createUser(dispatch, firebase, { email: 'test@test.com', password: 'asdf' }))
    })
  })
  describe('resetPassword', () => {
    it('calls to reset user password', () => {
      expect(resetPassword(dispatch, firebase, 'test@test.com'))
    })
  })
})
