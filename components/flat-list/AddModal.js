import React, { Component } from 'react';
import { Dimensions, Platform, Text, TextInput } from 'react-native';
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import { insertNewFoodToServer } from '../../be/Server';

var screen = Dimensions.get('window');
export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staNewFoodName: '',
            staNewFoodDescription: ''
        };
        this.refMyModal = React.createRef()
    }
    onShowAddModal = () => {
        this.refMyModal.current.open();
    }
    onGenerateKey = (arg_char_num) => {
        return require('random-string')({ length: arg_char_num });
    }
    render() {
        const { staNewFoodName, staNewFoodDescription } = this.state
        const { props_parentFlatList } = this.props
        return (
            <Modal
                ref={this.refMyModal}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 280
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                    alert("Add OK!");
                }}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 40
                }}>New food's information</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 1
                    }}
                    onChangeText={(text) => this.setState({ staNewFoodName: text })}
                    placeholder="Enter new food's name"
                    value={staNewFoodName}
                />
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

                    onChangeText={(text) => this.setState({ staNewFoodDescription: text })}
                    placeholder="Enter new food's description"
                    value={staNewFoodDescription}
                />
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
                    onPress={() => {
                        if (staNewFoodName.length === 0 || staNewFoodDescription.length === 0) {
                            alert("You must enter food's name and description");
                            return;
                        }
                        const newKey = this.onGenerateKey(24);
                        const newFood = {
                            _id: newKey,
                            name: staNewFoodName,
                            foodDescription: staNewFoodDescription
                        };
                        insertNewFoodToServer(newFood).then(res => {
                            if (res) {
                                props_parentFlatList.onRefreshDataFromServer()
                            }
                        })
                        this.refMyModal.current.close();
                    }}>
                    Save
                </Button>
            </Modal>
        );
    }
}