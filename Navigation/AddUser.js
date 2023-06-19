import {useState, useRef, useReducer} from 'react';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Platform,
} from 'react-native';

const AddUser = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const input = useRef();

  const saveAPIData = async () => {
    const url = 'http://localhost:3000/users';
    let result = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, age, email}),
    });
    const res = await result.json();
    if (res) {
      console.warn(res);
      setName('');
      setAge('');
      setEmail('');
      //setting focus using ref
      input.current.focus();
    }
  };

  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{paddingTop: 80, fontSize: 30}}>POST API CALL</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Enter Name"
        ref={input}
      />
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={text => setAge(text)}
        placeholder="Enter Age"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Enter Email"
      />

      <Button title="Save Data" onPress={saveAPIData} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    borderColor: Platform.OS == 'ios' ? 'black' : 'blue',
    borderWidth: 2,
    padding: 10,
    margin: 30,
    paddingTop: 10,
  },
});
export default AddUser;
