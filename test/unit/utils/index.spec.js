import { createCallable } from 'utils'

describe('Utils: Index', () => {
  describe('createCallable', () => {
    it.skip('calls a passed function', () => {
      const spy = sinon.spy()
      createCallable(spy)
      expect(spy).to.have.been.called.once
    })
  })
})
