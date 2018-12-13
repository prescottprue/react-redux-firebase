import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withStateHandlers, withHandlers } from 'recompose'
import { withFirebase } from 'react-redux-firebase'
import './App.css'

const enhance = compose(
  withFirebase,
  // withFirebase, // not yet supporting the new API
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
      props.firebase.push('todos', { text: props.inputVal || 'sample', done: false })
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
  firebase: PropTypes.shape({ // from enhnace (withFirestore)
    push: PropTypes.func.isRequired,
  }),
  addTodo: PropTypes.func.isRequired, // from enhance (withHandlers)
  todos: PropTypes.array
}

export default enhance(NewTodo)
