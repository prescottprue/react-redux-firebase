# Populate

Populate allows you to replace IDs within your data with other data from Firebase. This is very useful when trying to keep your data flat. Some would call it a _join_, but it was modeled after [the mongo populate method](http://mongoosejs.com/docs/populate.html).

Initial data from populate is placed into redux in a normalized pattern [following defined redux practice of normalizing](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html). `populatedDataToJS` helper used in the `connect` function then builds populated data out of normalized data within redux (**NOTE:** This does not apply if you are using `v1.1.5` or earlier).

A basic implementation can look like so:
```javascript
const populates = [
  { child: 'owner', root: 'users' } // replace owner with user object
]

@firebaseConnect([
  // passing populates parameter also creates all necessary child queries
  { path: 'todos', populates }
])
@connect(({ firebase }) => ({
  // populate original from data within separate paths redux
  todos: populatedDataToJS(firebase, 'todos', populates),
  // dataToJS(firebase, 'todos') for unpopulated todos
}))
```

## Some Things To Note

* Population happens in two parts:
  1. `firebaseConnect` - based on populate settings, queries are created for associated keys to be replaced. Query results are stored in redux under the value of `root` in the populate settings.
  2. `connect` - Combine original data at path with all populate data (in redux from queries created by passing populate settings to `firebaseConnect`)
* Populate creates a query for each key that is being replaced
* Results of populate queries are placed under their root

## Examples

List of todo items where todo item can contain an owner parameter which is a user's UID like so:

```json
{ "text": "Some Todo Item", "owner": "Iq5b0qK2NtgggT6U3bU6iZRGyma2" }
```


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
@firebaseConnect([
  { path: '/todos', populates }
  // '/todos#populate=owner:displayNames', // equivalent string notation
])
@connect(
  ({ firebase }) => ({
    todos: populatedDataToJS(firebase, 'todos', populates),
  })
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
Population can also be used to populate a parameter with an object. An example of this would be populating the owner parameter, which is an ID, with the matching key from the users list.

##### Example Query
```javascript
const populates = [
  { child: 'owner', root: 'users' }
]
@firebaseConnect([
  { path: '/todos', populates }
  // '/todos#populate=owner:users' // equivalent string notation
])
@connect(
  ({ firebase }) => ({
    todos: populatedDataToJS(firebase, 'todos', populates),
  })
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

### Object's Parameter

There is also the option to load a parameter from within a population object. An example of this could be populating the owner parameter with the displayName property of the user with a matching ID:

##### Example
```javascript
const populates = [
  { child: 'owner', root: 'users', childParam: 'email' }
]
@firebaseConnect([
 { path: '/todos', populates }
 // '/todos#populate=owner:users:email' // equivalent string notation
])
@connect(({ firebase }) => ({
  todos: populatedDataToJS(firebase, 'todos', populates),
}))
```

##### Example Result

```javascript
ASDF123: {
  text: 'Some Todo Item',
  owner: 'mortysmith@gmail.com'
}
```

## Profile Parameters
To Populate parameters within profile/user object, include the `profileParamsToPopulate` parameter when [calling `reactReduxFirebase` in your compose function](/api/compose).

### Parameter

##### Example Config
Populating username with username from usernames ref.

```javascript
const config = {
  userProfile: 'users',
  profileParamsToPopulate: [ 'username:usernames' ]
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
