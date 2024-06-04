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

const BtnCard: React.FC<ButtonProps> = ({ text, operation, isBlue,isGray }) => (
  <TouchableOpacity style={[styles.button,{
    backgroundColor: isBlue? '#5454f7' : isGray ?'grey':'white',
  }]} onPress={operation}>
    <Text style={[styles.buttonText,{
    color: isBlue? 'white' : isGray ?'white':'black',
  }]}>{text}</Text>
  </TouchableOpacity>
);

interface ButtonProps {
  text: string;
  operation: () => void;
  isBlue?:Boolean;
  isGray?:Boolean;
}

function App(): React.JSX.Element {
  const [secondValue, setSecondValue] = useState<string>('');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState<string>('');
  const [resultValue, setResultValue] = useState<string>('');



  const handleNumberInput: (value: string) => void = (value) => {
    if(operator===null){
      setFirstValue(firstValue + value)
    }else{
      setSecondValue(secondValue+value)
    }

  };

  const handleOperatorInput: (op: string) => void = (op) => {
    if(resultValue!=''){
      setFirstValue(resultValue)
      setResultValue('')
      if(operator==null){
        setOperator(op)
      }else{
        handleEqual()
        setFirstValue(resultValue)
        setOperator(op)
        setResultValue('')
      } 
    }else if(firstValue!=''){
      if(operator==null){
        setOperator(op)
      }else{   
        if(secondValue!=''){
        const newResult = handleEqual();
        setFirstValue(newResult)
        setOperator(op)
        setResultValue('')
        }else{
          setOperator(op)
        }
      }
    }
  };

  

  const handleEqual= () => {
    if(firstValue!=='' && secondValue !=''){
    let result: number;
    switch (operator) {
      case '+':
        result = +firstValue + +secondValue; 
        break;
      case '-':
        result = +firstValue - +secondValue;
        break;
      case '*':
        result = +firstValue * +secondValue;
        break;
      case '/':
        result = +firstValue / +secondValue;
        break;
      case '%':
        result = +firstValue % +secondValue;
        break;
      default:
        result = 0;
    }
    setResultValue(result.toString())
    setFirstValue('')
    setSecondValue('')
    console.log("Ans "+  resultValue )
    setOperator(null)
    return result.toString()
  }else{
    console.log("Invalid "+ firstValue +" "+secondValue)
    return "Invalid Data"
  }
  };

  const handleClear: () => void = () => {
    setFirstValue('')
    setSecondValue('')
    setOperator(null)
    setResultValue('')
  };

  const handleBackSpace=()=>{
    if(operator==null){
      setFirstValue(firstValue.slice(0,firstValue.length-1))
    }else{
      setSecondValue(secondValue.slice(0,secondValue.length-1))
    }

    if(resultValue!==''){
      setResultValue(resultValue.slice(0,resultValue.length-1))
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      
      <View style={styles.displayContainer}>
        <View style={{ flexDirection:'row',justifyContent:'flex-end',alignItems:'center' }}>
        <Text style={styles.displayText}  >{firstValue}</Text>
          <Text style={styles.operatorText}  >{operator}</Text>
        </View>

        <Text style={styles.displayText}  >{secondValue}</Text>

        <Text style={styles.resultText}  >{resultValue}</Text>

      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <BtnCard isGray text='AC' operation={handleClear} />
          <BtnCard isGray text='C' operation={handleBackSpace } />          
          <BtnCard isGray text='%' operation={() => handleOperatorInput('%') } />
          <BtnCard isGray text='-' operation={() => handleOperatorInput('-')} />

          {/* Other operator buttons */}
        </View>
        <View style={styles.buttonRow}>
          <BtnCard text='7' operation={() => handleNumberInput('7')} />
          <BtnCard text='8' operation={() => handleNumberInput('8')} />
          <BtnCard text='9' operation={() => handleNumberInput('9')} />
          <BtnCard  isBlue text='/' operation={() => handleOperatorInput('/')} />
        </View>
        
        <View style={styles.buttonRow}>
          <BtnCard text='4' operation={() => handleNumberInput('4')} />
          <BtnCard text='5' operation={() => handleNumberInput('5')} />
          <BtnCard text='6' operation={() => handleNumberInput('6')} />
          <BtnCard isBlue text='*' operation={() => handleOperatorInput('*')} />
        </View>

        
        <View style={styles.buttonRow}>
          <BtnCard text='1' operation={() => handleNumberInput('1')} />
          <BtnCard text='2' operation={() => handleNumberInput('2')} />
          <BtnCard text='3' operation={() => handleNumberInput('3')} />
          <BtnCard isBlue text='+' operation={() => handleOperatorInput('+')} />
        </View>

        
        <View style={styles.buttonRow}>
          <BtnCard text='00' operation={() => handleNumberInput('00')} />
          <BtnCard text='0' operation={() => handleNumberInput('0')} />
          <BtnCard text='.' operation={() => handleNumberInput('.')} />
          <BtnCard isBlue text='=' operation={() => handleEqual()} />
        </View>

      </View>
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
  displayContainer: {
    justifyContent: 'flex-end',
    padding: 15,
    marginHorizontal:15
  },
  displayText: {
    textAlign: 'right',
    padding:5,
    fontSize:42,
    color:'black'
  },
  resultText: {
    fontSize: 42,
    textAlign: 'right',
    color:'black'

  },
  operatorText:{
    fontSize: 20,
    padding:5,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonContainer: {
    maxWidth:'100%',
    justifyContent:'flex-end'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 5,
  },
  button: {
    alignItems: 'center',
    paddingVertical: 16,
    elevation:1,
    width:65,
    height:65,
    borderRadius:10,

  },
  buttonText: {
    fontSize: 20,
    fontWeight:'500',
  },
})

export default App;
