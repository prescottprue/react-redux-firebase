import React, { Component, PropTypes } from 'react'
import logo from './logo.svg'
import './App.css'
import TodoItem from './TodoItem'

// redux/firebase
import { connect } from 'react-redux'
import { firebaseConnect, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty, pathToJS, dataToJS } = helpers

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
              <a href='https://react-redux-firebase.firebaseio.com/'>
                react-redux-firebase.firebaseio.com
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
  // '/todos'
  // { type: 'once', path: '/todos' } // for loading once instead of binding
  // '/todos#populate=owner:displayNames' // for populating owner parameter from id into string loaded from /displayNames root
  // '/todos#populate=collaborators:users' // for populating owner parameter from id to user object loaded from /users root
  { path: 'todos', populates: [{ child: 'collaborators', root: 'users' }] } // object notation
  // '/todos#populate=owner:users:displayName' // for populating owner parameter from id within to displayName string from user object within users root
])(App)

export default connect(
  ({ firebase }) => ({
    todos: dataToJS(firebase, 'todos'),
    profile: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth')
  })
)(fbWrappedComponent)
