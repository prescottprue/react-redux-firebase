import React from 'react'
import PropTypes from 'prop-types'
import classes from './TodoItem.scss'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Checkbox from '@material-ui/core/Checkbox'
import Delete from '@material-ui/icons/Delete'
import { isObject } from 'lodash'

const TodoItem = ({ todo, id, onCompleteClick, onDeleteClick, disabled }) => (
  <div className={classes.container}>
    <ListItem>
      <Checkbox
        checked={todo.done}
        disabled={disabled}
        tabIndex={-1}
        disableRipple
        onCheck={() => onCompleteClick(todo, todo._key || id)}
      />
      <ListItemText
        primary={
          <p>
            <span className="TodoItem-Text">{todo.text}</span>
            <br />
            <span className="TodoItem-Owner">
              Owner:{' '}
              {isObject(todo.owner)
                ? todo.owner.displayName || todo.owner.username
                : todo.owner || 'No Owner'}
            </span>
          </p>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Comments"
          disabled={disabled}
          onClick={() => onDeleteClick(todo._key || id)}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  </div>
)

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onDeleteClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  onCompleteClick: PropTypes.func.isRequired
}

export default TodoItem
