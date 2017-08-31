import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageView = ({ message, showNew = null, onNewTouch }) => (
  <View style={styles.container}>
    <Text>{message}</Text>
    {
      showNew &&
        <TouchableOpacity style={styles.button} onPress={onNewTouch}>
          <Text>Save</Text>
        </TouchableOpacity>
    }
  </View>
);

export default MessageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 100,
    marginTop: 10
  }
});
