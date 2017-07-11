import React, { Component, PropTypes } from 'react'
import classes from './TodoItem.scss'
import { ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import Delete from 'material-ui/svg-icons/action/delete'
import { isObject } from 'lodash'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onDeleteClick: PropTypes.func,
    onCompleteClick: PropTypes.func
  }

  render() {
    const { todo, id, onCompleteClick, onDeleteClick } = this.props

    return (
      <div className={classes.container}>
        <ListItem
          leftIcon={
            <Checkbox
              defaultChecked={todo.done}
              onCheck={() => onCompleteClick(todo, todo._key || id)}
            />
          }
          rightIcon={<Delete onClick={() => onDeleteClick(todo._key || id)} />}
          secondaryText={
            <p>
              <span className="TodoItem-Text">
                {todo.text}
              </span>
              <br />
              <span className="TodoItem-Owner">
                Owner:{' '}
                {isObject(todo.owner)
                  ? todo.owner.displayName || todo.owner.username
                  : todo.owner || 'No Owner'}
              </span>
            </p>
          }
          secondaryTextLines={2}
        />
      </div>
    )
  }
}
