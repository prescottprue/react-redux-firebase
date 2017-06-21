# React Native

Connecting to Firebase through react-native can be done with the default Firebase javascript library, or through native modules. Libraries such as [react-native-firebase](https://github.com/invertase/react-native-firebase) that preserve Firebase's web library syntax while providing access to native modules can be used with `react-redux-firebase`.

Regardless of which path you want to take, initial setup is the same, so we will begin there. Below are separate sections for the two different setups (native or web)

## Setup

1. Click "Add Firebase To iOS"
<!-- TODO: Confirm this and get a picture -->
1. Download `GoogleService-info.plist`
1. Place `GoogleService-info.plist` in the folder of whichever platform you are using (i.e. `/ios`)
1. Copy your client id out of the `GoogleService-info.plist` file (should end in `.apps.googleusercontent.com`)
1. Place the client id into `iosClientId` variable within the example

## JS/Web

**NOTE**: Only works for versions `v1.4.0-beta` and higher. For older versions please view the docs associated with previous version.

[react-native complete example app](/examples/complete/react-native)

Instantiate a Firebase instance outside of `react-redux-firebase` then pass it in as the first argument like so:

```js
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const fbConfig = {} // object containing Firebase config
firebase.initializeApp(fbConfig) // initialize firebase instance

const store = createStore(
 reducer,
 undefined, //
 compose(
   reactReduxFirebase(firebase, reduxConfig), // pass in firebase instance instead of config
   applyMiddleware(...middleware)
 )
)
```

#### Native Using [react-native-firebase](https://github.com/invertase/react-native-firebase)

Passing in an instance also allows for libraries with similar APIs (such as [`react-native-firebase`](https://github.com/invertase/react-native-firebase)) to be used instead:

```js
import RNFirebase from 'react-native-firebase';

const configurationOptions = {
  debug: true
};

const firebase = RNFirebase.initializeApp(configurationOptions);

const store = createStore(
  reducer,
  undefined,
  compose(
   reactReduxFirebase(RNFirebase, reduxConfig), // pass in react-native-firebase instance instead of config
   applyMiddleware(...middleware)
 )
)
```
The [react-native-firebase initial setup guide](http://invertase.io/react-native-firebase/#/initial-setup) has more information about how to setup your project for iOS/Android.

## Creating Your Own

We are going to use the project name Devshare for example here. For your project, use your project name everywhere where Devshare is used.

### Start
1. Make sure you have [`create-react-native-app`](https://github.com/react-community/create-react-native-app) installed, or install it using `npm install -g create-react-native-app`.
1. Run `create-react-native-app Devshare` (again replace Devshare with the name of your project)
1. After that is complete, eject using `yarn eject` or `npm run eject`

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

  ```objc
  // add this line before @implementation AppDelegate
  #import <RNGoogleSignin/RNGoogleSignin.h>

  // add this method before @end
  - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
    sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {

    return [RNGoogleSignin application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
  }

  ```

At the end of this step, your Xcode config should look similar to this:

[![xcode config](https://github.com/apptailor/react-native-google-signin/raw/master/img/url-config.png)](#config)

### Set Open URLs

Only one `openURL` method can be defined, so if you have multiple listeners which should be defined (for instance if you have both Google and Facebook OAuth), you must combine them into a single function like so:

**AppDelegate.m:**

```objc
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
