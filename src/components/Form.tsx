import { Button, Modal, StyleSheet, Text, View,
    Pressable,
    Alert,
    TextInput,
    TouchableOpacity
 } from 'react-native'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import DatePicker from 'react-native-date-picker'
import {saveTodos} from '../../backend/storage'
import { ToDoProps } from '../App'

type FormPromts = PropsWithChildren<{
    visibility:boolean,
    id?:string,
    onPress: ()=>void,
    taskList: ToDoProps[]
}>

const Form = ({visibility,onPress,taskList}:FormPromts) => {

    const [dialogVisibility,ShowDialogVisivbility]=useState(visibility)

    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
   
    const [date, setDate] = useState(new Date().toLocaleString())
    const [open, setOpen] = useState(false)
  
    const addItem=async ()=>{
    try{
      const newToDo = { id: Math.random().toString(), title, description, date };
      let updatedData=taskList
      updatedData.push(newToDo)
      const res=saveTodos(updatedData);
      onPress()
    }
     catch(e){
      console.error('Error adding to-do items:', e);
     } 
    }
    
    return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={dialogVisibility}
        onRequestClose={() => {
          ShowDialogVisivbility(!dialogVisibility);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.titleText} >Add New Task</Text>

            <TextInput 
                onChangeText={setTitle}
                placeholder='Enter Title'
                style={styles.inputBox}
            />

            <TextInput 
                onChangeText={setDescription}
                placeholder='Enter Description'
                style={styles.inputBox}
            />

            {/* <View style={styles.dateTimeBoxContainer}> */}

            <Pressable 
                style={styles.dateTimeBox}
                onPress={()=>setOpen(true)}
            ><Text> {date.toLocaleString()} </Text></Pressable>

            {/* <TouchableOpacity
                style={styles.dateTimeBox}
                onPress={()=>ShowDialogVisivbility(false)}
            ><Text>Select Time</Text></TouchableOpacity> */}
            {/* </View> */}

            <View style={styles.btnContainer}>

            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => addItem()}>
              <Text style={styles.textStyle}>Add Item</Text>
            </TouchableOpacity>
        
        
            <TouchableOpacity
              style={[styles.button, styles.confirmButton,{
                backgroundColor:'red'
              }]}
              onPress={() => onPress()}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      
    <DatePicker
        modal
        open={open}
        date={new Date()}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date.toDateString())
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />

    </View>
  )
}

export default Form

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 7,
        padding: 10,
        elevation: 2,
      },
      inputBox:{
        width:290,
        borderColor:'#006eff',
        borderBottomWidth:.7,
        borderLeftWidth:.3,
        borderRightWidth:.3,
        borderTopWidth:.1,
        borderRadius:5,
        paddingLeft:15,
        paddingVertical:7,
        fontSize:14,
        margin:8,
        cursor:'pointer'
      },
      dateTimeBox:{
        backgroundColor:'white',
        borderColor:'#2f00ff',
        borderBottomWidth:.7,
        borderLeftWidth:.3,
        borderRightWidth:.3,
        borderTopWidth:.1,
        borderRadius:5,
        paddingHorizontal:15,
        paddingVertical:11,
        fontSize:14,
        alignSelf:'baseline',
        margin:8
      },
      btnContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'60%',
        alignItems:'baseline',
        padding:6,
        maxHeight:'auto',
      },
      titleText:{
        fontSize:20,
        fontWeight:'bold',
        alignSelf:'flex-start',
        padding:1,
        color:'black'
      },
      confirmButton: {
        marginTop:15,
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
})