import React, { PropTypes, Component } from 'react'
import logo from './logo.svg';
import './App.css'
import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-firebasev3'
import { map } from 'lodash'

const { isLoaded, isEmpty, pathToJS, dataToJS } = helpers

import './Todo.css'

@firebase()
export default class TodoItem extends Component {
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
        <input className="Todo-Input" type="checkbox" checked={todo.done} onChange={toggleDone} />
        {todo.text}
        <button className="Todo-Button" onClick={deleteTodo}>Delete</button>
      </li>)
  }
}
