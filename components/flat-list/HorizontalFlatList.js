import React, { Component } from 'react';
import {
    FlatList, Image, Platform, Text, TouchableOpacity, View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HORIZON_FL_DATA } from './mock/horizontalFlatListData';
import { StatusBar } from "expo-status-bar";

class CompHorizontalFlatListItem extends Component {
    render() {
        const { props_item } = this.props
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 90,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: 'grey',
                    margin: 4,
                }}>
                <TouchableOpacity onPress={() => {
                    alert(`You pressed: ${props_item.hour}`);
                }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                >
                </TouchableOpacity>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'white',
                    margin: 20
                }}>{props_item.hour}</Text>
                <Icon name={(Platform.OS === 'ios') ? props_item.status.ios : props_item.status.android}
                    size={30}
                    color='white' />
                <Text style={{
                    fontSize: 16,
                    margin: 10,
                    color: 'white',
                }}>{props_item.degrees} ℉</Text>
            </View>
        );
    }
}
export default class HorizontalFlatList extends Component {

    render() {
        return (
            <>
                <StatusBar style="dark" />
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginTop: Platform.OS === 'ios' ? 34 : 0
                    }}>
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}>
                        <Image style={{
                            flex: 1,
                            flexDirection: 'column',
                            width: null,
                            height: null,
                            backgroundColor: 'transparent',
                            justifyContent: 'center',
                        }}
                            source={require('./assets/login-page/facebook-banner.jpg')}
                        >
                        </Image>
                    </View>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: 'transparent',
                        margin: 10,
                    }}>Weather forecast</Text>
                    <View style={{ height: 150 }}>
                        <FlatList
                            style={{
                                backgroundColor: 'black',
                                opacity: 0.5,
                            }}
                            horizontal={true}
                            data={HORIZON_FL_DATA}
                            renderItem={({ item, index }) => {
                                return (
                                    <CompHorizontalFlatListItem props_item={item}></CompHorizontalFlatListItem>);
                            }}
                            keyExtractor={(item) => item.hour}
                        >
                        </FlatList>
                    </View>
                </View>
            </>
        );
    }
}