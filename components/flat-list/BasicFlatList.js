import React, { Component } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, View, RefreshControl } from 'react-native';
import Swipeout from 'react-native-swipeout';
// import flatListData from './mock/flatListData';
import AddModal from './components/flat-list/AddModal'
import EditModal from './components/flat-list/EditModal'
import { TouchableHighlight } from 'react-native';
import { delAFood, getFoodsFromServer } from './be/Server'
import { StatusBar } from 'expo-status-bar';

class CompFlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staItems: {},
    };
  }
  _onRefreshFlatListItem = (arg_changed_item) => {
    this.setState({ staItems: arg_changed_item });
  }
  render() {
    const { props_item, props_index, props_parentFlatList } = this.props
    const { staItems } = this.state
    let selectedItem = staItems.name ? staItems : props_item;
    const swipeSettings = {
      autoClose: true,
      right: [
        {
          onPress: () => {
            // EditModal.js > onShowEditModal = (arg_editing_food, arg_fl_items) => {...}
            props_parentFlatList.refEditModal.current.onShowEditModal(selectedItem, this);
          },
          text: 'Edit', type: 'primary'
        },
        {
          onPress: () => {
            Alert.alert(
              'Alert',
              `Are you sure you want to delete ${selectedItem.name} ?`,
              [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                  text: 'Yes', onPress: () => {
                    delAFood(props_item.id).then(res => {
                      if (res) {
                        props_parentFlatList._onRefresh()
                      }
                    }).catch(err => { console.error(`ERR!!! ${err}`) })

                  }
                },
              ],
              { cancelable: true }
            );
          },
          text: 'Delete', type: 'delete'
        }
      ],
      rowId: props_index,
      sectionId: 1
    };
    return (
      <Swipeout {...swipeSettings}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
        }}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'mediumseagreen'
          }}>
            <Image
              source={{ uri: props_item.imageUrl }}
              style={{ width: 100, height: 100, margin: 5 }}
            >

            </Image>
            <View style={{
              flex: 1,
              flexDirection: 'column',
              height: 100
            }}>
              <Text style={styles.flatListItem}>{selectedItem.name}</Text>
              <Text style={styles.flatListItem}>{staItems.foodDescription ? staItems.foodDescription : props_item.foodDescription}</Text>
            </View>
          </View>
          <View style={{
            height: 1,
            backgroundColor: 'white'
          }}></View>
        </View>
      </Swipeout>

    );
  }
}

export default class BasicFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      staRowId: null,
      staRefreshing: false,
      staFoodsFromServer: [],
    });
    this.onPressAdd = this.onPressAdd.bind(this)
    this.refFlatList = React.createRef()
    this.refAddModal = React.createRef()
    this.refEditModal = React.createRef()
  }
  componentDidMount() {
    this.onRefreshDataFromServer();
  }
  onRefreshDataFromServer = () => {
    this.setState({ staRefreshing: true });
    getFoodsFromServer().then((arg_foods) => {
      this.setState({ staFoodsFromServer: arg_foods });
    }).catch(() => {
      this.setState({ staFoodsFromServer: [] });
    });
    this.setState({ staRefreshing: false });
  }
  _onRefresh = () => {
    this.onRefreshDataFromServer();
  }
  onPressAdd() {
    this.refAddModal.current.onShowAddModal();
  }
  render() {
    const { staFoodsFromServer, staRefreshing } = this.state
    return (
      <>
        <StatusBar style="dark" />
        <View style={{ flex: 1, marginTop: 34 }}>
          <View style={{
            backgroundColor: 'tomato',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: 64
          }}>
            <TouchableHighlight
              style={{ marginRight: 10 }}
              underlayColor='tomato'
              onPress={this.onPressAdd}
            >
              <Image
                style={{ width: 35, height: 35 }}
                source={require('./assets/flat-list/icons-add.png')}
              />
            </TouchableHighlight>
          </View>
          <FlatList
            ref={this.refFlatList}
            data={staFoodsFromServer}
            renderItem={({ item, index }) => {
              return (
                <CompFlatListItem props_item={item} props_index={index} props_parentFlatList={this}>
                </CompFlatListItem>);
            }}
            keyExtractor={(arg_item) => arg_item.name}
            refreshControl={
              <RefreshControl
                refreshing={staRefreshing}
                onRefresh={this._onRefresh}
              />
            }
          ></FlatList>
          <AddModal ref={this.refAddModal} props_parentFlatList={this} ></AddModal>
          <EditModal ref={this.refEditModal}></EditModal>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  flatListItem: {
    color: 'white',
    padding: 10,
    fontSize: 16,
  }
})