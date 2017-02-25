# firebaseConnect

**Extends React.Component**

Higher Order Component that automatically listens/unListens
to provided firebase paths using React's Lifecycle hooks.

**Parameters**

-   `watchArray` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array of objects or strings for paths to sync from Firebase

**Examples**

_Basic_

```javascript
// this.props.firebase set on App component as firebase object with helpers
import { firebaseConnect } from 'react-redux-firebase'
export default firebaseConnect()(App)
```

_Data_

```javascript
import { connect } from 'react-redux'
import { firebaseConnect, helpers } from 'react-redux-firebase'
const { dataToJS } = helpers

// sync /todos from firebase into redux
const fbWrapped = firebaseConnect([
  'todos'
])(App)

// pass todos list from redux as this.props.todosList
export default connect(({ firebase }) => ({
  todosList: dataToJS(firebase, 'todos'),
  profile: pathToJS(firebase, 'profile'), // pass profile data as this.props.proifle
  auth: pathToJS(firebase, 'auth') // pass auth data as this.props.auth
}))(fbWrapped)
```

Returns **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** that accepts a component to wrap and returns the wrapped component
