# Queries

When listening to paths, it is possible to modify the query with any of [Firebase's included query methods](https://firebase.google.com/docs/reference/js/firebase.database.Query). Below are examples using Firebase query methods as well as other methods that are included (such as 'populate').

## once
To load a firebase location once instead of binding, the once option can be used:

**Internal Method**: [ `orderByPriority`](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByPriority)

```javascript
@firebaseConnect([
  { type: 'once', path: '/todos' }
])

```

## orderByChild
To order the query by a child within each object, user orderByChild.

**Internal Method**: [ `orderByChild`](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByChild)

#### Example
Ordering a list of todos by the text parameter of the todo item (placing them in alphabetical order).

```javascript
@firebaseConnect([
  '/todos#orderByChild=text'
  // { path: '/todos', queryParams: [ 'orderByChild=text' ]} // object notation
])
```


## orderByKey
Order a list by the key of each item. Since push keys contain time, this is also a way of ordering by when items were created.

**Internal Method**:
[ `orderByKey`](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByKey)

#### Example
Ordering a list of todos based on their key (puts them in order of when they were created)

```javascript
@firebaseConnect([
  '/todos#orderByKey'
  // { path: '/todos', queryParams: [ 'orderByKey' ]} // object notation
])
```

## orderByValue
Order a list by the value of each object. Internally runs

**Internal Method**: [ `orderByValue`](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByValue)

#### Example
Ordering a list of score's based on score's value

```javascript
@firebaseConnect([
  `scores#orderByValue`
  // { path: '/scores', queryParams: [ 'orderByValue' ] } // object notation
])
```

## orderByPriority
Order a list by the priority of each item.

**Internal Method**: [ `orderByPriority`](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByPriority)

#### Example
Ordering a list based on priorities

```javascript
@firebaseConnect([
  `scores#orderByPriority`
  // { path: '/scores', queryParams: [ 'orderByPriority' ] } // object notation
])
```

## limitToFirst
Limit query results to the first n number of results.

**Internal Method**: [ `limitToFirst`](https://firebase.google.com/docs/reference/js/firebase.database.Query#limitToFirst)

#### Examples
1. Displaying only the first todo item

  ```javascript
  @firebaseConnect([
    '/todos#limitToFirst'
    // { path: '/todos', queryParams: [ 'limitToFirst=1' ] } // object notation
  ])
  ```
2. Displaying only the first 10 todo items

  ```javascript
  @firebaseConnect([
    '/todos#limitToFirst=10'
    // { path: '/todos', queryParams: [ 'orderByChild=owner', 'equalTo=123' ] } // object notation
  ])
  ```

## limitToLast
Limit query results to the last n number of results

**Internal Method**: [ `limitToLast`](https://firebase.google.com/docs/reference/js/firebase.database.Query#limitToLast)

#### Examples
1. Only the **last** todo item

  ```javascript
  @firebaseConnect([
    '/todos#limitToLast'
    // { path: '/todos', queryParams: [ 'limitToLast' ] } // object notation
  ])
  ```
2. Only the **last 10** todo items

  ```javascript
  @firebaseConnect([
    '/todos#limitToLast=10'
    // { path: '/todos', queryParams: [ 'limitToLast=10' ] } // object notation
  ])
  ```

## startAt

Limit query results to include a range starting at a specific number

**Internal Method**: [ `limitToLast`](https://firebase.google.com/docs/reference/js/firebase.database.Query#limitToLast)

#### Example

1. Starting at the fifth item
  ```js
  @firebaseConnect([
    'todos#startAt=5&limitToFirst=2'
    // { path: '/todos', queryParams: [ 'startAt=5', 'limitToFirst=2' ] } // object notation
  ])
  ```
2. Paginate results
  ```js
  @firebaseConnect([
    'todos#startAt=5&limitToFirst=10'
    // { path: '/todos', queryParams: [ 'startAt=5', 'limitToFirst=10' ] } // object notation
  ])
  ```

## endAt
```js
@firebaseConnect([
  'todos#orderByChild=added&startAt=1&endAt=5'
  // { path: '/todos', queryParams: [ 'orderByChild=added', 'startAt=1', 'endAt=5' ] } // object notation
])
```

## equalTo
Limit query results with parameter equal to previous query method (i.e when used with orderByChild, it limits results with child equal to provided value). Internally runs [Firebase's `equalTo`](https://firebase.google.com/docs/reference/js/firebase.database.Query#equalTo).

#### Examples
1. Order by child parameter
```js
@firebaseConnect([
  'todos#orderByChild=owner&equalTo=123',
  // { path: '/todos', queryParams: [ 'orderByChild=owner', 'equalTo=123' ] } // object notation
])
```


## Populate {#populate}

Populate allows you to replace IDs within your data with other data from Firebase. This is very useful when trying to keep your data flat. Some would call it a _join_, but it was modeled after [the mongo populate method](http://mongoosejs.com/docs/populate.html).

Visit [Populate Section](/docs/populate.md) for full documentation.
