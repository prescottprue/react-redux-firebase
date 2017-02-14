# react-redux-firebase Complete Material Example

[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

This is a "real-world" example and is deployed to [demo.react-redux-firebase.com](https://demo.react-redux-firebase.com). Project was based on the output of [`generator-react-firebase`](https://github.com/prescottprue/generator-react-firebase), which generates a full project starter with `react-redux-firebase` included.

## Getting Started

1. Install dependencies: `npm install`

2. Start Development server: `npm start`

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`build:dev`|Same as `build` but overrides `NODE_ENV` to "development".|
|`build:prod`|Same as `build` but overrides `NODE_ENV` to "production".|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|

## What is Shown
* Route protection using `redux-auth-wrapper`
* Data input/validation using `redux-form`
* Async & Sync route loading
* Real CI and Deployment settings (including `prod` and `stage` environments)
* Using different instances of Firebase based on environment

## Application Structure

The application structure presented in this boilerplate is **fractal**, where functionality is grouped primarily by feature rather than file type. Please note, however, that this structure is only meant to serve as a guide, it is by no means prescriptive. That said, it aims to represent generally accepted guidelines and patterns for building scalable applications. If you wish to read more about this pattern, please check out this [awesome writeup](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure) by [Justin Greenberg](https://github.com/justingreenberg).

```
.
├── bin                      # Build/Start scripts
├── config                   # Project and build configurations
├── server                   # Express application that provides Webpack middleware
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
```

## Learning Resources

* [Starting out with react-redux-starter-kit](https://suspicious.website/2016/04/29/starting-out-with-react-redux-starter-kit/) is an introduction to the components used in this starter kit with a small example in the end.

### Production

Build code before deployment by running `npm run build:prod`.

### Deployment
1. Login to [Firebase](firebase.google.com) (or Signup if you don't have an account) and create a new project
2. Install cli: `npm i -g firebase-tools`
3. Login: `firebase login`

#### CI
**Note:** The next steps automatically through config set in the `.travis.yml`. Use `firebase login:ci` to generate a token and set it to `FIREBASE_TOKEN` within your travis config.

#### Local
1. Build Project: `npm run build`
2. Confirm Firebase config by running locally: `firebase serve`
3. Deploy to firebase: `firebase deploy`

[license-image]: https://img.shields.io/npm/l/material.svg?style=flat-square
[license-url]: https://github.com/prescottprue/material/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
