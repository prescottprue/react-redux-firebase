# material

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]

[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

This is a "real-world" example, and is based on the output of [`generator-react-firebase`](https://github.com/prescottprue/generator-react-firebase).

## Getting Started

1. Install dependencies: `npm install`

2. Start Development server: `npm start`

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`build`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`build:dev`|Same as `build` but overrides `NODE_ENV` to "development".|
|`build:prod`|Same as `build` but overrides `NODE_ENV` to "production".|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|

## Application Structure

The application structure presented in this boilerplate is **fractal**, where functionality is grouped primarily by feature rather than file type. Please note, however, that this structure is only meant to serve as a guide, it is by no means prescriptive. That said, it aims to represent generally accepted guidelines and patterns for building scalable applications. If you wish to read more about this pattern, please check out this [awesome writeup](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure) by [Justin Greenberg](https://github.com/justingreenberg).

```
.
├── bin                      # Build/Start scripts
├── blueprints               # Blueprint files for redux-cli
├── build                    # All build-related configuration
│   └── webpack              # Environment-specific configuration files for webpack
├── config                   # Project configuration settings
├── server                   # Express application that provides webpack middleware
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── index.html           # Main HTML page container for app
│   ├── main.js              # Application bootstrap and rendering
│   ├── components           # Global Reusable Presentational Components
│   ├── containers           # Global Reusable Container Components
│   ├── layouts              # Components that dictate major page structure
│   ├── routes               # Main route definitions and async split points
│   │   ├── index.js         # Bootstrap main application routes with store
│   │   └── Home             # Fractal route
│   │       ├── index.js     # Route definitions and async split points
│   │       ├── assets       # Assets required to render components
│   │       ├── components   # Presentational React Components
│   │       ├── container    # Connect components to actions and store
│   │       ├── modules      # Collections of reducers/constants/actions
│   │       └── routes **    # Fractal sub-routes (** optional)
│   ├── static               # Static assets (not imported anywhere in source code)
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection
│   └── styles               # Application-wide styles (generally settings)
└── tests                    # Unit tests
```

## Learning Resources

* [Starting out with react-redux-starter-kit](https://suspicious.website/2016/04/29/starting-out-with-react-redux-starter-kit/) is an introduction to the components used in this starter kit with a small example in the end.

### Production

Build code before deployment by running `npm run build`. There are multiple options below for types of deployment, if you are unsure, checkout the Firebase section.

### Deployment
1. Login to [Firebase](firebase.google.com) (or Signup if you don't have an account) and create a new project
2. Install cli: `npm i -g firebase-tools`
3. Login: `firebase login`

#### CI
**Note:** The next steps automatically through config set in the `.travis.yml`. Use `firebase login:ci` to generate a token and set it to `TOKEN` within your travis config.

#### Local
1. Build Project: `npm run build`
2. Confirm Firebase config by running locally: `firebase serve`
3. Deploy to firebase: `firebase deploy`


[npm-image]: https://img.shields.io/npm/v/material.svg?style=flat-square
[npm-url]: https://npmjs.org/package/material
[travis-image]: https://img.shields.io/travis/prescottprue/material/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/prescottprue/material
[daviddm-image]: https://img.shields.io/david/prescottprue/material.svg?style=flat-square
[daviddm-url]: https://david-dm.org/prescottprue/material

[license-image]: https://img.shields.io/npm/l/material.svg?style=flat-square
[license-url]: https://github.com/prescottprue/material/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
