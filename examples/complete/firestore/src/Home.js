import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firestoreConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import TodoItem from './TodoItem'
import './App.css'
import { firebase as firebaseConf } from './config'

const Home = ({ firestore, todos }) => {
  const handleAdd = () => firestore.add('todos', { text: 'sample', done: false })
  console.log('todos;', todos)
  return (
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
        <h4>New Todo</h4>
        <button onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  )
}

Home.propTypes = {
  firestore: PropTypes.shape({
    add: PropTypes.func.isRequired,
  }),
  todos: PropTypes.array
}

export default compose(
  firestoreConnect(['todos']),
  connect(
    ({ firestore }) => ({
      todos: firestore.ordered.todos,
    })
  )
)(Home)
