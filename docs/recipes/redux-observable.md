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

## Write To Firebase As User Types

`redux-observable` can easily be used with `redux-form` to write changes to Firebase as a user types into an input, [see the `redux-form` recipes section for more details](/docs/recipes/redux-form.md)
