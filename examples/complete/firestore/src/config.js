export const firebase = {
  apiKey: "AIzaSyBTvAcJwsN8iygsnwAZyzIuy1uleYEpWIo",
  authDomain: "redux-firestore.firebaseapp.com",
  databaseURL: "https://redux-firestore.firebaseio.com",
  projectId: "redux-firestore",
  storageBucket: "redux-firestore.appspot.com",
  messagingSenderId: "502471151289"
}

export const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
  enableLogging: false
}

export default { firebase, rrfConfig }
