import { getLoginMethodAndParams, setupPresence } from 'utils/auth'

describe('Utils: Auth', () => {
  describe('getLoginMethodAndParams', () => {
    it('throws for invalid provider', () => {
      const provider = 'asdf'
      expect(() =>
        getLoginMethodAndParams(firebase, { provider: 'asdf' })
      ).to.Throw(Error, `${provider} is not a valid Auth Provider`)
    })
    it('google provider', () => {
      expect(
        getLoginMethodAndParams(firebase, { provider: 'google' })
      ).to.include.keys('method')
    })

    it('twitter provider', () => {
      // TODO: Confirm that addScope
      expect(
        getLoginMethodAndParams(firebase, { provider: 'twitter' })
      ).to.include.keys('method')
    })

    it('token', () => {
      expect(
        getLoginMethodAndParams(firebase, { token: 'asdf' })
      ).to.include.keys('method')
    })

    it('throws for token with provider: ', () => {
      expect(() =>
        getLoginMethodAndParams(firebase, { provider: 'google', token: 'asdf' })
      ).to.Throw(
        'provider with token no longer supported, use credential parameter instead'
      )
    })

    it('credential', () => {
      expect(
        getLoginMethodAndParams(firebase, {
          provider: 'google',
          credential: 'asdf'
        })
      ).to.include.keys('method')
    })

    it('popup', () => {
      const creds = { provider: 'google', type: 'popup' }
      const { method } = getLoginMethodAndParams(firebase, creds)
      expect(method).to.equal('signInWithPopup')
    })

    it('handles scopes string', () => {
      const creds = { provider: 'google', scopes: 'some' }
      const { method } = getLoginMethodAndParams(firebase, creds)
      expect(method).to.equal('signInWithRedirect')
    })

    it('handles scopes array', () => {
      const creds = { provider: 'google', scopes: ['some'] }
      const { method } = getLoginMethodAndParams(firebase, creds)
      expect(method).to.equal('signInWithRedirect')
    })

    it('handles customAuthParameters config option', () => {
      firebase._.config.customAuthParameters = {
        google: [{ prompt: 'select_account' }]
      }
      // spy = sinon.spy(firebase, 'auth.GoogleAuthProvider')
      const { method } = getLoginMethodAndParams(firebase, {
        provider: 'google',
        scopes: ['some']
      })
      expect(method).to.equal('signInWithRedirect')
    })
  })

  describe('setupPresence', () => {
    it('throws if path is not defined', () => {
      expect(() => setupPresence(() => {}, firebase)).to.Throw(
        Error,
        `Reference.child failed: First argument was an invalid path = "undefined". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`
      )
    })

    it('Valid path works', () => {
      expect(
        setupPresence(() => {}, {
          ...firebase,
          _: { config: { presence: 'online' }, authUid: 'test' }
        })
      ).to.equal(undefined)
    })

    it('exits if database is not defined', () => {
      expect(setupPresence(() => {}, {})).to.equal(undefined)
    })

    it('exits if database.ServerValue', () => {
      expect(setupPresence(() => {}, { database: {} })).to.equal(undefined)
    })
  })
})
