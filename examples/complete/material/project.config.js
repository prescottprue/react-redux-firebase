const ip = require('ip')
const NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = 3000

module.exports = {
  /** The environment to use when building the project */
  env: NODE_ENV,
  /** The port that is used for local development */
  port: PORT,
  /** The full path to the project's root directory */
  basePath: __dirname,
  /** The name of the directory containing the application source code */
  srcDir: 'src',
  /** The file name of the application's entry point */
  main: 'main',
  /** The name of the directory in which to emit compiled assets */
  outDir: 'dist',
  /** The base path for all projects assets (relative to the website root) */
  publicPath:
    NODE_ENV === 'development' ? `http://${ip.address()}:${PORT}/` : '/',
  /** Whether to generate sourcemaps */
  sourcemaps: true,
  /** A hash map of keys that the compiler should treat as external to the project */
  externals: {},
  /** A hash map of variables and their values to expose globally */
  globals: {},
  /** Whether to enable verbose logging */
  verbose: false,
  /** The list of modules to bundle separately from the core application code */
  vendors: [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'redux-thunk',
    'react-router',
    'react-redux-firebase',
    '@material-ui/core',
    '@material-ui/icons'
  ]
}
