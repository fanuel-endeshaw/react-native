import { Text, View, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import React, { useState } from 'react';
import { RoundedButton } from '../component/RoundedButton';

export const Focus = (props) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          label="Focus item"
          onChangeText={setSubject}
        />
      <View  style={styles.button}>
        <RoundedButton title="-" size={50} onPress={()=>{props.addSubject(subject)}} ></RoundedButton>
      </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  backgroundColor: 'white'
  },
  input: {
    marginRight: 10,
    flex: 1,
  },
  inputContainer: {
    // flex: 0.5,
    justifyContent: 'top',
    flexDirection: 'row',
    padding: 24,
  },
  button: {
    justifyContent: 'center'
  }
});
