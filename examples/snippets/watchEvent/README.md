# watchEvent snipppet

This example shows creating a listener directly using `watchEvent`, which is handled automatically by `firebaseConnect`

## Whats Included

* Basic snippet - Uses `watchEvent` directly
* Recompose snippet - Uses `recompose` to simplify common patterns

## What It Does

1. Top level component uses `connect` function to bring `todos` from redux state into a prop name "todosMap" (an ImmutableJS map):
  ```js
  export default connect(
    ({ firebase }) => ({
      todosMap: firebase.getIn(['data', 'todos']) // pass Immutable map
    })
  )(SomeThing)
  ```

1. That component then uses `isLoaded` and `isEmpty` to show different views based on auth state (whether data is loaded or not):

  ```js
  render () {
    const { todosMap } = this.props
    const todos = toJS(todosMap)

    if (!isLoaded(todos)) {
      return <div>Loading...</div>
    }

    if (isEmpty(todos)) {
      return <div>No Todos Found</div>
    }

    return <div>{JSON.stringify(todos, null, 2)}</div>
  }
  ```

1. Todos then uses `auth.uid` as part of a query for todos:

  ```js
  const fbWrappedComponent = firebaseConnect(({ auth }) => ([ // auth comes from props
    {
      path: 'todos',
      queryParams: ['orderByChild=uid', `equalTo=${auth}`]
    }
  ]))(authWrappedComponent)
  ```
