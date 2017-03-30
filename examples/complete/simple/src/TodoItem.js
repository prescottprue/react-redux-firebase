import React, { PropTypes, Component } from 'react'
import { firebase } from 'react-redux-firebase'

import './Todo.css'

class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object,
    id: PropTypes.string
  }

  render(){
    const {firebase, todo, id} = this.props
    const toggleDone = () => {
      firebase.set(`/todos/${id}/done`, !todo.done)
    }

    const deleteTodo = (event) => {
       firebase.remove(`/todos/${id}`)
    }
    return (
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
  }
}
export default firebase()(TodoItem)
