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
    it('none existant child', () => {
      return promisesForPopulate(Firebase, {uid: '123123'}, [{child: 'random', root: 'users'}])
        .then((v) => {
          expect(v).to.have.keys('uid')
        })
    })
    it('string populate', () => {
      return promisesForPopulate(Firebase, { 1: { owner: 'Iq5b0qK2NtgggT6U3bU6iZRGyma2' } }, [{child: 'owner', root: 'users'}])
        .then((v) => {
          expect(v['1'].owner).to.have.keys('displayName', 'email', 'providerData')
        })
    })
    it('array populate', () => {
      return promisesForPopulate(Firebase, { 1: { collaborators: ['Iq5b0qK2NtgggT6U3bU6iZRGyma2', '123'] } }, [{child: 'collaborators', root: 'users'}])
        .then((v) => {
          expect(v['1'].collaborators[0]).to.have.keys('displayName', 'email', 'providerData')
        })
    })
  })
})
