/* global describe expect it beforeEach */
import {
  init,
  unWatchUserProfile,
  getLoginMethodAndParams
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
  auth: () => ({
    onAuthStateChanged: () => {

    },
    GoogleAuthProvider: new Object()
  })
}
describe('Auth Actions', () => {
  beforeEach(() => {

  })
  describe('init', () => {
    it.skip('handles null path array', () => {
      // TODO: Check that mock onAuthStateChanged function is called using spy
      expect(init(dispatch, firebase))
    })
  })
  describe('unWatchUserProfile', () => {
    it('calls profile unwatch', () => {
      expect(unWatchUserProfile(firebase))
    })
  })
  describe('getLoginMethodAndParams', () => {
    // Skipped due to capatalize and auth provider function
    it.skip('handles google provider', () => {
      expect(getLoginMethodAndParams({ provider: 'google' }, firebase)).to.include.keys('method')
    })

  })
})
