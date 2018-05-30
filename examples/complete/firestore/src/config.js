export const firebase = {
  apiKey: "AIzaSyCTUERDM-Pchn_UDTsfhVPiwM4TtNIxots",
  authDomain: "redux-firebasev3.firebaseapp.com",
  databaseURL: "https://redux-firebasev3.firebaseio.com",
  projectId: "redux-firebasev3",
  storageBucket: "redux-firebasev3.appspot.com",
  messagingSenderId: "823357791673"
}

export const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
  enableLogging: false
}

export default { firebase, rrfConfig }
