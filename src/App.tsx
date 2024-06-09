import React,{useState, useEffect, useRef, PropsWithChildren} from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
  Button,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';



type IconsProps = PropsWithChildren<{
  name:string
}>

const IconShape=({name}:IconsProps)=>{
  switch(name){
    case 'cross':
      return <Text style={[styles.text,{
        color:'red'
      }]}>X</Text>
      break;
   case 'circle':
    return <Text style={[styles.text,{
      color:'orange'
    }]} >O</Text>
      break;
   default:
      return <Text style={styles.text}></Text>      
  }

}

function App(): React.JSX.Element {

  const [playerTurn,setPlayerTurn]=useState('cross')
  const [isWon,setIsWon]=useState(true)
  const [gameState, setGameState]=useState(new Array(9).fill('empty',0,9))  
  const [gameWinner,setGameWinner]=useState<string>('')

  const checkIsWinner= ()=>{
    if(
        gameState[0]===gameState[1] &&
        gameState[0]===gameState[2] &&
        gameState[0]!='empty'
    ){
        setGameWinner(gameState[0] + ' won the game')
    }
    else if(
        gameState[3]!='empty' &&
        gameState[3]===gameState[4] &&
        gameState[4]===gameState[5] 
    ){
        setGameWinner(gameState[3] + ' won the game')
    }
    else if(
        gameState[6]!='empty' &&
        gameState[6]===gameState[7] &&
        gameState[7]===gameState[8] 
    ){
        setGameWinner(gameState[6] + ' won the game')
    }
    else if(
        gameState[0]!='empty' &&
        gameState[0]===gameState[3] &&
        gameState[3]===gameState[6] 
    ){
        setGameWinner(gameState[1] + ' won the game')
    }
    else if(
        gameState[1]!='empty' &&
        gameState[1]===gameState[4] &&
        gameState[4]===gameState[7] 
    ){
        setGameWinner(gameState[1] + ' won the game')
    }
    else if(
        gameState[2]!='empty' &&
        gameState[2]===gameState[5] &&
        gameState[5]===gameState[8] 
    ){
        setGameWinner(gameState[2] + ' won the game')
    }
    else if(
        gameState[0]!='empty' &&
        gameState[0]===gameState[4] &&
        gameState[4]===gameState[8] 
    ){
        setGameWinner(gameState[0] + ' won the game')
    }
    else if(
        gameState[2]!='empty' &&
        gameState[2]===gameState[4] &&
        gameState[4]===gameState[6] 
    ){
        setGameWinner(gameState[2] + ' won the game')
    }
}

  const playTurn = (itemNumber:number)=>{

    if(gameWinner===''){
      if(gameState[itemNumber]==='empty'){
        gameState[itemNumber]= playerTurn==='cross' ? 'cross':'circle'
        setPlayerTurn(playerTurn!=='cross' ? 'cross':'circle')
      }
    }
  checkIsWinner()
}

  const resetGame=()=>{
    setPlayerTurn('cross')
    setGameState(new Array(9).fill('empty',0,9))
    setGameWinner('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      { gameWinner=='' ? (
        
      <View style={[styles.card,
        {
          backgroundColor: playerTurn==='cross'? '#d52f2f' : 'orange'
        }]}>

        <Text style={[styles.playerText]}>{ 'Player ' + (playerTurn==='cross'? 'X' : 'O') +' s turn'}</Text>
      </View>

      ) : (

        <View style={[styles.card,
          {
            backgroundColor: '#1ea71e'
          }]}>
          <Text style={[styles.playerText]}>{gameWinner}</Text>
        </View>

      )}

      <FlatList 
        data={gameState}
        numColumns={3}
        renderItem={({item,index})=>(
          <Pressable
          style={[styles.box]}
          onPress={()=>playTurn(index)}
          >
            <IconShape name={item} />
          
          </Pressable>
        )}
      />
        <TouchableOpacity
        style={[styles.card,{
          backgroundColor:'#1d8dd7'
        }]}
        onPress={resetGame}>
          <Text style={styles.playerText}>{gameWinner? 'Start Again' :'Reset'}</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}


const styles=StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingTop:30,
    alignItems: 'center',
    backgroundColor:'#ffffff'
  },
  box:{
    borderWidth:.5,
    padding:20,
    width:80
  },
  text:{
    fontSize:32,
    color:'black',
    fontWeight:'bold',
    textAlign:'center'
  },
  card:{
    padding:10,
    margin:10,
    elevation:0,
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
    width:240
  },
  playerText:{
    fontSize:20,
    marginBottom:10,
    color:'white',
    fontWeight:'semibold'
  }
})

export default App;
