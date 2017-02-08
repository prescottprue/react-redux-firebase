import { firebase as config } from '../config'
const { apiKey, authDomain, databaseURL, storageBucket } = config
import Firebase from 'firebase'

// Initialize Firebase
Firebase.initializeApp({ apiKey, authDomain, databaseURL, storageBucket })

export default Firebase
