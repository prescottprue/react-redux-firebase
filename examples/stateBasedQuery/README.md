# State Based Query Example

This example shows using data from redux state to be used in queries. A good example of this is querying based on the current user's UID.

## Auth Wrapping
By wrapping component in connect function, you bring `auth` from redux state into a prop name "auth":

```js
const authWrappedComponent = connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth')
  })
)(App)
```
