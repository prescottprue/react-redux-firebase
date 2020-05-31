import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import createStore from './store'

const store = createStore()

const Page = () => (
  <div>Hello World</div>
)

const ConnectedPage = firebaseConnect()(Page)

const App = () => (
  <Provider store={store}>
    <ConnectedPage />
  </Provider>
);

ReactDOM.render(<App/>, document.querySelector('#app'));
