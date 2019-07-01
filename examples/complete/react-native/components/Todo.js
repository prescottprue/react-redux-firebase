import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity, Button } from 'react-native'
import { compose, withHandlers } from 'recompose'
import { withFirebase } from 'react-redux-firebase'
import { connect } from 'react-redux'

const enhance = compose(
  connect(({ firebase }, { todoKey }) => {
    const { text, done } =
      (firebase.data.todos && firebase.data.todos[todoKey]) || {}
    return {
      done,
      text
    }
  }),
  withFirebase,
  withHandlers({
    toggleDone: props => () =>
      props.firebase.update(`todos/${props.todoKey}`, { done: !props.done })
  })
)

function Todo({ done, text, toggleDone }) {
  return (
    <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
      <Button title={done ? 'X' : 'O'} onPress={toggleDone} />
      <Text style={styles.helpLinkText}>{text}</Text>
    </TouchableOpacity>
  )
}

Todo.propTypes = {
  text: PropTypes.string,
  done: PropTypes.bool,
  toggleDone: PropTypes.func
}

export default enhance(Todo)

const styles = StyleSheet.create({
  helpLinkText: {
    fontSize: 25,
    color: '#2e78b7'
  },
  helpLink: {
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row'
  }
})
