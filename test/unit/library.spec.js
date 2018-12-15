import src from '../../src'

describe('module', () => {
  describe('exports', () => {
    it('ReactReduxFirebaseContext', () => {
      expect(src).to.have.property('ReactReduxFirebaseContext')
    })
    it('ReactReduxFirebaseProvider', () => {
      expect(src).to.respondTo('ReactReduxFirebaseProvider')
    })
    it('ReduxFirestoreContext', () => {
      expect(src).to.have.property('ReduxFirestoreContext')
    })
    it('ReduxFirestoreProvider', () => {
      expect(src).to.respondTo('ReduxFirestoreProvider')
    })
    it('withFirestore', () => {
      expect(src).to.respondTo('withFirestore')
    })
    it('withFirebase', () => {
      expect(src).to.respondTo('withFirebase')
    })
    it('firebaseReducer', () => {
      expect(src).to.respondTo('firebaseReducer')
    })
    it('helpers', () => {
      expect(src).to.have.property('helpers')
      expect(src.helpers).to.be.an.object
    })
  })
})
