import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isLoaded, isEmpty, toJS } from 'react-redux-firebase'

class SomeThing extends PureComponent {
  static propTypes = {
    todosMap: PropTypes.object
  }

  componentWillMount () {
    this.context.store.firebase.helpers.watchEvent('value', 'todos')
  }

  componentWillUnMount () {
    this.context.store.firebase.helpers.unWatchEvent('value', 'todos')
  }

  render () {
    const { todosMap } = this.props
    const todos = toJS(todosMap)

    if (!isLoaded(todos)) {
      return <div>Loading...</div>
    }

    if (isEmpty(todos)) {
      return <div>No Todos Found</div>
    }

    return <div>{JSON.stringify(todos, null, 2)}</div>
  }
}

export default connect(
  ({ firebase }) => ({
    todosMap: firebase.getIn(['data', 'todos']) // pass Immutable map
  })
)(SomeThing)
