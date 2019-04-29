# React Chrome Redux
> Recipe for integrating with [`react-chrome-redux`](https://github.com/tshaddix/react-chrome-redux)

**NOTE:** This recipe is based communications within [issue #157](https://github.com/prescottprue/react-redux-firebase/issues/157) and is not considered "completed". If you have suggestions, please post an issue or reach out over [gitter](https://gitter.im/redux-firebase/Lobby).

Do not use `firebaseConnect` in your content/popup scripts. This is because the `Store` object (the proxyStore in `react-chrome-redux`), is not "composed" with the `reactReduxFirebase` function as it is normally.

Use `react-redux-firebase` in the background script, and communicate with your content/popup using the proxy store and aliases.

Following this pattern allows authenticating the user from the popup:

```js
// in popup, display a login form (component named LoginForm)
// ...
const store = new Store({
  portName: 'example'
});
// ...
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      // USER_LOGGING_IN is defined as an alias in react-chrome-redux
      store.dispatch({ type: 'USER_LOGGING_IN', data: {email: "test", password: "test"}});
    }
  }
// ...
// Do not call firebaseConnect here
export default connect(null, { login })(LoginForm);
```
Then, create your alias in the background script, import `react-redux-firebase` as well as `redux-thunk` to wait for Firebase's reply before updating the state (see reply in [issue #84 on react-chrome-redux](https://github.com/tshaddix/react-chrome-redux/issues/84)).

```js
// in event (background script)
// ...
import thunk from 'redux-thunk'
import { reactReduxFirebase } from 'react-redux-firebase'
// ...
// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig, config)
)(createStore)

const store = createStoreWithFirebase(
  rootReducer,
  {},
  enhancer
)

wrapStore(store, {
  portName: 'example'
});
```
