import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withHandlers, branch, renderNothing } from 'recompose'
import { withFirebase } from 'react-redux-firebase'

import './Todo.css'

// Create enhancer to wrap component below. It does the following
// 1. Renders nothing if todo is undefined
// 2. Adds props.firebase (used in handlers)
// 3. Adds toggleDone and deleteTodo handlers (which use props.firebase)
const enhance = compose(
  // Render nothing if todo is not defined
  branch(({ todo }) => !todo, renderNothing),
  // Add props.firebase
  withFirebase,
  // Handlers as props
  withHandlers({
    toggleDone: ({ firebase, todo, id }) => () =>
      firebase.update(`todos/${id}`, { done: !todo.done }),
    deleteTodo: ({ firebase, todo, id }) => () =>
      firebase.remove(`todos/${id}`)
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
  firebase: PropTypes.shape({ // from enhnace (withfirebase)
    update: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
  }),
  toggleDone: PropTypes.func, // from enhance (withHandlers)
  deleteTodo: PropTypes.func, // from enhance (withHandlers)
}

export default enhance(TodoItem)
