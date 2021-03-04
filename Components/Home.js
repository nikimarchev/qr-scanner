import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const Home = ({ navigation }) => {

  return (
    <ScrollView style={styles.body}>
      <Text style={styles.navItems} onPress={() => navigation.navigate("Scanner")}>SCANNER</Text>
      <Text style={styles.navItems} onPress={() => navigation.navigate("Search")}>SEARCH</Text>
      <Text style={styles.navItems} onPress={() => navigation.navigate("Table")}>TABLE</Text>
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '50%',
    backgroundColor: '#FDF4DC'
  },
  navItems: {
    fontSize: width * 0.13,
    textAlign: 'center',
    color: 'black',
    paddingBottom: "10%"
  },
}); 