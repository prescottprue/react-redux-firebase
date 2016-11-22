/* global describe expect it */
import helpers from '../../src/helpers'
const exampleData = { data: { some: 'data' } }

// TODO: Use immutable object so functions exist on object
describe('helpers', () => {
  it('toJS', () => {
    describe('exists', () => {
      expect(helpers).to.respondTo('toJS')
    })
    describe('handles non-immutable data', () => {
      expect(helpers.toJS(exampleData)).to.equal(exampleData)
    })
  })
  it('pathToJS', () => {
    describe('exists', () => {
      expect(helpers).to.respondTo('pathToJS')
    })
    describe('passes notSetValue', () => {
      expect(helpers.pathToJS(exampleData, '/some', exampleData))
        .to
        .equal(exampleData)
    })
  })
  it('dataToJS', () => {
    describe('exists', () => {
      expect(helpers).to.respondTo('dataToJS')
    })
    describe('passes notSetValue', () => {
      expect(helpers.dataToJS(exampleData, '/some', exampleData))
        .to
        .equal(exampleData)
    })
  })
  it('snapshotToJS', () => {
    expect(helpers).to.respondTo('snapshotToJS')
  })
  it('customToJS', () => {
    describe('exists', () => {
      expect(helpers).to.respondTo('customToJS')
    })
    describe('passes notSetValue', () => {
      expect(helpers.customToJS(exampleData, '/some', 'some', exampleData))
        .to
        .equal(exampleData)
    })
  })
  it('isLoaded', () => {
    expect(helpers).to.respondTo('isLoaded')
  })
  it('isEmpty', () => {
    expect(helpers).to.respondTo('isEmpty')
  })
})
