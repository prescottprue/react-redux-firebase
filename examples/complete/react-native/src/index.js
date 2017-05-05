import React from 'react'
import { Component } from 'react-native';
import { Provider } from 'react-redux';

import Home from './Home'

import createStore from './store'

const store = createStore()

const Main = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

export default Main
