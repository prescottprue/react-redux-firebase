import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS,
  dataToJS
} from 'react-redux-firebase'
import TodoItem from './TodoItem'

@firebaseConnect([
  '/todos'
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
      <div>
        <div className="App-header">
          <h2>react-redux-firebase demo</h2>
        </div>
        <div className="App-todos">
          <h4>Todos List</h4>
          {todosList}
        </div>
      </div>
    )
  }
}
