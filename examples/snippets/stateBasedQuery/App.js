import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import createStore from './store'
import TodosView from './Todos'
import LoginView from './Todos'

const store = createStore({})

const App = () => (
  <Provider store={store}>
    <ConnectedPage />
  </Provider>
);

ReactDOM.render(<App/>, document.querySelector('#app'));
