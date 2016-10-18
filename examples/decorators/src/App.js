import React, { PropTypes, Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { map } from 'lodash'
import TodoItem from './TodoItem'

// redux/firebase
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty, pathToJS, dataToJS } = helpers

@firebase([
  '/todos'
  // { type: 'once', path: '/todos' } // for loading once instead of binding
  // '/todos#populate=owner:displayNames' // for populating owner parameter from id into string loaded from /displayNames root
  // '/todos#populate=owner:users' // for populating owner parameter from id to user object loaded from /users root
  // '/todos#populate=owner:users:displayName' // for populating owner parameter from id within to displayName string from user object within users root
])
@connect(
  ({firebase}) => ({
    todos: dataToJS(firebase, '/todos'),
    profile: pathToJS(firebase, 'profile')
  })
)
export default class App extends Component {
  static propTypes = {
    todos: PropTypes.object,
    firebase: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }
  render () {
    const { firebase, todos } = this.props

    const handleAdd = () => {
      const { newTodo } = this.refs
      firebase.push('/todos', { text: newTodo.value, done: false })
      newTodo.value = ''
    }

    const todosList = (!isLoaded(todos))
                        ? 'Loading'
                        : (isEmpty(todos))
                          ? 'Todo list is empty'
                          : map(todos, (todo, id) => (
                              <TodoItem key={id} id={id} todo={todo} />
                            ))
    return (
      <div className="App">
        <div className="App-header">
          <h2>react-redux-firebase demo</h2>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="App-todos">
          <h4>
            Loaded From
            <span className="App-Url">
              <a href="https://react-redux-firebase.firebaseio.com/">
                react-redux-firebase.firebaseio.com
              </a>
            </span>
          </h4>
          <h4>Todos List</h4>
          {todosList}
          <h4>New Todo</h4>
          <input type="text" ref="newTodo" />
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>
    )
  }
}
