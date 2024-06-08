import { Animated, ColorValue, Modal, Pressable, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { PropsWithChildren, useRef,useEffect, useState } from 'react'
import DatePicker from 'react-native-date-picker';
import { ToDoProps } from '../App';
import { index } from 'realm';
import { saveTodos } from '../../backend/storage';

type TaskProps=PropsWithChildren<{
    id:string,
    title:string,
    description:string,
    date:string,
    bgColor:string,
    list:ToDoProps[],
    onUpdate: ()=>void
}>

const TaskCard = ( {id,title,description,date,bgColor,list,onUpdate}:TaskProps) => {
    const fadeAnim = useRef(new Animated.Value(0)).current; 
    const slideAnim = useRef(new Animated.Value(0)).current; 
    const [dialogVisibility,ShowDialogVisivbility]=useState(false)

    const [updatedTitle,setTitle]=useState(title)
    const [updatedDescription,setDescription]=useState(description)
   
    const [editState,setEditState]=useState(false)

    const reset=()=>{
      setTitle(title)
      setDescription(description)
      setEditState(false)
    }
    useEffect(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }, [fadeAnim]);

      useEffect(()=>{
        Animated.timing(slideAnim,{
            toValue:2,
            duration:1000,
            useNativeDriver:true
        }).start();
      },[])
      
      const update=async ()=>{
      const newToDo = { id: Math.random().toString(),title: updatedTitle,description: updatedDescription, date };
        if(editState){
          let newList=list
          newList[id]=newToDo
          const res = await saveTodos(newList);
          onUpdate()
        }
        setEditState(false)
      }

      const deleteItem=async ()=>{
            let newList=list
            newList.splice(+id,1)
            const res = await saveTodos(newList);
            onUpdate()
        }

  return (
    <View>
      <Animated.View
      onTouchEnd={()=>ShowDialogVisivbility(!dialogVisibility)}
      style={[styles.cardContainer,
        {
            backgroundColor: bgColor,
            opacity:slideAnim,
            transform:[
                {
                    translateX:slideAnim.interpolate({
                        inputRange:[0,1],
                        outputRange:[0,15]
                    }),
                }
            ]
        }
      ]}
      > 
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.dateTimeText}>{date}</Text>
        <Text style={styles.descriptionText}>{description}</Text>

        </Animated.View>  
        
        <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={dialogVisibility}
        onRequestClose={() => {
          reset()
          ShowDialogVisivbility(false)
        }}>
             <TouchableWithoutFeedback onPress={()=>{
                reset()
                ShowDialogVisivbility(false)
             }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView,{
            backgroundColor:'white'
          }]}>

            <TextInput style={styles.detailTitleText}
              value={updatedTitle}
              onChangeText={setTitle}
              editable={editState}
              multiline={true}
            />

            <Text style={styles.dateTimeText} onPress={()=>{}}>{date}</Text>

            <TextInput style={styles.detailDescriptionText}
              value={updatedDescription}
              onChangeText={setDescription}
              editable={editState}
              multiline={true}
            />


            <View style={styles.btnContainer}>

            {editState? (
              
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={()=>update()}
              >                
              <Text style={styles.textStyle}>Save Item</Text>
            </TouchableOpacity>
        
            ) : (
              
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={()=>setEditState(true)}
              >                
              <Text style={styles.textStyle}>Edit Item</Text>
            </TouchableOpacity>
        
            ) }

        
            <TouchableOpacity
              style={[styles.button, styles.confirmButton,{
                backgroundColor:'red'
              }]}
              onPress={()=>{
                deleteItem()
                ShowDialogVisivbility(false)}}
              >
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableOpacity>
            </View>

          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
    </View>
  )
}

export default TaskCard

const styles = StyleSheet.create({
    cardContainer:{
        flex:1,
        flexDirection:'column',
        shadowColor:'black',
        borderWidth:1,
        justifyContent:'center',
        maxWidth:160,
        width:160,
        height:220,
        maxHeight:250,
        borderRadius:20,
        paddingTop:10,
        paddingHorizontal:20,
        margin:5
    },
    titleText:{
        
        flexWrap:'wrap',
        fontSize:22,
        fontWeight:'bold',
        color:'black',

    },
    dateTimeText:{
        fontSize:14,
        fontWeight:'300',
        alignSelf:'flex-start'
    },
    descriptionText:{
        flex:1,
        flexWrap:'wrap',
        fontSize:16,
        fontWeight:'400',
        paddingBottom:10,
        color:'black',

    },
    detailTitleText:{
        color:'black',
        flexWrap:'wrap',
        fontSize:22,
        fontWeight:'bold',
        paddingBottom:10
    },
    detailDescriptionText:{
        color:'black',
        flexWrap:'wrap',
        fontSize:16,
        fontWeight:'400',
        paddingTop:10,
        alignSelf:'flex-start',
        height:'auto',

      },
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
      btnContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'80%',
        alignItems:'baseline',
        padding:6,
        maxHeight:'auto'
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