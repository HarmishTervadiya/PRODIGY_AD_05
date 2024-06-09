import React,{useState, useEffect, useRef} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Text,
  Button,
} from 'react-native';

interface TimerProps{
  minutes:number,
  seconds:number,
  miliseconds:number,
}

function App(): React.JSX.Element {
  const [time, setTime] = useState({ minutes: 0, seconds: 0, milliseconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          let { minutes, seconds, milliseconds } = prevTime;

          milliseconds += 1;

          if (milliseconds >= 100) {
            milliseconds = 0;
            seconds += 1;
          }

          if (seconds >= 60) {
            seconds = 0;
            minutes += 1;
          }

          setProgress((minutes * 60 + seconds) % 60 / 60);


          return { minutes, seconds, milliseconds };
        });
      }, 10);
    }
  };

  const stopStopwatch = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const resetStopwatch = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime({ minutes: 0, seconds: 0, milliseconds: 0 });
    setProgress(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.container}>
        <View style={[styles.wrapper]}>
        <Text style={styles.timeText}>
          {String(time.minutes).padStart(2, '0')}:
          {String(time.seconds).padStart(2, '0')}:
          {String(time.milliseconds).padStart(2, '0')}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title={isRunning ? 'Stop' : 'Start'} onPress={isRunning ? stopStopwatch : startStopwatch} />
        <Button title="Reset" onPress={resetStopwatch} />
      </View>
    </View>
    </SafeAreaView>
  );
}


const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop:30,
    alignItems: 'center',
  },
  wrapper:{
    borderWidth:2,
    borderRadius:200,
    borderColor:'#4190ff',
    padding:40,
    height:260,
    justifyContent:'center',
    marginBottom:30
  },
    svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  timeText: {
    fontSize: 48,
  },
  buttonContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '45%',
    alignItems:'flex-start',
    
  },
})

export default App;
