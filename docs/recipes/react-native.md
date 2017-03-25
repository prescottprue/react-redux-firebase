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


## Example App Snippet

This snippet is a condensed version of [react-native complete example](/examples/complete/react-native).

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
