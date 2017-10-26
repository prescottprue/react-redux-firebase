// EXAMPLE ONLY! THIS FILE IS USUALLY NOT PART OF GIT TRACKING
// .gitignore skips this at the project level, but it is added for example here
/**
 * NOTE: This file is ignored from git tracking. In a CI environment, it is
 * generated using build/create-config.js by calling npm run create-config (or
 * using firebase-ci if deploying to Firebase hosting). This is done so that
 * environment specific settings can be applied.
 */

export const env = 'development'

// Config from Firebase Console
export const firebase = {
  apiKey: "AIzaSyCTUERDM-Pchn_UDTsfhVPiwM4TtNIxots",
  authDomain: "redux-firebasev3.firebaseapp.com",
  databaseURL: "https://redux-firebasev3.firebaseio.com",
  projectId: "redux-firebasev3",
  storageBucket: "redux-firebasev3.appspot.com",
  messagingSenderId: "823357791673"
}

// Config for react-redux-firebase
// For more details, visit http://docs.react-redux-firebase.com/history/v2.0.0/docs/api/enhancer.html
export const reduxFirebase = {
  userProfile: 'users', // root that user profiles are written to
  // updateProfileOnLogin: false, // enable/disable updating of profile on login
  // enableLogging: false, // enable/disable Firebase Database Logging
  // presence: 'presence',
  // autoPopulateProfile: true, // keep auto population of profile from v1
  // profileParamsToPopulate: [
  //   // create queries for profile population (remember to use populate)
  //   { child: 'cars', root: 'cars' }
  // ],
  // useFirestoreForProfile: true, // Use Firestore to store profile
  // profileParamsToPopulate: [{ child: 'cars', root: 'cars' }] // gather data for populating profile params
  // profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
}

export default { env, firebase, reduxFirebase }
