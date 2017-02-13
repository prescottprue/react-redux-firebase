import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import Theme from 'theme'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import { List } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import TodoItem from '../TodoItem/TodoItem'
import NewTodoPanel from '../NewTodoPanel/NewTodoPanel'
import classes from './Home.scss'

import { firebaseConnect, helpers } from 'react-redux-firebase'
const { isLoaded, pathToJS, dataToJS } = helpers

@firebaseConnect([
  '/todos'
  // { type: 'once', path: '/projects' } // for loading once instead of binding
  // '/projects#populate=owner:displayNames' // for populating owner parameter from id into string loaded from /displayNames root
  // '/projects#populate=owner:users' // for populating owner parameter from id to user object loaded from /users root
  // '/projects#populate=owner:users:displayName' // for populating owner parameter from id within to displayName string from user object within users root
  // '/projects#orderByChild=done&equalTo=false', // list only not done todos
])
@connect(
  ({firebase}) => ({
    todos: dataToJS(firebase, 'todos'),
    auth: pathToJS(firebase, 'auth')
  })
)
export default class Home extends Component {
  static propTypes = {
    todos: PropTypes.object,
    firebase: PropTypes.shape({
      set: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired
    }),
    auth: PropTypes.shape({
      uid: PropTypes.string
    })
  }

  state = {
    error: null
  }

  toggleDone = (todo, id) => {
    const { firebase, auth } = this.props
    console.log('toggle done', todo, id, auth)
    if (!auth || !auth.uid) {
      return this.setState({ error: 'You must be Logged into Toggle Done' })
    }
    firebase.set(`/todos/${id}/done`, !todo.done)
  }

  deleteTodo = (id) => {
    const { todos, auth, firebase } = this.props
    if (!auth || !auth.uid) {
      return this.setState({ error: 'You must be Logged into Delete' })
    }
    if (todos[id].owner !== auth.uid) {
      return this.setState({ error: 'You must own todo to delete' })
    }
    firebase.remove(`/todos/${id}`)
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
    const { error } = this.state
    console.debug('todo list:', todos)
    return (
      <div className={classes.container} style={{ color: Theme.palette.primary2Color }}>
        {
          error
            ?
              <Snackbar
                open={!!error}
                message={error}
                autoHideDuration={4000}
                onRequestClose={() => this.setState({ error: null })}
              />
            : null
        }
        <div className={classes.info}>
          from
          <span className='Home-Url'>
            <a href='https://redux-firebasev3.firebaseio.com/'>
              redux-firebasev3.firebaseio.com
            </a>
          </span>
        </div>
        <div className={classes.todos}>
          <NewTodoPanel
            onNewClick={this.handleAdd}
            disabled={false}
          />
          {
            !isLoaded(todos)
              ? <CircularProgress />
              :
                <Paper className={classes.paper}>
                  <Subheader>Todos</Subheader>
                  <List className={classes.list}>
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
                </Paper>
          }
        </div>
      </div>
    )
  }
}
