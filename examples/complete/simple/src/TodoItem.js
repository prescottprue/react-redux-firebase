import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withHandlers } from 'recompose'
import { withFirebase } from 'react-redux-firebase'

import './Todo.css'

// Create enhancer to wrap component below. It does the following
// 1. Adds props.firebase (used in handlers)
// 2. Adds toggleDone and deleteTodo handlers (which use props.firebase)
const enhance = compose(
  // Add props.firebase
  withFirebase,
  // Handlers as props
  withHandlers({
    toggleDone: ({ firebase, done, id }) => () =>
      firebase.update(`todos/${id}`, { done: !done }),
    deleteTodo: ({ firebase, todo, id }) => () =>
      firebase.remove(`todos/${id}`)
  })
)

function TodoItem(props) {
  const { deleteTodo, toggleDone, text, name, done } = props
  return (
    <li className="Todo">
      <input
        className="Todo-Input"
        type="checkbox"
        checked={done}
        onChange={toggleDone}
      />
      {text || name}
      <button className="Todo-Button" onClick={deleteTodo}>
        Delete
      </button>
    </li>
  )
}

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
