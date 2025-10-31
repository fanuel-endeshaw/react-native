import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Button = ({ children,onPress }) => {
  return <TouchableOpacity onPress={onPress} style={styles.button}>{children}</TouchableOpacity>;
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 14,
    marginTop: 40,
    backgroundColor: "rgb(163,144,216)",
    marginVertical: 20,
    borderRadius: 14,
  },
});
