import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Subheader from 'material-ui/Subheader'
import classes from './NewTodoPanel.scss'

export default class NewTodoPanel extends Component {
  static propTypes = {
    onNewClick: PropTypes.func,
    disabled: PropTypes.bool
  }

  handleAdd = () => {
    const { newTodo } = this.refs
    const { text } = this.state
    this.props.onNewClick({ text, done: false })
    newTodo.value = ''
  }

  render() {
    const { disabled } = this.props

    return (
      <Paper className={classes.container}>
        <Subheader>New Todo</Subheader>
        <div className={classes.inputSection}>
          <TextField
            floatingLabelText='New Todo Text'
            ref='newTodo'
            onChange={({ target }) => this.setState({ text: target.value })}
          />
          <IconButton
            onClick={this.handleAdd}
            disabled={disabled}
            tooltipPosition='top-center'
            tooltip={disabled ? 'Login To Add Todo' : 'Add Todo'}
          >
            <ContentAdd />
          </IconButton>
        </div>
      </Paper>
    )
  }
}
