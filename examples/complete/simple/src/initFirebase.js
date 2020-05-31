import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // make sure you add this for firestore
import { firebase as fbConfig } from './config'

let firebaseInstance

export default function initFirebase(initialState, history) {
  if (firebaseInstance) {
    return firebaseInstance
  }

  // Initialize firebase instance if it doesn't already exist
  if (!firebaseInstance) {
    const shouldUseEmulator = process.env.REACT_APP_USE_DB_EMULATORS

    if (shouldUseEmulator) { // or window.location.hostname === 'localhost' if you want
      console.log('Using RTDB emulator')
      fbConfig.databaseURL = `http://localhost:9000?ns=${fbConfig.projectId}`
    }

    // Initialize Firebase instance
    firebase.initializeApp(fbConfig)

    if (shouldUseEmulator) { // or window.location.hostname === 'localhost' if you want
      console.log('Using Firestore emulator')
      firebase.firestore().settings({
        host: 'localhost:8080',
        ssl: false
      })
    }
    firebaseInstance = firebase
  }


  return firebaseInstance
}
