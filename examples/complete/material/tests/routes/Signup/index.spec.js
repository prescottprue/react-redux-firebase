import SignupRoute from 'routes/Signup'

describe('(Route) Signup', () => {
  let _route

  beforeEach(() => {
    _route = SignupRoute()
  })

  it('Should return a route configuration function', () => {
    expect(SignupRoute).to.be.a.function
  })

  it('Sets Path to /signup', () => {
    expect(_route.path).to.equal('signup')
  })
  it('Defines a getComponent function', () => {
    expect(_route.getComponent).to.be.a.function
  })
})
