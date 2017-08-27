/**
 * NOTE: This file is ignored from git tracking. In a CI environment, it is
 * generated using build/create-config.js by calling npm run create-config (or
 * using firebase-ci if deploying to Firebase hosting). This is done so that
 * environment specific settings can be applied.
 */

export const env = 'development'

// Config for firebase
export const firebase = {
  apiKey: 'AIzaSyCTUERDM-Pchn_UDTsfhVPiwM4TtNIxots',
  authDomain: 'redux-firebasev3.firebaseapp.com',
  databaseURL: 'https://redux-firebasev3.firebaseio.com',
  storageBucket: 'redux-firebasev3.appspot.com'
}

// Config for react-redux-firebase
// For more details, visit https://prescottprue.gitbooks.io/react-redux-firebase/content/config.html
export const reduxFirebase = {
  userProfile: 'users', // root that user profiles are written to
  // enableLogging: false, // enable/disable Firebase Database Logging
  // presence: 'presence',
  updateProfileOnLogin: false, // enable/disable updating of profile on login
  // profileParamsToPopulate: [{ child: 'cars', root: 'cars' }] // gather data for populating profile params
  // profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
}

export default { env, firebase, reduxFirebase }
