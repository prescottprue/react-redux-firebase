import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

const NewTodo = ({ newValue, onInputChange, onNewTouch }) => (
  <View>
    <TextInput
      onChangeText={onInputChange}
      style={styles.input}
      value={newValue}
    />
    <TouchableOpacity style={styles.button} onPress={onNewTouch}>
      <Text>Add Todo</Text>
    </TouchableOpacity>
  </View>
)

export default NewTodo;

const styles = StyleSheet.create({
  button: {
    height: 50,
    marginBottom: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  input: {
    height: 40,
    backgroundColor: '#fafafa',
    borderColor: 'grey',
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15
  }
});
