import { wrapInDispatch } from 'utils/actions'
const method = () => Promise.resolve()
const failMethod = () => Promise.reject(new Error('Some Error'))
const dispatch = () => {}

describe('Utils: Auth', () => {
  describe('wrapInDispatch', () => {
    // Skipped due to capatalize and auth provider function
    it('creates valid Auth Provider', () => {
      // TODO: Check that dispatch is called with actions
      expect(
        wrapInDispatch(dispatch, { method, args: ['arg1'], types: ['ACTION'] })
      ).to.be.fulfilled
    })
    it('handles string list of scopes', () => {
      expect(
        wrapInDispatch(dispatch, {
          method: failMethod,
          args: ['arg1'],
          types: ['ACTION']
        })
      ).to.be.rejectedWith('Failed')
    })
  })
})
