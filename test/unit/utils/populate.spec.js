/* global describe expect it beforeEach */
import {
  promisesForPopulate
} from '../../../src/utils/populate'

const firebase = {
  database: () => ({
    ref: () => ({
      child: () => ({
        child: () => ({
          once: (type) => Promise.resolve({ val: () => {} })
        })
      })
    })
  })
}
describe('Utils: Populate', () => {
  describe('promisesForPopulate', () => {
    it('handles null path array', () => {
      expect(promisesForPopulate(firebase, {uid: '123123'}, 'uid:users'))
    })
  })
})
