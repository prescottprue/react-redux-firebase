import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useFirestore } from 'react-redux-firebase'
import './Todo.css'

function TodoItem({ id }) {
  const todo = useSelector(
    ({ firestore: { data } }) => data.todos && data.todos[id]
  )
  const firestore = useFirestore()

  function toggleDone() {
    firestore.update(`todos/${id}`, { done: !todo.done })
  }

  function deleteTodo() {
    return firestore.delete(`todos/${id}`)
  }

  return (
    <li className="Todo">
      <input
        className="Todo-Input"
        type="checkbox"
        checked={todo.done}
        onChange={toggleDone}
      />
      {todo.text || todo.name}
      <button className="Todo-Button" onClick={deleteTodo}>
        Delete
      </button>
    </li>
  )
}

TodoItem.propTypes = {
  id: PropTypes.string.isRequired
}

export default TodoItem
