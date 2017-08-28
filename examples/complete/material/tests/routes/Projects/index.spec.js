import ProjectsRoute from 'routes/Projects'

describe('(Route) Projects', () => {
  let _route

  beforeEach(() => {
    _route = ProjectsRoute()
  })

  it('Should return a route configuration function', () => {
    expect(ProjectsRoute).to.be.a.function
  })

  it('returns an object', () => {
    expect(_route).to.be.a.object
  })

  it('Sets Path to /projects', () => {
    expect(_route.path).to.equal('/projects')
  })
  it('Defines a getComponent function', () => {
    expect(_route.getComponent).to.be.a.function
  })
})
