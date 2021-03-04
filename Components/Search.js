import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Button,
  FlatList,
  ActivityIndicator
} from 'react-native'
import axios from 'axios';

const { width } = Dimensions.get('window');

const Search = () => {
  const [chars, setChars] = useState('');
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  const getData = () => {
    axios.get('https://qr-scanner-2b3c5-default-rtdb.firebaseio.com/data.json')
      .then(
        setLoading(true),
        setFlag(true)
      )
      .then(response => setListData(
        Object.entries(response.data)
          .map(([key, item]) => ({ ...item, key }))
          .filter(
            item => item.data.toUpperCase().includes(chars.toUpperCase())
          )
      ))
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false))
  }

  const items = ({ item }) => {
    let newDate = item.date;
    newDate = newDate.split(' ')
    newDate.splice(0, 1)
    newDate.splice(3, 4)
    newDate = newDate.join('-')
    return <View style={styles.item} >
      <Text style={styles.title}>Name: {item.name}</Text>
      <Text style={styles.title}>Data: {item.data}</Text>
      <Text style={styles.title}>Type: {item.type}</Text>
      <Text style={styles.title}>Date scanned: {newDate}</Text>
    </View>
  }




  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Search in history</Text>
      <KeyboardAvoidingView style={styles.form}>
        <TextInput
          style={styles.input}
          onChangeText={(char) => setChars(char)}
          value={chars}
          require={true} />
        <Button color="black" title="SEARCH" onPress={getData} />
      </KeyboardAvoidingView>
      {loading && <ActivityIndicator size="large" />}
      {
        listData.length ?
          <FlatList
            data={listData}
            renderItem={({ item }) => items({ item })}
            keyExtractor={item => item.key}
          />
          : <Text style={styles.noItems}>{flag && 'No QR codes with this chars'}</Text>
      }
    </ScrollView>
  )
}

export default Search


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDF4DC'
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
    marginTop: '10%',
    marginBottom: '2%'
  },
  noItems: {
    fontSize: width * 0.06,
    color: 'black',
    textAlign: 'center'
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
  title: {
    fontSize: width * 0.06,
    color: 'black',
  },
  item: {
    padding: '8%',
  },
}); 