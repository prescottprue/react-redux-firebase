# React Native
**NOTE**: It is suggested that [you use `v2.0.0`](http://docs.react-redux-firebase.com/history/v2.0.0/docs/recipes/react-native.html#native-modules) if you are using `react-native` (required for native modules through [`react-native-firebase`](https://github.com/invertase/react-native-firebase))

In order to get `v1.*.*` working with `react-native` you must pass in `AsyncStorage` from `react-native` [as done in the material example](https://github.com/prescottprue/react-redux-firebase/blob/master/examples/complete/react-native/src/store.js#L13):

```js
import { createStore, compose } from 'redux'
import rootReducer from './reducer' // reducer containing firebaseStateReducer
import { reactReduxFirebase } from 'react-redux-firebase'
import { AsyncStorage } from 'react-native'

const fbConfig = {} // firebase config
const createStoreWithMiddleware = compose(
  reactReduxFirebase(fbConfig,
    {
      userProfile: 'users',
      enableLogging: false,
      ReactNative: { AsyncStorage },
    }
  )
)(createStore)
const store = createStoreWithMiddleware(rootReducer)
```

**NOTE**: Firebase is initialized internally for `v1.*.*`, so you **DO NOT** want to initialize Firebase yourself outside of `react-redux-firebase`.

Full project source: [react-native complete example app](https://github.com/prescottprue/react-redux-firebase/tree/master/examples/complete/react-native)

#### Native Modules

If you are looking to use native modules (using [`react-native-firebase`](https://github.com/invertase/react-native-firebase) or other), please [visit the `v2.0.0` docs](http://docs.react-redux-firebase.com/history/v2.0.0/docs/recipes/react-native.html#native-modules).
