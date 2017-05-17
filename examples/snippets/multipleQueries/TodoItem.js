import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'

import './Todo.css'

@firebaseConnect()
export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object,
    id: PropTypes.string
  }

  render(){
    const { firebase, todo, id } = this.props
    const toggleDone = () => firebase.set(`/todos/${id}/done`, !todo.done)
    const deleteTodo = () => firebase.remove(`/todos/${id}`)

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
}
