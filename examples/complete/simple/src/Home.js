import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'

import logo from './logo.svg'
import TodoItem from './TodoItem'
import './App.css'

class App extends Component {
  static propTypes = {
    todos: PropTypes.object,
    firebase: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }

  handleAdd = () => {
    const { firebase } = this.props
    const { newTodo } = this.refs
    firebase.push('/todos', { text: newTodo.value, done: false })
    newTodo.value = ''
  }

  render () {
    const { todos } = this.props

    console.log('todos;', todos)

    const todosList = (!isLoaded(todos))
                        ? 'Loading'
                        : (isEmpty(todos))
                          ? 'Todo list is empty'
                          : Object.keys(todos).map((key) => (
                            <TodoItem key={key} id={key} todo={todos[key]} />
                          ))
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>react-redux-firebase demo</h2>
          <img src={logo} className='App-logo' alt='logo' />
        </div>
        <div className='App-todos'>
          <h4>
            Loaded From
            <span className='App-Url'>
              <a href='https://redux-firebasev3.firebaseio.com/'>
                redux-firebasev3.firebaseio.com
              </a>
            </span>
          </h4>
          <h4>Todos List</h4>
          {todosList}
          <h4>New Todo</h4>
          <input type='text' ref='newTodo' />
          <button onClick={this.handleAdd}>
            Add
          </button>
        </div>
      </div>
    )
  }
}
const fbWrappedComponent = firebaseConnect([
  '/todos'
  // { type: 'once', path: '/todos' } // for loading once instead of binding
  // '/todos#populate=owner:displayNames' // for populating owner parameter from id into string loaded from /displayNames root
  // '/todos#populate=collaborators:users' // for populating owner parameter from id to user object loaded from /users root
  // { path: 'todos', populates: [{ child: 'collaborators', root: 'users' }] } // object notation of population
  // '/todos#populate=owner:users:displayName' // for populating owner parameter from id within to displayName string from user object within users root
])(App)

export default connect(
  ({ firebase }) => ({
    todos: dataToJS(firebase, 'todos'),
  })
)(fbWrappedComponent)
