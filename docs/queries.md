# Queries

## Creating

Firebase Real Time Database queries that write data into redux can be created in two ways:

* [Manually](#manual) - Using `watchEvents` or `watchEvent` (requires managing of listeners)
* [Automatically](#firebaseConnect) - Using `firebaseConnect` HOC (manages listeners automatically as component mounts/unmounts)

### Manually {#manual}

Queries can be created manually by using `watchEvent` or `watchEvents`. This is useful to load data on some event such as a button click.

```jsx
import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'

const todosPath = 'todos'

export default function Todos() {
  const firebase = useFirebase()
  const todos = useSelector(state => state.firebase.data[todosPath])

  return (
    <div>
      <h1>Todos</h1>
      <div>
        {JSON.stringify(todos, null, 2)}
      </div>
      <button onClick={() => firebase.watchEvent('value', todosPath)}>
        Load Todos
      </button>
    </div>
  )
}
```

Though doing things manually is great to understand what is going on, it comes with the need to manage these listeners yourself.

**Fun Fact** - `firebaseConnect` actually calls `watchEvents` internally on component mount/unmount and when props change.

### Automatically {#firebaseConnect}

`firebaseConnect` is a Higher Order Component that attaches listeners to Firebase based on provided config when the component is mounting, and removes them when it unmounts. `firebaseConnect` accepts an array of paths for which to create queries. When creating listeners, it is possible to modify the query with any of [Firebase's included query methods](https://firebase.google.com/docs/reference/js/firebase.database.Query).

The results of the queries created by `firebaseConnect` are written into redux state under the path of the query for both `state.firebase.ordered` and `state.firebase.data`. Below are examples using Firebase query config options as well as other options that are included (such as `populates`).

**NOTE:**
By default the results of queries are stored in redux under the path of the query. If you would like to change where the query results are stored in redux, use [`storeAs` (more below)](#storeAs).

```jsx
import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebaseConnect } from 'react-redux-firebase'

export default function Todos () {
  useFirebaseConnect([
    { path: 'todos' }
  ])
  const todos = useSelector(state => state.firebase.ordered.todos)

  return (
    <div>
      <h1>Todos</h1>
      <div>
        {JSON.stringify(todos, null, 2)}
      </div>
    </div>
  )
}
```

**NOTE:**

By default the results of queries are stored in redux under the path of the query. If you would like to change where the query results are stored in redux, use [`storeAs` (more below)](#storeAs).

#### Waiting For Data To Load {#loading}

The `isLoaded` utility is helpful in checking to see if data has loaded. Check loaded state by passing it a list of props:

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { compose } from 'redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

export default function Todos() {
  // Attach listener for todos in Real Time Database
  useFirebaseConnect([
    { path: 'todos' }
  ])
  // Get todos from redux state
  const todos = useSelector(state => state.firebase.ordered.todos)

  // Show message while todos are loading
  if (!isLoaded(todos)) {
    return <div>Loading...</div>
  }

  // Show message if there are no todos
  if (isEmpty(todos)) {
    return <div>Todos List Is Empty</div>
  }

  return (
    <div>
      <h1>Todos</h1>
      <div>
        {JSON.stringify(todos, null, 2)}
      </div>
    </div>
  )
}
```

##### Using HOCs {#loadingHOCs}

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

function Todos({ firebase, todos }) {
  // Show message while todos are loading
  if (!isLoaded(todos)) {
    return <div>Loading...</div>
  }

  // Show message if there are no todos
  if (isEmpty(todos)) {
    return <div>Todos List Is Empty</div>
  }

  return (
    <div>
      <h1>Todos</h1>
      <div>
        {JSON.stringify(todos, null, 2)}
      </div>
    </div>
  )
}

const enhance = compose(
  firebaseConnect((props) => [
    { path: 'todos' }
  ]),
  connect((state) => ({
    todos: state.firebase.data.todos,
  }))
)

export default enhance(Todos)
```

##### Custom Loading HOC {#customLoadingHOC}

Using [`recompose`](https://github.com/acdlite/recompose) is a nice way to keep your react code clean and functional. Useful Higher Order Components are offered such as `branch` (similar to the `if` statements from the last example) making for much cleaner construction of your own HOCs:

```js
import { get, some } from 'lodash'
import LoadingSpinner from 'components/LoadingSpinner' // or wherever your spinner component is
import { isLoaded } from 'react-redux-firebase'
import {
  compose,
  mapProps,
  branch,
  renderComponent
} from 'recompose'

// HOC that shows a component while condition is true
export function renderWhile(condition, component) {
  return branch(condition, renderComponent(component))
}

// HOC that shows loading spinner component while list of propNames are loading
export function spinnerWhileLoadingpropNames {
  return renderWhile(
    props => some(propNames, name => !isLoaded(get(props, name))),
    LoadingSpinner
  )
}

// HOC that shows a component while any of a list of props isEmpty
export function renderIfEmpty(propsNames, component) {
  return renderWhile(
    // Any of the listed prop name correspond to empty props (supporting dot path names)
    props => some(propNames, (name) => {
      const propValue = get(props, name)
      return isLoaded(propValue) && isEmpty(propValue)
    }),
    component
  )
}
```

That can then be used in HOC compositions to wait for data to load like so:

```jsx
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

function EmptyMessage() {
  return <div>No Projects Found</div>
}

const enhance = compose(
  // set/unset listener to "projects" path on component mount/unmount
  firebaseConnect(['projects']),
  // map projects from redux state to props
  connect(({ firebase: { data: { projects } } }) => ({ projects })),
  // show loading spinner while projects are loading
  spinnerWhileLoading(['projects']),
  // render empty message if projects are not found
  renderIfEmpty(['projects'], EmptyMessage)
)
```

#### Formats
Two portions of redux state contain data resulting from queries. `state.firebase.ordered` contains array formatted data while `state.firebase.data` contains data store by key

##### data {#data}

In order to get data from state by key, use `data`.

###### Examples
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

##### ordered {#ordered}

In order to get ordered data, use `ordered`

###### Examples
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

### Types Of Queries

Just [like with Firebase's SDK different event types can be passed to listeners](https://firebase.google.com/docs/reference/js/firebase.database.Reference#on). To Switch the event type of your listener simply pass the `type` parameter to the query config:

```javascript
firebaseConnect([
  { type: 'once', path: '/todos' }
])
```

The options for event type on queries are as follows:
* 'value' - (default) This event will trigger once with the initial data stored at this location, and then trigger again each time the data changes.
* 'once' - Listens for exactly one event of the specified event type, and then stops listening (internally calls [Firebase's `once`](https://firebase.google.com/docs/reference/js/firebase.database.Reference#once))
* 'child_added' - This event will be triggered once for each initial child at this location, and it will be triggered again every time a new child is added
* 'child_removed' - This event will be triggered once every time a child is removed
* 'child_changed' - This event will be triggered when the data stored in a child (or any of its descendants) changes
* 'child_moved' - This event will be triggered when a child's sort order changes such that its position relative to its siblings changes

### Query Params

Query parameters can be passed through the `queryParams` parameter if using object notation, and following a `#` if using string notation.

#### orderByChild
To order the query by a child within each object, use orderByChild.

**Internally Uses Firebase Method**: [ `orderByChild`](https://firebase.google.com/docs/reference/js/firebase.database.Query#order-bychild)

##### Example
Ordering a list of todos by the text parameter of the todo item (placing them in alphabetical order).

```javascript
firebaseConnect([
  { path: '/todos', queryParams: [ 'orderByChild=text' ]}
  // '/todos#orderByChild=text' // string notation
])
```

#### orderByKey
Order a list by the key of each item. Since push keys contain time, this is also a way of ordering by when items were created.

**Internally Uses Firebase Method**:
[ `orderByKey`](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByKey)

##### Example
Ordering a list of todos based on their key (puts them in order of when they were created)

```javascript
firebaseConnect([
  { path: '/todos', queryParams: [ 'orderByKey' ]}
  // '/todos#orderByKey' // string notation
])
```

#### orderByValue
Order a list by the value of each object. Internally runs

**Internally Uses Firebase Method**: [ `orderByValue`](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByValue)

##### Example
Ordering a list of score's based on score's value

```javascript
firebaseConnect([
  { path: '/scores', queryParams: [ 'orderByValue' ] }
  // `scores#orderByValue` // string notation
])
```

#### orderByPriority
Order a list by the priority of each item.

**Internally Uses Firebase Method**: [ `orderByPriority`](https://firebase.google.com/docs/reference/js/firebase.database.Query#orderByPriority)

##### Example
Ordering a list based on priorities

```javascript
firebaseConnect([
  { path: '/scores', queryParams: [ 'orderByPriority' ] }
  // `scores#orderByPriority` // string notation
])
```

**Note:** `orderByChild`, `orderByValue`, and `orderByPriority` enable automatic parsing of query params that follow them for convince. This means that the order of query params can affect which query is created. For example:


More on [`notParsed` below](#notParsed)


#### limitToFirst
Limit query results to the first n number of results.

**Internally Uses Firebase Method**: [ `limitToFirst`](https://firebase.google.com/docs/reference/js/firebase.database.Query#limitToFirst)

##### Examples
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

#### limitToLast
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

#### startAt

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
])
```

#### endAt

End query at a specific location by providing the specific number or value

**Internally Uses Firebase Method**: [ `endAt`](https://firebase.google.com/docs/reference/js/firebase.database.Query#endAt)

##### Examples
1. Usage with startAt
```js
firebaseConnect([
  { path: '/todos', queryParams: [ 'orderByChild=added', 'startAt=1', 'endAt=5' ] }
  // 'todos#orderByChild=added&startAt=1&endAt=5' // string notation
])
```

#### equalTo
Limit query results with parameter equal to previous query method (i.e when used with orderByChild, it limits results with child equal to provided value).

**Internally Uses Firebase Method**: [ `equalTo`](https://firebase.google.com/docs/reference/js/firebase.database.Query#equalTo)

#### Parsing
The following are internally parsed:
  * `null`
  * `boolean`
  * `number`

**Note:** `orderByChild`, `orderByValue`, and `orderByPriority` enable automatic parsing of query params that follow them for convince. This means the actual value will be parsed instead of the string containing the value. For example:

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

##### Examples
1. Order by child parameter
```js
firebaseConnect([
  { path: '/todos', queryParams: [ 'orderByChild=createdBy', 'equalTo=ASD123' ] }
  // 'todos#orderByChild=createdBy&equalTo=ASD123', // string notation
])
```

#### notParsed {#notParsed}

Can be used to keep internal parsing from happening. Useful when attempting to search a number string using `equalTo`

##### Examples
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

#### parsed {#parsed}

Internally parse following query params. Useful when attempting to parse query parameters into the actual value or particular data type ( e.g. null, number, boolean) instead of the string containing the value.

**NOTE**: `orderByChild`, `orderByPriority`, and `orderByValue` will cause this to be enabled by default. Parsing will remain enabled for the rest of the query params until `notParsed` is called.

Added as part of `v2.0.0-beta.17`

##### Examples

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

### storeAs {#storeAs}

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

Data is stored in redux under the path of the query for convenience. This means that two different queries to the same path (i.e. `todos`) will both place data into `state.data.todos` even if their query parameters are different.


### Populate {#populate}

Populate allows you to replace IDs within your data with other data from Firebase. This is very useful when trying to keep your data flat. Some would call it a _join_, but it was modeled after [the mongo populate method](http://mongoosejs.com/docs/populate.html).

Visit [Populate Section](/docs/populate.md) for full documentation.
