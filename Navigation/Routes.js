import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import AddUser from './AddUser';
import ViewUser from './ViewUser';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="ViewUser" component={ViewUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
