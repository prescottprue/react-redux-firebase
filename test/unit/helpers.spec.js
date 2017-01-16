/* global describe expect it */
import { fromJS } from 'immutable'
import helpers from '../../src/helpers'
const exampleData = {
  data: { some: 'data' },
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

  describe('customToJS', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('customToJS')
    })
    it('passes notSetValue', () => {
      expect(helpers.customToJS(exampleData, '/some', 'some', exampleData))
        .to
        .equal(exampleData)
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
