# react-native + react-redux-firebase Complete Example

## Getting Started

**NOTE** This example assumes you have `react-native` installed

1. Clone main repo
1. Enter example folder by running `cd examples/complete/react-native`
1. Install dependencies using `yarn install` or `npm install`
1. Run using `react-native run-ios`

## Dev Scripts
* `npm run dev` - starts watcher and packager together concurrently
* `npm run clean` - cleans up old build folder (good for troubleshooting)

## Application Structure

```
├─ App.js                   # Application base where store is passed to Provider
├─ config.js                # Config include Firebase settings
├─ store.js                 # Redux Store setup
├─ reducer.js               # Redux Reducer Setup
├─ screens                  # Development helper scripts
│  └── HomeScreen.js       # Home view with example react-redux-firebase code
├- ios                      # Platform specific code, config and dependencies for iOS
│  ├─ GoogleService-info.plist # iOS app config file downloaded from Firebase
├─ scripts                  # Development helper scripts
│  └── watch-and-copy.js    # Development helper that watches and copies changed files
└─ index.ios.js             # iOS Application Mounting (connects iOS -> `/src`)
```

## Running Your Own

This project was created with `expo`, so you can create your own by doing the following:

1. Make sure you have [expo installed](https://docs.expo.io/versions/v32.0.0/introduction/installation/) (`npm install -g expo-cli`)
1. Run `expo init`
1. Follow instructions which say to enter the folder and call `yarn start` or `npm start` (you can shut off for now or open another teminal window)
1. Install `react-redux-firebase`: `yarn add redux react-redux@^5.0.0 react-redux-firebase` (this example also uses `recompose` for convience, but it isn't nessesary)
1. In App.js (the base of the app) add the following:
    ```js
    import { Provider } from 'react-redux'
    import configureStore from './store'

    const initialState = window.__INITIAL_STATE__ || {
      firebase: { authError: null }
    }
    const store = configureStore(initialState)
    
    
    // then later in component render
    // Wrap in Provider from react-redux
    <Provider store={store}>
      <AppNavigator />
    </Provider>
    ```
1. Now your components can use `firebaseConnect`, `firestoreConnect`, `withFirebase` and the other HOCs provided by react-redux-firebase

