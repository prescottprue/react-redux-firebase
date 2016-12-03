# Config

Config options are passed into `reactReduxFirebase` in your redux `compose` function when creating the store.

## `userProfile`
##### Type `String`
##### Default `undefined` - No user profiles are stored

Enable automatic profile saving by providing the userProfile parameter a path as a string. The path is the location on Firebase at which to store user profile's. Most common option for this `'users'` meaning that user profiles will be placed within the `/users` root of Firebase.

## `enableLogging`
##### Type `Boolean`
##### Default `false`

Enable/Disable Firebase's Database logging

## `profileDecorator`
##### Type `Function`
##### Default `undefined`

##### Description

Function used for creating user's profile based on userData response when authenticating with Firebase. This applies to login and signup with 3rd party providers or customToken logins.

## `updateProfileOnLogin`
##### Type `Boolean`
##### Default `true`

Enable/disable updating user profiles when logging in. Disabling causes user's profile to only be written when initially signing up instead of every time the user logs in.

## `profileParamsToPopulate`
##### Type `Array | String`
##### Default `undefined`

List of params within profile to populate.

#### Example
`profile.contacts` contains a list of user UIDs that should be populated from the users list like so:

```javascript
{
  contacts: [
    '-KVsGJvvgRWWa4ryw8VP',
    '-KVsIHY2hdJMFlBe8gwO'
  ]
}
```

Setting your config like this:

```javascript
{ profileParamsToPopulate: [ 'contacts:users' ] }
```

Results in profile with populated contacts parameter:
```javascript
{
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

