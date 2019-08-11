# redux-observable
If you are using `redux-observable`, make sure to set up your redux-observable middleware so that firebase is available within your epics. Here is an example `combineEpics` function:

## Setup
Examples below assume that you have setup `redux-observable` middleware so that firebase is available within your epics.

```javascript
import firebase from 'firebase/app'
import 'firebase/database'
import { combineEpics } from 'redux-observable'

const rootEpic = (...args) =>
  combineEpics(somethingEpic, epic2)(...args)

// then later in your epics
const somethingEpic = (action$, store) =>
  action$.ofType(SOMETHING)
    .map(() =>
      firebase.database().ref('somePath/onFirebase').push({ some: 'data' })
    )
```

## Write User Input To Firebase

`redux-observable` can easily be used with `redux-form` to write changes to Firebase as a user types into an input, [see the `redux-form` recipes section for more details](/docs/recipes/redux-form.md)/

In the Angular world this has been called "3-Way Data Binding".

### Debounced Notifications
Debounce is writing to a ref on Firebase such as `/notifications` (useful so that tons of similar notifications aren't created).

```js
const SEND_NOTIFICATION = 'SEND_NOTIFICATION';

export const notificationEpic = (action$, { getState, dispatch }) =>
  action$.ofType(SEND_NOTIFICATION) // stream of notification actions
    .debounceTime(2000) // debounce SEND_NOTIFICATION actions by 2 seconds
    .do((action) => {
      // push the notification object to the notifications ref
      return firebase.database().ref('notifications').push(action.payload)
    })
    .mapTo({ type: 'EMAIL_NOTIFICATION_CREATED' });
```
