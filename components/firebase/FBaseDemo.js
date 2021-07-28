import * as fbase from 'firebase';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
import * as Facebook from 'expo-facebook';
import { Alert } from 'react-native';

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
    })
  }
  componentDidMount() {
    fbase.auth().onAuthStateChanged((arg_user) => {
      if (arg_user !== null) {
        alert(`Login user: ${arg_user.email}`)
      }
    })
  }
  _signUpUser = (arg_email, arg_pw) => {
    try {
      fbase.auth().createUserWithEmailAndPassword(arg_email, arg_pw)
      alert(`Signup sucess!`)
    } catch (err) {
      alert(err.toString())
    }
  }
  _loginUser = (arg_email, arg_pw) => {
    try {
      fbase.auth().signInWithEmailAndPassword(arg_email, arg_pw).then(function (res_user) {
        alert(`Login sucess for user: ${res_user.user.email}`)
      })
    } catch (err) {
      alert(err.toString())
    }
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
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        const credential = fbase.auth.FacebookAuthProvider.credential(token)
        // https://github.com/expo/expo/issues/8226#issuecomment-627391143
        // "message": "(#100) The App_id in the input_token did not match the Viewing App"
        // => just ERR with Expo + FBase + Fbook
        fbase.auth().signInWithCredential(credential).catch((err) => {
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
    return (
      <>
        <StatusBar style="dark" />
        <View style={styles.container}>
          <Text>Email</Text>
          <TextInput
            style={{
              height: 40,
              borderBottomColor: 'gray',
              marginLeft: 30,
              marginRight: 30,
              marginTop: 10,
              marginBottom: 20,
              borderBottomWidth: 1
            }}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(staEmail) => this.setState({ staEmail })}
          />
          <Text>PW</Text>
          <TextInput
            style={{
              height: 40,
              borderBottomColor: 'gray',
              marginLeft: 30,
              marginRight: 30,
              marginTop: 10,
              marginBottom: 20,
              borderBottomWidth: 1
            }}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(staPW) => this.setState({ staPW })}
          />
          <Button
            style={{ fontSize: 18, color: 'white' }}
            containerStyle={{
              padding: 8,
              marginLeft: 70,
              marginRight: 70,
              marginBottom: 10,
              height: 40,
              borderRadius: 6,
              backgroundColor: 'orange'
            }}
            onPress={() => this._loginUser(this.state.staEmail, this.state.staPW)}
          >
            Login
          </Button>
          <Button
            style={{ fontSize: 18, color: 'white' }}
            containerStyle={{
              padding: 8,
              marginLeft: 70,
              marginRight: 70,
              marginBottom: 10,
              height: 40,
              borderRadius: 6,
              backgroundColor: 'blue'
            }}
            onPress={() => this._loginWithFB()}
          >
            Login With Facebook
          </Button>
          <Button
            style={{ fontSize: 18, color: 'white' }}
            containerStyle={{
              padding: 8,
              marginLeft: 70,
              marginRight: 70,
              height: 40,
              borderRadius: 6,
              backgroundColor: 'mediumseagreen'
            }}
            onPress={() => this._signUpUser(this.state.staEmail, this.state.staPW)}
          >
            Sign Up
          </Button>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  }
})
