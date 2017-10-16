# Queries

Queries can be attached in two different ways:
1. Manually - Call `watchEvents` and `unWatchEvents` directly (such as within component lifecycle hooks)
2. Automatically - Using `firebaseConnect` HOC Wrapper (manages attaching/detaching listeners on component mount/dismount/props change)

## Manually
**NOTE** You must track and unmount all of then listeners you create in this way. [`firebaseConnect`](#automatically) has been created to [do this for you automatically](#automatically).

`watchEvent` and `watchEvents` can be called directly to create listeners. Be careful when doing this though! You will have to track and unmount all of your listeners using either `unWatchEvent` or `unWatchEvents`. `firebaseConnect` has been created to [do this for you automatically](#automatically), but there are still times where it is nice to do it manually.

```js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isLoaded, isEmpty, toJS } from 'react-redux-firebase'

class SomeThing extends PureComponent {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  static propTypes = {
    todosMap: PropTypes.object
  }

  componentWillMount () {
    this.context.store.firebase.helpers.watchEvent('value', 'todos')
  }

  componentWillUnMount () {
    this.context.store.firebase.helpers.unWatchEvent('value', 'todos')
  }

  render () {
    const { todosMap } = this.props

    if (!isLoaded(todosMap)) {
      return <div>Loading...</div>
    }

    if (isEmpty(todosMap)) {
      return <div>No Todos Found</div>
    }
    const todos = toJS(todosMap) // convert ImmutableJS Map to JS Object (not needed in v2)

    return <div>{JSON.stringify(todos, null, 2)}</div>
  }
}

export default connect(
  ({ firebase }) => ({
    todosMap: firebase.getIn(['data', 'todos']) // pass ImmutableJS Map
  })
)(SomeThing)
```

## Automatically {#automatically}

Query listeners are attached by using the `firebaseConnect` higher order component. `firebaseConnect` accepts an array of paths for which to create queries. When listening to paths, it is possible to modify the query with any of [Firebase's included query methods](https://firebase.google.com/docs/reference/js/firebase.database.Query).

**NOTE:**
By default the results of queries are stored in redux under the path of the query. If you would like to change where the query results are stored in redux, use [`storeAs` (more below)](#storeAs).

Below are examples using Firebase query config options as well as other options that are included (such as 'populate').

`firebaseConnect` is a Higher Order Component (wraps a provided component) that attaches listeners to relevant paths on Firebase when mounting, and removes them when unmounting.


## once
To load a firebase location once instead of binding, the once option can be used:

**Internally Uses Firebase Method**: [ `orderByPriority`](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByPriority)

```javascript
firebaseConnect([
  { type: 'once', path: '/todos' }
])
```

## orderByChild
To order the query by a child within each object, use orderByChild.

**Internally Uses Firebase Method**: [ `orderByChild`](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByChild)

#### Example
Ordering a list of todos by the text parameter of the todo item (placing them in alphabetical order).

```javascript
firebaseConnect([
  '/todos#orderByChild=text'
  // { path: '/todos', queryParams: [ 'orderByChild=text' ]} // object notation
])
```

## orderByKey
Order a list by the key of each item. Since push keys contain time, this is also a way of ordering by when items were created.

**Internally Uses Firebase Method**:
[ `orderByKey`](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByKey)

#### Example
Ordering a list of todos based on their key (puts them in order of when they were created)

```javascript
firebaseConnect([
  '/todos#orderByKey'
  // { path: '/todos', queryParams: [ 'orderByKey' ]} // object notation
])
```

## orderByValue
Order a list by the value of each object. Internally runs

**Internally Uses Firebase Method**: [ `orderByValue`](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByValue)

#### Example
Ordering a list of score's based on score's value

```javascript
firebaseConnect([
  `scores#orderByValue`
  // { path: '/scores', queryParams: [ 'orderByValue' ] } // object notation
])
```

## orderByPriority
Order a list by the priority of each item.

**Internally Uses Firebase Method**: [ `orderByPriority`](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByPriority)

#### Example
Ordering a list based on priorities

```javascript
firebaseConnect([
  `scores#orderByPriority`
  // { path: '/scores', queryParams: [ 'orderByPriority' ] } // object notation
])
```

## limitToFirst
Limit query results to the first n number of results.

**Internally Uses Firebase Method**: [ `limitToFirst`](https://firebase.google.com/docs/reference/js/firebase.database.Query#limitToFirst)

#### Examples
1. Displaying only the first todo item

  ```javascript
  firebaseConnect([
    '/todos#limitToFirst'
    // { path: '/todos', queryParams: [ 'limitToFirst=1' ] } // object notation
  ])
  ```
2. Displaying only the first 10 todo items

  ```javascript
  firebaseConnect([
    '/todos#limitToFirst=10'
    // { path: '/todos', queryParams: [ 'orderByChild=createdBy', 'equalTo=123' ] } // object notation
  ])
  ```

## limitToLast
Limit query results to the last n number of results

**Internally Uses Firebase Method**: [ `limitToLast`](https://firebase.google.com/docs/reference/js/firebase.database.Query#limitToLast)

#### Examples
1. Only the **last** todo item

  ```javascript
  firebaseConnect([
    '/todos#limitToLast'
    // { path: '/todos', queryParams: [ 'limitToLast' ] } // object notation
  ])
  ```
2. Only the **last 10** todo items

  ```javascript
  firebaseConnect([
    '/todos#limitToLast=10'
    // { path: '/todos', queryParams: [ 'limitToLast=10' ] } // object notation
  ])
  ```

## startAt

Start query at a specific location by providing the specific number or value

**Internally Uses Firebase Method**: [ `startAt`](https://firebase.google.com/docs/reference/js/firebase.database.Query#startAt)

#### Examples

1. Starting at the fifth item
  ```js
  firebaseConnect([
    'todos#startAt=5&limitToFirst=2'
    // { path: '/todos', queryParams: [ 'startAt=5', 'limitToFirst=2' ] } // object notation
  ])
  ```
2. Paginate results
  ```js
  firebaseConnect([
    'todos#startAt=5&limitToFirst=10'
    // { path: '/todos', queryParams: [ 'startAt=5', 'limitToFirst=10' ] } // object notation
  ])
  ```
3. Non-number values
```js
firebaseConnect([
  'todos#startAt=val1&limitToFirst=10'
  // { path: '/todos', queryParams: [ 'startAt=5', 'limitToFirst=10' ] } // object notation
])
```

## endAt

End query at a specific location by providing the specific number or value

**Internally Uses Firebase Method**: [ `endAt`](https://firebase.google.com/docs/reference/js/firebase.database.Query#endAt)

#### Examples
1. Usage with startAt
```js
firebaseConnect([
  'todos#orderByChild=added&startAt=1&endAt=5'
  // { path: '/todos', queryParams: [ 'orderByChild=added', 'startAt=1', 'endAt=5' ] } // object notation
])
```

## equalTo
Limit query results with parameter equal to previous query method (i.e when used with orderByChild, it limits results with child equal to provided value).

**Internally Uses Firebase Method**: [ `equalTo`](https://firebase.google.com/docs/reference/js/firebase.database.Query#equalTo)

### Parsing
The following are internally parsed:
  * `null`
  * `boolean`
  * `number`

This means the actual value will be parsed instead of the string containing the value. If you do not want this to happen, look at the `notParsed` query parameter below.

#### Examples
1. Order by child parameter
```js
firebaseConnect([
  'todos#orderByChild=createdBy&equalTo=ASD123',
  // { path: '/todos', queryParams: [ 'orderByChild=createdBy', 'equalTo=ASD123' ] } // object notation
])
```

## notParsed

Can be used to keep internal parsing from happening. Useful when attempting to search a number string using `equalTo`

#### Examples
1. Order by child parameter equal to a number string. Equivalent of searching for `'123'` (where as not using `notParsed` would search for children equal to `123`)
```js
firebaseConnect([
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

## ordered {#ordered}

In order to get ordered data, use `orderedToJS`

#### Examples
1. Get list of projects ordered by key

```js
const path = 'projects'

const enhance = compose(
  firebaseConnect(props => [
    { path, queryParams: ['orderByKey'] }
  ]),
  connect(({ firebase }) => ({
    projects: firebase.getIn(['ordered', path]), // ImmutableJS Map
  }))
)
```

## storeAs {#storeAs}

By default the results of queries are stored in redux under the path of the query. If you would like to change where the query results are stored in redux, use `storeAs`:

```js
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

const enhance = compose(
  firebaseConnect([
    {
      path: 'todos',
      storeAs: 'myTodos', // place in redux under "myTodos"
      queryParams: ['orderByChild=createdBy', 'equalTo=123someuid'],
    }
    {
      path: 'todos',
      queryParams: ['limitToFirst=20'],
    }
  ]),
  connect(({ firebase }) => ({
    myTodos: dataToJS(firebase, 'myTodos'), // state.firebase.data.myTodos due to storeAs
    allTodos: dataToJS(firebase, 'todos') // state.firebase.data.todos since no storeAs
  }))
)

// Wrap your component with the enhancer
export default enhance(SomeComponent)
```

#### Examples
1. Querying the same path with different query parameters

```js
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, toJS } from 'react-redux-firebase'

const enhance = compose(
  firebaseConnect(props => [
    { path: 'projects' },
    {
      path: 'projects',
      storeAs: 'myProjects',
      queryParams: ['orderByChild=uid', '123']
    }
  ])
  connect(({ firebase }) => ({
    myProjects: firebase.getIn(['data', 'myProjects']), // state.firebase.data.myProjects due to storeAs
    allProjects: firebase.getIn(['data', 'projects']) // state.firebase.data.todos since no storeAs
  }))
)

const SomeComponent = ({ myProjects, allProjects }) =>
  <div>
    <div>
      <h2>My Projects</h2>
      {JSON.stringify(toJS(myProjects, null, 2))}
    </div>
    <div>
      <h2>All Projects</h2>
      {JSON.stringify(toJS(allProjects, null, 2))}
    </div>
  </div>

// Wrap your component with the enhancer
export default enhance(SomeComponent)
```

#### Why?

Data is stored in redux under the path of the query for convince. This means that two different queries to the same path (i.e. `todos`) will both place data into `state.data.todos` even if their query parameters are different.

## Populate {#populate}

Populate allows you to replace IDs within your data with other data from Firebase. This is very useful when trying to keep your data flat. Some would call it a _join_, but it was modeled after [the mongo populate method](http://mongoosejs.com/docs/populate.html).

Visit [Populate Section](/docs/populate.md) for full documentation.
