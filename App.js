import React from 'react';
import {View, Text} from 'react-native';
import Home from './screens/Home';
import Edit from './screens/Edit';
import Add from './screens/Add';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: 'rgba(0, 0, 200, 0.7)',
            },
            title: 'Home',
            headerTitleStyle: {
              color: '#fff',
            },
          }}></Stack.Screen>

        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            headerStyle: {
              backgroundColor: 'rgba(0, 0, 200, 0.7)',
            },
            title: 'Add an Item',
            headerTitleStyle: {
              color: '#fff',
            },
          }}></Stack.Screen>

        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            headerStyle: {
              backgroundColor: 'rgba(0, 0, 200, 0.7)',
            },
            title: 'Edit',
            headerTitleStyle: {
              color: '#fff',
            },
          }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
