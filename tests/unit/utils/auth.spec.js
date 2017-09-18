import {
  createAuthProvider,
  getLoginMethodAndParams
} from '../../../src/utils/auth'

describe('Utils: Auth', () => {
  describe('createAuthProvider', () => {
    it('creates valid Auth Provider', () => {
      expect(createAuthProvider(firebase, 'google', ['email']))
        .to.be.a.function
    })

    it('handles string list of scopes', () => {
      expect(createAuthProvider(firebase, 'google', 'email'))
        .to.be.a.function
    })

    it('handles customAuthParameters config option', () => {
      firebase._.config.customAuthParameters = { google: [{prompt: 'select_account'}] }
      expect(createAuthProvider(firebase, 'google', 'email'))
        .to.be.a.function
    })

    it('throws for invalid provider', () => {
      const provider = 'asdf'
      expect(() => createAuthProvider(firebase, provider, ['email']))
        .to.Throw(Error, `${provider} is not a valid Auth Provider`)
    })
  })

  describe('getLoginMethodAndParams', () => {
    it('google provider', () => {
      expect(getLoginMethodAndParams(firebase, { provider: 'google' }))
        .to.include.keys('method')
    })

    it('twitter provider', () => {
      // TODO: Confirm that addScope
      expect(getLoginMethodAndParams(firebase, { provider: 'twitter' }))
        .to.include.keys('method')
    })

    it('token', () => {
      expect(getLoginMethodAndParams(firebase, { token: 'asdf' }))
        .to.include.keys('method')
    })

    it('token with provider', () => {
      expect(getLoginMethodAndParams(firebase, { provider: 'google', token: 'asdf' }))
        .to.include.keys('method')
    })

    it('credential', () => {
      expect(getLoginMethodAndParams(firebase, { provider: 'google', credential: 'asdf' }))
        .to.include.keys('method')
    })

    it('popup', () => {
      expect(getLoginMethodAndParams(firebase, { provider: 'google', type: 'popup' }))
        .to.include.keys('method')
    })
  })
})
