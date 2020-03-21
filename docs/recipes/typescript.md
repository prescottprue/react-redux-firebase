# Typescript

## Passing Schema To Reducer

**reducer.ts**

```ts
import { combineReducers } from 'redux'
import { firebaseReducer, FirebaseReducer } from 'react-redux-firebase'

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
  firebase: FirebaseReducer.Reducer<UserProfile, DBSchema>
  // firestore: FirestoreReducer.Reducer;
}

const rootReducer = combineReducers<RootState>({
  firebase: firebaseReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
```

Then in components, `AppState` can be used within selectors:

**Todo.tsx**

```tsx
import React from "react";
import { isLoaded, isEmpty, useFirebaseConnect } from "react-redux-firebase";
import { AppState } from './reducer'
import Todo from './Todo'
import { useSelector } from "react-redux";

export default function Todos() {
  useFirebaseConnect([{ path: 'todos', queryParams: ['limitToLast=10'] }])
  const todos = useSelector((state: AppState) => {
    return state.firebase.ordered.todos
  })

  if (!isLoaded(todos)) {
    return (
      <div >
        Loading...
      </div>
    );
  }

  if (isEmpty(todos)) {
    return (
      <div >
        No Todos Found
      </div>
    );
  }
  
  return (
    <div className="Todos">
      {
        todos && todos.map((todoItem) => {
          return <Todo key={todoItem.key} todoId={todoItem.key} />
        })
      }
    </div>
  );
}
```
