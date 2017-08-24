# Populate

### Populate Key Within Items in a List

Populate the owner of each item in a todos list from the 'users' root.

#### Examples

##### Populate List of Items

```javascript
import { connect } from 'react-redux'
import { firebaseConnect, populate } from 'react-redux-firebase'

const populates = [
  { child: 'owner', root: 'users' }
]
@firebaseConnect([
  { path: 'todos', populates }
])
@connect(
  ({ firebase }) => ({
    todos: populate(firebase, 'todos', populates),
  })
)
```

### Populate Profile Parameters

To Populate parameters within profile/user object, include the `profileParamsToPopulate` parameter when [calling `reactReduxFirebase` in your compose function](/api/compose) as well as using `populate`.

**NOTE** Using `profileParamsToPopulate` no longer automatically populates profile, you must use `populate`. Un-populated profile lives within state under `state.firebase.profile`.

#### Examples

##### Populate Role

Populating a user's role parameter from a list of roles (under `roles` collection).

```javascript
export const profilePopulates = [{ child: 'role', root: 'roles' }]
const config = {
  userProfile: 'users',
  profileParamsToPopulate: profilePopulates // populate list of todos from todos ref
}

// In component
@connect(
  ({ firebase }) => ({
    profile: firebase.profile,
    populatedProfile: populate(firebase, 'profile', profilePopulates),
  })
)
```
