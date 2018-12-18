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
import NewTodo from './NewTodo';

function Home({ firebase, todos }) {
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
              : todos.reverse().map(({ value: todo, key }, ind) => (
                <TodoItem
                  key={`${key}-${ind}`}
                  id={key}
                  {...todo}
                />
              ))
        }
        <NewTodo />
      </div>
    </div>
  )
}

Home.propTypes = {
  firebase: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    todos: state.firebase.ordered.todos
  }
}

const enhance = compose(
  firebaseConnect(() => [
    {
      path: 'todos',
      queryParams: ['limitToLast=10']
    }
  ]),
  connect(mapStateToProps)
)

export default enhance(Home)
