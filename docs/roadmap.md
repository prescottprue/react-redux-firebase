# Roadmap

## Recent Minor Version (`v1.4.0`)

#### Features
* `react-native` support (including [complete example](https://github.com/prescottprue/react-redux-firebase/tree/v1.4.0-beta/examples/complete/react-native) app as well as a [create your own recipe](/docs/recipes/react-native.md))
* Server Side Rendering Support ([#72](https://github.com/prescottprue/react-redux-firebase/issues/72))
* Support for Boilerplates ([#53](https://github.com/prescottprue/react-redux-firebase/issues/53))
* Use `prop-types` package instead of `React.PropTypes` [#122](https://github.com/prescottprue/react-redux-firebase/pull/122) - thanks [@petetnt](https://github.com/petetnt)
* `pushWithMeta`, `setWithMeta`, and `updateWithMeta` methods added - write to firebase with createdAt/updatedAt and createdBy/updatedBy
* Fix for `unWatchEvent` helper dispatch mapping (#82)
* `populatedDataToJS` triggers `isLoaded` to be true only when all data is populated (instead of once for unpopulated data) [#121](https://github.com/prescottprue/react-redux-firebase/issues/121)
* Support for `provider.setCustomParameters` on external auth providers (i.e. `provider.setCustomParameters({ prompt: 'select_account' })`)
* `notParsed` query param option added for not parsing when using `equalTo` (for searching numbers stored as strings)
* `profileParamsToPopulate` now works for `$key: true` lists - thanks [@fej-snikduj](https://github.com/fej-snikduj)
* `onRedirectResult` config option added (runs when redirect result occurs)

#### Enhancements/Fixes
* Improvements to Material Example
  * Projects route is now protected (using `UserIsAuthenticated` HOC from `utils/router`)
  * Todos list only displays first 8 (first at the top) - shows using ordering query params
  * Most main routes are now sync (more simple)
* Firebase Library dependency updated to [`v3.9.0`](https://firebase.google.com/support/release-notes/js)
* Fix for `unWatchEvent` helper dispatch mapping ([#82](https://github.com/prescottprue/react-redux-firebase/issues/82))
* Firebase version is no longer fixed ([#109](https://github.com/prescottprue/react-redux-firebase/issues/109))
* Only used parts of Firebase Library imported (shrinks bundle size)
* `build:size` npm script added to generate size report for minified bundle ([#107](https://github.com/prescottprue/react-redux-firebase/issues/107))
* `user` and `credential` are now returned from login method ([#106](https://github.com/prescottprue/react-redux-firebase/issues/106))
* `yarn.lock` file added
* Compose tests improved promise handling (better use of chai-as-promised)
* Fix `profileParamsToPopulate` with `key: true` lists - thanks [@fej-snikduj](https://github.com/fej-snikduj)


## Next Minor Version (`v1.5.0`)
* Setting that allows for `waitForPopulate` to be turned off (i.e. return populated data as in becomes available). As of `v1.4.0-rc.2`, populate only sets `isLoaded` to true after all children are loaded ([#121](https://github.com/prescottprue/react-redux-firebase/issues/121)), `waitForPopulate` would make this optional.
* `updateUser` method for updating currently authenticated user's user object (`/users/${uid}`)
* `updateAuth` method for updating currently authenticated user's auth object [as seen in the Firebase docs](https://firebase.google.com/docs/auth/web/manage-users#get_a_users_provider-specific_profile_information)
* Option to not remove all data on logout (potential config syntax: `preserveOnLogout: ['todos']`)
* Option for populated items updating when changed ([#69](https://github.com/prescottprue/react-redux-firebase/issues/69))

## Future Minor Versions (`v1.6.0 - v1.*.*`)

**Note:** Subject to change

#### Breaking Changes
 *None Yet Planned*

#### Features
* Integration for [`react-native-firebase`](https://github.com/invertase/react-native-firebase) for using Firebase native modules instead of JS library
* Integration for [`react-native-google-signin`](https://github.com/devfd/react-native-google-signin) to simplify react-native authentication implementation
* Nested populates ([#85](https://github.com/prescottprue/react-redux-firebase/issues/85))

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
