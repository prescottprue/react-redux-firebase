import React, { Component, PropTypes } from 'react'
import logo from './logo.svg'
import './App.css'
import TodoItem from './TodoItem'

// redux/firebase
import { connect } from 'react-redux'
import { firebaseConnect, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty, pathToJS, dataToJS } = helpers

class App extends Component {
  static propTypes = {
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
      <div className='App'>
        <div className='App-header'>
          <h2>react-redux-firebase Auth Based Query Demo</h2>
          <img src={logo} className='App-logo' alt='logo' />
        </div>
        <div className='App-todos'>
          <h4>
            Loaded From
            <span className='App-Url'>
              <a href='https://react-redux-firebase.firebaseio.com/'>
                react-redux-firebase.firebaseio.com
              </a>
            </span>
          </h4>
          <h4>Todos List</h4>
          {todosList}
        </div>
      </div>
    )
  }
}

const authWrappedComponent = connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth')
  })
)(App)

const fbWrappedComponent = firebaseConnect(
  ({ auth }) => ([
    `/todos#orderByChild=uid&equalTo=${auth ? auth.uid : ''}`
    /* object notation equivalent
    {
      path: '/todos',
      queryParams: ['orderByChild=uid', `equalTo=${auth ? auth.uid : ''}`]
    }
    */
  ])
)(authWrappedComponent)

export default connect(
  ({ firebase }) => ({
    todos: dataToJS(firebase, 'todos')
  })
)(fbWrappedComponent)
