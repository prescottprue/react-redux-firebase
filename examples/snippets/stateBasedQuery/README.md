# State Based Query Example

This example shows using data from redux state to be used in queries. A good example of this is querying based on the current user's UID.

**Note** Example does not use routing, which is what will commonly be used when creating a full application. For how to build with routing, please view [the routing recipes section of the docs.](/docs/recipes/routing.md/)

## What It Does

1. Top level component in `Home.js` uses `connect` function to bring `auth` from redux state into a prop name "auth":
  ```js
  export default connect(
    ({ firebase: { auth } }) => ({ auth })
  )(Home)
  ```

1. That component then uses `isLoaded` and `isEmpty` to show different views based on auth state (logged in or not):

  ```js
  const Home = ({ auth }) => {
    // handle initial loading of auth
    if (!isLoaded(auth)) {
      return <div>Loading...</div>
    }

    // auth is empty (i.e. not logged in)
    if (isEmpty(auth)) {
      return <LoginView />
    }

    // auth passed down to TodosView
    return <TodosView auth={auth} />
  }
  ```

1. The component in `Todos.js` then uses `auth.uid` as part of a query for todos:

  ```js
  firebaseConnect(({ auth }) => ([ // auth comes from props
    {
      path: 'todos',
      queryParams: ['orderByChild=uid', `equalTo=${auth}`]
    }
  ]))(authWrappedComponent)
  ```

## Another Way

State can also be accessed through `store` (the second argument of a function passed to `firebaseConnect`) by calling `store.getState()`. There [some possible unintended consequences](#consequences) with using this method that are mentioned below, but it would look like so:

```js
firebaseConnect(
  (props, store) => {
    const { firebase: { auth } } = store.getState()
    // be careful, listeners are not re-attached when auth state changes unless props change
    return [{ path: `todos/${auth.uid || ''}` }]
  }
)
```

#### Possible Unintended Consequences {#consequences}

Listeners are not re-applied based on auth state changing! That means that if your intending to have a query containing `state.firebase.auth.uid`, your component could in theory load before this value is available. If that does happen, and `auth` is not passed as a prop, `firebaseConnect` will not know to re-attach listeners, and only `todos` would load (not `todos/${auth.uid}`). For that reason, this example snippet passes `auth` as a prop after it has been loaded.
