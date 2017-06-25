# createFirebaseConnect

WARNING!! Advanced feature, and only be used when needing to
access a firebase instance created under a different store key

**Parameters**

-   `storeKey` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of key of store to connect to (store that contains state.firebase)

**Examples**

_Data_

```javascript
import { connect } from 'react-redux'
import { createFirebaseConnect } from 'react-redux-firebase'

// sync /todos from firebase (in other store) into redux
const fbWrapped = createFirebaseConnect('someOtherName')(['todos'])

// pass todos list from redux as this.props.todosList
export default connect(({ firebase: data: { todos }, auth, profile }) => ({
  todos,
  profile, // pass profile data as this.props.profile
  auth // pass auth data as this.props.auth
}))(fbWrapped)
```

Returns **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** that returns a firebaseConnect function, which is later used to wrap a component

# firebaseConnect

**Extends React.Component**

Higher Order Component that automatically listens/unListens
to provided firebase paths using React's Lifecycle hooks.

**Parameters**

-   `watchArray` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array of objects or strings for paths to sync
    from Firebase. Can also be a function that returns the array. The function
    is passed the current props and the firebase object.

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
import { firebaseConnect } from 'react-redux-firebase'

// sync /todos from firebase into redux
const fbWrapped = firebaseConnect([
  'todos'
])(App)

// pass todos list from redux as this.props.todosList
export default connect(({ firebase: data: { todos }, auth, profile }) => ({
  todos,
  profile, // pass profile data as this.props.profile
  auth // pass auth data as this.props.auth
}))(fbWrapped)
```

Returns **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** that accepts a component to wrap and returns the wrapped component
