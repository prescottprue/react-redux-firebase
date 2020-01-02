import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import TodoItem from './TodoItem'

const todosQuery = {
  collection: 'todos',
  limitTo: 10
}

function Todos() {
  // Attach todos listener
  useFirestoreConnect(() => [todosQuery])

  // Get todos from redux state
  const todos = useSelector(({ firestore: { ordered } }) => ordered.todos)

  // Show a message while todos are loading
  if (!isLoaded(todos)) {
    return 'Loading'
  }

  // Show a message if there are no todos
  if (isEmpty(todos)) {
    return 'Todo list is empty'
  }

  return todos.map(({ id, ...todo }, ind) => (
    <TodoItem key={`${id}-${ind}`} id={id} {...todo} />
  ))
}

export default Todos
