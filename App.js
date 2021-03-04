import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Components/Home'
import Scanner from './Components/Scanner'
import Search from './Components/Search'
import DataTable from './Components/DataTable'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}
          options={{
            headerStyle: {
              backgroundColor: '#FE5F55',
            },
            headerTintColor: '#FDF4DC',

          }} />
        <Stack.Screen name="Scanner" component={Scanner}
          options={{
            headerStyle: {
              backgroundColor: '#FE5F55',
            },
            headerTintColor: '#FDF4DC'
          }} />
        <Stack.Screen name="Search" component={Search}
          options={{
            headerStyle: {
              backgroundColor: '#FE5F55',
            },
            headerTintColor: '#FDF4DC'
          }} />
        <Stack.Screen name="Table" component={DataTable}
          options={{
            headerStyle: {
              backgroundColor: '#FE5F55',
            },
            headerTintColor: '#FDF4DC'
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}