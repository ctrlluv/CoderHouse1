import { View, TextInput, Button, StyleSheet, Text, FlatList, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'

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
      <View style={styles.inputContainer}>
        <TextInput 
         placeholder='New Item'
         style={styles.input}
         value={textValue}
         onChangeText={onHandleChangeItem}
        />
        <Button title='+ADD' color={'#0099ff'} onPress={addItem} />
      </View>
      <View style={styles.listContainer}>
        <FlatList
        data={itemsList}
        renderItem={renderListItem}
        keyExtractor={item => item.id}
      />
      </View>
      <Modal visible={modalVisible} animationType='fade'>
        <View style={styles.modalTitle}>
          <Text>Mi Modal</Text>
        </View>
        <View style={styles.modalMessage}>
          <Text>Estas seguro de eliminar este item?</Text>
        </View>
        <View style={styles.modalButton}>
          <Button title='confirmar' onPress={onHandelDelete}/>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#66ccff',
    paddingTop: 80,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    borderColor: '#0099ff',
    alignItems: "left",
    backgroundColor: "#0099ff",
    borderWidth: 2,
    marginVertical: 15,
    width: "100%",
    borderRadius: 5,
  },
  Text:{
    fontSize: 22,
    color: "white",
    marginLeft: 10,
  },
  modalTitle: {
    backgroundColor: '#ccc',
    color: '#fff',
    fontSize: 18,
  },
  modalMessage: {
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    marginTop: 15,
  }
})

/*        
       ))} */