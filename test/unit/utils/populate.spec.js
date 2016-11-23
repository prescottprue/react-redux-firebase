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
      expect(getPopulateChild(Firebase, {child: 'uid', root: 'users'}, '123123')).to.be.fulfilled
    })
  })
  describe('promisesForPopulate', () => {
    it('none existant child', () => {
      expect(promisesForPopulate(Firebase, {uid: '123123'}, [{child: 'random', root: 'users'}]))
    })
    it('string populate', () => {
      expect(promisesForPopulate(Firebase, { 1: { uid: '123123' } }, [{child: 'uid', root: 'users'}]))
    })
    it('array populate', () => {
      expect(promisesForPopulate(Firebase, { 1: { collaborators: ['123123', '123'] } }, [{child: 'collaborators', root: 'users'}]))
    })
  })
})
