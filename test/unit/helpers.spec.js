/* global describe expect it */
import helpers from '../../source/helpers'

describe('helpers', () => {
  describe('exports', () => {
    it('pathToJS', () => {
      expect(helpers).to.respondTo('pathToJS')
    })
    it('dataToJS', () => {
      expect(helpers).to.respondTo('dataToJS')
    })
    it('snapshotToJS', () => {
      expect(helpers).to.respondTo('snapshotToJS')
    })
    it('isLoaded', () => {
      expect(helpers).to.respondTo('isLoaded')
    })
    it('isEmpty', () => {
      expect(helpers).to.respondTo('isEmpty')
    })
  })
})
