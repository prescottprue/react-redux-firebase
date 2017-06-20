# isLoaded

Detect whether items are loaded yet or not

**Parameters**

-   `item` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Item to check loaded status of. A comma seperated list is also acceptable.

**Examples**

```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, dataToJS } from 'react-redux-firebase'
```

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether or not item is loaded

# isEmpty

Detect whether items are empty or not

**Parameters**

-   `item` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Item to check loaded status of. A comma seperated list is also acceptable.
-   `data`  

**Examples**

```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { firebaseConnect, isEmpty, dataToJS } from 'react-redux-firebase'
```

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether or not item is empty

# helpers

Convert parameter under "data" path of Immutable Map to a
Javascript object with parameters populated based on populates array

**Parameters**

-   `firebase` **[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)** Immutable Map to be converted to JS object (state.firebase)
-   `path` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Path of parameter to load
-   `populates` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array of populate objects
-   `notSetValue` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean))** Value to return if value is not found

**Examples**

_Basic_

```javascript
import { connect } from 'react-redux'
import { firebaseConnect, helpers } from 'react-redux-firebase'
const { dataToJS } = helpers
const populates = [{ child: 'owner', root: 'users' }]

const fbWrapped = firebaseConnect([
  { path: '/todos', populates } // load "todos" and matching "users" to redux
])(App)

export default connect(({ firebase }) => ({
  // this.props.todos loaded from state.firebase.data.todos
  // each todo has child 'owner' populated from matching uid in 'users' root
  // for loading un-populated todos use dataToJS(firebase, 'todos')
  todos: populatedDataToJS(firebase, 'todos', populates),
}))(fbWrapped)
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Data located at path within Immutable Map
