import React from 'react';
import ReactDOM from 'react-dom';
import { firebaseConnect } from 'react-redux-firebase';

const App = React.createClass({
  render() {
    return (
      <div>Hello World</div>
    );
  }
});

ReactDOM.render(<App/>, document.querySelector('#app'));
