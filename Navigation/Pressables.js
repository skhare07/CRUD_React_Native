import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

const Pressables = () => {
  return (
    <View style={styles.main}>
      <Pressable>
        onPress={() => console.warn('normal onpress')}
        onLongPress={() => console.warn(' onLongPress')}
        onPressIn={() => console.warn(' onPressIn')}
        onPressOut={() => console.warn('onPressOut')}
        <Text style={styles.pressableBtn}>Pressable</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  pressableBtn: {
    backgroundColor: 'blue',
    color: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    fontSize: 20,
    textAlign: 'center',
    shadowColor: 'black',
    elevation: 5,
  },
});

export default Pressables;
