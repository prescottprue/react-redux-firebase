import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import TodoItem from './TodoItem'

const Todos = ({ todos }) => (
  <div className='Todos'>
    {
      (!isLoaded(todos))
        ? 'Loading'
        : (isEmpty(todos))
          ? 'Todo list is empty'
          : Object.keys(todos).map((key) => (
            <TodoItem key={key} id={key} todo={todos[key]} />
          ))
    }
  </div>
)

Todos.propTypes = {
  auth: PropTypes.shape({
    uid: PropTypes.string.isRequired
  }),
  todos: PropTypes.object
}

export default compose(
  firebaseConnect(({ auth }) => ([ // auth comes from props
    {
      path: 'todos',
      queryParams: ['orderByChild=uid', `equalTo=${auth.uid}`]
    }
  ])),
  connect(({ firebase: { ordered } }) => ({
    todos: ordered.todos
  }))
)(Todos)
