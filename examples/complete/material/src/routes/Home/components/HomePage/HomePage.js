import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { firebaseConnect, populate } from 'react-redux-firebase'
import Theme from 'theme'
import { withNotifications } from 'modules/notification'
import NewTodoPanel from '../NewTodoPanel'
import TodosList from '../TodosList'
import classes from './HomePage.scss'

// Populate owner from users collection
const populates = [
  {
    child: 'owner', // parameter to populate
    root: 'users' // collection from which to gather children
    // childAlias: 'ownerObj' // place result somewhere else on object
  }
]

// Component enhancer
const enhance = compose(
  withNotifications, // adds props.showError from notfication module
  firebaseConnect([
    // Create Firebase query for for 20 most recent todos
    {
      path: 'todos',
      queryParams: ['orderByKey', 'limitToLast=10'],
      populates
    }
  ]),
  // firestoreConnect([{ collection: 'todos' }]) // get data from firestore
  connect(({ firebase, firebase: { auth } }) => ({
    uid: auth.uid,
    todos: populate(firebase, 'todos', populates) // populate todos with users data from redux
    // todos: firebase.ordered.todos // if using ordering such as orderByChild or orderByKey
    // todos: firestore.ordered.todos, // firestore data from firestoreConnect
  })),
  withHandlers({
    addNew: props => newTodo =>
      props.firebase.push('todos', {
        ...newTodo,
        owner: props.uid || 'Anonymous'
      }),
    onSubmitFail: props => (formErrs, dispatch, err) =>
      props.showError(formErrs ? 'Form Invalid' : err.message || 'Error')
  })
)

const Home = ({ todos, uid, addNew, onSubmitFail }) => (
  <div
    className={classes.container}
    style={{ color: Theme.palette.primary2Color }}>
    <div className={classes.info}>
      <span>data loaded from</span>
      <span>
        <a href="https://redux-firebasev3.firebaseio.com/">
          redux-firebasev3.firebaseio.com
        </a>
      </span>
      <span className={classes.note}>
        <strong>Note: </strong>
        old data is removed
      </span>
    </div>
    <div className={classes.todos}>
      <NewTodoPanel
        disabled={false}
        onSubmit={addNew}
        onSubmitFail={onSubmitFail}
      />
      <TodosList todos={todos} uid={uid} />
    </div>
  </div>
)

Home.propTypes = {
  todos: PropTypes.oneOfType([
    PropTypes.object, // object if using firebase.data
    PropTypes.array // array if using firebase.ordered
  ]),
  addNew: PropTypes.func.isRequired,
  onSubmitFail: PropTypes.func.isRequired,
  uid: PropTypes.string
}

export default enhance(Home)
