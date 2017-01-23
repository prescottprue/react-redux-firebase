/* global describe expect it beforeEach */
import {
  getPopulateObj,
  getPopulates,
  getPopulateChild,
  promisesForPopulate
} from '../../../src/utils/populate'

describe('Utils: Populate', () => {
  describe('getPopulateObj', () => {
    it('returns object with child and root', () => {
      expect(getPopulateObj('some:value')).to.have.keys('child', 'root')
    })
  })

  describe('getPopulates', () => {
    it('no populates', () => {
      expect(getPopulates(['orderByPriority']))
    })
    it('basic populates', () => {
      expect(getPopulates(['populate=uid:users']))
    })
  })

  describe('getPopulateChild', () => {
    it('gets child', () => {
      expect(getPopulateChild(Firebase, {child: 'uid', root: 'users'}, '123123'))
        .to.be.fulfilled
    })
  })

  describe('promisesForPopulate', () => {
    it('none existant child', () =>
      promisesForPopulate(Firebase, {uid: '123123'}, [{child: 'random', root: 'users'}])
        .then((v) => {
          expect(JSON.stringify(v)).to.equal(JSON.stringify({}))
        })
    )
    it('string populate', () =>
      promisesForPopulate(Firebase, { 1: { owner: 'Iq5b0qK2NtgggT6U3bU6iZRGyma2' } }, [{child: 'owner', root: 'users'}])
        .then((v) => {
          expect(v).to.have.keys('users')
        })
    )
    it('array populate', () =>
      promisesForPopulate(Firebase, { 1: { collaborators: ['Iq5b0qK2NtgggT6U3bU6iZRGyma2', '123'] } }, [{child: 'collaborators', root: 'users'}])
        .then((v) => {
          expect(v).to.exist
        })
    )
  })
})
