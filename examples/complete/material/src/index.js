import React from 'react'
import ReactDOM from 'react-dom'
import { initScripts } from './utils'
import createStore from './store/createStore'
import { version } from '../package.json'
import { env } from './config'
import './index.css'

// import * as serviceWorker from './serviceWorker'
import App from './containers/App'

// Window Variables
// ------------------------------------
window.version = version
window.env = env
initScripts()
// Store Initialization
// ------------------------------------
const initialState = window.___INITIAL_STATE__ || {
  firebase: { authError: null }
}
const store = createStore(initialState)
const routes = require('./routes/index').default(store)

ReactDOM.render(
  <App store={store} routes={routes} />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister()
