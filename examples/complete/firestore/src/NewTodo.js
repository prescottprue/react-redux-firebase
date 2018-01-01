import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withStateHandlers, withHandlers } from 'recompose'
import { withFirestore } from 'react-redux-firebase'
import './App.css'

const enhance = compose(
  withFirestore, // firestoreConnect() can also be used
  withStateHandlers(
    ({ initialVal = '' }) => ({
      inputVal: initialVal
    }),
    {
      onInputChange: ({ inputVal }) => (e) => ({ inputVal: e.target.value }),
      resetInput: ({ inputVal }) => (e) => ({ inputVal: e.target.value })
    }
  ),
  withHandlers({
    addTodo: props => () =>
      props.firestore.add('todos', { text: props.inputVal || 'sample', done: false })
  })
)

const NewTodo = ({ todos, addTodo, inputVal, onInputChange, resetInput }) => (
  <div>
    <h4>New Todo</h4>
    <input value={inputVal} onChange={onInputChange} />
    <button onClick={addTodo}>Add</button>
    <button onClick={resetInput}>Cancel</button>
  </div>
)

NewTodo.propTypes = {
  firestore: PropTypes.shape({ // from enhnace (withFirestore)
    add: PropTypes.func.isRequired,
  }),
  addTodo: PropTypes.func.isRequired, // from enhance (withHandlers)
  todos: PropTypes.array
}

export default enhance(NewTodo)
