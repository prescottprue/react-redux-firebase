import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import logo from './logo.svg'
import TodoItem from './TodoItem'
import './App.css'
import GoogleButton from 'react-google-button'

const Home = ({ firebase, todos }) => {
  const handleAdd = () => {
    return firebase.push('/todos', { text: this.input.value, done: false })
      .then(() => {
        this.input.value = ''
      })
  }
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
            <a href='https://redux-firebasev3.firebaseio.com/'>
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
        <input type='text' ref={ref => { this.input = ref }} />
        <button onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  )
}

export default compose(
  firebaseConnect(['todos']),
  connect(
    ({ firebase }) => ({
      todos: firebase.data.todos,
    })
  )
)(Home)
