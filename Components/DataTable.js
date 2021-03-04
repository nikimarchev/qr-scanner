import React, { useState, useMemo, useEffect } from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import DateRangePicker from "react-native-daterange-picker";
import { Table, Row, Rows } from 'react-native-table-component';
import moment from "moment";
import axios from 'axios';

const { width } = Dimensions.get('window');

const DataTable = () => {
  const [dates, setDates] = useState({ startDate: null, endDate: null, displayedDate: moment() })
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [ready, setReady] = useState(false);

  const [tableNames, setTableNames] = useState([]);
  const [table, setTable] = useState([]);
  const [wLength, setWLength] = useState([]);

  useEffect(() => {
    const { startDate, endDate } = dates;
    if (startDate && endDate) {
      axios.get('https://qr-scanner-2b3c5-default-rtdb.firebaseio.com/data.json')
        .then(
          setLoading(true),
          setFlag(true),
          setTableNames([]),
          setTable([]),
          setReady(false),
          setWLength([])
        )
        .then(response => setListData(
          Object.entries(response.data)
            .map(([key, item]) => ({ ...item, key }))
            .filter(
              item => {
                const itemDate = moment(item.date);
                return itemDate > startDate && itemDate < endDate;
              }
            )
        ))
        .catch(error => {
          console.log(error);
        })
        .finally(() => setLoading(false))
    }
  }, [dates])

  const setData = () => {
    let tabData = [];
    let tabTypes = [];
    let tabDates = [];

    for (let i = 0; i < listData.length; i++) {
      setWLength((prev) => [...prev, 130])
    }

    for (const item of listData) {
      for (const key in item) {
        switch (key) {
          case 'name':
            setTableNames((oldNames) => [...oldNames, item[key]])
            break;
          case 'data':
            tabData.push(item[key])
            break;
          case 'type':
            tabTypes.push(item[key])
            break;
          case 'date':
            let newDate = item[key];
            newDate = newDate.split(' ')
            newDate.splice(0, 1)
            newDate.splice(3, 4)
            newDate = newDate.join('-')
            tabDates.push(newDate)
            break;
          default:
            break;
        }
      }
    }

    setTable(oldItems => [...oldItems, tabData]);
    setTable(oldItems => [...oldItems, tabTypes]);
    setTable(oldItems => [...oldItems, tabDates]);
    setReady(true);
  }


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Search by date range</Text>
      <DateRangePicker
        onChange={dates => setDates(oldDates => ({ ...oldDates, ...dates }))}
        endDate={dates.endDate}
        startDate={dates.startDate}
        displayedDate={dates.displayedDate}
        range>
        <Text style={styles.calendar}>Choose date range</Text>
      </DateRangePicker>
      {loading && <ActivityIndicator size="large" />}
      {
        listData.length ?
          <Text style={[styles.title, ready && { display: 'none' }]} onPress={setData}>Show information</Text>
          : <Text style={styles.calendar}>{flag && 'No QR codes scanned in that range'}</Text>
      }
      {
        ready &&
        <View style={styles.table}>
          <ScrollView horizontal={true}>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
              <Row data={tableNames} widthArr={wLength} style={styles.headTable} textStyle={styles.titleTable} />
              <Rows data={table} widthArr={wLength} textStyle={styles.textTable} />
            </Table>
          </ScrollView>
        </View>
      }
    </ScrollView>
  )
}

export default DataTable


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDF4DC'
  },
  text: {
    fontSize: width * 0.08,
    color: 'black',
    textAlign: 'center',
    marginTop: '10%',
    marginBottom: '2%'
  },
  calendar: {
    textAlign: 'center',
    paddingTop: '10%',
    paddingBottom: '10%',
    fontSize: 25
  },
  title: {
    fontSize: width * 0.08,
    color: 'black',
    textAlign: 'center'
  },
  item: {
    padding: '8%',
  },
  table: {
    flex: 1,
    backgroundColor: '#fff'
  },
  titleTable: {
    marginLeft: 6,
    marginRight: 6,
    fontSize: 20,
  },
  headTable: {
    height: 60,
    backgroundColor: '#f1f8ff'
  },
  textTable: {
    height: 40,
    marginLeft: 6,
    marginRight: 6,
    fontSize: 14
  }
}); 
