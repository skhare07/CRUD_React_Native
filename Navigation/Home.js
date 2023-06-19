import {View, Text, Button, StatusBar} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function Home(props) {
  const navigation = useNavigation();
  return (
    <View>
      <StatusBar backgroundColor={'blue'} barStyle={'dark-content'} />
      <Text style={{alignItems: 'center'}}>Home</Text>
      <Button
        title="VIEW USER"
        onPress={() => navigation.navigate('ViewUser')}></Button>
      <Button
        title="ADD USER"
        onPress={() => navigation.navigate('AddUser')}></Button>
    </View>
  );
}
