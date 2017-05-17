# React Native

[react-native complete example app](/examples/complete/react-native)

**NOTE**: Only works for versions `v1.4.0-beta` and higher. It is still in the early stages of support.

## Setup

1. Click "Add Firebase To iOS"
<!-- TODO: Confirm this and get a picture -->
1. Download `GoogleService-info.plist`
1. Place `GoogleService-info.plist` in the folder of whichever platform you are using (i.e. `/ios`)
1. Copy your client id out of the `GoogleService-info.plist` file (should end in `.apps.googleusercontent.com`)
1. Place the client id into `iosClientId` variable within the example


## Example App Snippets

This snippet is a condensed version of [react-native complete example](/examples/complete/react-native).

**store.js**
```js
import { createStore, compose } from 'redux'
import rootReducer from './reducer'
import { firebase as fbConfig } from './config'
import { reactReduxFirebase } from 'react-redux-firebase'
import { AsyncStorage } from 'react-native'

export default function configureStore (initialState, history) {
  // use compose to make a function that will create store
  const createStoreWithMiddleware = compose(
    reactReduxFirebase(fbConfig,
      {
        userProfile: 'users',
        enableLogging: false,
        ReactNative: { AsyncStorage },
      }
    )
  )(createStore)

  // create store
  const store = createStoreWithMiddleware(rootReducer)

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
```

**App.js**:

```js
import React, { Component } from 'react'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase'
import { connect } from 'react-redux'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import configureStore from './store'
const initialState = { firebase: { authError: null, auth: undefined }}
const store = configureStore(initialState)

const iosClientId = '499842460400-teaflfd8695oilltk5qkvl5688ebgq6b.apps.googleusercontent.com' // get this from plist file

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

@firebaseConnect()
@connect(({ firebase }) => ({
  auth: pathToJS(firebase, 'auth', undefined)
}))
export default class GoogleSigninSampleApp extends Component {
  componentDidMount() {
    this._setupGoogleSignin()
  }

  render() {
    const { auth } = this.props
    if (!isLoaded(auth)) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    }
    if (!this.props.auth) {
      return (
        <View style={styles.container}>
          <GoogleSigninButton
            style={{width: 212, height: 48}}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Auto}
            onPress={() => this._signIn()}
          />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>
          Welcome {this.props.auth.displayName}
        </Text>
        <Text>
          Your email is: {this.props.auth.email}</Text>

        <TouchableOpacity onPress={() => {this._signOut() }}>
          <View style={{marginTop: 50}}>
            <Text>Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  // based on react-native-google-signin example
  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true })
      await GoogleSignin.configure({
        iosClientId,
        offlineAccess: false
      })

      const user = await GoogleSignin.currentUserAsync()
      const creds = this.props.firebase.auth.GoogleAuthProvider.credential(null, user.accessToken)
      await this.props.firebase.auth().signInWithCredential(creds)
    }
    catch(err) {
      console.log("Google signin error", err.code, err.message)
    }
  }

  _signIn() {
    const { auth } = this.props.firebase
    return GoogleSignin.signIn()
      .then((user) => {
        const creds = auth.GoogleAuthProvider.credential(null, user.accessToken)
        return auth().signInWithCredential(creds)
      })
      .catch((err) => {
        console.error('error authing with firebase:', err)
        return Promise.reject(err)
      })
  }

  _signOut() {
    return GoogleSignin.revokeAccess()
      .then(() => GoogleSignin.signOut())
      .then(() => this.props.firebase.logout())
  }
}

AppRegistry.registerComponent('GoogleSigninSampleApp', () => GoogleSigninSampleApp)

```


## Creating Your Own

We are going to use the project name Devshare for example here. For your project, use your project name everywhere where Devshare is used.

### Start
1. Make sure you have [`create-react-native-app`](https://github.com/react-community/create-react-native-app) installed, or install it using `npm install -g create-react-native-app`.
1. Run `create-react-native-app Devshare` (again replace Devshare with the name of your project)
1. After that is complete, eject using `yarn eject` or `npm run eject`

### Download Firebase Config
1. Download `GoogleService-Info.plist` file from Firebase
  1. Visit Over page and click Add Firebase to iOS

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
