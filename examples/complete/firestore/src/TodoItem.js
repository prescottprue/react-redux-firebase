import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withHandlers } from 'recompose'
import { withFirestore } from 'react-redux-firebase'

import './Todo.css'

// Create enhancer to wrap component below (adds toggleDone and deleteTodo handlers)
const enhance = compose(
  withFirestore, // firestoreConnect can also be used
  withHandlers({
    toggleDone: ({ firestore, todo }) => () =>
      firestore.update({ collection: 'todos', doc: todo.id }, { done: !todo.done }),
    deleteTodo: ({ firestore, todo }) => () =>
      firestore.delete({ collection: 'todos', doc: todo.id })
  })
)

const TodoItem = ({ deleteTodo, toggleDone, todo }) => (
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

TodoItem.propTypes = {
  todo: PropTypes.shape({
    text: PropTypes.string,
    id: PropTypes.string
  }),
  firestore: PropTypes.shape({ // from enhnace (withFirestore)
    update: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired
  }),
  toggleDone: PropTypes.func, // from enhance (withHandlers)
  deleteTodo: PropTypes.func, // from enhance (withHandlers)
}

export default enhance(TodoItem)
