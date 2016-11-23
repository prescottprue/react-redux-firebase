/* global describe expect it */
import compose from '../../src/compose'
const exampleData = { data: { some: 'data' } }

// TODO: Use immutable object so functions exist on object
describe('Compose', () => {
  it('is a function', () => {
    expect(compose).to.be.a.function
  })
  it('returns an object', () => {
    expect(compose(fbConfig)).to.be.an.object
  })
})
