# redux-observable
If you are using `redux-observable`, make sure to set up your redux-observable middleware so that firebase is available within your epics. Here is an example `combineEpics` function that adds `getFirebase` as third argument along with an epic that uses it:

```javascript
import { getFirebase } from 'react-redux-firebase'
import { combineEpics } from 'redux-observable'

const rootEpic = (...args) =>
  combineEpics(somethingEpic, epic2)(..args, getFirebase)

// then later in your epics
const somethingEpic = (action$, store, getFirebase) =>
  action$.ofType(SOMETHING)
    .map(() =>
      getFirebase().push('somePath/onFirebase', { some: 'data' })
    )
```

## Write User Input To Firebase

`redux-observable` can easily be used with `redux-form` to write changes to Firebase as a user types into an input, [see the `redux-form` recipes section for more details](/docs/recipes/redux-form.md)/

In the Angular world this has been called "3-Way Data Binding".

### Debounced Notifications
Debounce writing to a ref on Firebase such as `/notifications` (useful so that tons of similar notifications aren't created).

```js
const SEND_NOTIFICATION = 'SEND_NOTIFICATION';

export const notificationEpic = (action$, { getState, dispatch }, { getFirebase }) =>
  action$.ofType(SEND_NOTIFICATION) // stream of notification actions
    .debounceTime(2000) // debounce SEND_NOTIFICATION actions by 2 seconds
    .do((action) => {
      // push the notification object to the notifications ref
      return getFirebase().push('/notifications', action.payload)
    })
    .mapTo({ type: 'EMAIL_NOTIFICATION_CREATED' });
```
