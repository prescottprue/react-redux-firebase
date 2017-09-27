# Roadmap

## Next Minor Version (`v1.5.0`)

**NOTE**: `v1.5.0` is still in pre-release, please check the [releases page](https://github.com/prescottprue/react-redux-firebase/releases) for the most up to date release information

* Use `prop-types` package instead of `React.PropTypes` - [#122](https://github.com/prescottprue/react-redux-firebase/pull/122) - thanks [@petetnt](https://github.com/petetnt)
* New Features for Population - [#132](https://github.com/prescottprue/react-redux-firebase/pull/132) - thanks [@javamonn](https://github.com/javamonn)
  * Lodash supported path syntax for `populates.child`
  * Dynamic populates configurations (passing a function that generates populates config based on top level `(key, item)` tuple)
  * Use `storeAs` with populates - [#130](https://github.com/prescottprue/react-redux-firebase/issues/130)
* `updateUser` method for updating currently authenticated user's user object (`/users/${uid}`)
* `updateAuth` method for updating currently authenticated user's auth object [as seen in the Firebase docs](https://firebase.google.com/docs/auth/web/manage-users#get_a_users_provider-specific_profile_information) - [#129](https://github.com/prescottprue/react-redux-firebase/issues/129)
* Ability to use different stores - [#148](https://github.com/prescottprue/react-redux-firebase/pull/148)
* Expose Firebase messaging (`firebase.messaging()`)
* Typescript typings - [#142](https://github.com/prescottprue/react-redux-firebase/issues/142)
* `enableEmptyAuthChanges` config option added - [#137](https://github.com/prescottprue/react-redux-firebase/issues/137)

#### Enhancements/Fixes
* Return correct promise from `firebase.auth().signOut()` - [#152](https://github.com/prescottprue/react-redux-firebase/issues/152)
* Removed `browser` field from `package.json` so that webpack will point to `main` field - [#128](https://github.com/prescottprue/react-redux-firebase/issues/128)
* Fix `uniqueSet` race condition - [#207](https://github.com/prescottprue/react-redux-firebase/issues/207)
* improved testing of `firebaseConnect` HOC
* Implement [`firebase-server`](https://github.com/urish/firebase-server) for tests instead of using demo firebase instance


## Future Minor Versions (`v1.6.0 - v1.*.*`)

**Note:** Subject to change

#### Breaking Changes
 *None Yet Planned*

#### Features
* `preserveOnLogout` to preserve some data on logout (already supported in v2.0.0)
* Population of ordered data (possibly `populatedOrderToJS`) - [#239](https://github.com/prescottprue/react-redux-firebase/issues/239)
* `childAlias` to store populate result on another parameter - [#126](https://github.com/prescottprue/react-redux-firebase/issues/126)
* `waitForPopulate` option to allow data to be returned before populated data as in becomes available. As of `v1.4.0-rc.2`, populate only sets `isLoaded` to true after all children are loaded, `waitForPopulate` would make this optional - [#121](https://github.com/prescottprue/react-redux-firebase/issues/121)
* Config option for populated items updating when changed - [#69](https://github.com/prescottprue/react-redux-firebase/issues/69)
* Improved support for batching of UI updates as the result of a database "array" loading - [#212](https://github.com/prescottprue/react-redux-firebase/issues/212)
* Expose whole Firebase instance (warning: Using Firebase instance methods will not dispatch actions or update redux state)
* Config option to not remove all data on logout (already in `v2.*.*`)
* Setting that allows for `waitForPopulate` to be turned off (i.e. return populated data as in becomes available). As of `v1.4.0-rc.2`, populate only sets `isLoaded` to true after all children are loaded, `waitForPopulate` would make this optional - [#121](https://github.com/prescottprue/react-redux-firebase/issues/121)
* Integration for [`react-native-google-signin`](https://github.com/devfd/react-native-google-signin) to simplify react-native authentication implementation
* Nested populates - [#85](https://github.com/prescottprue/react-redux-firebase/issues/85)
* Renaming a file on upload (currently does not work due to HTML 5 File element being read only)

#### Enhancements/Fixes
* Fix `TypeError: Converting circular structure to JSON` (through update of firebase version) - [#230](https://github.com/prescottprue/react-redux-firebase/issues/230)

## Future Minor Versions (`v1.*.*`)

**Note:** Subject to change

#### Breaking Changes
 *None Yet Planned*

#### Features
* Nested populates [#85](https://github.com/prescottprue/react-redux-firebase/issues/85))
* Support for universal environments (i.e. no `next` function) - [#199](https://github.com/prescottprue/react-redux-firebase/issues/199)
* Option to clear redux data on `firebaseConnect` unmount - [#55](https://github.com/prescottprue/react-redux-firebase/issues/85)

## Upcoming Major Version (`v2.0.0`)

**NOTE:** The changes are unconfirmed and will most likely change

#### Progress
* All **pre-released** changes for v2.0.0 are located on [the `v2.0.0` branch](https://github.com/prescottprue/react-redux-firebase/tree/v2.0.0)

#### Breaking Changes
* Remove usage of `Immutable.js` and Immutable Maps (no more need for `pathToJS()` & `dataToJS()` to load data from redux)
* Firebase is now initialized outside of `react-redux-firebase` - [#173](https://github.com/prescottprue/react-redux-firebase/issues), [#131](https://github.com/prescottprue/react-redux-firebase/issues), [#107](https://github.com/prescottprue/react-redux-firebase/issues)
* `login` with custom token no longer internally decodes JWT (use `profileFactory` instead to include token data on profile)
* reducer split into multiple nested reducers for a few reasons:
  * follows [standard for nesting of reducers using combine reducers](http://redux.js.org/docs/recipes/reducers/UpdatingNormalizedData.html)).
  * allows for separately importable reducers (for placing in other parts of redux other than `state.firebase`)
  * Improved rendering/update performance for `react` - [#84](https://github.com/prescottprue/react-redux-firebase/issues/84)

#### Features
* Integration for [`react-native-firebase`](https://github.com/invertase/react-native-firebase) for using Firebase native modules instead of JS library (allowing for instance to be passed in).
* Population of ordered data - [#239](https://github.com/prescottprue/react-redux-firebase/issues/239)
* Support for keeping data on logout - [#125](https://github.com/prescottprue/react-redux-firebase/issues/125)
* Online users/presence functionality based on [firebase's presence example](http://firebase.googleblog.com/2013/06/how-to-build-presence-system.html)
* `react-native` index file referenced in `package.json` that makes it no longer necessary to pass `ReactNative` in config
* `AuthRequired` decorator (or decorator factory) that forces auth to exist before rendering component
* Support native modules through [`react-native-firebase`](https://github.com/invertase/react-native-firebase) - [#131](https://github.com/prescottprue/react-redux-firebase/issues/131)
* Track online users and sessions by passing `presence` config option
* Detect Non-HTTP environments (such as with SSR) so that `enableRedirectHandling: false` is not required in config
* Allowing `presence` setting to accept a function for dynamically building presence path based on auth
* Support passing Firebase app passed instead of full firebase lib (pass around a smaller object) - [#249](https://github.com/prescottprue/react-redux-firebase/issues/250), [#250](https://github.com/prescottprue/react-redux-firebase/issues/250)
* Implement [`firebase-server`](https://github.com/urish/firebase-server) for tests instead of using demo firebase instance

#### Under Consideration
* Allowing `presence` setting to accept a function for dynamically building presence path based on auth
* Possibility of delayed initialization - [#70](https://github.com/prescottprue/react-redux-firebase/issues/70) (more research needed)

### Long Term Goals
* Optional Built in Role Management
* Multi-level population
* Population rules suggestion/generation
* Routing decorators (most likely to include `@AuthRequired`, `@DataLoaded` and `@RedirectOnAuth`)
