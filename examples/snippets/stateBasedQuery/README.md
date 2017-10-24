# State Based Query Example

This example shows using data from redux state to be used in queries. A good example of this is querying based on the current user's UID.

**Note** Example does not use routing, which is what will commonly be used when creating a full application. For how to build with routing, please view [the routing recipes section of the docs.](/docs/recipes/routing.md/)

## What It Does

1. Top level component in `Home.js` uses `connect` function to bring `auth` from redux state into a prop name "auth":
  ```js
  const authWrappedComponent = connect(
    ({ firebase }) => ({
      auth: pathToJS(firebase, 'auth')
    })
  )(App)
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
