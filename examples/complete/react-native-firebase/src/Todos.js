import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native'
import { isLoaded, isEmpty, firebaseConnect } from 'react-redux-firebase';
import MessageView from './MessageView';

const testTodo = { text: 'Build Things', isComplete: false }

const Todos = ({ todos, firebase }) => {
  if (!isLoaded(todos)) {
    return <MessageView message="Loading..." />
  }
  if (isEmpty(todos)) {
    return (
      <MessageView
        message="No Todos Found"
        onNewTouch={() => firebase.push('todos', testTodo)}
        showNew
      />
    )
  }
  return (
    <View>
      <Text>Todos</Text>
      {
        Object.keys(todos).map((key, id) => (
          <View key={key}>
            <Text>{todos[key].text}</Text>
            <Text>Complete: {JSON.stringify(todos[key].isComplete)}</Text>
          </View>
        ))
      }
    </View>
  )
};

export default compose(
  firebaseConnect([
    { path: 'todos' } // create listener for firebase data -> redux
  ]),
  connect((state) => ({
    todos: state.firebase.data.todos, // todos data from redux -> props.todos
  }))
)(Todos)
