/* global firebase describe expect it */
import {
  wrapInDispatch
} from '../../../src/utils/actions'
const method = () => Promise.resolve()
const failMethod = () => Promise.reject()
const dispatch = () => {
  // console.log('dispatch called')
}
describe('Utils: Auth', () => {
  describe('wrapInDispatch', () => {
    // Skipped due to capatalize and auth provider function
    it('creates valid Auth Provider', () => {
      // TODO: Check that dispatch is called with actions
      expect(wrapInDispatch(dispatch, { method, args: [ 'arg1' ], types: [ 'ACTION' ] }))
        .to.be.fulfilled
    })
    it('handles string list of scopes', () => {
      expect(wrapInDispatch(dispatch, { method: failMethod, args: [ 'arg1' ], types: [ 'ACTION' ] }))
        .to.be.rejectedWith('Failed')
    })
  })

})
