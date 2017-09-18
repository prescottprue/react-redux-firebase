import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isLoaded, isEmpty, pathToJS } from 'react-redux-firebase'
import TodosView from './Todos'
import LoginView from './Todos'

class App extends Component {
  static propTypes = {
    auth: PropTypes.object
  }

  render () {
    const { auth } = this.props

    // handle initial loading of auth
    if (!isLoaded(auth)) {
      return <div>Loading...</div>
    }

    if (isEmpty(auth)) {
      return <LoginView />
    }

    return <TodosView auth={auth} />
  }
}

export default connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth')
  })
)(App)
