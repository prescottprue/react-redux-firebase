import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withHandlers, branch, renderNothing } from 'recompose'
import { withFirestore } from 'react-redux-firebase'

import './Todo.css'

// Create enhancer to wrap component below. It does the following
// 1. Renders nothing if todo is undefined
// 2. Adds props.firestore (used in handlers)
// 3. Adds toggleDone and deleteTodo handlers (which use props.firestore)
const enhance = compose(
  // Render nothing if todo is not defined
  branch(({ todo }) => !todo, renderNothing),
  // Add props.firestore
  withFirestore,
  // Handlers as props
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
