import React, { Component } from 'react';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import configureStore from './store'
const initialState = { firebase: { authError: null, auth: undefined }}
const store = configureStore(initialState)

const iosClientId = '499842460400-teaflfd8695oilltk5qkvl5688ebgq6b.apps.googleusercontent.com'; // get this from plist file

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  centering: {
   alignItems: 'center',
   justifyContent: 'center',
   padding: 8,
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
  auth: pathToJS(firebase, 'auth')
}))
export default class SigninSampleApp extends Component {
  state = {
    isLoading: false
  }
  componentDidMount() {
    this._setupGoogleSignin();
  }

  render() {
    const { auth } = this.props
    // auth always null?
    // if (!isLoaded(auth)) {
    //   return (
    //     <View style={styles.container}>
    //       <Text>Loading...</Text>
    //     </View>
    //   )
    // }
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating
            style={[styles.centering, {height: 80}]}
            size="large"
          />
        </View>
      )
    }
    if (!this.props.auth) {
      return (
        <View style={styles.container}>
          <Text style={{marginBottom: 20}}>
            Welcome!
          </Text>
          <GoogleSigninButton
            style={{width: 212, height: 48, backgroundColor: 'transparent'}}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Light}
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

        <View style={{marginTop: 50}}>
          <Button title="Log Out" onPress={() => this._signOut()} />
        </View>
      </View>
    );
  }
  // based on google signin example
  async _setupGoogleSignin() {
    this.setState({ isLoading: true })
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId,
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      if (user) {
        const creds = this.props.firebase.auth.GoogleAuthProvider.credential(null, user.accessToken)
        await this.props.firebase.auth().signInWithCredential(creds)
      }
      this.setState({ isLoading: false })
    }
    catch(err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

  _signIn() {
    const { auth } = this.props.firebase
    this.setState({ isLoading: true })
    return GoogleSignin.signIn()
      .then((user) => {
        const creds = auth.GoogleAuthProvider.credential(null, user.accessToken)
        return auth()
          .signInWithCredential(creds)
          .then(() => {
            this.setState({ isLoading: false })
          })
          .catch((err) => {
            console.error('error authing with firebase:', err)
            this.setState({ isLoading: false })
            return Promise.reject(err)
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
