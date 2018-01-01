import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { Notifications } from 'modules/notification'

// Themeing/Styling
import Theme from 'theme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

export default class AppContainer extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object
  }

  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  getChildContext = () => ({
    muiTheme: getMuiTheme(Theme)
  })

  render() {
    const { routes, store } = this.props
    return (
      <Provider store={store}>
        <div>
          <Router history={browserHistory}>{routes}</Router>
          <Notifications />
        </div>
      </Provider>
    )
  }
}
