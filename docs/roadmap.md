# Roadmap

## Next Minor Version (`v1.6.0`)

#### Features
* Renaming a file on upload (currently does not work due to HTML 5 File element being read only)

#### Enhancements/Fixes
* Fix `TypeError: Converting circular structure to JSON` (through update of firebase version) - [#230](https://github.com/prescottprue/react-redux-firebase/issues/230)

## Future Minor Versions (`v1.7.0 - v1.*.*`)

**Note:** Subject to change

#### Breaking Changes
 *None Yet Planned*

#### Features
* `preserveOnLogout` config option to preserve certain data on logout (already supported in v2.0.0)
* Population of ordered data (already supported in v2.0.0) - [#239](https://github.com/prescottprue/react-redux-firebase/issues/239)
* `childAlias` to store populate result on another parameter - [#126](https://github.com/prescottprue/react-redux-firebase/issues/126)
* `waitForPopulate` option to allow data to be returned before populated data as in becomes available. As of `v1.4.0-rc.2`, populate only sets `isLoaded` to true after all children are loaded, `waitForPopulate` would make this optional - [#121](https://github.com/prescottprue/react-redux-firebase/issues/121)
* Config option for populated items updating when changed - [#69](https://github.com/prescottprue/react-redux-firebase/issues/69)
* Improved support for batching of UI updates as the result of a database "array" loading - [#212](https://github.com/prescottprue/react-redux-firebase/issues/212)
* Expose whole Firebase instance (warning: Using Firebase instance methods will not dispatch actions or update redux state)
* Nested populates [#85](https://github.com/prescottprue/react-redux-firebase/issues/85))
* Support for universal environments (i.e. no `next` function) - [#199](https://github.com/prescottprue/react-redux-firebase/issues/199)
* Option to clear redux data on `firebaseConnect` unmount - [#55](https://github.com/prescottprue/react-redux-firebase/issues/85)

#### Enhancements/Fixes
* Fix `TypeError: Converting circular structure to JSON` (through update of firebase version) - [#230](https://github.com/prescottprue/react-redux-firebase/issues/230)

## Upcoming Major Version (`v2.0.0`)

**NOTE:** The changes are unconfirmed and will most likely change

#### Progress
* All **pre-released** changes for v2.0.0 are located on [the `v2.0.0` branch](https://github.com/prescottprue/react-redux-firebase/tree/v2.0.0)

#### Breaking Changes
* Remove usage of `Immutable.js` and Immutable Maps (no more need for `pathToJS()`, `dataToJS()` or any Immutable helpers to load data from redux)
* Firebase is now initialized outside of `react-redux-firebase` - [#173](https://github.com/prescottprue/react-redux-firebase/issues), [#131](https://github.com/prescottprue/react-redux-firebase/issues), [#107](https://github.com/prescottprue/react-redux-firebase/issues)
* reducer split into multiple nested reducers for a few reasons:
  * Follows [standard for nesting of reducers using combine reducers](http://redux.js.org/docs/recipes/reducers/UpdatingNormalizedData.html)).
  * Allows for separately importable reducers (for placing in other parts of redux other than `state.firebase`)
  * Keeps reducers easier to read, understand, and debug
  * Improved rendering/update performance for `react` - [#84](https://github.com/prescottprue/react-redux-firebase/issues/84)

#### Features
- Integration for [`react-native-firebase`](https://github.com/invertase/react-native-firebase) for using Firebase native modules instead of JS library (allowing for instance to be passed in)  - [#131](https://github.com/prescottprue/react-redux-firebase/issues/131)
- Population of ordered data - [#239](https://github.com/prescottprue/react-redux-firebase/issues/239)
- Support for keeping data on logout - [#125](https://github.com/prescottprue/react-redux-firebase/issues/125)
- Online users/presence functionality based on [firebase's presence example](http://firebase.googleblog.com/2013/06/how-to-build-presence-system.html)
- Built in `react-native` JS (not native modules) support making it no longer necessary to pass `ReactNative` in config
- Detect Non-HTTP environments (such as with SSR) so that `enableRedirectHandling: false` is not required in config
- Track online users and sessions by passing `presence` config option (string or function)
- Support passing Firebase app passed instead of full firebase lib (pass around a smaller object) - [#249](https://github.com/prescottprue/react-redux-firebase/issues/249), [#250](https://github.com/prescottprue/react-redux-firebase/issues/250)
- `store.firebaseAuthIsReady` promise for confirming auth is ready (useful on App boot) - [#264](https://github.com/prescottprue/react-redux-firebase/issues/264)

#### Under Consideration
* Possibility of delayed initialization - [#70](https://github.com/prescottprue/react-redux-firebase/issues/70) (more research needed)
* `authRequired` or `dataLoaded` Higher Order Components (or HOC factory) that force data to exist before rendering component (made much easier using `recompose`)

### Long Term Goals
* Optional Built in Role Management
* Multi-level population
* Population rules suggestion/generation
* Routing decorators (most likely to include `@authRequired`, `@dataLoaded` and `@redirectOnAuth`)
