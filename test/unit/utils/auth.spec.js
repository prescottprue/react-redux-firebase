/* global describe expect it beforeEach */
import {
  createAuthProvider,
  getLoginMethodAndParams,
} from '../../../src/utils/auth'

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
    GoogleAuthProvider: () => ({
      addScope: () => {
        console.log('scope added')
      }
    }),

  })
}

describe('Utils: Auth', () => {
  describe('getLoginMethodAndParams', () => {
    it.skip('handles google provider', () => {
      expect(getLoginMethodAndParams(firebase, { provider: 'google' })).to.include.keys('method')
    })
  })
  describe('createAuthProvider', () => {
    // Skipped due to capatalize and auth provider function
    it.skip('creates valid profile', () => {
      expect(createAuthProvider(firebase, 'google', ['email']))
    })
  })
})
