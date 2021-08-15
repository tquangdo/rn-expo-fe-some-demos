import React, { Component } from 'react';
import {
  Dimensions, Image, ScrollView, Text, TextInput, SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

class CompScreen extends Component {
  render() {
    let { width, height } = Dimensions.get('window')
    return (
      <>
        <Image
          source={require('./assets/splash.png')}
          style={{ width: width, height: height / 2, marginTop: 20 }}
        >
        </Image>
        <Text
          style={{
            fontSize: 20,
            padding: 15,
            color: 'white',
            textAlign: 'center',
            backgroundColor: 'green'
          }}
        >
          This is a text
        </Text>
        <TextInput
          style={{ padding: 10, margin: 10, borderWidth: 1 }}
          placeholder='Enter text'>
        </TextInput>
      </>
    );
  }
}

export default class VerticalScrollView extends Component {
  render() {
    return (
      <>
        <StatusBar style="dark" />
        <SafeAreaView>
          <ScrollView
            maximumZoomScale={3}
            minimumZoomScale={0.2}
            keyboardDismissMode='on-drag' // khi scroll vertical thi dismiss keyboard
          >
            <CompScreen />
            <CompScreen />
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
}