# State Based Query Example

This example shows using data from redux state to make a query based on props (also known as a dynamic query). A good example of this is querying based on the current user's UID.

**Note:** Example does not use routing, which is what will commonly be used when creating a full application. For how to build with routing, please view [the routing recipes section of the docs.](https://react-redux-firebase.com/docs/recipes/routing.html)

## What It Does

1. Top level component in `Home.js` uses `connect` function to bring `auth` from redux state into a prop name "auth":

    ```js
    // Map redux state to props
    export default connect(state => ({
      auth: state.firebase.auth
    }))(Home)
    ```

1. That component then uses `isLoaded` and `isEmpty` to show different views based on auth state (logged in or not):

    ```js
    function Home({ auth }) {
      // handle initial loading of auth
      if (!isLoaded(auth)) {
        return <div>Loading...</div>
      }

      // User is not logged in, show login view
      if (isEmpty(auth)) {
        return <LoginView />
      }

      // Pass uid to Todos (later used for a listener)
      return <Todos uid={auth.uid} />
    }
    ```

1. The component in `Todos.js` then uses `uid` (from props) as part of a query for todos:

    ```js
    const enhance = compose(
      // Create Real Time Database Listeners on mount
      firebaseConnect(props => [
        // uid comes from props
        {
          path: 'todos',
          queryParams: ['orderByChild=uid', `equalTo=${props.uid}`]
        }
      ]),
      // Map redux state to props
      connect(state => ({
        todos: state.firebase.ordered.todos
      }))
    )
    ```
