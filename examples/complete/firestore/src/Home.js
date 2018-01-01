import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withHandlers } from 'recompose'
import {
  firestoreConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import TodoItem from './TodoItem'
import NewTodo from './NewTodo'
import './App.css'
import { firebase as firebaseConf } from './config'

const enhance = compose(
  firestoreConnect([
    // Load todos from Firestore which are not done into redux
    { collection: 'todos', where: ['done', '==', false] }
  ]),
  connect(
    ({ firestore }) => ({
      todos: firestore.ordered.todos,
    })
  ),
  withHandlers({
    addTodo: props => () =>
      props.firestore.add('todos', { text: 'sample', done: false })
  })
)

const Home = ({ firestore, todos, addTodo }) => (
  <div className='App'>
    <div className='App-header'>
      <h2>firestore demo</h2>
    </div>
    <div className='App-todos'>
      <h4>
        Loaded From
        <span className='App-Url'>
          <a href={firebaseConf.databaseURL}>
            {firebaseConf.databaseURL}
          </a>
        </span>
      </h4>
      <h4>Todos List</h4>
      {
        !isLoaded(todos)
          ? 'Loading'
          : isEmpty(todos)
            ? 'Todo list is empty'
            : todos.map((todo) =>
                <TodoItem key={todo.id} todo={todo} />
              )
      }
      <NewTodo />
    </div>
  </div>
)

Home.propTypes = {
  firestore: PropTypes.shape({ // from enhnace (withFirestore)
    add: PropTypes.func.isRequired,
  }),
  addTodo: PropTypes.func.isRequired, // from enhance (withHandlers)
  todos: PropTypes.array
}

export default enhance(Home)
