# Populate

Populate allows you to replace IDs within your data with other data from Firebase. This is very useful when trying to keep your data flat. Some would call it a _join_, but it was modeled after [the mongo populate method](http://mongoosejs.com/docs/populate.html).

Initial data from populate is placed into redux in a normalized pattern [following defined redux practice of normalizing](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape). `populate` helper used within the `connect` function then builds populated data out of normalized data within redux (**NOTE:** This does not apply if you are using `v1.1.5` or earlier).

A basic implementation can look like so:
```javascript
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, populate } from 'react-redux-firebase'

const populates = [
  { child: 'owner', root: 'users' } // replace owner with user object
]

const enhance = compose(
  firebaseConnect([
    // passing populates parameter also creates all necessary child queries
    { path: 'todos', populates }
  ]),
  connect(({ firebase }) => ({
    // populate original from data within separate paths redux
    todos: populate(firebase, 'todos', populates),
    // firebase.ordered.todos or firebase.data.todos for unpopulated todos
  }))
)

export default enhance(SomeComponent)
```

## Some Things To Note

* Population happens in two parts:
  1. `firebaseConnect` - based on populate settings, queries are created for associated keys to be replaced. Query results are stored in redux under the value of `root` in the populate settings.
  2. `connect` - Combine original data at path with all populate data (in redux from queries created by passing populate settings to `firebaseConnect`)
* Populate creates a query for each key that is being "populated", but does not create multiple queries for the same key
* Results of populate queries are placed under their root

## Examples

List of todo items where todo item can contain an owner parameter which is a user's UID like so:

```json
{ "text": "Some Todo Item", "owner": "Iq5b0qK2NtgggT6U3bU6iZRGyma2" }
```

Populate allows you to replace the owner parameter with another value on Firebase under that key. That value can be a string \(number and boolean treated as string\), or an object

Initial data from populate is placed into redux in a normalized pattern [following defined redux practice of normalizing](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html). `populatedDataToJS` helper used in the `connect` function then builds populated data out of normalized data within redux (**NOTE:** This does not apply if you are using `v1.1.5` or earlier).

##### Example Data
```json
"todos": {
  "ASDF123": {
    "text": "Some Todo Item",
    "owner": "Iq5b0qK2NtgggT6U3bU6iZRGyma2"
   }
 },
 "displayNames": {
   "Iq5b0qK2NtgggT6U3bU6iZRGyma2": "Morty Smith",
   "6Ra53mf3U9Qmdwah6rXBMgY8smu1": "Rick Sanchez"
 }
 "users": {
   "Iq5b0qK2NtgggT6U3bU6iZRGyma2": {
     "displayName": "Morty Smith",
     "email": "mortysmith@gmail.com"
   },
   "6Ra53mf3U9Qmdwah6rXBMgY8smu1": {
     "displayName": "Rick Sanchez",
     "email": "rick@email.com"
   }
 }
```

### String, Number, or Boolean
When trying to replace the owner parameter with a string such as a displayName from a `/displayNames` root follow the pattern of `#populate=paramToPopulate:populateRoot`.

##### Example Query
```javascript
const populates = [
  { child: 'owner', root: 'displayNames' }
]
const enhance = compose(
  firebaseConnect([
    { path: '/todos', populates }
    // '/todos#populate=owner:displayNames', // equivalent string notation
  ]),
  connect(
    ({ firebase }) => ({
      todos: populate(firebase, 'todos', populates),
    })
  )
)
```

##### Result
```javascript
ASDF123: {
  text: 'Some Todo Item',
  owner: 'Morty Smith'
 }
```

### Object
Population can also be used to populate a parameter with an object. An example of this would be populating the `owner` parameter, which is an ID, with the matching key from the `users` list.

##### Example Query
```javascript
const populates = [
  { child: 'owner', root: 'users' }
]
const enhance = compose(
  firebaseConnect([
    { path: '/todos', populates }
    // '/todos#populate=owner:users' // equivalent string notation
  ]),
  connect(
    ({ firebase }) => ({
      todos: populate(firebase, 'todos', populates),
    })
  )
)
```

##### Example Result

```javascript
ASDF123: {
  text: 'Some Todo Item',
  owner: {
    displayName: 'Morty Smith',
    email: 'mortysmith@gmail.com'
  }
}
```

##### Keep Object's Key {#keyProp}

Often when populating, you will want to keep the key that was originally there (before being replaced by populated value). This is supported through the use of `keyProp`:


*NOTE:* Similar results also be accomplished using [`childAlias`](#childAlias) since child (key in this case) will be preserved if populate result is "aliased"

##### Example Query
```javascript
const populates = [
  { child: 'owner', root: 'users', keyProp: 'key' }
]

const enhance = compose(
  firebaseConnect([
    { path: '/todos', populates }
  ]),
  connect(
    ({ firebase }) => ({
      todos: populate(firebase, 'todos', populates),
    })
  )
)
```

##### Example Result

```javascript
ASDF123: {
  text: 'Some Todo Item',
  owner: {
    key: 'Iq5b0qK2NtgggT6U3bU6iZRGyma2',
    displayName: 'Scott Prue',
    email: 'scott@prue.io'
  }
}
```

### Place Result On Another Parameter {#childAlias}

There is also the option to place the results of a populate on another parameter instead of replacing the original child (i.e. "alias" the child result). An example of this could be populating the `owner` parameter onto the `ownerObj` parameter, which would leave the `owner` parameter intact (since the child from the populate was "aliased" to `ownerObj`).

For more details including the initial feature request, checkout [issue #126](https://github.com/prescottprue/react-redux-firebase/issues/126).

##### Example
```javascript
const populates = [
  { child: 'owner', root: 'users', childAlias: 'ownerObj' }
]

const enhance = compose(
  firebaseConnect([
   { path: '/todos', populates }
  ]),
  connect(
    ({ firebase }) => ({
      todos: populate(firebase, 'todos', populates),
    })
  )
)
```

##### Example Result

```javascript
ASDF123: {
  text: 'Some Todo Item',
  owner: "Iq5b0qK2NtgggT6U3bU6iZRGyma2",
  ownerObj: {
    displayName: "Morty Smith",
    email: 'mortysmith@gmail.com',
  }
}
```

### Object's Parameter {#childParam}

There is also the option to load a parameter from within a population object. An example of this could be populating the `owner` parameter with the `email` property of the `user` with a matching ID:

##### Example
```javascript
const populates = [
  { child: 'owner', root: 'users', childParam: 'email' }
]

const enhance = compose(
  firebaseConnect([
   { path: '/todos', populates }
   // '/todos#populate=owner:users:email' // equivalent string notation
  ]),
  connect(
    ({ firebase }) => ({
      todos: populate(firebase, 'todos', populates),
    })
  )
)
```

##### Example Result

```javascript
ASDF123: {
  text: 'Some Todo Item',
  owner: 'mortysmith@gmail.com'
}
```

## Profile Parameters
To Populate parameters within profile/user object, include the `profileParamsToPopulate` parameter within your react-redux-firebase config.

### Parameter

##### Example Config

Populating username with username from usernames ref.

```javascript
const config = {
  userProfile: 'users',
  profileParamsToPopulate: [
    { child: 'displayName', root: 'displayNames' } // object notation
  ]
}
```

##### Initial Data

```javascript
{
  users: {
    $uid: {
      email: 'test@test.com',
      displayName: 'Iq5b0qK2NtgggT6U3bU6iZRGyma2'
    }
  }
}
```

##### Example Result

```javascript
{
  users: {
    $uid: {
      email: 'test@test.com',
      displayName: 'someuser'
    }
  }
}
```

### List of Items

##### Example Config

```javascript
const config = {
  userProfile: 'users',
  profileParamsToPopulate: [ 'todos:todos' ] // populate list of todos from todos ref
}
```

##### Initial Data

```javascript
{
  users: {
    $uid: {
      email: 'test@test.com',
      todos: {
        0: "ASDF123"
      }
    }
  }
}
```

##### Example Result
```javascript
{
  users: {
    $uid: {
      email: 'test@test.com',
      todos: {
        ASDF123: {
          text: 'Some Todo Item',
          owner: "Iq5b0qK2NtgggT6U3bU6iZRGyma2"
        }
      }
    }
  },
  todos: {
    ASDF123: {
      text: 'Some Todo Item',
      owner: "Iq5b0qK2NtgggT6U3bU6iZRGyma2"
    }
  }
}
```
