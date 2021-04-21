import { combineReducers } from 'redux'
import { firebaseReducer, FirebaseReducer } from 'react-redux-firebase'
import { firestoreReducer, FirestoreReducer } from 'redux-firestore'

interface UserProfile {
  email: string
}

export interface TodoValue {
  text: string
  done: boolean
}

// create schema for the DB
interface DBSchema {
  todos: TodoValue
  [name: string]: any
}
interface RootState {
  firebase: FirebaseReducer.Reducer<DBSchema>
  firestore: FirestoreReducer.Reducer;
}

const rootReducer = combineReducers<RootState>({
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
