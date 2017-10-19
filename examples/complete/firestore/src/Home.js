import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firestoreConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import GoogleButton from 'react-google-button'
import TodoItem from './TodoItem'
import './App.css'

const Home = ({ firestore, todos }) => {
  const handleAdd = () => firebase.add('todos', { text: 'sample', done: false })
  return (
    <div className='App'>
      <div className='App-header'>
        <h2>firestore demo</h2>
      </div>
      <div className='App-todos'>
        <h4>
          Loaded From
          <span className='App-Url'>
            <a href='https://redux-firestore.firebaseio.com/'>
              redux-firebasev3.firebaseio.com
            </a>
          </span>
        </h4>
        <h4>Todos List</h4>
        {
          !isLoaded(todos)
            ? 'Loading'
            : isEmpty(todos)
              ? 'Todo list is empty'
              : Object.keys(todos).map((key) => (
                <TodoItem key={key} id={key} todo={todos[key]} />
              ))
        }
        <h4>New Todo</h4>
        <button onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  )
}

export default compose(
  firestoreConnect(['todos']),
  connect(
    ({ firestore }) => ({
      todos: firestore.data.todos,
    })
  )
)(Home)
