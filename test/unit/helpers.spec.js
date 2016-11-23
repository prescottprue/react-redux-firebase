/* global describe expect it */
import helpers from '../../src/helpers'
const exampleData = { data: { some: 'data' } }

// TODO: Use immutable object so functions exist on object
describe('helpers', () => {
  describe('toJS', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('toJS')
    })
    it('handles non-immutable data', () => {
      expect(helpers.toJS(exampleData)).to.equal(exampleData)
    })
  })
  describe('pathToJS', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('pathToJS')
    })
    it('passes notSetValue', () => {
      expect(helpers.pathToJS(exampleData, '/some', exampleData))
        .to
        .equal(exampleData)
    })
  })
  describe('dataToJS', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('dataToJS')
    })
    it('passes notSetValue', () => {
      expect(helpers.dataToJS(exampleData, '/some', exampleData))
        .to
        .equal(exampleData)
    })
  })
  describe('snapshotToJS', () => {
    expect(helpers).to.respondTo('snapshotToJS')
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
  })
  describe('isEmpty', () => {
    it('exists', () => {
      expect(helpers).to.respondTo('isEmpty')
    })
  })
})
