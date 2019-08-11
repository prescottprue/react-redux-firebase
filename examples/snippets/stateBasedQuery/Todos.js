import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import TodoItem from './TodoItem'

function Todos({ todos }) {
  return (
    <div className="Todos">
      {!isLoaded(todos)
        ? 'Loading'
        : isEmpty(todos)
          ? 'Todo list is empty'
          : todos.map(({ key }) => <TodoItem key={key} id={key} />)}
    </div>
  )
}

Todos.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  auth: PropTypes.shape({
    uid: PropTypes.string.isRequired
  }),
  /* eslint-enable react/no-unused-prop-types */
  todos: PropTypes.object
}

const enhance = compose(
  firebaseConnect(props => [
    // uid comes from props
    {
      path: 'todos',
      queryParams: ['orderByChild=uid', `equalTo=${props.uid}`]
    }
  ]),
  connect(state => ({
    todos: state.firebase.ordered.todos
  }))
)

export default enhance(Todos)
