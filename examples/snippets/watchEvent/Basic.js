import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { isLoaded, isEmpty, withFirebase } from 'react-redux-firebase'

class SomeThing extends PureComponent {
  static propTypes = {
    todos: PropTypes.object
  }

  componentWillMount () {
    this.props.firebase.watchEvent('value', 'todos')
  }

  componentWillUnMount () {
    this.props.firebase.unWatchEvent('value', 'todos')
  }

  render () {
    const { todos } = this.props

    if (!isLoaded(todos)) {
      return <div>Loading...</div>
    }

    if (isEmpty(todos)) {
      return <div>No Todos Found</div>
    }

    return <div>{JSON.stringify(todos, null, 2)}</div>
  }
}

export default compose(
  withFirebase, // add props.firebase
  connect(({ firebase: { data: { todos } } }) => ({
    todos // map todos from redux state to props
  })),
)(SomeThing)
