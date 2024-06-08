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
    paddingVertical:20,
    // paddingHorizontal:10,
    height:'100%'
  },
})

export default App;
