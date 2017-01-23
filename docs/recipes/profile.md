### Change Profile
When signing up, you can modify how user profiles written to the database.

```js
// within your createStore.js or store.js file include the following config
const config = {
  userProfile: 'users', // where profiles are stored in database
  profileFactory: (userData) => { // how profiles are stored in database
    const { user } = userData
    return {
      email: user.email
    }
  }
}
```

### Populate Parameters
If profile object contains an key or a list of keys as parameters, you can populate those parameters with the matching value from another location on firebase.

#### List
profile.contacts contains a list of user UIDs that should be populated from the users list like so:
```js
{
  displayName: 'Rick Sanchez',
  email: 'rick@rickandmorty.com',
  contacts: [
    'QvXyh688YNV29QuhCTXeOXnHt282',
    'T8Wh9CMHIxT1f9mA5oEETNrOOlt1'
  ]
}
```

Setting config like this:

```js
const config = {
  userProfile: 'users', // where profiles are stored in database
  profileParamsToPopulate: [
    'contacts:users'
  ]
}
```

Results in profile with populated contacts parameter:

```js
{
  displayName: 'Rick Sanchez',
  email: 'rick@rickandmorty.com',
  contacts: [
    {
      email: 'some@email.com',
      displayName: 'some one'
    },
     {
      email: 'adude@awebsite.com',
      displayName: 'A Dude'
    }
  ]
}
```
