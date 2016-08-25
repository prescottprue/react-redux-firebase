import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import createRoutes from './router'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { browserHistory } from 'react-router'

const initialState = window.__INITIAL_STATE__ || {}

const store = configureStore(initialState, browserHistory)

let rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    { createRoutes(browserHistory) }
  </Provider>, rootElement
)
