import React, { useState } from 'react'
import Modal from './components/Modal'
import { View, TextInput, Button, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
  const [textValue, setTextValue] = useState('')
  const [itemsList, setItemsList] = useState([])
  const [itemSelected, setItemSelected] = useState()
  const [modalVisible, setModalVisible] = useState (false)
  
  const onHandleChangeItem = text => setTextValue(text)


  const addItem = () => {
    if (textValue === '') {
      return
    }
    setItemsList(prevState => [
      ...prevState,
      { id: Math.random(), value: textValue },
    ])
    setTextValue('')
  }

  const renderListItem = ({item, index }) => (
   <TouchableOpacity style={styles.TextContainer} onPress={() => onHandelModal(index)}>
    <Text style={styles.Text}>{item.value}</Text>
   </TouchableOpacity>
  )

  const onHandelDelete = () => {
   console.log(itemSelected)
   let arr = itemsList
   arr.splice(itemSelected, 1)
   setItemsList(arr)
   setModalVisible(false)
  }

  const onHandelModal = (index) => {
    setModalVisible(true)
    setItemSelected(index)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <View style={styles.inputContainer}>
        <TextInput 
         placeholder='New Item'
         style={styles.input}
         value={textValue}
         onChangeText={onHandleChangeItem}
        />
        <Button title='+ADD' color={'#33ff99'} onPress={addItem} />
      </View>
      <View style={styles.listContainer}>
        <FlatList
        data={itemsList}
        renderItem={renderListItem}
        keyExtractor={item => item.id}
      />
      </View>
      <Modal modalVisible={modalVisible} onHandelDelete={onHandelDelete}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: 'black',
    paddingTop: 80,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  input: {
    height: 30,
    width: 200,
    fontSize: 20,
    paddingLeft: 12,
    color: 'black',
  },
  TextContainer: {
    borderColor: '#33ff99',
    alignItems: "left",
    backgroundColor: "#33ff99",
    borderWidth: 2,
    marginVertical: 15,
    width: "100%",
    borderRadius: 5,
  },
  Text:{
    fontSize: 22,
    color: "black",
    marginLeft: 10,
  },
  listContainer: {
    marginTop: 25,
  },
  title: {
    color: '#33ff99',
    fontSize: 35,
    marginBottom: 25,
  }
})

/*        
       ))} */