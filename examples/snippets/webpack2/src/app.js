import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import createStore from './store'
import { firebaseConnect } from 'react-redux-firebase';

const store = createStore()

class Page extends Component {
  render() {
    return (
      <div>Hello World</div>
    );
  }
}

const ConnectedPage = firebaseConnect()(Page)

const App = () => (
  <Provider store={store}>
    <ConnectedPage />
  </Provider>
);

ReactDOM.render(<App/>, document.querySelector('#app'));
