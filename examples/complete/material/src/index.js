import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { browserHistory } from 'react-router'
import { Route, IndexRoute, Router } from 'react-router'
import Account from './containers/Account/Account'
import App from './containers/App/App'
import Home from './containers/Home/Home'
import Login from './containers/Login/Login'
import NotFound from './containers/NotFound/NotFound'
import Signup from './containers/Signup/Signup'

const initialState = window.__INITIAL_STATE__ || {firebase: { authError: null }}

const store = configureStore(initialState, browserHistory)

let rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='account' component={Account} />
        <Route path='login' component={Login} />
        <Route path='signup' component={Signup} />
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>, rootElement
)
