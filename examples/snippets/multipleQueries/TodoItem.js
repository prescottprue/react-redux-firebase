import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'
import './Todo.css'

const TodoItem = ({ firebase, todo, id }) => {
  const toggleDone = () => firebase.set(`todos/${id}/done`, !todo.done)
  const deleteTodo = () => firebase.remove(`todos/${id}`)
  return (
    <li className="Todo">
      <input
        className="Todo-Input"
        type="checkbox"
        checked={todo.done}
        onChange={toggleDone}
      />
      {todo.text}
      <button className="Todo-Button" onClick={deleteTodo}>
        Delete
      </button>
    </li>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object,
  id: PropTypes.string
}

export default firebaseConnect()(TodoItem)
