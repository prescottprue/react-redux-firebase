/* global describe expect it beforeEach */
import {
  getPopulateObj,
  getPopulates,
  getPopulateChild,
  getPopulateObjs,
  promisesForPopulate
} from '../../../src/utils/populate'

describe('Utils: Populate', () => {
  describe('getPopulateObj', () => {
    it('returns object with child and root', () => {
      expect(getPopulateObj('some:value')).to.have.keys('child', 'root')
    })
    it('returns object if passed', () => {
      const inputObj = { child: 'some', root: 'some' }
      expect(getPopulateObj(inputObj)).to.equal(inputObj)
    })
  })

  describe('getPopulateObj', () => {
    it('returns object with child and root', () => {
      expect(getPopulateObjs(['some:value'])[0]).to.have.keys('child', 'root')
    })
    it('handles basic populates', () => {
      const inputString = 'populate=uid:users'
      expect(getPopulateObjs(inputString)).to.equal(inputString)
    })
  })

  describe('getPopulates', () => {
    it('handles no populates', () => {
      expect(getPopulates(['orderByPriority']))
    })
    it('handles basic populates', () => {
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
    it('handles non-existant single child', () =>
      promisesForPopulate(Firebase, '', { uid: '123123' }, [{child: 'random', root: 'users'}])
        .then((v) => {
          expect(JSON.stringify(v)).to.equal(JSON.stringify({}))
        })
    )

    it('populates single property containing a single item', () =>
      promisesForPopulate(Firebase, '', { uid: '123' }, [{child: 'uid', root: 'users'}])
        .then((v) => {
          expect(v).to.exist
          expect(v).to.have.keys('users')
          expect(v.users['Iq5b0qK2NtgggT6U3bU6iZRGyma2']).to.be.an.object
        })
    )

    it('populates single property containing a list', () =>
      promisesForPopulate(Firebase, '', { collaborators: { 'Iq5b0qK2NtgggT6U3bU6iZRGyma2': true, '123': true } }, [{child: 'collaborators', root: 'users'}])
        .then((v) => {
          expect(v).to.exist
          expect(v).to.have.keys('users')
          expect(v.users['Iq5b0qK2NtgggT6U3bU6iZRGyma2']).to.be.an.object
        })
    )

    it('populates list with single property populate', () =>
      promisesForPopulate(Firebase, '', { 1: { owner: 'Iq5b0qK2NtgggT6U3bU6iZRGyma2' } }, [{child: 'owner', root: 'users'}])
        .then((v) => {
          expect(v).to.have.keys('users')
          expect(v.users['Iq5b0qK2NtgggT6U3bU6iZRGyma2']).to.be.an.object
        })
    )

    it('populates list with property containing array property', () =>
      promisesForPopulate(Firebase, '', { 1: { collaborators: ['Iq5b0qK2NtgggT6U3bU6iZRGyma2', '123'] } }, [{child: 'collaborators', root: 'users'}])
        .then((v) => {
          expect(v).to.exist
          expect(v).to.have.keys('users')
          expect(v.users['Iq5b0qK2NtgggT6U3bU6iZRGyma2']).to.be.an.object
        })
    )

    it('populates list with property containing firebase list', () =>
      promisesForPopulate(Firebase, '', { 1: { collaborators: { 'Iq5b0qK2NtgggT6U3bU6iZRGyma2': true, '123': true } } }, [{child: 'collaborators', root: 'users'}])
        .then((v) => {
          expect(v).to.exist
          expect(v).to.have.keys('users')
          expect(v.users['Iq5b0qK2NtgggT6U3bU6iZRGyma2']).to.be.an.object
        })
    )

    it('populates list with property containing invalid child id', () =>
      promisesForPopulate(Firebase, '', { 1: { collaborators: ['1111', '123'] } }, [{child: 'collaborators', root: 'users'}])
        .then((v) => {
          expect(v).to.exist
          expect(v.users).to.have.keys('123') // sets valid child
          expect(v.users).to.not.have.keys('111') // does not set invalid child
        })
    )
  })
})
