/* global describe expect it */
import { fromJS } from 'immutable'
import helpers from '../../src/helpers'
const exampleData = {
  data: {
    some: 'data',
    projects: {
      CDF: {
        owner: 'ABC'
      },
      GHI: {
        owner: 'ABC'
      },
      OKF: {
        owner: 'asdfasdf',
        collaborators: {
          ABC: true,
          abc: true
        }
      }
    },
    users: {
      ABC: {
        displayName: 'scott'
      }
    }
  },
  timestamp: { 'some/path': { test: 'key' } },
  snapshot: { some: 'snapshot' }
}
const exampleState = fromJS(exampleData)

describe('Helpers:', () => {
  describe('toJS', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('toJS')
    })
    it('handles non-immutable data', () => {
      expect(helpers.toJS(exampleData)).to.equal(exampleData)
    })
    it('handles immutable data', () => {
      expect(helpers.toJS(exampleState)).to.be.an.object
    })
  })

  describe('pathToJS', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('pathToJS')
    })
    it('passes notSetValue', () => {
      expect(helpers.pathToJS(null, '/some', exampleData))
        .to
        .equal(exampleData)
    })
    it('gets data', () => {
      expect(helpers.pathToJS(exampleState, '/some', exampleData))
        .to
        .equal(exampleData)
    })
    it('gets meta (string key)', () => {
      expect(helpers.pathToJS(exampleState, 'timestamp/some/path'))
        .to
        .have
        .keys('test')
    })
    it('returns state if its not an immutable Map', () => {
      const fakeState = {}
      expect(helpers.pathToJS(fakeState, 'asdf'))
        .to
        .equal(fakeState)
    })
  })

  describe('dataToJS', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('dataToJS')
    })
    it('passes notSetValue', () => {
      expect(helpers.dataToJS(null, '/some', exampleData))
        .to
        .equal(exampleData)
    })
    it('gets data from state', () => {
      const path = 'some'
      expect(helpers.dataToJS(exampleState, path, exampleData))
        .to
        .equal(exampleData.data[path])
    })
    it('returns state if its not an immutable Map', () => {
      const fakeState = { }
      expect(helpers.dataToJS(fakeState, 'asdf'))
        .to
        .equal(fakeState)
    })
  })

  describe('populatedDataToJS', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('populatedDataToJS')
    })
    it('passes notSetValue', () => {
      expect(helpers.populatedDataToJS(null, '/some', [], exampleData))
        .to
        .equal(exampleData)
    })
    it('returns undefined for non existant path', () => {
      expect(helpers.populatedDataToJS(exampleState, '/asdf', []))
        .to
        .equal(undefined)
    })
    it('returns state if its not an immutable Map', () => {
      const fakeState = { }
      expect(helpers.populatedDataToJS(fakeState, 'asdf'))
        .to
        .equal(fakeState)
    })
    it('returns unpopulated data for no populates', () => {
      const path = '/projects'
      expect(helpers.populatedDataToJS(exampleState, path, []))
        .to
        .equal(exampleData.data[path])
    })

    it('populates child', () => {
      const path = 'projects'
      const rootName = 'users'
      const valName = 'CDF'
      expect(helpers.populatedDataToJS(exampleState, path, [{ child: 'owner', root: rootName }])[valName].owner)
        .to
        .have
        .property('displayName', 'scott')
    })

    it('populates child list', () => {
      const path = 'projects'
      const rootName = 'users'
      const valName = 'OKF'
      const populates = [
        { child: 'collaborators', root: rootName },
      ]
      const populatedData = helpers.populatedDataToJS(exampleState, path, populates)
      expect(populatedData)
        .to
        .have
        .deep
        .property(`${valName}.collaborators.ABC.displayName`, exampleData.data[rootName].ABC.displayName)
    })

    it('handles non existant children', () => {
      const path = 'projects'
      const rootName = 'users'
      const valName = 'OKF'
      const populates = [
        { child: 'collaborators', root: rootName },
      ]
      expect(helpers.populatedDataToJS(exampleState, path, populates))
        .to
        .have
        .deep
        .property(`${valName}.collaborators.abc`, true)
      expect(helpers.populatedDataToJS(exampleState, path, populates))
        .to
        .have
        .deep
        .property(`${valName}.collaborators.ABC.displayName`, exampleData.data[rootName].ABC.displayName)
    })

    it('populates multiple children', () => {
      const path = 'projects'
      const rootName = 'users'
      const valName = 'CDF'
      const populates = [
        { child: 'owner', root: rootName },
        { child: 'collaborators', root: rootName },
      ]
      expect(helpers.populatedDataToJS(exampleState, path, populates))
        .to
        .have
        .deep
        .property(`${valName}.owner.displayName`, exampleData.data[rootName].ABC.displayName)
    })
  })

  describe('customToJS', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('customToJS')
    })
    it('handles non-immutable state', () => {
      expect(helpers.customToJS(exampleData, '/some', 'some'))
        .to
        .equal(exampleData)
    })
    it('passes notSetValue', () => {
      expect(helpers.customToJS(null, '/some', 'some', exampleData))
        .to
        .equal(exampleData)
    })
    it('passes custom data', () => {
      expect(helpers.customToJS(exampleState, '/some', 'snapshot'))
        .to
        .exist
    })
  })

  describe('isLoaded', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('isLoaded')
    })
    it('defaults to true when no arguments passed', () => {
      expect(helpers.isLoaded()).to.be.true
    })
    it('returns true when is loaded', () => {
      expect(helpers.isLoaded('some')).to.be.true
    })
  })

  describe('isEmpty', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('isEmpty')
    })
    it('returns false when not loaded', () => {
      expect(helpers.isEmpty('asdf')).to.be.false
    })
    it('returns true when is loaded', () => {
      expect(helpers.isEmpty([{}])).to.be.false
    })
  })
})
