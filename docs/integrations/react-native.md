# React Native

Connecting to Firebase through react-native can be done with the default Firebase javascript library, or through native modules. Libraries such as [react-native-firebase](https://github.com/invertase/react-native-firebase) that preserve Firebase's web library syntax while providing access to native modules can be used with `react-redux-firebase`.

Regardless of which path you want to take, initial setup is the same, so we will begin there. Below are separate sections for the two different setups ([native](#native-modules) or [web](#jsweb)).

**NOTE:** Make sure you include `enableRedirectHandling: false` when using react-native with `v2.0.0`. This is required to disable redirect handling (which uses http) since it is not supported in react-native. There has been discussion of a way to make this happen automatically, but for now it is required.

## JS/Web

Setup and use `react-redux-firebase` as normal (described in the [use section of the README](https://github.com/prescottprue/react-redux-firebase#use)). Since Firebase is initialized outside of react-redux-firebase, the automatic handling of react-native done by Firebase works.

[react-native complete example app](https://github.com/prescottprue/react-redux-firebase/tree/master/examples/complete/react-native)

**NOTES**
* The web SDK is actually used directly, so this method is as close as it comes to web dev
* Slighly less performant than using native modules since the render thread is used for all JS
* Only works for versions `v2.0.0` and higher. For older versions please view the docs associated with previous version.

## Native Modules

Passing in an instance also allows for libraries with similar APIs (such as [`react-native-firebase`](https://github.com/invertase/react-native-firebase)) to be used instead:

1. Follow [use instructions in README](https://github.com/prescottprue/react-redux-firebase#use)
1. When creating redux store pass `react-native-firebase` App instance into `ReactReduxFirebaseProvider` like so:

  ```jsx
  import React from 'react'
  import { render } from 'react-dom'
  import { Provider } from 'react-redux'
  import RNFirebase from 'react-native-firebase';
  import { createStore, combineReducers, compose } from 'redux'
  import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
  // import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

  const fbConfig = {}

  // react-redux-firebase config
  const rrfConfig = {
    userProfile: 'users'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }

  // Initialize firebase instance
  firebase.initializeApp(fbConfig)

  // Initialize other services on firebase instance
  // firebase.firestore() // <- needed if using firestore
  // firebase.functions() // <- needed if using httpsCallable

  // Add firebase to reducers
  const rootReducer = combineReducers({
    firebase: firebaseReducer
    // firestore: firestoreReducer // <- needed if using firestore
  })

  // Create store with reducers and initial state
  const initialState = {}
  const store = createStore(rootReducer, initialState)

  const rrfProps = {
    firebase: RNFirebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    // createFirestoreInstance // <- needed if using firestore
  }

  // Setup react-redux so that connect HOC can be used
  function App() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Todos />
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
  ```

Full `react-native-firebase` example app source with styling available [in the react-native-firebase complete example](https://github.com/prescottprue/react-redux-firebase/tree/master/examples/complete/react-native-firebase).

## Creating Your Own

We are going to use the project name Devshare for example here. For your project, use your project name everywhere where Devshare is used.

### Start

1. Make sure you have [`create-react-native-app`](https://github.com/react-community/create-react-native-app) installed, or install it using `npm install -g create-react-native-app`.
1. Run `create-react-native-app Devshare` (again replace Devshare with the name of your project)
1. After that is complete, eject using `yarn eject` or `npm run eject`

### Setup

1. Click "Add Firebase To iOS"
<!-- TODO: Confirm this and get a picture -->
1. Download `GoogleService-info.plist`
1. Place `GoogleService-info.plist` in the folder of whichever platform you are using (i.e. `/ios`)
1. Copy your client id out of the `GoogleService-info.plist` file (should end in `.apps.googleusercontent.com`)
1. Place the client id into `iosClientId` variable within the example

### Download Firebase Config
1. Visit Overview page and click Add Firebase to iOS

  ![img](/docs/static/FirebaseOverview.png)

1. Fill in application info in register modal and click register

  ![img](/docs/static/RegisterApp.png)

1. Download the .plist file and place it in your `ios` folder

  ![img](/docs/static/PlistDownload.png)

### Add `react-native-google-signin`

1. Add [`react-native-google-signin`](https://github.com/devfd/react-native-google-signin) to the project
  1. Run `npm i --save react-native-google-signin` to include it within JS dependencies
  1. Download the [`react-native-google-signin`](https://github.com/devfd/react-native-google-signin) zip, and unzip it
  1. Drag and drop the `ios/GoogleSdk` folder to your xcode project. (Make sure `Copy items if needed` **IS** ticked)
  1. Add RNGoogleSignin to project build phase
    1. Click Name in sidebar of Xcode

        ![img](/docs/static/BuildPhase.png)

    1. In your project build phase -> `Link binary with libraries` step, add:
      * `libRNGoogleSignin.a`
      * `AddressBook.framework`
      * `SafariServices.framework`
      * `SystemConfiguration.framework`
      * `libz.tbd`

    **Note:** (May take clicking "Add Other" button then selecting the `GoogleSdk` folder and `RNGoogleSignin` folder)

1. Make sure all dependencies are correctly linked to your project:
  [![link config](https://github.com/apptailor/react-native-google-signin/raw/master/img/link-config.png)](#config)

1. Configure URL types in the ```Info``` panel of your xcode project
  1. add a URL with scheme set to your ```REVERSED_CLIENT_ID``` (found inside the plist)
  1. add a URL with scheme set to your ```bundle id```

  ![img](/docs/static/UrlTypes.png)

1. Make sure you import `RNGoogleSignin.h` in your `AppDelegate.m` like so:

  ```objectivec
  // add this line before @implementation AppDelegate
  #import <RNGoogleSignin/RNGoogleSignin.h>

  // add this method before @end
  - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
    sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {

    return [RNGoogleSignin application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
  }

  ```

At the end of this step, your Xcode config should look similar to this:

[![xcode config](https://raw.githubusercontent.com/react-native-community/google-signin/1d20b15859fd221c0cc088d5dd47b7cfe1544ffe/img/url-config.png)](#config)

### Set Open URLs

Only one `openURL` method can be defined, so if you have multiple listeners which should be defined (for instance if you have both Google and Facebook OAuth), you must combine them into a single function like so:

**AppDelegate.m:**

```objectivec
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {

  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                        openURL:url
                                              sourceApplication:sourceApplication
                                                     annotation:annotation
         ]
         || [RNGoogleSignin application:application
                                openURL:url
                      sourceApplication:sourceApplication
                             annotation:annotation
            ];
}
```

### Run It

Now, if everything was done correctly you should be able to do the following:

```bash
react-native run-ios
```
