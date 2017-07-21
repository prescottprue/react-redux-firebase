import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS,
  dataToJS
} from 'react-redux-firebase'

import logo from './logo.svg'
import TodoItem from './TodoItem'

class Todos extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      uid: PropTypes.string.isRequired
    }),
    todos: PropTypes.object
  }

  render () {
    const { todos } = this.props

    const todosList = (!isLoaded(todos))
                        ? 'Loading'
                        : (isEmpty(todos))
                          ? 'Todo list is empty'
                          : Object.keys(todos).map((key) => (
                            <TodoItem key={key} id={key} todo={todos[key]} />
                          ))
    return (
      <div className='Todos'>
        {todosList}
      </div>
    )
  }
}

const fbWrappedComponent = firebaseConnect(({ auth }) => ([ // auth comes from props
  {
    path: 'todos',
    queryParams: ['orderByChild=uid', `equalTo=${auth}`]
  }
]))(authWrappedComponent)

export default connect(
  ({ firebase }) => ({
    todos: dataToJS(firebase, 'todos')
  })
)(fbWrappedComponent)
