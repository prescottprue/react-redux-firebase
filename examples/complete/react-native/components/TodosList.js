import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { compose, withHandlers } from 'recompose'
import Todo from './Todo'

const withTodos = compose(
  firebaseConnect(() => [
    {
      path: 'todos',
      queryParams: ['limitToLast=10']
    }
  ]),
  connect(({ firebase }) => ({
    todos: firebase.ordered.todos
  })),
  withHandlers({
    addTodo: props => () =>
      props.firebase.push('todos', { text: 'sample', done: false })
  })
)

function Todos({ todos }) {
  return (
    <View style={styles.helpContainer}>
      {todos &&
        todos.map((todoItem, i) => <Todo key={i} todoKey={todoItem.key} />)}
    </View>
  )
}

Todos.propTypes = {
  todos: PropTypes.array
}

const styles = StyleSheet.create({
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  }
})

export default withTodos(Todos)
