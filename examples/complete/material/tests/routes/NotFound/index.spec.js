import NotFoundRoute from 'routes/NotFound'

describe('(Route) NotFound', () => {
  let _route

  beforeEach(() => {
    _route = NotFoundRoute()
  })

  it('Should return a route configuration object', () => {
    expect(NotFoundRoute).to.be.a.function
  })

  it('Sets Path to *', () => {
    expect(_route.path).to.equal('*')
  })
  it('Defines a getComponent function', () => {
    expect(_route.getComponent).to.be.a.function
  })
  it('Defines a getChildRoutes function', () => {
    expect(_route.getChildRoutes).to.be.a.function
  })
})
