/* global describe expect it */
import src from '../../source'

describe('redux-firebasev3', () => {
  describe('exports', () => {
    it('firebase', () => {
      expect(src).to.respondTo('firebase')
    });
    it('firebaseStateReducer', () => {
      expect(src).to.respondTo('firebaseStateReducer')
    })
    it('reduxReactFirebase', () => {
      expect(src).to.respondTo('reduxReactFirebase')
    })
    it('helpers', () => {
      expect(src).to.have.property('helpers')
    })
  })
})
