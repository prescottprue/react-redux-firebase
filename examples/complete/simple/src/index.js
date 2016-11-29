import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import configureStore from './store'

const initialState = window.__INITIAL_STATE__ || {firebase: { authError: null }}

const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={store}><App/></Provider>,
  document.getElementById('root')
)
