import React from 'react';
import { Provider } from 'react-redux';
import createStore from './createStore';
import Todos from './Todos';

// Store Initialization
const initialState = { firebase: {} };
const store = createStore(initialState);

const Main = () => (
  <Provider store={store}>
    <Todos />
  </Provider>
);

export default Main;
