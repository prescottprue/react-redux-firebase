import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import configureStore from './store'

const store = configureStore()

const targetEl = document.getElementById('root')

const node = (<App store={store}/>)
ReactDOM.render(node, targetEl)

