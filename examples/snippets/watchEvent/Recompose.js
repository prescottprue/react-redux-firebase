import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isLoaded, isEmpty, toJS } from 'react-redux-firebase'
import {
  compose,
  lifecycle,
  pure,
  withContext,
  getContext,
  withProps
} from 'recompose'

const SomeThing = ({ todosMap }) => {
  const todos = toJS(todosMap)

  if (!isLoaded(todos)) {
    return <div>Loading...</div>
  }

  if (isEmpty(todos)) {
    return <div>No Todos Found</div>
  }

  return <div>{JSON.stringify(todos, null, 2)}</div>
}

SomeThing.propTypes = {
  todosMap: PropTypes.object
}

// Get Firebase from context.store and pass as props.firebase
const withFirebase = compose(
  withContext({ store: PropTypes.object }, () => {}),
  getContext({ store: PropTypes.object }),
  withProps(({ store }) => ({ firebase: store.firebase.helpers }))
)

// Create enhancer by composing HOCs
const enhance = compose(
  withFirebase,
  lifecycle({
    componentWillMount () {
      this.props.firebase.watchEvent('value', 'todos')
    },
    componentWillUnmount () {
      this.props.firebase.unWatchEvent('value', 'todos')
    }
  }),
  connect(({ firebase }) => ({
    todosMap: firebase.getIn(['data', 'todos']) // pass Immutable map
  })),
  pure // shallowEqual comparison of props for rendering optimization
)

export default enhance(SomeThing)
