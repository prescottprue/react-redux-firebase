const ip = require('ip')
const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  /** The environment to use when building the project */
  env: NODE_ENV,
  /** The full path to the project's root directory */
  basePath: __dirname,
  /** The name of the directory containing the application source code */
  srcDir: 'src',
  /** The file name of the application's entry point */
  main: 'main',
  /** The name of the directory in which to emit compiled assets */
  outDir: 'dist',
  /** The base path for all projects assets (relative to the website root) */
  publicPath: NODE_ENV === 'development' ? `http://${ip.address()}:3000/` : '/',
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
    'material-ui'
  ],
  /**
   * Settings used to create config.js file when running npm run create-config
   * in ci environment. If you are running locally, go to src/config.js.
   * NOTE: firebase-ci will soon be able to handle this for you :)
   */
  ci: {
    development: {
      firebase: {
        apiKey: 'AIzaSyCTUERDM-Pchn_UDTsfhVPiwM4TtNIxots',
        authDomain: 'redux-firebasev3.firebaseapp.com',
        databaseURL: 'https://redux-firebasev3.firebaseio.com',
        storageBucket: 'redux-firebasev3.appspot.com'
      },
      reduxFirebase: {
        userProfile: 'users', // root that user profiles are written to
        enableLogging: false, // enable/disable Firebase Database Logging
        updateProfileOnLogin: false // enable/disable updating of profile on login
      }
    },
    production: {
      firebase: {
        apiKey: 'AIzaSyCTUERDM-Pchn_UDTsfhVPiwM4TtNIxots',
        authDomain: 'redux-firebasev3.firebaseapp.com',
        databaseURL: 'https://redux-firebasev3.firebaseio.com',
        storageBucket: 'redux-firebasev3.appspot.com'
      },
      reduxFirebase: {
        userProfile: 'users',
        enableLogging: false,
        updateProfileOnLogin: false
      }
    }
  }
}
