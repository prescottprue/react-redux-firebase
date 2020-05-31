# watchEvent snippet

This example shows creating a listener directly using `watchEvent`, which is handled automatically by `firebaseConnect`

## Whats Included

- Basic snippet - Uses `watchEvent` directly
- Recompose snippet - Uses `recompose` to simplify common patterns

## What It Does

1. Top level component uses `connect` function to bring `todos` from redux state into a prop name "todos":

```js
export default compose(
  withFirebase, // add props.firebase
  connect(({ firebase: { data: { todos } } }) => ({
    todos // map todos from redux state to props
  }))
)(SomeThing)
```

1. When the component mounts `watchEvent` is called to attach a listener for `todos` path of real time database
1. That component then uses `isLoaded` and `isEmpty` to show different views based on auth state (whether data is loaded or not):

```js
render () {
  const { todos } = this.props

  if (!isLoaded(todos)) {
    return <div>Loading...</div>
  }

  if (isEmpty(todos)) {
    return <div>No Todos Found</div>
  }

  return <div>{JSON.stringify(todos, null, 2)}</div>
}
```

**NOTE**: This is simplified functionality of what is available through [`firebaseConnect`](https://react-redux-firebase.com/docs/api/firebaseConnect.html) and {`useFirebaseConnect`](https://react-redux-firebase.com/docs/api/useFirebaseConnect.html).
