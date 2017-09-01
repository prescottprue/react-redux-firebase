import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight
} from 'react-native';

const Todos = ({ todos, onItemTouch }) => (
  <FlatList
    data={todos.reverse()}
    style={styles.list}
    renderItem={({ item: { key, value } }) => (
      <TouchableHighlight onPress={() => onItemTouch(key, value)}>
        <View style={[styles.todo, value.done && styles.completed]}>
          <Text>{value.text}</Text>
          <Text>Done: {value.done === true ? 'True' : 'False'}</Text>
        </View>
      </TouchableHighlight>
    )}
  />
)

export default Todos;

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
