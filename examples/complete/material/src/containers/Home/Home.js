import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import './Home.css'

import TodoItem from '../../components/TodoItem/TodoItem'
import NewTodoPanel from '../../components/NewTodoPanel/NewTodoPanel'
import CircularProgress from 'material-ui/CircularProgress'
import { List } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'

import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, pathToJS, dataToJS } = helpers

@firebase([
  // '/todos'
  // { type: 'once', path: '/todos' } // for loading once instead of binding
  // '/todos#populate=owner:displayNames' // for populating owner parameter from id into string loaded from /displayNames root
  // '/todos#populate=owner:users' // for populating owner parameter from id to user object loaded from /users root
  '/todos#populate=owner:users:displayName' // for populating owner parameter from id within to displayName string from user object within users root
])
@connect(
  ({firebase}) => ({
    todos: dataToJS(firebase, 'todos'),
    profile: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth')
  })
)
export default class Home extends Component {

  static propTypes = {
    todos: PropTypes.shape({
      done: PropTypes.bool,
      text: PropTypes.string,
      owner: PropTypes.string
    }),
    firebase: PropTypes.shape({
      set: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired
    }),
    auth: PropTypes.shape({
      uid: PropTypes.string
    }),
    profile: PropTypes.object
  }

  toggleDone = (todo, id) => {
    console.log('toggle done', todo, id)
    this.props.firebase.set(`/todos/${id}/done`, !todo.done)
  }

  deleteTodo = (id) => {
    this.props.firebase.remove(`/todos/${id}`)
  }

  handleAdd = (newTodo) => {
    const { firebase, auth } = this.props
    // Attach user if logged in
    if (auth) {
      newTodo.owner = auth.uid
    } else {
      newTodo.owner = 'Anonymous'
    }
    firebase.push('/todos', newTodo)
  }

  render () {
    const { todos } = this.props
    console.debug('todo list:', todos)
    return (
      <div className='Home'>
        <div className='Home-Info'>
          from
          <span className='Home-Url'>
            <a href='https://react-redux-firebase.firebaseio.com/'>
              react-redux-firebase.firebaseio.com
            </a>
          </span>
        </div>
        <div className='Home-todos'>
          <Paper className='Home-Paper'>
            <Subheader>Todos</Subheader>
            {
              !isLoaded(todos)
                ? <CircularProgress />
                : <List className='Home-List'>
                    {
                      todos &&
                        map(todos, (todo, id) => (
                          <TodoItem
                            key={id}
                            id={id}
                            todo={todo}
                            onCompleteClick={this.toggleDone}
                            onDeleteClick={this.deleteTodo}
                          />
                        )
                      )
                    }
                </List>
            }
          </Paper>
          <NewTodoPanel
            onNewClick={this.handleAdd}
            disabled={false}
          />
        </div>
      </div>
    )
  }
}
