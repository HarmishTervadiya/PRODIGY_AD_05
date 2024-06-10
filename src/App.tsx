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
  Linking,
  ScrollView,
} from 'react-native';
import { RNCamera } from 'react-native-camera';


import QRCodeScanner from 'react-native-qrcode-scanner';

function App(): React.JSX.Element {
    // const [data,setData]=useState<string|undefined>('')
    // const onSuccess =()=>{
    //   Linking.openURL(data!).catch(e=>console.log(e))
    // }

  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedImage, setScannedImage] = useState();

  const cameraRef = useRef(null);


  const handleScan = (data) => {
    setIsScanning(false);
    setScannedData(data);
  };


  const handleOpenLink = () => {
    if (scannedData) {
      if (scannedData.data.startsWith('http')) {
        const isImage = scannedData.data.endsWith('.jpg') || scannedData.data.endsWith('.png');
        if (isImage) {
          Linking.openURL(scannedData.data); // Open image URL in browser
        } else {
          Linking.openURL(scannedData.data); // Open link
        }
      } else if (scannedData.data.includes('@')) {
        Linking.openURL(`mailto:${scannedData.data}`); 
      } else {
        
        alert('Scanned content is not a link or email address.'); 
      }
    }
  };

  return (
    <>
      <StatusBar />
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
      <RNCamera
        useNativeZoom
        ref={cameraRef}
        style={styles.camera}
        onBarCodeRead={handleScan}
        captureAudio={false} // Disable audio recording for efficiency
      />
    </View>


      {scannedData && (
        <View style={styles.scannedDataContainer}>
          <Text style={styles.scannedDataText} onPress={handleOpenLink}>{scannedData.data}</Text>
          <TouchableOpacity style={styles.scanAgainButton}>
            <Text style={styles.scanAgainText}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}



    </ScrollView>
    </>
  );
}


const styles=StyleSheet.create({
    container: {
      flexDirection: 'column',
    },
    camera: {
      flex:1,
      height:300,
      marginBottom:90,
    },
    scannedDataContainer: {
      flex:1,
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    scannedDataText: {
      color: 'white',
      fontSize: 18,
    },
    scanAgainButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#ddd',
      borderRadius: 5,
    },
    scanAgainText: {
      textAlign: 'center',
    },
    controlsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
})

export default App;
