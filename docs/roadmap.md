# Roadmap

## Short Term
* List Population within user profile parameter (only single parameter currently supported)
* Implement [`firebase-server`](https://github.com/urish/firebase-server) for tests instead of using demo firebase instance
* `firebase-admin` integration
* Huge App Example with passing of props to child routes

### Long Term
* Routing decorators (most likely to include `@AuthRequired`, `@DataLoaded` and `@RedirectOnAuth`)
* Optional Built in Role Management
* Multi-level population
* Population rules suggestion/generation
* Population performance measurement

## Pre-release Versions

### `v1.2.0-alpha` (released)

#### Breaking Changes
* `profileDecorator` config option renamed to `profileFactory` for clarity
* default file metadata written to database includes `downloadURL` instead of `downloadURLs` array

#### Enhancements
* Config params type validation
* `fileMetadataFactory` config option added to allow control of metadata written to database when using `uploadFile` and `uploadFiles`
* docs improvements

### `v1.2.0-beta`

#### Breaking Changes
*Stay Tuned*

#### Enhancements


## Upcoming Minor Version (`v1.2.0`)

#### Breaking Changes
* `profileDecorator` config option renamed to `profileFactory` for clarity
* default file metadata written to database includes `downloadURL` instead of `downloadURLs` array

#### Enhancements
* Config params type validation
* `fileMetadataFactory` config option added to allow control of metadata written to database when using `uploadFile` and `uploadFiles`
* docs improvements
