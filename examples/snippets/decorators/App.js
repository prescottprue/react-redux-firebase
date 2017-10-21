import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import TodoItem from './TodoItem'

@firebaseConnect([
  'todos'
])
@connect(
  ({ firebase: { ordered } }) => ({
    todos: ordered.todos
  })
)
export default class App extends Component {
  static propTypes = {
    todos: PropTypes.array
  }

  render () {
    const { firebase, todos } = this.props

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
          <h2>react-redux-firebase decorators demo</h2>
        </div>
        <div className="App-todos">
          <h4>Todos List</h4>
          {todosList}
        </div>
      </div>
    )
  }
}
