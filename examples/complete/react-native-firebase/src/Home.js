import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isLoaded, isEmpty, firebaseConnect } from 'react-redux-firebase';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import NewTodo from './NewTodo'
import Todos from './Todos'

class Home extends React.Component {
  state = {
    text: null
  }

  completeTodo = (key, todo) => {
    return this.props.firebase.update(`todos/${key}`, { done: !todo.done })
  }

  addTodo = () => {
    const { text } = this.state;
    return this.props.firebase.push('todos', { text, completed: false });
  }

  render() {
    const { todos } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Todos</Text>
        <NewTodo
          onNewTouch={this.addTodo}
          newValue={this.state.text}
          onInputChange={(v) => this.setState({text: v})}
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
    );
  }
}

export default compose(
  firebaseConnect([
    { path: 'todos', queryParams: ['limitToLast=10'] } // create listener for firebase data -> redux
  ]),
  connect((state) => ({
    // todos: state.firebase.data.todos, // todos data object from redux -> props.todos
    todos: state.firebase.ordered.todos, // todos ordered array from redux -> props.todos
  }))
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
