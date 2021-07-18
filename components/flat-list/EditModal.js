import React, { Component } from 'react';
import { Dimensions, Platform, Text, TextInput } from 'react-native';
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import { updateAFood } from '../../be/Server';

var screen = Dimensions.get('window');
export default class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staId: 0,
            staFoodName: '',
            staFoodDescription: '',
            staFlItems: {},
        };
        this.refMyModal = React.createRef()
    }
    onShowEditModal = (arg_editing_food, arg_fl_items) => {
        this.setState({
            staId: arg_editing_food.id,
            staFoodName: arg_editing_food.name,
            staFoodDescription: arg_editing_food.foodDescription,
            staFlItems: arg_fl_items,
        });
        this.refMyModal.current.open();
    }
    render() {
        const { staId, staFoodName, staFoodDescription, staFlItems } = this.state
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
                    alert("Edit OK!");
                }}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 40
                }}>food's information</Text>
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
                    onChangeText={(text) => this.setState({ staFoodName: text })}
                    placeholder="Enter food's name"
                    value={staFoodName}
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

                    onChangeText={(text) => this.setState({ staFoodDescription: text })}
                    placeholder="Enter food's description"
                    value={staFoodDescription}
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
                        if (staFoodName.length === 0 || staFoodDescription.length === 0) {
                            alert("You must enter food's name and description");
                            return;
                        }
                        const put_params = {
                            name: staFoodName,
                            foodDescription: staFoodDescription,
                        }
                        updateAFood(staId, put_params).then(res => {
                            if (res) {
                                staFlItems._onRefreshFlatListItem({
                                    id: staId, //phai co dong nay vi App.js>_onRefreshFlatListItem(arg){this.setState({ staItems: arg })}
                                    name: staFoodName,
                                    foodDescription: staFoodDescription,
                                })
                            }
                        }).catch(err => { console.error(`ERR!!! ${err}`) })
                        this.refMyModal.current.close();
                    }}>
                    Save
                </Button>
            </Modal>
        );
    }
}