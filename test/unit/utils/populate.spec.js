import {
  getPopulateObj,
  getPopulates,
  getPopulateChild,
  getPopulateObjs,
  getChildType,
  promisesForPopulate
} from 'utils/populate'
let res
let populates

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

  describe('getChildType', () => {
    it('returns "string" for strings', () => {
      expect(getChildType('some:value')).to.equal('string')
    })
    it('returns "object" for objects', () => {
      expect(getChildType({ some: 'val' })).to.equal('object')
    })
    it('returns "array" for arrays', () => {
      expect(getChildType([])).to.equal('array')
    })
    it('returns "other" for other types', () => {
      expect(getChildType(1)).to.equal('other')
    })
  })

  describe('getPopulateObjs', () => {
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
      expect(
        getPopulateChild(Firebase, { child: 'uid', root: 'users' }, '123123')
      ).to.be.fulfilled
    })
  })

  describe('promisesForPopulate', () => {
    it('handles non-existant single child', async () => {
      populates = [{ child: 'random', root: 'users' }]
      res = await promisesForPopulate(
        Firebase,
        '',
        { uid: '123123' },
        populates
      )
      expect(Object.keys(res)).to.have.length(0)
    })

    it('populates single property containing a single item', async () => {
      populates = [{ child: 'uid', root: 'users' }]
      res = await promisesForPopulate(Firebase, '', { uid }, populates)
      expect(res).to.have.deep.property(`users.${uid}`)
    })

    it('populates single property containing a list', async () => {
      populates = [{ child: 'collaborators', root: 'users' }]
      res = await promisesForPopulate(
        Firebase,
        '',
        { collaborators: { [uid]: true, ABC123: true } },
        populates
      )
      expect(res).to.have.deep.property(`users.${uid}`)
    })

    it('populates all existing children even if one populates child does not exist', async () => {
      populates = [
        { child: 'collaborators', root: 'users' },
        { child: 'nonExistantKey', root: 'users' }
      ]
      res = await promisesForPopulate(
        Firebase,
        '',
        { collaborators: { [uid]: true, ABC123: true } },
        populates
      )
      expect(res).to.have.deep.property(`users.${uid}`)
    })

    describe('populates list', () => {
      it('with single property populate', async () => {
        populates = [{ child: 'owner', root: 'users' }]
        res = await promisesForPopulate(
          Firebase,
          '',
          { 1: { owner: uid } },
          populates
        )
        expect(res).to.have.deep.property(`users.${uid}`)
      })

      it('with property containing array property', async () => {
        populates = [{ child: 'collaborators', root: 'users' }]
        res = await promisesForPopulate(
          Firebase,
          '',
          { 1: { collaborators: [uid, 'ABC123'] } },
          populates
        )
        expect(res).to.have.deep.property(`users.${uid}`)
      })

      it('with property containing key/true list', async () => {
        populates = [{ child: 'collaborators', root: 'users' }]
        res = await promisesForPopulate(
          Firebase,
          '',
          { 1: { collaborators: { [uid]: true, ABC123: true } } },
          populates
        )
        expect(res).to.have.deep.property(`users.${uid}`)
      })
    })
  })
})
