import React from 'react'
import { useSelector } from 'react-redux'
import {
  isLoaded,
  isEmpty,
  useFirebaseConnect
} from 'react-redux-firebase'
import logo from './logo.svg'
import TodoItem from './TodoItem'
import NewTodo from './NewTodo'
import './App.css'

function Home() {
  useFirebaseConnect(() => [
    {
      path: 'todos',
      queryParams: ['limitToLast=10']
    }
  ])
  const todos = useSelector(state => state.firebase.ordered.todos)
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

export default Home
