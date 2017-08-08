# Queries

Query listeners are attached by using the `firebaseConnect` higher order component. `firebaseConnect` accepts an array of paths for which to create queries. When listening to paths, it is possible to modify the query with any of [Firebase's included query methods](https://firebase.google.com/docs/reference/js/firebase.database.Query).

**NOTE:**
By default the results of queries are stored in redux under the path of the query. If you would like to change where the query results are stored in redux, use [`storeAs` (more below)](#storeAs).

Below are examples using Firebase query methods as well as other methods that are included (such as 'populate').

## once
To load a firebase location once instead of binding, the once option can be used:

**Internal Method**: [ `orderByPriority`](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByPriority)

```javascript
@firebaseConnect([
  { type: 'once', path: '/todos' }
])

```

## orderByChild
To order the query by a child within each object, use orderByChild.

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
    // { path: '/todos', queryParams: [ 'orderByChild=createdBy', 'equalTo=123' ] } // object notation
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

#### Examples

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

#### Examples
1. Usage with startAt
```js
@firebaseConnect([
  'todos#orderByChild=added&startAt=1&endAt=5'
  // { path: '/todos', queryParams: [ 'orderByChild=added', 'startAt=1', 'endAt=5' ] } // object notation
])
```

## equalTo
Limit query results with parameter equal to previous query method (i.e when used with orderByChild, it limits results with child equal to provided value). Internally runs [Firebase's `equalTo`](https://firebase.google.com/docs/reference/js/firebase.database.Query#equalTo).

### Parsing
The following are internally parsed:
  * `null`
  * `boolean`
  * `number`

This means the actual value will be parsed instead of the string containing the value. If you do not want this to happen, look at the `notParsed` query parameter below.

#### Examples
1. Order by child parameter
```js
@firebaseConnect([
  'todos#orderByChild=createdBy&equalTo=ASD123',
  // { path: '/todos', queryParams: [ 'orderByChild=createdBy', 'equalTo=ASD123' ] } // object notation
])
```

## notParsed

Can be used to keep internal parsing from happening. Useful when attempting to search a number string using `equalTo`

#### Examples
1. Order by child parameter equal to a number string. Equivalent of searching for `'123'` (where as not using `notParsed` would search for children equal to `123`)
```js
@firebaseConnect([
  {
    path: '/todos',
    queryParams: [
      'orderByChild=createdBy',
      'notParsed', // keeps equalTo from automatically parsing
      'equalTo=123'
    ]
  }
])
```


## storeAs {#populate}

By default the results of queries are stored in redux under the path of the query. If you would like to change where the query results are stored in redux, use `storeAs`:

#### Examples
1. Querying the same path with different query parameters

```js
@firebaseConnect(props => [
  { path: 'projects' }
  { path: 'projects', storeAs: 'myProjects', queryParams: ['orderByChild=uid', '123'] }
])
@connect(({ firebase }, props) => ({
  projects: populatedDataToJS(firebase, 'projects'),
  myProjects: populatedDataToJS(firebase, 'myProjects'), // use storeAs path to gather from redux
}))
```

## ordered {#ordered}

In order to get ordered data, use `orderedToJS`

#### Examples
1. Get list of projects ordered by key

```js
@firebaseConnect(props => [
  { path: 'projects', queryParams: ['orderByKey'] }
])
@connect(({ firebase }, props) => ({
  projects: orderedToJS(firebase, 'projects'),
}))
```

## Populate {#populate}

Populate allows you to replace IDs within your data with other data from Firebase. This is very useful when trying to keep your data flat. Some would call it a _join_, but it was modeled after [the mongo populate method](http://mongoosejs.com/docs/populate.html).

Visit [Populate Section](/docs/populate.md) for full documentation.
