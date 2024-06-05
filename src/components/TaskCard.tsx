import { Animated, ColorValue, StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren, useRef,useEffect } from 'react'
import DatePicker from 'react-native-date-picker';

type TaskProps=PropsWithChildren<{
    id:string,
    title:string,
    description:string,
    time:string,
    date:string,
    bgColor:string,
    
}>

const TaskCard = ({id,title,description,time,date,bgColor}:TaskProps) => {
    const fadeAnim = useRef(new Animated.Value(0)).current; 
    const slideAnim = useRef(new Animated.Value(0)).current; 

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
      })
      
  return (
      <Animated.View
      style={[styles.cardContainer,
        {
            backgroundColor: bgColor,
            opacity:slideAnim,
            transform:[
                {
                    translateX:slideAnim.interpolate({
                        inputRange:[0,1],
                        outputRange:[0,20]
                    }),
                }
            ]
        }
      ]}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.dateTimeText}>{date + '  ' + time}</Text>
        <Text style={styles.descriptionText}>{description}</Text>

      </Animated.View>

    
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
        width:140,
        borderRadius:20,
        paddingTop:10,
        paddingHorizontal:20,
        margin:5
    },
    titleText:{
        fontSize:22,
        fontWeight:'bold',
    },
    dateTimeText:{
        fontSize:16,
        fontWeight:'300'
    },
    descriptionText:{
        flex:1,
        flexWrap:'wrap',
        fontSize:18,
        fontWeight:'400',
        paddingBottom:10
    }
})