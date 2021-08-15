import React, { Component } from 'react';
import {
  Dimensions, ScrollView,
  Text, View, SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

class CompScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { width, height } = Dimensions.get('window')
    const { props_bck_color, props_screenname } = this.props
    return (
      <View style={{
        backgroundColor: `${props_bck_color}`,
        flex: 1,
        marginTop: 20,
        width: width,
        height: height,
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
          {props_screenname}
        </Text>
      </View>
    );
  }
}

export default class HorizontalScrollView extends Component {
  render() {
    return (
      <>
        <StatusBar style="dark" />
        <SafeAreaView>
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
            <CompScreen props_bck_color='#5f9ea0' props_screenname='Screen 1' />
            <CompScreen props_bck_color='tomato' props_screenname='Screen 2' />
          </ScrollView>
        </SafeAreaView>

      </>
    );
  }
}