import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import * as fbase from 'firebase';
import React from 'react';
import { FlatList, Platform, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

const fbaseConfig = {
  apiKey: "xxx",
  authDomain: "rn-demo-e909a.fbaseapp.com",
  projectId: "rn-demo-e909a",
  storageBucket: "rn-demo-e909a.appspot.com",
}
fbase.initializeApp(fbaseConfig)
const doc_fstore = fbase.firestore().collection("Stuff")

export default function FilestoreDemo() {
  const [staStuffTasks, setStaStuffTasks] = React.useState([])
  const [staNewTask, setStaNewTask] = React.useState('')
  React.useEffect(() => {
    doc_fstore.onSnapshot(docSnapshot => {
      const todos = []
      docSnapshot.forEach((item_doc) => {
        todos.push({
          taskName: item_doc.data().taskName
        });
      });
      setStaStuffTasks(todos.sort((a, b) => {
        return (a.taskName < b.taskName);
      }))
    })
  }, [])
  const _onPressAdd = () => {
    if (staNewTask.trim() === '') {
      alert('task name is blank');
      return;
    }
    doc_fstore.add({
      taskName: staNewTask
    }).catch((error) => {
      alert(`error adding Firestore document = ${error}`);
      setStaNewTask('')
    });
  }

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.add_task}>
          <TextInput style={{
            height: 40,
            width: 200,
            margin: 10,
            padding: 10,
            borderColor: 'white',
            borderWidth: 1,
            color: 'white'
          }}
            keyboardType='default'
            placeholderTextColor='white'
            placeholder='Enter task name'
            autoCapitalize='none'
            onChangeText={
              (arg_text) => {
                setStaNewTask(arg_text)
              }
            }
          />
          <TouchableHighlight
            style={{ marginRight: 10 }}
            underlayColor='tomato'
            onPress={_onPressAdd}
          >
            <AntDesign name="pluscircleo" size={24} color="white" />
          </TouchableHighlight>
        </View>
        <FlatList
          data={staStuffTasks}
          renderItem={({ item }) => {
            return (
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                margin: 10
              }}>{item.taskName}</Text>);
          }}
          keyExtractor={(item, index) => index.toString()}
        >
        </FlatList>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0
  },
  add_task: {
    backgroundColor: 'tomato',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 64
  },
})
