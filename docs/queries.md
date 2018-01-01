# Queries

## Creating

Firebase Real Time Database queries can be created in two ways:

* [Manually](#manual) - Using `watchEvents` or `watchEvent` (requires managing of listeners)
* [Automatically](#firebaseConnect) - Using `firebaseConnect` HOC (manages mounting/unmounting)

### Manually {#manual}

Queries can be created manually by using `watchEvent` or `watchEvents`. This is useful to load data on some event such as a button click.

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

const Todos = ({ firebase }) => {
  // Build Todos list if todos exist and are loaded
  const todosList = !isLoaded(todos)
    ? 'Loading'
    : isEmpty(todos)
      ? 'Todo list is empty'
      : Object.keys(todos).map(
          (key, id) => <TodoItem key={key} id={id} todo={todos[key]}/>
        )
  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todosList}
      </ul>
      <button onClick={() => firebase.watchEvent('value', 'todos')}>
        Load Todos
      </button>
    </div>
  )
}

export default compose(
  withFirebase, // or firebaseConnect()
  connect(
    (state) => ({
      todos: state.firebase.data.todos,
      // profile: state.firebase.profile // load profile
    })
  )
)(Todos)
```

Though doing things manually is great to understand what is going on, it comes with the need to manage these listeners yourself.

**Fun Fact** - `firebaseConnect` actually calls `watchEvents` internally on component mount/unmount and when props change.

### Automatically {#firebaseConnect}

`firebaseConnect` accepts an array of paths for which to create queries. When listening to paths, it is possible to modify the query with any of [Firebase's included query methods](https://firebase.google.com/docs/reference/js/firebase.database.Query).

The results of the queries created by `firebaseConnect` are written into redux state under the path of the query for both `state.firebase.ordered` and `state.firebase.data`.

**NOTE:**

By default the results of queries are stored in redux under the path of the query. If you would like to change where the query results are stored in redux, use [`storeAs` (more below)](#storeAs).

## Ordered vs Data (by key)

### data {#data}

In order to get data from state by key, use `data`.

#### Examples
1. Get an object of projects by key

```js
compose(
  firebaseConnect(props => [
    { path: 'projects' }
  ]),
  connect((state, props) => ({
    projects: state.firebase.data.projects,
  }))
)
```

### ordered {#ordered}

In order to get ordered data, use `orderedToJS`

#### Examples
1. Get list of projects ordered by key

```js
compose(
  firebaseConnect(props => [
    { path: 'projects', queryParams: ['orderByKey'] }
  ]),
  connect((state, props) => ({
    projects: state.firebase.ordered.projects,
  }))
)
```

## Populate {#populate}

Populate allows you to replace IDs within your data with other data from Firebase. This is very useful when trying to keep your data flat. Some would call it a _join_, but it was modeled after [the mongo populate method](http://mongoosejs.com/docs/populate.html).

Visit [Populate Section](/docs/populate.md) for full documentation.

## Types of Queries

There are multiple types of queries
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

>>>>>>> master

## once
To load a firebase location once instead of binding, the once option can be used:

**Internally Uses Firebase Method**: [ `orderByPriority`](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByPriority)

```javascript
firebaseConnect([
  { type: 'once', path: '/todos' }
])
```

## Query Params

**Note:** `orderByChild`, `orderByValue`, and `orderByPriority` enable automatic parsing of query params that follow them for convince. This means that the order of query params can affect which query is created. For example:

```js
// Works since limitToFirst and startAt are parsed into numbers
queryParams: [`limitToFirst=${limitToFirst}`, `startAt=${startAt}`, 'orderByValue'],

