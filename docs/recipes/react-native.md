# React Native

**NOTE**: Only works for versions `v1.4.0-alpha` and higher. It is still in the early stages of support.

## Setup

1. Click "Add Firebase To iOS"
<!-- TODO: Confirm this and get a picture -->
1. Download `GoogleService-info.plist`
1. Place `GoogleService-info.plist` in the folder of whichever platform you are using (i.e. `/ios`)
1. Make sure you correctly setup [`react-native-google-signin`](https://github.com/devfd/react-native-google-signin) (means you should end up with a `GoogleSDK` folder in the folder matching your platform)


## Example App Snippet

This snippet is a condensed version of [react-native complete example](/examples/complete/react-native).

```js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
const iosClientId = '499842460400-teaflfd8695oilltk5qkvl5688ebgq6b.apps.googleusercontent.com' // get this from plist file

class SigninSampleApp extends Component {
  state = {
    user: null
  }

  componentDidMount() {
    this._setupGoogleSignin();
  }

  render() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <GoogleSigninButton
            style={{width: 212, height: 48}}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Auto}
            onPress={this._signIn.bind(this)}
          />
        </View>
      );
    }

    if (this.state.user) {
      return (
        <View style={styles.container}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>
            Welcome {this.state.user.name}
          </Text>
          <Text>Your email is: {this.state.user.email}</Text>

          <TouchableOpacity onPress={() => {this._signOut(); }}>
            <View style={{marginTop: 50}}>
              <Text>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId,
        // webClientId: '603421766430-60og8n04mebic8hi49u1mrcmcdmugnd5.apps.googleusercontent.com',
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({user});
    }
    catch(err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

  _signIn() {
    return GoogleSignin.signIn()
      .then((user) => {
        console.log(user);
        this.setState({user: user});
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
  }

  _signOut() {
    return GoogleSignin.revokeAccess()
      .then(() => GoogleSignin.signOut())
      .then(() => {
        this.setState({user: null});
      })
  }
}

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
});

AppRegistry.registerComponent('GoogleSigninSampleApp', () => GoogleSigninSampleApp);

```
