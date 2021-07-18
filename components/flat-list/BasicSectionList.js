import React, { Component } from 'react';
import { Platform, SectionList, Text, View } from 'react-native';
import { SECTION_MOCK } from './mock/sectionListData';

class CompSectionListItem extends Component {
    render() {
        const { props_item } = this.props
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'rgb(98, 197, 184)'
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'orange',
                    marginLeft: 20,
                    marginRight: 10,

                }}>{props_item.name}
                </Text>
                <Text style={{
                    fontSize: 16,
                    marginLeft: 20,
                    marginRight: 10,
                    color: 'rgb(173, 252, 250)',
                }}>{props_item.description}
                </Text>
                <View style={{ backgroundColor: 'rgb(77,120, 140)', height: 1, margin: 4, marginLeft: 20, marginRight: 10 }}>
                </View>
            </View>
        );
    }
}
class CompSectionHeader extends Component {
    render() {
        const { props_section } = this.props
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'rgb(77,120, 140)',
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'white',
                    margin: 20
                }}>{props_section.title}
                </Text>
            </View>
        );
    }
}
export default class BasicSectionList extends Component {

    render() {
        return (
            <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0 }}>
                <SectionList
                    renderItem={({ item }) => {
                        return (<CompSectionListItem props_item={item} ></CompSectionListItem>);
                    }}
                    renderSectionHeader={({ section }) => {
                        return (<CompSectionHeader props_section={section}></CompSectionHeader>);
                    }}
                    sections={SECTION_MOCK}
                    keyExtractor={(item) => item.name}
                ></SectionList>
            </View>
        );
    }
}