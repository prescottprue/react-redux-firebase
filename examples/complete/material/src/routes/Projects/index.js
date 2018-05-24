import { LIST_PATH as path } from 'constants'

export default store => ({
  path,
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure(
      [],
      require => {
        /*  Webpack - use require callback to define
          dependencies for bundling   */
        const Projects = require('./components/ProjectsPage').default

        /*  Return getComponent   */
        cb(null, Projects)

        /* Webpack named bundle   */
      },
      'Projects'
    )
  },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], require => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Project = require('./routes/Project').default

      /*  Return getComponent   */
      cb(null, [Project(store)])
    })
  }
})
