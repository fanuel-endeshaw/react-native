import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const AppInput = ({ placeHolder }) => {
  return (
    <TextInput
      placeholder={placeHolder}
      style={styles.inputContainer}
    ></TextInput>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    width: "100%",
    height: 46,
    borderColor: "grey",
    borderRadius: 23,
    marginVertical: 10,
    paddingLeft: 10,
  },
});
