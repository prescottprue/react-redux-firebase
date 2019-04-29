# Redux Form Recipes

## Epics

### Setup
Examples below assume that you have setup `redux-observable` middleware so that firebase is available within your epics. View the [setup section of recipes for epics](/recipes/epics).

### redux-form Input
Debounce writing of info that is typed to a ref on Firebase (useful for syncing changes typed into redux-form inputs).

```javascript
import firebase from 'firebase/app'
import 'firebase/database'
import { actionTypes } from 'redux-form';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';

// Watch for redux-form change events
const change = action$ => action$.ofType(actionTypes.CHANGE).debounceTime(200);
// When form fields are blurred (useful for persisting changes added by extensions and auto-fillers)
const blur = action$ => action$.ofType(actionTypes.BLUR);
// Combine form input streams
const formInput = actionStreams$ => Observable.merge(...actionStreams$);

const firebaseSet$ = (path, payload) =>
  Observable.fromPromise(firebase.database().ref(path).set(payload));

export const reduxFormFieldChangeEpic = (action$, { getState, dispatch }) =>
  // create a stream of formInput actions, listen to change and blur events
  formInput([change(action$), blur(action$)])
    .do(({ meta }) => { // create a side-effect for dispatching action before update
      dispatch({
        type: 'FORM_FIELD_UPDATING',
        payload: { meta },
      }); // dispatch updating action
    })
    .switchMap((action) => { // switch the stream to a stream that returns a different stream
      const { meta, payload } = action;
      const path = 'some/path'

      // make call to update firebase
      return firebaseSet$(path, payload)
       // map each promise to an action that indicates the update complete
        .mapTo(({
          type: 'FORM_FIELD_UPDATED',
          payload,
          meta: { path, ...meta },
        }));
    });
```

### redux-form Array
Writing of info that is changed in a redux-form array to firebase.

```js
import firebase from 'firebase/app'
import 'firebase/database'
import { actionTypes } from 'redux-form';
import { get } from 'lodash';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import { actionTypes } from 'redux-form';
// When item is removed from redux-form array
const arrayRemove = action$ => action$.ofType(actionTypes.ARRAY_REMOVE);
// When item is pushed to redux-form array
const arrayPush = action$ => action$.ofType(actionTypes.ARRAY_PUSH);
// Combine form array action streams
const formArrayAction = actionStream$ => Observable.merge(...actionStream$);

export function firebaseSet$(path, payload) {
  return Observable.fromPromise(firebase.database().ref(path).set(payload));
}

export function reduxFormArrayEpic(action$, { getState }) {
  // create a stream of formArray actions, listen to add and remove events
  return formArrayAction([arrayRemove(action$), arrayPush(action$)])
  // map arrayActions to an Observable which is merged in the output Observable of promises
    .mergeMap((action) => {
      const { form } = getState();
      const { meta, meta: { field } } = action;
      const payload = get(form, `${meta.form}.values.${field}`, null);
      const path = 'some/path'

      // make call to update firebase
      return firebaseSet$(path, payload)
       // the action indicating the action was completed
        .mapTo(({
          type: 'FORM_ARRAY_CHANGE',
          payload: meta,
        }));
    });
}
```
