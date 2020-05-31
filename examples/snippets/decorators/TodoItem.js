import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFirebase } from 'react-redux-firebase'

import './Todo.css'

@withFirebase // pass down props.firebase (firebaseConnect() can also be used)
export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object,
    id: PropTypes.string
  }

  toggleDone = () => firebase.set(`/todos/${id}/done`, !todo.done)

  delete = (event) => firebase.remove(`/todos/${id}`)

  render(){
    const { todo, id } = this.props

    return (
      <li className="Todo">
        <input
          className="Todo-Input"
          type="checkbox"
          checked={todo.done}
          onChange={this.toggleDone}
        />
        {todo.text}
        <button className="Todo-Button" onClick={this.delete}>
          Delete
        </button>
      </li>
    )
  }
}
