# Roadmap

## Recent Minor Version (`v1.3.0`)

**Note:** These changes include the combination of changes from all pre-release versions (`v1.3.0-*`)

### Breaking Changes
* Get ordered data using `orderedToJS(firebase, 'path')` which returns an array
* `commonjs`, `es`, `umd` versions built with Webpack (could cause issues with some webpack configs)
* `INIT_BY_PATH` action type no longer exists (replaced with `UNSET_LISTENER`)
* Action is no longer automatically fired when removing listeners (not enabled by default as it removes data from redux)

### Features
* Webpack 2 support (fixes [#64](https://github.com/prescottprue/react-redux-firebase/issues/64))
* Helpers are available as imports from top level:
```js
import { pathToJS, dataToJS, populatedDataToJS } from 'react-redux-firebase'
```
* Multiple populates now supported (Fixes [#49](https://github.com/prescottprue/react-redux-firebase/issues/49))
* `keyProp` option added to assign key from populate to a property (described in [#40](https://github.com/prescottprue/react-redux-firebase/issues/40))
* `keyProp` usage illustrated within [material example](https://github.com/prescottprue/react-redux-firebase/tree/master/examples/complete/material) (on projects list page)
* `storeAs` capability added allowing for multiple queries on the same route (As requested in [#56](https://github.com/prescottprue/react-redux-firebase/issues/56))
* `storeAs` usage illustrated in [multiple queries example](https://github.com/prescottprue/react-redux-firebase/tree/v1.3.0-rc.1/examples/snippets/multipleQueries)
* `dispatchOnUnsetListener` config option added for enabling dispatching of `UNSET_LISTENER` action (along with matching reducer case which removes data from path) when unsetting listeners
* [material example](https://github.com/prescottprue/react-redux-firebase/tree/master/examples/complete/material) errors fixed (including [#54](https://github.com/prescottprue/react-redux-firebase/issues/54))
* Removed redundant set calls within `SET` case of reducer (unnecessary and can cause `invalid keyPath`)
* Demo now available at [demo.react-redux-firebase.com](https://demo.react-redux-firebase.com)
* Delete project button added to [material example](https://github.com/prescottprue/react-redux-firebase/tree/master/examples/complete/material)

## Upcoming Minor Version (`v1.4.0`)

#### Features
* `react-native` support (progress available on [`react-native` branch](https://github.com/prescottprue/react-redux-firebase/tree/react-native))
* Server Side Rendering Support ([#72](https://github.com/prescottprue/react-redux-firebase/issues/72))
* Support for Boilerplates ([#53](https://github.com/prescottprue/react-redux-firebase/issues/53))
* Use `prop-types` package instead of `React.PropTypes` [#122](https://github.com/prescottprue/react-redux-firebase/pull/122) - Thanks [@petetnt](https://github.com/petetnt)
* `pushWithMeta`, `setWithMeta`, and `updateWithMeta` methods added - write to firebase with createdAt/updatedAt and createdBy/updatedBy
* `populatedDataToJS` triggers `isLoaded` to be true only when all data is populated (instead of once for unpopulated data) [#121](https://github.com/prescottprue/react-redux-firebase/issues/121)
* Support for `setCustomParameters` on external auth providers (i.e. `provider.setCustomParameters({ prompt: 'select_account' })`)

#### Enhancements/Fixes
* Fix for `unWatchEvent` helper dispatch mapping ([#82](https://github.com/prescottprue/react-redux-firebase/issues/82))
* Firebase version is no longer fixed ([#109](https://github.com/prescottprue/react-redux-firebase/issues/109))
* Only used parts of Firebase Library imported (shrinks bundle size)
* `build:size` npm script added to generate size report for minified bundle ([#107](https://github.com/prescottprue/react-redux-firebase/issues/107))
* `user` and `credential` are now returned from login method (solves [#106](https://github.com/prescottprue/react-redux-firebase/issues/106))
* `yarn.lock` file added
* Compose tests improved promise handling (better use of chai-as-promised)
<!-- * Fix `profileParamsToPopulate` with `key: true` lists - thanks [@fej-snikduj](https://github.com/fej-snikduj) -->

## Future Minor Versions (`v1.5.0 - v1.*.*`)

**Note:** Subject to change

#### Breaking Changes
 *None Yet Planned*

#### Features
* Integration for [`react-native-google-signin`](https://github.com/devfd/react-native-google-signin) to simplify react-native authentication implementation
* Option for populated items updating when changed ([#69](https://github.com/prescottprue/react-redux-firebase/issues/69))
* Setting allowing for `waitForPopulate` to be turned off (i.e. return populated data as in becomes available)
* Nested populates [#85](https://github.com/prescottprue/react-redux-firebase/issues/85)
* `updateProfile` method for updating currently authenticated user's profile

#### Enhancements/Fixes
 *None Yet Planned*

## Upcoming Major Version (`v2.0.0`)

**NOTE:** The changes are unconfirmed and will most likely change

#### Progress
  * [`v2.0.0-alpha`](https://github.com/prescottprue/react-redux-firebase/tree/v2.0.0-alpha) has been started, view [the branch](https://github.com/prescottprue/react-redux-firebase/tree/v2.0.0-alpha)

#### Breaking Changes
* Remove usage of `Immutable.js` and Immutable Maps (no more need for `pathToJS()` & `dataToJS()` to load data from redux)
* reducer split into multiple nested reducers for a few reasons:
  * follows [standard for nesting of reducers using combine reducers](http://redux.js.org/docs/recipes/reducers/UpdatingNormalizedData.html)).
  * allows for separately importable reducers (for placing in other parts of redux other than `state.firebase`)
  * Improved rendering/update performance for `react` as described in [#84](https://github.com/prescottprue/react-redux-firebase/issues/84)

#### Features
* `react-native` index file referenced in `package.json` that makes it no longer necessary to pass `ReactNative` in config
* `AuthRequired` decorator (or decorator factory) that forces auth to exist before rendering component
* Possibility of delayed initialization as mentioned in [#70](https://github.com/prescottprue/react-redux-firebase/issues/70) (more research needed)

#### Enhancements/Fixes
* Implement [`firebase-server`](https://github.com/urish/firebase-server) for tests instead of using demo firebase instance

### Long Term Goals
* Routing decorators (most likely to include `@AuthRequired`, `@DataLoaded` and `@RedirectOnAuth`)
* `firebase-admin` integration described in [#22](https://github.com/prescottprue/react-redux-firebase/issues/22)
* `geoFire` integration described in [#32](https://github.com/prescottprue/react-redux-firebase/issues/32)
* Optional Built in Role Management
* Multi-level population
* Population rules suggestion/generation
