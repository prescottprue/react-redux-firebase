import React from 'react' // eslint-disable-line
import { Route, IndexRoute, Router } from 'react-router'
import Account from './containers/Account/Account'
import App from './containers/App/App'
import Home from './containers/Home/Home'
import Login from './containers/Login/Login'
import NotFound from './containers/NotFound/NotFound'
import Signup from './containers/Signup/Signup'

export default function (history) {
  return (
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='account' component={Account} />
        <Route path='login' component={Login} />
        <Route path='signup' component={Signup} />
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  )
}
