# material

[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

## Table of Contents

1. [Features](#features)
1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
1. [Application Structure](#application-structure)
1. [Development](#development)
    1. [Routing](#routing)
1. [Configuration](#configuration)
1. [Production](#production)
1. [Deployment](#deployment)

## Requirements

* node `^8`
* npm `^3.0.0`

## Getting Started

1. Install app and functions dependencies: `npm i && npm i --prefix functions` or `yarn install && yarn install --cwd functions`
1. Create `src/config.js` file that looks like so if it does not already exist:
    ```js
    const firebase = {
      // Config from Firebase console
    }

    // Overrides for for react-redux-firebase/redux-firestore config
    export const reduxFirebase = {}

    export default {
      env,
      firebase,
      reduxFirebase
    }
    ```
1. Start Development server: `npm start`

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`    |Description|
|-------------------|-----------|
|`start`            |Serves your app at `localhost:3000` with automatic refreshing and hot module replacement|
|`start:dist`       |Builds the application to `./dist` then serves at `localhost:3000` using `firebase serve`|
|`build`            |Builds the application to `./dist`|
|`lint`             |[Lints](http://stackoverflow.com/questions/8503559/what-is-linting) the project for potential errors|
|`lint:fix`         |Lints the project and [fixes all correctable errors](http://eslint.org/docs/user-guide/command-line-interface.html#fix)|

[Husky](https://github.com/typicode/husky) is used to enable `prepush` hook capability. The `prepush` script currently runs `eslint`, which will keep you from pushing if there is any lint within your code. If you would like to disable this, remove the `prepush` script from the `package.json`.

## Config Files

There are multiple configuration files:

* Firebase Project Configuration (including settings for how `src/config.js` is built on CI) - `.firebaserc`
* Project Configuration used within source (can change based on environment variables on CI) - `src/config.js`
* Cloud Functions Local Configuration - `functions/.runtimeconfig.json`

More details in the [Application Structure Section](#application-structure)

## Application Structure

The application structure presented in this boilerplate is **fractal**, where functionality is grouped primarily by feature rather than file type. Please note, however, that this structure is only meant to serve as a guide, it is by no means prescriptive. That said, it aims to represent generally accepted guidelines and patterns for building scalable applications.

```
├── public                   # All build-related configuration
│   ├── index.html           # Main HTML page container for app
│   ├── scripts              # Scripts used within the building process
│   │  └── compile.js        # Custom Compiler that calls Webpack compiler
│   │  └── start.js          # Starts the custom compiler
├── src                      # Application source code
│   ├── config.js            # Environment specific config file with settings from Firebase (created by CI)
│   ├── components           # Global Reusable Presentational Components
│   ├── constants            # Project constants such as firebase paths and form names
│   │  ├── formNames.js      # Names of redux forms
│   │  └── paths.js          # Paths for application routes
│   ├── containers           # Global Reusable Container Components (connected to redux state)
│   ├── layouts              # Components that dictate major page structure
│   │   └── CoreLayout       # Global application layout in which to render routes
│   ├── routes               # Main route definitions and async split points
│   │   ├── index.js         # Bootstrap main application routes
│   │   └── Home             # Fractal route
│   │       ├── index.js     # Route definitions and async split points
│   │       ├── assets       # Assets required to render components
│   │       ├── components   # Presentational React Components (state connect and handler logic in enhancers)
│   │       ├── modules      # Collections of reducers/constants/actions
│   │       └── routes/**    # Fractal sub-routes (** optional)
│   ├── static               # Static assets
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection
│   ├── styles               # Application-wide styles (generally settings)
│   └── utils                # General Utilities (used throughout application)
│   │   ├── components.js    # Utilities for building/implementing react components (often used in enhancers)
│   │   ├── form.js          # For forms (often used in enhancers that use redux-form)
│   │   └── router.js        # Utilities for routing such as those that redirect back to home if not logged in
├── tests                    # Unit tests
├── .env.local               # Environment settings for when running locally
├── .eslintignore            # ESLint ignore file
├── .eslintrc.js             # ESLint configuration
├── .firebaserc              # Firebase Project configuration settings (including ci settings)
├── database.rules.json      # Rules for Firebase Real Time Database
├── firebase.json            # Firebase Service settings (Hosting, Functions, etc)
├── firestore.indexes.json   # Indexs for Cloud Firestore
├── firestore.rules          # Rules for Cloud Firestore
└── storage.rules            # Rules for Cloud Storage For Firebase
```

## Routing

We use `react-router-dom` [route matching](https://reacttraining.com/react-router/web/guides/basic-components/route-matching) (`<route>/index.js`) to define units of logic within our application. The application routes are defined within `src/routes/index.js`, which loads route settings which live in each route's `index.js`. The component with the suffix `Page` is the top level component of each route (i.e. `HomePage` is the top level component for `Home` route).

There are two types of routes definitions:

### Sync Routes

The most simple way to define a route is a simple object with `path` and `component`:

*src/routes/Home/index.js*

```js
import HomePage from './components/HomePage'

// Sync route definition
export default {
  path: '/',
  component: HomePage
}
```

### Async Routes

Routes can also be seperated into their own bundles which are only loaded when visiting that route, which helps decrease the size of your main application bundle. Routes that are loaded asynchronously are defined using `react-loadable`:

*src/routes/NotFound/index.js*

```js
import Loadable from 'react-loadable'
import LoadingSpinner from 'components/LoadingSpinner'

// Async route definition
export default {
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'NotFound' */ './components/NotFoundPage'),
    loading: LoadingSpinner
  })
}
```

With this setting, the name of the file (called a "chunk") is defined as part of the code as well as a loading spinner showing while the bundle file is loading.

More about how routing works is available in [the react-router-dom docs](https://reacttraining.com/react-router/web/guides/quick-start).


## FAQ

1. Why node `8` instead of a newer version?

  [Cloud Functions runtime runs on `8`](https://cloud.google.com/functions/docs/writing/#the_cloud_functions_runtime), which is why that is what is used for the travis build version.

1. Why `enhancers` over `containers`? - For many reasons, here are just a few:
    * separates concerns to have action/business logic move to enhancers (easier for future modularization + optimization)
    * components remain "dumb" by only receiving props which makes them more portable
    * smaller files which are easier to parse
    * functional components can be helpful (along with other tools) when attempting to optimize things


[climate-image]: https://img.shields.io/codeclimate/github/prescottprue/material.svg?style=flat-square
[climate-url]: https://codeclimate.com/github/prescottprue/material
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/prescottprue/material.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/prescottprue/material
[license-image]: https://img.shields.io/npm/l/material.svg?style=flat-square
[license-url]: https://github.com/prescottprue/material/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
