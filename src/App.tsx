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

function App(): React.JSX.Element {

  const slideAnim = useRef(new Animated.Value(0)).current; 
  const [taskList,setTaskList]=useState(['Hello','Hello','Hello', 'Hello', 'Hello'])
  
  useEffect(()=>{
    Animated.timing(slideAnim,{
        toValue:2,
        duration:1000,
        useNativeDriver:true
    }).start();
  })

  
  const randomColor = (index:number)=>{
    const colors=['#40e258','#c86fff','#87ddff','#ffc387']
    return colors[index%taskList.length]
  }

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const [formDialog,showFormDialog]=useState(false)

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
        onPress={()=>setOpen(true)}
        style={styles.addButton}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        </Animated.View>

      </View>

      <FlatList 
      numColumns={2}
      data={[1,2,3,4,5,6,7,8,9,10,5,8,9,5]}
      scrollEnabled
      showsVerticalScrollIndicator={false}
      renderItem={(index)=>{
        return(
          <>
          <TaskCard id={'Hello'} bgColor={randomColor(index.index)} title='Hello' description='How you doing Man?' time='10AM' date='5-6-2024' />
          </>
        )
      }}
      />

    <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />

      {/* {formDialog ? (
      <Form visibility={formDialog} />
      ):(null)}
     */}
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
