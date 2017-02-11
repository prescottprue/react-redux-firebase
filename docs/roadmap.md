# Roadmap

## Pre-release Versions

### `v1.3.0-alpha`

#### Breaking Changes
  *None Yet Planned*

#### Enhancements
* Helpers such as `pathToJS` and `dataToJS` are now available as top level imports: `import { pathToJS } from 'react-redux-firebase'`
* Browser version now included (built with Webpack)
* Webpack 2 support (along with an example to show necessary config)
* Full Material-UI example including route protection (addresses [#54](https://github.com/prescottprue/react-redux-firebase/issues/54))

## Upcoming Minor Version (`v1.3.0`)

**Note:** These changes include the combination of changes from all pre-release versions

#### Breaking Changes
 *None Yet Planned*

#### Enhancements
* Key within populated data described in [#40](https://github.com/prescottprue/react-redux-firebase/issues/40) *could be moved*
* `storeAs` param for multiple queries on the same route described in [#56](https://github.com/prescottprue/react-redux-firebase/issues/56)
* Multiple populates working as described in [#49](https://github.com/prescottprue/react-redux-firebase/issues/49)
* Other updates to population internals (performance and readability)

## Upcoming Major Version (`v2.0.0`)

**NOTE:** The changes are unconfirmed and will most likely change

#### Breaking Changes
* Remove usage of Immutable Maps (no more need for `pathToJS()` and `dataToJS()` to load data from redux)
* reducer split into multiple nested reducers (follows [standard for nesting of reducers using combine reducers](http://redux.js.org/docs/recipes/reducers/UpdatingNormalizedData.html))

#### Enhancements
* `AuthRequired` decorator (or decorator factory) that forces auth to exist before rendering component
* Implement [`firebase-server`](https://github.com/urish/firebase-server) for tests instead of using demo firebase instance


### Long Term Goals
* Routing decorators (most likely to include `@AuthRequired`, `@DataLoaded` and `@RedirectOnAuth`)
* `firebase-admin` integration described in [#22](https://github.com/prescottprue/react-redux-firebase/issues/22)
* `geoFire` integration described in [#32](https://github.com/prescottprue/react-redux-firebase/issues/32)
* Optional Built in Role Management
* Multi-level population
* Population rules suggestion/generation
