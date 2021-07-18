import React, { Component } from 'react';
import {
  Dimensions, Image, ScrollView, Text, TextInput
} from 'react-native';

export default class VerticalScrollView extends Component {
  render() {
    let screenWidth = Dimensions.get('window').width;
    return (
      <ScrollView
        maximumZoomScale={3}
        minimumZoomScale={0.2}
        keyboardDismissMode='on-drag' // khi scroll vertical thi dismiss keyboard
      >
        <Image
          source={require('./assets/splash.png')}
          style={{ width: screenWidth, height: screenWidth * 2448 / 3264, marginTop: 20 }}
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
        <Image
          source={require('./assets/splash.png')}
          style={{ width: screenWidth, height: screenWidth / 1.33, marginTop: 20 }}
        />
        <Image
          source={require('./assets/splash.png')}
          style={{ width: screenWidth, height: screenWidth / 1.33, marginTop: 20 }}
        />
        <Image
          source={require('./assets/splash.png')}
          style={{ width: screenWidth, height: screenWidth / 1.33, marginTop: 20 }}
        />
        <Image
          source={require('./assets/splash.png')}
          style={{ width: screenWidth, height: screenWidth / 1.33, marginTop: 20 }}
        />
        <Image
          source={require('./assets/splash.png')}
          style={{ width: screenWidth, height: screenWidth / 1.33, marginTop: 20 }}
        />
      </ScrollView>);
  }
}