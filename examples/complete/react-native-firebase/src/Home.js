import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isLoaded, isEmpty, firebaseConnect } from 'react-redux-firebase';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import NewTodo from './NewTodo'
import Todos from './Todos'

const Home = ({ todos }) => (
  <View style={styles.container}>
    <Text style={styles.header}>Todos</Text>
    <TextInput
      onChangeText={onEmailChange}
      style={styles.input}
      value={email}
    />
    <TextInput
      onChangeText={onPasswordChange}
      style={styles.input}
      value={password}
    />
    <TouchableOpacity onPress={props.login}
      <Text>Login</Text>
    </TouchableOpacity>
    <NewTodo
      onNewTouch={this.addTodo}
      newValue={this.state.text}
      onInputChange={onNewTodoChange}
    />
    {
      !isLoaded(todos)
        ? <ActivityIndicator size="large" style={{ marginTop: 100 }}/>
        : null
    }
    {
      isLoaded(todos) && !isEmpty(todos)
        ?
          <Todos
            todos={todos}
            onItemTouch={this.completeTodo}
          />
        :
          <View style={styles.container}>
            <Text>No Todos Found</Text>
          </View>
    }
  </View>
)

export default compose(
  firebaseConnect([
    { path: 'todos', queryParams: ['limitToLast=10'] } // create listener for firebase data -> redux
  ]),
  connect((state) => ({
    // todos: state.firebase.data.todos, // todos data object from redux -> props.todos
    todos: state.firebase.ordered.todos, // todos ordered array from redux -> props.todos
  })),
  withStateHandlers(
    ({ initialText = null }) => ({ text: initialText }),
    {
      onEmailChange: () => email => ({ email }),
      onPasswordChange: () => password => ({ password }),
      onNewTodoChange: () => text => ({ text })
    }
  ),
  withHandlers({
    login: props => () => props.firebase.login(props.email, props.password)
  })
)(Home);

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
