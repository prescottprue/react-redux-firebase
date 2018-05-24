import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory, Router } from 'react-router'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import ThemeSettings from 'theme'

const theme = createMuiTheme(ThemeSettings)

const App = ({ routes, store }) => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={browserHistory}>{routes}</Router>
    </Provider>
  </MuiThemeProvider>
)

App.propTypes = {
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default App
