import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isLoaded, isEmpty, withFirebase } from 'react-redux-firebase'
import { compose, lifecycle, pure } from 'recompose'

const SomeThing = ({ todos }) => {
  if (!isLoaded(todos)) {
    return <div>Loading...</div>
  }

  if (isEmpty(todos)) {
    return <div>No Todos Found</div>
  }

  return <div>{JSON.stringify(todos, null, 2)}</div>
}

SomeThing.propTypes = {
  todos: PropTypes.object
}

// Create enhancer by composing HOCs
const enhance = compose(
  withFirebase, // add props.firebase
  lifecycle({
    componentWillMount () {
      this.props.firebase.watchEvent('value', 'todos')
    },
    componentWillUnmount () {
      this.props.firebase.unWatchEvent('value', 'todos')
    }
  }),
  connect(({ firebase: { data: { todos } } }) => ({
    todos  // map todos from redux state to props
  })),
  pure // shallowEqual comparison of props for rendering optimization
)

export default enhance(SomeThing)
