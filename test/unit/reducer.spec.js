/* global describe expect it */
import { firebaseStateReducer } from '../../src'
// import { actionTypes } from '../../src/constants'
const exampleState = {}

describe('reducer', () => {
  it('is a function', () => {
    expect(firebaseStateReducer).to.be.a.function
  })
  it('returns state by default', () => {
    expect(firebaseStateReducer(exampleState)).to.equal(exampleState)
  })
})
