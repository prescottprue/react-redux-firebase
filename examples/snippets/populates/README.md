# State Based Query Example

This example shows using data from redux state to be used in queries. A good example of this is querying based on the current user's UID.

**Note** Example does not use routing, which is what will commonly be used when creating a full application. For how to build with routing, please view [the routing recipes section of the docs.](/docs/recipes/routing.md/)

## What It Does

1. Top level component uses `firebaseConnect` function to set a listener for the `projects` path on firebase. When the listener updates it also goes and gets the object from the `users` path that matches the owner from each project. This will be used in the next step, but for now the data has been loaded into redux.
  ```js
  const populates = [
    { child: 'owner', root: 'users' },
  ]

  @firebaseConnect([
    { path: 'projects', populates },
  ])
  ```

1. Next is the `@connect` function which allows us to grab from redux state and pass that data in as props to the component. In this case we are going to get projects with the owner parameter on each project replaced with the matching user:

  ```js
  @connect(
    ({firebase}) => ({
      projects: populatedDataToJS(firebase, 'projects', populates),
    })
  )
  ```

1. `isLoaded` can be used as usual to wait for data to be loaded. The projects list has the owner parameter "populated" from users.
