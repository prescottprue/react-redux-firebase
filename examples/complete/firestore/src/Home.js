import React from 'react'
import Todos from './Todos'
import NewTodo from './NewTodo'
import logo from './logo.svg'
import './App.css'

function Home() {
  return (
    <div className='App'>
      <div className='App-header'>
        <h2>firestore demo</h2>
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
        <Todos />
        <NewTodo />
      </div>
    </div>
  )
}

export default Home
