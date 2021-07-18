import React, { Component } from 'react';
import {
  Dimensions, ScrollView,
  Text, View
} from 'react-native';

export default class HorizontalScrollView extends Component {
  render() {
    let screenWidth = Dimensions.get('window').width;
    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={true}
        scrollIndicatorInsets={{ top: 10, left: 10, bottom: 10, right: 10 }} //ios                    
        onMomentumScrollBegin={() => {
          alert('Begin scrolling')
        }}
        onScroll={(event) => {
          // let logData = `Scrolled to x = ${event.nativeEvent.contentOffset.x}, y =${event.nativeEvent.contentOffset.y}`
          // console.log(logData);
        }}
        scrollEventThrottle={1000}
      >
        <View style={{
          backgroundColor: '#5f9ea0',
          flex: 1,
          marginTop: 20,
          width: screenWidth,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text
            style={{
              fontSize: 20,
              padding: 15,
              color: 'white',
              textAlign: 'center'
            }}
          >
            Screen 1
          </Text>
        </View>
        <View style={{
          backgroundColor: 'tomato',
          flex: 1,
          marginTop: 20,
          width: screenWidth,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text
            style={{
              fontSize: 20,
              padding: 15,
              color: 'white',
              textAlign: 'center'
            }}
          >
            Screen 2
          </Text>
        </View>
      </ScrollView>);
  }
}