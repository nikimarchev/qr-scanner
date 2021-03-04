import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

const { width } = Dimensions.get('window');
const qrSize = width * 1;

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState({ type: '', data: '', name: '', date: '' });

  useEffect(() => {
    BarCodeScanner.requestPermissionsAsync()
      .then(({ status }) => { setHasPermission(status === 'granted'); })
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let date = new Date().toString();
    setData({ type: type, data: data, date: date });
  };

  const scanAgain = () => {
    setScanned(false);
    setData({ type: '', data: '', name: '' });
  }

  const postData = (data) => {
    axios.post("https://qr-scanner-2b3c5-default-rtdb.firebaseio.com/data.json", data)
      .then(response => {
        if (response.status == 200) {
          alert('Send successfully!')
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setScanned(false);
      })
  }

  return (
    <ScrollView style={styles.container}>
      <BarCodeScanner style={styles.camera}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}>
        {
          scanned ?
            <Text style={styles.scanAgainButton} onPress={scanAgain}>Tap to Scan Again</Text>
            : <Image style={styles.qrImg} source={require('../assets/qrScanner.png')} />
        }
      </BarCodeScanner>
      {!scanned && <Text style={styles.text}>Scan QR code</Text>}

      {
        scanned &&
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.form}>
          <Text style={styles.text}>Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(name) => setData({ ...data, name: name })}
            value={data.name}
            require={true} />
          <Text style={styles.text}>Type of barcode:</Text>
          <TextInput style={styles.input} value={data.type} />
          <Text style={styles.text}>Data of barcode:</Text>
          <TextInput style={styles.input} value={data.data} />
          <Button color="black" title="SEND" onPress={() => { postData(data) }} />
        </KeyboardAvoidingView>
      }
    </ScrollView>
  );
}

export default Scanner

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDF4DC'
  },
  camera: {
    width: qrSize,
    height: qrSize,
  },
  qrImg: {
    margin: '20%',
    width: "60%",
    height: "60%"
  },
  scanAgainButton: {
    fontSize: width * 0.10,
    textAlign: 'center',
    color: 'white',
    marginTop: "40%"
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%'
  },
  text: {
    fontSize: width * 0.08,
    color: 'black',
    textAlign: 'center',
    marginTop: '7%',
    marginBottom: '2%'
  },
  input: {
    width: width * 0.8,
    height: width * 0.1,
    padding: '2%',
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: '1%',
    color: 'black',
    fontSize: width * 0.05
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
}); 
