# Populate

Populate allows you to replace IDs within your data with other data from Firebase. This is very useful when trying to keep your data flat. Some would call it a _join_, but it was modeled after [the mongo populate method](http://mongoosejs.com/docs/populate.html).

List of todo items where todo item can contain an owner parameter which is a user's UID like so:

```json
{ text: 'Some Todo Item', owner: "Iq5b0qK2NtgggT6U3bU6iZRGyma2" }
```

Populate allows you to replace the owner parameter with another value on Firebase under that key. That value you can be a string \(number and boolean treated as string\), or an object

##### Example Data
```javascript
todos: {
  123: {
    text: 'Some Todo Item',
    owner: "Iq5b0qK2NtgggT6U3bU6iZRGyma2"
   }
 }
 displayNames: {
   Iq5b0qK2NtgggT6U3bU6iZRGyma2: 'Scott Prue',
   6Ra53mf3U9Qmdwah6rXBMgY8smu1: 'Rick Sanchez'
 }
 users: {
   Iq5b0qK2NtgggT6U3bU6iZRGyma2: {
     displayName: 'Scott Prue',
     email: 'scott@prue.io'
   },
   6Ra53mf3U9Qmdwah6rXBMgY8smu1: {
     displayName: 'Rick Sanchez',
     email: 'rick@email.com'
   }
 }
```

### String, Number, or Boolean
When trying to replace the owner parameter with a string such as a displayName from a `/displayNames` root follow the pattern of `#populate=paramToPopulate:populateRoot`.

##### Example Query
```javascript
@firebaseConnect([
  { path: '/todos', populates: [{ child: 'owner', root: 'displayNames' }] }
  // '/todos#populate=owner:displayNames', // equivalent string notation
 ])
```

##### Result
```javascript
123: {
  text: 'Some Todo Item',
  owner: 'Scott Prue'
 }
```

### Object
Population can also be used to populate a parameter with an object. An example of this would be populating the owner parameter, which is an ID, with the matching key from the users list.

##### Example Query
```javascript
@firebaseConnect([
  { path: '/todos', populates: [{ child: 'owner', root: 'users' }] }
  // '/todos#populate=owner:users' // equivalent string notation
 ])
```

##### Example Result

```javascript
123: {
  text: 'Some Todo Item',
  owner: {
    displayName: 'Scott Prue',
    email: 'scott@prue.io'
  }
}
```

### Object's Parameter

There is also the option to load a parameter from within a population object. An example of this could be populating the owner parameter with the displayName property of the user with a matching ID:

##### Example Query
```javascript
@firebaseConnect([
 {
   path: '/todos',
   populates: [
     { child: 'owner', root: 'users', childParam: 'email' }
   ]
 }
 // '/todos#populate=owner:users:email' // equivalent string notation
])
```

##### Example Result

```javascript
123: {
  text: 'Some Todo Item',
  owner: 'scott@prue.io'
}
```
