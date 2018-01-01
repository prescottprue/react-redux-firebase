import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { branch, renderComponent } from 'recompose';
import { isLoaded, isEmpty, firebaseConnect } from 'react-redux-firebase';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { spinnerWhileLoading } from './utils';
import NewTodo from './NewTodo';
import Todos from './Todos';

const enhnace = compose(
  // Create listener for todos path when component mounts
  firebaseConnect([
    { path: 'todos', queryParams: ['limitToLast=10'] } // create listener for firebase data -> redux
  ]),
  // Pass data from redux as a prop
  connect((state) => ({
    // todos: state.firebase.data.todos, // todos data object from redux -> props.todos
    todos: state.firebase.ordered.todos, // todos ordered array from redux -> props.todos
  })),
  // Add handler for toggling todo
  withHandlers({
    toggleTodoComplete: ({ firebase }) => (todoId, todo) =>
      firebase.update(`todos.${todoId}`, { done: !todo.done })
  }),
  // Show activity indicator while loading todos
  spinnerWhileLoading(['todos']),
  // Show no Todos when none found
  branch(
    ({ todos }) => !todos || !todos.length,
    renderComponent(
      <View style={styles.container}>
        <Text>No Todos Found</Text>
      </View>
    )
  )
)

const TodosList = ({ todos, toggleTodoComplete }) => (
  <View style={styles.container}>
    <FlatList
      data={todos.reverse()}
      style={styles.list}
      renderItem={({ item: { key, value } }) => (
        <TouchableHighlight onPress={() => toggleTodoComplete(key, value)}>
          <View style={[styles.todo, value.done && styles.completed]}>
            <Text>{value.text}</Text>
            <Text>Done: {value.done === true ? 'True' : 'False'}</Text>
          </View>
        </TouchableHighlight>
      )}
    />
  </View>
)

export default enhnace(TodosList);

const styles = StyleSheet.create({
  list: {
    height: 350,
  },
  todo: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#48BBEC',
    padding: 15
  },
  completed: {
    backgroundColor: '#cccccc'
  }
});
