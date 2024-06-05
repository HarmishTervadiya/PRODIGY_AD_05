import { Button, Modal, StyleSheet, Text, View,
    Pressable,
    Alert,
    TextInput,
    TouchableOpacity
 } from 'react-native'
import React, { PropsWithChildren, useState } from 'react'

type FormPromts = PropsWithChildren<{
    visibility:boolean,
    id?:string
}>

const Form = ({visibility,id}:FormPromts) => {

    const [dialogVisibility,ShowDialogVisivbility]=useState(visibility)

    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [time,setTime]=useState('')
    const [date,setDate]=useState('')

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={dialogVisibility}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
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

            <View style={styles.dateTimeBoxContainer}>

            <Pressable 
                style={styles.dateTimeBox}
                onPress={()=>ShowDialogVisivbility(false)}
            ><Text>Select Date</Text></Pressable>

            <TouchableOpacity
                style={styles.dateTimeBox}
                onPress={()=>ShowDialogVisivbility(false)}
            ><Text>Select Time</Text></TouchableOpacity>
            </View>


            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => ShowDialogVisivbility(!dialogVisibility)}>
              <Text style={styles.textStyle}>Add Item</Text>
            </TouchableOpacity>
        
          </View>
        </View>
      </Modal>
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
      },
      dateTimeBoxContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        alignItems:'baseline',
        padding:6,
        maxHeight:'auto'
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