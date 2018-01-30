# Roadmap

## Current Version (`v2.*.*`)

For updates on issues in the current version, visit the [projects page on Github](https://github.com/prescottprue/react-redux-firebase/projects). Issues are assigned to projects as they are opened.

## Next Major Version (`3.*.*`)

### Breaking Changes
* State no longer second argument of functions passed to `firebaseConnect` and `firestoreConnect` HOCs - causes issues including not re-rendering since props are not changing

### Features
* `withPropsFromFirebase` HOC for data from Firebase straight to props (skipping redux)
* Multi-level population
* Option to re-render HOCs (`firebaseConnect` and `firestoreConnect`) based on auth state change - [#367](https://github.com/prescottprue/react-redux-firebase/issues/367)
* Possibility of delayed initialization - [#70](https://github.com/prescottprue/react-redux-firebase/issues/70) (more research needed)
* Higher Order Components (or HOC factory) that force data to exist before rendering component (maybe `AuthRequired` or `DataLoaded`)

## Future Versions
* Population rules suggestion/generation
* Optional Built in Role Management

## Previous Versions (`v1.*.*`)

Note, updates of `v1.*.*` versions have been de-prioritized due to the high adoption of `v2.0.0` syntax.

## `v1.6.0`

#### Features
* Renaming a file on upload (currently does not work due to HTML 5 File element being read only)

#### Enhancements/Fixes
* Fix `TypeError: Converting circular structure to JSON` (through update of firebase version) - [#230](https://github.com/prescottprue/react-redux-firebase/issues/230)

## `v1.7.0 - v1.*.*`

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
