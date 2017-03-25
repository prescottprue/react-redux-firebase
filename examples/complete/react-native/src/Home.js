import React, { Component } from 'react';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import configureStore from './store'
const initialState = { firebase: { authError: null, auth: undefined }}
const store = configureStore(initialState)

const iosClientId = '499842460400-teaflfd8695oilltk5qkvl5688ebgq6b.apps.googleusercontent.com'; // get this from plist file
const webClientId = '603421766430-60og8n04mebic8hi49u1mrcmcdmugnd5.apps.googleusercontent.com';


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

@firebaseConnect()
@connect(({ firebase }) => ({
  auth: pathToJS(firebase, 'auth', undefined)
}))
export default class SigninSampleApp extends Component {
  componentDidMount() {
    this._setupGoogleSignin();
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
      );
    }
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>
          Welcome {this.props.auth.displayName}
        </Text>
        <Text>
          Your email is: {this.props.auth.email}</Text>

        <TouchableOpacity onPress={() => {this._signOut(); }}>
          <View style={{marginTop: 50}}>
            <Text>Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId,
        webClientId,
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      const creds = this.props.firebase.auth.GoogleAuthProvider.credential(null, user.accessToken)
      await this.props.firebase.auth().signInWithCredential(creds)
    }
    catch(err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

  _signIn() {
    return GoogleSignin.signIn()
      .then((user) => {
        const creds = this.props.firebase.auth.GoogleAuthProvider.credential(null, user.accessToken)
        return this.props.firebase.auth().signInWithCredential(creds)
          .catch((err) => {
            console.error('error authing with firebase:', err)
          })
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
  }

  _signOut() {
    return GoogleSignin.revokeAccess()
      .then(() => GoogleSignin.signOut())
      .then(() => this.props.firebase.logout())
  }
}
