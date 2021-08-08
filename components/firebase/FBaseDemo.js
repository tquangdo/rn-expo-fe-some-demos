import * as fbase from 'firebase';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
import * as Facebook from 'expo-facebook';
import { Alert } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const fbaseConfig = {
  apiKey: "xxx",
  authDomain: "rn-demo-e909a.fbaseapp.com",
  projectId: "rn-demo-e909a",
  storageBucket: "rn-demo-e909a.appspot.com",
}
fbase.initializeApp(fbaseConfig)
// ~~~~ FIRESTORE DEMO!!! ~~~~
// const doc_fb = fbase.firestore().collection("Stuff").doc("Hello")

// export default function App() {
//   const [staText, setStaText] = React.useState("loading...")
//   React.useEffect(() => {
//     doc_fb.get().then(docSnapshot => {
//       if (docSnapshot.exists) {
//         setStaText(JSON.stringify(docSnapshot.data(), null, 2))
//       } else {
//         setStaText("NOT exist :/\n" +
//           "Create DB in Firestore & try again!"
//         )
//       }
//     }).catch((e) => {
//       alert(e)
//       setStaText("NG!!!")
//     })
//   }, [])

//   return (
//     <View style={styles.container}>
//       <Text>Firestore Stuff/Hello:</Text>
//       <Text>{staText}</Text>
//       <StatusBar style="auto" />
//     </View>
//   )
// }

export default class FBaseDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      staEmail: '',
      staPW: '',
      staShowUser: '',
    })
  }
  async componentDidMount() {
    await fbase.auth().onAuthStateChanged((arg_user) => {
      if (arg_user !== null) {
        let tmp_user = (arg_user.email) ? arg_user.email : '(anonymous)'
        this.setState({ staShowUser: tmp_user })
      }
    })
  }
  async _onAnonymousLogin() {
    await fbase.auth().signInAnonymously()
      .catch((error) => {
        console.log(`Login failed. Error = ${error}`);
      });
  }
  async _onLogout() {
    await fbase.auth().signOut()
      .then(() => {
        this.setState({
          staShowUser: '',
        })
      })
      .catch((err) => {
        alert('ERR: ' + err.message);
      })
  }
  async _signUpUser(arg_email, arg_pw) {
    await fbase.auth().createUserWithEmailAndPassword(arg_email, arg_pw)
      .then(() => { alert(`Signup sucess!`) })
      .catch((err) => {
        alert(err.toString())
      })
  }
  async _loginUser(arg_email, arg_pw) {
    await fbase.auth().signInWithEmailAndPassword(arg_email, arg_pw)
      .then((res_user) => {
        alert(`Login sucess for user: ${res_user.user.email}`)
      })
      .catch((err) => {
        alert(err.toString())
      })
  }
  async _loginWithFB() {
    try {
      await Facebook.initializeAsync({
        appId: '315773463612906',
      });
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        const credential = fbase.auth.FacebookAuthProvider.credential(token)
        // https://github.com/expo/expo/issues/8226#issuecomment-627391143
        // "message": "(#100) The App_id in the input_token did not match the Viewing App"
        // => just ERR with Expo + FBase + Fbook
        fbase.auth().signInWithCredential(credential)
          .then((arg_fb_user) => { console.log('FB user: ', JSON.stringify(arg_fb_user)) })
          .catch((err) => {
            alert(err.toString())
          })
      } else {
        // type === 'cancel'
        Alert.alert('You cancelled login FB!');
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    const { staEmail, staPW, staShowUser } = this.state
    return (
      <>
        <StatusBar style="dark" />
        <View style={styles.container}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled" // co the click "Submit" ngay ca khi keyboard dang open
          >
            <Button
              style={styles.btn_style}
              containerStyle={[styles.btn_container_style, {
                marginBottom: 10,
                backgroundColor: 'pink'
              }]}
              onPress={() => this._onAnonymousLogin()}
            >
              Login anonymous
            </Button>
            <Text style={styles.txtinput_style}>Logging in user: {staShowUser}</Text>
            <Text>Email</Text>
            <TextInput
              style={styles.txtinput_style}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(staEmail) => this.setState({ staEmail })}
            />
            <Text>PW</Text>
            <TextInput
              style={styles.txtinput_style}
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(staPW) => this.setState({ staPW })}
            />
            <Button
              style={styles.btn_style}
              containerStyle={[styles.btn_container_style, {
                marginBottom: 10,
                backgroundColor: 'orange'
              }]}
              onPress={() => this._loginUser(staEmail, staPW)}
            >
              Login
            </Button>
            <Button
              style={styles.btn_style}
              containerStyle={[styles.btn_container_style, {
                marginBottom: 10,
                backgroundColor: 'blue'
              }]}
              onPress={() => this._loginWithFB()}
            >
              Login With Facebook
            </Button>
            <Button
              style={styles.btn_style}
              containerStyle={[styles.btn_container_style, {
                marginBottom: 40,
                backgroundColor: 'mediumseagreen'
              }]}
              onPress={() => this._signUpUser(staEmail, staPW)}
            >
              Sign Up
            </Button>
            <Button
              style={styles.btn_style}
              containerStyle={[styles.btn_container_style, {
                backgroundColor: 'grey'
              }]}
              onPress={() => this._onLogout()}
            >
              Logout
            </Button>
          </KeyboardAwareScrollView>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  btn_style: { fontSize: 18, color: 'white' },
  txtinput_style: {
    height: 40,
    borderBottomColor: 'gray',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 20,
    borderBottomWidth: 1
  },
  btn_container_style: {
    padding: 8,
    marginLeft: 70,
    marginRight: 70,
    height: 40,
    borderRadius: 6,
  },
})
