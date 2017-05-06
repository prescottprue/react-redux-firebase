import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { map } from 'lodash'
import Theme from 'theme'
import {
  firebaseConnect,
  isLoaded,
  pathToJS,
  // dataToJS, // needed for full list and once
  orderedToJS // needed for ordered list
  // populatedDataToJS // needed for populated list
} from 'react-redux-firebase'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import { List } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import TodoItem from '../components/TodoItem'
import NewTodoPanel from '../components/NewTodoPanel'
import classes from './HomeContainer.scss'

// const populates = [{ child: 'owner', root: 'users', keyProp: 'uid' }]

@firebaseConnect([
  // 'todos' // sync full list of todos
  // { path: 'todos', type: 'once' } // for loading once instead of binding
  { path: 'todos', queryParams: ['orderByKey', 'limitToLast=8'] } // 8 most recent
  // { path: 'todos', populates } // populate
])
@connect(
  ({firebase}) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile'),
    // todos: dataToJS(firebase, 'todos')
    // todos: populatedDataToJS(firebase, '/todos', populates), // if populating
    todos: orderedToJS(firebase, 'todos') // if using ordering such as orderByChild
  })
)
export default class Home extends Component {
  static propTypes = {
    todos: PropTypes.oneOfType([
      PropTypes.object, // object if using dataToJS
      PropTypes.array // array if using orderedToJS
    ]),
    firebase: PropTypes.shape({
      set: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      database: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
      ])
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
    if (!auth || !auth.uid) {
      return this.setState({ error: 'You must be Logged into Toggle Done' })
    }
    firebase.set(`/todos/${id}/done`, !todo.done)
  }

  deleteTodo = (id) => {
    const { auth, firebase } = this.props
    if (!auth || !auth.uid) {
      return this.setState({ error: 'You must be Logged into Delete' })
    }
    // return this.setState({ error: 'Delete example requires using populate' })
    // only works if populated
    // if (todos[id].owner.uid !== auth.uid) {
    //   return this.setState({ error: 'You must own todo to delete' })
    // }
    return firebase.remove(`/todos/${id}`)
  }

  handleAdd = (newTodo) => {
    // Attach user if logged in
    if (this.props.auth) {
      newTodo.owner = this.props.auth.uid
    } else {
      newTodo.owner = 'Anonymous'
    }
    // attach a timestamp
    newTodo.createdAt = this.props.firebase.database.ServerValue.TIMESTAMP
    // using this.props.firebase.pushWithMeta here instead would automatically attach createdBy and createdAt
    return this.props.firebase.push('/todos', newTodo)
  }

  render () {
    const { todos } = this.props
    const { error } = this.state

    return (
      <div className={classes.container} style={{ color: Theme.palette.primary2Color }}>
        {
          error
            ? <Snackbar
              open={!!error}
              message={error}
              autoHideDuration={4000}
              onRequestClose={() => this.setState({ error: null })}
              />
            : null
        }
        <div className={classes.info}>
          <span>data loaded from</span>
          <span>
            <a href='https://redux-firebasev3.firebaseio.com/'>
              redux-firebasev3.firebaseio.com
            </a>
          </span>
          <span style={{ marginTop: '2rem' }}>
            <strong>Note: </strong>
            old data is removed
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
              : <Paper className={classes.paper}>
                <Subheader>Todos</Subheader>
                <List className={classes.list}>
                  {
                    todos &&
                    // todos list is reversed so the most recent is first
                      map(todos.reverse(), (todo, id) => (
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
