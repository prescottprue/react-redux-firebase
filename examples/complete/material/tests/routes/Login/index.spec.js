import LoginRoute from 'routes/Login'

describe('(Route) Login', () => {
  let _route

  beforeEach(() => {
    _route = LoginRoute
  })

  it('Should return a route configuration object', () => {
    expect(LoginRoute).to.be.a.function
  })

  it('Sets Path to /login', () => {
    expect(_route.path).to.equal('/login')
  })
  it('Defines a getComponent function', () => {
    expect(_route.getComponent).to.be.a.function
  })
})
