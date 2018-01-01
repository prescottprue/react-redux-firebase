import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isLoaded, isEmpty, firebaseConnect } from 'react-redux-firebase';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import NewTodo from './NewTodo'
import TodosList from './TodosList'

const enhnace = compose(
  connect(({ firebase: { auth } }) => ({
    uid: auth.uid
  })),
  withStateHandlers(
    ({ initialText = '' }) => ({ newTodoText: initialText }),
    {
      onEmailChange: () => email => ({ email }),
      onPasswordChange: () => password => ({ password }),
      onNewTodoChange: () => newTodoText => ({ newTodoText })
    }
  ),
  withHandlers({
    addTodo: props => () => {
      const newTodo = { text: newTodoText || 'Sample Text', owner: props.uid }
      return props.firebase.push('todos', newTodo)
    }
  })
)

const Home = ({ todos, addTodo, onNewTodoChange, newTodoText }) => (
  <View style={styles.container}>
    <Text style={styles.header}>Todos</Text>
    <NewTodo
      onNewTouch={addTodo}
      newValue={newTodoText}
      onInputChange={onNewTodoChange}
    />
    <TodosList />
  </View>
)

export default enhance(Home);

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingLeft: 15,
    paddingRight: 15
  },
  header: {
    alignSelf: 'center',
    marginBottom: 50
  }
});
