# Populate

### Populate Key Within Items in a List

Populate the owner of each item in a todos list from the 'users' root.

#### Examples

##### Populate List of Items

```javascript
import { connect } from 'react-redux'
import { firebaseConnect, populatedDataToJS } from 'react-redux-firebase'

const populates = [
  { child: 'owner', root: 'users' }
]
@firebaseConnect([
  { path: '/todos', populates }
])
@connect(
  ({ firebase }) => ({
    todos: populatedDataToJS(firebase, 'todos', populates),
  })
)
```

### Populate Profile Parameters

To Populate parameters within profile/user object, include the `profileParamsToPopulate` parameter when [calling `reactReduxFirebase` in your compose function](/api/compose).

#### Examples

##### Populate List of Items

```javascript
const config = {
  userProfile: 'users',
  profileParamsToPopulate: [ 'todos:todos' ] // populate list of todos from todos ref
}
```
