import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withHandlers } from 'recompose'
import { firebaseConnect } from 'react-redux-firebase'

import './Todo.css'

// Create enhancer to wrap component below. It does the following
// 1. Renders nothing if todo is undefined
// 2. Adds props.firebase (used in handlers)
// 3. Adds toggleDone and deleteTodo handlers (which use props.firebase)
const enhance = compose(
  // Add props.firebase
  firebaseConnect(),
  // Handlers as props
  withHandlers({
    toggleDone: ({ firebase, done, id }) => () =>
      firebase.update(`todos/${id}`, { done: !done }),
    deleteTodo: ({ firebase, todo, id }) => () =>
      firebase.remove(`todos/${id}`)
  })
)

const TodoItem = (props) => {
  const { deleteTodo, toggleDone, text, name, done } = props
  console.log('props', props)
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
