import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Buttons = ({
  children,
  backgroundColor = "black",
  color = "white",
  onpress,
}) => {
  return (
    <TouchableOpacity
      onPress={onpress}
      activeOpacity={0.6}
      style={[styles.buttons, { backgroundColor: backgroundColor }]}
    >
      <Text style={{ color: color }}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  buttons: {
    marginVertical: 10,
    width: "100%",
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