// COULD CAUSE UNEXPECTED BEHAVIOR!!! Values passed to limitToFirst and startAt will remain as strings (i.e not parsed)
queryParams: ['orderByValue', `limitToFirst=${limitToFirst}`, `startAt=${startAt}`],
```

If you would like to prevent or cause parsing of query params yourself, you can pass [`notParsed`](#notParsed) or [`parsed`](#parsed) as a queryParam:

```js
// limitToFirst and startAt remain as strings and are NOT automatically parsed
queryParams: ['notParsed', `limitToFirst=${limitToFirst}`, `startAt=${startAt}`, 'orderByValue'],
// limitToFirst and startAt are parsed into numbers if possible
queryParams: ['parsed', `limitToFirst=${limitToFirst}`, `startAt=${startAt}`, 'orderByValue'],
```

More on [`notParsed` below](#notParsed)

## orderByChild
To order the query by a child within each object, use orderByChild.

**Internally Uses Firebase Method**: [ `orderByChild`](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByChild)

#### Example
Ordering a list of todos by the text parameter of the todo item (placing them in alphabetical order).

```javascript
firebaseConnect([
  { path: '/todos', queryParams: [ 'orderByChild=text' ]}
  '/todos#orderByChild=text' // string notation
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
  { path: '/todos', queryParams: [ 'orderByKey' ]}
  // '/todos#orderByKey' // string notation
])
```

## orderByValue
Order a list by the value of each object. Internally runs

**Internally Uses Firebase Method**: [ `orderByValue`](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByValue)

#### Example
Ordering a list of score's based on score's value

```javascript
firebaseConnect([
  { path: '/scores', queryParams: [ 'orderByValue' ] }
  // `scores#orderByValue` // string notation
])
```

## orderByPriority
Order a list by the priority of each item.

**Internally Uses Firebase Method**: [ `orderByPriority`](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByPriority)

#### Example
Ordering a list based on priorities

```javascript
firebaseConnect([
  { path: '/scores', queryParams: [ 'orderByPriority' ] }
  // `scores#orderByPriority` // string notation
])
```

## limitToFirst
Limit query results to the first n number of results.

**Internally Uses Firebase Method**: [ `limitToFirst`](https://firebase.google.com/docs/reference/js/firebase.database.Query#limitToFirst)

#### Examples
1. Displaying only the first todo item

  ```javascript
  firebaseConnect([
    { path: '/todos', queryParams: [ 'limitToFirst=1' ] }
    // '/todos#limitToFirst' // string notation
  ])
  ```
2. Displaying only the first 10 todo items

  ```javascript
  firebaseConnect([
    { path: '/todos', queryParams: [ 'orderByChild=createdBy', 'equalTo=123' ] }
    // '/todos#limitToFirst=10' // string notation
  ])
  ```

## limitToLast
Limit query results to the last n number of results

**Internally Uses Firebase Method**: [ `limitToLast`](https://firebase.google.com/docs/reference/js/firebase.database.Query#limitToLast)

#### Examples
1. Only the **last** todo item

  ```javascript
  firebaseConnect([
    { path: '/todos', queryParams: [ 'limitToLast' ] }
    // '/todos#limitToLast' // string notation
  ])
  ```
2. Only the **last 10** todo items

  ```javascript
  firebaseConnect([
    { path: '/todos', queryParams: [ 'limitToLast=10' ] }
    // '/todos#limitToLast=10' // string notation
  ])
  ```

## startAt

Start query at a specific location by providing the specific number or value

**Internally Uses Firebase Method**: [ `startAt`](https://firebase.google.com/docs/reference/js/firebase.database.Query#startAt)

#### Examples

1. Starting at the fifth item
  ```js
  firebaseConnect([
    { path: '/todos', queryParams: [ 'startAt=5', 'limitToFirst=2' ] }
    // 'todos#startAt=5&limitToFirst=2' // string notation
  ])
  ```
2. Paginate results
  ```js
  firebaseConnect([
    { path: '/todos', queryParams: [ 'startAt=5', 'limitToFirst=10' ] }
    // 'todos#startAt=5&limitToFirst=10' // string notation
  ])
  ```
3. Non-number values
```js
firebaseConnect([
  { path: '/todos', queryParams: [ 'startAt=5', 'limitToFirst=10' ] }
  // 'todos#startAt=val1&limitToFirst=10' // string notation
])(SomeComponent)
```

## endAt

End query at a specific location by providing the specific number or value

**Internally Uses Firebase Method**: [ `endAt`](https://firebase.google.com/docs/reference/js/firebase.database.Query#endAt)

#### Examples
1. Usage with startAt
```js
firebaseConnect([
  { path: '/todos', queryParams: [ 'orderByChild=added', 'startAt=1', 'endAt=5' ] }
  // 'todos#orderByChild=added&startAt=1&endAt=5' // string notation
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

This means the actual value will be parsed instead of the string containing the value. If you do not want this to happen, look at the [`notParsed` query parameter below](#notParsed).

#### Examples
1. Order by child parameter
```js
firebaseConnect([
  { path: '/todos', queryParams: [ 'orderByChild=createdBy', 'equalTo=ASD123' ] }
  // 'todos#orderByChild=createdBy&equalTo=ASD123', // string notation
])
```


## notParsed {#notParsed}

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

## parsed {#parsed}

Internally parse following query params. Useful when attempting to parse

**NOTE**: `orderByChild`, `orderByPriority`, and `orderByValue` will cause this to be enabled by default. Parsing will remain enabled for the rest of the query params until `notParsed` is called.

Added as part of `v2.0.0-beta.17`

#### Examples

1. Order by child parameter equal to a number string. Equivalent of searching for `'123'` (where as not using `notParsed` would search for children equal to `123`)		

  ```js
  firebaseConnect([
    {
      path: '/todos',
      queryParams: [
        'parsed', // causes automatic parsing
        'equalTo=123' // 123 is treated as a number instead of a string
        'orderByChild=createdBy',
      ]
    }
  ])
  ```

## storeAs {#storeAs}

By default the results of queries are stored in redux under the path of the query. If you would like to change where the query results are stored in redux, use `storeAs`.

#### Examples
1. Querying the same path with different query parameters

```js
const myProjectsReduxName = 'myProjects'

compose(
  firebaseConnect(props => [
    { path: 'projects' },
    {
      path: 'projects',
      storeAs: myProjectsReduxName,
      queryParams: ['orderByChild=uid', '123']
    }
  ]),
  connect((state, props) => ({
    projects: state.firebase.data.projects,
    myProjects: state.firebase.data[myProjectsReduxName], // use storeAs path to gather from redux
  }))
)
```

#### Why?

Data is stored in redux under the path of the query for convince. This means that two different queries to the same path (i.e. `todos`) will both place data into `state.data.todos` even if their query parameters are different.

## Populate {#populate}

Populate allows you to replace IDs within your data with other data from Firebase. This is very useful when trying to keep your data flat. Some would call it a _join_, but it was modeled after [the mongo populate method](http://mongoosejs.com/docs/populate.html).

Visit [Populate Section](/docs/populate.md) for full documentation.
