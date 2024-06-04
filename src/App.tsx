import React,{useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';


function App(): React.JSX.Element {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      
    </SafeAreaView>
  );
}


const styles=StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f1f1f1d6',
    maxHeight:'100%',
    justifyContent:'flex-end',
    paddingVertical:20
  },
})

export default App;
