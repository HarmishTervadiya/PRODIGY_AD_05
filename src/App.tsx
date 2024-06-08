import React,{useState, useEffect, useRef} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  useAnimatedValue,
  FlatList
} from 'react-native';
import Form from './components/Form';
import TaskCard from './components/TaskCard';
import DatePicker from 'react-native-date-picker';
import { loadTodos } from '../backend/storage';


export interface ToDoProps{
  id:string,
  title:string,
  description:string,
  date: string,
}

function App(): React.JSX.Element {

  const slideAnim = useRef(new Animated.Value(0)).current; 
  const [taskList,setTaskList]=useState<ToDoProps[]>([])
  
  useEffect(()=>{
    Animated.timing(slideAnim,{
        toValue:2,
        duration:1000,
        useNativeDriver:true
    }).start();
  })

 
  const loadItems =async ()=>{
    const data=await loadTodos()
    setTaskList(JSON.parse(data))
  }

  useEffect(()=>{
    loadItems()
  },[])
  
  const randomColor = (index:number)=>{
    const colors=['#40e258','#c86fff','#87ddff','#ffc387']
    return colors[index%5]
  }


  const [formDialog,showFormDialog]=useState(false)
  
  
  const closeForm=()=>{
    showFormDialog(false)
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
    
      <View style={styles.headingContainer}>
        <Animated.Text style={[styles.headingText,{
          opacity:slideAnim,
          transform:[
            {
              translateX: slideAnim.interpolate({
                inputRange:[0,5],
                outputRange:[-5,30]
              })
            }
          ],
        }]}>Your Tasks</Animated.Text>

        <Animated.View style={[{
          transform:[
            {
              translateX: slideAnim.interpolate({
                inputRange:[0,1],
                outputRange:[30,50]
              })
            }
          ],
        }]}>
        <TouchableOpacity
        onPress={()=>showFormDialog(!formDialog)}
        style={styles.addButton}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        </Animated.View>

      </View>
        {/* <Text>{taskList.length}</Text> */}
      <FlatList 
      numColumns={2}
      data={taskList}
      scrollEnabled
      keyExtractor={(item)=>item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({item,index})=>{
        return(
          <>
          <TaskCard onUpdate={loadItems} list={taskList}  id={index.toString()} bgColor={randomColor(index)} title={item.title} description={item.description}  date={item.date} />
          </>
        )
      }}
      />


      {formDialog ? (
      <Form onPress={closeForm} taskList={taskList} visibility={formDialog} />
      ):(null)}
    
    </SafeAreaView>
  );
}


const styles=StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f1f1f1d6',
    maxHeight:'100%',
    justifyContent:'flex-end',
    paddingVertical:20,
    // paddingHorizontal:10,
    height:'100%'
  },
  headingContainer:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingRight:20
  },
  headingText:{
    fontSize:40,
    fontWeight:'bold',
    color:'black',
    // paddingLeft:10,
  },
  addButton:{
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal:15,
    marginLeft:50,
    elevation: 2,
    backgroundColor: 'white',
    borderWidth:1,
    borderColor:'black'
  },
  buttonText:{
    color:'black',
    fontSize:20
  }
})

export default App;
